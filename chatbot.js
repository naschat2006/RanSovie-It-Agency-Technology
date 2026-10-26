/**
 * RanSovie It Agency & Technology - Official AI Assistant (RanSovie AI)
 * A Zaidan Enterprise
 * Features:
 * - 3D Robot Avatar with Live Status
 * - Peek-a-boo (Uki Mara) animation when user is scrolling/working, slides out when idle
 * - Device tracking (Mobile, Tablet, Desktop)
 * - Persistent Chat History & Multi-session management (localStorage)
 * - Full Agency Knowledge Base (Web Dev, UI/UX, Marketing, Pricing, Contact)
 * - Dual Engine: Gemini API (/api/chat) with instant local Agency Intelligence fallback
 * - Bilingual (Bengali & English) Support
 */

(function () {
  'use strict';

  // Prevent multiple initializations
  if (window.__RANSOVIE_BOT_INITIALIZED__) return;
  window.__RANSOVIE_BOT_INITIALIZED__ = true;

  // Configuration & Keys
  const STORAGE_SESSIONS = 'ransovie_bot_sessions_v2';
  const STORAGE_ACTIVE_ID = 'ransovie_bot_active_id_v2';
  const BOT_AVATAR_IMG = '/images/agency_ai_bot_cutout.png';
  const FALLBACK_AVATAR_IMG = '/src/assets/images/agency_ai_bot_cutout.png';
  const BOT_HEAD_IMG = '/images/agency_ai_bot_head.png';
  const FALLBACK_HEAD_IMG = '/src/assets/images/agency_ai_bot_head.png';

  // Detect Device
  function getDeviceInfo() {
    const ua = navigator.userAgent;
    const width = window.innerWidth;
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    let type = 'Desktop';
    let icon = 'fa-laptop';

    if (/Mobi|Android|iPhone|iPod/i.test(ua) || (width < 768 && isTouch)) {
      type = 'Mobile';
      icon = 'fa-mobile-screen-button';
    } else if (/iPad|Tablet/i.test(ua) || (width >= 768 && width <= 1024 && isTouch)) {
      type = 'Tablet';
      icon = 'fa-tablet-screen-button';
    }

    return { type, icon, width, isTouch };
  }

  let currentDevice = getDeviceInfo();
  let currentRole = 'general';
  window.addEventListener('resize', () => {
    currentDevice = getDeviceInfo();
    updateDeviceBadge();
  });

  // Agency Comprehensive Knowledge Base (Bengali & English)
  const AGENCY_INFO = {
    name: 'RanSovie It Agency & Technology',
    parent: 'A Zaidan Enterprise',
    motto: 'Strategic Design, Advanced Tech & Targeted Growth',
    contact: {
      phone: '+1 (234) 567-890',
      whatsapp: 'https://wa.me/1234567890?text=Hello%20RanSovie%20IT%20Agency,%20I%20want%20to%20discuss%20a%20project',
      email: 'contact@ransovie.com',
      office: 'Tech District, Innovation Drive & Global Remote Operations'
    },
    services: {
      web: {
        title: 'Full-Stack Web Development & Software Engineering',
        details: 'কাস্টম ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন (React, Next.js, Node.js, Express, TypeScript, Python, Tailwind CSS), হাই-স্পিড ই-কমার্স স্টোর (MERN/WooCommerce/Shopify), কাস্টম বিজনেস সফটওয়্যার (CRM/ERP), এন্টারপ্রাইজ ক্লাউড আর্কিটেকচার (AWS, Docker, GCP)। 0.4s লোড টাইম ও 99.9% আপটাইম গ্যারান্টি।',
        packages: 'Starter MVP: $299-$599 (৳৩৫,০০০ - ৳৬৫,০০০), Growth: $899-$1,800 (৳৯৫,০০০ - ৳১,৯৫,০০০), Enterprise: কাস্টম আলোচনা।'
      },
      design: {
        title: 'Bespoke UI/UX & Graphic Design',
        details: 'ফিগমায় ইন্টারেক্টিভ প্রোটোটাইপ, টোকেনাইজড ডিজাইন সিস্টেম, কর্পোরেট ব্র্যান্ড আইডেন্টিটি, প্রিমিয়াম লোগো ডিজাইন, সোশ্যাল মিডিয়া মার্কেটিং কিট এবং মোশন গ্রাফিক্স।',
        packages: 'Brand Kit: $199-$399, Full UI/UX System: $499-$1,200।'
      },
      marketing: {
        title: 'Targeted Digital Marketing, Ads & Precision SEO',
        details: 'উচ্চ আরওআই (Avg 4.8x ROAS) গুগল ও মেটা (ফেসবুক/ইনস্টাগ্রাম) পেইড ক্যাম্পেইন, টেকনিক্যাল ও লোকাল এসইও (+২৪০% অর্গানিক গ্রোথ), কনভার্সন রেট অপ্টিমাইজেশন (CRO) এবং লিড জেনারেশন।',
        packages: 'Monthly Growth: $399/mo থেকে শুরু।'
      }
    }
  };

  // State Management
  let sessions = [];
  let currentSessionId = null;
  let isOpen = false;
  let isHistoryOpen = false;
  let isPeeking = false;
  let idleTimer = null;
  let isSending = false;
  let hasShownFirstIdleNudge = false;

  // Load Sessions from localStorage
  function loadSessions() {
    try {
      const data = localStorage.getItem(STORAGE_SESSIONS);
      sessions = data ? JSON.parse(data) : [];
    } catch (e) {
      sessions = [];
    }

    try {
      currentSessionId = localStorage.getItem(STORAGE_ACTIVE_ID);
    } catch (e) {
      currentSessionId = null;
    }

    if (!sessions.length || !sessions.find(s => s.id === currentSessionId)) {
      createNewSession();
    }
  }

  // Save Sessions to localStorage
  function saveSessions() {
    try {
      localStorage.setItem(STORAGE_SESSIONS, JSON.stringify(sessions));
      if (currentSessionId) {
        localStorage.setItem(STORAGE_ACTIVE_ID, currentSessionId);
      }
    } catch (e) {
      console.error('Failed to save chat sessions', e);
    }
    renderHistoryList();
    updateHistoryBadge();
  }

  function getActiveSession() {
    return sessions.find(s => s.id === currentSessionId) || sessions[0];
  }

  function createNewSession(title = 'নতুন আলোচনা') {
    const id = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const newSess = {
      id,
      title,
      device: currentDevice.type,
      createdAt: Date.now(),
      messages: [
        {
          id: 'msg_welcome',
          role: 'bot',
          text: `👋 **আসসালামু আলাইকুম! আমি RanSovie AI** — RanSovie It Agency & Technology (A Zaidan Enterprise) এর অফিশিয়াল এআই সহকারী।\n\nআপনি **${currentDevice.type}** থেকে ভিজিট করছেন। আমাদের ওয়েব ডেভেলপমেন্ট, ইউআই/ইউএক্স গ্রাফিক ডিজাইন, ডিজিটাল মার্কেটিং সার্ভিস বা প্রজেক্ট কোটেশন সম্পর্কে যেকোনো তথ্য জানতে আমাকে নির্দ্বিধায় জিজ্ঞেস করুন!`,
          time: formatTime(new Date()),
          quickChips: [
            '🚀 ওয়েব ডেভেলপমেন্ট সার্ভিস ও খরচ',
            '🎨 UI/UX ও ব্র্যান্ড ডিজাইন',
            '📈 ডিজিটাল মার্কেটিং ও এসইও',
            '💰 প্রজেক্টের ফ্রি কোটেশন চাই',
            '📞 এজেন্সির সাথে সরাসরি যোগাযোগ'
          ]
        }
      ]
    };
    sessions.unshift(newSess);
    currentSessionId = id;
    saveSessions();
    updateRoleUI();
    if (isOpen) {
      renderMessages();
    }
    return newSess;
  }

  function updateRoleUI() {
    const session = getActiveSession();
    const role = (session && session.activeRole) || 'general';
    currentRole = role;
    const roleBtns = document.querySelectorAll('.albaraqah-role-btn');
    const modelTag = document.getElementById('albaraqah-model-name');
    
    let modelName = 'gemini-3.5-flash';
    if (role === 'fast') {
      modelName = 'gemini-3.1-flash-lite';
    } else if (role === 'architect') {
      modelName = 'gemini-3.1-pro-preview';
    }
    if (modelTag) modelTag.textContent = modelName;
    roleBtns.forEach(btn => {
      if (btn.getAttribute('data-role') === role) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function switchSession(sessionId) {
    if (sessions.some(s => s.id === sessionId)) {
      currentSessionId = sessionId;
      saveSessions();
      updateRoleUI();
      renderMessages();
      closeHistoryDrawer();
    }
  }

  function deleteSession(sessionId, e) {
    if (e) e.stopPropagation();
    sessions = sessions.filter(s => s.id !== sessionId);
    if (!sessions.length) {
      createNewSession();
    } else if (currentSessionId === sessionId) {
      currentSessionId = sessions[0].id;
    }
    saveSessions();
    renderMessages();
  }

  function clearAllHistory() {
    if (confirm('আপনি কি সব চ্যাট হিস্ট্রি মুছে ফেলতে চান?')) {
      sessions = [];
      createNewSession();
      closeHistoryDrawer();
    }
  }

  function formatTime(date) {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function formatDate(timestamp) {
    const d = new Date(timestamp);
    const now = new Date();
    const diffHours = (now - d) / (1000 * 60 * 60);
    if (diffHours < 24 && now.getDate() === d.getDate()) {
      return 'আজ ' + formatTime(d);
    }
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + formatTime(d);
  }

  // Inject CSS Styles
  function injectStyles() {
    const css = `
      /* RanSovie AI Floating System - Anchored to Viewport Edge */
      #albaraqah-ai-root {
        position: fixed;
        bottom: 24px;
        right: 0px;
        z-index: 99999;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        color: #FFFFFF;
        pointer-events: none;
      }

      @media (max-width: 640px) {
        #albaraqah-ai-root {
          bottom: 16px;
          right: 0px;
        }
      }

      /* ============================================================
         EDGE GRABBING PEEK ROBOT CHATBOT (USER'S EXACT STYLES)
         ============================================================ */
      /* मूल কন্টেইনার */
      #robot-container {
        position: fixed;
        bottom: 40px;
        right: 0;
        width: 105px;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        pointer-events: none;
        transform-origin: center center;
        /* উঁকি মারার নিখুঁত ট্রানজিশন স্পিড */
        transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.35s ease;
      }

      /* When chat modal is open, slide robot out smoothly */
      #albaraqah-ai-root.modal-open #robot-container {
        opacity: 0;
        transform: translateX(180px);
        pointer-events: none;
      }

      /* কথা বলার বাবল */
      .speech-bubble {
        position: absolute;
        bottom: 100%;
        right: 8px;
        background: rgba(30, 41, 59, 0.95);
        color: #38bdf8;
        border: 1px solid #0284c7;
        padding: 8px 14px;
        border-radius: 18px 18px 2px 18px;
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        white-space: nowrap;
        pointer-events: auto;
        cursor: pointer;
      }

      /* রোবটের মেইন র্যাপার (ছোট সাইজ) */
      .robot-wrapper {
        position: relative;
        width: 105px;
        height: 155px;
        pointer-events: auto;
        cursor: pointer;
        transition: transform 0.5s ease;
      }

      .robot-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: drop-shadow(-5px 8px 12px rgba(0,0,0,0.4));
      }

      /* এনার্জি পেডেস্টাল আলো */
      .energy-pedestal {
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        width: 65px;
        height: 12px;
        background: radial-gradient(ellipse at center, rgba(245, 158, 11, 0.9) 0%, rgba(245, 158, 11, 0) 70%);
        border-radius: 50%;
        transition: opacity 0.4s ease;
      }

      /* ================= উঁকি মারা ও সামনে আসার আসল ট্রান্সফর্ম ================= */

      /* ১. উঁকি মারা স্টেট: ৬০ ডিগ্রি কোণে কাত হয়ে একটু ডানদিকে সরে উঁকি মারা */
      .robot-peeking {
        /* 
           - rotate(-60deg): ৬০ ডিগ্রি কোণে কাত হবে
           - translateX(62px): একটু ডানদিকে সরে থাকবে, যাতে শরীর আড়ালে থাকে এবং মাথা ও দৃষ্টি স্ক্রিনের দিকে তাকানো থাকে
        */
        transform: translateX(62px) translateY(5px) rotate(-60deg);
      }

      .robot-peeking .speech-bubble {
        opacity: 0;
        transform: translateY(10px);
        pointer-events: none;
      }

      /* আড়ালে গেলে লাইট প্রায় নিভে যাবে, মনে হবে রোবট শূন্যে ভাসছে না, স্ক্রিন ধরে ঝুলে আছে */
      .robot-peeking .energy-pedestal {
        opacity: 0;
      }

      /* ২. সামনে আসার স্টেট (Idle) */
      .robot-idle {
        transform: translateX(-15px) translateY(0) rotate(0deg);
      }

      .robot-idle .speech-bubble {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }

      .robot-idle .energy-pedestal {
        opacity: 1;
        animation: pulse-glow 2s infinite ease-in-out;
      }

      @keyframes pulse-glow {
        0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
        50% { opacity: 1; transform: translateX(-50%) scale(1.2); }
      }

      /* মোবাইল স্ক্রিনের জন্য নিখুঁত টিউনিং */
      @media (max-width: 600px) {
        #robot-container {
          width: 80px;
        }
        .robot-wrapper {
          width: 80px;
          height: 120px;
        }
        .energy-pedestal {
          width: 50px;
          height: 10px;
        }
        .robot-peeking {
          /* মোবাইলেও ৬০ ডিগ্রি কোণে একটু ডানে সরে উঁকি মারা */
          transform: translateX(46px) translateY(3px) rotate(-60deg);
        }
        .robot-idle {
          transform: translateX(-5px) translateY(0) rotate(0deg);
        }
      }

      /* Speech Nudge Tooltip (Shown when user is still/idle) */
      #albaraqah-nudge-bubble {
        position: absolute;
        bottom: 152px;
        right: 14px;
        width: 290px;
        background: rgba(15, 23, 42, 0.96);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1.5px solid rgba(212, 175, 55, 0.5);
        border-radius: 18px;
        padding: 14px 16px;
        box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.75), 0 0 20px rgba(212, 175, 55, 0.25);
        opacity: 0;
        transform: translateY(12px) scale(0.95);
        pointer-events: none;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 40;
      }

      @media (max-width: 640px) {
        #albaraqah-nudge-bubble {
          bottom: 130px;
          right: 8px;
          width: 260px;
        }
      }

      #albaraqah-nudge-bubble.is-visible {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      /* Chat Window Modal */
      #albaraqah-chat-modal {
        position: fixed;
        bottom: 96px;
        right: 24px;
        width: 410px;
        max-width: calc(100vw - 32px);
        height: 610px;
        max-height: calc(100vh - 120px);
        background: rgba(11, 15, 25, 0.96);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 24px;
        box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.15);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        opacity: 0;
        transform: translateY(25px) scale(0.95);
        pointer-events: none;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 999999;
      }

      @media (max-width: 640px) {
        #albaraqah-chat-modal {
          bottom: 12px;
          right: 12px;
          left: 12px;
          width: auto;
          max-width: none;
          height: calc(100vh - 24px);
          max-height: none;
          border-radius: 20px;
        }
      }

      #albaraqah-chat-modal.is-open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      /* Modal Header */
      .albaraqah-chat-header {
        padding: 14px 18px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.01));
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .albaraqah-header-btn {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #E2E8F0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
      }

      .albaraqah-header-btn:hover {
        background: rgba(212, 175, 55, 0.2);
        color: #D4AF37;
        border-color: rgba(212, 175, 55, 0.4);
      }

      /* History Drawer */
      #albaraqah-history-drawer {
        position: absolute;
        inset: 0;
        background: rgba(9, 13, 22, 0.98);
        backdrop-filter: blur(24px);
        z-index: 20;
        display: flex;
        flex-direction: column;
        transform: translateX(-100%);
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      }

      #albaraqah-history-drawer.is-active {
        transform: translateX(0);
      }

      /* Role / Model Bar */
      .albaraqah-role-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 14px;
        background: rgba(0, 0, 0, 0.35);
        border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        flex-wrap: wrap;
        gap: 6px;
      }

      .albaraqah-role-btn {
        background: transparent;
        border: 1px solid transparent;
        color: rgba(255, 255, 255, 0.65);
        padding: 4px 9px;
        border-radius: 8px;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        transition: all 0.2s ease;
      }

      .albaraqah-role-btn:hover {
        color: #FFFFFF;
        background: rgba(255, 255, 255, 0.08);
      }

      .albaraqah-role-btn.active {
        background: rgba(212, 175, 55, 0.2);
        border-color: rgba(212, 175, 55, 0.45);
        color: #F8FAFC;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
      }

      /* Message Area */
      .albaraqah-messages-area {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        scroll-behavior: smooth;
      }

      .albaraqah-messages-area::-webkit-scrollbar {
        width: 6px;
      }
      .albaraqah-messages-area::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 10px;
      }

      .albaraqah-msg {
        display: flex;
        gap: 10px;
        max-width: 90%;
        animation: albaraqah-fade-in 0.3s ease;
      }

      .albaraqah-msg.user {
        margin-left: auto;
        flex-direction: row-reverse;
      }

      .albaraqah-msg-bubble {
        padding: 12px 16px;
        border-radius: 18px;
        font-size: 13.5px;
        line-height: 1.55;
        position: relative;
      }

      .albaraqah-msg.bot .albaraqah-msg-bubble {
        background: rgba(26, 35, 54, 0.85);
        border: 1px solid rgba(212, 175, 55, 0.25);
        color: #F1F5F9;
        border-top-left-radius: 4px;
      }

      .albaraqah-msg.user .albaraqah-msg-bubble {
        background: linear-gradient(135deg, #EF4444, #B91C1C);
        color: #FFFFFF;
        border-top-right-radius: 4px;
        box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
      }

      .albaraqah-msg-time {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.45);
        margin-top: 4px;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      /* Quick Suggestion Chips */
      .albaraqah-chips-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 10px;
      }

      .albaraqah-chip {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(212, 175, 55, 0.3);
        color: #F8FAFC;
        font-size: 11.5px;
        padding: 6px 12px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .albaraqah-chip:hover {
        background: rgba(212, 175, 55, 0.25);
        border-color: #D4AF37;
        color: #FFFFFF;
        transform: translateY(-1px);
      }

      /* Input Area */
      .albaraqah-input-container {
        padding: 12px 16px;
        background: rgba(15, 23, 42, 0.8);
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      .albaraqah-input-box {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 14px;
        padding: 4px 6px 4px 14px;
        transition: border-color 0.2s ease;
      }

      .albaraqah-input-box:focus-within {
        border-color: #D4AF37;
        box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
      }

      .albaraqah-text-input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: #FFFFFF;
        font-size: 13.5px;
        padding: 8px 0;
      }

      .albaraqah-text-input::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }

      .albaraqah-send-btn {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: linear-gradient(135deg, #D4AF37, #B48811);
        border: none;
        color: #090D16;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .albaraqah-send-btn:hover:not(:disabled) {
        transform: scale(1.06);
        background: linear-gradient(135deg, #EF4444, #DC2626);
        color: #FFFFFF;
      }

      .albaraqah-send-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      /* Typing indicator */
      .albaraqah-typing {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 10px 16px;
      }
      .albaraqah-typing span {
        width: 6px;
        height: 6px;
        background: #D4AF37;
        border-radius: 50%;
        animation: albaraqah-bounce 1.4s infinite ease-in-out both;
      }
      .albaraqah-typing span:nth-child(1) { animation-delay: -0.32s; }
      .albaraqah-typing span:nth-child(2) { animation-delay: -0.16s; }

      @keyframes albaraqah-bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
      }

      @keyframes albaraqah-border-glow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes albaraqah-ping {
        75%, 100% { transform: scale(2.2); opacity: 0; }
      }

      @keyframes albaraqah-fade-in {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;

    const styleEl = document.createElement('style');
    styleEl.id = 'albaraqah-ai-style';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  // Render HTML Structure
  function buildDOM() {
    const root = document.createElement('div');
    root.id = 'albaraqah-ai-root';
    root.innerHTML = `
      <!-- রোবট চ্যাটবট -->
      <div id="robot-container" class="robot-idle" title="RanSovie AI Assistant - Click to Chat">
        <div class="speech-bubble" id="speechBubble">আমি কি সাহায্য করব? 👋</div>
        <div class="robot-wrapper" id="robotWrapper">
          <!-- আপনার থ্রিডি রোবটের ছবি এখানে বসাবেন -->
          <img src="${BOT_AVATAR_IMG}" onerror="this.src='${FALLBACK_AVATAR_IMG}'" alt="3D Robot" class="robot-img" />
          <div class="energy-pedestal"></div>
        </div>
      </div>

      <!-- Full Chat Modal -->
      <div id="albaraqah-chat-modal" role="dialog" aria-modal="true" aria-hidden="true">
        <!-- History Drawer -->
        <div id="albaraqah-history-drawer">
          <div class="albaraqah-chat-header" style="border-bottom:1px solid rgba(255,255,255,0.1);">
            <div style="display:flex; align-items:center; gap:8px;">
              <button id="albaraqah-history-back" class="albaraqah-header-btn" title="Back to Chat">
                <i class="fa-solid fa-arrow-left"></i>
              </button>
              <span style="font-weight:700; font-size:14px; color:#FFFFFF;">
                <i class="fa-solid fa-clock-rotate-left text-brandGold mr-1"></i> চ্যাট হিস্ট্রি (History)
              </span>
            </div>
            <button id="albaraqah-history-clear" class="albaraqah-header-btn" title="Clear all history">
              <i class="fa-solid fa-trash-can text-red-400"></i>
            </button>
          </div>
          <div id="albaraqah-history-list" style="flex:1; overflow-y:auto; padding:12px; display:flex; flex-direction:column; gap:8px;">
            <!-- History items rendered here -->
          </div>
          <div style="padding:12px; border-top:1px solid rgba(255,255,255,0.08); background:rgba(0,0,0,0.3);">
            <button id="albaraqah-history-new" style="width:100%; padding:10px; background:linear-gradient(135deg, #D4AF37, #B48811); color:#0B0F19; font-weight:700; font-size:13px; border:none; border-radius:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;">
              <i class="fa-solid fa-plus"></i> নতুন চ্যাট শুরু করুন
            </button>
          </div>
        </div>

        <!-- Chat Modal Header -->
        <div class="albaraqah-chat-header">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="position:relative; width:40px; height:44px; display:flex; align-items:center; justify-content:center;">
              <img src="${BOT_AVATAR_IMG}" onerror="this.src='${FALLBACK_AVATAR_IMG}'" alt="RanSovie AI" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 2px 6px rgba(0,0,0,0.5));" />
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:6px;">
                <span style="font-weight:700; font-size:14px; color:#FFFFFF;">RanSovie AI</span>
                <span id="albaraqah-device-badge" style="font-size:10px; background:rgba(212,175,55,0.15); color:#D4AF37; border:1px solid rgba(212,175,55,0.3); padding:1px 6px; border-radius:10px; font-weight:600;">
                  <i class="fa-solid ${currentDevice.icon}"></i> ${currentDevice.type}
                </span>
              </div>
              <div style="font-size:11px; color:rgba(255,255,255,0.5); display:flex; align-items:center; gap:4px;">
                <span>RanSovie Specialist</span>
                <span>•</span>
                <span style="color:#D4AF37;">A Zaidan Enterprise</span>
              </div>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:6px;">
            <!-- History Button with badge -->
            <button id="albaraqah-toggle-history" class="albaraqah-header-btn" title="View Chat History">
              <i class="fa-solid fa-clock-rotate-left"></i>
              <span id="albaraqah-history-count" style="position:absolute; top:-3px; right:-3px; background:#EF4444; color:#FFF; font-size:9px; font-weight:800; width:15px; height:15px; border-radius:50%; display:flex; align-items:center; justify-content:center;">0</span>
            </button>
            <!-- New Chat Button -->
            <button id="albaraqah-new-chat-btn" class="albaraqah-header-btn" title="Start New Conversation">
              <i class="fa-solid fa-plus"></i>
            </button>
            <!-- Close Modal -->
            <button id="albaraqah-close-modal" class="albaraqah-header-btn" title="Minimize Chat">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <!-- Role / Persona Mode Selector Bar -->
        <div class="albaraqah-role-bar">
          <div style="display:flex; align-items:center; gap:4px;" role="tablist" aria-label="AI Assistant Persona Roles">
            <button type="button" class="albaraqah-role-btn active" data-role="general" data-model="gemini-3.5-flash" title="General Agency Consultant (gemini-3.5-flash)">
              <i class="fa-regular fa-comments text-brandGold"></i> General
            </button>
            <button type="button" class="albaraqah-role-btn" data-role="fast" data-model="gemini-3.1-flash-lite" title="Fast Quick Answers (gemini-3.1-flash-lite)">
              <i class="fa-solid fa-bolt text-yellow-400"></i> Fast
            </button>
            <button type="button" class="albaraqah-role-btn" data-role="architect" data-model="gemini-3.1-pro-preview" title="Solutions Architect - Complex Engineering & Scope (gemini-3.1-pro-preview)">
              <i class="fa-solid fa-brain text-purple-400"></i> Architect
            </button>
          </div>
          <div id="albaraqah-active-model-tag" style="font-size:10px; color:rgba(255,255,255,0.45); font-family:monospace; display:flex; align-items:center; gap:5px;">
            <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10B981;"></span>
            <span id="albaraqah-model-name">gemini-3.5-flash</span>
          </div>
        </div>

        <!-- Chat Messages Area -->
        <div id="albaraqah-messages-box" class="albaraqah-messages-area">
          <!-- Messages will be rendered here -->
        </div>

        <!-- Chat Input Area -->
        <div class="albaraqah-input-container">
          <form id="albaraqah-chat-form" style="margin:0;">
            <div class="albaraqah-input-box">
              <input 
                type="text" 
                id="albaraqah-user-input" 
                class="albaraqah-text-input" 
                placeholder="বার্তা লিখুন / Ask anything about our agency..." 
                autocomplete="off" 
              />
              <!-- Send Button -->
              <button type="submit" id="albaraqah-send-btn" class="albaraqah-send-btn" title="Send Message">
                <i class="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </div>
          </form>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; font-size:10px; color:rgba(255,255,255,0.4);">
            <span>⚡ Instant AI Reply + 24/7 Agency Support</span>
            <a href="/contact.html" style="color:#D4AF37; text-decoration:none; font-weight:600;">ফ্রি কোটেশন নিন &rarr;</a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(root);
  }

  // Update Device Badge
  function updateDeviceBadge() {
    const badge = document.getElementById('albaraqah-device-badge');
    if (badge) {
      badge.innerHTML = `<i class="fa-solid ${currentDevice.icon}"></i> ${currentDevice.type}`;
    }
  }

  // Update History Badge Count
  function updateHistoryBadge() {
    const badge = document.getElementById('albaraqah-history-count');
    if (badge) {
      badge.textContent = sessions.length;
      badge.style.display = sessions.length > 0 ? 'flex' : 'none';
    }
  }

  // Render Messages in active session
  function renderMessages() {
    const container = document.getElementById('albaraqah-messages-box');
    if (!container) return;

    const session = getActiveSession();
    container.innerHTML = '';

    session.messages.forEach(msg => {
      const msgEl = document.createElement('div');
      msgEl.className = `albaraqah-msg ${msg.role}`;

      let formattedText = msg.text
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n/g, '<br/>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

      let chipsHtml = '';
      if (msg.quickChips && msg.quickChips.length) {
        chipsHtml = `
          <div class="albaraqah-chips-wrapper">
            ${msg.quickChips.map(chip => `<button class="albaraqah-chip" data-query="${chip}"><i class="fa-regular fa-comment-dots text-brandGold"></i> ${chip}</button>`).join('')}
          </div>
        `;
      }

      let actionsHtml = '';
      if (msg.actionButtons && msg.actionButtons.length) {
        actionsHtml = `
          <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:10px;">
            ${msg.actionButtons.map(btn => `
              <a href="${btn.url}" ${btn.url.startsWith('http') ? 'target="_blank"' : ''} style="display:inline-flex; align-items:center; gap:6px; font-size:11.5px; padding:6px 12px; border-radius:10px; background:${btn.bg || '#D4AF37'}; color:${btn.color || '#090D16'}; font-weight:700; text-decoration:none;">
                ${btn.icon ? `<i class="${btn.icon}"></i>` : ''} ${btn.label}
              </a>
            `).join('')}
          </div>
        `;
      }

      msgEl.innerHTML = `
        <div class="albaraqah-msg-bubble">
          <div>${formattedText}</div>
          ${actionsHtml}
          ${chipsHtml}
          <div class="albaraqah-msg-time">
            <span>${msg.time}</span>
            ${msg.model ? `<span style="color:#D4AF37; font-family:monospace; font-size:9.5px; opacity:0.9;">• <i class="fa-solid fa-microchip"></i> ${msg.model}</span>` : ''}
            ${msg.device ? `<span>• <i class="fa-solid ${msg.device === 'Mobile' ? 'fa-mobile-screen' : 'fa-laptop'}"></i> ${msg.device}</span>` : ''}
          </div>
        </div>
      `;

      container.appendChild(msgEl);
    });

    // Attach listeners to chips
    container.querySelectorAll('.albaraqah-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.getAttribute('data-query');
        handleUserSend(q);
      });
    });

    container.scrollTop = container.scrollHeight;
  }

  // Render History Drawer List
  function renderHistoryList() {
    const list = document.getElementById('albaraqah-history-list');
    if (!list) return;

    list.innerHTML = '';

    if (!sessions.length) {
      list.innerHTML = `
        <div style="text-align:center; padding:30px 10px; color:rgba(255,255,255,0.4); font-size:13px;">
          <i class="fa-regular fa-folder-open text-3xl mb-2 text-brandGold block"></i>
          কোনো সংরক্ষিত চ্যাট হিস্ট্রি পাওয়া যায়নি
        </div>
      `;
      return;
    }

    sessions.forEach(sess => {
      const isActive = sess.id === currentSessionId;
      const item = document.createElement('div');
      item.style.cssText = `
        padding: 10px 12px;
        border-radius: 12px;
        background: ${isActive ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
        border: 1px solid ${isActive ? '#D4AF37' : 'rgba(255, 255, 255, 0.08)'};
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `;

      const lastMsg = sess.messages[sess.messages.length - 1];
      const previewText = lastMsg ? (lastMsg.text.replace(/\*\*/g, '').substring(0, 38) + '...') : 'No messages';

      item.innerHTML = `
        <div style="overflow:hidden; flex:1; padding-right:8px;">
          <div style="font-size:13px; font-weight:700; color:${isActive ? '#D4AF37' : '#FFFFFF'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
            ${sess.title || 'আলোচনা'}
          </div>
          <div style="font-size:11px; color:rgba(255,255,255,0.5); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin:2px 0;">
            ${previewText}
          </div>
          <div style="font-size:10px; color:rgba(255,255,255,0.35); display:flex; align-items:center; gap:6px;">
            <span><i class="fa-regular fa-clock"></i> ${formatDate(sess.createdAt)}</span>
            <span>•</span>
            <span><i class="fa-solid ${sess.device === 'Mobile' ? 'fa-mobile-screen' : 'fa-laptop'}"></i> ${sess.device || 'Web'}</span>
          </div>
        </div>
        <button class="albaraqah-del-sess" title="Delete conversation" style="background:none; border:none; color:rgba(255,255,255,0.4); cursor:pointer; padding:6px; font-size:12px;">
          <i class="fa-solid fa-trash-can hover:text-red-400"></i>
        </button>
      `;

      item.addEventListener('click', () => switchSession(sess.id));
      const delBtn = item.querySelector('.albaraqah-del-sess');
      delBtn.addEventListener('click', (e) => deleteSession(sess.id, e));

      list.appendChild(item);
    });
  }

  // Open / Close History Drawer
  function openHistoryDrawer() {
    const drawer = document.getElementById('albaraqah-history-drawer');
    if (drawer) {
      drawer.classList.add('is-active');
      isHistoryOpen = true;
      renderHistoryList();
    }
  }

  function closeHistoryDrawer() {
    const drawer = document.getElementById('albaraqah-history-drawer');
    if (drawer) {
      drawer.classList.remove('is-active');
      isHistoryOpen = false;
    }
  }

  // Open / Close Chat Modal
  function toggleChat(open) {
    const modal = document.getElementById('albaraqah-chat-modal');
    const nudge = document.getElementById('albaraqah-nudge-bubble');
    const root = document.getElementById('albaraqah-ai-root');
    if (!modal) return;

    if (open === undefined) {
      isOpen = !isOpen;
    } else {
      isOpen = open;
    }

    if (isOpen) {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      if (root) root.classList.add('modal-open');
      if (nudge) nudge.classList.remove('is-visible');
      // Set focus to input
      setTimeout(() => {
        const input = document.getElementById('albaraqah-user-input');
        if (input) input.focus();
      }, 200);
      renderMessages();
    } else {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      if (root) root.classList.remove('modal-open');
      closeHistoryDrawer();
    }
  }

  // Show / Hide Nudge Tooltip
  function showNudge() {
    if (isOpen) return;
    const nudge = document.getElementById('albaraqah-nudge-bubble');
    if (nudge) {
      nudge.classList.add('is-visible');
      hasShownFirstIdleNudge = true;
    }
  }

  function hideNudge() {
    const nudge = document.getElementById('albaraqah-nudge-bubble');
    if (nudge) {
      nudge.classList.remove('is-visible');
    }
  }

  // ============================================================
  // PEEKING & IDLE LOGIC (USER IMPLEMENTATION)
  // ============================================================
  const IDLE_DELAY = 2200; // ২.২ সেকেন্ড (২২০০ মিলি-সেকেন্ড)

  // ইউজার সক্রিয়/কাজ শুরু করলে যে ফাংশন চলবে (উঁকি মারা স্টেট)
  function setRobotPeeking() {
    if (isOpen) return;
    const robotContainer = document.getElementById('robot-container');
    if (!robotContainer) return;

    if (robotContainer.classList.contains('robot-idle') || !robotContainer.classList.contains('robot-peeking')) {
      robotContainer.classList.remove('robot-idle');
      robotContainer.classList.add('robot-peeking');
    }

    // পূর্বের টাইমার রিকল করা যাতে ঘনঘন স্টেট পরিবর্তন না হয়
    clearTimeout(idleTimer);

    // ২.২ সেকেন্ড পর ইউজার নিষ্ক্রিয় হলে আবার আইডল স্টেটে নেওয়া
    idleTimer = setTimeout(setRobotIdle, IDLE_DELAY);
  }

  // ইউজার স্থির/Idle থাকলে যে ফাংশন চলবে (সামনে আসার স্টেট)
  function setRobotIdle() {
    if (isOpen) return;
    const robotContainer = document.getElementById('robot-container');
    if (!robotContainer) return;

    robotContainer.classList.remove('robot-peeking');
    robotContainer.classList.add('robot-idle');
  }

  // ইউজারের ইন্টারঅ্যাকশন ট্র্যাকিং (স্ক্রোল, মাউস মুভ, টাইপ, টাচ)
  function setupIdleAndPeekingListener() {
    window.addEventListener('scroll', setRobotPeeking, { passive: true });
    window.addEventListener('mousemove', setRobotPeeking, { passive: true });
    window.addEventListener('keydown', setRobotPeeking, { passive: true });
    window.addEventListener('touchstart', setRobotPeeking, { passive: true });

    // প্রাথমিক অবস্থায় টাইমার চালু রাখা
    idleTimer = setTimeout(setRobotIdle, IDLE_DELAY);
  }

  // Agency Local Intelligence Knowledge Engine (Instant Bilingual Response)
  function generateLocalResponse(query) {
    const q = query.toLowerCase();

    // 1. Web Development / Tech
    if (q.includes('web') || q.includes('ওয়েব') || q.includes('website') || q.includes('ডেভেলপমেন্ট') || q.includes('software') || q.includes('ecommerce') || q.includes('ইকমার্স') || q.includes('react') || q.includes('next')) {
      return {
        text: `🚀 **RanSovie IT Web Development & Software Engineering**\n\nআমরা উচ্চ-গতির এবং এন্টারপ্রাইজ মানের আধুনিক ওয়েবসাইট ও সফটওয়্যার তৈরি করি:\n\n• **ফুল-স্ট্যাক টেক স্ট্যাক:** React, Next.js, Node.js, Express, TypeScript, Python/Django, Tailwind CSS\n• **ই-কমার্স সমাধান:** পেমেন্ট গেটওয়ে (Stripe, bKash, Nagad, SSLCommerz), কার্ট, ইনভেন্টরি সহ আল্ট্রা-ফাস্ট শপ\n• **কাস্টম বিজনেস অটোমেশন:** কাস্টম CRM, ERP, পোর্টাল ও ক্লাউড সিস্টেম\n• **পারফরম্যান্স:** 0.4s গড় লোড টাইম এবং 99.9% সার্ভার রিলায়েবিলিটি গ্যারান্টি!\n\n**প্যাকেজ শুরু:** $299 (৳৩৫,০০০) থেকে শুরু। প্রজেক্টের সাইজ অনুযায়ী ফ্রি কোটেশন দেওয়া হয়।`,
        actionButtons: [
          { label: 'ওয়েব সার্ভিস দেখুন', url: '/web-development.html', bg: '#D4AF37', color: '#090D16', icon: 'fa-solid fa-code' },
          { label: 'ফ্রি কোটেশন নিন', url: '/contact.html', bg: '#EF4444', color: '#FFFFFF', icon: 'fa-solid fa-file-invoice-dollar' },
          { label: 'সরাসরি কল দিন', url: 'tel:' + AGENCY_INFO.contact.phone, bg: '#10B981', color: '#FFFFFF', icon: 'fa-solid fa-phone' }
        ]
      };
    }

    // 2. Graphic Design & UI/UX
    if (q.includes('design') || q.includes('ডিজাইন') || q.includes('ui') || q.includes('ux') || q.includes('figma') || q.includes('গ্রাফিক') || q.includes('logo') || q.includes('লোগো') || q.includes('brand')) {
      return {
        text: `🎨 **Bespoke UI/UX & Graphic Design (Creative Mastery)**\n\nআমরা ব্র্যান্ডের পরিচয় ও গ্রাহক এনগেজমেন্ট বৃদ্ধির জন্য নান্দনিক ডিজাইন করি:\n\n• **UI/UX ডিজাইন:** ফিগমা (Figma) প্রোটোটাইপ ও টোকেনাইজড ডিজাইন সিস্টেম (Tokenized Design Tokens)\n• **ব্র্যান্ড আইডেন্টিটি:** প্রফেশনাল লোগো, কর্পোরেট স্টেশনারি ও কমপ্লিট ব্র্যান্ড গাইডলাইন\n• **সোশ্যাল মিডিয়া ও অ্যাড কিট:** হাই-কনভার্টিং ব্যানার, মোশন গ্রাফিক্স ও মার্কেটিং আর্টওয়ার্ক\n• **ফলাফল:** গড়ে +3.8x কনভার্সন বৃদ্ধির রেকর্ড!`,
        actionButtons: [
          { label: 'ডিজাইন সার্ভিস দেখুন', url: '/graphic-design.html', bg: '#D4AF37', color: '#090D16', icon: 'fa-solid fa-pen-nib' },
          { label: 'পোর্টফোলিও দেখুন', url: '/portfolio.html', bg: 'rgba(255,255,255,0.1)', color: '#FFFFFF', icon: 'fa-solid fa-briefcase' }
        ]
      };
    }

    // 3. Digital Marketing & SEO
    if (q.includes('marketing') || q.includes('মার্কেটিং') || q.includes('seo') || q.includes('এসইও') || q.includes('ads') || q.includes('বিজ্ঞাপন') || q.includes('facebook') || q.includes('google')) {
      return {
        text: `📈 **Targeted Growth: Precision SEO & Digital Marketing**\n\nট্রাফিককে বিক্রয়ে রূপান্তর করার জন্য আমাদের রয়েছে ডেটা-ভিত্তিক মার্কেটিং ফর্মুলা:\n\n• **পেইড অ্যাড ক্যাম্পেইন:** Google Search & Display Ads, Meta (Facebook & Instagram) স্পন্সরড ক্যাম্পেইন\n• **উচ্চ আরওআই (ROAS):** গড়ে 4.8x অ্যাড স্পেন্ড রিটার্ন\n• **অ্যাডভান্সড এসইও:** টেকনিক্যাল ও লোকাল এসইও এর মাধ্যমে +240% অর্গানিক ট্রাফিক বৃদ্ধির নিশ্চয়তা\n• **সোশ্যাল মিডিয়া ম্যানেজমেন্ট:** কনটেন্ট প্ল্যানিং, অডিয়েন্স টার্গেটিং ও ভাইরাল গ্রোথ স্ট্র্যাটেজি।`,
        actionButtons: [
          { label: 'মার্কেটিং সার্ভিসেস', url: '/digital-marketing.html', bg: '#D4AF37', color: '#090D16', icon: 'fa-solid fa-chart-line' },
          { label: 'গ্রোথ ক্যাম্পেইন শুরু করুন', url: '/contact.html', bg: '#EF4444', color: '#FFFFFF', icon: 'fa-solid fa-bolt' }
        ]
      };
    }

    // 4. Pricing / Cost
    if (q.includes('price') || q.includes('cost') || q.includes('খরচ') || q.includes('দাম') || q.includes('কোটেশন') || q.includes('টাকা') || q.includes('budget') || q.includes('package') || q.includes('প্যাকেজ')) {
      return {
        text: `💰 **RanSovie IT প্রজেক্ট প্যাকেজ ও খরচের রূপরেখা**\n\nআমরা গ্রাহকের প্রয়োজন অনুযায়ী স্বচ্ছ এবং সাশ্রয়ী প্যাকেজ প্রদান করি:\n\n1. **Starter Kickoff Package:** $299 - $599 (৳৩৫,০০০ - ৳৬৫,০০০)\n   • দ্রুত ডেলিভারি (৫-৭ দিন)\n   • প্রিমিয়াম ল্যান্ডিং পেজ বা ব্র্যান্ড আইডেন্টিটি\n\n2. **Growth Professional Package:** $899 - $1,800 (৳৯৫,০০০ - ৳১,৯৫,০০০)\n   • ডায়নামিক ওয়েব অ্যাপ্লিকেশন / ই-কমার্স শপ\n   • সম্পূর্ণ রেসপন্সিভ ও এসইও অপ্টিমাইজড\n\n3. **Enterprise Bespoke Solution:** আলোচনা সাপেক্ষে\n   • কাস্টম সফটওয়্যার, ডেডিকেটেড টিম ও 24/7 সাপোর্ট।\n\nআপনার সুনির্দিষ্ট বাজেটের জন্য আমাদের সরাসরি বার্তা দিন!`,
        actionButtons: [
          { label: 'ক্যালকুলেশন বা কোটেশন নিন', url: '/contact.html', bg: '#D4AF37', color: '#090D16', icon: 'fa-solid fa-calculator' },
          { label: 'সরাসরি কল দিন', url: 'tel:' + AGENCY_INFO.contact.phone, bg: '#22C55E', color: '#FFFFFF', icon: 'fa-solid fa-phone' }
        ]
      };
    }

    // 5. Contact / Booking / Office
    if (q.includes('contact') || q.includes('যোগাযোগ') || q.includes('phone') || q.includes('নাম্বার') || q.includes('কল') || q.includes('address') || q.includes('ঠিকানা') || q.includes('email') || q.includes('ইমেইল')) {
      return {
        text: `📞 **RanSovie It Agency & Technology এর সাথে যোগাযোগ**\n\n• **অফিস ঠিকানা:** Tech District, Innovation Drive, Dhaka & Global Remote Hub\n• **অফিশিয়াল ইমেইল:** contact@ransovie.com\n• **সরাসরি ফোন:** ${AGENCY_INFO.contact.phone}\n• **হোয়াটসঅ্যাপ সাপোর্ট:** সার্বক্ষণিক সক্রিয়\n\nনিচের বাটনে ক্লিক করে সরাসরি ১৫ মিনিটের একটি ফ্রি স্ট্র্যাটেজি সেশন বুক করতে পারেন।`,
        actionButtons: [
          { label: 'সরাসরি কল করুন', url: 'tel:' + AGENCY_INFO.contact.phone, bg: '#10B981', color: '#FFFFFF', icon: 'fa-solid fa-phone' },
          { label: 'কনটাক্ট ফরম', url: '/contact.html', bg: '#D4AF37', color: '#090D16', icon: 'fa-solid fa-envelope' }
        ]
      };
    }

    // 6. About Agency / Zaidan Enterprise
    if (q.includes('agency') || q.includes('about') || q.includes('সম্পর্কে') || q.includes('zaidan') || q.includes('কারা') || q.includes('company')) {
      return {
        text: `🏢 **RanSovie It Agency & Technology সম্পর্কে**\n\nআমরা **A Zaidan Enterprise** এর একটি ডিজিটাল ট্রান্সফরমেশন এবং টেকনোলজি ভেঞ্চার। আমাদের মূলনীতি:\n\n• **Strategic Design:** বিশ্বমানের ইউআই/ইউএক্স এবং ব্র্যান্ড ভিজ্যুয়াল\n• **Advanced Tech:** স্কেলেবল ক্লাউড-নেটিভ সফটওয়্যার ও ওয়েব প্ল্যাটফর্ম\n• **Targeted Growth:** ডেটা-ড্রিভেন মার্কেটিং ও বিজনেস স্কেলিং\n\nআমাদের ৯৯% ক্লায়েন্ট সন্তুষ্টি এবং ১০০% অন-টাইম ডেলিভারি গ্যারান্টি রয়েছে।`,
        actionButtons: [
          { label: 'আমাদের সম্পর্কে বিস্তারিত', url: '/about.html', bg: '#D4AF37', color: '#090D16', icon: 'fa-solid fa-circle-info' },
          { label: 'সব সার্ভিস দেখুন', url: '/services.html', bg: '#EF4444', color: '#FFFFFF', icon: 'fa-solid fa-list-check' }
        ]
      };
    }

    // 7. General fallback in friendly Bengali / English
    return {
      text: `ধন্যবাদ আপনার বার্তার জন্য! আমি **RanSovie AI**, RanSovie IT Agency এর যেকোনো সেবা সম্পর্কে আপনাকে পূর্ণাঙ্গ সহায়তা করতে প্রস্তুত।\n\nআপনি কি **ওয়েব ডেভেলপমেন্ট**, **UI/UX গ্রাফিক ডিজাইন**, অথবা **ডিজিটাল মার্কেটিং ও এসইও** নিয়ে জানতে চান? নিচের অপশনগুলোতে ক্লিক করতে পারেন অথবা সরাসরি আমাদের সাথে কথা বলতে পারেন।`,
      quickChips: [
        'ওয়েব ডেভেলপমেন্ট প্যাকেজ ও খরচ',
        'UI/UX ও গ্রাফিক ডিজাইন সার্ভিস',
        'ডিজিটাল মার্কেটিং ও এসইও',
        'ফ্রি কনসালটেশন ও যোগাযোগ'
      ],
      actionButtons: [
        { label: 'সরাসরি কল করুন', url: 'tel:' + AGENCY_INFO.contact.phone, bg: '#10B981', color: '#FFFFFF', icon: 'fa-solid fa-phone' },
        { label: 'যোগাযোগ ফরম', url: '/contact.html', bg: '#D4AF37', color: '#090D16', icon: 'fa-solid fa-paper-plane' }
      ]
    };
  }

  // Handle Sending Message (Tries Gemini API first, falls back instantly)
  async function handleUserSend(customText) {
    if (isSending) return;
    const input = document.getElementById('albaraqah-user-input');
    const text = (customText || (input ? input.value : '')).trim();
    if (!text) return;

    if (input) input.value = '';

    const session = getActiveSession();

    // If first real user message, update session title
    if (session.messages.filter(m => m.role === 'user').length === 0) {
      session.title = text.length > 24 ? text.substring(0, 24) + '...' : text;
    }

    // Add user message
    session.messages.push({
      id: 'usr_' + Date.now(),
      role: 'user',
      text: text,
      time: formatTime(new Date()),
      device: currentDevice.type
    });

    renderMessages();
    saveSessions();

    // Show typing indicator
    isSending = true;
    const container = document.getElementById('albaraqah-messages-box');
    const typingEl = document.createElement('div');
    typingEl.id = 'albaraqah-typing-indicator';
    typingEl.className = 'albaraqah-msg bot';
    typingEl.innerHTML = `
      <div class="albaraqah-msg-bubble albaraqah-typing">
        <span></span><span></span><span></span>
      </div>
    `;
    if (container) {
      container.appendChild(typingEl);
      container.scrollTop = container.scrollHeight;
    }

    // Current Active Role & Model state
    const activeRole = session.activeRole || 'general';
    currentRole = activeRole;

    // Try Gemini API /api/chat with full multi-turn history
    let botReply = null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: text,
          device: currentDevice.type,
          role: currentRole,
          taskType: currentRole === 'architect' ? 'complex' : (currentRole === 'fast' ? 'fast' : 'general'),
          history: session.messages.map(m => ({ role: m.role, text: m.text }))
        })
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.reply) {
          botReply = {
            text: data.reply,
            model: data.model || (currentRole === 'fast' ? 'gemini-3.1-flash-lite' : (currentRole === 'architect' ? 'gemini-3.1-pro-preview' : 'gemini-3.5-flash')),
            actionButtons: [
              { label: 'ফ্রি কোটেশন নিন', url: '/contact.html', bg: '#D4AF37', color: '#090D16', icon: 'fa-solid fa-file-lines' },
              { label: 'সরাসরি কল দিন', url: 'tel:' + AGENCY_INFO.contact.phone, bg: '#10B981', color: '#FFFFFF', icon: 'fa-solid fa-phone' }
            ]
          };
        }
      }
    } catch (err) {
      // Offline, timeout, or no API route -> use local engine
    }

    // If API didn't return, use rich local knowledge engine
    if (!botReply) {
      // Add realistic 400ms pause for natural conversational cadence
      await new Promise(r => setTimeout(r, 450));
      botReply = generateLocalResponse(text);
    }

    // Remove typing indicator
    const typingNode = document.getElementById('albaraqah-typing-indicator');
    if (typingNode) typingNode.remove();

    // Push bot response
    session.messages.push({
      id: 'bot_' + Date.now(),
      role: 'bot',
      text: botReply.text,
      time: formatTime(new Date()),
      device: 'AI Core',
      model: botReply.model || (currentRole === 'fast' ? 'gemini-3.1-flash-lite' : (currentRole === 'architect' ? 'gemini-3.1-pro-preview' : 'gemini-3.5-flash')),
      quickChips: botReply.quickChips,
      actionButtons: botReply.actionButtons
    });

    isSending = false;
    renderMessages();
    saveSessions();
  }

  // Attach Event Handlers
  function attachEvents() {
    // Robot & Speech Bubble click -> Open Chat
    const robotWrapper = document.getElementById('robotWrapper');
    if (robotWrapper) {
      robotWrapper.addEventListener('click', () => {
        const bubble = document.getElementById('speechBubble');
        if (bubble) {
          bubble.innerText = "বলুন, কিভাবে সাহায্য করতে পারি?";
        }
        setRobotIdle();
        toggleChat(true);
      });
    }

    const speechBubble = document.getElementById('speechBubble');
    if (speechBubble) {
      speechBubble.addEventListener('click', () => {
        setRobotIdle();
        toggleChat(true);
      });
    }

    const robotContainer = document.getElementById('robot-container');
    if (robotContainer) {
      robotContainer.addEventListener('click', (e) => {
        if (e.target.closest('#robotWrapper') || e.target.closest('#speechBubble')) {
          toggleChat(true);
        }
      });
    }

    // Modal Close
    const closeBtn = document.getElementById('albaraqah-close-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => toggleChat(false));
    }

    // Toggle History Drawer
    const histBtn = document.getElementById('albaraqah-toggle-history');
    if (histBtn) {
      histBtn.addEventListener('click', () => {
        if (isHistoryOpen) closeHistoryDrawer();
        else openHistoryDrawer();
      });
    }

    // History Drawer Back
    const histBack = document.getElementById('albaraqah-history-back');
    if (histBack) {
      histBack.addEventListener('click', closeHistoryDrawer);
    }

    // Clear History Button
    const histClear = document.getElementById('albaraqah-history-clear');
    if (histClear) {
      histClear.addEventListener('click', clearAllHistory);
    }

    // New Chat Button (in header and history drawer)
    const newChatBtn = document.getElementById('albaraqah-new-chat-btn');
    if (newChatBtn) {
      newChatBtn.addEventListener('click', () => {
        createNewSession();
        closeHistoryDrawer();
      });
    }
    const drawerNewBtn = document.getElementById('albaraqah-history-new');
    if (drawerNewBtn) {
      drawerNewBtn.addEventListener('click', () => {
        createNewSession();
        closeHistoryDrawer();
      });
    }

    // Chat form submit
    const form = document.getElementById('albaraqah-chat-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleUserSend();
      });
    }

    // Role / Persona Switcher Handlers
    function setRole(newRole) {
      currentRole = newRole;
      const roleBtns = document.querySelectorAll('.albaraqah-role-btn');
      const modelTag = document.getElementById('albaraqah-model-name');
      
      let modelName = 'gemini-3.5-flash';
      if (newRole === 'fast') {
        modelName = 'gemini-3.1-flash-lite';
      } else if (newRole === 'architect') {
        modelName = 'gemini-3.1-pro-preview';
      }

      if (modelTag) modelTag.textContent = modelName;

      roleBtns.forEach(btn => {
        if (btn.getAttribute('data-role') === newRole) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      const session = getActiveSession();
      if (session) {
        session.activeRole = newRole;
        saveSessions();
      }
    }

    document.querySelectorAll('.albaraqah-role-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const role = btn.getAttribute('data-role');
        setRole(role);
      });
    });

    // Esc key to close modal or drawer
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (isHistoryOpen) closeHistoryDrawer();
        else if (isOpen) toggleChat(false);
      }
    });
  }

  // Initialize
  function init() {
    loadSessions();
    injectStyles();
    buildDOM();
    updateRoleUI();
    updateHistoryBadge();
    attachEvents();
    setupIdleAndPeekingListener();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
