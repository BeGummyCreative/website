@AGENTS.md

## Project notes
- Static export site (`output: "export"`, unoptimized images). `npm run build` → `out/`, copied to `dist/`. Use npm, not pnpm.
- Projects are data-driven: add entries to `src/data/portfolio.ts`, assets under `public/portfolio/...`. Project pages come from `generateStaticParams` with `dynamicParams = false`.
- Deploy: manual `wrangler pages deploy out --project-name begummycreative --branch main --commit-hash <sha>` (begummycreative.com). The Pages project is NOT git-connected; pushing does not deploy. Ignore the separate `website` Pages project.
- `vercel.ts` / `.vercelignore` are legacy Vercel config.
- Never commit, push, or deploy without explicit confirmation.
- Contact form posts to Web3Forms. Its public access key must be in `.env.local` as `NEXT_PUBLIC_WEB3FORMS_KEY` when running `npm run build`; without it, Send falls back to opening the visitor's mail app.
