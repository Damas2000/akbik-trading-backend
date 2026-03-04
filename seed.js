require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const HeroSlide = require('./models/HeroSlide');
const Category = require('./models/Category');
const FeaturesSection = require('./models/FeaturesSection');
const AboutPage = require('./models/AboutPage');
const ContactInfo = require('./models/ContactInfo');
const SiteSettings = require('./models/SiteSettings');
const Product = require('./models/Product');

async function seed() {
  await connectDB();
  console.log('Seeding database...');

  // Admin user
  const existingAdmin = await Admin.findOne({ username: 'admin' });
  if (!existingAdmin) {
    await Admin.create({ username: 'admin', password: 'admin123' });
    console.log('Admin user created (admin / admin123)');
  } else {
    console.log('Admin user already exists');
  }

  // ==================== HERO SLIDES (3 slides) ====================
  const slideCount = await HeroSlide.countDocuments();
  if (slideCount === 0) {
    await HeroSlide.insertMany([
      {
        image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80',
        headline: 'Your Trusted Partner in Hardware & Building Supplies',
        subheading: 'From industrial-grade power tools to premium construction materials — Akbik Trading delivers quality you can build on.',
        badge_text: 'Serving the Region Since 1985',
        sort_order: 0,
        buttons: [
          { label: 'BROWSE PRODUCTS', url: '#', style: 'primary', sort_order: 0 },
          { label: 'CONTACT US', url: '/contact', style: 'secondary', sort_order: 1 },
        ],
      },
      {
        image_url: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1600&q=80',
        headline: 'Professional Tools for Every Job',
        subheading: 'Whether you are a seasoned contractor or a weekend warrior, we have the tools and expertise to get the job done right.',
        badge_text: 'Over 10,000 Products In Stock',
        sort_order: 1,
        buttons: [
          { label: 'SHOP POWER TOOLS', url: '#', style: 'primary', sort_order: 0 },
          { label: 'VIEW CATALOG', url: '#', style: 'secondary', sort_order: 1 },
        ],
      },
      {
        image_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80',
        headline: 'Build Smarter, Build Stronger',
        subheading: 'Premium building materials, expert advice, and fast delivery across the region. Your project starts here.',
        badge_text: 'Free Delivery on Orders Over $200',
        sort_order: 2,
        buttons: [
          { label: 'GET A QUOTE', url: '/contact', style: 'primary', sort_order: 0 },
          { label: 'OUR SERVICES', url: '/about', style: 'secondary', sort_order: 1 },
        ],
      },
    ]);
    console.log('3 Hero slides created');
  } else {
    console.log('Hero slides already exist');
  }

  // ==================== CATEGORIES (6 categories) ====================
  const catCount = await Category.countDocuments();
  if (catCount === 0) {
    await Category.insertMany([
      {
        name: 'Power Tools',
        image_url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80',
        sort_order: 0,
      },
      {
        name: 'Hand Tools',
        image_url: 'https://images.unsplash.com/photo-1530124566582-a45a7e3d0a60?w=600&q=80',
        sort_order: 1,
      },
      {
        name: 'Plumbing Supplies',
        image_url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80',
        sort_order: 2,
      },
      {
        name: 'Paints & Finishes',
        image_url: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&q=80',
        sort_order: 3,
      },
      {
        name: 'Electrical & Lighting',
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
        sort_order: 4,
      },
      {
        name: 'Safety & Workwear',
        image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
        sort_order: 5,
      },
    ]);
    console.log('6 Categories created');
  } else {
    console.log('Categories already exist');
  }

  // ==================== FEATURES SECTION ====================
  const featCount = await FeaturesSection.countDocuments();
  if (featCount === 0) {
    await FeaturesSection.create({
      title: 'Trusted Expertise Since 1985',
      description: 'Akbik Trading has been the go-to hardware supplier for contractors, builders, and homeowners across the region. Our knowledgeable team ensures you get exactly what your project demands — no compromises, no shortcuts.',
      image_url: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&q=80',
      badge_text: '100% Satisfaction Guaranteed',
      cards: [
        { icon: 'verified_user', title: 'Authorized Dealer', description: 'Official distributor for DeWalt, Makita, Bosch, Milwaukee, and other leading brands.', sort_order: 0 },
        { icon: 'local_shipping', title: 'Fast Delivery', description: 'Same-day dispatch for in-stock items. Region-wide delivery fleet at your service.', sort_order: 1 },
        { icon: 'support_agent', title: 'Expert Support', description: 'Technical guidance from trade professionals with 20+ years of hands-on experience.', sort_order: 2 },
        { icon: 'inventory', title: 'Huge Inventory', description: 'Over 10,000 products ready to ship from our 5,000 sqm warehouse facility.', sort_order: 3 },
      ],
    });
    console.log('Features section created');
  } else {
    console.log('Features section already exists');
  }

  // ==================== ABOUT PAGE ====================
  const aboutCount = await AboutPage.countDocuments();
  if (aboutCount === 0) {
    await AboutPage.create({
      hero_image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80',
      hero_badge: 'Since 1985',
      hero_title: 'Building Trust, One Project at a Time',
      hero_description: 'For nearly four decades, Akbik Trading has been equipping professionals and DIY enthusiasts with the best tools, materials, and expert advice in the industry.',
      hero_button1_text: 'Get in Touch',
      hero_button1_url: '/contact',
      hero_button2_text: 'Our Products',
      hero_button2_url: '#',
      story_subtitle: 'Our Story',
      story_title: 'From a Small Workshop to a Regional Leader',
      story_paragraphs: [
        'Akbik Trading was founded in 1985 with a simple mission: provide the highest quality hardware and building supplies at fair prices. What started as a modest storefront has grown into one of the region\'s most trusted names in the construction and hardware industry.',
        'Over the years, we have built lasting relationships with top manufacturers worldwide — from DeWalt and Makita to Bosch and Stanley. These partnerships allow us to offer an unmatched selection of professional-grade products backed by manufacturer warranties and local support.',
        'Today, Akbik Trading serves thousands of contractors, builders, interior designers, and homeowners from our 5,000 sqm showroom and warehouse. While our operations have expanded significantly, our core values remain unchanged — quality products, honest pricing, and service you can count on.',
      ],
      card1_icon: 'verified',
      card1_title: 'Quality Guaranteed',
      card1_description: 'We stock only brands we trust and stand behind every product we sell with full warranty support.',
      card2_icon: 'groups',
      card2_title: 'Community Focused',
      card2_description: 'Proud supporters of local trade schools, apprenticeship programs, and community development initiatives.',
      image1_url: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&q=80',
      image1_caption: 'Our Warehouse & Showroom',
      image2_url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80',
      image3_url: 'https://images.unsplash.com/photo-1530124566582-a45a7e3d0a60?w=600&q=80',
      cta_title: 'Need help choosing the right materials?',
      cta_description: 'Our specialists have combined experience of over 100 years in construction, plumbing, electrical, and finishing work.',
      cta_link_text: 'Talk to a Specialist',
      cta_link_url: '/contact',
      visit_title: 'Visit Our Showroom',
      visit_description: 'Come see our full product range in person. Walk through 5,000 sqm of tools, materials, and supplies. Our team is ready to help you find exactly what you need.',
    });
    console.log('About page created');
  } else {
    console.log('About page already exists');
  }

  // ==================== CONTACT INFO ====================
  const contactCount = await ContactInfo.countDocuments();
  if (contactCount === 0) {
    await ContactInfo.create({
      page_title: 'Get in Touch',
      page_description: 'Have a question about a product or need a custom quote for your project? Our team of experienced professionals is here to help. Reach out by phone, email, or visit our showroom.',
      google_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.5!2d35.5!3d33.89!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU0JzAwLjAiTiAzNcKwMzAnMDAuMCJF!5e0!3m2!1sen!2s!4v1',
      address: 'Industrial Zone, Block 7, Building 12\nBeirut, Lebanon',
      phone: '+961 1 234 567',
      email: 'info@akbiktrading.com',
      hours_weekday: '8:00 AM - 6:00 PM',
      hours_saturday: '8:00 AM - 2:00 PM',
      hours_sunday: 'Closed',
    });
    console.log('Contact info created');
  } else {
    console.log('Contact info already exists');
  }

  // ==================== SITE SETTINGS ====================
  const settingsCount = await SiteSettings.countDocuments();
  if (settingsCount === 0) {
    await SiteSettings.create({
      site_name: 'Akbik Trading',
      footer_text: 'Your trusted partner for hardware, tools, and building supplies since 1985. Serving contractors, builders, and homeowners across the region with quality products and expert service.',
      meta_title: 'Akbik Trading - Hardware & Building Supplies',
      meta_description: 'Akbik Trading is a leading supplier of power tools, hand tools, plumbing supplies, paints, electrical equipment, and safety gear for professionals and homeowners.',
      meta_keywords: 'hardware, tools, building supplies, plumbing, electrical, paint, construction, power tools, Akbik Trading, Lebanon',
      cta_title: 'Stay Ahead of Your Next Project',
      cta_description: 'Subscribe to our newsletter for new product alerts, trade tips, exclusive deals, and seasonal promotions delivered straight to your inbox.',
      social_facebook: 'https://facebook.com/akbiktrading',
      social_instagram: 'https://instagram.com/akbiktrading',
      social_whatsapp: 'https://wa.me/9611234567',
    });
    console.log('Site settings created');
  } else {
    console.log('Site settings already exist');
  }

  // ==================== PRODUCTS (3+ per category) ====================
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    const categories = await Category.find();
    const catMap = {};
    categories.forEach(c => { catMap[c.name] = c._id; });

    const products = [
      // ===== Power Tools (5) =====
      { category: catMap['Power Tools'], name: 'DeWalt 20V MAX Cordless Drill', price: 189.99, description: 'Professional-grade 20V MAX brushless cordless drill/driver with 2-speed gearbox, LED work light, side handle, and two 2.0Ah lithium-ion batteries with fast charger.', image_url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80', sort_order: 0 },
      { category: catMap['Power Tools'], name: 'Makita 7-1/4" Circular Saw', price: 249.99, description: 'Powerful 15-amp motor circular saw with magnesium components for reduced weight. Features built-in dust blower, electric brake, and precision laser guide for accurate cuts.', image_url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80', sort_order: 1 },
      { category: catMap['Power Tools'], name: 'Bosch SDS-Plus Rotary Hammer', price: 329.99, description: 'Heavy-duty rotary hammer for concrete, brick, and masonry. Three operation modes: hammer drill, rotation only, and chiseling. Vibration Control side handle and depth gauge included.', image_url: 'https://images.unsplash.com/photo-1530124566582-a45a7e3d0a60?w=400&q=80', sort_order: 2 },
      { category: catMap['Power Tools'], name: 'Milwaukee M18 Impact Driver', price: 179.99, description: 'Compact impact driver delivering 1,800 in-lbs of torque. REDLINK intelligence prevents overload and overheating. Tri-LED lighting eliminates shadows. Battery and charger included.', image_url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80', sort_order: 3 },
      { category: catMap['Power Tools'], name: 'Bosch 4-1/2" Angle Grinder', price: 84.99, description: 'Versatile angle grinder for cutting, grinding, and polishing metal, stone, and concrete. 11,000 RPM, paddle switch for safety, and Service Minder brush system.', image_url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80', sort_order: 4 },

      // ===== Hand Tools (5) =====
      { category: catMap['Hand Tools'], name: 'Stanley 65-Piece Socket Set', price: 89.99, description: 'Professional-grade chrome vanadium socket set with 1/4" and 3/8" drives. Includes ratchets, extensions, universal joint, and spark plug sockets in a durable blow-mold case.', image_url: 'https://images.unsplash.com/photo-1530124566582-a45a7e3d0a60?w=400&q=80', sort_order: 0 },
      { category: catMap['Hand Tools'], name: 'Irwin Vise-Grip Pliers Set (5pc)', price: 64.99, description: 'Five essential locking pliers in one set: 10" curved jaw, 7" curved jaw, 6" long nose, 5" curved jaw, and 6" diagonal cutting. Chrome vanadium construction for durability.', image_url: 'https://images.unsplash.com/photo-1530124566582-a45a7e3d0a60?w=400&q=80', sort_order: 1 },
      { category: catMap['Hand Tools'], name: 'Stanley FatMax Tape Measure 8m', price: 24.99, description: 'Heavy-duty 8m tape measure with BladeArmor coating for long blade life. Mylar polyester film for abrasion resistance. 3.3m standout for solo measuring jobs.', image_url: 'https://images.unsplash.com/photo-1530124566582-a45a7e3d0a60?w=400&q=80', sort_order: 2 },
      { category: catMap['Hand Tools'], name: 'Knipex Adjustable Wrench Set (3pc)', price: 79.99, description: 'Three precision-forged adjustable wrenches (6", 8", and 10") with chrome vanadium steel and polished chrome finish. Precise jaw adjustment with no play.', image_url: 'https://images.unsplash.com/photo-1530124566582-a45a7e3d0a60?w=400&q=80', sort_order: 3 },
      { category: catMap['Hand Tools'], name: 'Bahco Hacksaw Frame + 10 Blades', price: 34.99, description: 'Professional hacksaw frame with quick blade release mechanism and ergonomic soft-grip handle. Includes 10 bi-metal blades for cutting metal, plastic, and wood.', image_url: 'https://images.unsplash.com/photo-1530124566582-a45a7e3d0a60?w=400&q=80', sort_order: 4 },

      // ===== Plumbing Supplies (5) =====
      { category: catMap['Plumbing Supplies'], name: 'Copper Fitting Assortment (50pc)', price: 94.99, description: 'Complete professional copper fitting kit with elbows, tees, couplings, reducers, and end caps for 1/2" to 1" pipes. Meets all plumbing codes.', image_url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&q=80', sort_order: 0 },
      { category: catMap['Plumbing Supplies'], name: 'PPR Hot & Cold Pipe Bundle', price: 62.99, description: 'High-quality PPR pipes in 20mm, 25mm, and 32mm diameters. PN20 rated for hot water systems up to 95°C. 4-meter lengths, bundle of 10 pieces.', image_url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&q=80', sort_order: 1 },
      { category: catMap['Plumbing Supplies'], name: 'Brass Ball Valve Set (6pc)', price: 72.99, description: 'Premium forged brass ball valves in 1/2", 3/4", and 1" sizes (2 each). Full-port design for maximum flow. Chrome-plated, rated for 600 WOG.', image_url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&q=80', sort_order: 2 },
      { category: catMap['Plumbing Supplies'], name: 'Pipe Wrench Set (3pc)', price: 69.99, description: 'Heavy-duty forged steel pipe wrench set in 10", 14", and 18" sizes. Adjustable jaws with sharp teeth for positive grip. Perfect for plumbers and contractors.', image_url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&q=80', sort_order: 3 },
      { category: catMap['Plumbing Supplies'], name: 'Grundfos Submersible Pump 1HP', price: 349.99, description: 'Stainless steel submersible water pump with 1HP motor. Moves up to 5,000 liters per hour at 30m head. Ideal for wells, tanks, and irrigation systems.', image_url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&q=80', sort_order: 4 },

      // ===== Paints & Finishes (5) =====
      { category: catMap['Paints & Finishes'], name: 'Jotun Majestic True Beauty (4L)', price: 52.99, description: 'Ultra-premium interior wall paint with silk-like finish. Superior coverage, washable, and stain-resistant. Available in over 2,000 colors via Jotun Multicolor system.', image_url: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80', sort_order: 0 },
      { category: catMap['Paints & Finishes'], name: 'Jotun Jotashield Extreme (4L)', price: 64.99, description: 'Premium exterior wall paint with 12-year dirt-resistance guarantee. UV protection, anti-algae formula, and self-cleaning properties for lasting facade beauty.', image_url: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80', sort_order: 1 },
      { category: catMap['Paints & Finishes'], name: 'Hempel Wood Varnish Gloss (1L)', price: 28.99, description: 'High-quality polyurethane wood varnish in gloss finish. Crystal-clear formula enhances natural wood grain. Scratch-resistant, suitable for interior furniture and doors.', image_url: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80', sort_order: 2 },
      { category: catMap['Paints & Finishes'], name: 'Epoxy Floor Coating Kit (10L)', price: 129.99, description: 'Industrial-strength two-part epoxy floor coating for garages, workshops, and commercial areas. Self-leveling formula with anti-slip aggregate and decorative flakes.', image_url: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80', sort_order: 3 },
      { category: catMap['Paints & Finishes'], name: 'Spray Paint Assorted (12 Cans)', price: 59.99, description: 'Professional aerosol spray paint set with 12 popular colors. Quick-dry acrylic-enamel formula. Indoor/outdoor use on metal, wood, plastic, and masonry surfaces.', image_url: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80', sort_order: 4 },

      // ===== Electrical & Lighting (5) =====
      { category: catMap['Electrical & Lighting'], name: 'Electrical Cable Kit (100m)', price: 139.99, description: 'Professional wiring bundle with 100m each of 1.5mm, 2.5mm, and 4mm single-core copper cables. PVC insulated, flame-retardant, suitable for residential and commercial installations.', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', sort_order: 0 },
      { category: catMap['Electrical & Lighting'], name: 'Schneider Distribution Board 18-Way', price: 219.99, description: 'Schneider Electric Acti9 18-way distribution board with 100A main switch, DIN rail, and transparent door. IP30 rated for indoor residential and commercial use.', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', sort_order: 1 },
      { category: catMap['Electrical & Lighting'], name: 'Philips LED Panel 60x60 (4-Pack)', price: 139.99, description: 'Energy-efficient 40W LED panel lights by Philips. 4000K neutral white, flicker-free driver, 4000 lumens output. Perfect for offices, shops, and suspended ceilings.', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', sort_order: 2 },
      { category: catMap['Electrical & Lighting'], name: 'Legrand Switches & Sockets Set (20pc)', price: 89.99, description: 'Legrand Valena Life series switches and sockets in elegant white. Set includes 10x single sockets (16A), 5x single switches, and 5x double switches with frames.', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', sort_order: 3 },
      { category: catMap['Electrical & Lighting'], name: 'Fluke 117 Digital Multimeter', price: 189.99, description: 'True-RMS digital multimeter designed for electricians. Non-contact voltage detection, AutoVolt, low impedance mode, and CAT III 600V / CAT IV 300V safety rated.', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', sort_order: 4 },

      // ===== Safety & Workwear (5) =====
      { category: catMap['Safety & Workwear'], name: '3M Safety Glasses (3-Pack)', price: 29.99, description: 'Lightweight wraparound safety glasses with anti-scratch and anti-fog polycarbonate lenses. UV400 protection. ANSI Z87.1+ certified. Three lens tints: clear, tinted, and amber.', image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80', sort_order: 0 },
      { category: catMap['Safety & Workwear'], name: 'Caterpillar Steel Toe Boots', price: 129.99, description: 'Premium CAT steel-toe work boots with oil-resistant rubber outsole, electrical hazard protection, and padded collar. Nubuck leather upper, available sizes 39-46.', image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80', sort_order: 1 },
      { category: catMap['Safety & Workwear'], name: 'Heavy-Duty Work Gloves (6 Pairs)', price: 44.99, description: 'Multipurpose work gloves with reinforced palm, breathable back, and adjustable wrist closure. Cut-resistant level 3. Ideal for construction, handling, and assembly work.', image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80', sort_order: 2 },
      { category: catMap['Safety & Workwear'], name: 'MSA V-Gard Hard Hat', price: 34.99, description: 'Classic V-Gard hard hat with Fas-Trac III ratchet suspension for a customizable fit. ABS shell rated for Type I, Class E. Slots for earmuffs and face shields.', image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80', sort_order: 3 },
      { category: catMap['Safety & Workwear'], name: 'Hi-Vis Safety Vest (5-Pack)', price: 39.99, description: 'Class 2 high-visibility safety vests with reflective strips on front, back, and shoulders. Breathable mesh fabric, zippered front, and two large pockets. One size fits most.', image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80', sort_order: 4 },
    ];

    await Product.insertMany(products);
    console.log('Products created (' + products.length + ' items across 6 categories)');
  } else {
    console.log('Products already exist');
  }

  console.log('\nSeed complete!');
  console.log('================================');
  console.log('3 Hero Slides');
  console.log('6 Categories');
  console.log('30 Products (5 per category)');
  console.log('1 Features Section (4 cards)');
  console.log('1 About Page (full content)');
  console.log('1 Contact Info (with map)');
  console.log('1 Site Settings (with social links)');
  console.log('================================');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
