# AGENTS.md

## Purpose
This repository is a scaffold for a Micro-SaaS starter kit built with Next.js, TypeScript, and pnpm.

## Standard commands
Use these commands for setup and validation:

- `pnpm install`
- `pnpm test`
- `pnpm build`

## Conventions
- Use TypeScript for all source code.
- Keep modules isolated under `modules/<domain>`.
- Keep reusable runtime exports in `src/`.
- Keep documentation and setup guides in `docs/` and `README.md`.
- Ensure CI checks (`lint`, `typecheck`, `test`, `build`) stay deterministic.

## Folder overview
- `app/`: Next.js App Router entry points.
- `src/`: Shared project exports and utilities.
- `modules/`: Domain modules (`auth`, `billing`, `dashboard`, `admin`).
- `examples/demo-app/`: Example application scaffold.
- `scripts/`: Automation scripts.
- `.devcontainer/`: GitHub Codespaces setup.
- `.github/workflows/`: CI automation.
