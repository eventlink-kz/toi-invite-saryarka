ГОТОВЫЕ ФАЙЛЫ ДЛЯ GITHUB

Сайт уже собран. Внутри:
index.html
admin.html
config.js
google-apps-script.js
COPY_THIS_TO_APPS_SCRIPT.txt
hands-hero-v2.jpg
hero-bg.jpg
hall.jpg
table.jpg
tradition.jpg

GOOGLE SHEET УЖЕ ПРОПИСАН В КОДЕ:
1d4LbzEe8091EJ9x6bdas9bnLqZh6nE2qpBHFYarZWMw

Чтобы ответы реально падали в admin.html, нужен Web App URL из Apps Script.
Это единственное действие, которое невозможно сделать без входа в Google-аккаунт владельца таблицы.

КАК ПОДКЛЮЧИТЬ:
1) Открой Google Sheet.
2) Расширения -> Apps Script.
3) Удали старый код.
4) Вставь код из COPY_THIS_TO_APPS_SCRIPT.txt.
5) Запусти функцию setupSheet один раз.
6) Deploy -> New deployment -> Web app.
7) Execute as: Me.
8) Who has access: Anyone.
9) Deploy.
10) Скопируй Web App URL.
11) Вставь URL в config.js в поле APPS_SCRIPT_URL.
12) Загрузи обновлённый config.js на GitHub.

АДМИНКА:
https://eventlink-kz.github.io/toi-invite-saryarka/admin.html

В admin.html есть кнопка Скачать Excel.
