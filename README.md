# Arda's Digital Workspace

A personal portfolio, blog, and digital garden focusing on Linux, open source, privacy, and modern web technologies.

## 📸 Preview

![Preview of the portfolio](https://via.placeholder.com/1200x630.png?text=Portfolio+Preview)

## ✨ Features

- **Minimalist & Premium Design**: A clean, distraction-free reading and browsing experience with smooth micro-interactions.
- **Internationalization (i18n)**: Full support for both English and Turkish with flawless URL routing.
- **Dark Mode**: Carefully crafted deep dark theme with elegant golden typography accents.
- **Developer Log**: A dedicated section to document architectural decisions, daily progress, and code snippets.
- **GitHub Integration**: Live repository and star count fetching via GitHub API.
- **SEO Optimized**: Fully dynamic Open Graph metadata and search engine optimized pages.

## 🛠️ Technologies Used

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [MDX](https://mdxjs.com/) with next-mdx-remote
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/imardagokce/arda-portfolio.git
cd arda-portfolio
npm install
```

Set up your environment variables by creating a `.env.local` file at the root of the project:

```env
# Optional: GitHub token to increase API rate limit for fetching live repository stats
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME=imardagokce

# Email configurations for contact form
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_EMAIL=youremail@example.com
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
