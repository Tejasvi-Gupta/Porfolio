# Editing portfolio content

Update `content/profile.mjs` for personal details, education, achievements, certifications, contact address, focus text and skills. Each experience entry has its own status, role, dates and description. Reordering entries preserves their labels. The skill explorer matches core skill names against the stack arrays in `content/projects.mjs`. Keep technology names consistent. Add a symbol in `skillSymbols` if desired.

Each project needs a unique URL-safe id, name, category, tag, summary, stack, repository, problem, approach and verification notes. Retain existing IDs for stable URLs. Use a verified screenshot under `public/images/` or use a conceptual diagram cover (cloud, attendance or map). The project grid, detail routes, sitemap and command palette use the same project records.

The original outdoor photograph is `public/images/profile.webp`. The résumé viewer and download use `public/resume/Tejasvi_Gupta_Resume.pdf`. Keep evidence qualifications and review personal content before publication.

React sections live in `components/`. Shared visual tokens and motion styles live in `public/arctic.css` and `public/premium.css`. The premium motion controller is independent of the contact and navigation controller. After edits regenerate the portable preview, run CI checks locally and rebuild the export.
