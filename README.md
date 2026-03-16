# Micro-SaaS Starter Kit

Production-ready Micro-SaaS template with authentication, billing, dashboard and deploy automation.

## Quick start

```bash
corepack enable
corepack prepare pnpm@latest --activate
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

## Project structure

```text
.devcontainer/
.github/
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

## Roadmap

- [ ] Authentication module scaffolding
- [ ] Billing module (Stripe) integration scaffolding
- [ ] Dashboard module scaffolding
- [ ] Admin panel scaffolding
- [ ] Deployment automation templates
