# WebDevPro Ultra Max 6 — mandatory zero-carryover rebrand checklist

**Non-negotiable:** A new client website MUST be created from the clean Ultra Max 6 starter, not from a previous client's live deployment. Run the release check and independently visually inspect the final site. The starter is deliberately labeled and `noindex` until all details are replaced.

## 1. Client identity — replace ALL surfaces

- [ ] Legal/trading business name, short name, slogan, company description, industry, services, unique client ID/slug
- [ ] Header and mobile drawer logo, footer logo, loading-screen logo, favicon, PWA icons, Apple touch icon
- [ ] Brand colors and typography (incl. splash/offline screen, browser theme, install card)
- [ ] Title, meta description, canonical URL, Open Graph title/URL/description/image if supplied, sitemap and robots policy
- [ ] Site/domain URLs and page links; no previous client's domains, email or WhatsApp targets
- [ ] Remove old client names, initials, icon file references, image alt text, mockups, captions, logo marks and non-visible text

## 2. All customer-facing content

- [ ] Home hero image for EVERY slide, slide text, tagline, calls to action; no source photos from previous customers
- [ ] About, services and each service detail, real locations, business hours, unique customer benefits
- [ ] Gallery photos and portfolio captions: genuine client's content or properly licensed new stock, with permission
- [ ] FAQ answers reflect actual client policies and commitments
- [ ] Testimonials are authentic, approved and attributed correctly. Keep disabled when none exist.
- [ ] Do not invent years in business, counts, customer ratings, guarantees, qualifications or certifications
- [ ] Check 404 pages, mobile footer, tooltips, form placeholders, success/error text and WhatsApp greeting

## 3. Contact + conversion routing

- [ ] Correct telephone and `tel:` link, full-country-code WhatsApp number, `wa.me` link, email and `mailto:`
- [ ] Correct business address, map embed, service areas, social handles, business opening hours
- [ ] Contact form dropdown service names, chat assistant service choices, outgoing message body
- [ ] Test phone, email, WhatsApp, social and other clickable links on **desktop and mobile**
- [ ] Never show “Message Sent” for a form that merely opens WhatsApp/email; verified real delivery only
- [ ] If backend integration added, confirm forms use new client database, API keys, storage and notifications

## 4. PWA + cache hygiene (high-risk)

- [ ] PWA OFF while rebranding. Remove inherited manifest names, icons, splash files and app installation copies.
- [ ] Rename `clientId` and `pwa.cacheVersion` uniquely; install prompt reads new brand and local icons.
- [ ] Regenerate manifest, `/offline.html`, `/sw.js`, meta theme and Android/Apple icons
- [ ] No previous client's cache namespace or cached photo URLs. Service worker uses network-first navigations.
- [ ] Test a **fresh visit**, **existing browser with old install**, home screen shortcut, offline screen and hard refresh.
- [ ] For a reused same origin, be aware an installed app or pre-existing browser cache may take a refresh or uninstall/reinstall before updating.

## 5. Code, hosting and external systems

- [ ] Repository name, project name, deployment hostname and Vercel project/client all correct
- [ ] Remove old analytics IDs, pixels, tracking scripts, chat widgets, booking/payment IDs and old API secrets
- [ ] Add previous-client names, numbers, domains, logos/image file IDs to `rebrand-denylist.json` and scan for legacy strings.
- [ ] Validate no other old company references in `src/`, `public/`, `index.html`, `site.config.json`, generated `dist/` or lock-screen assets
- [ ] Verify backend authorization, Row Level Security, audit logs and database tenants if integrating Supabase
- [ ] Confirm DNS updates affect WEBSITE records only; preserve existing MX/SPF/DKIM/DMARC unless explicitly authorized
- [ ] Check environment variables on Vercel, GitHub secrets, domain redirects, HTTPS, mobile viewport and canonical
- [ ] Ensure no site-builder badges, client-sensitive notes, watermarks or test accounts survive launch

## 6. Release protocol

```bash
npm ci
npm run check:clean
npm run lint
npm run typecheck
npm run check:release
npm run build:release
```

- [ ] All checks pass, no broken links or console errors; manually test every page, hero image and form path
- [ ] Client signs off copy/logos/photos where applicable; verify live URL after deployment
- [ ] Take screenshots of desktop/mobile for QA and check for any inherited visual identity
- [ ] Keep backup of approved new client assets and final client configuration

**If any old client's information remains, stop deployment and fix it.**
