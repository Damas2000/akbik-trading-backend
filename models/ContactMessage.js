const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, default: '' },
  email: { type: String, required: true },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },
  is_read: { type: Boolean, default: false },
  status: { type: String, enum: ['new', 'contacted', 'converted', 'lost'], default: 'new' },
  notes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
