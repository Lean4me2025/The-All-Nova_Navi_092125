# Nova — Purpose Navigator

A lightweight MVP single-page app for discovering purpose traits and generating a snapshot.

## Features
- Hash-based routing (no server required) — fixes "index.html showing one screen" issues on deploy.
- Trait selection (up to 7), summary card, optional email capture (stored locally for MVP).
- CTA to Payhip (replace placeholder link).
- Clean CSS and accessible HTML.

## Quick Start
1. Deploy to Vercel/Netlify/GitHub Pages by dragging the folder.
2. Ensure **SPA/fallback** is enabled so routes like `#summary` work client-side.
3. Replace the Payhip link in `index.html` CTA.

## Suggested Enhancements
- Hook email capture to your provider (Resend/Mailgun).
- Add PDF generation (e.g., jsPDF) client-side.
- Persist profiles to a server or Airtable.

_Compiled on 2025-09-22._
