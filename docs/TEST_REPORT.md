# Arctic Glass V2.7 verification

Tested on 24 November 2026 with Windows, Node.js 23.7.0, npm 11.6.1 and local Chrome. Source edits were made in the Desktop portfolio. Installation and the production build used a separate copy on D: due to limited space on C:. CI is configured for Node.js 24 LTS. Local npm reported a Node engine warning for a development lint dependency.

| Check | Observed result |
| --- | --- |
| Installation | npm installed the dependencies after a network retry. The lockfile passed an offline npm ci dry run. |
| TypeScript | Standalone typecheck and Next.js build checks passed. |
| ESLint | Final lint passed with zero warnings or errors. |
| Production | Next.js 16.4.6 static export passed. All four project routes generated. |
| Security audit | npm audit reported zero known dependency vulnerabilities. |
| Production Playwright | Five passed. Tested 320, 390, 768 and 1440 px layouts, persistent themes, filters, skill selection, contact dialog, draft encoding, résumé viewer/download, detail links, quick navigation and public endpoints. |
| Preview Playwright | Smoke, premium and contact suites passed. Covered pointer lighting, motion controls, reduced motion, responsive navigation, dialogs, command search, clipboard success and both fallback paths, form validation, mocked delivery success and failure. |
| Static HTTP | Passed document, asset, anchor, ID, alternative text and external-link checks. All four project pages and the PDF served successfully. |
| Asset preservation | Compared original portrait, project screenshot and résumé against the supplied ZIP. All three matched byte for byte. |
| Mobile Lighthouse | Local exported homepage: performance 69, accessibility 100, best practices 100, SEO 100. LCP 4.8 s, total blocking time 520 ms, cumulative layout shift 0. |

The main remaining measured issue is mobile performance. The site serves smaller photo and screenshot variants to narrow screens and reduces mobile glass blur. A production CDN with compression and caching may yield different scores. Re-run Lighthouse against the published origin.

Direct EmailJS delivery was exercised with a mock transport. Live inbox receipt, external project availability, hosted GitHub Actions and Vercel deployment remain unverified. No message was sent and no deployment was performed.
