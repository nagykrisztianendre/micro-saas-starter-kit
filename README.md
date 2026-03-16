# Micro-SaaS Starter Kit

Ship a production-grade SaaS foundation in days, not months, with a modular Next.js + TypeScript starter kit built for real products.

**Built for developer-founders and product teams who want a credible architecture, not a toy template.**

- ✅ Authentication, organizations, and dashboard flows
- ✅ Billing, admin, API keys, audit logs, and feature flags architecture
- ✅ Deterministic local setup and CI-friendly workflows
- ✅ Launch docs for packaging, demo, onboarding, and support

**Buy Pro (placeholder):** `https://gumroad.com/l/your-product`

**Screenshots:** See `docs/launch/screenshots.md` for planned capture list.

## Why this starter kit

- **Faster launch:** Start with known-good architecture and practical defaults.
- **Lower risk:** Deterministic setup and test/build conventions reduce "works on my machine" issues.
- **Easier customization:** Modules are separated by domain, so teams can extend safely.
- **Built to sell:** Includes launch, documentation, and onboarding materials for productized delivery.

## Feature highlights

- Next.js App Router + TypeScript baseline
- Prisma-ready data layer with migration/seed workflow
- Auth module with clear service/repository boundaries
- Billing/admin extension points for paid SaaS paths
- Teams, API keys, audit logs, and feature-flag documentation surfaces
- Email provider abstraction and local mock workflow
- Release and launch docs for paid product packaging

## Architecture overview

The repository follows a module-first structure to keep domain logic isolated and maintainable:

- **Route/UI boundaries:** framework-specific page + route handlers
- **Domain services:** business logic and use-case orchestration
- **Repository interfaces:** swappable data adapters (runtime vs test)
- **Shared runtime core:** configuration, helpers, and cross-module utilities

Read more in `docs/architecture.md` and `docs/modules.md`.

## What you can build with it

- B2B SaaS with organization/team accounts
- Internal admin-enabled subscription products
- API-first products with API key management flows
- Products that need auditability, access control, and staged feature rollout
- Commercial templates or client accelerators for agencies

## Quick start

1. `pnpm install`
2. `cp .env.example .env`
3. `pnpm prisma:generate`
4. `pnpm prisma:migrate`
5. `pnpm prisma:seed`
6. `pnpm dev`
7. Sign in with seeded users from `docs/demo-data.md`

## Project structure

```text
app/                      # Next.js App Router entrypoints
core/                     # Shared runtime config and utilities
modules/                  # Domain modules (auth, billing, dashboard, admin)
prisma/                   # Prisma schema and migrations
src/                      # Shared exports/utilities
scripts/                  # Automation helpers
examples/demo-saas/       # Example application notes
docs/                     # Product, setup, launch, and support documentation
```

## Lite vs Pro

| Package | Best for | Includes |
| --- | --- | --- |
| Lite (public) | Evaluating architecture and coding style | Core architecture, auth, dashboard preview, limited docs |
| Pro (paid) | Shipping a production SaaS faster | Full module set, teams, API keys, email system, audit logs, feature flags, production/deployment docs |
| Team License (optional) | Agencies and internal teams | Pro + commercial/team usage terms + priority support placeholder |

Full comparison: `docs/sales/lite-vs-pro.md`.

## Documentation

- Getting started: `docs/getting-started.md`
- First 30 minutes: `docs/first-30-minutes.md`
- Architecture: `docs/architecture.md`
- Modules overview: `docs/modules.md`
- Buyer FAQ: `docs/faq-buyers.md`
- Demo walkthrough script: `docs/demo-script.md`
- Release contents: `docs/release-contents.md`
- Launch checklist: `docs/launch/launch-checklist.md`
- Support policy: `docs/support.md`

## Roadmap (productization)

- [ ] Publish final screenshots and demo video
- [ ] Finalize Gumroad checkout + licensing copy
- [ ] Add deployment-specific guides (provider-focused)
- [ ] Expand architecture decision records for advanced buyers
- [ ] Gather first 10 buyer feedback interviews and improve onboarding docs

## Buy Micro-SaaS Starter Kit Pro

If Lite gives you confidence, use Pro to save implementation and launch time.

**CTA placeholder:** `https://gumroad.com/l/your-product`
