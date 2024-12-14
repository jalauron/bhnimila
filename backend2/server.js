// backend2/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());


// Routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Protected route (requires token)
app.get('/protected-route', (req, res) => {
  const token = req.headers['authorization'];

  if (token !== 'Bearer valid-jwt-token') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  res.json({ message: 'This is protected data' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
