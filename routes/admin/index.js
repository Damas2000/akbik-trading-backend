const router = require('express').Router();
const { adminAuth } = require('../../middleware/adminAuth');
const upload = require('../../middleware/upload');
const HeroSlide = require('../../models/HeroSlide');
const Category = require('../../models/Category');
const Product = require('../../models/Product');
const FeaturesSection = require('../../models/FeaturesSection');
const AboutPage = require('../../models/AboutPage');
const ContactInfo = require('../../models/ContactInfo');
const ContactMessage = require('../../models/ContactMessage');
const SiteSettings = require('../../models/SiteSettings');
const Admin = require('../../models/Admin');
const Newsletter = require('../../models/Newsletter');
const PageView = require('../../models/PageView');

router.use(adminAuth);

// Dashboard
router.get('/', async (req, res) => {
  const [slidesCount, categoriesCount, productsCount, messagesCount, newLeadsCount, subscribersCount, totalPageViews] = await Promise.all([
    HeroSlide.countDocuments(),
    Category.countDocuments(),
    Product.countDocuments(),
    ContactMessage.countDocuments({ is_read: false }),
    ContactMessage.countDocuments({ status: 'new' }),
    Newsletter.countDocuments({ is_active: true }),
    PageView.countDocuments(),
  ]);
  res.render('admin/dashboard', { slidesCount, categoriesCount, productsCount, messagesCount, newLeadsCount, subscribersCount, totalPageViews });
});

// ========== RESET ALL DATA ==========
router.post('/reset-all', async (req, res) => {
  try {
    await Promise.all([
      HeroSlide.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      FeaturesSection.deleteMany({}),
      AboutPage.deleteMany({}),
      ContactInfo.deleteMany({}),
      SiteSettings.deleteMany({}),
      Newsletter.deleteMany({}),
      PageView.deleteMany({}),
    ]);
    // Keep admin account and messages intact
    res.redirect('/admin');
  } catch (err) {
    console.error('Reset error:', err);
    res.redirect('/admin');
  }
});

// ========== HERO SLIDES ==========
router.get('/hero-slides', async (req, res) => {
  const slides = await HeroSlide.find().sort('sort_order');
  res.render('admin/hero-slides/index', { slides });
});

router.get('/hero-slides/new', (req, res) => {
  res.render('admin/hero-slides/form', { slide: null });
});

router.post('/hero-slides', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image_url = req.file.path;
    // Parse buttons from form
    if (req.body['buttons_label']) {
      const labels = Array.isArray(req.body['buttons_label']) ? req.body['buttons_label'] : [req.body['buttons_label']];
      const urls = Array.isArray(req.body['buttons_url']) ? req.body['buttons_url'] : [req.body['buttons_url']];
      const styles = Array.isArray(req.body['buttons_style']) ? req.body['buttons_style'] : [req.body['buttons_style']];
      data.buttons = labels.map((label, i) => ({
        label,
        url: urls[i] || '#',
        style: styles[i] || 'primary',
        sort_order: i,
      }));
    }
    delete data['buttons_label'];
    delete data['buttons_url'];
    delete data['buttons_style'];
    await HeroSlide.create(data);
    res.redirect('/admin/hero-slides');
  } catch (err) {
    res.redirect('/admin/hero-slides/new');
  }
});

router.get('/hero-slides/:id/edit', async (req, res) => {
  const slide = await HeroSlide.findById(req.params.id);
  if (!slide) return res.redirect('/admin/hero-slides');
  res.render('admin/hero-slides/form', { slide });
});

router.post('/hero-slides/:id', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image_url = req.file.path;
    if (req.body['buttons_label']) {
      const labels = Array.isArray(req.body['buttons_label']) ? req.body['buttons_label'] : [req.body['buttons_label']];
      const urls = Array.isArray(req.body['buttons_url']) ? req.body['buttons_url'] : [req.body['buttons_url']];
      const styles = Array.isArray(req.body['buttons_style']) ? req.body['buttons_style'] : [req.body['buttons_style']];
      data.buttons = labels.map((label, i) => ({
        label,
        url: urls[i] || '#',
        style: styles[i] || 'primary',
        sort_order: i,
      }));
    }
    delete data['buttons_label'];
    delete data['buttons_url'];
    delete data['buttons_style'];
    await HeroSlide.findByIdAndUpdate(req.params.id, data);
    res.redirect('/admin/hero-slides');
  } catch (err) {
    res.redirect('/admin/hero-slides');
  }
});

