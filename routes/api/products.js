const router = require('express').Router();
const Product = require('../../models/Product');
const { apiAuth } = require('../../middleware/adminAuth');
const upload = require('../../middleware/upload');

// Public - all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category').sort('sort_order');
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
    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', apiAuth, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image_url = req.file.path;
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', apiAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
