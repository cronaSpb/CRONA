/**
 * ИИ-Ассистент Лесной код от Crona
 * Поддерживает текстовый и голосовой ввод/вывод
 * Интеграция с OpenRouter API
 */

class AIAssistant {
    constructor() {
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

=== ВАШИ ЗНАНИЯ ===
- Особенности лесной растительности северо-западного региона
- Виды деревьев и кустарников: ель, сосна, береза, осина, ольха, рябина, ива и др.
- Условия произрастания: таежная зона, подзолистые почвы, влажный климат
- Технологии кронирования, посадки, пересадки, стабилизации
- Сезонные работы: весенние, летние, осенние, зимние
- Защита от вредителей и болезней

=== ПРАВИЛА ОБЩЕНИЯ ===
- Отвечать по-русски, профессионально и дружелюбно
- Давать конкретные, практические советы
- Уточнять детали, если вопрос неясен
- Предлагать услуги компании Crona при возможности
- Использовать термины: кронирование, стабилизация, рекультивация

=== КОНТАКТЫ КОМПАНИИ ===
- Телефон: +7 (953) 372 53 87
- Email: E-mail@crona-spb.com
- Сайт: https://bio-plus.ru
- Адрес: Санкт-Петербург и Ленинградская область

Отвечайте как настоящий эксперт по лесной растительности!`;

        this.init();
    }

    init() {
        this.createAssistantUI();
        this.setupEventListeners();
        this.loadConversationHistory();
        
        console.log('AI Assistant для Лесного кода инициализирован');
    }

    createAssistantUI() {
        // Создаем основной контейнер ассистента
        const assistantHTML = `
            <div id="ai-assistant-container" class="ai-assistant-container">
                <!-- Кнопка ассистента -->
                <div id="ai-assistant-button" class="ai-assistant-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
                        <path d="M6 12H18M6 8H18" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <span class="ai-assistant-tooltip">ИИ-Ассистент Лесного кода</span>
                </div>

                <!-- Окно ассистента -->
                <div id="ai-assistant-window" class="ai-assistant-window">
                    <div class="ai-assistant-header">
                        <h3>🌲 ИИ-Ассистент Лесного кода</h3>
                        <button id="ai-assistant-close" class="ai-assistant-close">×</button>
                    </div>
                    
                    <div class="ai-assistant-body">
                        <!-- История сообщений -->
                        <div id="ai-assistant-messages" class="ai-assistant-messages"></div>
                        
                        <!-- Поле ввода -->
                        <div class="ai-assistant-input-container">
                            <textarea id="ai-assistant-input" 
                                class="ai-assistant-input" 
                                placeholder="Спросите об уходе за лесными растениями..."
                                rows="3"></textarea>
                            
                            <!-- Кнопки управления -->
                            <div class="ai-assistant-controls">
                                <button id="ai-assistant-voice" class="ai-assistant-voice-btn" title="Голосовой ввод">
                                    🎤
                                </button>
                                <button id="ai-assistant-send" class="ai-assistant-send-btn">
                                    Отправить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Индикатор загрузки -->
                <div id="ai-assistant-loading" class="ai-assistant-loading">
                    <div class="ai-assistant-spinner"></div>
                    <span>ИИ-ассистент думает...</span>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', assistantHTML);
    }

    setupEventListeners() {
        const button = document.getElementById('ai-assistant-button');
        const window = document.getElementById('ai-assistant-window');
        const closeBtn = document.getElementById('ai-assistant-close');
        const sendBtn = document.getElementById('ai-assistant-send');
        const voiceBtn = document.getElementById('ai-assistant-voice');
        const input = document.getElementById('ai-assistant-input');

        // Открытие/закрытие окна
        button.addEventListener('click', () => this.toggleWindow());
        closeBtn.addEventListener('click', () => this.hideWindow());

        // Отправка сообщения
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Голосовой ввод
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            voiceBtn.addEventListener('click', () => this.toggleVoiceInput());
        } else {
            voiceBtn.style.display = 'none';
        }

