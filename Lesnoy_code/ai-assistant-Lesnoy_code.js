// Универсальный ИИ-ассистент CRONA_AI для всех страниц cronа-spb.com
class AIAssistant {
    constructor() {
        // Временно всегда используем прямой режим для тестирования
        this.isLocalMode = true;
        // Загружаем конфигурацию из config.js (защищен .gitignore)
        this.OPENROUTER_API_KEY = typeof AI_CONFIG !== 'undefined' ? AI_CONFIG.OPENROUTER_API_KEY : '';
        this.MODEL = typeof AI_CONFIG !== 'undefined' ? AI_CONFIG.MODEL : 'anthropic/claude-3.5-haiku';
        this.SITE_URL = window.location.origin;
        this.SITE_NAME = typeof AI_CONFIG !== 'undefined' ? AI_CONFIG.SITE_NAME : 'Crona - Уход за деревьями';
        
        // Универсальный промпт для всех страниц
        this.SYSTEM_PROMPT = `Вы - ИИ-ассистент компании Crona, профессиональной арбористической компании, специализирующейся на уходе за деревьями в Санкт-Петербурге и Ленинградской области.

=== О КОМПАНИИ CRONA ===
Компания Crona - профессионалы в области арбористики и ухода за деревьями в СПб и ЛО
Сайт: https://crona-spb.com
Работаем по всему северо-западному региону

=== КОНТАКТЫ ===
- Телефон: +7 (953) 372-53-87 (основной)
- Телефон: +7 (812) 960-55-20
- Email: E-mail@crona-spb.com

=== ОСНОВНЫЕ УСЛУГИ ===

**Кронирование (частичная обрезка):**
- Санитарная подрезка: удаление сухих, больных, надломленных ветвей
- Формирование кроны: создание правильной формы для долголетия растения
- Поллардинг и топинг: специальные виды обрезки
- Важность правильного времени года и возраста растения

**Стабилизация ветвей и деревьев:**
- Каблинг: канатная система стабилизации (статическая и динамическая)
- Брейсинг: система жестких стяжек, винтовых хомутов, скоб
- Применяется для многоствольных деревьев, опасных углов ветвей

**Профилактика и лечение:**
- Уменьшение антропогенной нагрузки на растения
- Использование фунгицидов весной против грибных заболеваний
- Применение репеллентов для защиты от вредителей
- Улучшение иммунных качеств растений через удобрения

**Удаление деревьев:**
- Безопасное удаление аварийных деревьев
- Такелажные работы до 500кг
- Минимальный заказ: от 12000 рублей

=== ИЗ ДИПЛОМНОЙ РАБОТЫ ===

**Подрезка деревьев:**
- Техника естественной обрезки (Natural Pruning Technique)
- Теория компартментализации гнилей (методика Шиго)

**Инъектирование:**
- Лечение голландской болезни и бактериальной водянки
- Калиевые растворы лишайника Hypogymnia physodes

**Опрыскивание:**
- Березовый деготь: предотвращает заселение короедом, безопасен для людей
- Нематоды: эффективны против короеда, безопасны в городах

**Диагностика:**
- Акустическая дефектоскопия (Arbotom, PicusSonic)
- Радиолокационная диагностика (TreeRadar)
- Визуальная оценка деревьев (VTA)

=== ПРАКТИЧЕСКИЕ РЕЗУЛЬТАТЫ ===
1. Опрыскивание березовым дегтем эффективно против короеда, безопасно для людей
2. Нематоды показывают результаты с уже зараженными деревьями
3. Инъектирование требует дальнейших исследований

Важно:
- Отвечайте на русском языке
- Будьте профессиональны и дружелюбны
- Давайте конкретные рекомендации по уходу за деревьями
- Минимальный заказ от 8000 рублей (удаление от 12000)
- При необходимости предлагайте вызов специалиста`;

        this.isOpen = false;
        this.isVoiceEnabled = true;
        this.isRecording = false;
        this.messages = [];
        this.lastMessageWasVoice = false;
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        
        this.elements = {
            widget: document.getElementById('ai-assistant-widget'),
            toggleBtn: document.getElementById('ai-toggle-btn'),
            chatContainer: document.getElementById('ai-chat-container'),
            closeBtn: document.getElementById('ai-close-btn'),
            messagesContainer: document.getElementById('ai-chat-messages'),
            input: document.getElementById('ai-chat-input'),
            sendBtn: document.getElementById('ai-send-btn'),
            voiceToggle: document.getElementById('ai-voice-toggle'),
            voiceInputBtn: document.getElementById('ai-voice-input-btn'),
            status: document.getElementById('ai-status')
        };

        this.init();
    }

    init() {
        if (!this.elements.widget || !this.elements.toggleBtn) {
            console.error('AI Assistant: Не найдены необходимые DOM элементы');
            return;
        }
        this.addWelcomeMessage();
        this.bindEvents();
        this.checkApiKey();
        this.initSpeechRecognition();
    }

