ТВОЙ ВАРИАНТ: GOOGLE SHEETS + ОДНА ССЫЛКА В CONFIG.JS

Сайт уже готов. Google Sheet ID уже вшит:
1d4LbzEe8091EJ9x6bdas9bnLqZh6nE2qpBHFYarZWMw

Логика:
1) В Apps Script вставляешь код из COPY_THIS_TO_APPS_SCRIPT.txt.
2) Делаешь Deploy как Web app.
3) Получаешь одну ссылку, которая заканчивается на /exec.
4) В config.js меняешь только это:
   PASTE_APPS_SCRIPT_WEB_APP_URL_HERE
   на свою ссылку /exec.
5) Загружаешь все файлы на GitHub.

После этого:
- ответы гостей падают в Google Sheet;
- admin.html показывает ответы;
- кнопка Скачать Excel работает.
