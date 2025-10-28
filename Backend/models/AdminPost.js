const mongoose = require('mongoose');

const adminPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  section: String,
}, { timestamps: true });

module.exports = mongoose.model('AdminPost', adminPostSchema);
