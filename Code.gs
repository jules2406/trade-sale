/**
 * Sell to Trade - Google Apps Script Backend
 * Sheet tabs needed:
 * 1) Scans
 * 2) Products
 *
 * Deploy: Extensions > Apps Script > Deploy > New deployment > Web app
 * Execute as: Me
 * Who has access: Anyone with the link
 */

const SCANS_SHEET = 'Scans';
const PRODUCTS_SHEET = 'Products';

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SCANS_SHEET) || ss.insertSheet(SCANS_SHEET);
    const data = JSON.parse(e.postData.contents || '{}');

    const row = [
      new Date(),
      data.scanId || Utilities.getUuid(),
      data.action || 'add',
      data.sku || '',
      data.barcode || '',
      data.productId || '',
      data.itemName || '',
      data.category || '',
      data.productType || '',
      Number(data.quantity || 1),
      data.condition || '',
      data.storageUnit || '',
      data.subsection || '',
      data.binShelf || '',
      data.notes || '',
      data.photoUrl || '',
      data.user || '',
      data.retailPrice || '',
      data.tradePrice || '',
      data.status || 'Available',
      data.presentationInclude === false ? 'No' : 'Yes'
    ];

    sheet.appendRow(row);

    return jsonResponse({ success: true, scanId: row[1] });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  }
}

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const products = ss.getSheetByName(PRODUCTS_SHEET);
  if (!products) return jsonResponse({ success: false, error: 'Products sheet not found' });

  const values = products.getDataRange().getValues();
  const headers = values.shift();
  const rows = values.map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[String(h).trim()] = row[i]);
    return obj;
  });

  return jsonResponse({ success: true, products: rows });
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}