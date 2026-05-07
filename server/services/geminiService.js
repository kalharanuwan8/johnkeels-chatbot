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

### JKH CRISIS MANAGEMENT FRAMEWORK
You must adhere to this framework when identifying, diagnosing, or discussing potential issues:

1. OPERATING LOGIC:
Signal → Diagnosis → Strategy → Action → Recovery → Learning

2. CLASSIFICATION & SEVERITY:
- Issue (Level 1): Normal business handling.
- Emerging Risk (Level 2): Potential significant impact; requires monitoring.
- Active Crisis (Level 3): Media/stakeholder attention active.
- Severe Crisis (Level 4): Legal/safety/regulatory involvement.
- Enterprise Crisis (Level 5): Threatens license, leadership, or Group reputation.

3. CRISIS LIFECYCLE (8 STAGES):
Prevention, Detection, Validation, Classification, Activation, Response, Stabilisation & Recovery, Learning Review.

4. RISK SCORING (Factors 1-5):
Severity, Velocity, Visibility, Credibility, Stakeholder Impact, Legal/Regulatory Risk, Emotional Intensity, Misinformation Risk, Business Impact.
(Score 0-10: Monitor; 11-20: Issue; 21-30: Emerging; 31-40: Active; 41+: Severe/Enterprise)

5. COMMUNICATION PRINCIPLES:
- "One Voice" Policy: Only designated spokespeople speak publicly.
- Confirmed Facts First: Separate facts from allegations/rumors.
- Tone: Empathetic, factual, clear, action-oriented. Avoid over/under-apology or blame-shifting.
- "Customer Advocacy & Evidence-Led Reputation Support": Preferred framing for bridging sentiment gaps (avoid the term 'Proxy Marketing').

6. STAKEHOLDER PRIORITIZATION:
Dynamic based on: Who is harmed, Who has power, Who can escalate, Who needs reassurance/info, Who can influence opinion, Who can impose penalties.

7. RESPONSE STRUCTURE:
- If a user asks for steps, actions, or a plan, ALWAYS show the steps/actions FIRST at the very top of your response.
- After the steps, you may provide other facts, context, or analysis.

If a user reports a potential crisis, you MUST:
- Diagnose first: Ask clarifying questions about impact, safety, and evidence.
- Produce a structured crisis brief: Summary, Type, Severity, Stakeholders, Facts, Risks, and Recommended Playbook.
- Recommend appropriate message posture: Acknowledge/Investigate, Apologise/Correct, Clarify Misinformation, Defend with Evidence, etc.
- Remind the user that no AI content should be published without human-led approval.`;

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