# Demo Walkthrough Script

Use this script to record a 5–10 minute product demo.

## Goal
Show that a buyer can install, run, and explore core SaaS workflows quickly.

## Demo flow

1. **Clone repository**
   - `git clone <repo-url>`
   - `cd micro-saas-starter-kit`
2. **Install dependencies**
   - `pnpm install`
3. **Configure environment**
   - `cp .env.example .env`
4. **Prepare database**
   - `pnpm prisma:generate`
   - `pnpm prisma:migrate`
   - `pnpm prisma:seed`
5. **Start application**
   - `pnpm dev`
6. **Register or sign in**
   - Show seeded test account option from `docs/demo-data.md`
7. **Create organization**
   - Demonstrate organization setup and context switching
8. **Invite a member**
   - Show member invitation flow and role context
9. **Create API key**
   - Generate key and explain secure display/rotation expectations
10. **View audit logs**
    - Show activity visibility and why it matters for B2B teams
11. **Explore dashboard**
    - Highlight extensibility points and module boundaries

## Narration prompts

- "This kit is designed for maintainability, not just quick scaffolding."
- "Each module can be customized independently."
- "Pro includes advanced docs and launch materials to reduce setup/support time."

## Demo close CTA

- "Start with Lite to evaluate architecture."
- "Use Pro to accelerate production launch."
- CTA placeholder: `https://gumroad.com/l/your-product`
