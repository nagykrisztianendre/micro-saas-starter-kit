# Module pattern

Each module exports a metadata contract:

- `moduleName`
- `services`
- `routes`
- `types`

## Add a module

1. Create `modules/<name>/index.ts`.
2. Keep business logic in services and repositories.
3. Export metadata + runtime services.
4. Register the module in `modules/index.ts`.

## Disable a module

- Stop exporting it from `modules/index.ts`.
- Remove or gate app routes that depend on it.
- Keep interfaces isolated so other modules do not import disabled internals.
