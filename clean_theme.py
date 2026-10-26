import os
import re

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # 1. Clean html tag
    content = re.sub(r'class="dark\s+scroll-smooth"', 'class="scroll-smooth"', content)
    content = re.sub(r'class="scroll-smooth\s+dark"', 'class="scroll-smooth"', content)

    # 2. Update body tag
    content = re.sub(
        r'<body\s+class="[^"]*"',
        '<body class="bg-[#FAF9F6] text-gray-900 transition-colors duration-300 antialiased overflow-x-hidden"',
        content,
        count=1
    )

    # 3. Inject immediate light theme script if not present
    if "localStorage.theme = 'light'" not in content and "</head>" in content:
        theme_script = """  <!-- Immediate Theme Initializer -->
  <script>
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  </script>
</head>"""
        content = content.replace("</head>", theme_script)

    # 4. Strip dark: utility classes so light theme styles render cleanly
    content = re.sub(r'\sdark:[a-zA-Z0-9_-]+(?:/[0-9]+)?', '', content)

    # 5. Remove any leftover theme-toggle buttons
    content = re.sub(r'<button\s+id="theme-toggle".*?</button>', '', content, flags=re.DOTALL)
    content = re.sub(r'<button\s+id="theme-toggle-mobile".*?</button>', '', content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Cleaned {filepath}")

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or '.aistudio' in root:
        continue
    for file in files:
        if file.endswith('.html') or file.endswith('.ejs'):
            clean_file(os.path.join(root, file))
