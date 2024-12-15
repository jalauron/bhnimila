const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController'); // Import controller functions

// Registration Route
router.post('/register', register);  // Use 'register' function from controller

// Login Route
router.post('/login', login);  // Use 'login' function from controller

module.exports = router;
