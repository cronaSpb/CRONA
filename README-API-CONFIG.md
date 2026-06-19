# Настройка API ключа для ИИ-ассистента

## Важно! 🔐

API ключи **НЕ должны попадать в Git репозиторий**. Они хранятся в файлах `config.js`, которые защищены `.gitignore`.

## Инструкция по настройке

### Для каждой страницы:

1. **Удаление деревьев** (`udalenie-derevev/`)
   - Скопируйте `config.example.js` → `config.js`
   - Откройте `config.js` и замените `your-api-key-here` на ваш реальный API ключ

2. **Лесной код** (`Lesnoy_code/`)
   - Скопируйте `config.example.js` → `config.js`
   - Откройте `config.js` и замените `your-api-key-here` на ваш реальный API ключ

3. **H2O** (`H2O/`)
   - Скопируйте `config.example.js` → `config.js`
   - Откройте `config.js` и замените `your-api-key-here` на ваш реальный API ключ

### Текущий API ключ

Ключ уже настроен в обоих `config.js` файлах:
```
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
```

## Структура файлов

```
CRONA/
├── .gitignore                          # Защищает config.js от попадания в Git
├── udalenie-derevev/
│   ├── config.js                       # ❌ НЕ в Git (защищен)
│   ├── config.example.js               # ✅ В Git (пример)
│   └── ai-assistant-udalenie.js        # Использует config.js
├── Lesnoy_code/
│   ├── config.js                       # ❌ НЕ в Git (защищен)
│   ├── config.example.js               # ✅ В Git (пример)
│   └── ai-assistant-Lesnoy_code.js     # Использует config.js
└── H2O/
    ├── config.js                       # ❌ НЕ в Git (защищен)
    ├── config.example.js               # ✅ В Git (пример)
    └── ai-assistant-H2O.js             # Использует config.js
```

## Проверка защиты

Файлы `config.js` добавлены в `.gitignore` и **не будут** коммититься в репозиторий.

Проверьте статус Git:
```bash
git status
```

Вы **НЕ** должны видеть `config.js` в списке измененных файлов.

## Получение нового API ключа

API ключи можно получить на [OpenRouter](https://openrouter.ai/)
