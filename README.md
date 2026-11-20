<div align="center">

# Arda's Digital Workspace

**A personal portfolio and developer journal**<br>
for the projects I build around whatever sparks my curiosity: developer tools, privacy software, AI tooling and market analysis.

<br>

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MDX](https://img.shields.io/badge/MDX-content-1B1F24?style=flat-square&logo=mdx&logoColor=white)](https://mdxjs.com/)
[![Zod](https://img.shields.io/badge/Zod-4-3E67B1?style=flat-square&logo=zod&logoColor=white)](https://zod.dev/)

[![License: Artistic 2.0](https://img.shields.io/badge/License-Artistic_2.0-0298C3?style=flat-square)](LICENSE)
[![i18n: EN | TR](https://img.shields.io/badge/i18n-EN_%7C_TR-E30A17?style=flat-square)](messages)
[![Last commit](https://img.shields.io/github/last-commit/imardagokce/arda-portfolio?style=flat-square&color=4c1)](https://github.com/imardagokce/arda-portfolio/commits/main)
[![Repo size](https://img.shields.io/github/repo-size/imardagokce/arda-portfolio?style=flat-square&color=555)](https://github.com/imardagokce/arda-portfolio)

<br>

[Features](#features) · [Tech Stack](#tech-stack) · [Getting Started](#getting-started) · [Project Structure](#project-structure) · [Contributing](#contributing) · [License](#license)

</div>

---

## Features

| | |
| --- | --- |
| **Letterpress design** | Bone-coloured paper with a subtle grain, blood-red ink and sharp-cornered business cards, with Cormorant Garamond headings and Geist body text. |
| **Bilingual (i18n)** | Full English and Turkish support with locale-aware URL routing via `next-intl`. |
| **Light & dark themes** | Follows the system preference, with blood-red ink brightened for dark mode. All colours are defined as CSS variables. |
| **Business & playing cards** | Business cards for the hero, profiles and project pages, and playing cards for featured projects. The home orbit rotates only on click, arrow keys or swipe. |
| **Dealt projects deck** | Projects are dealt one by one as rounded playing cards. The suit reflects status and the rank reflects stars, with a "Deal again" action. |
| **Privacy & terms** | Privacy Policy and Terms of Use pages in both languages. No analytics or tracking cookies, so no cookie banner. |
| **Developer journal** | MDX-based project notes, validated at build time with Zod. |
| **GitHub integration** | Live repository stats, star counts and project status pulled from the GitHub API. |
| **SEO ready** | Per-locale metadata and dynamically generated Open Graph images. |
| **Hardened contact form** | Schema-validated input, per-IP and global rate limiting, and email delivery through Resend. |
| **Accessible motion** | Animations are built on CSS and native browser APIs, with no animation library, and respect `prefers-reduced-motion`. |

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) · [React 19](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) · [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography) |
| Content | [MDX](https://mdxjs.com/) via `next-mdx-remote` · `gray-matter` · [Shiki](https://shiki.style/) / `rehype-pretty-code` |
| Validation | [Zod](https://zod.dev/) |
| Localisation | [next-intl](https://next-intl.dev/) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Email | [Resend](https://resend.com/) |
| Icons | [Lucide](https://lucide.dev/) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.9 or later
- npm

### Installation

```bash
git clone https://github.com/imardagokce/arda-portfolio.git
cd arda-portfolio
npm install
```

### Environment variables

Create a `.env.local` file at the project root:

```env
# GitHub: live repository stats (a token raises the API rate limit)
GITHUB_USERNAME=imardagokce
GITHUB_TOKEN=your_github_token

# Contact form (Resend)
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_EMAIL=youremail@example.com
```

| Variable | Required | Description |
| --- | :---: | --- |
| `GITHUB_USERNAME` | — | GitHub account whose repositories are shown. Defaults to `imardagokce`. |
| `GITHUB_TOKEN` | — | Read-only token to raise the GitHub API rate limit. |
| `RESEND_API_KEY` | ✅ | API key used by the contact form. |
| `RESEND_FROM_EMAIL` | — | Sender address. Defaults to `onboarding@resend.dev`. |
| `CONTACT_EMAIL` | ✅ | Address that receives contact form messages. |
| `NEXT_PUBLIC_SITE_URL` | — | Public site address used for absolute links, the sitemap and share images. Defaults to the Vercel production URL. |

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server at [localhost:3000](http://localhost:3000). |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |

## Project Structure

```text
.
├── content/            # MDX project notes (en/, tr/)
├── messages/           # UI translations (en.json, tr.json)
└── src/
    ├── app/            # App Router routes ([locale]/…, api/contact)
    ├── components/     # UI components (NavBar, Footer, home sections…)
    ├── i18n/           # next-intl routing and request config
    ├── lib/            # Content loading, GitHub API, schemas, rate limiting
    └── proxy.ts        # Locale detection and redirects
```

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to set up the project, the checks to run and the commit conventions.

Found a security issue? Please follow the private reporting process in [SECURITY.md](SECURITY.md) instead of opening a public issue.

## License

Released under the [Artistic License 2.0](LICENSE).

<div align="center">
<sub>Copyright © 2026 Arda Gökçe Alkan</sub>
</div>
