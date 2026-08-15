# Development Guide — Frontend

## Prerequisites

- Node.js 18+ and npm
- A running backend instance — either the hosted one (`https://legitixy-backend.onrender.com`) or a local checkout of [`legitixy-backend`](https://github.com/Itachi7011/legitixy-backend)

## Setup

```bash
git clone https://github.com/Itachi7011/legitixy-frontend.git
cd legitixy-frontend
npm install
cp .env.example .env   # then fill in VITE_API_URL
```

## Running Locally

```bash
npm run dev
```

This starts the Vite dev server with hot module replacement. Requests to `/api/*` are proxied to `http://localhost:6000/` by default (see the `server.proxy` block in `vite.config.js`) — update that value if your local backend listens on a different port, or rely on `VITE_API_URL` for API calls that use the full base URL directly via Axios.

## Linting

```bash
npm run lint
```

Runs the flat-config ESLint setup (`eslint.config.js`), which includes `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`. Fix reported issues before opening a PR.

## Building for Production

```bash
npm run build
```

Outputs a production bundle to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Adding a New Page

1. Create the component under `src/pages/Public/` (or a new subfolder if it's a different area, e.g. an eventual `Admin/`).
2. Add the corresponding stylesheet under `src/css/`, mirroring the folder structure.
3. Register the route in `src/App.jsx`.
4. If the page is public-facing, add it to `public/sitemap.xml`.
5. If it's one of the sub-topic pages already linked from `FamilyLaws.jsx` (e.g. `/child-custody`), double check the path matches exactly what's already referenced there.

## Testing

There is currently no test runner configured. If you're adding tests as part of a contribution, propose the tooling choice (Vitest is a natural fit given the Vite build) in an issue first so it isn't done twice.

## Environment Variables

See the [README's Environment Variables section](../README.md#environment-variables) — there is currently exactly one: `VITE_API_URL`.
