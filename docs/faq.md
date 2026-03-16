# FAQ

## What does Lite include?
Lite is the public positioning: core architecture, auth, basic dashboard, and docs preview.

## What does Pro include?
Pro adds paid positioning around billing/admin foundations, release automation workflows, and deeper sales/support docs.

## What does Team include?
Team builds on Pro with commercial/team license messaging, agency-friendly onboarding, and priority support placeholder.

## Can I use this starter for commercial products?
Yes. Choose the license/package positioning that matches your distribution model.

## Is this multi-tenant out of the box?
It is a modular starter, not a complete enterprise tenancy platform. Extend domain boundaries as needed.

## Can I replace sqlite?
Yes. Prisma allows changing datasource configuration for managed databases.

## How do I customize modules safely?
Start in `modules/<domain>` service/repository layers, then adjust route/page boundaries in `app/`.

## Do I need Stripe to run locally?
No. Local development can run without active Stripe calls; production billing requires proper key configuration.
