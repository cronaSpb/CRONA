<?php
/**
 * Прокси-сервер для OpenRouter API
 * Хранит API ключ на сервере, никогда не отдаёт его в браузер
 */

// Настройки
$OPENROUTER_API_KEY = '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';
$OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Разрешаем CORS для локальной разработки (замените на свой домен при выгрузке)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Обработка preflight OPTIONS запроса
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Принимаем только POST запросы
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Получаем данные от клиента
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['messages'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request data']);
    exit;
}

// Подготавливаем запрос к OpenRouter
$payload = [
    'model' => $input['model'] ?? 'anthropic/claude-3.5-haiku',
    'messages' => $input['messages'],
    'temperature' => $input['temperature'] ?? 0.7,
    'max_tokens' => $input['max_tokens'] ?? 1000
];

// Отправляем запрос к OpenRouter
$ch = curl_init($OPENROUTER_URL);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $OPENROUTER_API_KEY,
    'Content-Type: application/json',
    'HTTP-Referer: ' . ($_SERVER['HTTP_REFERER'] ?? ''),
    'X-Title: Лесной код Crona'
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Обрабатываем ошибки cURL
if ($error) {
    http_response_code(500);
    echo json_encode(['error' => 'Proxy error: ' . $error]);
    exit;
}

// Проверяем ответ от OpenRouter
if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo $response; // Передаём ошибку от OpenRouter
    exit;
}

// Возвращаем успешный ответ
http_response_code(200);
echo $response;
