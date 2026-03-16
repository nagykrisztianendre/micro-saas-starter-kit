# First 30 Minutes (Buyer Onboarding)

This guide helps a new buyer install the kit, run the demo, and understand where to customize.

## 0–10 min: Install and run

1. `pnpm install`
2. `cp .env.example .env`
3. `pnpm prisma:generate`
4. `pnpm prisma:migrate`
5. `pnpm prisma:seed`
6. `pnpm dev`

Open the app and confirm login/dashboard loads.

## 10–20 min: Explore core features

- Sign in with seeded user from `docs/demo-data.md`
- Create/select an organization
- Review member invitation flow
- Generate an API key (if enabled in your package)
- Open audit log view and inspect events

Tip: use `docs/demo-script.md` as your walkthrough checklist.

## 20–25 min: Understand architecture

Read in this order:

1. `docs/architecture.md`
2. `docs/modules.md`
3. `modules/auth` as the reference module pattern

Look for:
- Route boundary logic vs domain services
- Service/repository separation
- Shared helpers in `core/` and `src/`

## 25–30 min: First customization

Pick one safe customization to validate your understanding:

- Change dashboard copy/branding
- Add one field to a profile/settings form
- Add a new service method in a module and wire it to an existing route

Then run:

- `pnpm test`
- `pnpm build`

If you get blocked, use `docs/troubleshooting.md` and `docs/support.md`.
