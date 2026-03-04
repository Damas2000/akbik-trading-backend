const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  // Page header
  page_title: { type: String, default: 'Get in Touch' },
  page_description: { type: String, default: '' },
  // Google Maps embed URL
  google_maps_url: { type: String, default: '' },
  // Contact details
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  // Store hours
  hours_weekday: { type: String, default: '' },
  hours_saturday: { type: String, default: '' },
  hours_sunday: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
