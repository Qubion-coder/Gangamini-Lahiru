function doPost(e) {
  try {
    // Prefer FormData field `payload` (works without CORS), else use raw JSON body.
    var payloadText = (e && e.parameter && e.parameter.payload)
      ? e.parameter.payload
      : (e && e.postData && e.postData.contents);

    if (!payloadText) throw new Error('No payload received');
    var data = JSON.parse(payloadText);

    // Determine target sheet: 'RSVP' or 'Wish'
    var sheetName = data.type || 'RSVP';
    
    // Remove internal type field so it doesn't become a column
    delete data.type;

    // Open the Google Sheet by ID (replace with your ID if necessary)
    var ss = SpreadsheetApp.openById('1mhidpqDBLZjqbcwMI11Z2Ifhhe9Fu8rzYUHK5TS6gP4');
    
    // Get or create the sheet
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    var keys = Object.keys(data);
    var headers = [];

    // Setup headers dynamically if sheet is empty
    if (sheet.getLastRow() === 0) {
      headers = keys;
      sheet.appendRow(headers);
      
      // Optional: Style the header row
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#f3f3f3");
    } else {
      // Read existing headers
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      
      // Check for missing headers and add them
      var missingHeaders = keys.filter(function(k) { return headers.indexOf(k) === -1; });
      if (missingHeaders.length > 0) {
        headers = headers.concat(missingHeaders);
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      }
    }

    // Build the row array matching the exact header order
    var row = headers.map(function(header) {
      var val = data[header];
      if (val === undefined || val === null) return '';
      if (typeof val === 'object') return JSON.stringify(val);
      return val;
    });

    // Append the row
    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
