function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Responses') || ss.insertSheet('Responses');
  sh.clear();
  sh.appendRow(['timestamp','name','attendance','companion','spouseName','guestsCount','comment','lang','page','userAgent']);
  sh.setFrozenRows(1);
}

function doPost(e) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Responses') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Responses');
  if (sh.getLastRow() === 0) {
    sh.appendRow(['timestamp','name','attendance','companion','spouseName','guestsCount','comment','lang','page','userAgent']);
    sh.setFrozenRows(1);
  }
  var p = e.parameter || {};
  sh.appendRow([
    Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'),
    p.name || '',
    p.attendance || '',
    p.companion || '',
    p.spouseName || '',
    Number(p.guestsCount || 0),
    p.comment || '',
    p.lang || '',
    p.page || '',
    p.userAgent || ''
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var action = (e.parameter.action || '').toLowerCase();
  if (action === 'list') {
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Responses');
    var rows = [];
    if (sh && sh.getLastRow() > 1) {
      var values = sh.getDataRange().getDisplayValues();
      var headers = values.shift();
      rows = values.map(function(row){
        var obj = {};
        headers.forEach(function(h, i){ obj[h] = row[i]; });
        return obj;
      });
    }
    var payload = JSON.stringify({rows: rows});
    var cb = e.parameter.callback;
    if (cb) {
      return ContentService.createTextOutput(cb + '(' + payload + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService.createTextOutput(payload).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput('OK');
}
