# martshaw.com

Source for [www.martshaw.com](https://www.martshaw.com), a one-page portfolio built with Next.js 15 (App Router) and Tailwind CSS. It deploys on Vercel.

## Requirements

- Node.js 22
- pnpm (the version is pinned in `package.json` under `packageManager`; run `corepack enable` to use it)

## Commands

```bash
pnpm install       # install dependencies
pnpm dev           # dev server on http://localhost:3000
pnpm lint          # ESLint
pnpm build         # production build, including the type check
pnpm start         # serve the production build
```

CI should run `pnpm install --frozen-lockfile`, `pnpm lint` and `pnpm build` on every pull request and on pushes to `main`.

## Content

Copy lives in Markdown front-matter under `content/`, read by `src/lib/data.ts`:

- `profile.md`: name, title, location, email and summary
- `capabilities.md`: core capabilities
- `experience.md`: career history
- `work.md`: projects shown in the work section

Images for projects go in `public/`.

## Layout

- `src/app/`: App Router pages, layout, metadata routes and global CSS
- `src/components/`: React components (`ui/` holds shadcn/ui primitives)
- `src/lib/`: content loading and helpers
- `content/`: Markdown content
- `public/`: static assets
