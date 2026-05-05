import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const TIMEOUT_MS = 30000; // 30 seconds

const SYSTEM_INSTRUCTION = `You are the official corporate AI assistant for the John Keells Group in Sri Lanka. Your primary role is to provide information and assistance related to John Keells Group, its business sectors (Leisure, Transportation, Retail, Consumer Foods, Property, Financial Services, IT), corporate profile, and operations.

You must be helpful and answer ALL user questions. While you should aim to provide context related to John Keells Group where possible, do not refuse to answer off-topic questions. Instead, answer them professionally while maintaining your identity as the John Keells corporate AI assistant. Maintain a highly professional, accurate, and helpful corporate tone at all times.`;

/**
 * Helper to wrap a promise with a timeout
 */
const withTimeout = (promise, timeoutMs, operationName) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${operationName} timed out after ${timeoutMs}ms`)), timeoutMs)
    )
  ]);
};

// Note: verifyPrompt has been deprecated as per user request to allow all prompts.
export const verifyPrompt = async (userPrompt) => {
  return "VALID";
};

export const generateChatResponse = async (text, history) => {
  // ... existing implementation for non-streaming if needed, 
  // but we'll focus on adding the streaming version.
  console.log(`[GeminiService] Generating chat response for: "${text.substring(0, 50)}..."`);
  
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const chat = model.startChat({
      history: history.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }))
    });

    const result = await chat.sendMessage(text);
    return result.response.text();
  } catch (error) {
    console.error("[GeminiService] Chat service error:", error);
    throw error;
  }
};

/**
 * Streaming version of generateChatResponse
 */
export const generateChatResponseStream = async (text, history) => {
  console.log(`[GeminiService] Generating streaming chat response for: "${text.substring(0, 50)}..."`);
  
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const chat = model.startChat({
      history: history.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }))
    });

    const result = await chat.sendMessageStream(text);
    return result.stream;
  } catch (error) {
    console.error("[GeminiService] Streaming chat service error:", error);
    throw error;
  }
};