router.post('/hero-slides/:id/delete', async (req, res) => {
  await HeroSlide.findByIdAndDelete(req.params.id);
  res.redirect('/admin/hero-slides');
});

// ========== CATEGORIES ==========
router.get('/categories', async (req, res) => {
  const categories = await Category.find().sort('sort_order');
  res.render('admin/categories/index', { categories });
});

router.get('/categories/new', (req, res) => {
  res.render('admin/categories/form', { category: null });
});

router.post('/categories', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image_url = req.file.path;
    await Category.create(data);
    res.redirect('/admin/categories');
  } catch (err) {
    res.redirect('/admin/categories/new');
  }
});

router.get('/categories/:id/edit', async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.redirect('/admin/categories');
  res.render('admin/categories/form', { category });
});

router.post('/categories/:id', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image_url = req.file.path;
    await Category.findByIdAndUpdate(req.params.id, data);
    res.redirect('/admin/categories');
  } catch (err) {
    res.redirect('/admin/categories');
  }
});

router.post('/categories/:id/delete', async (req, res) => {
  await Product.deleteMany({ category: req.params.id });
  await Category.findByIdAndDelete(req.params.id);
  res.redirect('/admin/categories');
});

// ========== PRODUCTS ==========
router.get('/categories/:id/products', async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.redirect('/admin/categories');
  const products = await Product.find({ category: req.params.id }).sort('sort_order');
  res.render('admin/products/index', { category, products });
});

router.get('/categories/:id/products/new', async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.redirect('/admin/categories');
  res.render('admin/products/form', { category, product: null });
});

router.post('/categories/:id/products', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body, category: req.params.id };
    if (req.file) data.image_url = req.file.path;
    await Product.create(data);
    res.redirect(`/admin/categories/${req.params.id}/products`);
  } catch (err) {
    res.redirect(`/admin/categories/${req.params.id}/products/new`);
  }
});

router.get('/products/:id/edit', async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');
  if (!product) return res.redirect('/admin/categories');
  res.render('admin/products/form', { category: product.category, product });
});

router.post('/products/:id', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image_url = req.file.path;
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    res.redirect(`/admin/categories/${product.category}/products`);
  } catch (err) {
    res.redirect('/admin/categories');
  }
});

router.post('/products/:id/delete', async (req, res) => {
  const product = await Product.findById(req.params.id);
  const catId = product?.category;
  await Product.findByIdAndDelete(req.params.id);
  res.redirect(`/admin/categories/${catId}/products`);
});

// ========== FEATURES SECTION ==========
router.get('/features', async (req, res) => {
  const section = await FeaturesSection.findOne();
  res.render('admin/features/edit', { section: section || {} });
});

router.post('/features', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image_url = req.file.path;
    // Parse cards from form
    if (req.body['cards_icon']) {
      const icons = Array.isArray(req.body['cards_icon']) ? req.body['cards_icon'] : [req.body['cards_icon']];
      const titles = Array.isArray(req.body['cards_title']) ? req.body['cards_title'] : [req.body['cards_title']];
      const descs = Array.isArray(req.body['cards_description']) ? req.body['cards_description'] : [req.body['cards_description']];
      data.cards = icons.map((icon, i) => ({
        icon,
        title: titles[i] || '',
        description: descs[i] || '',
        sort_order: i,
      }));
    }
    delete data['cards_icon'];
    delete data['cards_title'];
    delete data['cards_description'];

    let section = await FeaturesSection.findOne();
    if (section) {
      Object.assign(section, data);
      await section.save();
    } else {
      await FeaturesSection.create(data);
    }
    res.redirect('/admin/features');
  } catch (err) {
    res.redirect('/admin/features');
  }
});

// ========== ABOUT PAGE ==========
router.get('/about', async (req, res) => {
  const page = await AboutPage.findOne();
  res.render('admin/about/edit', { page: page || {} });
});

router.post('/about', upload.fields([
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
      await AboutPage.create(data);
    }
    res.redirect('/admin/about');
  } catch (err) {
    res.redirect('/admin/about');
  }
});

