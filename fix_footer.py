# -*- coding: utf-8 -*-
import re

# Пересоздаем footer-ai-styles.css с правильной UTF-8 кодировкой
css_content = """/* ========================================
   ЕДИНЫЕ СТИЛИ ФУТЕРА ДЛЯ ВСЕХ СТРАНИЦ
   ======================================== */
footer[role="contentinfo"] {
    background-color: #193c6d !important;
    border-top: 2px solid #CAE329 !important;
    color: #000 !important;
    width: 100% !important;
    clear: both !important;
}

footer[role="contentinfo"] .container {
    min-height: 540px !important;
    height: auto !important;
    max-height: none !important;
    padding-top: 10px !important;
    padding-bottom: 70px !important;
    background: linear-gradient(135deg, #003073, #029797) !important;
    background-size: cover !important;
    text-align: center !important;
    margin: 0 auto !important;
    max-width: 100% !important;
    overflow: hidden !important;
}

footer[role="contentinfo"] .aria-label {
    float: none !important;
    text-decoration: none !important;
}

footer[role="contentinfo"] .footer-content {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    flex-wrap: wrap !important;
    padding: 0 15px !important;
    max-width: 1200px !important;
    margin: 0 auto !important;
}

footer[role="contentinfo"] .footer-content section {
    flex: 1 1 250px !important;
    min-width: 220px !important;
    margin: 0 15px !important;
    padding: 0 !important;
    text-align: left !important;
    background: transparent !important;
}

footer[role="contentinfo"] .footer-content h3 {
    color: #000 !important;
    font-size: 20px !important;
    font-weight: 700 !important;
    margin-bottom: 10px !important;
    text-transform: uppercase !important;
}

footer[role="contentinfo"] .footer-content p,
footer[role="contentinfo"] .footer-content span,
footer[role="contentinfo"] .footer-content a {
    color: #000 !important;
    font-size: 16px !important;
    line-height: 1.6 !important;
}

footer[role="contentinfo"] .footer-content a {
    color: #0000FF !important;
    text-decoration: underline !important;
}

footer[role="contentinfo"] .footer-content a:hover,
footer[role="contentinfo"] .aria-label ul li a:hover,
footer[role="contentinfo"] .footer-bottom a:hover {
    color: #4B0082 !important;
}

footer[role="contentinfo"] .footer-bottom {
    border-top: 1px solid rgba(202, 227, 41, 0.3) !important;
    padding: 20px 0 !important;
    text-align: center !important;
}

footer[role="contentinfo"] .footer-bottom p,
footer[role="contentinfo"] .footer-bottom a {
    color: #4B0082 !important;
    font-size: 16px !important;
}

footer[role="contentinfo"] .aria-label ul {
    list-style: none !important;
    padding: 0 !important;
    margin: 0 !important;
}

footer[role="contentinfo"] .aria-label ul li {
    display: inline-block !important;
    margin-right: 20px !important;
}

footer[role="contentinfo"] .footer-services ul {
    list-style: none !important;
    padding-left: 20px !important;
    margin: 0 !important;
}

footer[role="contentinfo"] .footer-services ul li {
    margin-bottom: 8px !important;
    color: #000 !important;
    display: list-item !important;
    position: relative !important;
}

footer[role="contentinfo"] .footer-services ul li::before {
    content: "\\2022" !important;
    color: #000 !important;
    font-weight: bold !important;
    font-size: 1.5em !important;
    display: inline-block !important;
    width: 1em !important;
    margin-left: -1em !important;
    position: absolute !important;
    left: 0 !important;
    line-height: 1 !important;
}

footer[role="contentinfo"] .footer-contact img,
footer[role="contentinfo"] .footer-contact a img {
    width: 24px !important;
    height: 24px !important;
    display: inline-block !important;
    vertical-align: middle !important;
}

@media (max-width: 899px) {
    footer[role="contentinfo"] .footer-content {
        flex-direction: column !important;
        align-items: center !important;
        flex-wrap: nowrap !important;
    }
    footer[role="contentinfo"] .footer-content section {
        margin-bottom: 30px !important;
        text-align: left !important;
        width: 100% !important;
        max-width: 600px !important;
        flex: 0 0 auto !important;
    }
}

@media (max-width: 768px) {
    footer[role="contentinfo"] .container {
        padding: 20px 10px !important;
    }
    footer[role="contentinfo"] .footer-content h3 {
        font-size: 16px !important;
    }
    footer[role="contentinfo"] .footer-content p,
    footer[role="contentinfo"] .footer-bottom p,
    footer[role="contentinfo"] .aria-label ul li a {
        font-size: 14px !important;
    }
}

@media screen and (max-width: 470px) {
    footer[role="contentinfo"] .container {
        padding: 0 20px 70px 20px !important;
    }
}
"""

with open('footer-ai-styles.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

print("CSS file recreated with UTF-8!")

# Обновляем HTML - меняем иконки на существующие и убираем лишние атрибуты
with open('uhod-za-derevyami.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Заменяем иконки на существующие
html = html.replace('img/tg.png', 'img/v-k.png')
html = html.replace('img/Bot.png', 'img/gmail.png')
html = html.replace('img/crona-messenger.png', 'img/crona-logo.png')

with open('uhod-za-derevyami.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Icons updated!")
