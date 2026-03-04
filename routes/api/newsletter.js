const router = require('express').Router();
const Newsletter = require('../../models/Newsletter');
const { apiAuth } = require('../../middleware/adminAuth');

// Public - subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const subscriber = await Newsletter.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { email: email.toLowerCase().trim(), is_active: true, subscribed_at: new Date() },
      { upsert: true, new: true }
    );
    res.status(201).json({ success: true, id: subscriber._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Protected - list subscribers
router.get('/subscribers', apiAuth, async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort('-subscribed_at');
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected - export CSV
router.get('/export', apiAuth, async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ is_active: true }).sort('-subscribed_at');
    let csv = 'Email,Subscribed At,Active\n';
    subscribers.forEach(s => {
      csv += `${s.email},${s.subscribed_at.toISOString()},${s.is_active}\n`;
    });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=newsletter-subscribers.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected - unsubscribe
router.put('/:id/unsubscribe', apiAuth, async (req, res) => {
  try {
    await Newsletter.findByIdAndUpdate(req.params.id, { is_active: false });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
