const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Advertisement = require("../models/advertisement");
const fs = require("fs");

// MEDIA folder path
const mediaDir = path.join(__dirname, "..", "MEDIA");

// Create MEDIA folder if not exists
if (!fs.existsSync(mediaDir)) {
  fs.mkdirSync(mediaDir);
}

// Multer setup for image/video upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, mediaDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File filter to accept images and videos only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|mov|avi|mkv|webm|ogg|wmv|flv/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype =
    file.mimetype && (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/"));
  if (extname && mimetype) {
    cb(null, true);
  } else {
    console.log("File rejected:", file.originalname, file.mimetype);
    cb(new Error("Only image and video files are allowed"));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

/* ==========================
   CREATE advertisement
========================== */
router.post("/", upload.single("mediaFile"), async (req, res) => {
  try {
    const { mediaType, link, isActive } = req.body;

    if (!mediaType || !req.file) {
      return res
        .status(400)
        .json({ message: "MediaType and media file are required" });
    }

    const mediaFile = req.file.filename;

    const advertisement = new Advertisement({
      mediaType,
      mediaFile,
      link: link || "",
      isActive: isActive !== undefined ? isActive : true,
    });

    await advertisement.save();
    res
      .status(201)
      .json({ success: true, message: "Advertisement created", advertisement });
  } catch (err) {
    console.error("Advertisement create error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ==========================
   GET all advertisements
========================== */
router.get("/", async (req, res) => {
  try {
    const advertisements = await Advertisement.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.json(advertisements);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ==========================
   GET single advertisement
========================== */
router.get("/:id", async (req, res) => {
  try {
    const advertisement = await Advertisement.findById(req.params.id);
    if (!advertisement) {
      return res.status(404).json({ message: "Advertisement not found" });
    }
    res.json(advertisement);
  } catch (err) {
    console.error("Advertisement fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ==========================
   UPDATE advertisement (Fixed)
========================== */
router.put("/:id", upload.single("mediaFile"), async (req, res) => {
  try {
    const { mediaType, link, isActive } = req.body;

    // Purane advertisement ko fetch karo
    const existingAd = await Advertisement.findById(req.params.id);
    if (!existingAd) {
      return res.status(404).json({ message: "Advertisement not found" });
    }

    // Sirf wahi fields update hongi jo bheji gayi hain
    const updatedFields = {
      mediaType: mediaType || existingAd.mediaType,
      link: link !== undefined ? link : existingAd.link,
      isActive: isActive !== undefined ? isActive : existingAd.isActive,
      mediaFile: req.file ? req.file.filename : existingAd.mediaFile,
    };

    const updatedAdvertisement = await Advertisement.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    res.json({
      success: true,
      message: "Advertisement updated",
      advertisement: updatedAdvertisement,
    });
  } catch (err) {
    console.error("Advertisement update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ==========================
   DELETE advertisement
========================== */
router.delete("/:id", async (req, res) => {
  try {
    const deletedAdvertisement = await Advertisement.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAdvertisement)
      return res.status(404).json({ message: "Advertisement not found" });
    res.json({ message: "Advertisement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
