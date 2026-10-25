# WebDevPro Ultra Max 6 — clean reusable starter

A client-neutral, multi-page React + TypeScript + Vite + Tailwind website foundation. **It is intentionally NOT a client website yet.** Client contacts are blank and demo content is clearly labeled. The template does not include any previous client's logo, content, photos, telephone numbers, domain, Google map, app icon, testimonials or service worker cache identity.

## Start a new website (recommended flow)

1. Create a **new GitHub repository from a clean copy of this template**; never clone the previous client's live site.
2. Edit **`site.config.json`**: business identity, short name, tagline, unique client ID, services, hero slides, photos, FAQ, social accounts, verified contacts and map. Replace all `/brand/*-placeholder.*` assets with brand-specific local images. Avoid linking to third-party hosted logos.
3. Keep `mode: "starter"` during demos and PWA disabled. A starter demo is automatically `noindex` and has no client calls or fake contact-success claims.
4. Run `npm ci`, `npm run dev`. Check desktop and mobile views, navigation, images and WhatsApp steps.
5. Enter all known previous-client names, phone numbers, domains and asset identifiers into `rebrand-denylist.json`, then run `npm run check:clean`. Enter real client information, switch to `mode: "client-ready"`, then run `npm run check:release`. **A failed release check means do not launch.**
6. For PWA: add client-specific `192x192` and `512x512` PNGs under `public/brand/`, update `pwa.*` and enable `features.pwaEnabled` and `features.showInstallPrompt` **only after branding is final**. Change `pwa.cacheVersion` with each major PWA rebrand.
7. Build with `npm run build:release`, deploy to Vercel via the new GitHub repository and verify actual deployed pages (including hard-refresh and mobile installation).

## Commands

```bash
npm ci
npm run dev            # client-neutral local demo
npm run build          # starter/demo build, with noindex
npm run check:clean    # detect old client data and unsafe linked external media
npm run check:release  # strict pre-launch branding/content/assets gate
npm run build:release  # enforced release check + typecheck + production build
npm run lint
```

## Features

Seven page routes; responsive header and drawer, mobile bottom navigation, hero slider with robust typewriter and pause controls, scrolling animation, service cards, gallery, FAQ, testimonials (OFF until verified), contact form (WhatsApp/email handoff, NOT a pretend backend), map placeholder, conditional WhatsApp lead assistant, PWA support (OFF by default), client-specific SEO generation and Vercel SPA rewrite.

## Reliable deployment details

- Vercel Framework: Vite, Build Command: `npm run build`, Output: `dist`. When `mode: client-ready`, the build automatically runs the release gate; unresolved branding **fails the build**. `npm run build:release` is the recommended explicit launch build.
- `scripts/sync-brand.mjs` regenerates the SEO `<head>`, `public/manifest.json`, `public/offline.html`, `public/sw.js` and `public/robots.txt` and client-mode sitemap from `site.config.json` before `dev`/`build`. Do not hand-edit generated content. Dynamic site pages read the same file.
- No backend is included. Form submissions open WhatsApp or an email compose action; they do not store enquiries. For production email delivery, integrate a protected endpoint/service and confirm it really delivers before changing the UI text.
- Never point the website to an old client's Google Analytics, Search Console, Maps, payment gateway, database or contacts.
- Previous PWA installations may persist in a visitor's browser until the old service worker has been replaced and the user reloads. For an already-used hostname, test with a fresh browser profile and existing-user update flow.

Read **`REBRAND-CHECKLIST.md`** and **`WEBDEVPRO-ULTRA-MAX-6-MASTER-PROMPT.md`** before reusing.
