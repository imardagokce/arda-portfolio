# Security Policy

This document describes which versions of this project receive security fixes, how to report a vulnerability privately, and what to expect after you report one.

## Supported Versions

Security fixes are applied to the latest code on the `main` branch only. Older commits are not patched; update to the latest `main` to receive fixes.

| Version | Supported |
| --- | :---: |
| Latest `main` | :white_check_mark: |
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

| Step | Target |
| --- | --- |
| Acknowledge the report | within **72 hours** |
| Initial assessment and severity | within **7 days** |
| Fix for confirmed issues | as soon as possible, depending on severity |

You will be kept informed of progress and may be contacted for clarification. Once a fix is released, the issue will be published as a GitHub Security Advisory, and you will be credited unless you prefer to stay anonymous.

## Responsible Disclosure

Please give the maintainer reasonable time to release a fix before sharing details publicly, and do not access, modify or delete data that does not belong to you while testing. Good-faith research that follows this policy is welcome and appreciated.

Thank you for helping keep this project secure.
