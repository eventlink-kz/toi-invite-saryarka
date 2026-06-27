Құдалық шақыру / Event-link

Самое важное:
1) Открой Google Таблицу.
2) Расширения → Apps Script.
3) Полностью удали старый код.
4) Вставь код из файла google-apps-script.js.
5) Сохрани.
6) Вверху выбери функцию setupSheet → Run / Запустить.
7) Deploy → New deployment → Web app.
8) Execute as: Me. Who has access: Anyone.
9) Скопируй Web App URL.
10) Открой файл config.js и вставь ссылку в APPS_SCRIPT_URL.

После этого:
- гости отвечают на index.html;
- ответы видны в admin.html;
- Excel скачивается кнопкой «Скачать Excel»;
- 2GIS ссылка меняется в config.js.

На GitHub загружай все файлы из этой папки:
- index.html
- admin.html
- config.js
- google-apps-script.js
- README.txt
