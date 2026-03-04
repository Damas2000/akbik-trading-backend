const mongoose = require('mongoose');

const buttonSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, default: '#' },
  style: { type: String, enum: ['primary', 'secondary'], default: 'primary' },
  sort_order: { type: Number, default: 0 },
});

const heroSlideSchema = new mongoose.Schema({
  image_url: { type: String, required: true },
  headline: { type: String, required: true },
  subheading: { type: String, default: '' },
  badge_text: { type: String, default: '' },
  sort_order: { type: Number, default: 0 },
  buttons: [buttonSchema],
}, { timestamps: true });

module.exports = mongoose.model('HeroSlide', heroSlideSchema);
