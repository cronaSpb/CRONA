/**
 * ИИ-Ассистент Bio+ от Crona
 * Поддерживает текстовый и голосовой ввод/вывод
 * Интеграция с OpenRouter API
 */

class AIAssistant {
    constructor() {
        // === НАСТРОЙКИ ===
        // Определяем режим работы: локально (file://) или через сервер
        this.isLocalMode = window.location.protocol === 'file:' || window.location.hostname === 'localhost';
        
        // API ключ используется только в локальном режиме (file://)
        // В серверном режиме ключ хранится в api.php
        this.OPENROUTER_API_KEY = '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';
        
        // Настройки модели OpenRouter
        this.MODEL = 'anthropic/claude-3.5-haiku';
        this.SITE_URL = window.location.origin;
        this.SITE_NAME = 'Лесной код от Crona';
        
        // Системный промпт для ассистента
        this.SYSTEM_PROMPT = `Вы - ИИ-ассистент компании CRONA_AI от Crona, специализирующейся на уходе за деревьями и формировании лесной растительности в северо-западном регионе России (Санкт-Петербург и Ленинградская область).

=== ВАША РОЛЬ ===
- Отвечать на вопросы об уходе за растениями
- Консультировать по услугам: кронирование, посадка, пересадка, рекультивация
- Давать рекомендации по уходу за древесными растениями в условиях северо-западного региона
- Помогать оформлять заявки на услуги

=== КОНТАКТЫ КОМПАНИИ ===
- Телефон: +7 (953) 372-53-87, +7 (978) 786-17-92
- Email: E-mail@crona-spb.com
- Telegram: @cronaSpb
- Telegram Bot: @CronaSPb_Bot

=== УСЛУГИ ===
- Кронирование и обрезка деревьев
- Посадка и пересадка растений
- Рекультивация нарушенных земель
- Уход за древесными растениями
- Инъектирование деревьев
- Опрыскивание биопрепаратами
- Антисептирование срезов и дупел
- Каблинг и брейсинг (поддержка деревьев)
- Удаление деревьев:
- Безопасное удаление аварийных деревьев
- Такелажные работы до 500кг
- Минимальный заказ: от 8000 рублей
- Для оценки нужны: порода, диаметр, свободное пространство вокруг дерева
- Работаем по всему северо-западному региону

=== ОСОБЕННОСТИ СЕВЕРО-ЗАПАДНОГО РЕГИОНА ===
- Климатические условия таёжной зоны
- Специфика почв и температурного режима
- Биологическое разнообразие региона
- Сезонные особенности ухода
- Городские условия Санкт-Петербурга и ЛО

=== ТЕХНОЛОГИИ И МЕТОДЫ (из дипломной работы) ===

**Подрезка деревьев:**
- Санитарная подрезка: удаление больных, поврежденных ветвей
- Формовочная подрезка: создание правильной формы кроны
- Структурная подрезка: улучшение структуры кроны
- Техника естественной обрезки (Natural Pruning Technique)
- Теория компартментализации гнилей (методика Шиго)

**Инъектирование:**
- Внутристволовые инъекции для лечения болезней
- Лечение голландской болезни и бактериальной водянки
- Калиевые растворы лишайника Hypogymnia physodes
- Борьба с короедом-типографом
- Требует дальнейшей проработки методики

**Опрыскивание:**
- Березовый деготь: предотвращает заселение короедом, безопасен для людей, доказанная эффективность
- Нематоды: эффективны против короеда, безопасны в городах, работают с уже зараженными деревьями
- Биопрепараты и репелленты
- Подходит для городских и сельских поселениях

**Антисептирование и лечение ран:**
- Антисептирование срезов и повреждений
- Зачистка и пломбировка дупел
- Замазка раневых полостей
- Защита от гнилей и инфекций

**Поддержка деревьев:**
- Каблинг: динамическая система стабилизации ветвей
- Брейсинг: металлические стяжки для трещин в стволе
- Система Cobra: динамическое и статическое предохранение от изломов
- Сохранение исторических и ценных деревьев

=== НАУЧНЫЕ ЗНАНИЯ И ОСНОВЫ ===

**История развития:**
- Арбористика (от лат. arbor – дерево) – отдельная отрасль растениеводства
- Развитие методов с древних времен (Шумер, Египет, Леонардо да Винчи)
- Современные методы: теория Шиго, приборы (Шигометр, Резистограф)
- Визуальная оценка деревьев (VTA – Visual Tree Assessment)

**Проблемы городских деревьев:**
- Болезни: голландская болезнь, бактериальная водянка, гнили
- Вредители: короед-типограф, нематоды
- Антропогенная нагрузка: загрязнение, ограниченное пространство
- Аварийные деревья: ветровал, бурелом, неправильный уход

**Диагностика:**
- Акустическая дефектоскопия (Arbotom, PicusSonic)
- Радиолокационная диагностика (TreeRadar)
- Визуальная оценка по архитектуре дерева
- Измерение электрического сопротивления

=== ПРАКТИЧЕСКИЕ РЕЗУЛЬТАТЫ ИССЛЕДОВАНИЙ ===
1. Опрыскивание березовым дегтем эффективно против короеда, безопасно для людей
2. Нематоды показывают результаты с уже зараженными деревьями
3. Инъектирование требует дальнейших исследований для короеда
4. Инъектирование требует доработки для лечения голландской болезни

Важно:
- Отвечайте на русском языке
- Будьте профессиональны и дружелюбны
- Минимальный заказ от 8000 рублей
- Работаем по всему северо-западному региону
- Используйте современные научные методы ухода
- Приоритет безопасности людей и окружающей среды
- Если не знаете ответ - предложите связаться с менеджером по телефону`;

        // === СОСТОЯНИЕ ===
        this.isOpen = false;
        this.isVoiceEnabled = true;
        this.isRecording = false;
        this.messages = [];
        this.lastMessageWasVoice = false; // Отслеживаем тип последнего сообщения
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        
        // === DOM элементы ===
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

    checkApiKey() {
        // В локальном режиме проверяем наличие ключа
        if (this.isLocalMode && (!this.OPENROUTER_API_KEY || this.OPENROUTER_API_KEY === 'sk-or-v1-YOUR_API_KEY_HERE')) {
            console.warn('AI Assistant: Необходимо указать API ключ OpenRouter в ai-assistant.js');
            this.showStatus('⚠️ API ключ не настроен', 5000);
        }
    }

    bindEvents() {
        // Открытие/закрытие чата
        this.elements.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.elements.closeBtn.addEventListener('click', () => this.closeChat());

        // Отправка сообщения
        this.elements.sendBtn.addEventListener('click', () => this.sendMessage());
        this.elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Голосовые функции
        this.elements.voiceToggle.addEventListener('click', () => this.toggleVoiceOutput());
        this.elements.voiceInputBtn.addEventListener('click', () => this.toggleVoiceInput());

        // Закрытие при клике вне чата
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.elements.chatContainer.contains(e.target) && 
                !this.elements.toggleBtn.contains(e.target)) {
                this.closeChat();
            }
        });
    }

    // === УПРАВЛЕНИЕ ЧАТОМ ===

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.elements.chatContainer.classList.add('ai-active');
            this.elements.input.focus();
        } else {
            this.elements.chatContainer.classList.remove('ai-active');
            this.stopRecording();
        }
    }

    closeChat() {
        this.isOpen = false;
        this.elements.chatContainer.classList.remove('ai-active');
        this.stopRecording();
    }

    // === ОБРАБОТКА СООБЩЕНИЙ ===

    addWelcomeMessage() {
        // Приветственное сообщение уже в HTML
        this.messages.push({
            role: 'assistant',
            content: 'Здравствуйте! Я ИИ-ассистент CRONA_AI от Crona. Готов ответить на вопросы об уходе за растениями в северо-западном регионе. Можете писать или говорить!'
        });
    }

    async sendMessage(userMessage = null) {
        const message = userMessage || this.elements.input.value.trim();
        
        if (!message) return;
        
        // Очищаем поле ввода
        if (!userMessage) {
            this.elements.input.value = '';
        }
        
        // Добавляем сообщение пользователя в историю и UI
        this.messages.push({ role: 'user', content: message });
        this.addMessageToUI('user', message);
        
        // Отмечаем, что это текстовое сообщение (не голосовое)
        this.lastMessageWasVoice = false;
        
        this.showStatus('Думаю...', 0, 'ai-thinking');
        
        try {
            const response = await this.getAIResponse();
            this.hideStatus();
            
            // Добавляем ответ ассистента в историю и UI
            this.messages.push({ role: 'assistant', content: response });
            this.addMessageToUI('bot', response);

            // Озвучиваем ответ только если последнее сообщение было голосовым
            if (this.isVoiceEnabled && this.lastMessageWasVoice) {
                this.speak(response);
            }

        } catch (error) {
            this.hideStatus();
            console.error('AI Assistant Error:', error);
            this.addMessageToUI('bot', 'Извините, произошла ошибка. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону: +7 (953) 372-53-87');
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
        
        // Прокрутка вниз
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

    // === OPENROUTER API (автопереключение: api.php или прямой запрос) ===

    async getAIResponse() {
        if (this.isLocalMode) {
            return await this.getAIResponseDirect();
        } else {
            return await this.getAIResponseProxy();
        }
    }

    async getAIResponseDirect() {
        // Прямой запрос к OpenRouter (для локального тестирования file://)
        const url = 'https://openrouter.ai/api/v1/chat/completions';
        
        console.log('AI Assistant: Отправка запроса к OpenRouter...');
        console.log('Режим:', this.isLocalMode ? 'Локальный (file://)' : 'Серверный');
        
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
                    'X-Title': 'Лесной код Crona'
                },
                body: JSON.stringify(body)
            });

            console.log('AI Assistant: Ответ получен, статус:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('AI Assistant: Ошибка API:', response.status, errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('AI Assistant: Успешный ответ от OpenRouter');
            return data.choices[0].message.content;
            
        } catch (error) {
            console.error('AI Assistant: Ошибка запроса:', error);
            
            // Проверяем тип ошибки
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                console.error('AI Assistant: Возможна CORS ошибка или проблемы с сетью');
                console.error('AI Assistant: При открытии через file:// может быть блокировка браузером');
                throw new Error('Ошибка сети или CORS. Попробуйте открыть через localhost или проверьте интернет-соединение.');
            }
            
            throw error;
        }
    }

    async getAIResponseProxy() {
        // Запрос через прокси-сервер api.php (для http:// или https://)
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Unexpected response (not JSON):', text.substring(0, 500));
            throw new Error('Сервер вернул не JSON. Возможно, PHP не запущен или api.php не найден.');
        }

        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('Invalid API response structure:', data);
            throw new Error('Некорректный ответ от API');
        }
        
        return data.choices[0].message.content;
    }

    // === ГОЛОСОВОЙ ВВОД (Speech Recognition) ===

    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            console.warn('AI Assistant: Speech Recognition не поддерживается в этом браузере');
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
            this.showStatus('Голосовой ввод не поддерживается в вашем браузере', 3000);
            return;
        }

        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }

    startRecording() {
        try {
            this.recognition.start();
        } catch (e) {
            console.error('Speech Recognition start error:', e);
            this.showStatus('Не удалось запустить распознавание речи', 3000);
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

    // === ГОЛОСОВОЙ ВЫВОД (Text-to-Speech) ===

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
        
        // Останавливаем предыдущую речь
        this.stopSpeaking();
        
        // Очищаем текст от markdown
        const cleanText = text
            .replace(/[#*_`\[\]\(\)]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        
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
        
        utterance.onerror = () => {
            this.hideStatus();
        };
        
        // Выбираем русский голос
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
}

// === ИНИЦИАЛИЗАЦИЯ ===

// Загружаем голоса для TTS
if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}

// Создаем ассистент при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.aiAssistant = new AIAssistant();
});
