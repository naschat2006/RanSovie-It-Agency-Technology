const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const oldNav = `        <!-- Desktop Links -->
        <div class="hidden lg:flex items-center space-x-8">
          <a href="#" class="text-brandGold font-bold text-sm border-b-2 border-brandGold pb-1">Home</a>
          <a href="/services.html" class="text-brandNavyDark font-semibold text-sm hover:text-brandGold transition flex items-center gap-1.5">Services <i class="fa-solid fa-chevron-down text-[10px] pt-0.5"></i></a>
          <a href="/portfolio.html" class="text-brandNavyDark font-semibold text-sm hover:text-brandGold transition">Portfolio</a>
          <a href="#" class="text-brandNavyDark font-semibold text-sm hover:text-brandGold transition">Pricing</a>
          <a href="/about.html" class="text-brandNavyDark font-semibold text-sm hover:text-brandGold transition">About Us</a>
          <a href="/contact.html" class="text-brandNavyDark font-semibold text-sm hover:text-brandGold transition">Contact Us</a>
        </div>`;

const newNav = `        <!-- Desktop Links -->
        <div class="hidden lg:flex items-center space-x-8">
          <a href="/index.html" class="text-brandGold font-bold text-sm border-b-2 border-brandGold pb-1">Home</a>
          
          <!-- Services Dropdown -->
          <div class="relative group">
            <a href="/services.html" class="text-brandNavyDark font-semibold text-sm hover:text-brandGold transition flex items-center gap-1.5 py-4">
              Services <i class="fa-solid fa-chevron-down text-[10px]"></i>
            </a>
            <div class="absolute left-0 mt-0 w-56 bg-white border border-gray-100 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              <a href="/web-development.html" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brandGold border-b border-gray-50">Web Development</a>
              <a href="/graphic-design.html" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brandGold border-b border-gray-50">Graphic Design</a>
              <a href="/digital-marketing.html" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brandGold">Digital Marketing</a>
            </div>
          </div>

          <a href="/portfolio.html" class="text-brandNavyDark font-semibold text-sm hover:text-brandGold transition">Portfolio</a>
          <a href="/pricing.html" class="text-brandNavyDark font-semibold text-sm hover:text-brandGold transition">Pricing</a>
          <a href="/about.html" class="text-brandNavyDark font-semibold text-sm hover:text-brandGold transition">About Us</a>
          <a href="/contact.html" class="text-brandNavyDark font-semibold text-sm hover:text-brandGold transition">Contact Us</a>
        </div>`;

html = html.replace(oldNav, newNav);
fs.writeFileSync('index.html', html);
console.log('Nav updated');
