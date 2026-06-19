@echo off
echo ========================================
echo   Запуск локального сервера для CRONA
echo ========================================
echo.
echo Выберите страницу для запуска:
echo 1. Лесной код (порт 8000)
echo 2. Удаление деревьев (порт 8001)
echo 3. Запустить оба сервера
echo.
set /p choice="Введите номер (1-3): "

if "%choice%"=="1" goto lesnoy
if "%choice%"=="2" goto udalenie
if "%choice%"=="3" goto both
goto end

:lesnoy
echo.
echo Запуск сервера для Лесной код...
echo Откройте в браузере: http://localhost:8000/Lesnoy_code.html
echo.
cd /d "%~dp0Lesnoy_code"
php -S localhost:8000
goto end

:udalenie
echo.
echo Запуск сервера для Удаление деревьев...
echo Откройте в браузере: http://localhost:8001/udalenie-derevev.html
echo.
cd /d "%~dp0udalenie-derevev"
php -S localhost:8001
goto end

:both
echo.
echo Запуск обоих серверов...
echo Лесной код: http://localhost:8000/Lesnoy_code.html
echo Удаление деревьев: http://localhost:8001/udalenie-derevev.html
echo.
start cmd /k "cd /d "%~dp0Lesnoy_code" && echo Сервер Лесной код запущен на порту 8000 && php -S localhost:8000"
start cmd /k "cd /d "%~dp0udalenie-derevev" && echo Сервер Удаление деревьев запущен на порту 8001 && php -S localhost:8001"
goto end

:end
pause
