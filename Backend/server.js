
require("dotenv").config({ debug: false });

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

// 🛣️ Route imports
const apiRoutes = require("./routes/api");
const adminRoutes = require("./routes/admin");
const adminAuthRoutes = require("./routes/adminAuth");
const postRoutes = require("./routes/postRoutes");
const bannerRoutes = require("./routes/bannerRoutes");

// ✅ Initialize Express app
const app = express();
// CORS middleware
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json({ limit: '10mb' }));
// ---------- Nodemailer Transporter ----------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ---------- Test Route ----------
app.post("/test", (req, res) => {
  console.log("📧 Test route received:", req.body);
  return res.status(200).json({ message: "Test successful", data: req.body });
});

// ---------- Contact Form Route ----------
app.post("/send", (req, res) => {
  try {
    console.log("📧 Contact form submission received:", req.body);

    // Check if req.body exists and has the required fields
    if (!req.body) {
      console.log("❌ Request body is undefined");
      return res.status(400).json({ error: "Invalid request - no data received" });
    }

    const { name, email, number, message } = req.body;

    // Check if all required fields are present
    if (!name || !email || !message) {
      console.log("❌ Missing required fields:", { name, email, message });
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("❌ Email credentials not set in environment variables");
      return res.status(500).json({ error: "Server configuration error - email credentials missing" });
    }

    console.log("📧 Email credentials found, attempting to send email...");

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h3>Contact Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Number:</strong> ${number || 'Not provided'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("❌ Email error details:", error);
        return res.status(500).json({ error: "Email sending failed", details: error.message });
      } else {
        console.log("✅ Email sent successfully:", info.response);
        return res.status(200).json({ message: "Message sent successfully!" });
      }
    });
  } catch (error) {
    console.log("❌ Unexpected error in /send route:", error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// 🧠 MongoDB Connection (latest format)
const mongoURI = process.env.MONGO_URL;

if (!mongoURI) {
  console.error("❌ MONGO_URL is missing in .env file!");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 📂 Serve static files
app.use(express.static(path.join(__dirname, "..")));
app.use("/IMAGE", express.static(path.join(__dirname, "IMAGE")));
app.use("/IMAGE", express.static(path.join(__dirname, "..", "IMAGE")));
app.use("/MEDIA", express.static(path.join(__dirname, "MEDIA")));

const userAuthRoutes = require("./routes/userAuth");

// 🔗 Routes
const advertisementRoutes = require("./routes/advertisementRoutes");
const newsRoutes = require("./routes/newsRoutes");



app.use("/api", apiRoutes);
app.use("/api/news", newsRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", adminAuthRoutes);
app.use("/auth/user", userAuthRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/advertisements", advertisementRoutes);

// 📄 Frontend HTML routes
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "admin.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "home.html"));
});

app.get('/post-details.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'post-details.html'));
  console.log('Serving static files from:', path.join(__dirname, ".."));
});

// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});