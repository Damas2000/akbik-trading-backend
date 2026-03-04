const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  sort_order: { type: Number, default: 0 },
});

const featuresSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  image_url: { type: String, default: '' },
  badge_text: { type: String, default: '' },
  cards: [cardSchema],
}, { timestamps: true });

module.exports = mongoose.model('FeaturesSection', featuresSectionSchema);
