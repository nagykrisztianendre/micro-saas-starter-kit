# Architecture

- `app/`: route boundaries and UI composition
- `modules/`: domain business logic (auth, billing, admin)
- `core/`: shared config/db/error foundations
- `docs/`: implementation + sales/productization docs

## Integration principles
- Keep business logic inside modules.
- Keep route handlers thin.
- Fail early on env misconfiguration.
- Prefer deterministic adapters in tests.
