// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { User } = require('../models');
require('dotenv').config();

const router = express.Router();

// User Registration
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars long'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    // Send success message instead of token
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});


// User Login
router.post('/login', [
  body('email').isEmail(),
  body('password').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/google-login', async (req, res) => {
  const { token } = req.body; // Only receiving the token from the frontend

  try {
    // Verify the Google token with Google API
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
    });

    // Extract user details from the verified token
    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Check if user already exists in the database
    let user = await User.findOne({ where: { email } });
    if (!user) {
      // If user doesn't exist, create a new one
      user = await User.create({
        name,
        email,
        password: 'google-auth', // Set default or placeholder password
      });
    }

    // Generate a JWT token for the user
    const jwtPayload = { userId: user.id };
    const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the JWT token and user info back to the frontend
    res.json({ token: jwtToken, user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: 'Google login failed' });
  }
});

module.exports = router;
