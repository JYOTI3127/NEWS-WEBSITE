const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Banner = require("../models/banner");
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

// ✅ CREATE banner
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content, link, isActive } = req.body;

    // Validation
    if (!title || !content || !req.file) {
      return res.status(400).json({ message: "Title, content aur image required hain" });
    }

    const image = req.file.filename;

    const banner = new Banner({
      title,
      content,
      image,
      link: link || '',
      isActive: isActive !== undefined ? isActive : true
    });

    await banner.save();
    res.status(201).json({ success: true, message: "Banner created", banner });
  } catch (err) {
    console.error("Banner create error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ GET all banners (sorted latest first)
router.get("/", async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET single banner by ID
router.get("/:id", async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner nahi mila" });
    }
    res.json(banner);
  } catch (err) {
    console.error("Banner fetch karte waqt error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ UPDATE banner
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, content, link, isActive } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title aur content required hain" });
    }

    const updatedFields = {
      title,
      content,
      link: link || '',
      isActive: isActive !== undefined ? isActive : true
    };

    if (req.file) {
      updatedFields.image = req.file.filename;
    }

    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.json({ success: true, message: "Banner updated", banner: updatedBanner });
  } catch (err) {
    console.error("Banner update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ DELETE banner
router.delete("/:id", async (req, res) => {
  try {
    const deletedBanner = await Banner.findByIdAndDelete(req.params.id);
    if (!deletedBanner)
      return res.status(404).json({ message: "Banner not found" });
    res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
