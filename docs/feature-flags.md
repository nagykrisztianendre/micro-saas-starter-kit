# Feature flags module notes

Feature flags are currently a documented foundation in this starter.

When implementing flags:
- keep deterministic defaults
- make fallbacks explicit
- avoid remote network dependency in tests
- expose a small admin-facing flag viewer in demo mode
