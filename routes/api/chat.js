// routes/api/chat.js
const express = require('express');
const router = express.Router();
const generateManimCode = require('../../services/llm');
const renderVideo = require('../../services/render');
const generateId = require('../../utils/generateId');

// Handle chat messages and generate animations
router.post('/', async (req, res) => {
  const { prompt, sessionId: existingSessionId } = req.body;
  
  // Validate input
  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid or missing prompt' 
    });
  }
  
  const sessionId = existingSessionId || generateId();
  console.log(`[${new Date().toISOString()}] Processing follow-up request: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}" (Session: ${sessionId})`);

  try {
    const code = await generateManimCode(prompt);
    
    if (!code) {
      throw new Error('Failed to generate Manim code');
    }
    
    const videoUrl = await renderVideo(code, sessionId);
    
    if (!videoUrl) {
      throw new Error('Failed to render video');
    }
    
    // Return JSON with video URL and session info
    res.json({ 
      success: true,
      videoUrl,
      sessionId,
      prompt,
      message: `Updated animation based on: "${prompt}"`,
      timestamp: new Date().toISOString()
    });
    
    console.log(`[${new Date().toISOString()}] Successfully updated animation for session ${sessionId}`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Chat video generation failed:`, err.message);
    res.status(500).json({ 
      success: false,
      error: 'Video generation failed',
      message: err.message 
    });
  }
});

module.exports = router;
