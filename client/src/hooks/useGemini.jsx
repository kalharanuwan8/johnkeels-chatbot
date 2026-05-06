import { useState, useCallback, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { db } from "../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { SOCKET_SERVER_URL, CHAT_CONFIG, ROLES } from "../utils/constants";

export function useGemini() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const sessionIdRef = useRef(null);
  const socketRef = useRef(null);

  // Sync ref with state so socket listener always has the latest ID
  useEffect(() => {
    sessionIdRef.current = sessionId;
  }, [sessionId]);

  /**
   * Retry helper for Firestore operations
   */
  const withRetry = async (fn, retries = CHAT_CONFIG.RETRY_ATTEMPTS, delay = CHAT_CONFIG.RETRY_DELAY_MS) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (err) {
        console.warn(`[Firestore] Attempt ${i + 1} failed (Error: ${err.message}). Retrying in ${delay}ms...`, err);
        if (i === retries - 1) throw err;
        await new Promise(res => setTimeout(res, delay));
      }
    }
  };

  useEffect(() => {
    console.info("[useGemini] Hook initialized. Stable socket connection establishing...");
    
    // Initialize socket connection ONCE with websocket transport for better Cloud Run compatibility
    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });


    socketRef.current.on("chatChunk", (chunk) => {
      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.role === ROLES.MODEL && lastMsg.isStreaming) {
          const updatedMsg = { ...lastMsg, text: lastMsg.text + chunk.text };
          return [...prev.slice(0, -1), updatedMsg];
        } else {
          return [...prev, { role: ROLES.MODEL, text: chunk.text, isStreaming: true, id: "streaming", timestamp: Date.now() }];
        }
      });
      setLoading(false);
    });

    socketRef.current.on("receiveMessage", async (modelMsg) => {
      console.log("[useGemini] Final model response received.");
      setMessages((prev) => {
        // Remove any streaming placeholders and add the final message
        const filtered = prev.filter(m => !m.isStreaming);
        const finalMessages = [...filtered, modelMsg];
        
        // Use sessionIdRef to get the latest ID even if it was just set
        const currentSid = sessionIdRef.current;
        if (currentSid) {
          const chatRef = doc(db, "chats", currentSid);
          withRetry(() => updateDoc(chatRef, {
            messages: finalMessages,
            updatedAt: serverTimestamp()
          })).catch(err => console.error("[Firestore] Failed to update model response:", err));
        }
        
        return finalMessages;
      });
      setLoading(false);
    });

    socketRef.current.on("error", (err) => {
      console.error("[Socket] Error:", err);
      setError(err.message || "An error occurred");
      setLoading(false);
    });

    return () => {
      if (socketRef.current) {
        console.log("[useGemini] Disconnecting socket...");
        socketRef.current.disconnect();
      }
    };
  }, []); // Stable connection - no sessionId dependency

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim()) return;

    const userMsg = { role: ROLES.USER, text: userText, id: Date.now(), timestamp: Date.now() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);
    setError(null);

    let currentSessionId = sessionId;

    try {
      if (!currentSessionId) {
        console.log("[Firestore] Creating new session...");
        // Create new session in Firestore with retry and 10s timeout
        const docRef = await withRetry(() => 
          addDoc(collection(db, "chats"), {
            title: userText.slice(0, CHAT_CONFIG.MAX_TITLE_LENGTH) + (userText.length > CHAT_CONFIG.MAX_TITLE_LENGTH ? "..." : ""),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            messages: newMessages
          })
        );
        currentSessionId = docRef.id;
        setSessionId(currentSessionId);
        console.log("[Firestore] Session created:", currentSessionId);
      } else {
        console.log("[Firestore] Updating session:", currentSessionId);
        // Update existing session with user message
        const chatRef = doc(db, "chats", currentSessionId);
        await withRetry(() => 
          updateDoc(chatRef, {
            messages: newMessages,
            updatedAt: serverTimestamp()
          })
        );
      }

      // Emit message to backend via socket
      if (socketRef.current) {
        socketRef.current.emit("sendMessage", {
          text: userText,
          history: messages // Pass history for context
        });
      } else {
        throw new Error("Socket connection lost. Please refresh.");
      }

    } catch (err) {
      console.error("[Firestore/Socket] Error in sendMessage:", err);
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  }, [messages, sessionId]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setSessionId(null);
    setError(null);
  }, []);

  const loadSession = useCallback((id, historicalMessages) => {
    setSessionId(id);
    setMessages(historicalMessages);
    setError(null);
  }, []);

  return { messages, loading, error, sendMessage, clearChat, loadSession };
}