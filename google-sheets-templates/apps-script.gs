// Paste this into Extensions > Apps Script for EACH of the three sheets
// (Knowledge Hub, Academy, Quiz) — same script works for all three since it
// just reads the first tab's rows into JSON keyed by lowercase headers.
// See GOOGLE_SETUP.md for full deployment steps.

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var values = sheet.getDataRange().getValues();
  var headers = values[0].map(function (h) { return String(h).trim().toLowerCase(); });
  var rows = values.slice(1).map(function (row) {
    var record = {};
    headers.forEach(function (header, i) {
      record[header] = row[i] == null ? '' : String(row[i]);
    });
    return record;
  });
  return ContentService
    .createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON);
}
