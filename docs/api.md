# API Reference (Consumer Notes)

This frontend does not own an API — it is a client for [`legitixy-backend`](https://github.com/Itachi7011/legitixy-backend). Full endpoint documentation lives in that repository's [`docs/api.md`](https://github.com/Itachi7011/legitixy-backend/blob/main/docs/api.md).

## Current Integration Status

**None yet.** As covered in the [README](../README.md#current-status), `axios` is installed but not currently used anywhere in `src/`, and no component fetches data from the backend. This file documents what's available for the frontend to integrate against once that work starts.

## Base URL

Set via `VITE_API_URL` (see [`.env.example`](../.env.example)):

- Local: `http://localhost:5000` (or wherever your local backend instance runs)
- Production: `https://legitixy-backend.onrender.com`

## Endpoints Relevant to This Frontend

Based on `legitixy-backend`'s `routes/public.js`, these are the endpoints most likely to be consumed first by public-facing pages:

| Endpoint | Method | Likely used by |
|---|---|---|
| `/api/public/platformSettings` | GET | Global site config (e.g. maintenance mode, feature flags) |
| `/api/public/subscriptionPlans` | GET | A future pricing page |
| `/api/public/privacyPolicy` | GET | A future privacy policy page |
| `/api/public/termsOfService` | GET | A future terms of service page |
| `/api/public/notification-alerts/active` | GET | A future site-wide banner/alert component |
| `/api/public/enquiry` | POST | Contact/enquiry form (not yet built in this repo) |

Verify exact request/response shapes against `legitixy-backend`'s `docs/api.md` before implementing — this table is a starting map, not a contract.

## Recommended Integration Pattern

**RECOMMENDED ADDITION:** When integration work begins, introduce a small `src/api/` (or `src/services/`) layer wrapping `axios` with the `VITE_API_URL` base, rather than calling `axios.get(...)` ad hoc from components. This keeps error handling and base-URL configuration in one place.
