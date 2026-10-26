import { Router } from 'express';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import * as archiver from 'archiver';
import { allAsync, getAsync, runAsync } from '../db';
import { requireAuth, requireSuperAdmin } from '../auth';

const router = Router();
router.use((req, res, next) => {
  (res as any).locals.layout = 'admin/layout';
  next();
});

// Multer storage for media uploads
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Login routes
router.get('/login', (req, res) => {
  if ((req as any).session.userId) {
    return res.redirect('/rsadminn');
  }
  res.render('admin/login', { error: null, layout: false });
});

router.post('/login', async (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase();
  const password = (req.body.password || '').trim();
  console.log('Login attempt received for email:', email);
  const user = await getAsync(`SELECT * FROM users WHERE LOWER(email) = LOWER(?) AND status = 'active'`, [email]);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    console.warn('Login failed for email:', email);
    return res.render('admin/login', { error: 'Invalid email or password. Default super admin is mdnafijusman@gmail.com with password adminrsrs2026.' });
  }

  (req as any).session.userId = user.id;
  (req as any).session.email = user.email;
  (req as any).session.role = user.role;
  (req as any).session.name = user.name;

  (req as any).session.save((err: any) => {
    if (err) {
      console.error('Session save error:', err);
    }
    console.log('Admin login successful, session saved:', user.email);
    res.redirect('/rsadminn');
  });
});

router.get('/logout', (req, res) => {
  (req as any).session.destroy(() => {
    res.redirect('/rsadminn/login');
  });
});

// Protect all other admin routes
// router.use(requireAuth);

// Dashboard
router.get('/', async (req, res) => {
  const messagesCount = (await getAsync(`SELECT COUNT(*) as count FROM inbox_messages WHERE status = 'new'`)).count;
  const subscribersCount = (await getAsync(`SELECT COUNT(*) as count FROM subscribers`)).count;
  const postsCount = (await getAsync(`SELECT COUNT(*) as count FROM blog_col WHERE status = 'published'`)).count;
  const servicesCount = (await getAsync(`SELECT COUNT(*) as count FROM services_col WHERE is_active = 1`)).count;

  res.render('admin/dashboard', {
    title: 'Dashboard',
    session: (req as any).session,
    stats: { messagesCount, subscribersCount, postsCount, servicesCount }
  });
});

// Global Settings
router.get('/settings', async (req, res) => {
  const settings = await allAsync(`SELECT * FROM settings`);
  res.render('admin/settings', {
    title: 'Global Settings',
    session: (req as any).session,
    settings,
    success: req.query.success === '1'
  });
});

router.post('/settings', async (req, res) => {
  const { settings_en, settings_bn } = req.body;
  if (settings_en) {
    for (const [key, val] of Object.entries(settings_en)) {
      const bnVal = settings_bn ? settings_bn[key] : val;
      await runAsync(`UPDATE settings SET value_en = ?, value_bn = ? WHERE key = ?`, [val, bnVal, key]);
    }
  }
  res.redirect('/rsadminn/settings?success=1');
});

// Services
router.get('/services', async (req, res) => {
  const services = await allAsync(`SELECT * FROM services_col ORDER BY sort_order ASC`);
  res.render('admin/services', {
    title: 'Services',
    session: (req as any).session,
    services
  });
});

// Portfolio
router.get('/portfolio', async (req, res) => {
  const portfolio = await allAsync(`SELECT * FROM portfolio_col ORDER BY sort_order ASC`);
  res.render('admin/portfolio', { title: 'Portfolio', session: (req as any).session, portfolio });
});

router.get('/portfolio/add', (req, res) => {
  res.render('admin/portfolio-form', { title: 'Add Project', session: (req as any).session, project: null });
});

