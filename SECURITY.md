# Security Policy

This document describes which versions of this project receive security fixes, how to report a vulnerability privately, and what to expect after you report one.

## Supported Versions

Security fixes are applied to the latest code on the `main` branch only. Older commits are not patched; update to the latest `main` to receive fixes.

| Version | Supported |
| --- | :---: |
| Latest `main` (v1.x) | :white_check_mark: |
| `old` branch (v1.0.0-old, previous interface) | :x: |
| Older commits | :x: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues, discussions or pull requests.**

Report them privately through GitHub's **Private Vulnerability Reporting**:

1. Open the repository's [**Security** tab](https://github.com/imardagokce/arda-portfolio/security).
2. Select **Advisories**, then **Report a vulnerability**.
3. Fill in the form. The report is visible only to you and the maintainer.

To help assess and fix the issue quickly, please include:

- The type of vulnerability (for example XSS, open redirect, header injection, rate-limit bypass).
- The affected file paths, routes or components.
- Step-by-step instructions to reproduce it.
- Any configuration needed, and a proof of concept if you have one.
- The potential impact and how an attacker could exploit it.

## Scope

**In scope**

- Source code in this repository, including the App Router pages, the `/api/contact` route, the locale proxy and the Markdown/MDX rendering pipeline.
- Handling of secrets and environment variables by the application code.

**Out of scope**

- Vulnerabilities in third-party services or dependencies themselves (GitHub API, Resend, npm packages). Please report those to their maintainers. Reports showing that this project uses a dependency in an unsafe way are welcome.
- Denial-of-service through high request volume, spam or social engineering.
- Findings from automated scanners without a demonstrated impact.

## Security Measures

The project already includes the following protections:

- **Input validation:** contact form submissions are validated against a strict Zod schema before any processing.
- **Rate limiting:** the contact endpoint enforces a per-IP limit and a global daily send limit.
- **HTML sanitisation:** Markdown fetched from GitHub READMEs is passed through `rehype-sanitize` before rendering.
- **Build-time content validation:** MDX frontmatter is validated with Zod during the build.
- **Secret handling:** API keys and tokens are read only from server-side environment variables and are never exposed to the client.
- **Dependency hygiene:** vulnerable transitive dependencies are pinned to patched versions through `overrides` in `package.json`.

## Response Process

This is a personal project maintained by one person, so response times may vary. As a guideline:

- Reports are acknowledged within **72 hours** where possible.
- Each report is then reviewed and its severity assessed as soon as possible.
- Confirmed issues are fixed with a priority that matches their severity.

You may be contacted for clarification while the issue is being investigated.

## Confidentiality

Vulnerability reports are handled privately from start to finish. The report, its details and the discussion around it stay between you and the maintainer, and fixed issues are not published as public advisories.

Please keep the details confidential as well: do not share them publicly or with third parties, even after a fix has been released. While testing, do not access, modify or delete data that does not belong to you. Good-faith research that follows this policy is welcome and appreciated.

Thank you for helping keep this project secure.
