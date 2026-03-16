# Troubleshooting

## Install issues
### `pnpm install` fails
- Ensure Node.js and pnpm versions match project requirements.
- Delete lock artifacts only if needed (`node_modules`, `.pnpm-store`) and reinstall.

## Prisma issues
### `prisma generate` fails
- Confirm `.env` exists and `DATABASE_URL` is valid.
- Check `prisma/schema.prisma` for syntax errors.

### Migration or seed fails
- Ensure sqlite file path is writable.
- Re-run in order: `pnpm prisma:generate`, `pnpm prisma:migrate`, `pnpm prisma:seed`.

## Auth and session issues
- Verify `AUTH_COOKIE_NAME` and `AUTH_SESSION_TTL_HOURS` are set.
- Clear browser cookies after auth config changes.

## Billing limitations
- Billing scaffolding is intentionally starter-level.
- Stripe keys must be configured for full runtime behavior.
- In tests, Stripe should remain mocked/deterministic.

## Build and CI issues
- Run checks in this order:
  1. `pnpm lint`
  2. `pnpm typecheck`
  3. `pnpm test`
  4. `pnpm build`
- Keep deterministic test data and avoid external network assumptions.
