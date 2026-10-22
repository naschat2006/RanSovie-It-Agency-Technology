import re

files = {
    'services.html': '''
  <section class="py-32 px-4 sm:px-6 lg:px-8 relative z-10 bg-white dark:bg-brandNavyDark min-h-screen pt-40">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-brandGold font-bold tracking-widest uppercase text-sm mb-3">Our Capabilities</h2>
        <h3 class="text-4xl md:text-5xl font-extrabold mb-6">Comprehensive Services</h3>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">We provide end-to-end digital solutions designed to elevate your brand and drive measurable growth.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Service Card 1 -->
        <div class="bg-gray-50 dark:bg-brandNavyCard p-10 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm relative group overflow-hidden">
          <div class="absolute top-0 left-0 w-1.5 h-full bg-brandGold"></div>
          <div class="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mb-8">
            <i class="fa-solid fa-pen-nib text-brandGold text-3xl"></i>
          </div>
          <h4 class="text-2xl font-bold mb-4">Strategic Design</h4>
          <p class="text-gray-600 dark:text-gray-400">Brand identity, UI/UX design, and creative direction.</p>
        </div>
        <!-- Service Card 2 -->
        <div class="bg-gray-50 dark:bg-brandNavyCard p-10 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm relative group overflow-hidden">
          <div class="absolute top-0 left-0 w-1.5 h-full bg-brandRed"></div>
          <div class="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mb-8">
            <i class="fa-solid fa-code text-brandRed text-3xl"></i>
          </div>
          <h4 class="text-2xl font-bold mb-4">Advanced Tech</h4>
          <p class="text-gray-600 dark:text-gray-400">Full-stack web development, applications, and system architecture.</p>
        </div>
        <!-- Service Card 3 -->
        <div class="bg-gray-50 dark:bg-brandNavyCard p-10 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm relative group overflow-hidden">
          <div class="absolute top-0 left-0 w-1.5 h-full bg-brandGold"></div>
          <div class="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mb-8">
            <i class="fa-solid fa-chart-line text-brandGold text-3xl"></i>
          </div>
          <h4 class="text-2xl font-bold mb-4">Targeted Growth</h4>
          <p class="text-gray-600 dark:text-gray-400">SEO, digital marketing, analytics, and conversion optimization.</p>
        </div>
      </div>
    </div>
  </section>
''',
    'portfolio.html': '''
  <section class="py-32 px-4 sm:px-6 lg:px-8 relative z-10 bg-gray-50 dark:bg-brandNavyDark min-h-screen pt-40">
    <div class="max-w-7xl mx-auto text-center">
      <h2 class="text-brandGold font-bold tracking-widest uppercase text-sm mb-3">Our Work</h2>
      <h3 class="text-4xl md:text-5xl font-extrabold mb-16">Portfolio</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="h-64 bg-gray-200 dark:bg-brandNavyCard rounded-2xl flex items-center justify-center border border-gray-100 dark:border-gray-800">
          <span class="text-gray-500 font-bold">Project Alpha</span>
        </div>
        <div class="h-64 bg-gray-200 dark:bg-brandNavyCard rounded-2xl flex items-center justify-center border border-gray-100 dark:border-gray-800">
          <span class="text-gray-500 font-bold">Project Beta</span>
        </div>
      </div>
    </div>
  </section>
''',
    'about.html': '''
  <section class="py-32 px-4 sm:px-6 lg:px-8 relative z-10 bg-white dark:bg-brandNavyDark min-h-screen pt-40">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-brandGold font-bold tracking-widest uppercase text-sm mb-3">Who We Are</h2>
      <h3 class="text-4xl md:text-5xl font-extrabold mb-6">About RanSovie</h3>
      <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10">We are a premium digital agency specializing in crafting bespoke web experiences and engineering robust systems for visionary brands.</p>
      <div class="p-8 bg-gray-50 dark:bg-brandNavyCard rounded-2xl border border-gray-100 dark:border-gray-800">
        <h4 class="text-2xl font-bold mb-2">Our Founder</h4>
        <p class="text-brandGold font-bold mb-4">Nafis Iqbal</p>
        <p class="italic text-gray-600 dark:text-gray-400">"We don't just build websites, we build digital businesses."</p>
      </div>
    </div>
  </section>
''',
    'blog.html': '''
  <section class="py-32 px-4 sm:px-6 lg:px-8 relative z-10 bg-gray-50 dark:bg-brandNavyDark min-h-screen pt-40">
    <div class="max-w-7xl mx-auto text-center">
      <h2 class="text-brandGold font-bold tracking-widest uppercase text-sm mb-3">Insights & News</h2>
      <h3 class="text-4xl md:text-5xl font-extrabold mb-16">Our Blog</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div class="bg-white dark:bg-brandNavyCard p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
          <p class="text-sm text-brandGold font-bold mb-2">Technology</p>
          <h4 class="text-xl font-bold mb-4">The Future of Web Apps</h4>
          <p class="text-gray-600 dark:text-gray-400">Exploring modern frameworks and high-performance strategies.</p>
        </div>
      </div>
    </div>
  </section>
''',
    'contact.html': '''
  <section class="py-32 px-4 sm:px-6 lg:px-8 relative z-10 bg-white dark:bg-brandNavyDark min-h-screen pt-40">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-brandGold font-bold tracking-widest uppercase text-sm mb-3">Get In Touch</h2>
      <h3 class="text-4xl md:text-5xl font-extrabold mb-10">Contact Us</h3>
      <div class="bg-gray-50 dark:bg-brandNavyCard p-10 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-lg text-left">
        <form class="flex flex-col gap-6">
          <div>
            <label class="block text-sm font-bold mb-2">Name</label>
            <input type="text" class="w-full bg-white dark:bg-brandNavyDark border border-gray-300 dark:border-gray-700 rounded px-4 py-3 focus:outline-none focus:border-brandGold" placeholder="Your Name">
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Email</label>
            <input type="email" class="w-full bg-white dark:bg-brandNavyDark border border-gray-300 dark:border-gray-700 rounded px-4 py-3 focus:outline-none focus:border-brandGold" placeholder="your@email.com">
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Message</label>
            <textarea class="w-full bg-white dark:bg-brandNavyDark border border-gray-300 dark:border-gray-700 rounded px-4 py-3 h-32 focus:outline-none focus:border-brandGold" placeholder="How can we help?"></textarea>
          </div>
          <button class="bg-brandRed hover:bg-red-600 text-white font-bold py-4 rounded transition-colors">Send Message</button>
        </form>
      </div>
    </div>
  </section>
'''
}

for filename, new_content in files.items():
    with open(filename, 'r') as f:
        html = f.read()
    
    # Use regex to find the section between <!-- Hero Section --> and <!-- Interactive Floating Elements -->
    pattern = re.compile(r'<!-- Hero Section -->.*?<!-- Interactive Floating Elements -->', re.DOTALL)
    
    # For titles
    title_pattern = re.compile(r'<title>.*?</title>')
    new_title = f'<title>{filename.replace(".html", "").title()} | RanSovie IT Agency & Technology</title>'
    
    replaced = pattern.sub(f'<!-- Main Content -->\n{new_content}\n  <!-- Interactive Floating Elements -->', html)
    replaced = title_pattern.sub(new_title, replaced)
    
    with open(filename, 'w') as f:
        f.write(replaced)

print("Pages generated successfully.")
