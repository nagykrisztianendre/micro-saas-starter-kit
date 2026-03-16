# Email module notes

Default provider is `mock` (`EMAIL_PROVIDER=mock`) to keep local development deterministic.

To switch to SMTP:
- set `EMAIL_PROVIDER=smtp`
- configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- set `EMAIL_FROM`

In this scaffold, invitation/welcome delivery hooks are represented as placeholders and are safe to mock in tests.
