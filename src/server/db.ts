import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const dbPath = path.join(process.cwd(), 'database.sqlite');
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

let sqlDb: SqlJsDatabase | null = null;
let initPromise: Promise<SqlJsDatabase> | null = null;

export async function initSqlJsDb(): Promise<SqlJsDatabase> {
  if (sqlDb) return sqlDb;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const SQL = await initSqlJs();
    if (fs.existsSync(dbPath)) {
      const filebuffer = fs.readFileSync(dbPath);
      sqlDb = new SQL.Database(filebuffer);
    } else {
      sqlDb = new SQL.Database();
    }
    return sqlDb;
  })();

  return initPromise;
}

function saveDb() {
  if (!sqlDb) return;
  try {
    const data = sqlDb.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  } catch (err) {
    console.error('Error saving sqlite database:', err);
  }
}

export async function runAsync(sql: string, params: any[] = []): Promise<any> {
  const db = await initSqlJsDb();
  db.run(sql, params);

  let lastID = 0;
  let changes = 0;
  try {
    const idRes = db.exec("SELECT last_insert_rowid() as id;");
    if (idRes.length > 0 && idRes[0].values.length > 0) {
      lastID = Number(idRes[0].values[0][0]) || 0;
    }
    const changesRes = db.exec("SELECT changes() as changes;");
    if (changesRes.length > 0 && changesRes[0].values.length > 0) {
      changes = Number(changesRes[0].values[0][0]) || 0;
    }
  } catch (e) {
    // ignore
  }

  saveDb();
  return { id: lastID, changes };
}

export async function getAsync(sql: string, params: any[] = []): Promise<any> {
  const db = await initSqlJsDb();
  const stmt = db.prepare(sql);
  if (params && params.length > 0) {
    stmt.bind(params);
  }
  let row: any = undefined;
  if (stmt.step()) {
    row = stmt.getAsObject();
  }
  stmt.free();
  return row;
}

