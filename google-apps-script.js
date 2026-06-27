const SHEET_NAME = 'Ответы гостей';

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  sh.clear();
  const headers = ['Дата', 'Имя', 'Ответ', 'Формат', 'Имя супруга/супруги', 'Кол-во персон', 'Комментарий', 'Язык'];
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  sh.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#9f2f51')
    .setFontColor('#ffffff')
    .setHorizontalAlignment('center');
  sh.setFrozenRows(1);
  sh.setColumnWidths(1, 1, 160);
  sh.setColumnWidths(2, 1, 220);
  sh.setColumnWidths(3, 1, 140);
  sh.setColumnWidths(4, 1, 190);
  sh.setColumnWidths(5, 1, 220);
  sh.setColumnWidths(6, 1, 110);
  sh.setColumnWidths(7, 1, 330);
  sh.setColumnWidths(8, 1, 90);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) setupSheet();
    sh = ss.getSheetByName(SHEET_NAME);

    const p = e.parameter || {};
    const name = clean(p.name);
    const attendance = clean(p.attendance);
    const companion = clean(p.companion);
    const companionName = clean(p.companionName);
    const comment = clean(p.comment);
    const lang = clean(p.lang || 'kk');
    const answerText = attendance === 'no' ? 'Не сможет' : 'Будет';
    const formatText = attendance === 'yes' ? (companion === 'with' ? 'С супругом/супругой' : 'Один/одна') : '';
    const people = attendance === 'yes' ? (companion === 'with' ? 2 : 1) : 0;

    sh.appendRow([new Date(), name, answerText, formatText, companionName, people, comment, lang]);
    return output({ ok: true });
  } catch (err) {
    return output({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  const p = e.parameter || {};
  if (p.admin === '1') {
    const data = { ok: true, responses: getResponses_() };
    return output(data, p.callback);
  }
  return output({ ok: true, message: 'Event-link RSVP API is active' }, p.callback);
}

function getResponses_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME);
  if (!sh || sh.getLastRow() < 2) return [];
  const values = sh.getRange(2, 1, sh.getLastRow() - 1, 8).getValues();
  return values.map(r => ({
    timestamp: r[0] instanceof Date ? r[0].toISOString() : String(r[0] || ''),
    name: String(r[1] || ''),
    attendance: String(r[2] || '').toLowerCase().includes('не') ? 'no' : 'yes',
    companion: String(r[3] || '').toLowerCase().includes('с супруг') ? 'with' : 'alone',
    companionName: String(r[4] || ''),
    people: Number(r[5] || 0),
    comment: String(r[6] || ''),
    lang: String(r[7] || '')
  }));
}

function output(obj, callback) {
  const json = JSON.stringify(obj);
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function clean(v) {
  return String(v || '').trim();
}
