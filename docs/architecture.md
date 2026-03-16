# Architecture Overview

## High-level shape
- `app/`: framework routes/pages and request boundaries.
- `modules/`: isolated domain modules (`auth`, `billing`, `dashboard`, `admin`).
- `core/`: shared runtime config and infra helpers.
- `src/`: reusable exports used across modules/app code.
- `prisma/`: schema, migrations, and generated client support.

## Auth flow overview
1. User registers/logs in via route handlers/pages in `app/`.
2. Auth module validates credentials and session logic.
3. Session data persists and cookie metadata is controlled by auth env settings.
4. Protected routes read session context and enforce access boundaries.

## Billing flow limitations (starter scope)
- Billing is scaffold-level and intended for extension.
- Stripe integration in automated tests should be mocked.
- Runtime webhook hardening and subscription lifecycle depth are extension points.

## Customization strategy
- Add or override domain behavior at the service layer first.
- Keep repository interfaces stable to preserve testability.
- Avoid leaking framework concerns into module internals.

## Packaging alignment
- Lite: architecture + auth + dashboard + docs preview.
- Pro: adds billing/admin positioning plus release/support assets.
- Team: adds team onboarding and commercial/team license messaging.
