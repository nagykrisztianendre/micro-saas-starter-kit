# Getting started

## Setup
1. `pnpm install`
2. `cp .env.example .env`
3. `pnpm prisma:generate`
4. `pnpm prisma:migrate`
5. `pnpm prisma:seed`
6. `pnpm dev`

## Verify core paths
- `/register`
- `/login`
- `/dashboard`
- `/billing`
- `/settings/api-keys`
- `/admin`
- `/admin/audit-logs`

## Customization paths
- Swap SQLite for Postgres: update `prisma/schema.prisma` datasource and `DATABASE_URL`, then migrate.
- Replace mock email with SMTP: set `EMAIL_PROVIDER=smtp` + SMTP vars.
- Disable modules by removing route links from `app/_components/shell.tsx` and module exports in `modules/index.ts`.
