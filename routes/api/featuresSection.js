const router = require('express').Router();
const FeaturesSection = require('../../models/FeaturesSection');
const { apiAuth } = require('../../middleware/adminAuth');
const upload = require('../../middleware/upload');

// Public - get singleton
router.get('/', async (req, res) => {
  try {
    const section = await FeaturesSection.findOne();
    res.json(section || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected - update singleton
router.put('/', apiAuth, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image_url = req.file.path;
    if (data.cards && typeof data.cards === 'string') {
      data.cards = JSON.parse(data.cards);
    }
    let section = await FeaturesSection.findOne();
    if (section) {
      Object.assign(section, data);
      await section.save();
    } else {
      section = await FeaturesSection.create(data);
    }
    res.json(section);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
