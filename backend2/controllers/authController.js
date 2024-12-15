const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Ensure the database connection is correct

// JWT Secret (use environment variable for production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Make sure this is securely stored

// Register user
const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        // Check if username already exists
        const [existingUser] = await pool.query('SELECT * FROM boarders WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Username is already taken.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 100);

        // Insert the new user
        const [rows] = await pool.query('INSERT INTO boarders (username, password) VALUES (?, ?)', [username, hashedPassword]);

        return res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error('Error during registration:', err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

// Login user
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        // Find the user by username
        const [rows] = await pool.query('SELECT * FROM boarders WHERE username = ?', [username]);

        if (user.length === 0) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user[0].password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { user_id: user[0].id, username: user[0].username },
            JWT_SECRET,
            { expiresIn: '24h' } // Token expires in 24 hours
        );

        // Send token in response
        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Export the controller
module.exports = { register, login };
