const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const LoginLog = require('../models/LoginLog');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username aur password required hai' });
    }

    // if (username !== 'admin') {
    //   return res.status(400).json({ message: 'Only admin username is allowed' });
    // }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Admin already registered' });
    }

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username aur password required hai' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      // Log failed attempt
      const log = new LoginLog({
        username,
        success: false,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      await log.save();

      return res.status(401).json({ message: 'Galat username ya password' });
    }

    const success = await bcrypt.compare(password, admin.password);

    // Log the attempt
    const log = new LoginLog({
      username,
      success,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    await log.save();

    if (success) {
      const token = jwt.sign({ username: admin.username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ user: { username: admin.username }, token });
    } else {
      res.status(401).json({ message: 'Galat username ya password' });
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
