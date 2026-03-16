# Micro-SaaS Starter Kit

Production-ready Next.js + TypeScript scaffold designed to feel like a premium product, not just a code dump.

## What's included
- Auth (register/login/logout/session)
- Billing foundation (plans, subscription state, Stripe checkout/webhook placeholders)
- Admin visibility (users + subscriptions)
- Organization/member/invite route boundaries
- API keys and audit log UI boundaries
- Environment/config validation layer
- Deterministic test suite + release/docs scaffolding

## First 15 minutes
1. `pnpm install`
2. `cp .env.example .env`
3. `pnpm prisma:generate`
4. `pnpm prisma:migrate`
5. `pnpm prisma:seed`
6. `pnpm dev`
7. Log in with seeded users from `docs/demo-data.md`

## Environment variables
See `.env.example` for all supported variables.

Required:
- `DATABASE_URL`

Common local defaults:
- `EMAIL_PROVIDER=mock`
- Stripe values use safe placeholders unless you wire real Stripe

## Key docs
- `docs/getting-started.md`
- `docs/architecture.md`
- `docs/modules.md`
- `docs/demo-data.md`
- `docs/troubleshooting.md`
- `docs/release-checklist.md`
- `docs/sales/pricing.md`

## Productization
- Lite vs Pro positioning: `docs/sales/lite-vs-pro.md`
- Pricing page copy: `docs/sales/pricing.md`
- Launch checklist: `docs/sales/launch-checklist.md`
