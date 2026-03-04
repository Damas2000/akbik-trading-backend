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

  // Hero Slide
  const slideCount = await HeroSlide.countDocuments();
  if (slideCount === 0) {
    await HeroSlide.create({
      image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6yVZ-SC39jTONkOzADUv1O9zKLvJvFPSfbxd55AZZ-ZsbN8fHBzeGsmXKtOsHmsiRXy0HVXYw5YzkAt3UT1daRKi-boPqHoVenH4OUSAtNTFAwTHYk3i9-jjC_tIND81BfBF_HqfMJTTBoTSdJA6VUzRtuLHk9XXWLnwK58xvMFkBXVFXSFKc6MkcXpdcO0N1pPQFo838fzbJ-h7KHQrtqS-uEhcrciC29-q47AqHzqxpYtpULyysDRtS1a36xKUUylMSNheIrvCs',
      headline: 'Built for the Professionals, Made for Everyone.',
      subheading: 'From heavy-duty power tools to industrial hardware, we provide high-performance supplies for the boldest projects.',
      badge_text: 'Free Delivery on Orders Over $100',
      sort_order: 0,
      buttons: [
        { label: 'SHOP COLLECTION', url: '#', style: 'primary', sort_order: 0 },
        { label: 'OUR SERVICES', url: '#', style: 'secondary', sort_order: 1 },
      ],
    });
    console.log('Hero slide created');
  } else {
    console.log('Hero slides already exist');
  }

  // Categories
  const catCount = await Category.countDocuments();
  if (catCount === 0) {
    await Category.insertMany([
      {
        name: 'Power Tools',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOUMoN7r73KMuj7XAN7eZBRnhToYgRKd1gAoYFVlDp8-CNf5lBeR6K8Z08jp2vKVNZPcVU65-Wol3tO9LYG0Z0wklJ55OaRy1FCjtBtgsf0qZ7fi864EVo6Am9uCupz_YLeod03FULhUDRSAB0boaqBLG8CEDCjfzTrH2k31ZfgHnYJA9QqRCH4XlK4wY7CyiMl0zAe0KpEgZgDv9vRayeuOAmqSTLOOVcgDpZfQlr1nqDNGoHCcAwYggisbT6VZJg1sju09I4In99',
        sort_order: 0,
      },
      {
        name: 'Industrial Plumbing',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGsfZuGQHt8sEPILY8l4shXA4ZEkTPTTfqTwo7IVa7UBQ0cw-gjUhZdsx-LthhjR-9GJ9Vuug4ly45C3snOVFWFT9LIwV1OdeaYEet5Ba5NCyxwrzWwPrLTZ6gmCu6qLzd8bp3pyVW-wFagsTaNT3u3h0Safgc08GFyn17j64_GknEntW0M74D4H_oe3nPGi59r_tR_UtdQvdEZEXD1oDGPk1cbtQ9Hu0bjzr_i-D0PPr6eZVFnLYWFOvgqkSi2kHPOhLGSHxphxvG',
        sort_order: 1,
      },
      {
        name: 'Paint & Coatings',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0bzcFuhKMhVSn3MREnMUtIXUi2fO-fDmjaW0Itc_bqIOseAo7QtGn3w34ymLCUXYw8iOYBQ_qysrSthNiud9mWCHmTHI1b3sdW2BWwObLDP99qXHQSCsgRUJOIFV6CoVHwNTEgFUxi5kT8FdlhA2v7dvutchVfxFRvwVK9Dwf7rfOs_SWOfEx-RCpzeK5ryvea7_5yE0Iid7q6Vg6dpS1Qx2doLDr1mRwbgKKJ_ltTuOw4GWtWtw5-7A9pm0n1qavYJLoCoTzfMLi',
        sort_order: 2,
      },
      {
        name: 'Electrical Supply',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXF5YLhvR5B4Iwd2IQFm7r1OicMc_6ZmpQU2kMd1jkrZ2Z65OrWUbGsMOJL2dYXxWy42Jb6MRbBqTj9ZPbRQS5sePQRPpPyo0GCyo_Bbu8l_ZZPlsWD6lWb37izXNh01mlWRd-TytYgUPu-WLcz5vtuTWCufBUICiOklWAIuTEzcMlpDG-2yJTXeNZagdzdrfEL5UqdUne4iJeh01XTuBlABg9Ii3yw4dmqckVFHAuuKxIlfkXtIPXDzU-mZegHHRHqUT7eWPoG4WZ',
        sort_order: 3,
      },
    ]);
    console.log('Categories created');
  } else {
    console.log('Categories already exist');
  }

  // Features Section
  const featCount = await FeaturesSection.countDocuments();
  if (featCount === 0) {
    await FeaturesSection.create({
      title: 'Rugged Hardware Since 1998',
      description: "We aren't just selling tools; we're building the infrastructure of our community. Our expert team of retired trade masters ensures you get the right spec, every time.",
      image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlWCc95okIolSU3HTVezMD1LxJaEptY3Z8JQ4x17lvqY236L-jgdyAUuUevkxcJ8DxSyXZJXbH6ROoAS5GS6y2fEEkQMk6Dtwt2YyugXOx1bhTP4sPaDkxdoiHpImRrAKsJhEwT_hji6su9nV1PINHFD5vSJWjgRSfGvxiIRCcjFPnrNisAPiYdOQPMXn-nb9q8zm2Yw9X-rnSLnJKeZZQcCW2F6pu3U6x0NmnWBMjGBW0zCBE1t0p4SP0uaZAzbirsiL7uLhKxdhR',
      badge_text: '100% Satisfaction Guaranteed',
      cards: [
        { icon: 'verified_user', title: 'Quality Brands', description: 'Authorized dealer for heavy-duty industrial giants.', sort_order: 0 },
        { icon: 'local_shipping', title: 'Rapid Delivery', description: 'Fleet response for on-site supply replenishment.', sort_order: 1 },
        { icon: 'support_agent', title: 'Trade Support', description: 'Technical project assistance from trade veterans.', sort_order: 2 },
        { icon: 'inventory', title: 'Massive Stock', description: 'Ready-to-ship inventory for large-scale contracts.', sort_order: 3 },
      ],
    });
    console.log('Features section created');
  } else {
    console.log('Features section already exists');
  }

  // About Page
  const aboutCount = await AboutPage.countDocuments();
  if (aboutCount === 0) {
    await AboutPage.create({
      hero_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG-qJw2JQqU2LXDLwmE9nNO9nTlntoT4-0QYrbRtU6scGGKAp8cNAhoKgRaXP2B4BgHIL2bLRE2LaPs2tOLnni5CnzZfKXFNfwlXIxjjwHVmKoVn0Kxxr3dN0khlM0O8BGbcX9G4KruIINs90czPek4DT4Cu61YJtO-bPHH6nzP1Qw9A3aKFXS_-ZX3vI8l-SU88WXq3vVArx4h9sVLvXgDBvSnLW8ydOATHz8vmPItU48aqrTBTR4khOUVDRk-BA4MppI8v38rLd4',
      hero_badge: 'Since 1954',
      hero_title: 'Our Legacy of Service',
      hero_description: 'Serving our community for over three generations with quality tools, expert advice, and a handshake you can trust.',
      hero_button1_text: 'Get in Touch',
      hero_button1_url: '/contact',
      hero_button2_text: 'View Our History',
      hero_button2_url: '#',
      story_subtitle: 'Our Story',
      story_title: 'From Humble Beginnings to a Community Pillar',
      story_paragraphs: [
        'Founded in 1954 by Arthur "Artie" Miller, Akbik Trading started as a small, one-room workshop in the heart of the valley. Artie believed that a hardware store should be more than just a place to buy nails\u2014it should be a resource for the neighborhood, a place where advice was free and every customer was treated like family.',
        'As the years passed and the town grew, so did we. We\'ve weathered economic shifts and technological revolutions, but our core mission has never wavered: "Build it right the first time."',
        'Today, Akbik Trading is managed by the third generation of the Miller family. While we\'ve added high-tech inventory systems and expanded our delivery fleet, we still keep a pot of coffee brewing for our regulars and take the time to walk you through every step of your DIY project.',
      ],
      card1_icon: 'verified',
      card1_title: 'Quality First',
      card1_description: "We only stock brands we'd use in our own homes.",
      card2_icon: 'groups',
      card2_title: 'Community Led',
      card2_description: 'Proud sponsors of local youth sports and housing initiatives.',
      image1_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa_dJeh_1ypFxMmwvVimQ9YDij-MHLzzBz0jynCYDbE8DSooWMaYtKMTomkm6dRyUth_2QUeu-EXH6upD07Yg3dORnr1USW4Ztz3HA-xGaVekD430png4tnLDOXk8uSERypgiKkGMX8GohtleiwMwluDy8ImGyQKYNnjezeRF40_vnaw9a38xHdPkyJVX3Iij3PPGSqoCVnXo6a9w_8mfpBWflTlC4GHgB2ahx9100tiUj2WdKw81tEUA8F-C6UMGPWfbl4Fj2WEvW',
      image1_caption: 'Our Expert Team (2024)',
      image2_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS71zp1sMiXpsES50u5Z2wEWO3QH_T9ezkyNsGe6MDXKaMpEsviozB_99b098KhVElm4FJryFR6P0OnrDRSs54LZXh67uZ5wcByAxBJ2ZFfzRhsWgDqk51wWvBTsFt5JC3HvDinnuaT0YqLC5fynChXFsQTr7jnIGQ06UR8UNCMdMaIQT--fhfCoRmyr2DWboGHHjrurApegZIxfhPckwu-QF9xMPxgGilcm-AGnKo0l9QfGKlE8820zDrqa3qrclG-pQvCKsjkPgq',
      image3_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf4aDjStWQCER0iWON8BEnlqwovxzZtYHAbO27xnKcJmdr4g0EF7lpU3YrAXrTr-9S5mcsRtb9rudpX-7BmGKBsIMGZz_MDQ6ZXh7oIjjX1U_0PJ9lpQlZVQgWwe6dMmMzqveQmgFb0qbE83L746IWljU-oN_XrE0Z3tQbhu7PJSVi1vrqKONHEluwGJwrdAbL90yFZEXhWSQgaMDGMORCp4QE14pye3kfU_FqRgGuAcbDDv3zQMyAVX2b_7IRYnqiKBcNvRJJ4sz_',
      cta_title: 'Need expert advice?',
      cta_description: 'Our staff has a combined experience of over 120 years in plumbing, electrical, and carpentry.',
      cta_link_text: 'Talk to an Expert',
      cta_link_url: '/contact',
      visit_title: 'Visit Us Today',
      visit_description: 'We are open 7 days a week. Find us on Main Street or reach out for custom project quotes.',
    });
    console.log('About page created');
  } else {
    console.log('About page already exists');
  }

  // Contact Info
  const contactCount = await ContactInfo.countDocuments();
  if (contactCount === 0) {
    await ContactInfo.create({
      page_title: 'Get in Touch',
      page_description: 'Have a project in mind? Our experts are ready to help you find the right tools and materials for the job. Visit us in-store or send a message below.',
      google_maps_url: '',
      address: '123 Builder Lane, Industrial District\nChicago, IL 60601',
      phone: '(555) 123-4567',
      email: 'hello@buildright.com',
      hours_weekday: '7:00 AM - 8:00 PM',
      hours_saturday: '8:00 AM - 6:00 PM',
      hours_sunday: '9:00 AM - 4:00 PM',
    });
    console.log('Contact info created');
  } else {
    console.log('Contact info already exists');
  }

  // Site Settings
  const settingsCount = await SiteSettings.countDocuments();
  if (settingsCount === 0) {
    await SiteSettings.create({
      site_name: 'Akbik Trading',
      footer_text: 'Quality tools and construction supplies for professionals and DIY enthusiasts since 1954.',
      meta_title: 'Akbik Trading - Hardware Experts',
      meta_description: 'Quality tools and construction supplies for professionals and DIY enthusiasts',
      meta_keywords: 'hardware, tools, construction, plumbing, electrical, paint',
    });
    console.log('Site settings created');
  } else {
    console.log('Site settings already exist');
  }

  // Products (seed per category)
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    const categories = await Category.find();
    const catMap = {};
    categories.forEach(c => { catMap[c.name] = c._id; });

    const products = [
      // Power Tools
      { category: catMap['Power Tools'], name: 'Cordless Drill 20V', price: 129.99, description: 'High-performance 20V cordless drill with brushless motor and 2-speed gearbox. Includes 2 batteries and carrying case.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Cordless+Drill', sort_order: 0 },
      { category: catMap['Power Tools'], name: 'Circular Saw 7-1/4"', price: 189.99, description: 'Professional-grade circular saw with laser guide and dust blower. 15-amp motor for tough cuts through hardwood and plywood.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Circular+Saw', sort_order: 1 },
      { category: catMap['Power Tools'], name: 'Impact Driver Kit', price: 149.99, description: 'Compact impact driver with 1,800 in-lbs of torque. Variable speed trigger and built-in LED work light.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Impact+Driver', sort_order: 2 },
      { category: catMap['Power Tools'], name: 'Rotary Hammer SDS-Plus', price: 279.99, description: 'Heavy-duty rotary hammer for concrete and masonry. 3 modes: hammer drill, rotation only, and hammer only.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Rotary+Hammer', sort_order: 3 },
      { category: catMap['Power Tools'], name: 'Angle Grinder 4-1/2"', price: 69.99, description: 'Versatile angle grinder for cutting, grinding, and polishing. 11,000 RPM with paddle switch for safety.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Angle+Grinder', sort_order: 4 },

      // Industrial Plumbing
      { category: catMap['Industrial Plumbing'], name: 'Copper Fitting Kit (50pc)', price: 89.99, description: 'Complete copper fitting assortment with elbows, tees, couplings, and adapters. Fits 1/2" to 1" pipes.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Copper+Fittings', sort_order: 0 },
      { category: catMap['Industrial Plumbing'], name: 'PVC Pipe Set', price: 45.99, description: 'Schedule 40 PVC pipe bundle with assorted diameters. Ideal for drain, waste, and vent applications.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=PVC+Pipes', sort_order: 1 },
      { category: catMap['Industrial Plumbing'], name: 'Ball Valve Set (6pc)', price: 64.99, description: 'Brass ball valves in common sizes. Full-port design for maximum flow rate. Lead-free and NSF certified.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Ball+Valves', sort_order: 2 },
      { category: catMap['Industrial Plumbing'], name: 'Heavy-Duty Pipe Wrench 18"', price: 42.99, description: 'Forged steel pipe wrench with adjustable jaw. Self-tightening design grips pipes from 1/8" to 2".', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Pipe+Wrench', sort_order: 3 },
      { category: catMap['Industrial Plumbing'], name: 'Submersible Water Pump', price: 189.99, description: 'Stainless steel submersible pump rated at 1/2 HP. Moves up to 2,000 GPH for dewatering and irrigation.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Water+Pump', sort_order: 4 },

      // Paint & Coatings
      { category: catMap['Paint & Coatings'], name: 'Interior Latex Paint (1 Gal)', price: 38.99, description: 'Premium interior latex paint with excellent coverage. Low-VOC formula in eggshell finish. One-coat coverage on most surfaces.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Latex+Paint', sort_order: 0 },
      { category: catMap['Paint & Coatings'], name: 'Exterior Primer (1 Gal)', price: 32.99, description: 'High-adhesion exterior primer for wood, metal, and masonry. Blocks stains and seals porous surfaces.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Exterior+Primer', sort_order: 1 },
      { category: catMap['Paint & Coatings'], name: 'Spray Paint Set (12 Cans)', price: 54.99, description: 'Assorted color spray paint set. Quick-dry enamel formula with EZ-touch fan spray tip for all surfaces.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Spray+Paint', sort_order: 2 },
      { category: catMap['Paint & Coatings'], name: 'Wood Stain (1 Qt)', price: 18.99, description: 'Oil-based wood stain in classic walnut. Deep penetration formula enhances wood grain. Interior/exterior use.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Wood+Stain', sort_order: 3 },
      { category: catMap['Paint & Coatings'], name: 'Epoxy Coating Kit', price: 79.99, description: 'Two-part epoxy coating for garage floors and concrete. Includes cleaner, epoxy base, and decorative chips.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Epoxy+Coating', sort_order: 4 },

      // Electrical Supply
      { category: catMap['Electrical Supply'], name: 'Electrical Wire Kit (500ft)', price: 149.99, description: 'Romex NM-B wire assortment. Includes 14/2, 12/2, and 14/3 gauges for residential wiring projects.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Wire+Kit', sort_order: 0 },
      { category: catMap['Electrical Supply'], name: 'Circuit Breaker Panel 200A', price: 449.99, description: '200-amp main breaker load center with 30 spaces. Indoor rated with copper bus bars. UL listed.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Breaker+Panel', sort_order: 1 },
      { category: catMap['Electrical Supply'], name: 'LED Bulb Pack (24pc)', price: 29.99, description: '60W equivalent LED bulbs in daylight white. 15,000-hour rated life. Energy Star certified. A19 base.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=LED+Bulbs', sort_order: 2 },
      { category: catMap['Electrical Supply'], name: 'Outlet & Switch Set (20pc)', price: 34.99, description: 'Tamper-resistant outlets and toggle switches with wall plates. Residential grade, 15-amp rated.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Outlets+Set', sort_order: 3 },
      { category: catMap['Electrical Supply'], name: 'Digital Cable Tester', price: 59.99, description: 'Professional digital cable tester with LCD display. Tests voltage, continuity, and wire mapping. CAT III rated.', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Cable+Tester', sort_order: 4 },
    ];

    await Product.insertMany(products);
    console.log('Products created (' + products.length + ' items)');
  } else {
    console.log('Products already exist');
  }

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
