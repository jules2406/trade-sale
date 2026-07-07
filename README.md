# Sell to Trade

Mobile-first inventory scanner for staging Sell to Trade lighting inventory, saving scans locally, and syncing each saved item to a shared Google Sheet through Google Apps Script.

## Features

- React, TypeScript, Vite, and Tailwind CSS.
- Preloads `5,059` products from `public/data/products_preload.json`.
- Product search by SKU, barcode, product ID, item name, category, and type.
- Quick add form for quantity, condition, storage unit, subsection, bin/shelf, notes, user, prices, status, and catalog inclusion.
- Scanner screen with camera barcode detection where supported, plus manual handheld scanner input.
- localStorage-backed inventory and retry queue for failed Google Sheets saves.
- Dashboard, storage sections, inventory list, CSV export, and trade catalog export/print view.
- Installable phone app experience through PWA manifest, mobile icons, and service worker caching.
- Luxury showroom styling with charcoal, ivory, copper, and gold accents.

## Google Sheets Setup

1. Upload or import `docs/sell_to_trade_google_sheet_template.xlsx` into Google Sheets.
2. Confirm the imported spreadsheet has two tabs named `Scans` and `Products`.
3. `Scans` already contains the required header row, and `Products` already contains the product preload.
4. Open Extensions > Apps Script.
5. Paste `google-apps-script/Code.gs`.
6. Deploy as a Web App:
   - Execute as: `Me`
   - Who has access: `Anyone`
7. Copy the Web App URL into an environment file.

## Environment

Copy the example env file, then add your deployed Apps Script URL:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

This Vite app is configured to expose `NEXT_PUBLIC_` variables. `VITE_GOOGLE_SCRIPT_URL` is also supported.

If no endpoint is configured, saves still work locally and remain queued with a sync error until the URL is added.

## Development

```bash
npm install
npm run dev
```

Open the project folder in VS Code:

```bash
code "/Users/juliamason/Documents/Sell to Trade"
```

## Sharing With The Team

For team use, deploy the app to a static host such as Vercel, Netlify, or Cloudflare Pages and share the hosted URL with your team. Use these build settings:

```bash
npm install
npm run build
```

- Build command: `npm run build`
- Publish/output directory: `dist`
- Environment variable: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`

The hosted app must use `https://` for phone installation and camera scanning.

After deployment:

- Android/Chrome: open the hosted URL and tap `Install` in the app or browser menu.
- iPhone/Safari: open the hosted URL, tap Share, then tap `Add to Home Screen`.

If the iPhone home-screen app does not load after an update, delete the old home-screen icon, open the hosted URL in Safari, refresh once, and add it to the home screen again. iOS can hold onto an older service worker cache longer than desktop browsers.

Each team member should enter their name in the `Team member` field at the top of the app before scanning. The app stores that name on their device and sends it with every saved scan.

The Google Sheet `Scans` tab records:

- `Timestamp`: created by Google Apps Script when the row is appended.
- `User`: the team member name from the app.
- `Scan ID`: unique ID for each saved scan.
- Item details, location, notes, status, and catalog inclusion.

This gives you a shared audit trail of who added what and when. It is name-based attribution, not a password login system.

## Production Build

```bash
npm run build
```

## Starter Kit Files

- `public/data/products_preload.json`: product preload used by the app.
- `google-apps-script/Code.gs`: Apps Script backend.
- `docs/sell_to_trade_google_sheet_template.xlsx`: two-tab Google Sheets import template.
- `docs/google_sheet_headers.csv`: original single-row header reference.
