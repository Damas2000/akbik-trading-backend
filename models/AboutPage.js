const mongoose = require('mongoose');

const aboutPageSchema = new mongoose.Schema({
  // Hero
  hero_image_url: { type: String, default: '' },
  hero_badge: { type: String, default: '' },
  hero_title: { type: String, default: '' },
  hero_description: { type: String, default: '' },
  hero_button1_text: { type: String, default: '' },
  hero_button1_url: { type: String, default: '' },
  hero_button2_text: { type: String, default: '' },
  hero_button2_url: { type: String, default: '' },
  // Story section
  story_subtitle: { type: String, default: '' },
  story_title: { type: String, default: '' },
  story_paragraphs: [{ type: String }],
  // Info cards
  card1_icon: { type: String, default: '' },
  card1_title: { type: String, default: '' },
  card1_description: { type: String, default: '' },
  card2_icon: { type: String, default: '' },
  card2_title: { type: String, default: '' },
  card2_description: { type: String, default: '' },
  // Images
  image1_url: { type: String, default: '' },
  image1_caption: { type: String, default: '' },
  image2_url: { type: String, default: '' },
  image3_url: { type: String, default: '' },
  // CTA box
  cta_title: { type: String, default: '' },
  cta_description: { type: String, default: '' },
  cta_link_text: { type: String, default: '' },
  cta_link_url: { type: String, default: '' },
  // Visit Us section
  visit_title: { type: String, default: '' },
  visit_description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('AboutPage', aboutPageSchema);
