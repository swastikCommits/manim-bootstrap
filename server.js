const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import API routes
const landingApiRoute = require('./routes/api/landing');
const chatApiRoute = require('./routes/api/chat');

// Configure CORS with specific options
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Next.js default port
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/videos', express.static(path.join(__dirname, 'media', 'videos')));

// API Routes
app.use('/api', landingApiRoute);      // POST /api endpoint
app.use('/api/chat', chatApiRoute);    // POST /api/chat endpoint

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});