# Helphub247 v7 (Demo-ready)
Next.js App Router, Tailwind, multi-chat UI, voice (UK), files/images, reviews, Terms/Privacy, Settings, and demo API routes.

## Deploy
1) Push to GitHub.
2) In Vercel: New Project → import → Framework: Next.js.
3) Add Env: `OPENAI_API_KEY` (optional for live AI), `OPENAI_MODEL` (e.g., gpt-4o-mini).
4) Deploy.

## Local
```
npm install
npm run dev
```

## Notes
- Without `OPENAI_API_KEY`, the app runs in **demo mode** (fake responses) so it always builds.
- Voice uses **browser speechSynthesis** with `en-GB` when available.
