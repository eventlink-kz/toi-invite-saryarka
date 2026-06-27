/*
  Event-link RSVP backend for Google Sheets.
  1) Create Google Sheet.
  2) Extensions -> Apps Script.
  3) Delete default code and paste this file.
  4) Run setupSheet once.
  5) Deploy -> New deployment -> Web app.
     Execute as: Me
     Who has access: Anyone
  6) Copy Web App URL and paste it into config.js -> APPS_SCRIPT_URL.
*/

const SHEET_NAME = 'Ответы гостей';
const HEADERS = [
  'Дата',
  'Имя',
  'Статус',
  'Формат',
  'Имя супруга/супруги',
  'Количество персон',
  'Комментарий',
  'Язык',
  'Страница',
  'User Agent'
];

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  sheet.clear();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight('bold')
    .setBackground('#b8904f')
    .setFontColor('#ffffff')
    .setHorizontalAlignment('center');
  sheet.setFrozenRows(1);
  sheet.setColumnWidths(1, HEADERS.length, 170);
  sheet.setColumnWidth(7, 320);
  sheet.getRange('A:A').setNumberFormat('dd.MM.yyyy HH:mm:ss');
  return 'Готово. Таблица настроена.';
}

function doPost(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};
    const sheet = getSheet_();
    const attendance = p.attendance === 'yes' ? 'Будет' : 'Не сможет';
    const companion = p.attendance === 'yes'
      ? (p.companion === 'spouse' ? 'С супругом(-ой)' : 'Один / одна')
      : '—';
    const guestsCount = Number(p.guestsCount || 0);
    sheet.appendRow([
      new Date(),
      clean_(p.name),
      attendance,
      companion,
      clean_(p.spouseName),
      guestsCount,
      clean_(p.comment),
      clean_(p.lang),
      clean_(p.page),
      clean_(p.userAgent)
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  const p = (e && e.parameter) ? e.parameter : {};
  const action = p.action || 'list';
  if (action === 'list') {
    const data = { ok: true, rows: getRows_() };
    if (p.callback) return jsonp_(p.callback, data);
    return json_(data);
  }
  if (action === 'sheet') {
    return json_({ ok: true, url: SpreadsheetApp.getActiveSpreadsheet().getUrl() });
  }
  return json_({ ok: true, message: 'Event-link RSVP backend is working.' });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getRows_() {
  const sheet = getSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const values = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
  return values.map(row => {
    const status = String(row[2] || '');
    const format = String(row[3] || '');
    return {
      timestamp: row[0] instanceof Date ? Utilities.formatDate(row[0], Session.getScriptTimeZone(), 'dd.MM.yyyy HH:mm') : String(row[0] || ''),
      name: String(row[1] || ''),
      attendance: status === 'Будет' ? 'yes' : 'no',
      companion: format === 'С супругом(-ой)' ? 'spouse' : 'alone',
      spouseName: String(row[4] || ''),
      guestsCount: Number(row[5] || 0),
      comment: String(row[6] || ''),
      lang: String(row[7] || '')
    };
  });
}

function clean_(value) {
  return String(value || '').trim();
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonp_(callback, obj) {
  const safeCallback = String(callback || '').replace(/[^a-zA-Z0-9_.$]/g, '');
  return ContentService
    .createTextOutput(safeCallback + '(' + JSON.stringify(obj) + ');')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
