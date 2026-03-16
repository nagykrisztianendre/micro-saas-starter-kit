# FAQ

## Is this production-ready?
It's production-oriented scaffolding with hardened validation/configuration and deterministic tests. You still need domain-specific business logic.

## Can I switch to Postgres later?
Yes. Update Prisma datasource provider/url and rerun migrations.

## Can I keep email mocked in development?
Yes. `EMAIL_PROVIDER=mock` is the default and recommended for deterministic local/testing behavior.

## How do I add premium-only modules?
Use route/module boundaries and sales docs to gate features by package tier.
