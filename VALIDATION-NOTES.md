# Validation notes — WebDevPro Ultra Max 6 starter

Validated in the current packaging environment:

- New source files contain no old customer names, contact numbers, domains, legacy photographs or former logo paths from the submitted source.
- React/TypeScript source files are syntactically parseable (25 files, no syntax diagnostics).
- Brand metadata generator executes; starter HTML is `noindex` and does not register a PWA manifest.
- Local placeholder service/hero/gallery/logo/app-icon asset paths exist.
- `npm run check:clean` passes with the default empty `rebrand-denylist.json`. For a real rebrand, populate the denylist with known previous-client identifiers before running it.
- `scripts/check-release.mjs` refuses the unbranded starter, as intended.

**Not verified here:** End-to-end npm installation, TypeScript semantic typecheck, ESLint or Vite production compilation, because the environment cannot reach the npm registry to install missing dependencies. These are required on the development machine or connected deployment service before launching a client website.

Run `npm ci && npm run lint && npm run typecheck && npm run build` for starter validation. After filling in client identity and assets, set mode to `client-ready` and run `npm run build:release`. Test the deployed website, contact actions, PWA update flow and responsive layouts manually.
