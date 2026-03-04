const router = require('express').Router();
const Category = require('../../models/Category');
const Product = require('../../models/Product');
const { apiAuth } = require('../../middleware/adminAuth');
const upload = require('../../middleware/upload');

// Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort('sort_order');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Products by category (public)
router.get('/:catId/products', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.catId }).sort('sort_order');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected
router.post('/', apiAuth, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image_url = req.file.path;
    const category = await Category.create(data);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', apiAuth, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image_url = req.file.path;
    const category = await Category.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!category) return res.status(404).json({ error: 'Not found' });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', apiAuth, async (req, res) => {
  try {
    await Product.deleteMany({ category: req.params.id });
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