// ========== CONTACT INFO ==========
router.get('/contact', async (req, res) => {
  const info = await ContactInfo.findOne();
  res.render('admin/contact/edit', { info: info || {} });
});

router.post('/contact', async (req, res) => {
  try {
    let info = await ContactInfo.findOne();
    if (info) {
      Object.assign(info, req.body);
      await info.save();
    } else {
      await ContactInfo.create(req.body);
    }
    res.redirect('/admin/contact');
  } catch (err) {
    res.redirect('/admin/contact');
  }
});

// ========== MESSAGES ==========
router.get('/messages', async (req, res) => {
  const messages = await ContactMessage.find().sort('-createdAt');
  const unreadCount = await ContactMessage.countDocuments({ is_read: false });
  res.render('admin/messages/index', { messages, unreadCount });
});

router.post('/messages/:id/read', async (req, res) => {
  await ContactMessage.findByIdAndUpdate(req.params.id, { is_read: true });
  res.redirect('/admin/messages');
});

router.post('/messages/:id/delete', async (req, res) => {
  await ContactMessage.findByIdAndDelete(req.params.id);
  res.redirect('/admin/messages');
});

// ========== SITE SETTINGS ==========
router.get('/site-settings', async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = await SiteSettings.create({});
  res.render('admin/site-settings/edit', { settings });
});

router.post('/site-settings', upload.fields([
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
      await SiteSettings.create(data);
    }
    res.redirect('/admin/site-settings');
  } catch (err) {
    res.redirect('/admin/site-settings');
  }
});

// ========== NEWSLETTER ==========
router.get('/newsletter', async (req, res) => {
  const subscribers = await Newsletter.find().sort('-subscribed_at');
  res.render('admin/newsletter/index', { subscribers });
});

router.post('/newsletter/:id/unsubscribe', async (req, res) => {
  await Newsletter.findByIdAndUpdate(req.params.id, { is_active: false });
  res.redirect('/admin/newsletter');
});

// ========== LEADS ==========
router.get('/leads', async (req, res) => {
  const statusFilter = req.query.status;
  const query = statusFilter ? { status: statusFilter } : {};
  const leads = await ContactMessage.find(query).sort('-createdAt');
  const counts = {
    all: await ContactMessage.countDocuments(),
    new: await ContactMessage.countDocuments({ status: 'new' }),
    contacted: await ContactMessage.countDocuments({ status: 'contacted' }),
    converted: await ContactMessage.countDocuments({ status: 'converted' }),
    lost: await ContactMessage.countDocuments({ status: 'lost' }),
  };
  res.render('admin/leads/index', { leads, counts, currentStatus: statusFilter || 'all' });
});

router.post('/leads/:id/status', async (req, res) => {
  await ContactMessage.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.redirect('/admin/leads');
});

router.post('/leads/:id/notes', async (req, res) => {
  await ContactMessage.findByIdAndUpdate(req.params.id, { notes: req.body.notes });
  res.redirect('/admin/leads');
});

// ========== ANALYTICS ==========
router.get('/analytics', async (req, res) => {
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

  res.render('admin/analytics/index', { totalViews, viewsByPage, viewsByDay, topReferrers });
});

// ========== CHANGE PASSWORD ==========
router.get('/change-password', (req, res) => {
  res.render('admin/change-password', { error: null, success: null });
});

router.post('/change-password', async (req, res) => {
  try {
    const { current_password, new_password, confirm_password } = req.body;
    if (new_password !== confirm_password) {
      return res.render('admin/change-password', { error: 'New passwords do not match.', success: null });
    }
    if (new_password.length < 6) {
      return res.render('admin/change-password', { error: 'Password must be at least 6 characters.', success: null });
    }
    const admin = await Admin.findById(req.admin._id || req.admin.id);
    if (!admin) {
      return res.render('admin/change-password', { error: 'Admin not found.', success: null });
    }
    const isMatch = await admin.comparePassword(current_password);
    if (!isMatch) {
      return res.render('admin/change-password', { error: 'Current password is incorrect.', success: null });
    }
    admin.password = new_password;
    await admin.save();
    res.render('admin/change-password', { error: null, success: 'Password updated successfully!' });
  } catch (err) {
    res.render('admin/change-password', { error: 'Something went wrong.', success: null });
  }
});

module.exports = router;
