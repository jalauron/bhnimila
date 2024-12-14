// server.js
const express = require('express');
const cors = require('cors');  // For cross-origin resource sharing
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Importing authentication routes

const app = express();
const port = 5000;

// Middleware to allow cross-origin requests from the frontend (React app)
app.use(cors({
  origin: 'http://localhost:3000',  // React frontend URL
  methods: ['GET', 'POST']
}));

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Use auth routes for login and registration
app.use('/api', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