router.post('/portfolio/add', async (req, res) => {
  const { title_en, title_bn, client, category, description_en, description_bn, image, link, sort_order, is_active } = req.body;
  await runAsync(
    `INSERT INTO portfolio_col (title_en, title_bn, client, category, description_en, description_bn, image, link, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title_en, title_bn, client, category, description_en, description_bn, image, link, sort_order, is_active ? 1 : 0]
  );
  res.redirect('/rsadminn/portfolio');
});

router.get('/portfolio/edit/:id', async (req, res) => {
  const project = await getAsync(`SELECT * FROM portfolio_col WHERE id = ?`, [req.params.id]);
  res.render('admin/portfolio-form', { title: 'Edit Project', session: (req as any).session, project });
});

router.post('/portfolio/edit/:id', async (req, res) => {
  const { title_en, title_bn, client, category, description_en, description_bn, image, link, sort_order, is_active } = req.body;
  await runAsync(
    `UPDATE portfolio_col SET title_en=?, title_bn=?, client=?, category=?, description_en=?, description_bn=?, image=?, link=?, sort_order=?, is_active=? WHERE id=?`,
    [title_en, title_bn, client, category, description_en, description_bn, image, link, sort_order, is_active ? 1 : 0, req.params.id]
  );
  res.redirect('/rsadminn/portfolio');
});

router.post('/portfolio/delete/:id', async (req, res) => {
  await runAsync(`DELETE FROM portfolio_col WHERE id = ?`, [req.params.id]);
  res.redirect('/rsadminn/portfolio');
});

// Testimonials
router.get('/testimonials', async (req, res) => {
  const testimonials = await allAsync(`SELECT * FROM testimonials_col ORDER BY sort_order ASC`);
  res.render('admin/testimonials', {
    title: 'Testimonials',
    session: (req as any).session,
    testimonials
  });
});

// Team
router.get('/team', async (req, res) => {
  const team = await allAsync(`SELECT * FROM team_col ORDER BY sort_order ASC`);
  res.render('admin/team', {
    title: 'Team Members',
    session: (req as any).session,
    team
  });
});

// Pricing
router.get('/pricing', async (req, res) => {
  const pricing = await allAsync(`SELECT * FROM pricing_col ORDER BY sort_order ASC`);
  res.render('admin/pricing', {
    title: 'Pricing Plans',
    session: (req as any).session,
    pricing
  });
});

// FAQ
router.get('/faq', async (req, res) => {
  const faq = await allAsync(`SELECT * FROM faq_col ORDER BY sort_order ASC`);
  res.render('admin/faq', {
    title: 'FAQ Items',
    session: (req as any).session,
    faq
  });
});

// Blog
router.get('/blog', async (req, res) => {
  const posts = await allAsync(`SELECT * FROM blog_col ORDER BY id DESC`);
  res.render('admin/blog', { title: 'Blog Posts', session: (req as any).session, posts });
});

router.get('/blog/add', (req, res) => {
  res.render('admin/blog-form', { title: 'Add Post', session: (req as any).session, post: null });
});

router.post('/blog/add', async (req, res) => {
  const { title_en, title_bn, slug, cover_image, author, content_en, content_bn, status } = req.body;
  await runAsync(
    `INSERT INTO blog_col (title_en, title_bn, slug, cover_image, author, date, content_en, content_bn, status) VALUES (?, ?, ?, ?, ?, date('now'), ?, ?, ?)`,
    [title_en, title_bn, slug, cover_image, author, content_en, content_bn, status]
  );
  res.redirect('/rsadminn/blog');
});

router.get('/blog/edit/:id', async (req, res) => {
  const post = await getAsync(`SELECT * FROM blog_col WHERE id = ?`, [req.params.id]);
  res.render('admin/blog-form', { title: 'Edit Post', session: (req as any).session, post });
});

router.post('/blog/edit/:id', async (req, res) => {
  const { title_en, title_bn, slug, cover_image, author, content_en, content_bn, status } = req.body;
  await runAsync(
    `UPDATE blog_col SET title_en=?, title_bn=?, slug=?, cover_image=?, author=?, content_en=?, content_bn=?, status=? WHERE id=?`,
    [title_en, title_bn, slug, cover_image, author, content_en, content_bn, status, req.params.id]
  );
  res.redirect('/rsadminn/blog');
});

router.post('/blog/delete/:id', async (req, res) => {
  await runAsync(`DELETE FROM blog_col WHERE id = ?`, [req.params.id]);
  res.redirect('/rsadminn/blog');
});

// Inbox
router.get('/inbox', async (req, res) => {
  const messages = await allAsync(`SELECT * FROM inbox_messages ORDER BY id DESC`);
  res.render('admin/inbox', {
    title: 'Inbox & Quotes',
    session: (req as any).session,
    messages
  });
});

router.get('/inbox/export', async (req, res) => {
  const messages = await allAsync(`SELECT * FROM inbox_messages ORDER BY id DESC`);
  let csv = 'ID,Type,Name,Email,Phone,Service,Message,Date\n';
  messages.forEach(m => {
    csv += `"${m.id}","${m.type}","${m.name}","${m.email}","${m.phone}","${m.service}","${(m.message || '').replace(/"/g, '""')}","${m.created_at}"\n`;
  });
  res.header('Content-Type', 'text/csv');
  res.attachment('ransovie-inbox.csv');
  res.send(csv);
});

