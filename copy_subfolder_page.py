import re

with open('udalenie-derevev/udalenie-derevev.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Order matters: prefix known subfolder paths first, then generic img/js prefixes.

# CSS
html = html.replace('href="udalenie-derevev.css', 'href="udalenie-derevev/udalenie-derevev.css')

# JS
html = html.replace('src="udalenie-derevev.js', 'src="udalenie-derevev/udalenie-derevev.js')
html = html.replace('src="config.js', 'src="udalenie-derevev/config.js')
html = html.replace('src="ai-assistant-udalenie.js', 'src="udalenie-derevev/ai-assistant-udalenie.js')

# Libraries and assets inside the subfolder
html = html.replace('src="js/', 'src="udalenie-derevev/js/')
html = html.replace('src="jquery-validation-1.19.1/', 'src="udalenie-derevev/jquery-validation-1.19.1/')
html = html.replace('src="Magnific-Popup.js"', 'src="udalenie-derevev/Magnific-Popup.js"')
html = html.replace('src="Magnific-Popup-master/', 'src="udalenie-derevev/Magnific-Popup-master/')

# Images (subfolder-specific)
html = html.replace('src="img/', 'src="udalenie-derevev/img/')
html = html.replace('href="img/', 'href="udalenie-derevev/img/')

# Favicon is absolute, keep. scc/ stays root-level.

with open('udalenie-derevev.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('done')