export async function allAsync(sql: string, params: any[] = []): Promise<any[]> {
  const db = await initSqlJsDb();
  const stmt = db.prepare(sql);
  if (params && params.length > 0) {
    stmt.bind(params);
  }
  const rows: any[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

export async function initDatabase() {
  await initSqlJsDb();

  await runAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      status TEXT NOT NULL DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value_en TEXT,
      value_bn TEXT
    )
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS pages (
      slug TEXT PRIMARY KEY,
      title_en TEXT,
      title_bn TEXT,
      content_en TEXT,
      content_bn TEXT,
      seo_title_en TEXT,
      seo_title_bn TEXT,
      seo_desc_en TEXT,
      seo_desc_bn TEXT,
      og_image TEXT,
      noindex INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS services_col (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_en TEXT,
      title_bn TEXT,
      slug TEXT,
      description_en TEXT,
      description_bn TEXT,
      icon TEXT,
      image TEXT,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1
    )
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS portfolio_col (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_en TEXT,
      title_bn TEXT,
      client TEXT,
      category TEXT,
      description_en TEXT,
      description_bn TEXT,
      image TEXT,
      link TEXT,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1
    )
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS testimonials_col (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      company TEXT,
      photo TEXT,
      text_en TEXT,
      text_bn TEXT,
      rating INTEGER DEFAULT 5,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1
    )
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS team_col (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      role_en TEXT,
      role_bn TEXT,
      bio_en TEXT,
      bio_bn TEXT,
      photo TEXT,
      social_links TEXT,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1
    )
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS pricing_col (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_en TEXT,
      title_bn TEXT,
      price_usd TEXT,
      price_bdt TEXT,
      billing_cycle TEXT,
      features_en TEXT,
      features_bn TEXT,
      is_popular INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1
    )
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS faq_col (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT,
      question_en TEXT,
      question_bn TEXT,
      answer_en TEXT,
      answer_bn TEXT,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1
    )
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS blog_col (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_en TEXT,
      title_bn TEXT,
      slug TEXT UNIQUE,
      cover_image TEXT,
      author TEXT,
      date TEXT,
      content_en TEXT,
      content_bn TEXT,
      status TEXT DEFAULT 'published',
      views INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS inbox_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      name TEXT,
      email TEXT,
      phone TEXT,
      service TEXT,
      budget TEXT,
      message TEXT,
      plan_selected TEXT,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT,
      original_name TEXT,
      mime_type TEXT,
      size INTEGER,
      alt_text TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await runAsync(`
    CREATE TABLE IF NOT EXISTS activity_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      admin_email TEXT,
      action TEXT,
      details TEXT,
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed or ensure default super admin exists with password adminrsrs2026
  const existingAdmin = await getAsync(`SELECT * FROM users WHERE email = ?`, ['mdnafijusman@gmail.com']);
  const adminPass = process.env.ADMIN_PASSWORD || 'adminrsrs2026';
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(adminPass, salt);
  if (!existingAdmin) {
    await runAsync(
      `INSERT INTO users (name, email, password_hash, role, status) VALUES (?, ?, ?, ?, ?)`,
      ['MD Nafij Usman', 'mdnafijusman@gmail.com', hash, 'super_admin', 'active']
    );
    console.log(`Default Super Admin seeded: mdnafijusman@gmail.com with password ${adminPass}`);
  } else {
    await runAsync(`UPDATE users SET password_hash = ?, status = 'active' WHERE email = ?`, [hash, 'mdnafijusman@gmail.com']);
    console.log(`Default Super Admin password updated/verified for: mdnafijusman@gmail.com`);
  }

  // Seed default settings if empty
  const settingsCount = await getAsync(`SELECT COUNT(*) as count FROM settings`);
  if (!settingsCount || settingsCount.count === 0) {
    const defaultSettings: [string, string, string][] = [
      ['site_name', 'RanSovie IT Agency & Technology', 'র‍্যানসোভি আইটি এজেন্সি এন্ড টেকনোলজি'],
      ['phone', '+8809638661612', '+8809638661612'],
      ['email', 'ransovieiatechnologybd@gmail.com', 'ransovieiatechnologybd@gmail.com'],
      ['address', 'House 12, Road 4, Sector 3, Uttara, Dhaka-1230', 'হাউস ১২, রোড ৪, সেক্টর ৩, উত্তরা, ঢাকা-১২৩০'],
      ['working_hours', 'Sat - Thu: 9:00 AM - 8:00 PM', 'শনি - বৃহস্পতি: সকাল ৯:০০ - রাত ৮:০০'],
      ['concern_of', 'A concern of Ar Raiyan International Group', 'আর রাইয়ান ইন্টারন্যাশনাল গ্রুপের একটি অঙ্গপ্রতিষ্ঠান'],
      ['footer_text', 'Empowering global businesses with next-generation software, AI solutions, and digital excellence.', 'পরবর্তী প্রজন্মের সফটওয়্যার, এআই সলিউশন এবং ডিজিটাল এক্সিলেন্স দিয়ে বিশ্বব্যাপী ব্যবসার ক্ষমতায়ন।'],
      ['copyright', '© 2025 RanSovie IT Agency & Technology. All rights reserved.', '© ২০২৫ র‍্যানসোভি আইটি এজেন্সি এন্ড টেকনোলজি। সর্বস্বত্ব সংরক্ষিত।'],
      ['currency_symbol', '$', '৳'],
      ['facebook', 'https://facebook.com/ransovie', 'https://facebook.com/ransovie'],
      ['linkedin', 'https://linkedin.com/company/ransovie', 'https://linkedin.com/company/ransovie'],
      ['github', 'https://github.com/ransovie', 'https://github.com/ransovie'],
      ['calendly', 'https://calendly.com/ransovie', 'https://calendly.com/ransovie']
    ];
    for (const [key, en, bn] of defaultSettings) {
      await runAsync(`INSERT OR REPLACE INTO settings (key, value_en, value_bn) VALUES (?, ?, ?)`, [key, en, bn]);
    }
  }

  // Seed default services if empty
  const servicesCount = await getAsync(`SELECT COUNT(*) as count FROM services_col`);
  if (!servicesCount || servicesCount.count === 0) {
    const defaultServices = [
      ['Custom Web Development', 'কাস্টম ওয়েব ডেভেলপমেন্ট', 'web-development', 'High-performance scalable web apps built with modern frameworks.', 'আধুনিক ফ্রেমওয়ার্ক দিয়ে তৈরি উচ্চ কার্যক্ষমতাসম্পন্ন স্কেলেবল ওয়েব অ্যাপ।', 'Code', 1],
      ['Graphic & UI/UX Design', 'গ্রাফিক ও ইউআই/ইউএক্স ডিজাইন', 'graphic-design', 'Stunning brand identities and intuitive user interfaces.', 'আকর্ষণীয় ব্র্যান্ড আইডেন্টিটি এবং স্বজ্ঞাত ইউজার ইন্টারফেস।', 'Palette', 2],
      ['Digital Marketing & SEO', 'ডিজিটাল মার্কেটিং ও এসইও', 'digital-marketing', 'Data-driven marketing strategies to scale your revenue.', 'আপনার আয় বাড়াতে ডেটা-চালিত মার্কেটিং স্ট্র্যাটেজি।', 'TrendingUp', 3],
      ['Mobile App Development', 'মোবাইল অ্যাপ ডেভেলপমেন্ট', 'app-development', 'Cross-platform native iOS & Android applications.', 'ক্রস-প্ল্যাটফর্ম নেটিভ আইওএস এবং অ্যান্ড্রয়েড অ্যাপ্লিকেশন।', 'Smartphone', 4]
    ];
    for (const [tEn, tBn, slug, dEn, dBn, icon, order] of defaultServices) {
      await runAsync(
        `INSERT INTO services_col (title_en, title_bn, slug, description_en, description_bn, icon, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
        [tEn, tBn, slug, dEn, dBn, icon, order]
      );
    }
  }

  // Seed default portfolio if empty
  const portCount = await getAsync(`SELECT COUNT(*) as count FROM portfolio_col`);
  if (!portCount || portCount.count === 0) {
    await runAsync(
      `INSERT INTO portfolio_col (title_en, title_bn, client, category, description_en, description_bn, image, link, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      ['Enterprise Cloud ERP', 'এন্টারপ্রাইজ ক্লাউড ইআরপি', 'Global Logistics Ltd.', 'Web App', 'Comprehensive logistics management and supply chain tracking system.', 'বিস্তৃত লজিস্টিকস ম্যানেজমেন্ট এবং সাপ্লাই চেইন ট্র্যাকিং সিস্টেম।', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 'https://ransovieitagency.com', 1]
    );
  }

  // Seed default FAQs if empty
  const faqCount = await getAsync(`SELECT COUNT(*) as count FROM faq_col`);
  if (!faqCount || faqCount.count === 0) {
    await runAsync(
      `INSERT INTO faq_col (category, question_en, question_bn, answer_en, answer_bn, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, 1)`,
      ['General', 'What services does RanSovie provide?', 'র‍্যানসোভি কী কী সেবা প্রদান করে?', 'We provide custom software development, web & mobile apps, graphic design, and digital marketing.', 'আমরা কাস্টম সফটওয়্যার ডেভেলপমেন্ট, ওয়েব ও মোবাইল অ্যাপ, গ্রাফিক ডিজাইন এবং ডিজিটাল মার্কেটিং সেবা প্রদান করি।', 1]
    );
  }

  console.log('Database initialized and seeded successfully.');
}
