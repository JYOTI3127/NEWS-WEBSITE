const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  mediaFile: {
    type: String,
    required: true
  },
  link: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Advertisement', advertisementSchema);
