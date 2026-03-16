# Troubleshooting

## Invalid login after seed
Run:
- `pnpm prisma:migrate`
- `pnpm prisma:seed`

## Stripe errors in local mode
Use placeholder values in `.env` and keep checkout/webhook in mock mode until real keys are configured.

## Missing env variable
`core/env.ts` fails early for required env values (especially `DATABASE_URL`). Check `.env.example`.

## Clean reset
Delete local SQLite db, rerun migrate + seed.