    bindEvents() {
        this.elements.toggleBtn.addEventListener('click', () => this.toggleWidget());
        this.elements.closeBtn.addEventListener('click', () => this.closeWidget());
        this.elements.sendBtn.addEventListener('click', () => this.sendMessage());
        this.elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        this.elements.voiceToggle.addEventListener('click', () => this.toggleVoiceOutput());
        this.elements.voiceInputBtn.addEventListener('click', () => this.toggleVoiceInput());
    }

    toggleWidget() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.elements.chatContainer.classList.add('ai-active');
            this.elements.input.focus();
        } else {
            this.elements.chatContainer.classList.remove('ai-active');
        }
    }

    closeWidget() {
        this.isOpen = false;
        this.elements.chatContainer.classList.remove('ai-active');
    }

    addWelcomeMessage() {
        this.messages.push({
            role: 'assistant',
            content: 'Здравствуйте! Я ИИ-ассистент CRONA_AI от Crona. Готов ответить на вопросы об уходе за растениями в северо-западном регионе. Можете писать или говорить!'
        });
    }

    async sendMessage(userMessage = null) {
        const message = userMessage || this.elements.input.value.trim();
        if (!message) return;
        
        if (!userMessage) {
            this.elements.input.value = '';
        }
        
        this.messages.push({ role: 'user', content: message });
        this.addMessageToUI('user', message);
        this.lastMessageWasVoice = false;
        
        this.showStatus('Думаю...', 0, 'ai-thinking');
        
        try {
            const response = await this.getAIResponse();
            this.hideStatus();
            this.messages.push({ role: 'assistant', content: response });
            this.addMessageToUI('bot', response);

            if (this.isVoiceEnabled && this.lastMessageWasVoice) {
                this.speak(response);
            }

        } catch (error) {
            this.hideStatus();
            console.error('AI Assistant Error:', error);
            console.error('Error details:', error.message);
            console.error('Current mode:', this.isLocalMode ? 'Local (file://)' : 'Server (http://)');
            
            let errorMessage = 'Извините, произошла ошибка. ';
            if (this.isLocalMode) {
                errorMessage += 'Для работы ИИ ассистента запустите локальный сервер через start-server.bat. ';
            } else {
                errorMessage += 'Проверьте консоль браузера (F12) для деталей. ';
            }
            errorMessage += 'Или свяжитесь с нами по телефону: +7 (953) 372-53-87';
            
            this.addMessageToUI('bot', errorMessage);
        }
    }

    addMessageToUI(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-message-${role}`;
        const contentDiv = document.createElement('div');
        contentDiv.className = 'ai-message-content';
        contentDiv.textContent = content;
        messageDiv.appendChild(contentDiv);
        this.elements.messagesContainer.appendChild(messageDiv);
        this.elements.messagesContainer.scrollTop = this.elements.messagesContainer.scrollHeight;
    }

    showStatus(text, duration = 0, className = '') {
        this.elements.status.textContent = text;
        this.elements.status.className = 'ai-status ' + className;
        if (duration > 0) {
            setTimeout(() => this.hideStatus(), duration);
        }
    }

    hideStatus() {
        this.elements.status.textContent = '';
        this.elements.status.className = 'ai-status';
    }

    async getAIResponse() {
        if (this.isLocalMode) {
            return await this.getAIResponseDirect();
        } else {
            return await this.getAIResponseProxy();
        }
    }

    async getAIResponseDirect() {
        // Проверяем, открыт ли файл локально через file://
        if (window.location.protocol === 'file:') {
            // Используем тестовые ответы для демонстрации
            return this.getTestResponse();
        }

        const url = 'https://openrouter.ai/api/v1/chat/completions';
        const body = {
            model: this.MODEL,
            messages: [
                { role: 'system', content: this.SYSTEM_PROMPT },
                ...this.messages.slice(-10)
            ],
            temperature: 0.7,
            max_tokens: 1000
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': this.SITE_URL,
                    'X-Title': 'Crona - Уход за деревьями'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
            
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Ошибка сети или CORS. Попробуйте открыть через localhost.');
            }
            throw error;
        }
    }

    getTestResponse() {
        const userMessage = this.messages[this.messages.length - 1].content.toLowerCase();
        
        // Простые ответы на основе ключевых слов
        if (userMessage.includes('цена') || userMessage.includes('стоимость') || userMessage.includes('сколько')) {
            return 'Стоимость удаления деревьев зависит от сложности работ:\n\n• Минимальная сложность: от 8000₽ до 12000₽\n• Средняя сложность: от 12000₽ до 18000₽\n• Высокая сложность: от 18000₽\n\nМинимальный заказ - 12000₽. Выезд специалиста для оценки - бесплатно!\n\nЗвоните: +7 (953) 372-53-87';
        }
        
        if (userMessage.includes('удаление') || userMessage.includes('спил') || userMessage.includes('срубить')) {
            return 'Мы выполняем безопасное удаление деревьев частями в СПб и ЛО. Это самый безопасный метод, исключающий риски повреждения инфраструктуры.\n\nВ стоимость входит:\n• Распил ствола на части по 35-40см\n• Распил ветвей на части по 1,5м\n• Перенос и складирование в радиусе 50м\n\nМинимальный заказ: 12000₽\nТелефон: +7 (953) 372-53-87';
        }
        
        if (userMessage.includes('контакт') || userMessage.includes('телефон') || userMessage.includes('связаться')) {
            return 'Свяжитесь с нами удобным способом:\n\n📞 Телефоны:\n+7 (953) 372-53-87\n+7 (812) 960-55-20\n\n📧 Email: E-mail@crona-spb.com\n\n💬 Telegram: @cronaSpb\n🤖 Telegram-Bot: @CronaSPb_Bot\n\nРаботаем в СПб и Ленинградской области!';
        }
        
        if (userMessage.includes('привет') || userMessage.includes('здравствуй')) {
            return 'Здравствуйте! Я ИИ-ассистент компании Crona. Мы специализируемся на профессиональном удалении деревьев в СПб и ЛО.\n\nЧем могу помочь? Могу рассказать о:\n• Ценах и услугах\n• Методах удаления\n• Контактах для заказа\n\nЗадайте ваш вопрос!';
        }
        
        // Общий ответ
        return 'Спасибо за ваш вопрос! Компания Crona предоставляет профессиональные услуги по удалению деревьев в СПб и ЛО.\n\nМинимальный заказ: 12000₽\nВыезд специалиста: бесплатно\n\nДля точной оценки стоимости и консультации звоните:\n+7 (953) 372-53-87\n+7 (812) 960-55-20\n\n⚠️ ДЕМО-РЕЖИМ: Сейчас работают тестовые ответы. Для полноценной работы ИИ загрузите страницу на сайт crona-spb.com';
    }

    async getAIResponseProxy() {
        const url = 'api.php';
        const body = {
            model: this.MODEL,
            messages: [
                { role: 'system', content: this.SYSTEM_PROMPT },
                ...this.messages.slice(-10)
            ],
            temperature: 0.7,
            max_tokens: 1000
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Некорректный ответ от API');
        }
        
        return data.choices[0].message.content;
    }

    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            this.elements.voiceInputBtn.style.display = 'none';
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'ru-RU';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;

        this.recognition.onstart = () => {
            this.isRecording = true;
            this.elements.voiceInputBtn.classList.add('ai-recording');
            this.showStatus('Слушаю... Говорите', 0, 'ai-listening');
        };

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.elements.input.value = transcript;
            this.lastMessageWasVoice = true;
            this.sendMessage();
        };

        this.recognition.onerror = (event) => {
            console.error('Speech Recognition Error:', event.error);
            this.stopRecording();
            this.showStatus('Ошибка распознавания. Попробуйте снова.', 3000);
        };

        this.recognition.onend = () => {
            this.stopRecording();
        };
    }

    toggleVoiceInput() {
        if (!this.recognition) {
            this.showStatus('Голосовой ввод не поддерживается', 3000);
            return;
        }

        if (this.isRecording) {
            this.stopRecording();
        } else {
            try {
                this.recognition.start();
            } catch (e) {
                this.showStatus('Не удалось запустить распознавание речи', 3000);
            }
        }
    }

    stopRecording() {
        if (this.recognition && this.isRecording) {
            this.recognition.stop();
        }
        this.isRecording = false;
        this.elements.voiceInputBtn.classList.remove('ai-recording');
        this.hideStatus();
    }

    toggleVoiceOutput() {
        this.isVoiceEnabled = !this.isVoiceEnabled;
        if (this.isVoiceEnabled) {
            this.elements.voiceToggle.classList.add('ai-active');
            this.elements.voiceToggle.title = 'Голосовой режим включен';
            this.showStatus('Голосовой режим включен', 2000);
        } else {
            this.elements.voiceToggle.classList.remove('ai-active');
            this.elements.voiceToggle.title = 'Голосовой режим выключен';
            this.stopSpeaking();
            this.showStatus('Голосовой режим выключен', 2000);
        }
    }

    speak(text) {
        if (!this.synthesis) return;
        this.stopSpeaking();
        const cleanText = text.replace(/[#*_`\[\]\(\)]/g, '').replace(/\s+/g, ' ').trim();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'ru-RU';
        utterance.rate = 1;
        utterance.pitch = 1;
        
        utterance.onstart = () => {
            this.showStatus('Ассистент говорит...', 0, 'ai-speaking');
        };
        
        utterance.onend = () => {
            this.hideStatus();
        };
        
        const voices = this.synthesis.getVoices();
        const russianVoice = voices.find(v => v.lang.startsWith('ru'));
        if (russianVoice) {
            utterance.voice = russianVoice;
        }
        
        this.synthesis.speak(utterance);
    }

    stopSpeaking() {
        if (this.synthesis) {
            this.synthesis.cancel();
        }
    }

    checkApiKey() {
        if (this.isLocalMode && (!this.OPENROUTER_API_KEY || this.OPENROUTER_API_KEY === 'sk-or-v1-YOUR_API_KEY_HERE')) {
            console.warn('AI Assistant: Необходимо указать API ключ OpenRouter');
            this.showStatus('⚠️ API ключ не настроен', 5000);
        }
    }
}

if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}

document.addEventListener('DOMContentLoaded', () => {
    window.aiAssistant = new AIAssistant();
});
