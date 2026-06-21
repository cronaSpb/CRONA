# -*- coding: utf-8 -*-
import re

pages = [
    'cronirovanie.html',
    'stabilizatsia-vetvey-derevev.html',
    'uhod-lechenie-derevev.html',
    'uhod-za-derevyami.html'
]

for page in pages:
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove old scroll-to-top handlers (including variations)
    pattern = r'\t<script>\n\t\t\$\(document\)\.ready\(function\(\)\{\n\t\t\t\$\("#scroll-to-top"\)\.click\(function\(\)\{[^}]+\}\);\n\t\t\t\$\(window\)\.scroll\(function\(\)\{[^}]+\}\);\n\t\t\}\);\n\t</script>\n'
    content = re.sub(pattern, '', content)

    # Also remove without trailing newline
    pattern2 = r'\t<script>\n\t\t\$\(document\)\.ready\(function\(\)\{\n\t\t\t\$\("#scroll-to-top"\)\.click\(function\(\)\{[^}]+\}\);\n\t\t\t\$\(window\)\.scroll\(function\(\)\{[^}]+\}\);\n\t\t\}\);\n\t</script>'
    content = re.sub(pattern2, '', content)

    with open(page, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Cleaned {page}")
