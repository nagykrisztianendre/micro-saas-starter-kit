import { describe, expect, it } from 'vitest';

import { createInMemoryAuthService } from '../modules/auth';

describe('auth registration', () => {
  it('creates a user with default user role', async () => {
    const authService = createInMemoryAuthService();

    const user = await authService.register({
      email: 'new.user@example.com',
      password: 'strong-password',
    });

    expect(user.email).toBe('new.user@example.com');
    expect(user.role).toBe('user');
  });

  it('rejects duplicate email registration', async () => {
    const authService = createInMemoryAuthService();

    await authService.register({
      email: 'duplicate@example.com',
      password: 'strong-password',
    });

    await expect(
      authService.register({
        email: 'duplicate@example.com',
        password: 'strong-password',
      }),
    ).rejects.toThrow('Email is already registered.');
  });

  it('rejects invalid email', async () => {
    const authService = createInMemoryAuthService();

    await expect(
      authService.register({
        email: 'not-an-email',
        password: 'strong-password',
      }),
    ).rejects.toThrow('Invalid email format.');
  });

  it('rejects weak password', async () => {
    const authService = createInMemoryAuthService();

    await expect(
      authService.register({
        email: 'weak@example.com',
        password: 'short',
      }),
    ).rejects.toThrow('Password must be at least 8 characters long.');
  });
});
