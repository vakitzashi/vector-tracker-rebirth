function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var result = {};

  try {
    // 1. Find sheet (Fuzzy)
    var sheets = ss.getSheets();
    var targetSheet = null;

    // Exact
    targetSheet = ss.getSheetByName("PILLS TRACKER");

    // Fuzzy
    if (!targetSheet) {
      for (var i = 0; i < sheets.length; i++) {
        if (sheets[i].getName().toUpperCase().indexOf("PILL") > -1) {
          targetSheet = sheets[i];
          break;
        }
      }
    }

    if (targetSheet) {
      result.sheet_name = targetSheet.getName();
      // READ EVERYTHING. NO FILTERING.
      var dataRange = targetSheet.getDataRange();
      var values = dataRange.getValues();

      // Send raw 2D array. Let frontend handle it.
      result.raw_data = values;
      result.status = "success";
    } else {
      result.status = "error";
      result.error = "Sheet not found. Visible: " + sheets.map(function (s) { return s.getName(); }).join(", ");
    }

  } catch (err) {
    result.status = "error";
    result.error = err.toString();
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);
    var sheet;

    // --- PILLS HANDLING ---
    if (data.type === "pills") {
      sheet = ss.getSheetByName("PILLS TRACKER");
      if (!sheet) {
        // Fuzzy find pills
        var sheets = ss.getSheets();
        for (var i = 0; i < sheets.length; i++) {
          if (sheets[i].getName().toUpperCase().indexOf("PILL") > -1) {
            sheet = sheets[i];
            break;
          }
        }
      }

      if (sheet) {
        sheet.appendRow([new Date(), data.pillName, data.amount, "", "", data.comment]);
      } else {
        return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": "Pills sheet not found" }));
      }

    } else {
      // --- SLEEP HANDLING ---
      var sSheet = ss.getSheetByName("SLEEP TRACKER");
      if (!sSheet) {
        // Fuzzy find sleep
        var sheets = ss.getSheets();
        for (var i = 0; i < sheets.length; i++) {
          if (sheets[i].getName().toUpperCase().indexOf("SLEEP") > -1 ||
            sheets[i].getName().toUpperCase().indexOf("СОН") > -1 ||
            sheets[i].getName().toUpperCase().indexOf("СНА") > -1) {
            sSheet = sheets[i];
            break;
          }
        }
      }

      if (sSheet) {
        // Determine if date is passed or needs creation
        var dateVal = data.date || new Date();

        sSheet.appendRow([
          dateVal,
          data.bedTime,
          data.lightOffTime,
          data.wakeUpTime,
          data.quality,
          data.energy,
          data.awakeningCount,
          data.dreams,
          data.dreamType,
          data.comment
        ]);
      } else {
        return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": "Sleep sheet not found" }));
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
