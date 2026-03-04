const router = require('express').Router();
const SiteSettings = require('../../models/SiteSettings');
const { apiAuth } = require('../../middleware/adminAuth');
const upload = require('../../middleware/upload');

// Public - get site settings
router.get('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) settings = await SiteSettings.create({});
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected - update site settings
router.put('/', apiAuth, upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'favicon', maxCount: 1 },
]), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.files?.logo?.[0]) data.logo_url = req.files.logo[0].path;
    if (req.files?.favicon?.[0]) data.favicon_url = req.files.favicon[0].path;

    let settings = await SiteSettings.findOne();
    if (settings) {
      Object.assign(settings, data);
      await settings.save();
    } else {
      settings = await SiteSettings.create(data);
    }
    res.json(settings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
