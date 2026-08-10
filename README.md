# Shriyans Denis — AI Engineer Portfolio

A recruiter-facing portfolio built with React 19, Vite, Motion (formerly Framer Motion), and Lucide icons.

## What's new in v2.0

- Migrated `framer-motion` → `motion` (the library's current name; `motion/react` import path)
- Pinned all dependency versions instead of `latest` for reproducible builds
- Added `vite.config.js` with the React plugin explicitly configured
- Project cards now open a full case-study modal (problem / approach / impact) on click
- Scroll progress bar, cursor-glow, parallax hero panel, magnetic buttons
- Scroll-triggered reveal animations extended across every section
- Dropped the unused `typescript` dependency (project has no `.ts` files)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

## Deploy on Vercel

1. Push this folder to a GitHub repository (see commands below).
2. Import the repository into Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`
5. Output directory: `dist`

## Before publishing

- Add direct GitHub repository URLs for each project.
- Add live-demo URLs if available.
- Add a downloadable resume PDF if desired.
- Add a professional photo only if it fits your preferred visual direction.
