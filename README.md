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


## November 2026 — white/black portfolio, writing and video demos

- Navigation now uses a compact, responsive white pill header with black active states.
- Typography uses Geist and Geist Mono, with a pure-white background and near-black text.
- Portfolio branding uses **Shriyans Denis Swamy** and links to Instagram [@chio_kun](https://www.instagram.com/chio_kun/).
- The homepage shows the three most recent articles in a technical-writing section.
- Public article list: \`/blog\`. Public article URL: \`/blog/<slug>\`.
- Private editor: \`/write\`. **Do not put your publishing credential in code or send it to anyone.**
- Article content is committed to \`public/blog-posts.json\` by the editor. Vercel's Git integration rebuilds after each commit, which means an article is live after its deployment completes, not instantly after clicking Publish.

### Publishing your first article

1. Sign into GitHub as \`Iam-Grim-Reaper\`.
2. Create a **fine-grained personal access token** under GitHub Settings → Developer settings → Personal access tokens. Restrict it to exactly one repo: \`shriyans-portfolio\`. Grant **Contents: Read and write**. Set an expiration date.
3. Open \`https://shriyans-ten.vercel.app/write\`. Paste the token into the password field. The token is held only in page memory, not stored in localStorage, cookies, or the repository.
4. Write the title, summary, category and Markdown article. Preview it; then publish.
5. Vercel automatically deploys the commit. Your article becomes visible at \`/blog/<slug>\` after the deployment succeeds.

The editor checks that GitHub's authenticated user is \`Iam-Grim-Reaper\` and GitHub independently enforces write permissions on the repository. Someone knowing the \`/write\` URL cannot publish without that credential. The token is transmitted directly to GitHub's API over HTTPS. Use a short-lived, repository-scoped token and revoke it if lost.

Markdown supported: headings (\`#\`, \`##\`, \`###\`), bullet lists, bold, inline code, fenced code with triple tilde (\`~~~\`), blockquotes, rules, and links. The renderer does **not** inject untrusted HTML. Keep images and video in projects, not inline in blog articles, for now.

### Adding project videos

The project visual component reads two optional fields in each object in \`src/data/portfolio.js\`:

\`\`\`js
videoUrl: 'https://.../demo.mp4', // or a full YouTube video URL
posterUrl: 'https://.../poster.webp', // optional poster for direct video
\`\`\`

For direct MP4/WebM videos the card plays the preview muted in a loop, with controls. YouTube links render as a privacy-enhanced embed. Without videoUrl, each project keeps its current pipeline visualization. Make video previews 16:9, ideally 1080p with legible on-screen text, 15–45 seconds long, compressed for quick loading. Only use media you own and have permission to publish. Remove personal data, internal credentials, and sensitive internship material. 
