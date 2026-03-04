const router = require('express').Router();
const ContactInfo = require('../../models/ContactInfo');
const ContactMessage = require('../../models/ContactMessage');
const { apiAuth } = require('../../middleware/adminAuth');

// Public - get contact info
router.get('/', async (req, res) => {
  try {
    const info = await ContactInfo.findOne();
    res.json(info || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected - update contact info
router.put('/', apiAuth, async (req, res) => {
  try {
    let info = await ContactInfo.findOne();
    if (info) {
      Object.assign(info, req.body);
      await info.save();
    } else {
      info = await ContactInfo.create(req.body);
    }
    res.json(info);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Public - submit contact message
router.post('/messages', async (req, res) => {
  try {
    const { first_name, last_name, email, subject, message } = req.body;
    if (!first_name || !email || !message) {
      return res.status(400).json({ error: 'first_name, email, and message are required' });
    }
    const msg = await ContactMessage.create({ first_name, last_name, email, subject, message });
    res.status(201).json({ success: true, id: msg._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Protected - list messages
router.get('/messages', apiAuth, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort('-createdAt');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected - mark as read
router.put('/messages/:id/read', apiAuth, async (req, res) => {
  try {
    await ContactMessage.findByIdAndUpdate(req.params.id, { is_read: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected - delete message
router.delete('/messages/:id', apiAuth, async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected - update message status
router.put('/messages/:id/status', apiAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'contacted', 'converted', 'lost'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    await ContactMessage.findByIdAndUpdate(req.params.id, { status });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected - update message notes
router.put('/messages/:id/notes', apiAuth, async (req, res) => {
  try {
    await ContactMessage.findByIdAndUpdate(req.params.id, { notes: req.body.notes || '' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
