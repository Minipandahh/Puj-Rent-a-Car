# PUJ Rent a Car — Organized Website

## Folders

- `index.html` — readable semantic markup and website sections
- `css/styles.css` — formatted stylesheet
- `js/app.js` — main interactions, dates, modal and inquiries
- `js/fleet.js` — vehicle card rendering
- `js/vehicles.js` — sample inventory (names, prices, images)

## How to run

Because JavaScript uses ES modules, **do not open `index.html` through `file://`**.
Start a local server in the project folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

Alternatively, use the **Live Server** extension in VS Code.

## Before publishing

Replace demo car photos and prices, add your WhatsApp/email, add privacy and rental policies, and connect a real reservation backend. The reservation form currently **copies a request to the clipboard** and does not process bookings.
