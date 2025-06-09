const express = require('express');
const router = express.Router();
const generateManimCode = require('../services/llm');
const renderVideo = require('../services/render');
const generateId = require('../utils/generateId');

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  const sessionId = generateId();

  try {
    const code = await generateManimCode(prompt);
    const videoUrl = await renderVideo(code, sessionId);
    res.json({ videoUrl });
  } catch (err) {
    console.error("Video generation failed:", err.message);
    res.status(500).json({ error: 'Video generation failed' });
  }
});

module.exports = router;
