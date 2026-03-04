require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API routes (public GET, protected POST/PUT/DELETE)
app.use('/api/hero-slides', require('./routes/api/heroSlides'));
app.use('/api/categories', require('./routes/api/categories'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/features-section', require('./routes/api/featuresSection'));
app.use('/api/about-page', require('./routes/api/aboutPage'));
app.use('/api/contact-info', require('./routes/api/contactInfo'));
app.use('/api/site-settings', require('./routes/api/siteSettings'));
app.use('/api/newsletter', require('./routes/api/newsletter'));
app.use('/api/analytics', require('./routes/api/analytics'));

// Admin auth routes
app.use('/admin', require('./routes/admin/auth'));

// Admin panel routes (protected)
app.use('/admin', require('./routes/admin/index'));

// Admin login API
const jwt = require('jsonwebtoken');
const Admin = require('./models/Admin');

app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
});
