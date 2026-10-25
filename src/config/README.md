# Single-source client rebranding

Change `site.config.json` in the repository root. The pages, chat assistant, footer, hero, contact details, PWA installation card, navigation and static metadata all read from it.

- Leave empty contact details blank until verified; links are hidden instead of accidentally calling the previous client's number.
- Place new image/logo files under `public/brand/`, use paths such as `/brand/new-logo.png`.
- PWA is **off** in the clean starter. Enable it only once the logo, app icons, short name, manifest and client domain are verified.
- After entering client details, run `npm run check:release`. A failing release check is a BLOCKER, not a warning.
