# Vector Rebirth Tracker

Минималистичный набор инструментов для отслеживания здоровья в тёмной теме, включающий **Pills Tracker** и **Sleep Journal**.  
Разработан для мобильного использования с упором на скорость и визуальную эстетику.

# ⚠️ Преокт создан для личного использования, и является открытым только из-за использования GitHub Pages.

## Features

- **Pills Tracker**: 
  - Отслеживает лекарства, дозировки и время приёма.
  - Синхронизируется с Google Sheets.
  - Поддерживает офлайн-просмотр (после первой загрузки).
- **Sleep Journal**:
  - Отслеживает параметры сна (Отход ко сну, Выключение света, Пробуждение).
  - Мониторинг качества сна, уровня энергии и пробуждений.
  - Визуальный ввод через циркадные часы.

## Setup Instructions (если всё же захочется адаптирвоать под себя)

### 1. Google Sheets Backend
1. Создайте новую таблицу Google Sheets.
2. Extensions > Apps Script.
3. Вставьте содержимое файла `google_apps_script.js`.
4. **Deploy** > New Deployment > Web App.
   - Execute as: **Me**.
   - Who has access: **Anyone**.
5. Скопируйте сгенерированный **Web App URL**.
6. Обновите переменную `SCRIPT_URL` в файлах `pills_tracker.html` и `sleep_tracker.html`.

### 2. GitHub Pages Deployment
1. Загрузите `index.html`, `pills_tracker.html`, `sleep_tracker.html` и `README.md` в репозиторий GitHub.
2. Перейдите в **Settings** > **Pages**.
3. Выберите ветку `main` и папку `/root`.
4. Сохраните. Приложение будет доступно по адресу `https://<your-username>.github.io/<repo-name>/`.

## Files
- `index.html`: Основная стартовая страница.
- `pills_tracker.html`: Интерфейс отслеживания лекарств.
- `sleep_tracker.html`: Интерфейс мониторинга сна.
- `google_apps_script.js`: Серверная логика для Google Sheets.
