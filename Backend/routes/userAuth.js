const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const LoginLog = require('../models/LoginLog');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'User already registered' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      // Log failed attempt
      const log = new LoginLog({
        username,
        success: false,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      await log.save();

      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const success = await bcrypt.compare(password, user.password);

    // Log the attempt
    const log = new LoginLog({
      username,
      success,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    await log.save();

    if (success) {
      const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ user: { username: user.username }, token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

router.post('/logout', (req, res) => {
  // JWT is stateless, so logout is client-side (discard token)
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
