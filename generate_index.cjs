const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RanSovie It Agency & Technology | Strategic Design & Tech</title>
  <meta name="description" content="RanSovie It Agency & Technology - Strategic Design, Advanced Tech & Targeted Growth." />
  
  <!-- Fonts & Icons -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brandNavyDark: '#0B1120',
            brandGold: '#D4AF37',
            brandGoldHover: '#FBBF24',
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          }
        }
      }
    }
  </script>
  
  <!-- Custom CSS Styles -->
  <style>
    body { font-family: 'Inter', sans-serif; background-color: #ffffff; color: #333333; }
    
    .card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.1);
      border-color: #D4AF37;
    }
    
    .text-gradient {
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-image: linear-gradient(to right, #D4AF37, #FDE047);
    }
  </style>
</head>
<body class="antialiased overflow-x-hidden">

  <!-- Navigation Bar -->
  <nav class="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <a href="/index.html" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded bg-brandGold flex items-center justify-center font-bold text-brandNavyDark text-xl shadow-sm">
            RS
          </div>
          <div class="flex flex-col">
            <span class="font-extrabold text-brandNavyDark text-lg tracking-tight leading-tight">RanSovie</span>
            <span class="text-[9px] font-semibold text-gray-500 tracking-widest uppercase">IT Agency & Technology</span>
          </div>
        </a>
        
        <!-- Desktop Links -->
        <div class="hidden lg:flex items-center space-x-8">
          <a href="#" class="text-brandGold font-bold text-sm border-b-2 border-brandGold pb-1">Home</a>
          <a href="/services.html" class="text-brandNavyDark font-semibold text-sm hover:text-brandGold transition flex items-center gap-1.5">Services <i class="fa-solid fa-chevron-down text-[10px] pt-0.5"></i></a>
          <a href="/portfolio.html" class="text-brandNavyDark font-semibold text-sm hover:text-brandGold transition">Portfolio</a>
          <a href="#" class="text-brandNavyDark font-semibold text-sm hover:text-brandGold transition">Pricing</a>
          <a href="/about.html" class="text-brandNavyDark font-semibold text-sm hover:text-brandGold transition">About Us</a>
          <a href="/contact.html" class="text-brandNavyDark font-semibold text-sm hover:text-brandGold transition">Contact Us</a>
        </div>
        
        <!-- Action Button -->
        <a href="/contact.html" class="hidden lg:inline-flex bg-brandNavyDark text-brandGold font-bold px-6 py-2.5 rounded text-sm hover:bg-gray-800 transition shadow-lg items-center gap-2">
          Request a Quote
        </a>
        
        <!-- Mobile Menu Toggle (Mock) -->
        <div class="lg:hidden">
          <button class="text-2xl text-brandNavyDark"><i class="fa-solid fa-bars"></i></button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="bg-brandNavyDark text-white relative overflow-hidden py-16 lg:py-24">
    <div class="absolute inset-0 z-0 opacity-10">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        <!-- Left Content -->
        <div class="w-full lg:w-1/2 text-center lg:text-left">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            EMPOWERING BRANDS WITH <br class="hidden lg:block" />
            <span class="text-gradient">CODE, DESIGN & GROWTH</span>
          </h1>
          <p class="text-gray-300 text-base sm:text-lg mb-8 max-w-xl mx-auto lg:mx-0 font-medium">
            We are a Full-Service Digital Agency focusing on Strategic Design, Advanced Tech, and Targeted Growth.
          </p>
          <div class="flex flex-wrap justify-center lg:justify-start gap-4">
            <a href="/services.html" class="bg-brandGold text-brandNavyDark font-bold px-8 py-3.5 rounded-lg hover:bg-yellow-500 transition shadow-lg shadow-brandGold/20">Explore Services</a>
            <a href="/portfolio.html" class="border border-brandGold/70 text-brandGold font-bold px-8 py-3.5 rounded-lg hover:bg-brandGold/10 transition">See Our Work</a>
          </div>
        </div>
        
        <!-- Right Image -->
        <div class="w-full lg:w-1/2 relative">
          <!-- Ambient Glow -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brandGold/20 blur-[80px] rounded-full -z-10"></div>
          
          <img src="/src/assets/images/hero_agency_tech_1788153476741.jpg" alt="Technology Illustration" class="w-full h-auto rounded-xl relative z-10 mx-auto" style="mix-blend-mode: lighten; mask-image: linear-gradient(to bottom, black 80%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);">
        </div>
      </div>
    </div>
  </section>

  <!-- Core Services -->
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-extrabold text-brandNavyDark mb-16 tracking-tight">Core Services</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div class="border border-brandGold/30 bg-white rounded-xl p-10 shadow-sm card-hover flex flex-col items-center text-center transition-all">
          <div class="w-16 h-16 rounded flex items-center justify-center text-brandNavyDark text-4xl mb-6 relative">
            <i class="fa-solid fa-paint-brush relative z-10 text-brandNavyDark"></i>
            <div class="absolute inset-0 bg-brandGold rotate-3 rounded blur-sm opacity-50"></div>
          </div>
          <h3 class="text-lg font-extrabold text-brandNavyDark mb-2 uppercase tracking-wide">BRAND DESIGN</h3>
          <p class="text-sm text-gray-600 font-medium">Create impactful visual identities and branding strategies.</p>
        </div>

        <!-- Card 2 -->
        <div class="border border-brandGold/30 bg-white rounded-xl p-10 shadow-sm card-hover flex flex-col items-center text-center transition-all">
          <div class="w-16 h-16 rounded flex items-center justify-center text-brandNavyDark text-4xl mb-6 relative">
            <i class="fa-solid fa-code relative z-10 text-brandNavyDark"></i>
            <div class="absolute inset-0 bg-brandGold -rotate-3 rounded blur-sm opacity-50"></div>
          </div>
          <h3 class="text-lg font-extrabold text-brandNavyDark mb-2 uppercase tracking-wide">WEB DEVELOPMENT</h3>
          <p class="text-sm text-gray-600 font-medium">Build robust, responsive, and innovative websites.</p>
        </div>

        <!-- Card 3 -->
        <div class="border border-brandGold/30 bg-white rounded-xl p-10 shadow-sm card-hover flex flex-col items-center text-center transition-all">
          <div class="w-16 h-16 rounded flex items-center justify-center text-brandNavyDark text-4xl mb-6 relative">
            <i class="fa-solid fa-chart-line relative z-10 text-brandNavyDark"></i>
            <div class="absolute inset-0 bg-brandGold rotate-3 rounded blur-sm opacity-50"></div>
          </div>
          <h3 class="text-lg font-extrabold text-brandNavyDark mb-2 uppercase tracking-wide">GROWTH MARKETING</h3>
          <p class="text-sm text-gray-600 font-medium">Drive business scalability and market reach.</p>
        </div>

        <!-- Card 4 -->
        <div class="border border-brandGold/30 bg-white rounded-xl p-10 shadow-sm card-hover flex flex-col items-center text-center transition-all">
          <div class="w-16 h-16 rounded flex items-center justify-center text-brandNavyDark text-4xl mb-6 relative">
            <i class="fa-solid fa-mobile-screen relative z-10 text-brandNavyDark"></i>
            <div class="absolute inset-0 bg-brandGold -rotate-3 rounded blur-sm opacity-50"></div>
          </div>
          <h3 class="text-lg font-extrabold text-brandNavyDark mb-2 uppercase tracking-wide">APP DEVELOPMENT</h3>
          <p class="text-sm text-gray-600 font-medium">Develop engaging and intuitive mobile applications.</p>
        </div>

        <!-- Card 5 -->
        <div class="border border-brandGold/30 bg-white rounded-xl p-10 shadow-sm card-hover flex flex-col items-center text-center transition-all">
          <div class="w-16 h-16 rounded flex items-center justify-center text-brandNavyDark text-4xl mb-6 relative">
            <i class="fa-solid fa-object-group relative z-10 text-brandNavyDark"></i>
            <div class="absolute inset-0 bg-brandGold rotate-3 rounded blur-sm opacity-50"></div>
          </div>
          <h3 class="text-lg font-extrabold text-brandNavyDark mb-2 uppercase tracking-wide">UI/UX DESIGN</h3>
          <p class="text-sm text-gray-600 font-medium">Design seamless user experiences.</p>
        </div>

        <!-- Card 6 -->
        <div class="border border-brandGold/30 bg-white rounded-xl p-10 shadow-sm card-hover flex flex-col items-center text-center transition-all">
          <div class="w-16 h-16 rounded flex items-center justify-center text-brandNavyDark text-4xl mb-6 relative">
            <i class="fa-solid fa-network-wired relative z-10 text-brandNavyDark"></i>
            <div class="absolute inset-0 bg-brandGold -rotate-3 rounded blur-sm opacity-50"></div>
          </div>
          <h3 class="text-lg font-extrabold text-brandNavyDark mb-2 uppercase tracking-wide">API INTEGRATION</h3>
          <p class="text-sm text-gray-600 font-medium">Ensure efficient data flow and system interoperability.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Projects -->
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h3 class="text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">Featured Projects</h3>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-brandNavyDark mb-4 tracking-tight">Explore Our Success Stories</h2>
      <p class="text-gray-500 mb-16 font-medium">Explore our recent web and app success stories</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
        <!-- Project 1 -->
        <div class="group cursor-pointer">
          <div class="rounded-xl overflow-hidden shadow-sm mb-4 border border-gray-200 aspect-[4/3] bg-gray-100 relative group-hover:shadow-lg transition-all">
             <img src="/src/assets/images/hero_web_dev_1788153516769.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
             <div class="absolute inset-0 bg-brandNavyDark/0 group-hover:bg-brandNavyDark/20 transition-colors flex items-center justify-center">
               <span class="bg-white text-brandNavyDark text-xs font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">View Details</span>
             </div>
          </div>
          <h4 class="font-extrabold text-brandNavyDark text-[15px] group-hover:text-brandGold transition-colors">E-commerce Platform for Retailer X</h4>
        </div>

        <!-- Project 2 -->
        <div class="group cursor-pointer">
          <div class="rounded-xl overflow-hidden shadow-sm mb-4 border border-gray-200 aspect-[4/3] bg-brandNavyDark relative group-hover:shadow-lg transition-all">
             <img src="/src/assets/images/hero_design_uiux_1788153499618.jpg" class="w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-105 transition-transform duration-500">
             <div class="absolute inset-0 flex items-center justify-center text-brandGold text-5xl">
               <i class="fa-brands fa-figma"></i>
             </div>
             <div class="absolute inset-0 bg-brandNavyDark/0 group-hover:bg-brandNavyDark/20 transition-colors"></div>
          </div>
          <h4 class="font-extrabold text-brandNavyDark text-[15px] group-hover:text-brandGold transition-colors">Brand Re-Design for Client Y</h4>
        </div>

        <!-- Project 3 -->
        <div class="group cursor-pointer">
          <div class="rounded-xl overflow-hidden shadow-sm mb-4 border border-gray-200 aspect-[4/3] bg-brandNavyDark relative group-hover:shadow-lg transition-all">
             <img src="/src/assets/images/hero_agency_tech_1788153476741.jpg" class="w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-105 transition-transform duration-500">
             <div class="absolute inset-0 flex items-center justify-center text-brandGold text-5xl">
               <i class="fa-solid fa-code"></i>
             </div>
             <div class="absolute inset-0 bg-brandNavyDark/0 group-hover:bg-brandNavyDark/20 transition-colors"></div>
          </div>
          <h4 class="font-extrabold text-brandNavyDark text-[15px] group-hover:text-brandGold transition-colors">Custom Web App for Client Z</h4>
        </div>

        <!-- Project 4 -->
        <div class="group cursor-pointer">
          <div class="rounded-xl overflow-hidden shadow-sm mb-4 border border-gray-200 aspect-[4/3] bg-gray-100 relative group-hover:shadow-lg transition-all">
             <img src="/src/assets/images/hero_growth_ads_1788153532291.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
             <div class="absolute inset-0 bg-brandNavyDark/0 group-hover:bg-brandNavyDark/20 transition-colors flex items-center justify-center">
               <span class="bg-white text-brandNavyDark text-xs font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">View Details</span>
             </div>
          </div>
          <h4 class="font-extrabold text-brandNavyDark text-[15px] group-hover:text-brandGold transition-colors">Growth Marketing for Startup A</h4>
        </div>

        <!-- Project 5 -->
        <div class="group cursor-pointer">
          <div class="rounded-xl overflow-hidden shadow-sm mb-4 border border-gray-200 aspect-[4/3] bg-brandNavyDark relative group-hover:shadow-lg transition-all">
             <img src="/src/assets/images/hero_design_uiux_1788153499618.jpg" class="w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-105 transition-transform duration-500">
             <div class="absolute inset-0 flex items-center justify-center text-brandGold text-5xl">
               <i class="fa-solid fa-mobile-screen"></i>
             </div>
             <div class="absolute inset-0 bg-brandNavyDark/0 group-hover:bg-brandNavyDark/20 transition-colors"></div>
          </div>
          <h4 class="font-extrabold text-brandNavyDark text-[15px] group-hover:text-brandGold transition-colors">App Development for Retailer B</h4>
        </div>

        <!-- Project 6 -->
        <div class="group cursor-pointer">
          <div class="rounded-xl overflow-hidden shadow-sm mb-4 border border-gray-200 aspect-[4/3] bg-brandNavyDark relative group-hover:shadow-lg transition-all">
             <img src="/src/assets/images/hero_agency_tech_1788153476741.jpg" class="w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-105 transition-transform duration-500">
             <div class="absolute inset-0 flex items-center justify-center text-brandGold text-5xl">
               <i class="fa-solid fa-network-wired"></i>
             </div>
             <div class="absolute inset-0 bg-brandNavyDark/0 group-hover:bg-brandNavyDark/20 transition-colors"></div>
          </div>
          <h4 class="font-extrabold text-brandNavyDark text-[15px] group-hover:text-brandGold transition-colors">API Integration for Enterprise C</h4>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl sm:text-4xl font-extrabold text-brandNavyDark mb-4 tracking-tight">Testimonials</h2>
      <p class="text-gray-500 mb-16 font-medium">Explore our satisfied clients</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <!-- Testimonial 1 -->
        <div class="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between">
          <div>
            <i class="fa-solid fa-quote-left text-brandGold text-3xl mb-6"></i>
            <p class="text-gray-700 text-[15px] mb-8 font-medium italic leading-relaxed">"Their expertise and dedication transformed our business."</p>
          </div>
          <div class="flex items-center justify-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-200">
              <img src="https://i.pravatar.cc/100?img=33" alt="Client" class="w-full h-full object-cover">
            </div>
            <div class="text-left">
              <h5 class="font-bold text-brandNavyDark text-[13px]">Hafize Ramis</h5>
              <p class="text-[11px] text-gray-500 font-semibold">Satisfied Company</p>
            </div>
          </div>
        </div>

        <!-- Testimonial 2 -->
        <div class="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between">
          <div>
            <i class="fa-solid fa-quote-left text-brandGold text-3xl mb-6"></i>
            <p class="text-gray-700 text-[15px] mb-8 font-medium italic leading-relaxed">"We are extremely happy with the seamless UI/UX design and the outstanding support team."</p>
          </div>
          <div class="flex items-center justify-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-200">
              <img src="https://i.pravatar.cc/100?img=11" alt="Client" class="w-full h-full object-cover">
            </div>
            <div class="text-left">
              <h5 class="font-bold text-brandNavyDark text-[13px]">Name Names</h5>
              <p class="text-[11px] text-gray-500 font-semibold">Business Inc</p>
            </div>
          </div>
        </div>

        <!-- Testimonial 3 -->
        <div class="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between">
          <div>
            <i class="fa-solid fa-quote-left text-brandGold text-3xl mb-6"></i>
            <p class="text-gray-700 text-[15px] mb-8 font-medium italic leading-relaxed">"Highly recommended! The web development process was incredibly smooth and professional."</p>
          </div>
          <div class="flex items-center justify-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-200">
              <img src="https://i.pravatar.cc/100?img=68" alt="Client" class="w-full h-full object-cover">
            </div>
            <div class="text-left">
              <h5 class="font-bold text-brandNavyDark text-[13px]">Name Shaimer</h5>
              <p class="text-[11px] text-gray-500 font-semibold">Tech Company</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex justify-center gap-2 mt-8">
        <span class="w-2 h-2 rounded-full bg-brandGold"></span>
        <span class="w-2 h-2 rounded-full bg-gray-300"></span>
        <span class="w-2 h-2 rounded-full bg-gray-300"></span>
      </div>
    </div>
  </section>

  <!-- Footer CTA Section -->
  <section class="relative bg-brandNavyDark pt-24 pb-16 overflow-hidden">
    <!-- Abstract background shape -->
    <div class="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-tl from-[#D4AF37]/20 to-transparent -skew-x-12 translate-x-1/4"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <h2 class="text-3xl md:text-5xl font-extrabold text-white mb-10 tracking-tight leading-tight">
        READY TO TRANSFORM YOUR <br class="hidden md:block" /> BUSINESS DIGITALLY?
      </h2>
      <a href="/contact.html" class="inline-flex items-center gap-2 bg-transparent border-2 border-brandGold text-brandGold font-bold px-10 py-3.5 rounded hover:bg-brandGold hover:text-brandNavyDark transition duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">
        Contact Us
      </a>
      <p class="text-brandGold mt-6 font-bold tracking-wide">+1 501 325-7990</p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-[#070b15] text-white pt-16 pb-8 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
        <!-- Col 1: Brand -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded bg-brandGold flex items-center justify-center font-bold text-brandNavyDark text-xl shadow-lg">
              RS
            </div>
            <div class="flex flex-col">
              <span class="font-extrabold text-lg tracking-tight leading-tight">RanSovie</span>
              <span class="text-[9px] font-semibold text-brandGold tracking-widest uppercase">IT Agency & Technology</span>
            </div>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed pr-4">
            Strategic Design, Advanced Tech & Targeted Growth. We engineer bespoke digital solutions for bold visions.
          </p>
        </div>

        <!-- Col 2: Site Map -->
        <div>
          <h4 class="text-white font-bold mb-5 uppercase tracking-widest text-xs">Site Map</h4>
          <ul class="space-y-3 text-sm text-gray-400 font-medium">
            <li><a href="/" class="hover:text-brandGold transition-colors">Home</a></li>
            <li><a href="/services.html" class="hover:text-brandGold transition-colors">Services</a></li>
            <li><a href="#" class="hover:text-brandGold transition-colors">Pricing</a></li>
            <li><a href="#" class="hover:text-brandGold transition-colors">Companies</a></li>
            <li><a href="#" class="hover:text-brandGold transition-colors">Web Creators</a></li>
          </ul>
        </div>

        <!-- Col 3: Useful Links -->
        <div>
          <h4 class="text-white font-bold mb-5 uppercase tracking-widest text-xs">Useful Links</h4>
          <ul class="space-y-3 text-sm text-gray-400 font-medium">
            <li><a href="/about.html" class="hover:text-brandGold transition-colors">About Us</a></li>
            <li><a href="/blog.html" class="hover:text-brandGold transition-colors">Blog</a></li>
            <li><a href="/contact.html" class="hover:text-brandGold transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <!-- Col 4: Contact & Social -->
        <div>
          <div class="flex gap-3 mb-8">
            <a href="#" class="w-9 h-9 rounded-full bg-brandGold text-brandNavyDark flex items-center justify-center hover:bg-white hover:-translate-y-1 transition-all"><i class="fa-brands fa-linkedin-in text-sm"></i></a>
            <a href="#" class="w-9 h-9 rounded-full bg-brandGold text-brandNavyDark flex items-center justify-center hover:bg-white hover:-translate-y-1 transition-all"><i class="fa-brands fa-twitter text-sm"></i></a>
            <a href="#" class="w-9 h-9 rounded-full bg-brandGold text-brandNavyDark flex items-center justify-center hover:bg-white hover:-translate-y-1 transition-all"><i class="fa-brands fa-facebook-f text-sm"></i></a>
            <a href="#" class="w-9 h-9 rounded-full bg-brandGold text-brandNavyDark flex items-center justify-center hover:bg-white hover:-translate-y-1 transition-all"><i class="fa-brands fa-instagram text-sm"></i></a>
          </div>
          <ul class="space-y-3 text-sm text-gray-400 font-medium">
            <li class="flex items-center gap-3"><i class="fa-solid fa-envelope text-brandGold w-4 text-center"></i> contact@ransovie.com</li>
            <li class="flex items-center gap-3"><i class="fa-solid fa-phone text-brandGold w-4 text-center"></i> +1 501 325-7990</li>
            <li class="flex items-center gap-3"><i class="fa-solid fa-globe text-brandGold w-4 text-center"></i> www.ransovie.com</li>
          </ul>
        </div>
      </div>

      <div class="text-center text-[11px] text-gray-500 pt-8 border-t border-white/10 font-medium tracking-wide">
        &copy; 2026 RanSovie It Agency & Technology. All rights reserved.
      </div>
    </div>
  </footer>

  <!-- RanSovie IT Agency & Technology AI Assistant (RanSovie AI) -->
  <script src="/chatbot.js" defer></script>
</body>
</html>
`;

fs.writeFileSync('index.html', htmlContent);
console.log('Successfully updated index.html');
