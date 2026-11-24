# Arctic Glass V2.7 Production Edition

Tejasvi Gupta’s portfolio uses Next.js App Router, React, TypeScript and static export. The original outdoor portrait, NETRA screenshot and résumé are in `public/`. The homepage keeps the V2.6 Arctic Blue layout, themes, motion controls, keyboard commands and contact dialog. Project cover buttons open quick previews. Case study links open dedicated pages.

## Local setup

Use Node.js 24 LTS and npm. Run `npm ci` in the directory containing this README, then `npm run dev`. Open http://localhost:3000. Copy `.env.example` to `.env.local` for local overrides. Set `SITE_URL` to the site's public HTTPS origin for a release build. Without an explicit origin, Vercel’s production hostname is used when available. Local builds default to localhost.

## Build and check

Run `npm run typecheck`, `npm run lint`, `npm audit`, and `npm run build`. The build exports the homepage, project pages, favicon, sitemap and robots file to `out/`. Serve it locally with `python -m http.server 8000 --directory out`.

Run `npm run preview` to regenerate the portable, single-file `preview/index.html` with embedded media and case-study dialogs. For browser checks install Python 3, run `python -m pip install playwright`, `python -m playwright install chromium` and `npx playwright install chromium`. Run `npm run test:preview`, `npm run test:browser` and `python tests/static.py`. Set `CHROME_PATH` to an installed Chrome executable to use it with both test suites. Run Lighthouse against the served export with `npx lighthouse http://localhost:8000 --chrome-flags="--headless" --output=json --output-path=lighthouse.json`.

## GitHub and Vercel

1. Inspect `git status` inside this folder, review the public portfolio content and commit the project files, including `package-lock.json`. Keep local environment files and generated build output private.
2. When ready to publish, create the intended GitHub repository, add it as the remote and push the reviewed commit. GitHub Actions installs from the lockfile and runs the configured checks. The workflow has read-only repository permissions.
3. In Vercel, import that repository. Select the directory containing `package.json` as the root and the Next.js framework preset. Use Node.js 24, install with `npm ci`, build with `npm run build`, and use the framework’s output settings.
4. Set `SITE_URL` to the final origin. For direct contact delivery, add the three public EmailJS settings listed in `.env.example` and authorize the origin in EmailJS. Rebuild after environment changes. Deploy only when authorized.
5. Open a project URL directly and verify its canonical link, sitemap, résumé download, theme and contact flow on the deployed domain. Confirm delivery in the recipient inbox when enabling EmailJS.

See [content maintenance](docs/CONTENT_GUIDE.md), [contact setup](docs/EMAILJS_SETUP.md) and [verification results](docs/TEST_REPORT.md).
