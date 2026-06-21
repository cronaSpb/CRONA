# -*- coding: utf-8 -*-
import re

# Читаем файл с UTF-8
with open('uhod-za-derevyami.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Новый футер
new_footer = '''	<footer role="contentinfo">
		<div class="container">
			<div class="footer-content">
				<section class="footer-about">
					<h3>О компании Crona</h3>
					<p>Профессиональные услуги по уходу за деревьями в Санкт-Петербурге и Ленинградской области. Обрезка, лечение, удаление деревьев. Работы производятся опытными арбористами.</p>
				</section>
				<section class="footer-services">
					<h3>Наши услуги</h3>
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
						<li><a href="https://crona-spb.com/">Политика конфиденциальности</a></li>
						<li><a href="https://crona-spb.com/">Условия использования</a></li>
						<li><a href="https://crona-spb.com/">Карта сайта</a></li>
					</ul>
				</nav>
			</div>
		</div>
	</footer>

	<div id="ai-assistant-widget" class="ai-widget">
		<div class="ai-widget-button" id="ai-toggle-btn"><span class="ai-icon">🤖</span></div>
		<div class="ai-chat-container" id="ai-chat-container">
			<div class="ai-chat-header"><span class="ai-title">CRONA_AI Ассистент</span><div class="ai-header-controls"><button class="ai-voice-toggle" id="ai-voice-toggle" title="Голосовой режим">🎤</button><button class="ai-close-btn" id="ai-close-btn">&times;</button></div></div>
			<div class="ai-chat-messages" id="ai-chat-messages"><div class="ai-message ai-message-bot"><div class="ai-message-content">Здравствуйте! Я ИИ-ассистент CRONA_AI от Crona. Готов ответить на вопросы об уходе за деревьями. Можете писать или говорить!</div></div></div>
			<div class="ai-chat-input-area"><div class="ai-input-wrapper"><input type="text" id="ai-chat-input" class="ai-chat-input" placeholder="Введите сообщение..." autocomplete="off"><button class="ai-voice-input-btn" id="ai-voice-input-btn" title="Голосовой ввод">🎤</button></div><button class="ai-send-btn" id="ai-send-btn">➤</button></div>
			<div class="ai-status" id="ai-status"></div>
		</div>
	</div>

	<script src="config.js"></script>
	<script src="ai-assistant-uhod.js?v=1"></script>'''

# Заменяем футер (ищем от <footer> до </footer>)
content = re.sub(r'\t<footer>.*?</footer>', new_footer, content, flags=re.DOTALL)

# Сохраняем с UTF-8
with open('uhod-za-derevyami.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Footer replaced successfully with UTF-8 encoding!")
