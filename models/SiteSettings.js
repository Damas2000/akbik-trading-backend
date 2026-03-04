const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  site_name: { type: String, default: 'Akbik Trading' },
  logo_url: { type: String, default: '' },
  favicon_url: { type: String, default: '' },
  social_facebook: { type: String, default: '' },
  social_instagram: { type: String, default: '' },
  social_twitter: { type: String, default: '' },
  social_linkedin: { type: String, default: '' },
  social_youtube: { type: String, default: '' },
  social_whatsapp: { type: String, default: '' },
  footer_text: { type: String, default: 'Quality tools and construction supplies for professionals and DIY enthusiasts since 1954.' },
  meta_title: { type: String, default: 'Akbik Trading - Hardware Experts' },
  meta_description: { type: String, default: 'Quality tools and construction supplies for professionals and DIY enthusiasts' },
  meta_keywords: { type: String, default: '' },
  cta_title: { type: String, default: '' },
  cta_description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