        // Закрытие при клике вне окна
        document.addEventListener('click', (e) => {
            if (!window.contains(e.target) && !button.contains(e.target)) {
                this.hideWindow();
            }
        });
    }

    toggleWindow() {
        const window = document.getElementById('ai-assistant-window');
        const button = document.getElementById('ai-assistant-button');
        
        if (window.style.display === 'block') {
            this.hideWindow();
        } else {
            this.showWindow();
        }
    }

    showWindow() {
        const window = document.getElementById('ai-assistant-window');
        const button = document.getElementById('ai-assistant-button');
        
        window.style.display = 'block';
        button.classList.add('active');
        
        // Фокус на поле ввода
        setTimeout(() => {
            document.getElementById('ai-assistant-input').focus();
        }, 300);
    }

    hideWindow() {
        const window = document.getElementById('ai-assistant-window');
        const button = document.getElementById('ai-assistant-button');
        
        window.style.display = 'none';
        button.classList.remove('active');
    }

    async sendMessage() {
        const input = document.getElementById('ai-assistant-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Добавляем сообщение пользователя
        this.addMessage('user', message);
        input.value = '';
        
        // Показываем индикатор загрузки
        this.showLoading();

        try {
            const response = await this.getAIResponse(message);
            this.addMessage('assistant', response);
        } catch (error) {
            console.error('AI Assistant Error:', error);
            this.addMessage('assistant', 'Извините, произошла ошибка. Попробуйте еще раз.');
        } finally {
            this.hideLoading();
        }
    }

    async getAIResponse(message) {
        const conversationHistory = this.getConversationHistory();
        
        const payload = {
            model: this.MODEL,
            messages: [
                { role: 'system', content: this.SYSTEM_PROMPT },
                ...conversationHistory,
                { role: 'user', content: message }
            ],
            max_tokens: 1000
        };

        try {
            let response;
            
            if (this.isLocalMode) {
                // Локальный режим - прямой запрос к OpenRouter
                response = await this.makeDirectAPIRequest(payload);
            } else {
                // Серверный режим - запрос через наш API
                response = await this.makeServerAPIRequest(payload);
            }

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.message || 'API Error');
            }

            return data.choices[0]?.message?.content || 'Извините, не удалось получить ответ.';
        } catch (error) {
            console.error('AI Assistant: Ошибка при получении ответа:', error);
            throw error;
        }
    }

    async makeDirectAPIRequest(payload) {
        const url = 'https://openrouter.ai/api/v1/chat/completions';
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': this.SITE_URL,
                'X-Title': 'Лесной код Crona'
            },
            body: JSON.stringify(payload)
        });

        console.log('AI Assistant: Ответ получен, статус:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('AI Assistant: Ошибка API:', response.status, errorText);
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        return response;
    }

    async makeServerAPIRequest(payload) {
        const response = await fetch('api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        console.log('AI Assistant: Ответ от сервера получен, статус:', response.status);
        return response;
    }

    addMessage(role, content) {
        const messagesContainer = document.getElementById('ai-assistant-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `ai-assistant-message ai-assistant-${role}`;
        
        const avatar = role === 'user' ? '👤' : '🌲';
        const label = role === 'user' ? 'Вы' : 'ИИ-Ассистент';
        
        messageElement.innerHTML = `
            <div class="ai-assistant-message-header">
                <span class="ai-assistant-message-avatar">${avatar}</span>
                <span class="ai-assistant-message-label">${label}</span>
                <span class="ai-assistant-message-time">${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="ai-assistant-message-content">${this.formatMessage(content)}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Сохраняем в историю
        this.saveMessageToHistory(role, content);
    }

    formatMessage(content) {
        // Форматируем сообщения: переносы строк, списки, жирный текст
        return content
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    }

    showLoading() {
        document.getElementById('ai-assistant-loading').style.display = 'flex';
    }

    hideLoading() {
        document.getElementById('ai-assistant-loading').style.display = 'none';
    }

    getConversationHistory() {
        const history = localStorage.getItem('ai-assistant-history') || '[]';
        return JSON.parse(history).slice(-10); // Последние 10 сообщений
    }

    saveMessageToHistory(role, content) {
        const history = this.getConversationHistory();
        history.push({ role, content, timestamp: Date.now() });
        
        // Сохраняем только последние 20 сообщений
        const trimmedHistory = history.slice(-20);
        localStorage.setItem('ai-assistant-history', JSON.stringify(trimmedHistory));
    }

    loadConversationHistory() {
        const history = this.getConversationHistory();
        const messagesContainer = document.getElementById('ai-assistant-messages');
        
        if (history.length === 0) {
            // Приветственное сообщение
            this.addMessage('assistant', '🌲 Здравствуйте! Я ИИ-ассистент Лесного кода от Crona. Могу помочь с вопросами по уходу за лесными растениями, кронированию деревьев, посадке и другим услугам. Чем могу помочь?');
        } else {
            // Загружаем последние сообщения
            history.slice(-5).forEach(msg => {
                this.addMessage(msg.role, msg.content);
            });
        }
    }

    toggleVoiceInput() {
        if (!this.recognition) {
            this.initVoiceRecognition();
        }
        
        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }

    initVoiceRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.lang = 'ru-RU';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        
        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('ai-assistant-input').value = transcript;
            this.stopRecording();
        };
        
        this.recognition.onerror = (event) => {
            console.error('Voice recognition error:', event.error);
            this.stopRecording();
        };
        
        this.recognition.onend = () => {
            this.stopRecording();
        };
    }

    startRecording() {
        if (!this.recognition) {
            this.initVoiceRecognition();
        }
        
        this.isRecording = true;
        this.recognition.start();
        
        const voiceBtn = document.getElementById('ai-assistant-voice');
        voiceBtn.textContent = '🔴';
        voiceBtn.classList.add('recording');
    }

    stopRecording() {
        if (this.recognition && this.isRecording) {
            this.recognition.stop();
        }
        
        this.isRecording = false;
        
        const voiceBtn = document.getElementById('ai-assistant-voice');
        voiceBtn.textContent = '🎤';
        voiceBtn.classList.remove('recording');
    }
}

// Инициализация ассистента при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new AIAssistant();
});
