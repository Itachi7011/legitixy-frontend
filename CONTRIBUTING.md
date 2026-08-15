# Contributing to Legitixy (Frontend)

Thanks for your interest in contributing. This document covers how to get set up and how to submit changes.

> Legitixy is a two-repo project. This file covers the **frontend**. For API/backend changes, see [`legitixy-backend`](https://github.com/Itachi7011/legitixy-backend)'s `CONTRIBUTING.md`.

## Getting Started

1. Fork the repository and clone your fork.
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and set `VITE_API_URL` to point at a running backend (local or hosted).
4. Start the dev server: `npm run dev`

## Before You Open a PR

- Run `npm run lint` and fix any issues it reports.
- Run `npm run build` to confirm the production build succeeds.
- Keep PRs focused — one feature or fix per PR is much easier to review than a bundle of unrelated changes.
- If you're adding a new route, wire it into `src/App.jsx` and add a corresponding entry to `public/sitemap.xml` if it's a public page.

## Commit Messages

Use clear, descriptive commit messages. Conventional prefixes are appreciated but not required, e.g.:

```
fix: correct navbar overflow on small screens
feat: add child-custody sub-topic page
docs: update environment variable table
```

## Reporting Bugs / Requesting Features

Please use the issue templates under `.github/ISSUE_TEMPLATE/`.

## Code Style

- Follow the existing ESLint configuration (`eslint.config.js`) — don't disable rules inline without a good reason noted in a comment.
- Match the existing file organization: pages under `src/pages/`, shared UI under `src/components/`, styles under `src/css/` mirroring the component/page they style.

## Scope Note

Several sub-topic pages are linked from the Family Laws hub but not yet built (they currently 404). If you'd like to build one, please open an issue first so effort isn't duplicated.

## Code of Conduct

This project follows the [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold it.
