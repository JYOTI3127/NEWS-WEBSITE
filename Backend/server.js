require("dotenv").config({ debug: false });

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");


// Import routes
const apiRoutes = require("./routes/api");
const adminRoutes = require("./routes/admin");
const adminAuthRoutes = require("./routes/adminAuth");
const postRoutes = require("./routes/postRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const userAuthRoutes = require("./routes/userAuth");
const advertisementRoutes = require("./routes/advertisementRoutes");
const newsRoutes = require("./routes/newsRoutes");
const rootPath = path.join(__dirname, "..");


// Initialize Express
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static(rootPath));

// =========================
// STATIC FILE SETUP
// =========================
app.use("/IMAGE", express.static(path.join(__dirname, "IMAGE")));
app.use("/MEDIA", express.static(path.join(__dirname, "MEDIA")));

// ✅ Serve frontend static files from parent folder (marketing)
app.use(express.static(path.join(__dirname, "..")));

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
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "home.html"));
});

app.get("/header.html", (req, res, next) => {
  const headerPath = path.resolve(__dirname, "../header.html");
  console.log("Serving header:", headerPath);
  res.sendFile(headerPath, (err) => {
    if (err) {
      console.error("❌ Header file not found:", err.message);
      next(); // Pass to 404
    }
  });
});

app.get("/footer.html", (req, res, next) => {
  const footerPath = path.resolve(__dirname, "../footer.html");
  console.log("Serving footer:", footerPath);
  res.sendFile(footerPath, (err) => {
    if (err) {
      console.error("❌ Footer file not found:", err.message);
      next();
    }
  });
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "admin.html"));
});

app.get("/post-details.html", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "post-details.html"));
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
