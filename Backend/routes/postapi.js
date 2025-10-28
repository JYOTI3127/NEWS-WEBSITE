const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/post"); // model import

// 🔹 Magazine posts (excluding Venue, Awards, Corporate)
router.get('/magazine', async (req, res) => {
  try {
    const excludedSections = ['venue', 'awards', 'corporate'];

    const posts = await Post.find({
      section: { $not: { $elemMatch: { $in: excludedSections } } }
    }).sort({ createdAt: -1 });

    res.json(posts); // magazine ke liye filtered posts
  } catch (error) {
    console.error("Error fetching magazine posts:", error);
    res.status(500).json({ error: 'Server error' });
  }
});


// 🔹 Filter by section type
router.get('/section/:type', async (req, res) => {
  try {
    const section = req.params.type;
    const posts = await Post.find({ section }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts by section:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Sports posts 3-column format
router.get('/posts/sports', async (req, res) => {
  try {
    const sportsPosts = await Post.find({ section: 'sports', image: { $exists: true, $ne: '' } });

    const left = [];
    const center = [];
    const right = [];

    sportsPosts.forEach((post, index) => {
      if (index % 3 === 0) left.push(post);
      else if (index % 3 === 1) center.push(post);
      else right.push(post);
    });

    res.json({ left, center, right });

  } catch (err) {
    console.error('Error fetching sports posts:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🔹 Politics
router.get("/politics", async (req, res) => {
  try {
    const data = await Post.find({ section: "politics" });
    res.json(data);
  } catch (err) {
    console.error("Error fetching politics posts:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Events
router.get("/event", async (req, res) => {
  try {
    const data = await Post.find({ section: "event" });
    res.json(data);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Generic section fetch
router.get("/posts/section/:section", async (req, res) => {
  try {
    const sectionName = req.params.section;
    const articles = await Post.find({ section: sectionName });
    res.json(articles);
  } catch (err) {
    console.error("Error fetching posts by section:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Get posts by category (excluding current post if valid ObjectId)
router.get('/category/:category/:excludeId?', async (req, res) => {
  try {
    const { category, excludeId } = req.params;
    let query = { section: category };

    // Sirf tabhi exclude karo jab excludeId ek valid ObjectId ho
    if (excludeId && mongoose.Types.ObjectId.isValid(excludeId)) {
      query._id = { $ne: excludeId };
    }

    const posts = await Post.find(query);
    res.json(posts);
  } catch (err) {
    console.error("Error fetching category posts:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
