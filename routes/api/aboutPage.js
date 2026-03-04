const router = require('express').Router();
const AboutPage = require('../../models/AboutPage');
const { apiAuth } = require('../../middleware/adminAuth');
const upload = require('../../middleware/upload');

// Public
router.get('/', async (req, res) => {
  try {
    const page = await AboutPage.findOne();
    res.json(page || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected - update
router.put('/', apiAuth, upload.fields([
  { name: 'hero_image', maxCount: 1 },
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
]), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.files?.hero_image?.[0]) data.hero_image_url = req.files.hero_image[0].path;
    if (req.files?.image1?.[0]) data.image1_url = req.files.image1[0].path;
    if (req.files?.image2?.[0]) data.image2_url = req.files.image2[0].path;
    if (req.files?.image3?.[0]) data.image3_url = req.files.image3[0].path;
    if (data.story_paragraphs && typeof data.story_paragraphs === 'string') {
      data.story_paragraphs = data.story_paragraphs.split('\n---\n').map(s => s.trim()).filter(Boolean);
    }
    let page = await AboutPage.findOne();
    if (page) {
      Object.assign(page, data);
      await page.save();
    } else {
      page = await AboutPage.create(data);
    }
    res.json(page);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
