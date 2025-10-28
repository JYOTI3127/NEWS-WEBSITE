const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Post = require("../models/post");
const fs = require("fs");

// IMAGE folder ka path
const imageDir = path.join(__dirname, "..", "IMAGE");

// IMAGE folder agar exist nahi karta to bana do
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// ✅ CREATE post
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let { title, content, description, section } = req.body;

    if (!title || !content || !section) {
      return res.status(400).json({ message: "Title, content aur section required hain" });
    }

    const image = req.file?.filename;

    // Lowercase normalize section array
    let finalSection = Array.isArray(section)
      ? section.map((s) => s.toLowerCase())
      : [section.toLowerCase()];

    // ✅ Magazine sirf tab add karein jab sports/event/politics ho
    const shouldAddMagazine = finalSection.some((s) =>
      ["sports", "event", "politics"].includes(s)
    );
    if (shouldAddMagazine && !finalSection.includes("magazine")) {
      finalSection.push("magazine");
    }

    const post = new Post({
      title,
      content,
      description,
      section: finalSection,
      image,
    });

    await post.save();
    res.status(201).json({ success: true, message: "Post created", post });
  } catch (err) {
    console.error("Post create error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ GET all posts with pagination
router.get("/", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const total = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ posts, total });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET posts by section
router.get("/section/:name", async (req, res) => {
  try {
    const sectionName = req.params.name.toLowerCase();
    const posts = await Post.find({
      section: { $elemMatch: { $regex: `^${sectionName}$`, $options: "i" } },
    }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts by section:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET latest posts excluding Corporate, Venue, Awards
router.get("/magazine", async (req, res) => {
  try {
    const posts = await Post.find({
      section: { $not: { $elemMatch: { $in: ['venue', 'awards', 'corporate'] } } }
    }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post nahi mila" });
    res.json(post);
  } catch (err) {
    console.error("Post fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ DELETE post
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ UPDATE post
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let { title, content, section, description } = req.body;

    if (!title || !content || !section) {
      return res.status(400).json({
        message: "Title, content aur section required hain",
      });
    }

    // Normalize input to array
    let finalSection = Array.isArray(section)
      ? section.map((s) => s.toLowerCase())
      : [section.toLowerCase()];

    console.log("REQ BODY SECTION:", section);
    console.log("FINAL SECTION:", finalSection);

    // ✅ Agar sports/event/politics hai toh magazine add karo
    if (finalSection.some((s) => ["sports", "event", "politics"].includes(s))) {
      if (!finalSection.includes("magazine")) {
        finalSection.push("magazine");
      }
    } else {
      // ✅ Warna magazine hata do
      finalSection = finalSection.filter((s) => s !== "magazine");
    }

    const updatedFields = {
      title,
      content,
      description,
      section: finalSection, // 🔑 purane section ko replace karega
    };

    if (req.file) {
      updatedFields.image = req.file.filename;
    }

    // Overwrite old fields
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields }, // ✅ force replace
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (err) {
    console.error("Post update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
