# RanSovie IT Agency & Technology - Full-Stack Platform & Admin Panel

Production-ready website and fully dynamic CMS / Admin Panel for **RanSovie IT Agency & Technology**.

- **Primary Domain**: `https://ransovieitagency.com`
- **Admin Panel**: `https://ransovieitagency.com/rsadminn`
- **Default Super Admin**:
  - Email: `mdnafijusman@gmail.com`
  - Password: `adminrsrs` (Please change immediately upon first login)

---

## Local Development & Running

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and adjust values if needed:
   ```bash
   cp .env.example .env
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The app will run on port 3000 (or `PORT` defined in `.env`).

---

## Deployment Guides

### 1. VPS (Ubuntu + PM2 + Nginx)
1. Clone the repository and run `npm install`.
2. Configure `.env` with `SITE_URL=https://ransovieitagency.com` and production secrets.
3. Build/Start with PM2:
   ```bash
   npm run build
   pm2 start server.ts --interpreter ./node_modules/.bin/tsx --name "ransovie-app"
   pm2 save
   pm2 startup
   ```
4. Configure Nginx reverse proxy pointing to `http://127.0.0.1:3000` with SSL certificate via Certbot (Let's Encrypt).

### 2. cPanel ("Setup Node.js App")
1. In cPanel, go to **Setup Node.js App**.
2. Create application (Node.js version 18+), set Application root, and Application startup file to `server.ts` or `dist/server.js`.
3. Run `npm install` via terminal in the app directory.
4. Set environment variables in cPanel or `.env`.
5. Restart the Node.js application.

### 3. Render / Railway
1. Push repository to GitHub.
2. Create a new Node.js service on Render or Railway.
3. Build Command: `npm install`
4. Start Command: `npm start` (or `npx tsx server.ts`)
5. Add environment variables (`SITE_URL`, `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`).
