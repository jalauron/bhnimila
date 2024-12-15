const express = require('express');
const cors = require('cors');
const authController = require('./controllers/authController'); // Import the authentication controller

const app = express();
const port = 5000;

// Middleware to allow cross-origin requests from the frontend (React app)
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL (make sure it matches your frontend's URL)
  methods: ['GET', 'POST'], // You can restrict the methods here if needed
  allowedHeaders: ['Content-Type', 'Authorization'], // You can also specify allowed headers
}));

// Middleware to parse incoming JSON requests
app.use(express.json()); // Replaces bodyParser.json()

// Register routes for user authentication
app.post('/api/register', authController.register); // Register route
app.post('/api/login', authController.login); // Login route

// Global error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
