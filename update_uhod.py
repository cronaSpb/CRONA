# -*- coding: utf-8 -*-
import re

with open('uhod-za-derevyami.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Меняем кнопку "Лесной код" на символ <↟/>
content = content.replace(
    '''<a class="button" href="Lesnoy_code/Lesnoy_code.html">
				<div class="house">
					<img src="img/img_71177.png" height="20px">
				</div>
				 <span>Лесной код</span>
			</a>''',
    '''<a class="button forest-code-btn" href="Lesnoy_code/Lesnoy_code.html" title="Лесной код">
				<span>&lt;↟/&gt;</span>
			</a>'''
)

# 2. Восстанавливаем ИИ-ассистента перед скриптами
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

# Вставляем ИИ-ассистента и кнопку наверх перед jquery
content = content.replace(
    '<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>',
    ai_widget + '<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>'
)

# 3. Добавляем скрипты ИИ-ассистента после wow.min.js
content = content.replace(
    '<script src="js/wow.min.js"></script>',
    '<script src="js/wow.min.js"></script>\n\t<script src="config.js"></script>\n\t<script src="ai-assistant-uhod.js?v=1"></script>\n\t<script>\n\t\t$(document).ready(function(){\n\t\t\t$("#scroll-to-top").click(function(){\n\t\t\t\t$("html, body").animate({scrollTop: 0}, 800);\n\t\t\t\treturn false;\n\t\t\t});\n\t\t\t$(window).scroll(function(){\n\t\t\t\tif($(this).scrollTop() > 300){\n\t\t\t\t\t$("#scroll-to-top").addClass("visible");\n\t\t\t\t} else {\n\t\t\t\t\t$("#scroll-to-top").removeClass("visible");\n\t\t\t\t}\n\t\t\t});\n\t\t});\n\t</script>'
)

with open('uhod-za-derevyami.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML updated!")

# 4. Обновляем CSS для кнопки Лесной код и кнопки наверх
with open('uhod-za-derevyami.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Добавляем стили в конец файла
additional_css = """
/* Кнопка Лесной код - только символ по центру */
.forest-code-btn {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 60px !important;
    height: 60px !important;
    padding: 0 !important;
    border-radius: 50% !important;
    font-size: 20px !important;
    font-weight: bold !important;
    line-height: 1 !important;
}

.forest-code-btn span {
    margin: 0 !important;
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

/* Кнопка скролла наверх */
.scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: red;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    z-index: 9998;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.scroll-to-top:hover {
    background: #cc0000;
    transform: scale(1.1);
}
"""

css += additional_css

with open('uhod-za-derevyami.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS updated!")
