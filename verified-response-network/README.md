# Verified Response Network (VRN) — Zip-ready Vercel Project

This is a Vite + React + Tailwind site with:
- Home page (disaster + location search UI)
- Sign up + provider onboarding application
- About page (verification process + liability language)

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel (recommended)
1. Push this folder to a GitHub repository
2. In Vercel: **New Project** → Import the repo
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

## Notes
- The search results are demo data. Replace `MOCK_RESULTS` with your database/API.
- The sign-up form is front-end only. Wire it to Airtable/Supabase/Zapier or a Vercel serverless function.
