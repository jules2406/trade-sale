Build a new mobile-first inventory scanner web app called “Sell to Trade.”

Goal:
Create a visually appealing, extremely user-friendly version of my scanner app for lighting inventory. It should preload products from the attached PRODUCT_LIST data and let users quickly add/inventory items into a shared Google Sheet, not just local storage. It should also export available items into a polished trade presentation/book.

Brand/UI:
- Clean luxury showroom feel.
- Charcoal, warm ivory, copper/gold accents.
- Large touch-friendly buttons.
- Mobile-first for warehouse/showroom scanning.
- Fast “scan/add/save” flow with minimal typing.
- Product cards with category, SKU, barcode, item name, retail price, trade price, storage location, condition, notes, and availability.

Core features:
1. Product preload/search
- Load products from products_preload.json or from the Google Sheets Products tab.
- Search by SKU, barcode, product ID, item name, category.
- Autofill product fields when selected.
- If barcode is scanned and product matches, auto-select the product.
- If no match, allow manual item creation.

2. Add/inventory flow
Fields:
- SKU
- Barcode
- Product ID
- Item Name
- Category
- Product Type
- Quantity
- Condition dropdown: New, Like New, Open Box, Seconds, Damaged, Missing Parts, Sample
- Storage Unit dropdown: Unit 12, Unit 37, Showroom, Warehouse, Other
- Subsection dropdown/text: Aisle, Shelf, Bay, Wall, Pallet, Bin
- Bin/Shelf exact location
- Notes
- Optional photo URL
- User
- Retail Price
- Trade Price
- Status: Available, Reserved, Sold, Needs Review, Not Available
- Presentation Include: Yes/No

3. Google Sheets sync
- Use Google Apps Script Web App endpoint.
- POST every saved scan/add to the Scans tab.
- GET products from the Products tab if configured.
- Show success/fail toast.
- Queue failed saves locally and retry sync when online.
- Keep a “Sync Status” indicator.

4. Easy categorization
- Quick category chips: Lamp Shades, Table Lamps, Wall Lights/Sconces, Pendants, Flush Mounts, Chandeliers, Floor Lamps, Accessories, Other.
- Quick storage buttons for Unit 12 / Unit 37 / Showroom.
- “Duplicate last location” toggle to speed up inventorying one storage section.

5. Inventory dashboard
- Counts by category, storage unit, condition, status.
- Search/filter table of all saved items.
- Edit/delete local entries before sync if needed.
- Export CSV.

6. Trade presentation/book export
- Select items marked Presentation Include = Yes and Status = Available.
- Group by category.
- Generate a polished PDF or slide-style HTML export with:
  - Cover page: Sell to Trade Available Inventory
  - Category sections
  - Product cards with item name, SKU, retail price, trade price, quantity, condition, notes, and optional image/photo URL
- Add a “Designer Inquiry” CTA.
- Export to PDF using browser print or a PDF generation library.

Google Apps Script backend:
Use the included Code.gs file. The Google Sheet needs tabs called Scans and Products. Scans should use the included google_sheet_headers.csv headers.

Technical requirements:
- React/Next.js preferred.
- TypeScript.
- Tailwind CSS.
- Use localStorage/IndexedDB for offline queue.
- Keep the Google Apps Script URL in an environment variable: NEXT_PUBLIC_GOOGLE_SCRIPT_URL.
- Do not expose private API keys.
- Include setup instructions in README.