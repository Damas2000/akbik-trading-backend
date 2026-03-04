const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
  page: { type: String, required: true },
  referrer: { type: String, default: '' },
  user_agent: { type: String, default: '' },
  ip: { type: String, default: '' },
  session_id: { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
});

pageViewSchema.index({ created_at: -1 });
pageViewSchema.index({ page: 1, created_at: -1 });

module.exports = mongoose.model('PageView', pageViewSchema);
