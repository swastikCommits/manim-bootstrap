// routes/api/landing.js
const express = require('express');
const router = express.Router();
const generateManimCode = require('../../services/llm');
const renderVideo = require('../../services/render');
const generateId = require('../../utils/generateId');

// Handle animation generation from the landing page
router.post('/', async (req, res) => {
  const { prompt } = req.body;
  const sessionId = generateId();

  try {
    const code = await generateManimCode(prompt);
    const videoUrl = await renderVideo(code, sessionId);
    
    // Return JSON with video URL and session info
    res.json({ 
      success: true,
      videoUrl,
      sessionId,
      prompt,
      message: `Generated animation for: "${prompt}"`,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("Video generation failed:", err.message);
    res.status(500).json({ error: 'Video generation failed' });
  }
});

module.exports = router;
