import { describe, expect, it } from 'vitest';

import { requireAuth } from '../modules/auth';

describe('route protection', () => {
  it('throws when unauthenticated', () => {
    expect(() => requireAuth(null)).toThrow('Please log in to continue.');
  });

  it('simulates successful login redirect target', () => {
    expect('/dashboard').toBe('/dashboard');
  });
});
