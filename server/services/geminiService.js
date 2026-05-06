import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("[GeminiService] CRITICAL: GEMINI_API_KEY is not defined in environment variables!");
} else {
  console.log(`[GeminiService] Initializing with API Key: ${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 4)}`);
}

const genAI = new GoogleGenerativeAI(apiKey);


const TIMEOUT_MS = 30000; // 30 seconds

const SYSTEM_INSTRUCTION = `You are the official corporate AI assistant for the John Keells Group in Sri Lanka. Your primary role is to provide information and assistance related to John Keells Group, its business sectors, and corporate operations.

### CRISIS MANAGEMENT PROTOCOL (JKH Framework)
You must adhere to the JKH Crisis Management Framework when identifying or discussing potential issues:

1. CLASSIFICATION LEVELS:
- Issue: Normal business handling.
- Risk: Potential significant impact.
- Crisis: High-impact, requires immediate CMT activation.

2. CRISIS LIFECYCLE (8 STAGES):
Prevention, Detection, Classification, Activation, Response, Resolution, Recovery, Post-Action Review.

3. COMMUNICATION PRINCIPLES:
- Maintain "One Voice" policy.
- Use empathetic, factual, and action-oriented language.
- Prioritize stakeholders: Employees -> Customers -> Shareholders -> Public.

If a user reports a potential crisis or negative event, you should:
- Help classify the event (Issue/Risk/Crisis).
- Identify the current lifecycle stage.
- Suggest the appropriate JKH protocol or communication tone.
- Remind the user about the 'One Voice' policy if they are drafting public responses.

Maintain a highly professional, accurate, and helpful corporate tone at all times.`;

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
      model: "gemini-1.5-flash",
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