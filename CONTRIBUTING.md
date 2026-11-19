# Contributing

Thanks for your interest in improving this project! This is a personal portfolio site, so the scope for contributions is a little narrower than in a typical open-source library.

**Welcome contributions**

- Bug fixes
- Accessibility improvements
- Translation fixes (English and Turkish)
- Documentation improvements

**Please open an issue first** for design, layout or content changes, new features, or new dependencies, so we can agree on the direction before you spend time on it.

## Getting Started

### Prerequisites

- Node.js 20.9 or newer (required by Next.js 16)
- npm (the repository ships a `package-lock.json`)

### Install and run

```bash
git clone https://github.com/imardagokce/arda-portfolio.git
cd arda-portfolio
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Paths without a locale prefix are redirected to `/en` or `/tr`.

### Environment variables

All variables are optional for local development. Put local values in `.env.local` at the project root; `.env*` files are git-ignored. Never commit secrets.

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | Raises the GitHub API rate limit. A token with no scopes is enough for public repositories. |
| `GITHUB_USERNAME` | GitHub account whose repositories are shown (defaults to `imardagokce`). |
| `RESEND_API_KEY` | Enables sending email from the contact form. Without it, the form simulates sending. |
| `RESEND_FROM_EMAIL` | Sender address used by Resend. |
| `CONTACT_EMAIL` | Address that receives contact form messages. |

## Project Structure

```text
src/
  app/[locale]/         Pages (App Router), one route tree per locale
  app/api/contact/      Contact form API (Zod validation, rate limiting, Resend)
  components/           Shared UI components (home page sections in components/home/)
  i18n/                 next-intl routing and request config
  lib/                  GitHub API, Markdown rendering, schemas, helpers
  proxy.ts              Request interceptor (locale routing)
messages/               UI translations: en.json, tr.json
content/<locale>/projects/   Optional per-project dev notes (.mdx)
```

The stack is Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4 with `@tailwindcss/typography`, next-intl, Zod, Resend and next-mdx-remote.

## Making Changes

1. Fork the repository and create a branch from `main` with a descriptive name (for example `fix/navbar-focus` or `i18n/tr-typos`).
2. Keep each pull request focused on a single change.

### Translations

- Translations live in `messages/en.json` and `messages/tr.json`.
- **Every key must exist in both files.** When you add, rename or remove a key, update both.
- Supported locales are `en` (default) and `tr`, configured in `src/i18n/routing.ts`.

### Projects and content

- Project pages are driven by the GitHub API (`src/lib/github.ts`).
- A project's status badge comes from its repository topics (`active`, `nearly-finished`, `completed`, `idea`, `planned`, `paused`, `archived`); see `src/lib/project-status.ts`. Status labels are translated under `status` in the message files.
- Optional dev notes for a project go in `content/<locale>/projects/<slug>.mdx`. Frontmatter is validated by `ProjectFrontmatterSchema` in `src/lib/schemas.ts` (`title` is required; `description` and `date` are optional).
- GitHub READMEs and release notes are rendered as sanitised Markdown (`src/lib/github-markdown.ts`), not as MDX.

### Next.js 16 gotchas

This project uses Next.js 16, which differs from older versions in APIs, conventions and file names. Check the bundled docs in `node_modules/next/dist/docs/` rather than relying on older guides.

- The request interceptor is `src/proxy.ts`. The old `middleware.ts` file name is deprecated in Next.js 16; do not reintroduce it.

### Styling and accessibility

- Styling uses Tailwind CSS v4; global styles are in `src/app/globals.css`.
- Keep both the light and dark themes working.
- Respect `prefers-reduced-motion`: animations must have a reduced or no-motion fallback.
- Keep the UI accessible: full keyboard navigation, visible focus states, and sufficient colour contrast.

## Checks Before Opening a PR

There is no automated test suite yet. Before opening a pull request, make sure these pass locally:

```bash
npx tsc --noEmit   # type check
npm run lint       # ESLint
npm run build      # production build
```

For UI changes, also check the affected pages manually in both locales, both themes, and at mobile width.

## Commit Messages

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) style, written in English and in the imperative mood:

```text
feat: add mobile navigation menu
fix: redirect paths without a locale prefix
docs: update contributing guide
```

Common types: `feat`, `fix`, `refactor`, `perf`, `style`, `chore`, `docs`.

## Pull Requests

- Describe what changed and why, and link the related issue.
- Include screenshots (light and dark theme) for visual changes.
- Confirm that the checks above pass.
- Keep unrelated formatting or refactoring out of the PR.

## Reporting Bugs

Open a GitHub issue with steps to reproduce, the expected and actual behaviour, the affected page and locale, and your browser and OS.

## Security

**Do not report security vulnerabilities in public issues.** Use GitHub's private vulnerability reporting instead, as described in [SECURITY.md](SECURITY.md).

## Licence

By contributing, you agree that your contributions will be licensed under the [Artistic License 2.0](LICENSE), the same licence as the project.
