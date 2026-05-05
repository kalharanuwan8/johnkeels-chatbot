import * as geminiService from './services/geminiService.js';

export const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log(`[Socket] User connected: ${socket.id}`);

    socket.on('sendMessage', async (data) => {
      const { text, history } = data;
      console.log(`[Socket] Received message from ${socket.id}: "${text.substring(0, 30)}..."`);
      
      try {
        // 1. Streaming AI Response Layer
        const stream = await geminiService.generateChatResponseStream(text, history || []);
        
        let fullResponse = "";
        for await (const chunk of stream) {
          const chunkText = chunk.text();
          fullResponse += chunkText;
          // Emit chunk to client
          socket.emit('chatChunk', { text: chunkText });
        }

        // Final full message for Firestore/Context consistency
        socket.emit('receiveMessage', { 
          role: 'model', 
          text: fullResponse,
          id: Date.now(),
          timestamp: Date.now()
        });

      } catch (error) {
        console.error(`[Socket] Chat error for ${socket.id}:`, error);
        socket.emit('error', { message: "An error occurred while processing your request." });
      }
    });

    socket.on('disconnect', () => {
      console.log(`[Socket] User disconnected: ${socket.id}`);
    });
  });
};
