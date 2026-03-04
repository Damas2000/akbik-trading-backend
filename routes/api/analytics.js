const router = require('express').Router();
const PageView = require('../../models/PageView');
const { apiAuth } = require('../../middleware/adminAuth');

// Public - record page view
router.post('/pageview', async (req, res) => {
  try {
    const { page, referrer, session_id } = req.body;
    if (!page) return res.status(400).json({ error: 'page is required' });

    await PageView.create({
      page,
      referrer: referrer || '',
      user_agent: req.headers['user-agent'] || '',
      ip: req.ip || '',
      session_id: session_id || '',
    });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Protected - get analytics summary
router.get('/summary', apiAuth, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [totalViews, viewsByPage, viewsByDay, topReferrers] = await Promise.all([
      PageView.countDocuments(),
      PageView.aggregate([
        { $group: { _id: '$page', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 20 },
      ]),
      PageView.aggregate([
        { $match: { created_at: { $gte: thirtyDaysAgo } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      PageView.aggregate([
        { $match: { referrer: { $ne: '' } } },
        { $group: { _id: '$referrer', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
    ]);

    res.json({ totalViews, viewsByPage, viewsByDay, topReferrers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
