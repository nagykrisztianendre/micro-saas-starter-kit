# Micro-SaaS Starter Kit

Production-ready Micro-SaaS template with authentication, billing, dashboard and deploy automation.

## Quick start

```bash
corepack enable
corepack prepare pnpm@10.17.1 --activate
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Running in Codespaces

1. Open this repository in GitHub Codespaces.
2. Wait for the devcontainer setup to finish.
3. Run `pnpm dev` to start the app on port `3000`.
4. Visit `/register`, `/login`, and `/dashboard` to test the auth flow.

## Project structure

```text
.devcontainer/
.github/
core/
docs/
src/
modules/
  auth/
  billing/
  dashboard/
  admin/
examples/
  demo-app/
scripts/
tests/
app/
```

## Auth module (local, modular)

The first production-ready module is implemented under `modules/auth` and keeps auth concerns isolated from app UI and framework specifics.

### What it provides

- Email/password registration with input validation.
- Duplicate-email protection.
- Secure password hashing (`scrypt`) and password verification.
- Session creation + lookup + invalidation.
- Default user role (`user`) with `admin` prepared for future use.
- Auth guards for protected routes.

### Storage strategy

The module uses repository interfaces so persistence can be swapped later:

- `FileUserRepository` and `FileSessionRepository` persist to `modules/auth/data/auth-store.json`.
- In-memory repositories are available for deterministic tests.

This keeps migration to Postgres/Prisma straightforward by replacing repository implementations, not service logic.

### Demo wiring

- Primary app routes are in `app/register`, `app/login`, `app/dashboard`, and `app/logout`.
- A reusable example scaffold also exists under `examples/demo-app/app/...`.

### Current limitations

- Local auth only (no OAuth providers).
- No email verification.
- No password reset.
- No multi-tenant team/org model yet.
- File-backed store is for starter/dev use, not high-scale production.

### Planned extensions

- OAuth provider integration.
- Password reset + email verification flows.
- Team/organization membership and RBAC expansion.
- Database-backed repository adapters (Prisma/Postgres).

## Roadmap

- [x] Authentication module scaffolding
- [ ] Billing module (Stripe) integration scaffolding
- [ ] Dashboard module scaffolding
- [ ] Admin panel scaffolding
- [ ] Deployment automation templates
