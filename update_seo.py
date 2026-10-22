import os
import re

seo_data = {
    'index.html': {'title': 'RanSovie IT Agency & Technology | Strategic Design & Tech', 'desc': 'RanSovie IT Agency & Technology - Strategic Design, Advanced Tech & Targeted Growth. Bespoke digital solutions for visionary brands.'},
    'about.html': {'title': 'About Us | RanSovie IT Agency & Technology', 'desc': 'Learn about RanSovie IT Agency & Technology. We are a premier digital agency specializing in strategic design, advanced tech, and targeted business growth.'},
    'services.html': {'title': 'Our Services | RanSovie IT Agency & Technology', 'desc': 'Explore our professional services including Web Development, Graphic Design, and Digital Marketing to grow your business effectively.'},
    'web-development.html': {'title': 'Web Development Services | RanSovie', 'desc': 'Custom web development services: robust apps, innovative systems, and responsive websites for modern businesses.'},
    'graphic-design.html': {'title': 'Graphic Design & Branding | RanSovie', 'desc': 'Professional graphic design, brand identity, and UI/UX design services to elevate your brand presence.'},
    'digital-marketing.html': {'title': 'Digital Marketing & SEO | RanSovie', 'desc': 'Drive growth with expert digital marketing, SEO, and targeted ad campaigns.'},
    'portfolio.html': {'title': 'Our Portfolio | RanSovie IT Agency & Technology', 'desc': 'Explore our success stories: web and app development, branding, and growth marketing case studies.'},
    'pricing.html': {'title': 'Pricing & Engagement | RanSovie', 'desc': 'Transparent pricing and engagement models for business web portals, SaaS, and custom projects.'},
    'contact.html': {'title': 'Contact Us | RanSovie IT Agency & Technology', 'desc': 'Get in touch with RanSovie IT Agency to discuss your digital transformation project.'},
    'blog.html': {'title': 'Tech Insights Blog | RanSovie', 'desc': 'Latest insights in strategy, technology, design, and business growth from RanSovie.'}
}

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
            
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")

update_seo()
