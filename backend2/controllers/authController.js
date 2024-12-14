// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory mock users array (In a real-world app, use a database)
let users = [];

// JWT Secret Key (In production, use environment variables for security)
const JWT_SECRET = 'your_jwt_secret_key'; 

// Registration logic
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  // Check if the user already exists
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ error: 'User already exists.' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);

  // Respond with success message
  return res.status(201).json({ message: 'User registered successfully' });
};

// Login logic
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  // Find the user
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  // Check if the password matches
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid password.' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '24h', // Token expires in 24 hours
  });

  // Send the token as a response
  return res.status(200).json({
    message: 'Login successful!',
    token: token
  });
};

module.exports = { registerUser, loginUser };
