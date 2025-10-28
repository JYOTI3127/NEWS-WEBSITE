const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
  username: { type: String, required: true },
  success: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now },
  ip: { type: String },
  userAgent: { type: String }
});

module.exports = mongoose.model('LoginLog', loginLogSchema);
