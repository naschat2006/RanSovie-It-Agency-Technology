import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv';
import { initDatabase, getAsync } from './src/server/db';
import { publicRouter } from './src/server/routes/public';
import { adminRouter } from './src/server/routes/admin';

dotenv.config();

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;

// Security Middleware (adjusted helmet for CDN script/style inclusion in templates)
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'ransovie_secret_key_2025',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

// View Engine
import expressLayouts from 'express-ejs-layouts';
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
app.set('layout', 'public/layout'); // Default layout for public routes

// Static Files
app.use(express.static(path.join(process.cwd())));
app.use(express.static(path.join(process.cwd(), 'public')));

// Admin Security Header: X-Robots-Tag noindex, nofollow on all admin routes
app.use('/rsadminn', (req, res, next) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  next();
});

// Routes
app.use('/rsadminn', adminRouter);
app.use('/', publicRouter);

// 404 Fallback
app.use(async (req, res) => {
  const lang = (req.query.lang as string) === 'bn' ? 'bn' : 'en';
  const settingsRow = await getAsync(`SELECT key, value_en, value_bn FROM settings`);
  res.status(404).render('public/404', {
    lang,
    settings: {},
    currentPath: req.path
  });
});

// Initialize database & start server
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`RanSovie IT Agency platform running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
