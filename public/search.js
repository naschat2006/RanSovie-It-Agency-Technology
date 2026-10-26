/**
 * RanSovie IT Agency & Technology
 * Live Global Search with Leadership & Founders Knowledge Panel
 * Features real-time indexing, bilingual support (EN/BN), and Google Knowledge-Graph style executive sidebar.
 */
(function () {
  'use strict';

  // Search Index Data
  const SEARCH_INDEX = [
    {
      id: 'agency-about',
      title: 'RanSovie IT Agency & Technology',
      titleBn: 'RanSovie আইটি এজেন্সি ও টেকনোলজি',
      category: 'Agency',
      categoryBn: 'এজেন্সি পরিচিতি',
      badge: 'Official',
      desc: 'Full-service digital agency focused on strategic design, advanced software engineering, and targeted business growth.',
      descBn: 'একটি পূর্ণাঙ্গ ডিজিটাল এজেন্সি যা স্ট্র্যাটেজিক ডিজাইন, আধুনিক সফটওয়্যার ইঞ্জিনিয়ারিং ও টেকসই বিজনেস গ্রোথ নিশ্চিত করে।',
      url: '/about',
      icon: 'fa-solid fa-building',
      tags: ['ransovie', 'agency', 'company', 'it', 'about', 'আমাদের সম্পর্কে', 'এজেন্সি', 'র‍্যানসোভি']
    },
    {
      id: 'leadership-ashraful',
      title: 'Md. Ashraful Alam – Chairman & Founder',
      titleBn: 'মুহাঃ আশরাফুল আলম – চেয়ারম্যান ও প্রতিষ্ঠাতা',
      category: 'Leadership',
      categoryBn: 'নেতৃত্ব',
      badge: 'Founder',
      desc: 'Chairman and Founder of RanSovie. Sets corporate vision, strategic roadmap, and long-term partnerships.',
      descBn: 'RanSovie-এর চেয়ারম্যান ও প্রতিষ্ঠাতা। দীর্ঘমেয়াদি রূপরেখা, কোম্পানির লক্ষ্য ও ক্লায়েন্ট পার্টনারশিপ নেতৃত্ব দেন।',
      url: '/about',
      icon: 'fa-solid fa-user-tie',
      tags: ['ashraful', 'alam', 'chairman', 'founder', 'leadership', 'আশরাফুল', 'আলম', 'চেয়ারম্যান', 'প্রতিষ্ঠাতা']
    },
    {
      id: 'leadership-nafis',
      title: 'Nafis Iqbal – CEO & Founder',
      titleBn: 'নাফিস ইকবাল – সিইও ও প্রতিষ্ঠাতা',
      category: 'Leadership',
      categoryBn: 'নেতৃত্ব',
      badge: 'Founder & CEO',
      desc: 'CEO and Founder of RanSovie. Leads executive operations, software development architecture, and project deliveries.',
      descBn: 'RanSovie-এর সিইও ও প্রতিষ্ঠাতা। প্রতিদিনের কার্যক্রম, সফটওয়্যার আর্কিটেকচার ও সময়মতো প্রজেক্ট ডেলিভারি নিশ্চিত করেন।',
      url: '/about',
      icon: 'fa-solid fa-user-gear',
      tags: ['nafis', 'iqbal', 'ceo', 'founder', 'leadership', 'নাফিস', 'ইকবাল', 'সিইও', 'প্রতিষ্ঠাতা']
    },
    {
      id: 'srv-web-dev',
      title: 'Web Development & Custom Systems',
      titleBn: 'ওয়েব ডেভেলপমেন্ট ও কাস্টম সফটওয়্যার',
      category: 'Services',
      categoryBn: 'সার্ভিসসমূহ',
      badge: 'Service',
      desc: 'Production-grade enterprise web applications, e-commerce stores, SaaS platforms, and responsive websites.',
      descBn: 'হাই-পারফরম্যান্স ওয়েব অ্যাপ্লিকেশন, ই-কমার্স স্টোর, সাস প্ল্যাটফর্ম এবং রেসপনসিভ ওয়েবসাইট ডেভেলপমেন্ট।',
      url: '/web-development',
      icon: 'fa-solid fa-code',
      tags: ['web', 'development', 'software', 'website', 'code', 'react', 'node', 'ওয়েব', 'ডেভেলপমেন্ট']
    },
    {
      id: 'srv-graphic-design',
      title: 'Graphic Design & Brand Identity',
      titleBn: 'গ্রাফিক ডিজাইন ও ব্র্যান্ড আইডেন্টিটি',
      category: 'Services',
      categoryBn: 'সার্ভিসসমূহ',
      badge: 'Service',
      desc: 'Brand visual identities, modern UI/UX design systems, logos, and high-impact marketing creatives.',
      descBn: 'ব্র্যান্ডের অনন্য ভিজ্যুয়াল পরিচিতি, মডার্ন ইউআই/ইউএক্স ডিজাইন, লোগো ও মার্কেটিং ব্যানার।',
      url: '/graphic-design',
      icon: 'fa-solid fa-pen-nib',
      tags: ['graphic', 'design', 'ui', 'ux', 'brand', 'logo', 'ডিজাইন', 'গ্রাফিক', 'লোগো']
    },
    {
      id: 'srv-digital-marketing',
      title: 'Digital Marketing & Growth',
      titleBn: 'ডিজিটাল মার্কেটিং ও গ্রোথ',
      category: 'Services',
      categoryBn: 'সার্ভিসসমূহ',
      badge: 'Service',
      desc: 'Search engine optimization (SEO), Meta & Google Ads campaigns, social media management, and conversion rate growth.',
      descBn: 'সার্চ ইঞ্জিন অপটিমাইজেশন (SEO), গুগল ও ফেসবুক অ্যাডস, সোশ্যাল মিডিয়া মার্কেটিং ও কাস্টমার গ্রোথ।',
      url: '/digital-marketing',
      icon: 'fa-solid fa-chart-line',
      tags: ['marketing', 'seo', 'ads', 'growth', 'social', 'মার্কেটিং', 'এসইও']
    },
    {
      id: 'port-attitude',
      title: 'Attitude Fashion DNJ (E-Commerce Platform)',
      titleBn: 'অ্যাটিটিউড ফ্যাশন ডিএনজে (ই-কমার্স প্ল্যাটফর্ম)',
      category: 'Portfolio',
      categoryBn: 'পোর্টফোলিও',
      badge: 'Case Study',
      desc: 'Flagship fashion retail e-commerce platform with smart filtering, instant search, and automated checkout.',
      descBn: 'র‍্যানসোভি নির্মিত ফ্যাশন ই-কমার্স প্ল্যাটফর্ম যাতে রয়েছে অ্যাডভান্সড ফিল্টারিং ও নিরাপদ পেমেন্ট গেটওয়ে।',
      url: '/portfolio',
      icon: 'fa-solid fa-bag-shopping',
      tags: ['portfolio', 'attitude', 'fashion', 'ecommerce', 'store', 'কেস স্টাডি']
    },
    {
      id: 'port-raiyan',
      title: 'Ar Raiyan Restaurant (Web App & Booking)',
      titleBn: 'আর রাইয়ান রেস্টুরেন্ট (ওয়েব অ্যাপ ও বুকিং)',
      category: 'Portfolio',
      categoryBn: 'পোর্টফোলিও',
      badge: 'Case Study',
      desc: 'Interactive dining web portal with live menu showcases, table reservations, and branch finder.',
      descBn: 'ইন্টারেক্টিভ ডাইনিং ও রেস্টুরেন্ট পোর্টাল যাতে রয়েছে অনলাইন টেবিল বুকিং ও ডিজিটাল মেনু।',
      url: '/portfolio',
      icon: 'fa-solid fa-utensils',
      tags: ['portfolio', 'raiyan', 'restaurant', 'booking', 'খাবার', 'রেস্টুরেন্ট']
    },
    {
      id: 'pricing-plans',
      title: 'Transparent Pricing & Monthly Retainers',
      titleBn: 'স্বচ্ছ প্রাইসিং ও মান্থলি রিটেইনার প্ল্যান',
      category: 'Pricing',
      categoryBn: 'প্রাইসিং',
      badge: 'Pricing',
      desc: 'Clear, milestone-based quotes and managed retainers starting at $499/mo with zero hidden fees.',
      descBn: 'নির্দিষ্ট মাইলস্টোন পেমেন্ট এবং ফ্লেক্সিবল মান্থলি রিটেইনার প্যাকেজ।',
      url: '/pricing',
      icon: 'fa-solid fa-tag',
      tags: ['pricing', 'cost', 'retainer', 'package', 'price', 'খরচ', 'প্যাকেজ']
    },
    {
      id: 'contact-help',
      title: 'Contact RanSovie & Request a Quote',
      titleBn: 'যোগাযোগ ও কোটেশন রিকোয়েস্ট',
      category: 'Contact',
      categoryBn: 'যোগাযোগ',
      badge: 'Support',
      desc: 'Get in touch with our team in Jamalpur, Bangladesh. Phone: +8809638661612 | 9am - 10pm.',
      descBn: 'আমাদের সাথে সরাসরি যোগাযোগ করুন। হটলাইন: +8809638661612, ইমেইল ও জামালপুর অফিস ঠিকানা।',
      url: '/contact',
      icon: 'fa-solid fa-phone',
      tags: ['contact', 'phone', 'location', 'jamalpur', 'email', 'help', 'যোগাযোগ', 'ঠিকানা']
    }
  ];

  // Current Language Helper
  function getLang() {
    return localStorage.lang || localStorage.preferred_lang || 'EN';
  }

  // Inject Search Modal Markup into DOM
  function injectSearchModal() {
    if (document.getElementById('ransovie-search-overlay')) return;

    const modalHTML = `
      <div id="ransovie-search-overlay" class="fixed inset-0 z-[100] bg-brandNavyDark/60 backdrop-blur-md hidden opacity-0 transition-opacity duration-200 flex items-start justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto">
        
        <!-- Modal Card Container -->
        <div id="ransovie-search-card" class="relative w-full max-w-5xl bg-[#FAF9F6] text-gray-900 rounded-3xl border border-gray-200 shadow-2xl overflow-hidden my-auto transform scale-95 transition-transform duration-200">
          
          <!-- Top Input Bar -->
          <div class="p-4 sm:p-6 bg-white border-b border-gray-200">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-brandGold/10 text-brandGold flex items-center justify-center shrink-0 text-base">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              
              <div class="flex-1 relative">
                <input 
                  type="text" 
                  id="ransovie-search-input" 
                  class="w-full bg-transparent text-gray-900 placeholder-gray-400 font-semibold text-base sm:text-lg focus:outline-none"
                  placeholder="Search RanSovie, services, founders, CEO..."
                  autocomplete="off"
                  spellcheck="false"
                />
              </div>

              <!-- Clear Query Button -->
              <button id="ransovie-search-clear" class="hidden text-gray-400 hover:text-gray-600 p-1 text-sm transition-colors" title="Clear">
                <i class="fa-solid fa-circle-xmark"></i>
              </button>

              <!-- Close Modal Button -->
              <button id="ransovie-search-close" class="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-gray-200 hover:border-brandGold text-gray-500 hover:text-brandGold text-xs font-bold transition flex items-center gap-1.5" title="Close (Esc)">
                <span class="hidden sm:inline">ESC</span>
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            <!-- Quick Filter Pills -->
            <div class="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span class="text-gray-400 font-bold uppercase tracking-wider text-[10px] shrink-0">Quick Filter:</span>
              <button type="button" class="search-tag-pill active px-3 py-1 rounded-full bg-brandNavyDark text-white font-semibold shrink-0" data-filter="all">All</button>
              <button type="button" class="search-tag-pill px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold shrink-0" data-filter="ransovie">RanSovie Agency</button>
              <button type="button" class="search-tag-pill px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold shrink-0" data-filter="leadership">Founders & Leadership</button>
              <button type="button" class="search-tag-pill px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold shrink-0" data-filter="services">Services</button>
              <button type="button" class="search-tag-pill px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold shrink-0" data-filter="portfolio">Projects</button>
            </div>
          </div>

          <!-- Main Layout: Results on Left (7 cols), Knowledge Panel on Right (5 cols) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] max-h-[70vh] overflow-y-auto">
            
            <!-- LEFT COLUMN: Matched Results -->
            <div class="lg:col-span-7 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-gray-200 space-y-3">
              <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span id="search-status-text" class="font-bold uppercase tracking-wider text-[11px] text-brandGold">Featured Results</span>
                <span id="search-count-badge" class="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono text-[10px]">10 items</span>
              </div>

              <!-- Dynamic Results List -->
              <div id="ransovie-search-results" class="space-y-2.5">
                <!-- Injected via JavaScript -->
              </div>
            </div>

            <!-- RIGHT COLUMN: Official Knowledge Graph Panel for Founders & CEO -->
            <div class="lg:col-span-5 p-4 sm:p-6 bg-white space-y-5">
              
              <!-- Knowledge Panel Header -->
              <div class="border-b border-gray-100 pb-4">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[10px] font-black uppercase tracking-widest text-brandGold flex items-center gap-1.5">
                    <i class="fa-solid fa-circle-check"></i>
                    <span id="kp-badge-label">Verified Knowledge Panel</span>
                  </span>
                  <span class="text-[10px] font-mono text-gray-400">Google Graph ID</span>
                </div>
                
                <div class="flex items-center gap-3 mt-2">
                  <div class="w-12 h-12 rounded-2xl bg-brandNavyDark p-1.5 flex items-center justify-center border border-brandGold/40 shadow-sm shrink-0">
                    <img src="/images/ransovie-logo.svg" alt="RanSovie Logo" class="w-full h-full object-contain filter drop-shadow">
                  </div>
                  <div>
                    <h3 class="font-extrabold text-brandNavyDark text-lg leading-tight">RanSovie IT Agency</h3>
                    <p class="text-xs text-gray-500 font-medium">A Ar Raiyan International Group of Company</p>
                  </div>
                </div>
              </div>

              <!-- Key Leadership: Chairman & CEO Cards -->
              <div class="space-y-3">
                <h4 class="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <i class="fa-solid fa-users text-brandGold"></i>
                  <span id="kp-leadership-heading">Company Founders & Leadership</span>
                </h4>

                <!-- Person 1: Chairman & Founder -->
                <div class="p-3.5 rounded-2xl bg-[#FAF9F6] border border-gray-200/90 shadow-2xs hover:border-brandGold/50 transition">
                  <div class="flex items-start gap-3.5">
                    <img 
                      src="/assets/aistudio/src_pages_chairman_1eb7fec7.png" 
                      alt="Md. Ashraful Alam" 
                      class="w-16 h-20 rounded-xl object-cover border-2 border-brandGold shadow-md shrink-0"
                    />
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between">
                        <h5 class="text-sm font-extrabold text-brandNavyDark truncate" id="kp-chairman-name">Md. Ashraful Alam</h5>
                        <span class="text-[10px] bg-brandGold/15 text-brandNavyDark font-black px-2 py-0.5 rounded-md uppercase">Chairman</span>
                      </div>
                      <p class="text-[11px] text-brandGold font-bold mb-1" id="kp-chairman-role">Chairman & Founder</p>
                      <p class="text-xs text-gray-600 line-clamp-2 leading-relaxed" id="kp-chairman-bio">
                        Sets the company's long-term vision, direction, and executive business partnerships.
                      </p>
                      <p class="text-[11px] text-gray-800 italic mt-1.5 font-medium border-t border-gray-200/60 pt-1" id="kp-chairman-quote">
                        “A good business is built on trust, and trust is built one project at a time.”
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Person 2: CEO & Founder -->
                <div class="p-3.5 rounded-2xl bg-[#FAF9F6] border border-gray-200/90 shadow-2xs hover:border-brandGold/50 transition">
                  <div class="flex items-start gap-3.5">
                    <img 
                      src="/assets/aistudio/image_3a862a15.png" 
                      alt="Nafis Iqbal" 
                      class="w-16 h-20 rounded-xl object-cover border-2 border-brandGold shadow-md shrink-0"
                    />
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between">
                        <h5 class="text-sm font-extrabold text-brandNavyDark truncate" id="kp-ceo-name">Nafis Iqbal</h5>
                        <span class="text-[10px] bg-brandGold/15 text-brandNavyDark font-black px-2 py-0.5 rounded-md uppercase">CEO</span>
                      </div>
                      <p class="text-[11px] text-brandGold font-bold mb-1" id="kp-ceo-role">CEO & Founder</p>
                      <p class="text-xs text-gray-600 line-clamp-2 leading-relaxed" id="kp-ceo-bio">
                        Leads day-to-day operations, technical system architecture, and timely project delivery.
                      </p>
                      <p class="text-[11px] text-gray-800 italic mt-1.5 font-medium border-t border-gray-200/60 pt-1" id="kp-ceo-quote">
                        “We don’t just build websites, we build digital businesses.”
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Quick Agency Fast Facts -->
              <div class="pt-2 border-t border-gray-100 text-xs space-y-2 text-gray-600 font-medium">
                <div class="flex items-center justify-between py-1 border-b border-gray-100/60">
                  <span class="text-gray-400">Headquarters:</span>
                  <span class="font-semibold text-gray-900 text-right">Jamalpur-2000, Bangladesh</span>
                </div>
                <div class="flex items-center justify-between py-1 border-b border-gray-100/60">
                  <span class="text-gray-400">Direct Helpline:</span>
                  <a href="tel:+8809638661612" class="font-bold text-brandGold hover:underline">+8809638661612</a>
                </div>
                <div class="flex items-center justify-between py-1">
                  <span class="text-gray-400">Primary Services:</span>
                  <span class="font-semibold text-gray-900">Web Dev, UI/UX, Growth SEO</span>
                </div>
              </div>

              <!-- Direct CTA Actions -->
              <div class="pt-2 flex items-center gap-2">
                <a href="/about" class="flex-1 text-center py-2 px-3 rounded-xl bg-brandNavyDark text-white hover:bg-gray-800 text-xs font-bold transition shadow-sm">
                  <span id="kp-btn-leadership">Full About & Team</span>
                </a>
                <a href="/contact" class="flex-1 text-center py-2 px-3 rounded-xl bg-brandGold text-brandNavyDark hover:bg-yellow-500 text-xs font-bold transition shadow-sm">
                  <span id="kp-btn-contact">Contact Leaders</span>
                </a>
              </div>

            </div>

          </div>

          <!-- Bottom Status Footer -->
          <div class="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500 px-6">
            <span class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span id="search-footer-hint">Tip: Type "RanSovie", "Founder", "CEO", or any service</span>
            </span>
            <span class="hidden sm:inline font-mono">RanSovie Instant Index v2.6</span>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    bindModalEvents();
  }

  // Bind Open, Close & Input Events
  function bindModalEvents() {
    const overlay = document.getElementById('ransovie-search-overlay');
    const card = document.getElementById('ransovie-search-card');
    const input = document.getElementById('ransovie-search-input');
    const clearBtn = document.getElementById('ransovie-search-clear');
    const closeBtn = document.getElementById('ransovie-search-close');
    const filterPills = document.querySelectorAll('.search-tag-pill');

    function openModal() {
      overlay.classList.remove('hidden');
      setTimeout(() => {
        overlay.classList.remove('opacity-0');
        card.classList.remove('scale-95');
        input.focus();
      }, 10);
      syncBilingualKnowledgePanel();
      renderSearchResults(input.value.trim(), 'all');
    }

    function closeModal() {
      overlay.classList.add('opacity-0');
      card.classList.add('scale-95');
      setTimeout(() => {
        overlay.classList.add('hidden');
      }, 200);
    }

    // Attach trigger clicks
    document.querySelectorAll('#search-modal-trigger, #search-modal-trigger-mobile, #search-modal-trigger-drawer').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // Cmd+K or Ctrl+K or /
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (overlay.classList.contains('hidden')) {
          openModal();
        } else {
          closeModal();
        }
      } else if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
        closeModal();
      } else if (e.key === '/' && overlay.classList.contains('hidden')) {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (activeTag !== 'input' && activeTag !== 'textarea') {
          e.preventDefault();
          openModal();
        }
      }
    });

    // Input Search Live Filtering
    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const query = input.value.trim();
      clearBtn.classList.toggle('hidden', query.length === 0);
      
      debounceTimer = setTimeout(() => {
        const activeFilter = document.querySelector('.search-tag-pill.active')?.getAttribute('data-filter') || 'all';
        renderSearchResults(query, activeFilter);
      }, 150);
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.classList.add('hidden');
      input.focus();
      const activeFilter = document.querySelector('.search-tag-pill.active')?.getAttribute('data-filter') || 'all';
      renderSearchResults('', activeFilter);
    });

    // Tag pills filtering
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => {
          p.classList.remove('active', 'bg-brandNavyDark', 'text-white');
          p.classList.add('bg-gray-100', 'text-gray-700');
        });
        pill.classList.add('active', 'bg-brandNavyDark', 'text-white');
        pill.classList.remove('bg-gray-100', 'text-gray-700');
        
        const filter = pill.getAttribute('data-filter');
        renderSearchResults(input.value.trim(), filter);
      });
    });
  }

  // Render Left Column Search Results
  function renderSearchResults(query, filter = 'all') {
    const isBn = getLang() === 'BN';
    const container = document.getElementById('ransovie-search-results');
    const statusText = document.getElementById('search-status-text');
    const countBadge = document.getElementById('search-count-badge');
    if (!container) return;

    const lowerQuery = query.toLowerCase();

    // Filter Logic
    const filtered = SEARCH_INDEX.filter(item => {
      // Category filter check
      if (filter !== 'all') {
        if (filter === 'ransovie' && item.id !== 'agency-about') return false;
        if (filter === 'leadership' && !item.id.startsWith('leadership')) return false;
        if (filter === 'services' && !item.id.startsWith('srv-')) return false;
        if (filter === 'portfolio' && !item.id.startsWith('port-')) return false;
      }

      if (!lowerQuery) return true;

      const titleMatch = (isBn ? item.titleBn : item.title).toLowerCase().includes(lowerQuery);
      const descMatch = (isBn ? item.descBn : item.desc).toLowerCase().includes(lowerQuery);
      const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(lowerQuery));

      return titleMatch || descMatch || tagMatch;
    });

    if (query) {
      statusText.textContent = isBn ? `"${query}" এর জন্য সার্চ ফলাফল` : `Results for "${query}"`;
    } else {
      statusText.textContent = isBn ? 'নির্বাচিত সার্চ আইটেমসমূহ' : 'Featured Results';
    }

    countBadge.textContent = `${filtered.length} ${isBn ? 'টি আইটেম' : 'items'}`;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 px-4 rounded-2xl bg-white border border-gray-200/80">
          <div class="w-12 h-12 mx-auto rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xl mb-3">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <h5 class="text-sm font-bold text-gray-800 mb-1">${isBn ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No direct matches found'}</h5>
          <p class="text-xs text-gray-500 max-w-sm mx-auto mb-4">${isBn ? 'অনুগ্রহ করে "RanSovie", "Founder", "CEO" অথবা "Web Development" লিখে সার্চ করে দেখুন।' : 'Try searching for "RanSovie", "Founder", "CEO", or "Web Development".'}</p>
          <a href="/contact" class="inline-flex items-center gap-2 bg-brandGold text-brandNavyDark font-bold px-4 py-2 rounded-xl text-xs shadow-xs hover:bg-yellow-500 transition">
            <span>${isBn ? 'কাস্টম কোটেশন চান?' : 'Need custom assistance?'}</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => {
      const title = isBn ? item.titleBn : item.title;
      const desc = isBn ? item.descBn : item.desc;
      const category = isBn ? item.categoryBn : item.category;

      return `
        <a href="${item.url}" class="group block p-3.5 rounded-2xl bg-white border border-gray-200/80 hover:border-brandGold hover:shadow-md transition-all duration-200 text-left">
          <div class="flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-gray-100 text-brandNavyDark flex items-center justify-center text-sm shrink-0 group-hover:bg-brandGold group-hover:text-brandNavyDark transition-colors">
              <i class="${item.icon}"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <span class="text-[10px] font-bold uppercase tracking-wider text-brandGold">${category}</span>
                <span class="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-mono">${item.badge}</span>
              </div>
              <h5 class="text-sm font-bold text-gray-900 group-hover:text-brandNavyDark truncate transition-colors">${title}</h5>
              <p class="text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">${desc}</p>
            </div>
            <div class="text-gray-300 group-hover:text-brandGold group-hover:translate-x-1 transition-all pt-2">
              <i class="fa-solid fa-chevron-right text-xs"></i>
            </div>
          </div>
        </a>
      `;
    }).join('');
  }

  // Update Knowledge Panel Language
  function syncBilingualKnowledgePanel() {
    const isBn = getLang() === 'BN';
    
    // Labels
    const kpBadgeLabel = document.getElementById('kp-badge-label');
    const kpHeading = document.getElementById('kp-leadership-heading');
    const kpChairmanName = document.getElementById('kp-chairman-name');
    const kpChairmanRole = document.getElementById('kp-chairman-role');
    const kpChairmanBio = document.getElementById('kp-chairman-bio');
    const kpChairmanQuote = document.getElementById('kp-chairman-quote');

    const kpCeoName = document.getElementById('kp-ceo-name');
    const kpCeoRole = document.getElementById('kp-ceo-role');
    const kpCeoBio = document.getElementById('kp-ceo-bio');
    const kpCeoQuote = document.getElementById('kp-ceo-quote');

    const kpBtnLeadership = document.getElementById('kp-btn-leadership');
    const kpBtnContact = document.getElementById('kp-btn-contact');
    const searchFooterHint = document.getElementById('search-footer-hint');
    const searchInput = document.getElementById('ransovie-search-input');

    if (kpBadgeLabel) kpBadgeLabel.textContent = isBn ? 'ভেরিফায়েড নলেজ প্যানেল' : 'Verified Knowledge Panel';
    if (kpHeading) kpHeading.textContent = isBn ? 'কোম্পানি প্রতিষ্ঠাতা ও নেতৃত্ব' : 'Company Founders & Leadership';

    if (kpChairmanName) kpChairmanName.textContent = isBn ? 'মুহাঃ আশরাফুল আলম' : 'Md. Ashraful Alam';
    if (kpChairmanRole) kpChairmanRole.textContent = isBn ? 'চেয়ারম্যান ও প্রতিষ্ঠাতা' : 'Chairman & Founder';
    if (kpChairmanBio) kpChairmanBio.textContent = isBn 
      ? 'RanSovie-এর দীর্ঘমেয়াদি রূপরেখা, মূল লক্ষ্য এবং ক্লায়েন্ট পার্টনারশিপ প্রতিষ্ঠা করেন।' 
      : 'Sets corporate vision, long-term roadmap, and executive business partnerships.';
    if (kpChairmanQuote) kpChairmanQuote.textContent = isBn
      ? '“ভালো ব্যবসা দাঁড়ায় বিশ্বাসের ওপর, আর বিশ্বাস গড়ে ওঠে একটা একটা কাজের মধ্য দিয়ে।”'
      : '“A good business is built on trust, and trust is built one project at a time.”';

    if (kpCeoName) kpCeoName.textContent = isBn ? 'নাফিস ইকবাল' : 'Nafis Iqbal';
    if (kpCeoRole) kpCeoRole.textContent = isBn ? 'সিইও ও প্রতিষ্ঠাতা' : 'CEO & Founder';
    if (kpCeoBio) kpCeoBio.textContent = isBn
      ? 'প্রতিদিনের টেকনিক্যাল অপারেশন, সফটওয়্যার আর্কিটেকচার ও সময়মতো নির্ভুল ডেলিভারি নিশ্চিত করেন।'
      : 'Leads day-to-day operations, full-stack architecture, and client success delivery.';
    if (kpCeoQuote) kpCeoQuote.textContent = isBn
      ? '“আমরা শুধু ওয়েবসাইট তৈরি করি না, আমরা ডিজিটাল ব্যবসা তৈরি করি।”'
      : '“We don’t just build websites, we build digital businesses.”';

    if (kpBtnLeadership) kpBtnLeadership.textContent = isBn ? 'সম্পূর্ণ পরিচিতি দেখুন' : 'Full About & Team';
    if (kpBtnContact) kpBtnContact.textContent = isBn ? 'সরাসরি যোগাযোগ' : 'Contact Leaders';
    if (searchFooterHint) searchFooterHint.textContent = isBn ? 'পরামর্শ: "RanSovie", "Founder", "CEO" অথবা যেকোনো সার্ভিস সার্চ করুন' : 'Tip: Type "RanSovie", "Founder", "CEO", or any service';

    if (searchInput) {
      searchInput.placeholder = isBn ? 'RanSovie, সার্ভিস, প্রতিষ্ঠাতা, বা সিইও খুঁজুন...' : 'Search RanSovie, services, founders, CEO...';
    }
  }

  // Listen for language changes from theme-lang.js
  window.addEventListener('ransovieLangChanged', () => {
    syncBilingualKnowledgePanel();
    const input = document.getElementById('ransovie-search-input');
    const query = input ? input.value.trim() : '';
    const activeFilter = document.querySelector('.search-tag-pill.active')?.getAttribute('data-filter') || 'all';
    renderSearchResults(query, activeFilter);
  });

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSearchModal);
  } else {
    injectSearchModal();
  }
})();
