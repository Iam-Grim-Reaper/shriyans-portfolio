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

## Visual direction — light editorial

The selected redesign uses warm off-white surfaces, ink typography, restrained blue accents, a display serif for headings, stronger whitespace, and illustrative process diagrams made from semantic markup. Project case studies now appear before experience, with the first project featured in a larger layout.

This direction intentionally favors legibility and recruiter usability over cursor effects or elaborate animation. The portfolio remains responsive and includes reduced-motion support. Verify the mobile layout, keyboard controls, and outbound links before merging the draft PR.

## October 2026 résumé synchronization

- The current PDF is included in the repository root as `Shriyans Denis Resume.pdf` and imported as a versioned Vite asset for View and Download links.
- Updated current role: Altaric Consulting, AI Intern (Sep 2026–present), including Bar Buddy backend, profile verification, and discovery workflows.
- Added TraceGraph AI as the featured project, linked to its public repository.
- Kept HistoDetect and the earlier pneumonia prototype as supporting projects; ISRO NRSC work remains in experience.
- Refreshed the technology categories and certification dates from the résumé.
- Added VJIT leadership activities to the recognition section.
- Use the résumé as the source for dates and experience scope. Validate specific technical performance claims against published code or reproducible results before adding them to the website.

Changing the résumé's bytes on GitHub will change its built asset URL on the next Vercel deployment. No separate cloud file hosting is required.
