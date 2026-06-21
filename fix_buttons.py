# -*- coding: utf-8 -*-
import re
import os

pages = [
    'uhod-za-derevyami.html',
    'cronirovanie.html',
    'stabilizatsia-vetvey-derevev.html',
    'uhod-lechenie-derevev.html'
]

# 1. Replace scroll-to-top div with button like in Lesnoy_code
for page in pages:
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove old scroll-to-top div and its script handlers if any
    content = re.sub(
        r'<div id="scroll-to-top" class="scroll-to-top" title="Наверх">↑</div>\n',
        '',
        content
    )

    # Add new toTop button before jquery
    if 'id="toTop"' not in content:
        content = content.replace(
            '<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>',
            '<button onclick="topFunction()" id="toTop" title="Вверх"><img src="img/200.png" width="40px"></button>\n\n<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>'
        )

    # Remove old scroll-to-top script handlers in jquery ready
    content = re.sub(
        r'\t<script>\n\t\t\$\(document\)\.ready\(function\(\)\{\n\t\t\t\$\("#scroll-to-top"\)\.click\(function\(\)\{[^}]+\}\);\n\t\t\t\$\(window\)\.scroll\(function\(\)\{[^}]+\}\);\n\t\t\}\);\n\t</script>\n',
        '',
        content
    )
    content = re.sub(
        r'\t<script>\n\t\t\$\(document\)\.ready\(function\(\)\{\n\t\t\t\$\("#scroll-to-top"\)\.click\(function\(\)\{[^}]+\}\);\n\t\t\t\$\(window\)\.scroll\(function\(\)\{[^}]+\}\);\n\t\t\}\);\n\t</script>',
        '',
        content
    )

    # Add toTop script and styles if not present
    if 'function topFunction()' not in content:
        top_script = '''
	<style>
		#toTop {
			display: none;
			position: fixed;
			bottom: 18px;
			right: 18px;
			z-index: 1000;
			border: none;
			outline: none;
			background: none;
			cursor: pointer;
			padding: 0;
		}
		#toTop img {
			width: 40px;
			height: auto;
		}
	</style>
	<script>
		window.onscroll = function() { scrollFunction(); };
		function scrollFunction() {
			let t = document.getElementById("toTop");
			if (document.body.scrollTop > 480 || document.documentElement.scrollTop > 480) {
				t.style.display = "block";
			} else {
				t.style.display = "none";
			}
		}
		function topFunction() {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		}
	</script>'''

        # Add before closing </body>
        content = content.replace('</body>', top_script + '\n</body>')

    with open(page, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Updated {page}")

# 2. Fix .button CSS in uhod-za-derevyami.css
with open('uhod-za-derevyami.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove forest-code-btn rules
if '.forest-code-btn' in css:
    css = re.sub(r'\.forest-code-btn\s*\{[^}]+\}\n', '', css)
    css = re.sub(r'\.forest-code-btn\s*span\s*\{[^}]+\}\n', '', css)

# Update .button to center content
old_button = '''.button {
	font-family: SANS-SERIF;
	color: #fff;
	border-radius: 1px;
	display: block;
	width: 240px;
	padding: 20px 0;
	margin: 0 auto;
	text-decoration: none;
	text-align: center;
	text-transform: none;
	font-weight: bold;
	font-size: 18px;
	margin-top: 50px;
	border: 1px solid #CAE329;
	box-shadow: 3px 3px 7px #000;
	-moz-transition: all 0.2s 0.02s ease;
	-o-transition: all 0.2s 0.02s ease;
	-webkit-transition: all 0.2s 0.02s ease;
}'''

new_button = '''.button {
	font-family: SANS-SERIF;
	color: #fff;
	border-radius: 1px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 240px;
	padding: 20px 0;
	margin: 0 auto;
	text-decoration: none;
	text-align: center;
	text-transform: none;
	font-weight: bold;
	font-size: 18px;
	margin-top: 50px;
	border: 1px solid #CAE329;
	box-shadow: 3px 3px 7px #000;
	-moz-transition: all 0.2s 0.02s ease;
	-o-transition: all 0.2s 0.02s ease;
	-webkit-transition: all 0.2s 0.02s ease;
}'''

if old_button in css:
    css = css.replace(old_button, new_button)
else:
    print("Warning: .button block not found in CSS")

# Remove old .scroll-to-top rules if present
if '.scroll-to-top' in css:
    css = re.sub(r'\.scroll-to-top\s*\{[^}]+\}\n', '', css)
    css = re.sub(r'\.scroll-to-top\.visible\s*\{[^}]+\}\n', '', css)
    css = re.sub(r'\.scroll-to-top:hover\s*\{[^}]+\}\n', '', css)

with open('uhod-za-derevyami.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS updated!")
