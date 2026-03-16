# Release ZIP Contents

This document defines exactly what should ship in the paid download artifact.

## Expected ZIP root

```text
micro-saas-starter-kit/
  app/
  core/
  modules/
  prisma/
  src/
  scripts/
  examples/
  docs/
  package.json
  pnpm-lock.yaml
  pnpm-workspace.yaml
  tsconfig.json
  next.config.*
  .env.example
  README.md
  LICENSE* (if included for paid package)
```

## Include
- Runtime source code required to build and run
- Prisma schema/migrations/seed files
- Documentation needed for onboarding and support
- Config files required by tooling and build

## Exclude
- `node_modules/`
- `.git/`
- Local databases (e.g., `*.db`, `*.sqlite`)
- Test cache/temp artifacts
- Build output (`.next/`, `dist/`, coverage reports)
- OS/editor files (`.DS_Store`, `.idea/`, etc.)

## Validation workflow note

Before upload, run:

1. `git clean -xfd -e .env` (optional in a disposable clone)
2. Build a ZIP from tracked files only
3. Unzip in a clean temp folder
4. Execute setup commands from `docs/first-30-minutes.md`

## Optional release verification script

You can validate high-level contents with:

```bash
bash scripts/validate-release-contents.sh path/to/micro-saas-starter-kit-pro.zip
```

The script checks required directories/files and flags common unwanted artifacts.
