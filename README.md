# Micro-SaaS Starter Kit

Build and ship your SaaS faster with a production-ready Next.js starter designed to be sold, customized, and deployed with low support overhead.

## Why this starter exists
Most starter kits give you code. This package gives you **code + product packaging + launch operations** so you can:
- launch faster,
- reduce setup friction for buyers/teams,
- and confidently sell a paid starter via Gumroad.

## What is included
- Modular Next.js + TypeScript architecture
- Auth, dashboard, billing, and admin module foundations
- Prisma + SQLite default local setup
- Deterministic CI checks and test scaffolding
- Product docs (getting started, architecture, troubleshooting, FAQ)
- Sales docs and launch assets for paid distribution
- Release automation for versioned ZIP delivery

## Lite vs Pro vs Team
| Package | Positioning | Includes |
| --- | --- | --- |
| **Lite** | Public repo / trust-building | Core architecture, auth, basic dashboard, docs preview |
| **Pro** | Paid ZIP for builders | Billing + admin modules, deploy automation guidance, advanced docs, release templates, support templates |
| **Team** | Commercial/team license | Pro + team onboarding docs, agency-friendly usage model, priority support placeholder |

> This repository is structured to support all three commercial tiers with clear messaging and delivery artifacts.

## Quick start
1. Install dependencies: `pnpm install`
2. Copy environment: `cp .env.example .env`
3. Generate Prisma client: `pnpm prisma:generate`
4. Run migrations: `pnpm prisma:migrate`
5. Seed local data: `pnpm prisma:seed`
6. Start dev server: `pnpm dev`

Then open `http://localhost:3000`.

## Running in Codespaces
1. Open this repo in GitHub Codespaces.
2. Wait for devcontainer bootstrapping.
3. Run:
   - `pnpm install`
   - `cp .env.example .env`
   - `pnpm prisma:generate`
   - `pnpm prisma:migrate`
   - `pnpm prisma:seed`
   - `pnpm dev`

## Project structure
- `app/` — Next.js App Router entry points
- `core/` — runtime config and shared helpers
- `modules/` — domain modules (`auth`, `billing`, `dashboard`, `admin`)
- `src/` — reusable exports/utilities
- `docs/` — onboarding, architecture, sales, launch docs
- `scripts/` — automation scripts
- `.github/` — CI, release, issue/PR templates

## Who this is for
- Indie founders validating SaaS ideas quickly
- Freelancers and agencies delivering client MVPs
- Teams standardizing internal SaaS scaffolds
- Creator-founders selling paid starter kits

## Roadmap
- Additional deployment playbooks
- More module-level extension examples
- Extended billing/webhook operations guides
- Multi-tenant team examples for Team tier

## Buy / Upgrade CTA
- **Lite (public):** use this repository as the evaluation version
- **Pro (paid):** Gumroad checkout placeholder → `https://gumroad.com/l/your-product`
- **Team (license):** contact placeholder → `founder@yourdomain.com`

See:
- `docs/sales/gumroad.md`
- `docs/sales/pricing.md`
- `docs/sales/lite-vs-pro.md`
- `docs/sales/launch-checklist.md`
