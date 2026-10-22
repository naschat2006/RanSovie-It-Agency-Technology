import os
import re

seo_data = {
    'index.html': {'title': 'RanSovie | Premier IT Agency & Software Development', 'desc': 'RanSovie is a leading IT agency providing bespoke software development, web solutions, and strategic digital growth for visionary brands.'},
    'about.html': {'title': 'About RanSovie | Our Mission & IT Agency Values', 'desc': 'Learn about RanSovie IT Agency. We are committed to strategic design, advanced tech, and driving targeted business growth.'},
    'services.html': {'title': 'Services | RanSovie IT Agency Solutions', 'desc': 'Explore our professional services including Web Development, Graphic Design, and Digital Marketing at RanSovie IT Agency.'},
    'web-development.html': {'title': 'Custom Web Development Services | RanSovie IT Agency', 'desc': 'RanSovie provides custom web development services: robust apps, innovative systems, and responsive websites.'},
    'graphic-design.html': {'title': 'Graphic Design & Brand Identity | RanSovie IT Agency', 'desc': 'Elevate your brand with professional graphic design, branding, and UI/UX services from RanSovie IT Agency.'},
    'digital-marketing.html': {'title': 'Digital Marketing & Growth SEO | RanSovie IT Agency', 'desc': 'Drive growth with expert digital marketing, SEO, and targeted ad campaigns by RanSovie IT Agency.'},
    'portfolio.html': {'title': 'Our Success Stories | RanSovie IT Agency Portfolio', 'desc': 'Explore successful projects: web and app development, branding, and growth marketing case studies by RanSovie.'},
    'pricing.html': {'title': 'Transparent Pricing | RanSovie IT Agency', 'desc': 'Transparent pricing and engagement models for business web portals, SaaS, and custom projects at RanSovie.'},
    'contact.html': {'title': 'Contact RanSovie IT Agency | Start Your Project', 'desc': 'Get in touch with RanSovie IT Agency to discuss your digital transformation and software project.'},
    'blog.html': {'title': 'Tech Insights Blog | RanSovie IT Agency', 'desc': 'Latest insights in strategy, technology, design, and business growth from RanSovie IT Agency.'}
}

json_ld = """
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "RanSovie",
    "description": "RanSovie is a professional IT agency specializing in software development, web solutions, and digital transformation.",
    "url": "https://ransovie.com",
    "image": "https://ransovie.com/images/ransovie-logo.svg",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BD"
    }
  }
  </script>
"""

def update_seo():
    files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for filename in files:
        if filename not in seo_data:
            continue
            
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        data = seo_data[filename]
        
        # Add/Replace Title
        content = re.sub(r'<title>.*?</title>', f'<title>{data["title"]}</title>', content, flags=re.IGNORECASE | re.DOTALL)
        
        # Add/Replace Meta Description
        if '<meta name="description"' in content:
            content = re.sub(r'<meta name="description" content=".*?" />', f'<meta name="description" content="{data["desc"]}" />', content, flags=re.IGNORECASE | re.DOTALL)
        else:
            content = content.replace('<head>', f'<head>\n  <meta name="description" content="{data["desc"]}" />')
            
        # Add/Replace OG Tags
        og_tags = f"""
  <!-- Open Graph / Social -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://ransovie.com/{filename}" />
  <meta property="og:title" content="{data["title"]}" />
  <meta property="og:description" content="{data["desc"]}" />
  <meta property="og:image" content="https://ransovie.com/images/ransovie-logo.svg" />
"""
        # Remove old OG tags if exist
        content = re.sub(r'<!-- Open Graph / Social -->.*?<meta property="og:image".*?/>', og_tags, content, flags=re.IGNORECASE | re.DOTALL)
        
        # If not replaced, inject them
        if '<!-- Open Graph / Social -->' not in content:
            content = content.replace('<head>', f'<head>{og_tags}')
        
        # Add Favicon if missing
        if '<link rel="icon"' not in content:
            content = content.replace('</head>', '  <link rel="icon" type="image/png" href="/01.png">\n</head>')
        
        # Add JSON-LD if missing
        if 'application/ld+json' not in content:
             content = content.replace('</head>', f'{json_ld}\n</head>')
            
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")

update_seo()
