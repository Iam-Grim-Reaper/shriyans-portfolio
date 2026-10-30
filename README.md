# Shriyans Denis — AI Engineer Portfolio

A recruiter-facing portfolio built with React 19, Vite, Motion (formerly Framer Motion), and Lucide icons.

## Original implementation notes (v2.0)

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

## Recruiter-facing improvements (proposed)

- More direct professional headline and more focused case-study copy.
- Individual GitHub links where public source code exists.
- Distinction between demonstrated code and unverified performance claims; medical AI examples are research prototypes, not clinical products.
- Keyboard-accessible project dialogs with focus handling and Escape dismissal.
- Responsive navigation, skip link, reduced-motion support, and clearer project calls to action.
- Open Graph and social metadata, SVG favicon, and separated portfolio data module.

## Content verification before publishing

- Confirm education, internship dates, and certificates.
- Validate all project impact statements against tests, benchmarks, and technical evidence.
- The pneumonia repository contains differing EfficientNet definitions in `app.py` and `efficientnet_utils.py`; align architecture and model weights before calling the inference workflow deployment-ready.
- Add direct live-demo links only after confirming deployment availability.
- Verify the email address and LinkedIn profile link before publishing.

This revision leaves the default branch unchanged until the pull request is reviewed and merged.
