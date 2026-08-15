# Legitixy — Frontend

Indian laws, court processes, and legal information, explained in plain language.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

**Live site:** https://legitixy.netlify.app
**Backend API repo:** https://github.com/Itachi7011/legitixy-backend

> This is the frontend client for Legitixy. The backend/API lives in a separate repository: [`legitixy-backend`](https://github.com/Itachi7011/legitixy-backend).

---

## Table of Contents

- [Why Legitixy Exists](#why-legitixy-exists)
- [Current Status](#current-status)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Backend Dependency](#backend-dependency)
- [Deployment](#deployment)
- [Testing](#testing)
- [Security](#security)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Why Legitixy Exists

Legal information in India is scattered across government portals, law-firm blogs, and forum threads, and it is rarely written for someone without a legal background. Legitixy's goal is to bring together core areas of Indian law — starting with family law — into a single, structured, easy-to-navigate reference, with a clear path to speaking with a professional when the reader needs one.

**Problem:** Finding accurate, structured, non-paywalled information about Indian legal processes (divorce, custody, maintenance, domestic violence protections, etc.) is difficult for the average citizen.

**Solution:** A content-driven web platform that organizes legal topics by category, with dedicated pages per subject. The intended design pairs this frontend with a backend API for dynamic content (subscription plans, notifications, enquiries) — that integration is not live yet; see [Current Status](#current-status).

## Current Status

This project is under active development. Being transparent about what exists today:

- **Implemented:** Homepage, a full Family Laws hub page (topic index for divorce, custody, maintenance, domestic violence, marriage registration, etc.), global Navbar/Footer, a floating action button, dark/light theming, and a full set of styled error pages (400/401/403/404/500/503) with an error boundary.
- **Linked but not yet built:** The Family Laws page links out to a large number of specific sub-topic pages (e.g. `/divorce-delhi`, `/child-custody`, `/498a-case-help`). Most of these routes are not yet registered in `App.jsx` and currently fall through to the 404 page — this is expected at the current stage, not a bug.
- **Present in code but not wired up:** `SocketContext.jsx` imports `socket.io-client`, which is **not listed in `package.json` dependencies**. This context is not currently imported by `App.jsx`. Treat real-time/socket functionality as **not yet implemented** — see [Roadmap](#roadmap).
- **No live API integration yet:** `axios` is listed as a dependency, but it is **not imported or used anywhere in `src/`** at the moment. The only reference to `VITE_API_URL` in the codebase is inside the unused `SocketContext.jsx`. In practice, the current frontend is fully static/presentational — it does not yet fetch subscription plans, notifications, or enquiry data from the backend, even though those endpoints already exist on the API side. Connecting the two is the next major milestone (see [Roadmap](#roadmap)).
- **No admin UI yet:** `App.jsx` has commented-out references to an admin navbar/sidebar. There is no admin-facing frontend in this repository yet, even though the backend has a substantial admin API surface.

## Features

- Responsive marketing homepage covering the platform's value proposition
- Family Laws hub with categorized sub-topics (divorce, custody, maintenance, domestic violence, marriage registration, and more)
- Dark/light mode via React Context (`ThemeContext`)
- Global navigation, footer, and floating action button
- Dedicated error pages for common HTTP failure states (400, 401, 403, 404, 500, 503) plus a React error boundary
- SEO basics: page title/meta tags, `robots.txt`, `sitemap.xml`

## Screenshots

_Add screenshots after capturing them locally — see [Visual Presentation](#visual-presentation) guidance in the project audit for exactly what to capture._

| Homepage | Family Laws Hub | Dark Mode |
|---|---|---|
| _screenshot_ | _screenshot_ | _screenshot_ |

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite 7 (with `@vitejs/plugin-react-swc`) |
| Routing | React Router v7 |
| HTTP client | Axios |
| Icons | lucide-react |
| Alerts/Modals | SweetAlert2 |
| Linting | ESLint 9 (flat config) |
| Hosting | Netlify |

> No TypeScript, testing framework, or CSS framework is currently configured, despite `@types/react` / `@types/react-dom` being present as dev dependencies. Those type packages currently have no effect since there's no `tsconfig.json` and no `.ts`/`.tsx` files — flagged here for accuracy rather than removed.

## Architecture

Legitixy is a two-repository, client-server application:

```
┌─────────────────────────┐        HTTPS / REST        ┌──────────────────────────┐
│   legitixy-frontend      │ ───────────────────────▶  │   legitixy-backend        │
│   React + Vite (SPA)     │ ◀───────────────────────  │   Node.js + Express       │
│   Hosted on Netlify      │        JSON over /api/*    │   Hosted on Render        │
└─────────────────────────┘                             └──────────┬───────────────┘
                                                                     │
                                                                     ▼
                                                          ┌──────────────────────┐
                                                          │   MongoDB (Atlas)     │
                                                          └──────────────────────┘
```

In production, Netlify proxies requests from `/api/*` on the frontend domain to the Render-hosted backend (see `netlify.toml`). In local development, Vite's dev server proxies `/api` to a local backend instance (see `vite.config.js`).

See [`docs/architecture.md`](./docs/architecture.md) for more detail.

## Project Structure

```
legitixy-frontend/
├── public/                  # Static assets served as-is (robots.txt, sitemap.xml, favicon)
├── src/
│   ├── assets/               # Static images/icons bundled by Vite
│   ├── components/
│   │   └── Error/             # Error400/401/403/404/500/503 + ErrorBoundary
│   ├── context/               # ThemeContext (in use), UserContext, SocketContext (not yet wired up)
│   ├── css/                   # Stylesheets, organized to mirror components/pages
│   ├── images/                # Page imagery (courts, homepage visuals, logos)
│   ├── pages/
│   │   └── Public/             # Homepage, FamilyLaws
│   ├── reducers/               # UseReducer.js
│   ├── App.jsx                 # Route definitions
│   └── main.jsx                 # App entry point
├── netlify.toml               # Netlify build + API proxy redirects
├── vite.config.js             # Vite config + local dev API proxy
└── eslint.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A running instance of the [backend API](https://github.com/Itachi7011/legitixy-backend) (local or the hosted one)

### Installation

```bash
git clone https://github.com/Itachi7011/legitixy-frontend.git
cd legitixy-frontend
npm install
```

### Local Development

```bash
npm run dev
```

By default, Vite's dev server proxies requests made to `/api` to `http://localhost:6000/` (see `vite.config.js`). Update that proxy target if your local backend runs on a different port.

## Environment Variables

Create a `.env` file in the project root (see [`.env.example`](./.env.example)):

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Yes | Base URL of the backend API the frontend calls (e.g. `http://localhost:5000` locally, or the Render URL in production) |

> `.env` is git-ignored by design. If `.env.example` is ever missing from the repo, it's very likely an accidental `.gitignore` match rather than intentional — this table is the source of truth for what belongs in it.

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `npm run dev` | `vite` | Start the local dev server with HMR |
| `npm run build` | `vite build` | Production build to `dist/` |
| `npm run lint` | `eslint .` | Run ESLint over the project |
| `npm run preview` | `vite preview` | Preview the production build locally |

There is currently no `test` script — see [Testing](#testing).

## Backend Dependency

The backend already exposes endpoints for subscription plans, notifications, platform settings, and enquiries (see [`legitixy-backend`](https://github.com/Itachi7011/legitixy-backend)), but **this frontend does not call them yet** — there is currently no live API integration in `src/`. Today, this repository runs as a static/presentational site. See [`docs/api.md`](./docs/api.md) for what's available to integrate against once that work begins.

## Deployment

- **Frontend:** Deployed on [Netlify](https://netlify.com). `netlify.toml` configures an SPA fallback (`/* → /index.html`) and proxies `/api/*` to the Render-hosted backend.
- **Backend:** Deployed on [Render](https://render.com), per the URL referenced in `netlify.toml` (`legitixy-backend.onrender.com`).

**RECOMMENDED ADDITION:** Document the Netlify build command/output directory and any Netlify environment variable setup explicitly in this section once confirmed, and add a CI status badge once `.github/workflows/ci.yml` is merged and run at least once.

## Testing

**No automated tests currently exist in this repository** (no test runner is configured, and there is no `test` script in `package.json`). This is stated plainly rather than implied — do not assume test coverage exists.

**RECOMMENDED ADDITION:** Introduce Vitest + React Testing Library for component tests, starting with the Error components (they're pure and presentational, so they're the cheapest place to start).

## Security

See [`SECURITY.md`](./SECURITY.md) for how to report a vulnerability.

General notes specific to this frontend:
- No secrets belong in this repository. The only frontend-side config value is `VITE_API_URL`, which is not sensitive.
- All authentication, authorization, and sensitive data handling happens on the backend.

## Roadmap

See the [Roadmap](#) in the project audit, or track progress via [GitHub Issues](https://github.com/Itachi7011/legitixy-frontend/issues).

## Contributing

Contributions are welcome. Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) before opening a PR.

## License

Licensed under the [MIT License](./LICENSE).
