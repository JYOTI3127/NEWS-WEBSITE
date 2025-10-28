require("dotenv").config({ debug: false });

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const fs = require("fs");

// Import routes
const apiRoutes = require("./routes/api");
const adminRoutes = require("./routes/admin");
const adminAuthRoutes = require("./routes/adminAuth");
const postRoutes = require("./routes/postRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const userAuthRoutes = require("./routes/userAuth");
const advertisementRoutes = require("./routes/advertisementRoutes");
const newsRoutes = require("./routes/newsRoutes");

// ✅ Root path (parent folder = marketing)
const rootPath = path.resolve(__dirname, "..");

// Initialize Express
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// =========================
// STATIC FILE SETUP
// =========================
app.use("/IMAGE", express.static(path.join(__dirname, "IMAGE")));
app.use("/MEDIA", express.static(path.join(__dirname, "MEDIA")));
app.use(express.static(rootPath)); // serve all frontend files

// =========================
// Nodemailer Config
// =========================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =========================
// Contact Form
// =========================
app.post("/send", (req, res) => {
  const { name, email, number, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Contact from ${name}`,
    html: `
      <h3>Contact Details</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Number:</strong> ${number || "Not Provided"}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("❌ Email send failed:", err);
      return res.status(500).json({ error: "Email sending failed" });
    }
    console.log("✅ Email sent:", info.response);
    return res.status(200).json({ message: "Message sent successfully!" });
  });
});

// =========================
// MongoDB Connection
// =========================
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// =========================
// ROUTES
// =========================
app.use("/api", apiRoutes);
app.use("/api", newsRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", adminAuthRoutes);
app.use("/auth/user", userAuthRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/advertisements", advertisementRoutes);

// =========================
// FRONTEND ROUTES
// =========================

// 🏠 Home
app.get("/", (req, res) => {
  res.sendFile(path.join(rootPath, "home.html"));
});

// 🧩 Header/Footer dynamic serve
app.get("/:fileName(header.html|footer.html)", (req, res) => {
  const filePath = path.join(rootPath, req.params.fileName);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    console.error(`❌ File not found: ${filePath}`);
    res.status(404).send("Not Found");
  }
});

// ⚙️ Other HTML pages
app.get("/admin", (req, res) => {
  res.sendFile(path.join(rootPath, "admin.html"));
});

app.get("/post-details.html", (req, res) => {
  res.sendFile(path.join(rootPath, "post-details.html"));
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
