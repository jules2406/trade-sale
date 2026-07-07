Sell to Trade Starter Kit

Files:
- products_preload.json: searchable product preload generated from the uploaded product list.
- Code.gs: Google Apps Script backend to paste into Apps Script.
- google_sheet_headers.csv: headers for the Scans tab.
- sell_to_trade_codex_prompt.md: copy/paste prompt for Codex to build the app.

Basic setup:
1. Create a Google Sheet.
2. Add tabs named Scans and Products.
3. Paste the headers from google_sheet_headers.csv into Scans row 1.
4. Import the product list into the Products tab, or have Codex load products_preload.json directly.
5. Open Extensions > Apps Script.
6. Paste Code.gs.
7. Deploy as Web App.
8. Add the Web App URL to the app as NEXT_PUBLIC_GOOGLE_SCRIPT_URL.