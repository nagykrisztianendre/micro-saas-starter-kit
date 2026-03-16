# Demo SaaS Example

This folder contains a route map and content scaffold for a productized demo tenant.

## Included pages

- `/login`
- `/register`
- `/dashboard`
- `/billing`
- `/admin`
- `/settings`

## Intentional behavior contracts

- `/login` and `/register` should redirect authenticated users to `/dashboard`.
- `/dashboard` should be auth-protected and display email, plan, and subscription status.
- `/billing` should be auth-protected and expose checkout + cancellation actions.
- `/admin` should require `role = admin` and display user/subscription reporting.

Use these stubs as a blueprint when packaging alternate demos for Lite/Pro tiers.
