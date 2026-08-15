# Architecture — Frontend

## Overview

`legitixy-frontend` is a client-rendered single-page application built with React 19 and Vite 7. It is one half of a two-repository system; the other half is [`legitixy-backend`](https://github.com/Itachi7011/legitixy-backend), a separate Express/MongoDB API.

## Request Flow

```
Browser
  │
  ▼
React SPA (Vite build, served by Netlify)
  │  fetch/axios calls to /api/*
  ▼
Netlify redirect rule (netlify.toml)
  │  proxies /api/* → https://legitixy-backend.onrender.com/api/:splat
  ▼
legitixy-backend (Express, on Render)
  │
  ▼
MongoDB
```

In local development, the same `/api` prefix is instead proxied by Vite's dev server directly to a local backend process (`vite.config.js`, currently pointed at `http://localhost:6000/`).

## State Management

- **Theme:** `ThemeContext` (React Context) drives dark/light mode, consumed in `App.jsx` to toggle a top-level `dark`/`light` class.
- **User/Socket contexts:** `UserContext.js` and `SocketContext.jsx` exist in `src/context/` but are **not currently imported anywhere in `App.jsx`** — they are not part of the active render tree. `SocketContext.jsx` also imports `socket.io-client`, which is not declared in `package.json`. Treat both as scaffolding for future work, not active architecture.
- **Reducers:** `src/reducers/UseReducer.js` exists as a reducer scaffold; its current consumers (if any) should be verified in-code before relying on it.

## Routing

Routing is handled by React Router v7 (`BrowserRouter`), with routes declared centrally in `src/App.jsx`. Currently registered routes:

| Path | Component |
|---|---|
| `/` | `Homepage` |
| `/family-laws` | `FamilyLaws` |
| `*` | `Error404` |

The `FamilyLaws` page links to a much larger set of paths (e.g. `/divorce-delhi`, `/child-custody`) that are **not yet registered as routes** — they currently resolve to the 404 handler. This is a content/route gap to close incrementally, not a routing bug.

## Error Handling

A dedicated set of error components lives in `src/components/Error/`: `Error400`, `Error401`, `Error403`, `Error404`, `Error500`, `Error503`, plus an `ErrorBoundary` component for catching render-time exceptions. Only `Error404` is currently wired into routing (as the catch-all route); the others exist as reusable components for surfaces that choose to render them (e.g. after a failed API call).

## Styling

Plain CSS files under `src/css/`, organized to mirror the component/page they style (e.g. `css/Public/Homepage.css`, `css/Components/Navbar.css`). No CSS framework (Tailwind, styled-components, etc.) is currently in use.

## Build & Deployment

- **Build tool:** Vite, using the SWC-based React plugin (`@vitejs/plugin-react-swc`) for fast refresh.
- **Hosting:** Netlify. `netlify.toml` defines two redirect rules: an API proxy (`/api/* → Render backend`) and an SPA fallback (`/* → /index.html`) so client-side routing works on full page loads/refreshes.

## Known Architectural Gaps

- No TypeScript, despite `@types/react`/`@types/react-dom` being present as dev dependencies (dead weight until TS is actually adopted).
- No test runner configured.
- No admin-facing UI, despite the backend exposing an admin API surface (commented-out references to `AdminNavbar`/`AdminSidebar` in `App.jsx` suggest this is planned).
