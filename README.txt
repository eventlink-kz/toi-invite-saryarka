1) Загрузите все файлы из архива в GitHub репозиторий.
2) Включите GitHub Pages: Settings -> Pages -> Deploy from a branch -> main -> /root.
3) Сайт для гостей: главная страница репозитория.
4) Админка: /admin.html

Google Sheets:
- Создайте Google Sheet
- Extensions -> Apps Script
- Вставьте код из google-apps-script.js
- Запустите setupSheet()
- Deploy -> New deployment -> Web app -> Anyone
- Вставьте ссылку Web App URL в config.js в APPS_SCRIPT_URL
- Загрузите обновлённый config.js на GitHub
