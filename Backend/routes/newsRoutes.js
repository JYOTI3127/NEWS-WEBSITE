const express = require("express");
const router = express.Router();

// Dummy data for now — बाद में database से जोड़ सकते हैं
const sampleNews = [
  { id: 1, title: "Breaking News 1", content: "First news content here" },
  { id: 2, title: "Breaking News 2", content: "Second news content here" }
];

// GET /api/news
router.get("/", (req, res) => {
  res.json(sampleNews);
});

module.exports = router;