// Subscribers
router.get('/subscribers', async (req, res) => {
  const subscribers = await allAsync(`SELECT * FROM subscribers ORDER BY id DESC`);
  res.render('admin/subscribers', {
    title: 'Subscribers',
    session: (req as any).session,
    subscribers
  });
});

router.get('/subscribers/export', async (req, res) => {
  const subscribers = await allAsync(`SELECT * FROM subscribers ORDER BY id DESC`);
  let csv = 'ID,Email,Date\n';
  subscribers.forEach(s => {
    csv += `"${s.id}","${s.email}","${s.created_at}"\n`;
  });
  res.header('Content-Type', 'text/csv');
  res.attachment('ransovie-subscribers.csv');
  res.send(csv);
});

// Media Library
router.get('/media', async (req, res) => {
  const media = await allAsync(`SELECT * FROM media ORDER BY id DESC`);
  res.render('admin/media', {
    title: 'Media Library',
    session: (req as any).session,
    media
  });
});

router.post('/media/upload', upload.single('image'), async (req, res) => {
  if (req.file) {
    await runAsync(
      `INSERT INTO media (filename, original_name, mime_type, size, alt_text) VALUES (?, ?, ?, ?, ?)`,
      [req.file.filename, req.file.originalname, req.file.mimetype, req.file.size, req.file.originalname]
    );
  }
  res.redirect('/rsadminn/media');
});

// Admins (Super Admin Only)
router.get('/admins', async (req, res) => {
  const admins = await allAsync(`SELECT id, name, email, role, status, created_at FROM users`);
  res.render('admin/admins', {
    title: 'Admin Users',
    session: (req as any).session,
    admins
  });
});

// Source & Backup
router.get('/backup', (req, res) => {
  res.render('admin/backup', {
    title: 'Source & Backup',
    session: (req as any).session
  });
});

router.get('/backup/full-zip', (req, res) => {
  res.attachment('ransovie-full-project-backup.zip');
  const archive = (archiver as any)('zip', { zlib: { level: 9 } });
  archive.pipe(res);
  archive.directory(process.cwd(), false, (entry: any) => {
    if (entry.name.includes('node_modules') || entry.name.includes('.git') || entry.name.includes('dist')) {
      return false;
    }
    return entry;
  });
  archive.finalize();
});

router.get('/backup/static-zip', (req, res) => {
  res.attachment('ransovie-static-site-backup.zip');
  const archive = (archiver as any)('zip', { zlib: { level: 9 } });
  archive.pipe(res);
  archive.directory(path.join(process.cwd(), 'public'), 'public');
  archive.finalize();
});

// Change Password
router.get('/password', (req, res) => {
  res.render('admin/password', {
    title: 'Change Password',
    session: (req as any).session,
    success: req.query.success === '1',
    error: null
  });
});

router.post('/password', async (req, res) => {
  const { current_password, new_password } = req.body;
  const userId = (req as any).session.userId;
  const user = await getAsync(`SELECT * FROM users WHERE id = ?`, [userId]);

  if (!user || !bcrypt.compareSync(current_password, user.password_hash)) {
    return res.render('admin/password', {
      title: 'Change Password',
      session: (req as any).session,
      success: false,
      error: 'Current password is incorrect.'
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(new_password, salt);
  await runAsync(`UPDATE users SET password_hash = ? WHERE id = ?`, [hash, userId]);

  res.redirect('/rsadminn/password?success=1');
});

export const adminRouter = router;
