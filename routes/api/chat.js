// routes/api/chat.js
const express = require('express');
const router = express.Router();
const generateManimCode = require('../../services/llm');
const renderVideo = require('../../services/render');
const generateId = require('../../utils/generateId');

// Handle chat messages and generate animations
router.post('/', async (req, res) => {
  const { prompt, sessionId: existingSessionId } = req.body;
  const sessionId = existingSessionId || generateId();

  try {
    const code = await generateManimCode(prompt);
    const videoUrl = await renderVideo(code, sessionId);
    
    // Return JSON with video URL and session info
    res.json({ 
      success: true,
      videoUrl,
      sessionId,
      prompt,
      message: `Updated animation based on: "${prompt}"`,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("Chat video generation failed:", err.message);
    res.status(500).json({ error: 'Video generation failed' });
  }
});

module.exports = router;
