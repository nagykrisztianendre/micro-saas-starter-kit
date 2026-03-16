# API keys module notes

The API keys screen (`/settings/api-keys`) includes UX primitives for:
- create key intent
- revoke confirmation flow
- empty state handling

For production rollout, add:
- hashed key storage
- one-time secret reveal behavior
- revoked key request rejection
- audit logging hooks
