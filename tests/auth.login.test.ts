import { describe, expect, it } from 'vitest';

import { createInMemoryAuthService } from '../modules/auth';

describe('auth login', () => {
  it('succeeds for valid credentials', async () => {
    const authService = createInMemoryAuthService();

    await authService.register({
      email: 'valid@example.com',
      password: 'strong-password',
    });

    const result = await authService.login({
      email: 'valid@example.com',
      password: 'strong-password',
    });

    expect(result.user.email).toBe('valid@example.com');
    expect(result.session.id).toBeTruthy();
  });

  it('fails for wrong password', async () => {
    const authService = createInMemoryAuthService();

    await authService.register({
      email: 'wrong-pass@example.com',
      password: 'strong-password',
    });

    await expect(
      authService.login({
        email: 'wrong-pass@example.com',
        password: 'incorrect-password',
      }),
    ).rejects.toThrow('Invalid credentials.');
  });

  it('fails for unknown email', async () => {
    const authService = createInMemoryAuthService();

    await expect(
      authService.login({
        email: 'unknown@example.com',
        password: 'strong-password',
      }),
    ).rejects.toThrow('Invalid credentials.');
  });
});
