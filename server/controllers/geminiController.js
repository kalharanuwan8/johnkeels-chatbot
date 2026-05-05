import * as geminiService from '../services/geminiService.js';

export const chat = async (req, res) => {
  const { text, history } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    // 1. Generate Response (Verification removed as requested)
    const responseText = await geminiService.generateChatResponse(text, history || []);
    
    res.json({ 
      role: 'model', 
      text: responseText,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error("Controller chat error:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
};

export const verify = async (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const result = await geminiService.verifyPrompt(text);
    res.json({ result });
  } catch (error) {
    console.error("Controller verify error:", error);
    res.status(500).json({ error: "An error occurred during verification." });
  }
};
