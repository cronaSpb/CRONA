# -*- coding: utf-8 -*-
import re
import os

pages = [
    'cronirovanie.html',
    'stabilizatsia-vetvey-derevev.html',
    'uhod-lechenie-derevev.html'
]

footer_template = '''<footer role="contentinfo">
		<div class="container">
			<div class="footer-content">
				<section class="footer-about">
					<h3>О компании</h3>
					<p>Crona — команда профессиональных арбористов. С 2014 года выполняем работы по уходу, лечению и удалению деревьев в Санкт-Петербурге и Ленинградской области.</p>
					<p><strong>Лицензия и СРО:</strong> допуски для работ на высоте и с сложными растениями.</p>
				</section>
				<section class="footer-services">
					<h3>Услуги</h3>
					<ul>
						<li><a href="cronirovanie.html">Кронирование деревьев</a></li>
						<li><a href="uhod-lechenie-derevev.html">Лечение деревьев</a></li>
						<li><a href="stabilizatsia-vetvey-derevev.html">Стабилизация ветвей</a></li>
						<li><a href="udalenie-derevev.html">Удаление деревьев</a></li>
					</ul>
				</section>
				<section class="footer-contact">
					<h3>Контакты</h3>
					<p><strong>Телефон:</strong><br><a href="tel:+79533725387">+7 (953) 372-53-87</a><br><a href="tel:+78129605520">+7 (812) 960-55-20</a></p>
					<p><strong>Email:</strong><br><a href="mailto:E-mail@crona-spb.com">E-mail@crona-spb.com</a><br><br><strong>Telegram:</strong><br><a href="https://t.me/cronaSpb" target="_blank" rel="noopener noreferrer" style="margin-left: 10px; display: inline-flex; align-items: center; gap: 5px;"><img src="img/tg.png" alt="Telegram" style="width: 24px; height: 24px;"><span>@cronaSpb</span></a><a href="https://t.me/CronaSPb_Bot" target="_blank" rel="noopener noreferrer" style="margin-left: 10px; display: inline-flex; align-items: center; gap: 5px;"><img src="img/Bot.png" alt="Telegram Bot" style="width: 24px; height: 24px;"><span>@CronaSPb_Bot</span></a><br><br><strong>Мессенджер CRONA:</strong><br><a href="https://crona.online" target="_blank" rel="noopener noreferrer" style="margin-left: 10px; display: inline-flex; align-items: center; gap: 5px;"><img src="img/crona-messenger.png" alt="CRONA Messenger" style="width: 24px; height: 24px; filter: brightness(0);"><span>https://crona.online</span></a></p>
				</section>
				<section class="footer-region">
					<h3>Регион работы</h3>
					<p>Северо-западный регион СПб и ЛО</p>
					<p>Работаем со всеми видами растений, характерными для таёжной зоны</p>
				</section>
			</div>
			<div class="footer-bottom">
				<p>&copy; 2014-2026 Crona. Все права защищены. Услуги по уходу за деревьями в северо-западном регионе.</p>
				<nav class="aria-label" aria-label="Нижняя навигация">
					<ul>
						<li><a href="index.html">Главная</a></li>
						<li><a href="uhod-za-derevyami.html">Уход за деревьями</a></li>
						<li><a href="cronirovanie.html">Кронирование</a></li>
						<li><a href="stabilizatsia-vetvey-derevev.html">Стабилизация ветвей</a></li>
						<li><a href="uhod-lechenie-derevev.html">Лечение деревьев</a></li>
					</ul>
				</nav>
			</div>
		</div>
	</footer>'''

ai_widget = '''	<div id="ai-assistant-widget" class="ai-widget">
		<div class="ai-widget-button" id="ai-toggle-btn"><span class="ai-icon">🤖</span></div>
		<div class="ai-chat-container" id="ai-chat-container">
			<div class="ai-chat-header"><span class="ai-title">CRONA_AI Ассистент</span><div class="ai-header-controls"><button class="ai-voice-toggle" id="ai-voice-toggle" title="Голосовой режим">🎤</button><button class="ai-close-btn" id="ai-close-btn">&times;</button></div></div>
			<div class="ai-chat-messages" id="ai-chat-messages"><div class="ai-message ai-message-bot"><div class="ai-message-content">Здравствуйте! Я ИИ-ассистент CRONA_AI от Crona. Готов ответить на вопросы об уходе за деревьями. Можете писать или говорить!</div></div></div>
			<div class="ai-chat-input-area"><div class="ai-input-wrapper"><input type="text" id="ai-chat-input" class="ai-chat-input" placeholder="Введите сообщение..." autocomplete="off"><button class="ai-voice-input-btn" id="ai-voice-input-btn" title="Голосовой ввод">🎤</button></div><button class="ai-send-btn" id="ai-send-btn">➤</button></div>
			<div class="ai-status" id="ai-status"></div>
		</div>
	</div>

	<div id="scroll-to-top" class="scroll-to-top" title="Наверх">↑</div>

'''

scroll_script = '''
	<script src="config.js"></script>
	<script src="ai-assistant-uhod.js?v=1"></script>
	<script>
		$(document).ready(function(){
			$("#scroll-to-top").click(function(){
				$("html, body").animate({scrollTop: 0}, 800);
				return false;
			});
			$(window).scroll(function(){
				if($(this).scrollTop() > 300){
					$("#scroll-to-top").addClass("visible");
				} else {
					$("#scroll-to-top").removeClass("visible");
				}
			});
		});
	</script>'''

for page in pages:
    if not os.path.exists(page):
        print(f"File {page} not found, skipping.")
        continue

    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add footer-ai-styles.css if not present
    if 'footer-ai-styles.css' not in content:
        content = content.replace(
            '<link rel="stylesheet" type="text/css" href="' + page.replace('.html', '.css') + '">',
            '<link rel="stylesheet" type="text/css" href="' + page.replace('.html', '.css') + '">\n\t<link rel="stylesheet" href="footer-ai-styles.css">'
        )

    # 2. Replace old footer with new footer
    # Find footer block
    footer_match = re.search(r'<footer[^>]*>.*?</footer>', content, re.DOTALL | re.IGNORECASE)
    if footer_match:
        content = content[:footer_match.start()] + footer_template + content[footer_match.end():]
        print(f"Footer replaced in {page}")
    else:
        print(f"Footer not found in {page}")

    # 3. Add AI widget and scroll-to-top before jquery
    if 'ai-assistant-widget' not in content:
        content = content.replace(
            '<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>',
            ai_widget + '<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>'
        )
        print(f"AI widget added in {page}")
    else:
        print(f"AI widget already present in {page}")

    # 4. Add AI scripts and scroll script after wow.min.js
    if 'ai-assistant-uhod.js' not in content:
        content = content.replace(
            '<script src="js/wow.min.js"></script>',
            '<script src="js/wow.min.js"></script>' + scroll_script
        )
        print(f"AI scripts added in {page}")
    else:
        print(f"AI scripts already present in {page}")

    with open(page, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done updating pages!")
