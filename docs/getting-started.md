# Getting Started

## Local setup
1. Install Node.js 20+ and pnpm.
2. Install dependencies:
   - `pnpm install`
3. Create environment file:
   - `cp .env.example .env`
4. Generate Prisma client:
   - `pnpm prisma:generate`
5. Apply migrations:
   - `pnpm prisma:migrate`
6. Seed data:
   - `pnpm prisma:seed`
7. Start app:
   - `pnpm dev`

## Codespaces setup
1. Open the repo in GitHub Codespaces.
2. Wait for devcontainer initialization.
3. Run the same setup steps as local (`pnpm install` through `pnpm dev`).

## Environment variables
- `DATABASE_URL`: sqlite database URL for local development.
- `AUTH_COOKIE_NAME`: cookie key for auth sessions.
- `AUTH_SESSION_TTL_HOURS`: session expiration configuration.
- `STRIPE_SECRET_KEY`: Stripe secret for runtime billing integration.
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook verification key.
- `STRIPE_PRICE_PRO`: default product/price identifier.

## Prisma and database setup
- Use sqlite locally for deterministic setup.
- Keep schema and migrations in `prisma/`.
- Run `pnpm prisma:generate` after schema changes.
- Run `pnpm prisma:migrate` to create/apply migrations.

## Module customization flow
- Keep module internals under `modules/<domain>`.
- Keep framework-specific logic at route/page boundaries in `app/`.
- Keep reusable exports in `src/`.
- Extend service and repository layers before editing UI boundaries.
