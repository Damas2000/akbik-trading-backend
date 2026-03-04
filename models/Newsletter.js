const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  subscribed_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true },
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
