const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/videos', express.static(path.join(__dirname, 'public', 'videos')));

// Routes
const generateRoute = require('./routes/generate');
app.use('/generate', generateRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
