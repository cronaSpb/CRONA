// Универсальный ИИ-ассистент CRONA_AI для всех страниц cronа-spb.com
class AIAssistant {
    constructor() {
        this.isLocalMode = window.location.protocol === 'file:';
        this.OPENROUTER_API_KEY = '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';
        this.MODEL = 'anthropic/claude-3.5-haiku';
        this.SITE_URL = window.location.origin;
        this.SITE_NAME = 'Crona - Уход за деревьями';
        
        // Универсальный промпт для всех страниц
        this.SYSTEM_PROMPT = `Вы - ИИ-ассистент компании Crona, профессиональной арбористической компании, специализирующейся на уходе за деревьями, водными растениями и водоёмами в Санкт-Петербурге и Ленинградской области.

=== О КОМПАНИИ CRONA ===
Компания Crona - профессионалы в области арбористики, ухода за деревьями и водными экосистемами в СПб и ЛО
Сайт: https://crona-spb.com
Работаем по всему северо-западному региону

=== КОНТАКТЫ ===
- Телефон: +7 (953) 372-53-87 (основной)
- Телефон: +7 (812) 960-55-20
- Email: E-mail@crona-spb.com

=== ОСНОВНЫЕ УСЛУГИ ===

**Деревья и лесная растительность:**
- Кронирование (частичная обрезка): санитарная, формирование кроны, поллардинг, топинг
- Стабилизация ветвей: каблинг (статический/динамический), брейсинг
- Профилактика и лечение: фунгициды, репелленты, удобрения
- Удаление деревьев: безопасное удаление, такелажные работы до 500кг

**Водные экосистемы H2O:**
- Обследование водоёмов: комплексная диагностика состояния водных объектов
- Биологическая очистка: удаление избыточных водорослей, борьба с инвазивными видами
- Удаление антропогенного мусора: от бытового до крупных предметов (велосипеды, сантехника, батареи)
- Обслуживание прибрежных территорий: уход за береговой зоной, укрепление берегов
- Посадка водных растений (гидрофитов): создание здоровой водной растительности

=== СПЕЦИФИКА H2O - ВОДНЫЕ ЭКОСИСТЕМЫ ===

**Обследование водоёмов:**
Проводим профессиональное обследование на предмет загрязнения:
- 🌿 Биологические загрязнения: избыточные водоросли, цианобактерии, инвазивные виды, бактериальное загрязнение, грибковые поражения, избыточные биогенные вещества
- 🏭 Антропогенное загрязнение: бытовой мусор, пластики, строительные материалы, крупные предметы (рамы велосипедов, сантехника, батареи), автомобильные детали, химические загрязнители

**Методы обследования:**
- Визуальный осмотр береговой линии и акватории
- Пробы воды для лабораторного анализа
- Бентосные исследования состояния дна
- Анализ видового состава водной растительности
- Определение источников загрязнения

**Результаты обследования:**
- Подробный отчёт о состоянии водоёма
- Карта загрязнений и проблемных зон
- Рекомендации по очистке и восстановлению
- План мероприятий по улучшению экологии
- Расчёт стоимости работ

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

=== ЦЕНЫ И УСЛОВИЯ ===
- Минимальный заказ от 8000 рублей (деревья)
- Минимальный заказ от 20000 рублей (водные работы)
- Работаем по всему северо-западному региону
- Бесплатный выезд специалиста для оценки

Важно:
- Отвечайте на русском языке
- Будьте профессиональны и дружелюбны
- Давайте конкретные рекомендации по уходу за деревьями и водными экосистемами
- При необходимости предлагайте вызов специалиста
- Используйте современные научные методы ухода
- Приоритет безопасности людей и окружающей среды`;

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
            content: 'Здравствуйте! Я ИИ-ассистент компании Crona. Готов ответить на вопросы об уходе за деревьями в Санкт-Петербурге и Ленинградской области. Можете писать или говорить!'
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
        // Локальный режим без API - возвращаем базовые ответы
        const userMessage = this.messages[this.messages.length - 1].content.toLowerCase();
        
        // Простые ответы на частые вопросы
        if (userMessage.includes('привет') || userMessage.includes('здравствуй')) {
            return 'Здравствуйте! Я ИИ-ассистент CRONA_AI от Crona. Готов ответить на вопросы об уходе за растениями в северо-западном регионе. Чем могу помочь?';
        }
        
        if (userMessage.includes('уход') || userMessage.includes('дерев') || userMessage.includes('растен')) {
            return 'Компания Crona предоставляет профессиональные услуги по уходу за деревьями и растениями в СПб и ЛО: кронирование, стабилизация ветвей, лечение болезней, удаление деревьев. Также работаем с водными экосистемами H2O: обследование водоёмов, биологическая очистка, посадка гидрофитов. Для консультации звоните: +7 (953) 372-53-87';
        }
        
        if (userMessage.includes('цена') || userMessage.includes('стоимост')) {
            return 'Минимальный заказ: от 8000 рублей (деревья), от 20000 рублей (водные работы). Бесплатный выезд специалиста для оценки. Точная стоимость зависит от объема работ. Звоните для расчета: +7 (953) 372-53-87';
        }
        
        if (userMessage.includes('контакт') || userMessage.includes('телефон')) {
            return 'Контакты Crona: +7 (953) 372-53-87 (основной), +7 (812) 960-55-20, Email: E-mail@crona-spb.com. Работаем по всему северо-западному региону.';
        }
        
        if (userMessage.includes('вод') || userMessage.includes('h2o') || userMessage.includes('водоём')) {
            return 'Услуги H2O от Crona: обследование водоёмов, биологическая очистка от избыточных водорослей, удаление мусора, уход за прибрежными территориями, посадка водных растений. Минимальный заказ от 20000 рублей. Звоните: +7 (953) 372-53-87';
        }
        
        // Ответ по умолчанию
        return 'Спасибо за вопрос! Я ИИ-ассистент CRONA_AI от Crona. Мы профессионально занимаемся уходом за деревьями и водными экосистемами в северо-западном регионе. Для консультации или заказа услуг звоните: +7 (953) 372-53-87 или пишите на E-mail@crona-spb.com. Сайт: https://crona-spb.com';
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
