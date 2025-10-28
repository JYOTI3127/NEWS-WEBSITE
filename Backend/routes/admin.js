const express = require('express');
const router = express.Router();
const AdminPost = require('../models/AdminPost');

// Add new post via admin panel
router.get('/posts/:section', async (req, res) => {
  const section = req.params.section;  // Jo section frontend se aayega
  try {
    const posts = await Post.find({ section: section });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
