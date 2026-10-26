import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

router.get('/services', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'services.html'));
});

router.get('/web-development', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'web-development.html'));
});

router.get('/graphic-design', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'graphic-design.html'));
});

router.get('/digital-marketing', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'digital-marketing.html'));
});

router.get('/portfolio', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'portfolio.html'));
});

router.get('/pricing', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'pricing.html'));
});

router.get('/about', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'about.html'));
});

router.get('/contact', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'contact.html'));
});

router.get('/blog', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'blog.html'));
});

router.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'sitemap.xml'));
});

router.get('/privacy', (req, res) => {
  res.render('public/legal', { 
    title: 'Privacy Policy', 
    content: '<p>RanSovie IT Agency is committed to protecting your privacy...</p>',
    currentPath: '/privacy'
  });
});

router.get('/terms', (req, res) => {
  res.render('public/legal', { 
    title: 'Terms of Service', 
    content: `<p><strong>Payment Policy:</strong> 40% Kickoff, 30% UI/UX, 30% Handover.</p>
              <p><strong>Ownership:</strong> Full IP transfer upon final payment.</p>
              <p><strong>Support:</strong> 12 months complimentary bug-fix support.</p>`,
    currentPath: '/terms'
  });
});

router.get('/refund', (req, res) => {
  res.render('public/legal', { 
    title: 'Refund Policy', 
    content: '<p>60% refund if project is cancelled before delivery.</p>',
    currentPath: '/refund'
  });
});

router.get('/cookie', (req, res) => {
  res.render('public/legal', { 
    title: 'Cookie Policy', 
    content: '<p>We use cookies to improve your browsing experience.</p>',
    currentPath: '/cookie'
  });
});

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post('/contact', async (req, res) => {
  const { name, email, phone, message, inquiry_type } = req.body;
  
  try {
    await transporter.sendMail({
      from: '"RanSovie IT Agency" <no-reply@ransovie.com>',
      to: 'ransovieiatechnologybd@gmail.com',
      subject: `New Inquiry: ${inquiry_type}`,
      text: `New Contact Submission Details:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nType: ${inquiry_type}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #D4AF37;">New Contact Submission</h2>
          <p>You have received a new message from the website contact form:</p>
          <hr>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Inquiry Type:</strong> ${inquiry_type}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 8px;">${message}</p>
        </div>`,
    });
    res.redirect('/contact?success=1');
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).send('Failed to send email.');
  }
});

export const publicRouter = router;
