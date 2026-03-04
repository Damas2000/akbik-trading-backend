const router = require('express').Router();
const HeroSlide = require('../../models/HeroSlide');
const { apiAuth } = require('../../middleware/adminAuth');
const upload = require('../../middleware/upload');

// Public
router.get('/', async (req, res) => {
  try {
    const slides = await HeroSlide.find().sort('sort_order');
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected
router.post('/', apiAuth, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image_url = req.file.path;
    if (data.buttons && typeof data.buttons === 'string') {
      data.buttons = JSON.parse(data.buttons);
    }
    const slide = await HeroSlide.create(data);
    res.status(201).json(slide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', apiAuth, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image_url = req.file.path;
    if (data.buttons && typeof data.buttons === 'string') {
      data.buttons = JSON.parse(data.buttons);
    }
    const slide = await HeroSlide.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!slide) return res.status(404).json({ error: 'Not found' });
    res.json(slide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', apiAuth, async (req, res) => {
  try {
    await HeroSlide.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
