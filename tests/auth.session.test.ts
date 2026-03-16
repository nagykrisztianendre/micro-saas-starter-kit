import { describe, expect, it } from 'vitest';

import { createInMemoryAuthService, isAuthenticated } from '../modules/auth';

describe('auth sessions', () => {
  it('creates a session after login', async () => {
    const authService = createInMemoryAuthService();

    await authService.register({
      email: 'session@example.com',
      password: 'strong-password',
    });

    const { session } = await authService.login({
      email: 'session@example.com',
      password: 'strong-password',
    });

    const authState = await authService.getAuthState(session.id);

    expect(authState?.session.id).toBe(session.id);
    expect(authState?.user.email).toBe('session@example.com');
  });

  it('protected helper recognizes authenticated state', async () => {
    const authService = createInMemoryAuthService();

    await authService.register({
      email: 'guard@example.com',
      password: 'strong-password',
    });

    const { session } = await authService.login({
      email: 'guard@example.com',
      password: 'strong-password',
    });

    const authState = await authService.getAuthState(session.id);

    expect(isAuthenticated(authState)).toBe(true);
    expect(isAuthenticated(null)).toBe(false);
  });

  it('logout invalidates session', async () => {
    const authService = createInMemoryAuthService();

    await authService.register({
      email: 'logout@example.com',
      password: 'strong-password',
    });

    const { session } = await authService.login({
      email: 'logout@example.com',
      password: 'strong-password',
    });

    await authService.logout(session.id);

    const authState = await authService.getAuthState(session.id);

    expect(authState).toBeNull();
  });
});
