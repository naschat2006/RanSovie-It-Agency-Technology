import os
import re

def update_files():
    # Load the template (index.html)
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract Nav and Footer
    nav = re.search(r'(<!-- Navigation Bar -->.*?<nav id="navbar".*?</nav>)', content, re.DOTALL).group(1)
    footer = re.search(r'(<!-- Comprehensive Footer -->.*?</footer>)', content, re.DOTALL).group(1)
    
    # HTML files to update
    files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for filename in files:
        if filename == 'index.html':
            continue
        
        with open(filename, 'r', encoding='utf-8') as f:
            file_content = f.read()
            
        # Replace nav
        new_content = re.sub(r'<!-- Navigation Bar -->.*?<nav id="navbar".*?</nav>', nav, file_content, flags=re.DOTALL)
        # Replace footer
        new_content = re.sub(r'<!-- Comprehensive Footer -->.*?</footer>', footer, new_content, flags=re.DOTALL)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")

update_files()
