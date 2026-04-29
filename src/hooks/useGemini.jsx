import { useState, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export function useGemini() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim()) return;

    const userMsg = { role: "user", text: userText, id: Date.now(), timestamp: Date.now() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);
    setError(null);

    let currentSessionId = sessionId;

    try {
      if (!currentSessionId) {
        // Create new session in Firestore
        const docRef = await addDoc(collection(db, "chats"), {
          title: userText.slice(0, 40) + (userText.length > 40 ? "..." : ""),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          messages: newMessages
        });
        currentSessionId = docRef.id;
        setSessionId(currentSessionId);
      } else {
        // Update existing session with user message
        const chatRef = doc(db, "chats", currentSessionId);
        await updateDoc(chatRef, {
          messages: newMessages,
          updatedAt: serverTimestamp()
        });
      }

      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: "You are the official corporate AI assistant for the John Keells Group in Sri Lanka. Your sole purpose is to provide information, answer questions, and assist with topics exclusively related to John Keells Group, its business sectors (Leisure, Transportation, Retail, Consumer Foods, Property, Financial Services, IT), corporate profile, investor relations, and operations in Sri Lanka. Maintain a highly professional, accurate, and helpful corporate tone at all times. If asked about unrelated topics, politely guide the conversation back to John Keells Group."
      });

      // Build history for context (exclude the message we just added)
      const history = messages.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(userText);
      const text = result.response.text();

      const modelMsg = { role: "model", text, id: Date.now() + 1, timestamp: Date.now() };
      const finalMessages = [...newMessages, modelMsg];
      
      setMessages(finalMessages);

      // Update Firestore with model response
      const chatRef = doc(db, "chats", currentSessionId);
      await updateDoc(chatRef, {
        messages: finalMessages,
        updatedAt: serverTimestamp()
      });

    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
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