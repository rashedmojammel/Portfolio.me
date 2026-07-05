# Rashedul Alam — Portfolio (Next.js)

Your original HTML/CSS/JS portfolio, converted to a **Next.js 15 (App Router)**
project with a component-based, maintainable folder structure. The visual
design is untouched — `styles.css` and `theme-aurora.css` were carried over
exactly as they were.

## 1. Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## 2. Add your images/PDFs

Your original `img/` folder (photos, certificates, resume/CV PDFs) wasn't
part of this upload, so `public/img/` is currently empty. Copy your real
`img` folder contents into:

```
public/img/
```

Paths already match what's referenced in the code (e.g. `/img/formal photo.png`,
`/img/Rashed_Mojammel_CV.pdf`, `/img/AIUB_Certificate.jpg`, etc.) — so once the
files are in place, everything (hero slider, education documents, resume/CV
download buttons) will just work.

## 3. Folder structure

```
app/
  layout.js          → <html>/<head> shell, fonts, Font Awesome/Boxicons CDN
  page.js             → assembles the whole page from section components
  globals.css         → imports styles.css (design system, unchanged)
  styles.css          → your original stylesheet (unchanged)
  theme-aurora.css     → your alternate theme (unchanged, currently unused —
                          uncomment the import in globals.css to enable it)

components/
  layout/             → Header, Footer, Loader, ScrollProgress, CustomCursor, BackToTop
  home/                → Hero, SkillsOrbit (orbiting icon animation), ImageSlider,
                          ParticleBackground
  sections/            → About, Academic, Portfolio, Skills, Certificates,
                          Hobbies, Contact, VideoCV — one file per page section
  modals/              → ProjectModal (portfolio project popups), EduModal
                          (education document viewer)
  ai-chat/              → AIChatWidget — the "Ask Me Anything" floating chat
  ui/                   → Reveal (scroll-in-view animation wrapper), textFormat
                          (small **bold** markdown → JSX helper)

data/
  siteConfig.js         → nav links, socials, contact info, resume/CV paths —
                          edit this file to change info shown across the site
  projects.js            → all 6 portfolio project cards + modal content
  education.js            → education timeline + basic/soft skills lists
  academicHighlights.js     → "Campus Moments" cards
  skillsData.js             → "Earned Skills" category cards
  skillsOrbit.js             → orbiting skill icons + hero image slider + typing roles
  certificates.js             → certificate cards
  hobbies.js                   → gaming + movies hobby content
  aiResponses.js                → AI chat's local knowledge base (keys → answers)

hooks/
  useTypingRoles.js       → the hero role-typing effect
```

## 4. How to edit things

- **Add a new project** → open `data/projects.js`, copy one object, change the
  fields. It shows up on the Portfolio grid and its modal automatically.
- **Update education/CGPA** → `data/education.js`.
- **Change nav links, socials, email/phone, resume/CV file paths** →
  `data/siteConfig.js`.
- **Teach the AI chat something new** → add a `{ keys: [...], answer: '...' }`
  entry to `data/aiResponses.js`.
- **Change the visual design** → `app/styles.css` (same file as before, same
  class names — all components use the original classNames).

## 5. Notes on the conversion

- All vanilla JS behavior from `scirpt.js`, `ai-chat.js`, and `home-skill.js`
  was ported into React using hooks (`useState`/`useEffect`) instead of
  direct DOM manipulation — e.g. the theme toggle, mobile nav, scroll-reveal
  animations, custom cursor, particle background, 3D card tilt, skill card
  shimmer, typing effect, image slider, and the AI chat's message/typing logic.
- `video_cv.js` (the `#videoCv`/`#videoCvOverlay` play/pause script) didn't
  correspond to any markup in the uploaded `index.html` — the actual "Video CV"
  section there uses a YouTube iframe embed instead, which is what
  `components/sections/VideoCV.jsx` implements. If you have a self-hosted
  video-with-overlay version elsewhere, let me know and I'll wire that up too.
- The contact form still posts to your existing Google Apps Script URL
  (see `data/siteConfig.js` → `GOOGLE_SHEET_SCRIPT_URL`).
- Modal/animation classes (`.open`, `.revealed`, `is-open`, etc.) are the same
  ones your CSS already targets, so no styling was rewritten.

## 7. Smoothness upgrades

- **Lenis** (`components/layout/SmoothScroll.jsx`) — inertia-based smooth
  scrolling site-wide, plus eased scrolling for the nav's `#anchor` links.
  Skips itself automatically if the OS has "reduce motion" turned on.
- **Custom cursor & 3D card tilt** now check `(pointer: fine)` and
  `prefers-reduced-motion` before running, instead of always running
  regardless of device.
- **`next/image`** replaces plain `<img>` for the hero slider, project
  thumbnails, profile photo, and academic cards — automatic lazy loading,
  responsive sizes, and compression.
- **`next/font`** self-hosts Cormorant Garamond & DM Sans instead of loading
  them from a Google Fonts `<link>` tag — removes a render-blocking request
  and the flash-of-unstyled-text.
- **`next/dynamic`** code-splits the Certificates and Hobbies sections and
  fully defers the AI chat widget (`ssr: false`) so they're not part of the
  critical first-load bundle.
- A global `prefers-reduced-motion` media query in `globals.css` shortens
  every CSS animation/transition to near-zero for anyone who's asked for it.

## 8. Deploying

This is a standard Next.js app — deploys straight to Vercel:

```bash
npx vercel
```

or connect the repo in the Vercel dashboard.
