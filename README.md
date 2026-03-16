# Micro SaaS Starter Kit

## Overview
A modular SaaS starter built with Next.js App Router, TypeScript, Prisma, SQLite, and Vitest.

## Quick start
1. `pnpm install`
2. `cp .env.example .env`
3. `pnpm prisma:generate`
4. `pnpm prisma:migrate`
5. `pnpm prisma:seed`
6. `pnpm dev`

## Running in Codespaces
The repository includes `.devcontainer/` support. Open in Codespaces and run the quick start commands.

## Environment variables
- `DATABASE_URL` (default sqlite file)
- `AUTH_COOKIE_NAME`
- `AUTH_SESSION_TTL_HOURS`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_PRO`

## Architecture
- `core/`: shared runtime config + db singleton
- `modules/`: auth, billing, admin, dashboard
- `app/`: demo SaaS routes
- `prisma/`: schema + migrations
- `tests/`: deterministic vitest coverage

## Modules
See `docs/modules.md` for the module contract and extension pattern.

## Example SaaS app
Routes include `/register`, `/login`, `/dashboard`, `/billing`, `/admin`, and `/settings`.

## Future roadmap
- webhook processors for Stripe
- richer settings/profile management
- tenant-aware data boundaries
