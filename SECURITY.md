# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this repository, please report it privately rather than opening a public issue.

- **Preferred:** Open a [GitHub Security Advisory](https://github.com/Itachi7011/legitixy-frontend/security/advisories/new) for this repository (requires enabling private vulnerability reporting in repo settings — see the checklist in the project audit).
- **Alternative:** Contact the maintainer directly (add a security contact email here once designated).

Please include:
- A description of the vulnerability and its potential impact
- Steps to reproduce
- Any relevant logs, screenshots, or proof-of-concept code

## Scope

This repository is the frontend client only. It holds no secrets and performs no direct database access — all sensitive operations happen in [`legitixy-backend`](https://github.com/Itachi7011/legitixy-backend), which has its own `SECURITY.md`. If your finding involves the API, authentication, or data handling, please report it against the backend repository instead.

## Response

This is currently a small/independent project without a formal SLA. Reports will be acknowledged and triaged as soon as reasonably possible.

## Supported Versions

This project does not yet maintain multiple released versions — only the latest code on the default branch is supported.
