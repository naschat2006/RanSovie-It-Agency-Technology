/**
 * RanSovie It Agency & Technology
 * Unified Theme (Dark/Light) & Bilingual Translation Engine (EN / BN)
 * 100% Client-Side Instant Translation with Cross-Page Persistence
 */

(function () {
  'use strict';

  // ==========================================
  // 1. COMPREHENSIVE DICTIONARY (EN -> BN)
  // ==========================================
  const DICT = {
    // Navigation & Global UI
    "Home": "হোম",
    "Services": "সার্ভিসসমূহ",
    "Web Development": "ওয়েব ডেভেলপমেন্ট",
    "Graphic Design": "গ্রাফিক ডিজাইন",
    "Digital Marketing": "ডিজিটাল মার্কেটিং",
    "Portfolio": "পোর্টফোলিও",
    "Pricing": "প্রাইসিং",
    "About Us": "আমাদের সম্পর্কে",
    "About": "আমাদের সম্পর্কে",
    "Contact Us": "যোগাযোগ করুন",
    "Contact": "যোগাযোগ",
    "Blog": "ব্লগ",
    "Search": "সার্চ",
    "Search...": "সার্চ করুন...",
    "Search Agency": "সার্চ",
    "Search Agency & Leadership...": "এজেন্সি ও নেতৃত্ব সার্চ করুন...",
    "Request a Quote": "কোটেশন নিন",
    "Start a Project": "প্রজেক্ট শুরু করুন",
    "Request Quote": "কোটেশন নিন",
    "Explore Services": "সার্ভিসসমূহ দেখুন",
    "See Our Work": "আমাদের কাজ দেখুন",
    "View All Services": "সকল সার্ভিস দেখুন",
    "View All Services →": "সকল সার্ভিস দেখুন →",
    "View Services Hub": "সার্ভিস হাব দেখুন",
    "View All Services Hub →": "সকল সার্ভিস হাব দেখুন →",
    "View Details": "বিস্তারিত দেখুন",
    "View Details →": "বিস্তারিত দেখুন →",
    "View Case Study": "কেস স্টাডি দেখুন",
    "Live Preview": "লাইভ প্রিভিউ",
    "Choose Plan": "প্ল্যান বেছে নিন",
    "Choose This Plan": "এই প্ল্যানটি নিন",
    "Get Started": "শুরু করুন",
    "Get Started Now": "এখনই শুরু করুন",
    "3 Pages": "৩টি পেজ",
    "Who We Are": "আমাদের পরিচয়",
    "Our Founder": "আমাদের প্রতিষ্ঠাতা",
    "Featured Projects": "নির্বাচিত প্রজেক্টসমূহ",
    "Testimonials": "গ্রাহকদের মতামত",
    "Frequently Asked Questions": "সাধারণ জিজ্ঞাসাসমূহ",
    "Core Services": "প্রধান সার্ভিসসমূহ",
    "Custom Apps & Systems": "কাস্টম অ্যাপস ও সিস্টেম",
    "Brand Identity & UI/UX": "ব্র্যান্ড আইডেন্টিটি ও ইউআই/ইউএক্স",
    "SEO, Ads & Growth": "এসইও, অ্যাডস ও গ্রোথ",
    "Language": "ভাষা",
    "Language:": "ভাষা:",
    "Language / ভাষা": "ভাষা / Language",

    // Branding
    "IT Agency & Technology": "আইটি এজেন্সি ও টেকনোলজি",
    "RanSovie IT Agency & Technology": "RanSovie আইটি এজেন্সি ও টেকনোলজি",
    "A Ar Raiyan International Group of Company": "এ আর রাইয়ান ইন্টারন্যাশনাল গ্রুপ অব কোম্পানি",

    // Hero Section (Home)
    "EMPOWERING BRANDS WITH": "ব্র্যান্ডকে শক্তিশালী করছি",
    "CODE, DESIGN & GROWTH": "কোড, ডিজাইন ও গ্রোথ দিয়ে",
    "We are a Full-Service Digital Agency focusing on Strategic Design, Advanced Tech, and Targeted Growth.":
      "আমরা একটি ফুল-সার্ভিস ডিজিটাল এজেন্সি, যা স্ট্র্যাটেজিক ডিজাইন, আধুনিক প্রযুক্তি এবং কাঙ্ক্ষিত গ্রোথ নিয়ে কাজ করে।",

    // Counters & Stats
    "Completed Projects": "সম্পন্ন প্রজেক্ট",
    "Happy Clients": "সন্তুষ্ট ক্লায়েন্ট",
    "Years Experience": "বছরের অভিজ্ঞতা",
    "Client Retention": "ক্লায়েন্ট ধরে রাখার হার",
    "Global Reach": "বিশ্বব্যাপী বিস্তার",
    "Support Available": "সাপোর্ট সুবিধা",
    "Code Quality": "কোড কোয়ালিটি",
    "Uptime Guarantee": "আপটাইম গ্যারান্টি",

    // Core Services Section
    "BRAND DESIGN": "ব্র্যান্ড ডিজাইন",
    "Create impactful visual identities and branding strategies.":
      "কার্যকর ভিজ্যুয়াল আইডেন্টিটি এবং ব্র্যান্ডিং স্ট্র্যাটেজি তৈরি করি।",
    "WEB DEVELOPMENT": "ওয়েব ডেভেলপমেন্ট",
    "Build robust, responsive, and innovative websites.":
      "মজবুত, রেসপনসিভ এবং আধুনিক ওয়েবসাইট তৈরি করি।",
    "GROWTH MARKETING": "গ্রোথ মার্কেটিং",
    "Drive business scalability and market reach.":
      "ব্যবসায়ের দ্রুত প্রসার ও কাঙ্ক্ষিত কাস্টমার তৈরি করি।",
    "APP DEVELOPMENT": "অ্যাপ ডেভেলপমেন্ট",
    "Develop engaging and intuitive mobile applications.":
      "ইউজার-বান্ধব এবং দৃষ্টিনন্দন মোবাইল অ্যাপ্লিকেশন তৈরি করি।",
    "UI/UX DESIGN": "ইউআই/ইউএক্স ডিজাইন",
    "Design seamless user experiences.":
      "সহজ এবং আকর্ষণীয় ইউজার ইন্টারফেস ও অভিজ্ঞতা ডিজাইন করি।",
    "API INTEGRATION": "এপিআই ইন্টিগ্রেশন",
    "Ensure efficient data flow and system interoperability.":
      "নিখুঁত ডেটা ফ্লো এবং সিস্টেম ইন্টারঅপারেবিলিটি নিশ্চিত করি।",

    // Why Choose Us
    "Why Choose Us": "কেন আমাদের বেছে নেবেন",
    "Enterprise-Grade Engineering": "এন্টারপ্রাইজ গ্রেড ইঞ্জিনিয়ারিং",
    "High-Performance Architecture": "উচ্চ কার্যক্ষমতার আর্কিটেকচার",
    "Pixel-Perfect Design": "পিক্সেল-পারফেক্ট ডিজাইন",
    "24/7 Dedicated Support": "২৪/৭ ডেডিকেটেড সাপোর্ট",
    "Data-Driven ROI": "ডেটা-ভিত্তিক আরওআই",
    "Agile Sprint Delivery": "অ্যাজাইল স্প্রিন্ট ডেলিভারি",

    // Featured Projects & Portfolio
    "Explore Our Success Stories": "আমাদের সফলতার গল্প দেখুন",
    "Explore our recent web and app success stories": "আমাদের সাম্প্রতিক ওয়েব ও অ্যাপ প্রজেক্টসমূহ দেখুন",
    "All Projects": "সকল প্রজেক্ট",
    "All": "সবগুলো",
    "Web Apps": "ওয়েব অ্যাপস",
    "Mobile": "মোবাইল",
    "Branding": "ব্র্যান্ডিং",
    "Marketing": "মার্কেটিং",
    "UI/UX": "ইউআই/ইউএক্স",
    "E-commerce Platform for Retailer X": "রিটেইলার এক্স-এর ই-কমার্স প্ল্যাটফর্ম",
    "Brand Re-Design for Client Y": "ক্লায়েন্ট ওয়াই-এর ব্র্যান্ড রি-ডিজাইন",
    "SaaS Analytics Dashboard": "স্যাস অ্যানালিটিক্স ড্যাশবোর্ড",
    "Fintech Mobile Application": "ফিনটেক মোবাইল অ্যাপ্লিকেশন",
    "Healthcare Patient Portal": "হেলথকেয়ার পেশেন্ট পোর্টাল",
    "Real Estate Marketplace": "রিয়েল এস্টেট মার্কেটপ্লেস",
    "Client:": "ক্লায়েন্ট:",
    "Category:": "ক্যাটাগরি:",
    "Timeline:": "সময়সীমা:",
    "Results:": "ফলাফল:",

    // Testimonials
    "Explore our satisfied clients": "আমাদের সন্তুষ্ট গ্রাহকদের অভিজ্ঞতা",
    "\"Their expertise and dedication transformed our business.\"":
      "\"তাদের দক্ষতা এবং একাগ্রতা আমাদের ব্যবসাকে অভাবনীয় উচ্চতায় পৌঁছে দিয়েছে।\"",
    "\"We are extremely happy with the seamless UI/UX design and the outstanding support team.\"":
      "\"তাদের নিখুঁত UI/UX ডিজাইন এবং চমৎকার সাপোর্ট টিম পেয়ে আমরা অত্যন্ত সন্তুষ্ট।\"",
    "\"Highly recommended! The web development process was incredibly smooth and professional.\"":
      "\"অত্যন্ত নির্ভরযোগ্য! তাদের ওয়েব ডেভেলপমেন্ট প্রক্রিয়া ছিল অসাধারণ ও পেশাদার।\"",
    "Satisfied Company": "সন্তুষ্ট কোম্পানি",
    "Business Inc": "বিজনেস ইনকর্পোরেশন",
    "Tech Company": "প্রযুক্তি প্রতিষ্ঠান",

    // FAQ Section
    "Everything You Need to Know About Our Process & Pricing":
      "আমাদের কাজের প্রক্রিয়া এবং প্রাইসিং সম্পর্কিত যাবতীয় তথ্য",
    "Clear, transparent answers to our engagement models, milestones, sprint timelines, and pricing guarantees before we write the first line of code.":
      "কোড লেখার আগেই আমাদের কাজের মডেল, মাইলস্টোন, স্প্রিন্ট টাইমলাইন এবং প্রাইসিং গ্যারান্টি সম্পর্কিত স্বচ্ছ উত্তর।",
    "All Questions": "সকল প্রশ্ন",
    "All Questions (8)": "সকল প্রশ্ন (৮)",
    "Process & Timeline": "প্রক্রিয়া ও সময়সীমা",
    "Pricing & Billing": "প্রাইসিং ও বিলিং",
    "Scope & Warranty": "কাজের পরিধি ও ওয়ারেন্টি",
    "Expand All": "সব খুলুন",
    "Collapse All": "সব বন্ধ করুন",
    "Process & Workflow": "প্রক্রিয়া ও কাজের ধাপ",
    "Delivery Methodology": "ডেলিভারি মেথডোলজি",
    "What is RanSovie IT Agency & Technology’s step-by-step project delivery process?":
      "RanSovie IT Agency & Technology-এর প্রজেক্ট ডেলিভারি প্রক্রিয়া কী কী ধাপে সম্পন্ন হয়?",
    "We execute every engagement using a battle-tested 4-phase agile delivery framework engineered for speed, predictability, and high code quality:":
      "আমরা ৪টি কার্যকরী ধাপে অ্যাজাইল ডেলিভারি ফ্রেমওয়ার্কে কাজ করি যা দ্রুত ডেলিভারি ও প্রিমিয়াম কোড কোয়ালিটি নিশ্চিত করে:",
    "1. Discovery & Strategy (Days 1–5)": "১. ডিসকভারি ও স্ট্র্যাটেজি (১–৫ দিন)",
    "2. UI/UX Design & Prototyping (Days 6–15)": "২. ইউআই/ইউএক্স ডিজাইন ও প্রোটোটাইপিং (৬–১৫ দিন)",
    "3. Agile Development & Sprint Reviews (Days 16–45)": "৩. অ্যাজাইল ডেভেলপমেন্ট ও স্প্রিন্ট রিভিউ (১৬–৪৫ দিন)",
    "4. QA, Security Audit & Go-Live (Days 46–50)": "৪. কিউএ, সিকিউরিটি অডিট ও গো-লাইভ (৪৬–৫০ দিন)",
    "Pricing Models": "প্রাইসিং মডেলসমূহ",
    "Transparent Milestones": "স্বচ্ছ মাইলস্টোন",
    "How does RanSovie structure project pricing and payment milestones?":
      "RanSovie কীভাবে প্রজেক্টের প্রাইসিং এবং পেমেন্ট মাইলস্টোন নির্ধারণ করে?",
    "We maintain 100% pricing transparency with zero hidden fees:":
      "আমরা কোনো লুকানো চার্জ ছাড়াই সম্পূর্ণ স্বচ্ছ প্রাইসিং ব্যবস্থা বজায় রাখি:",
    "Scope Protection": "স্কোপ নিরাপত্তা",
    "Post-Launch Guarantee": "লঞ্চ-পরবর্তী ওয়ারেন্টি",
    "What warranty, post-launch support, and SLAs are included with each build?":
      "প্রতিটি প্রজেক্টের সাথে কী ধরণের ওয়ারেন্টি, পোস্ট-লঞ্চ সাপোর্ট ও এসএলএ অন্তর্ভুক্ত থাকে?",
    "Every production project launched by RanSovie includes comprehensive aftercare:":
      "RanSovie দ্বারা নির্মিত প্রতিটি প্রজেক্টের সাথে দীর্ঘমেয়াদী পূর্ণাঙ্গ আফটার-কেয়ার সুবিধা প্রদান করা হয়:",
    "Tech Stack & Architecture": "টেক স্ট্যাক ও আর্কিটেকচার",
    "Modern Standards": "আধুনিক মানদণ্ড",
    "What modern technologies and frameworks does your engineering team specialize in?":
      "আপনাদের ইঞ্জিনিয়ারিং টিম কোন কোন আধুনিক টেকনোলজি ও ফ্রেমওয়ার্কে দক্ষ?",
    "Revisions & Feedback": "সংশোধন ও ফিডব্যাক",
    "Client Collaboration": "ক্লায়েন্ট কোলাবোরেশন",
    "How do you handle revisions, feedback loops, and scope adjustments during development?":
      "ডেভেলপমেন্ট চলাকালীন সংশোধন, ফিডব্যাক এবং স্কোপ অ্যাডজাস্টমেন্ট কীভাবে পরিচালনা করেন?",
    "Payment Gateways": "পেমেন্ট গেটওয়ে",
    "Currency Options": "কারেন্সি অপশনসমূহ",
    "What payment methods and international currencies do you accept?":
      "আপনারা কোন কোন পেমেন্ট মেথড এবং আন্তর্জাতিক মুদ্রা গ্রহণ করেন?",
    "Ownership & IP": "মালিকানা ও আইপি",
    "Source Code Rights": "সোর্স কোড অধিকার",
    "Who owns the custom intellectual property, design assets, and source code?":
      "কাস্টম ইন্টেলেকচুয়াল প্রপার্টি, ডিজাইন অ্যাসেট এবং সোর্স কোডের প্রকৃত মালিক কে হবে?",
    "Ongoing Retainers": "মাসিক রিটেইনার",
    "Long-Term Growth": "দীর্ঘমেয়াদী প্রবৃদ্ধি",
    "Do you provide monthly retainer packages for continuous maintenance and feature scaling?":
      "আপনারা কি নিয়মিত রক্ষণাবেক্ষণ এবং নতুন ফিচার যোগ করার জন্য মাসিক রিটেইনার প্যাকেজ প্রদান করেন?",
    "Still have questions about your specific project?":
      "আপনার নির্দিষ্ট প্রজেক্ট নিয়ে কি কোনো প্রশ্ন আছে?",
    "Our engineering leads and 24/7 RanSovie AI assistant are here to review your roadmap, scope, and technical requirements.":
      "আমাদের ইঞ্জিনিয়ারিং লিড এবং ২৪/৭ RanSovie AI অ্যাসিস্ট্যান্ট আপনার রোডম্যাপ ও রিকোয়ারমেন্ট পর্যালোচনায় প্রস্তুত।",
    "Talk to Our Engineers": "আমাদের ইঞ্জিনিয়ারদের সাথে কথা বলুন",
    "Chat with RanSovie AI": "RanSovie AI-এর সাথে চ্যাট করুন",

    // Pricing Page
    "Simple, Transparent Pricing": "সহজ ও স্বচ্ছ প্রাইসিং",
    "Transparent, Value-Driven Investment Plans": "স্বচ্ছ এবং কার্যকর ইনভেস্টমেন্ট প্ল্যান",
    "Choose the perfect package engineered to scale with your business milestones.":
      "আপনার ব্যবসার মাইলস্টোন অর্জনের জন্য নিখুঁত প্যাকেজ নির্বাচন করুন।",
    "Basic": "বেসিক",
    "Professional": "প্রফেশনাল",
    "Enterprise": "এন্টারপ্রাইজ",
    "For small businesses starting their journey.": "নতুন শুরু করা ছোট ব্যবসার জন্য উপযুক্ত।",
    "For growing brands requiring robust capabilities.": "উচ্চাকাঙ্ক্ষী ও ক্রমবর্ধমান ব্র্যান্ডের জন্য সেরা।",
    "Bespoke digital architecture for large-scale operations.": "বৃহৎ পরিসরে অপারেশনের জন্য কাস্টম ডিজিটাল আর্কিটেকচার।",
    "Custom Web Design": "কাস্টম ওয়েব ডিজাইন",
    "Basic SEO": "বেসিক এসইও অপটিমাইজেশন",
    "1 Month Support": "১ মাসের ফ্রি সাপোর্ট",
    "Most Popular": "সবচেয়ে জনপ্রিয়",
    "Advanced Web App": "অ্যাডভান্সড ওয়েব অ্যাপ্লিকেশন",
    "Comprehensive SEO": "সম্পূর্ণ এসইও অপটিমাইজেশন",
    "API Integrations": "এপিআই ইন্টিগ্রেশন",
    "6 Months Support": "৬ মাসের টেকনিক্যাল সাপোর্ট",
    "Full-Stack Development": "ফুল-স্ট্যাক ডেভেলপমেন্ট",
    "24/7 Dedicated Support": "২৪/৭ ডেডিকেটেড সাপোর্ট",
    "UI/UX Re-design": "ইউআই/ইউএক্স রি-ডিজাইন",
    "Custom": "কাস্টম",
    "Monthly": "মাসিক",
    "Annual (Save 20%)": "বার্ষিক (২০% ছাড়)",

    // CTA Banner
    "READY TO TRANSFORM YOUR": "আপনার ব্যবসাকে ডিজিটাল রূপ",
    "BUSINESS DIGITALLY?": "দিতে সম্পূর্ণ প্রস্তুত?",
    "READY TO TRANSFORM YOUR BUSINESS DIGITALLY?": "আপনার ব্যবসাকে ডিজিটাল রূপ দিতে সম্পূর্ণ প্রস্তুত?",
    "Partner with RanSovie to engineer high-impact digital experiences that drive measurable revenue.":
      "পরিমাপযোগ্য রেভিনিউ তৈরি করতে উচ্চমানের ডিজিটাল অভিজ্ঞতার জন্য RanSovie-কে আপনার বিশ্বস্ত পার্টনার বানান।",
    "Schedule a Consultation": "পরামর্শের জন্য শিডিউল করুন",

    // About Us Page
    "About RanSovie": "RanSovie সম্পর্কে",
    "We are a premium digital agency specializing in crafting bespoke web experiences and engineering robust systems for visionary brands.":
      "আমরা একটি প্রিমিয়াম ডিজিটাল এজেন্সি, যা দূরদর্শী ব্র্যান্ডের জন্য কাস্টম ওয়েব অভিজ্ঞতা এবং মজবুত সিস্টেম তৈরিতে পারদর্শী।",
    "Strategic Design, Advanced Tech & Targeted Growth. We partner with ambitious leaders to build exceptional digital experiences.":
      "স্ট্র্যাটেজিক ডিজাইন, আধুনিক প্রযুক্তি এবং কাঙ্ক্ষিত গ্রোথ। অসাধারণ ডিজিটাল অভিজ্ঞতা তৈরিতে আমরা লিডারদের বিশ্বস্ত পার্টনার।",
    "Strategic Design, Advanced Tech & Targeted Growth. We engineer bespoke digital solutions that transform bold visions into market-leading realities.":
      "আমরা বিশেষ ডিজিটাল সমাধান তৈরি করি যা উচ্চাকাঙ্ক্ষী লক্ষ্যকে বাজারে শীর্ষস্থানে পরিণত করে।",
    "Our Mission": "আমাদের মিশন",
    "Our Vision": "আমাদের ভিশন",
    "Our Values": "আমাদের মূল্যবোধ",
    "Nafis Iqbal": "নাফিস ইকবাল",
    "\"We don't just build websites, we build digital businesses.\"":
      "\"আমরা শুধু ওয়েবসাইট তৈরি করি না, আমরা ডিজিটাল বিজনেস গড়ে তুলি।\"",

    // Contact Page
    "Get In Touch": "যোগাযোগ করুন",
    "Direct Agency Inquiry & Quote": "সরাসরি এজেন্সি ইনকোয়ারি ও কোটেশন",
    "Whether you are seeking custom software engineering, a full brand overhaul, or targeted growth campaigns, our directors respond within 24 hours.":
      "কাস্টম সফটওয়্যার ইঞ্জিনিয়ারিং, সম্পূর্ণ ব্র্যান্ড রি-ডিজাইন বা টার্গেটেড গ্রোথ ক্যাম্পেইনের জন্য যোগাযোগ করুন, আমাদের ডিরেক্টরগণ ২৪ ঘণ্টার মধ্যে সাড়া দেন।",
    "General Contact": "সাধারণ যোগাযোগ",
    "Let's Build Something Exceptional Together": "একসাথে অসাধারণ কিছু তৈরি করি",
    "Send Us a Message": "আমাদের মেসেজ পাঠান",
    "Full Name": "পুরো নাম",
    "Email Address": "ইমেইল অ্যাড্রেস",
    "Phone Number": "ফোন নম্বর",
    "Company Name": "কোম্পানির নাম",
    "Select Service": "সার্ভিস নির্বাচন করুন",
    "Project Budget": "প্রজেক্ট বাজেট",
    "Project Details": "প্রজেক্টের বিবরণ",
    "Tell us about your project, goals, timeline, and requirements...": "আপনার প্রজেক্ট, লক্ষ্য, সময়সীমা এবং রিকোয়ারমেন্ট সম্পর্কে বিস্তারিত লিখুন...",
    "Send Message": "মেসেজ পাঠান",
    "Submit Inquiry": "ইনকোয়ারি জমা দিন",
    "Direct Contact": "সরাসরি যোগাযোগ",
    "Office Location": "অফিস লোকেশন",
    "Business Hours": "কাজের সময়",
    "Monday - Friday: 9am - 6pm": "সোমবার - শুক্রবার: সকাল ৯টা - সন্ধ্যা ৬টা",
    "Message Sent Successfully!": "মেসেজ সফলভাবে পাঠানো হয়েছে!",
    "Thank you! Your submission has been securely registered in our system. A project director will reach out within 24 hours.":
      "ধন্যবাদ! আপনার বার্তাটি আমাদের সিস্টেমে নিরাপদে সংরক্ষিত হয়েছে। একজন প্রজেক্ট ডিরেক্টর ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবেন।",

    // Web Development Page
    "Cutting-Edge Web Development": "অত্যাধুনিক ওয়েব ডেভেলপমেন্ট",
    "Bespoke Full-Stack Web Development": "বেস্পোক ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট",
    "High-Performance Modern Web Engineering": "হাই-পারফরম্যান্স আধুনিক ওয়েব ইঞ্জিনিয়ারিং",
    "We build secure, high-speed, and scalable web applications engineered to convert visitors into loyal clients.":
      "আমরা তৈরি করি দ্রুতগতির, নিরাপদ ও স্কেলেবল ওয়েব অ্যাপ্লিকেশন যা ভিজিটরদের বিশ্বস্ত গ্রাহকে রূপান্তর করে।",
    "Frontend Engineering": "ফ্রন্টএন্ড ইঞ্জিনিয়ারিং",
    "Backend Architecture": "ব্যাকএন্ড আর্কিটেকচার",
    "Database Optimization": "ডাটাবেজ অপটিমাইজেশন",
    "Cloud Deployment": "ক্লাউড ডিপ্লয়মেন্ট",
    "E-Commerce Solutions": "ই-কমার্স সল্যুশনস",
    "RESTful & GraphQL APIs": "রেস্টফুল ও গ্রাফকিউএল এপিআই",

    // Graphic Design Page
    "World-Class Graphic & Brand Design": "বিশ্বমানের গ্রাফিক ও ব্র্যান্ড ডিজাইন",
    "Visual Identities That Demand Attention": "দৃষ্টি আকর্ষণকারী আকর্ষণীয় ভিজ্যুয়াল আইডেন্টিটি",
    "From logo creation and typography systems to full marketing collaterals and UI/UX design.":
      "লোগো তৈরি এবং টাইপোগ্রাফি সিস্টেম থেকে শুরু করে পূর্ণাঙ্গ মার্কেটিং মেটেরিয়াল ও ইউআই/ইউএক্স ডিজাইন।",
    "Brand Identity Design": "ব্র্যান্ড আইডেন্টিটি ডিজাইন",
    "Logo & Monogram Crafting": "লোগো ও মনোগ্রাম তৈরি",
    "Marketing Collaterals": "মার্কেটিং উপাদানসমূহ",
    "Packaging & Print Design": "প্যাকেজিং ও প্রিন্ট ডিজাইন",
    "UI/UX Prototyping": "ইউআই/ইউএক্স প্রোটোটাইপিং",
    "Social Media Creatives": "সোশ্যাল মিডিয়া ক্রিয়েটিভস",

    // Digital Marketing Page
    "Data-Driven Digital Marketing & Growth": "ডেটা-ভিত্তিক ডিজিটাল মার্কেটিং ও গ্রোথ",
    "Accelerate Your Revenue & Market Reach": "আপনার রেভিনিউ ও মার্কেট রিচ দ্রুত বাড়ান",
    "Targeted campaigns, conversion rate optimization, and high-ROI growth strategies.":
      "টার্গেটেড ক্যাম্পেইন, কনভার্সন রেট অপটিমাইজেশন এবং হাই-আরওআই গ্রোথ স্ট্র্যাটেজি।",
    "Search Engine Optimization (SEO)": "সার্চ ইঞ্জিন অপটিমাইজেশন (এসইও)",
    "Pay-Per-Click Advertising (PPC)": "পে-পার-ক্লিক অ্যাডভার্টাইজিং (পিপিসি)",
    "Social Media Marketing (SMM)": "সোশ্যাল মিডিয়া মার্কেটিং (এসএমএম)",
    "Content Strategy & Copywriting": "কনটেন্ট স্ট্র্যাটেজি ও কপিরাইটিং",
    "Conversion Rate Optimization": "কনভার্সন রেট অপটিমাইজেশন",
    "Email Marketing Automation": "ইমেইল মার্কেটিং অটোমেশন",

    // Blog Page
    "Insights & Technology Articles": "ইনসাইটস ও প্রযুক্তি বিষয়ক আর্টিকেল",
    "Latest Insights from RanSovie": "RanSovie থেকে সাম্প্রতিক ইনসাইটস",
    "Read our latest thinking on engineering, brand strategy, design systems, and digital growth.":
      "ইঞ্জিনিয়ারিং, ব্র্যান্ড স্ট্র্যাটেজি, ডিজাইন সিস্টেম এবং ডিজিটাল গ্রোথ নিয়ে আমাদের ভাবনা পড়ুন।",
    "All Articles": "সকল আর্টিকেল",
    "Subscribe to Our Newsletter": "আমাদের নিউজলেটারে সাবস্ক্রাইব করুন",
    "Stay up to date with the latest tech breakthroughs and design insights delivered straight to your inbox.":
      "সরাসরি আপনার ইনবক্সে আধুনিক প্রযুক্তি ও ডিজাইন ইনসাইটস পেতে সাবস্ক্রাইব করুন।",
    "Subscribe": "সাবস্ক্রাইব করুন",
    "By RanSovie Editorial": "RanSovie এডিটোরিয়াল টিম",
    "min read": "মিনিট পড়ার সময়",

    // Footer Links & Legal
    "Site Map": "সাইট ম্যাপ",
    "Useful Links": "প্রয়োজনীয় লিংক",
    "Contact & Social": "যোগাযোগ ও সোশ্যাল",
    "Agency Process FAQ": "এজেন্সি প্রক্রিয়া সংক্রান্ত প্রশ্নোত্তর",
    "Privacy Policy": "প্রাইভেসি পলিসি",
    "Terms of Service": "শর্তাবলী",
    "Explore": "এক্সপ্লোর",
    "Legal": "আইনি নীতিমালা",
    "Subscribe Now": "সাবস্ক্রাইব করুন",
    "Enter your email address": "আপনার ইমেইল অ্যাড্রেস লিখুন",
    "All rights reserved.": "সর্বস্বত্ব সংরক্ষিত।",
    "Strategic Design, Advanced Tech & Targeted Growth. We engineer bespoke digital solutions for bold visions.":
      "স্ট্র্যাটেজিক ডিজাইন, আধুনিক প্রযুক্তি এবং কাঙ্ক্ষিত গ্রোথ। আমরা তৈরি করি আধুনিক ডিজিটাল সমাধান।"
  };

  // Common UI words and terms for token-level matching
  const PHRASE_PAIRS = [
    ["Request a Quote", "কোটেশন নিন"],
    ["Start a Project", "প্রজেক্ট শুরু করুন"],
    ["Explore Services", "সার্ভিসসমূহ দেখুন"],
    ["See Our Work", "আমাদের কাজ দেখুন"],
    ["View All Services", "সকল সার্ভিস দেখুন"],
    ["View Details", "বিস্তারিত দেখুন"],
    ["Choose Plan", "প্ল্যান বেছে নিন"],
    ["Get Started", "শুরু করুন"],
    ["Web Development", "ওয়েব ডেভেলপমেন্ট"],
    ["Graphic Design", "গ্রাফিক ডিজাইন"],
    ["Digital Marketing", "ডিজিটাল মার্কেটিং"],
    ["Brand Identity", "ব্র্যান্ড আইডেন্টিটি"],
    ["UI/UX Design", "ইউআই/ইউএক্স ডিজাইন"],
    ["Completed Projects", "সম্পন্ন প্রজেক্ট"],
    ["Happy Clients", "সন্তুষ্ট ক্লায়েন্ট"],
    ["Years Experience", "বছরের অভিজ্ঞতা"],
    ["Client Retention", "ক্লায়েন্ট ধরে রাখার হার"],
    ["Contact Us", "যোগাযোগ করুন"],
    ["About Us", "আমাদের সম্পর্কে"],
    ["All Rights Reserved", "সর্বস্বত্ব সংরক্ষিত"],
    ["All rights reserved", "সর্বস্বত্ব সংরক্ষিত"],
    ["Send Message", "মেসেজ পাঠান"],
    ["Full Name", "পুরো নাম"],
    ["Email Address", "ইমেইল অ্যাড্রেস"],
    ["Phone Number", "ফোন নম্বর"],
    ["Select Service", "সার্ভিস নির্বাচন করুন"],
    ["Project Budget", "প্রজেক্ট বাজেট"],
    ["Project Details", "প্রজেক্টের বিবরণ"],
    ["Office Location", "অফিস লোকেশন"],
    ["Business Hours", "কাজের সময়"]
  ];

  // Number translation map (0-9 to Bengali digits)
  const EN_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  function toBengaliDigits(str) {
    if (typeof str !== 'string') return str;
    let res = str;
    for (let i = 0; i < 10; i++) {
      res = res.replaceAll(EN_DIGITS[i], BN_DIGITS[i]);
    }
    return res;
  }

  // ==========================================
  // 2. DOM TRANSLATION ENGINE
  // ==========================================
  const IGNORED_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'CODE', 'PRE', 'SVG', 'PATH']);

  function findTranslation(text) {
    if (!text) return null;
    const trimmed = text.trim();
    if (!trimmed) return null;

    // 1. Direct match
    if (DICT[trimmed]) return DICT[trimmed];

    // 2. Normalized whitespace match
    const norm = trimmed.replace(/\s+/g, ' ');
    if (DICT[norm]) return DICT[norm];

    // 3. Match without trailing punctuation
    const stripped = norm.replace(/[.:?→+!]/g, '').trim();
    if (DICT[stripped]) {
      const trans = DICT[stripped];
      if (norm.endsWith(' →')) return trans + ' →';
      if (norm.endsWith('+')) return toBengaliDigits(trans + '+');
      if (norm.endsWith(':')) return trans + ':';
      if (norm.endsWith('?')) return trans + '?';
      return trans;
    }

    // 4. Pure numeric with suffix (e.g. 100+, 98%, 24/7)
    if (/^[0-9]+(\+|%|\/7)?$/.test(trimmed)) {
      return toBengaliDigits(trimmed);
    }

    return null;
  }

  function translateNode(node, lang) {
    if (node.nodeType === Node.TEXT_NODE) {
      const originalContent = node.nodeValue;
      const trimmed = originalContent.trim();

      if (trimmed.length > 0) {
        if (lang === 'BN') {
          if (node._origEn === undefined) {
            node._origEn = originalContent;
          }

          const direct = findTranslation(trimmed);
          if (direct) {
            node.nodeValue = originalContent.replace(trimmed, direct);
          } else {
            // Check for phrase replacements inside longer text
            let modified = trimmed;
            let changed = false;
            for (let i = 0; i < PHRASE_PAIRS.length; i++) {
              const [enPhrase, bnPhrase] = PHRASE_PAIRS[i];
              if (modified.includes(enPhrase)) {
                modified = modified.replaceAll(enPhrase, bnPhrase);
                changed = true;
              }
            }
            if (changed) {
              node.nodeValue = originalContent.replace(trimmed, modified);
            }
          }
        } else {
          // Revert to English
          if (node._origEn !== undefined) {
            node.nodeValue = node._origEn;
          }
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (IGNORED_TAGS.has(node.tagName)) return;
      if (node.classList && (node.classList.contains('notranslate') || node.id === 'albaraqah-chat-container')) return;

      // Handle attributes: placeholder
      if (node.hasAttribute('placeholder')) {
        const ph = node.getAttribute('placeholder');
        if (lang === 'BN') {
          if (node._origPlaceholder === undefined) {
            node._origPlaceholder = ph;
          }
          const translatedPh = findTranslation(ph);
          if (translatedPh) {
            node.setAttribute('placeholder', translatedPh);
          }
        } else {
          if (node._origPlaceholder !== undefined) {
            node.setAttribute('placeholder', node._origPlaceholder);
          }
        }
      }

      // Handle attributes: title
      if (node.hasAttribute('title') && !node.id?.includes('lang-toggle') && !node.id?.includes('theme-toggle')) {
        const t = node.getAttribute('title');
        if (lang === 'BN') {
          if (node._origTitle === undefined) {
            node._origTitle = t;
          }
          const translatedTitle = findTranslation(t);
          if (translatedTitle) {
            node.setAttribute('title', translatedTitle);
          }
        } else {
          if (node._origTitle !== undefined) {
            node.setAttribute('title', node._origTitle);
          }
        }
      }

      // Recursively walk child nodes
      for (let i = 0; i < node.childNodes.length; i++) {
        translateNode(node.childNodes[i], lang);
      }
    }
  }

  function applyLanguage(lang) {
    const targetLang = lang === 'BN' ? 'BN' : 'EN';
    document.documentElement.lang = targetLang === 'BN' ? 'bn' : 'en';

    if (targetLang === 'BN') {
      document.documentElement.classList.add('font-bangla');
    } else {
      document.documentElement.classList.remove('font-bangla');
    }

    // Walk body
    if (document.body) {
      translateNode(document.body, targetLang);
    }

    // Update Language buttons & badges
    syncLanguageUI(targetLang);
  }

  // ==========================================
  // 3. UI BUTTON SYNCHRONIZATION
  // ==========================================
  function syncLanguageUI(lang) {
    const isBn = lang === 'BN';

    // Update badges
    const badgeEn = document.getElementById('lang-badge-en');
    const badgeBn = document.getElementById('lang-badge-bn');
    if (badgeEn && badgeBn) {
      if (isBn) {
        badgeEn.className = 'text-gray-500 dark:text-gray-400 font-medium';
        badgeBn.className = 'text-brandGold font-black';
      } else {
        badgeEn.className = 'text-brandGold font-black';
        badgeBn.className = 'text-gray-500 dark:text-gray-400 font-medium';
      }
    }

    const badgeEnMob = document.getElementById('lang-badge-en-mobile');
    const badgeBnMob = document.getElementById('lang-badge-bn-mobile');
    if (badgeEnMob && badgeBnMob) {
      if (isBn) {
        badgeEnMob.className = 'text-gray-500 dark:text-gray-400 font-medium';
        badgeBnMob.className = 'text-brandGold font-black';
      } else {
        badgeEnMob.className = 'text-brandGold font-black';
        badgeBnMob.className = 'text-gray-500 dark:text-gray-400 font-medium';
      }
    }

    const drawerIndicator = document.getElementById('lang-badge-drawer');
    if (drawerIndicator) {
      drawerIndicator.innerText = isBn ? 'বাংলা (BN)' : 'English (EN)';
    }

    // Tooltips
    const desktopBtn = document.getElementById('lang-toggle');
    if (desktopBtn) {
      desktopBtn.setAttribute('title', isBn ? 'Switch back to English' : 'বাংলা ভাষায় পরিবর্তন করুন (Switch to BN)');
    }

    const mobHeaderBtn = document.getElementById('lang-toggle-mobile-header');
    if (mobHeaderBtn) {
      mobHeaderBtn.setAttribute('title', isBn ? 'Switch back to English' : 'বাংলা ভাষায় পরিবর্তন করুন');
    }
  }

  // ==========================================
  // 4. THEME & INITIALIZATION CONTROLLER
  // ==========================================
  function applyInitialTheme() {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }

  // Run theme immediately to prevent light/dark flash
  applyInitialTheme();

  // Full DOM Initialization
  function initApp() {
    const htmlEl = document.documentElement;
    htmlEl.classList.remove('dark');
    localStorage.theme = 'light';

    // Ensure theme toggle buttons are hidden
    ['theme-toggle', 'theme-toggle-mobile'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });


    // Language Toggle
    function toggleLanguage() {
      const currentLang = localStorage.lang || localStorage.preferred_lang || 'EN';
      const newLang = currentLang === 'EN' ? 'BN' : 'EN';
      localStorage.lang = newLang;
      localStorage.preferred_lang = newLang;

      applyLanguage(newLang);

      // Toast notification feedback
      if (typeof window.showSuccessToast === 'function') {
        window.showSuccessToast({
          title: newLang === 'BN' ? 'ভাষা পরিবর্তিত হয়েছে' : 'Language Switched',
          message: newLang === 'BN' ? 'ওয়েবসাইটের ভাষা সম্পূর্ণ বাংলায় পরিবর্তিত হয়েছে।' : 'Website language switched to English.',
          type: 'general'
        });
      }

      window.dispatchEvent(new CustomEvent('ransovieLangChanged', { detail: { lang: newLang } }));
    }

    // Attach listeners to language buttons (prevent duplicate clicks)
    const langBtns = [
      document.getElementById('lang-toggle'),
      document.getElementById('lang-toggle-mobile'),
      document.getElementById('lang-toggle-mobile-header')
    ].filter(Boolean);

    langBtns.forEach(btn => {
      if (!btn._hasRansovieLangClick) {
        btn._hasRansovieLangClick = true;
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          toggleLanguage();
        });
      }
    });

    // Expose global methods
    window.ransovieToggleLanguage = toggleLanguage;
    window.ransovieApplyLanguage = applyLanguage;

    // Apply saved language on initial page load
    const activeLang = localStorage.lang || localStorage.preferred_lang || 'EN';
    if (activeLang === 'BN') {
      applyLanguage('BN');
    } else {
      syncLanguageUI('EN');
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu && !mobileMenuBtn._hasRansovieMenuClick) {
      mobileMenuBtn._hasRansovieMenuClick = true;
      mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
          mobileMenu.classList.remove('hidden');
          mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
          mobileMenu.classList.add('hidden');
          mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
      });

      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
      });
    }

    // MutationObserver to translate any dynamically injected or opened elements
    const observer = new MutationObserver((mutations) => {
      const curLang = localStorage.lang || 'EN';
      if (curLang === 'BN') {
        mutations.forEach(m => {
          m.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE && !IGNORED_TAGS.has(node.tagName)) {
              translateNode(node, 'BN');
            }
          });
        });
      }
    });

    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }

    // Auto-highlight active nav link based on current path
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath !== '/' && href !== '/' && currentPath.startsWith(href))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
