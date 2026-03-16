import { describe, expect, it } from 'vitest';

import { getAppConfig } from '../core/config';

describe('config', () => {
  it('returns auth and billing defaults', () => {
    process.env.DATABASE_URL = 'file:./test.db';
    const config = getAppConfig();

    expect(config.auth.cookieName).toBeTruthy();
    expect(config.billing.stripePricePro).toBeTruthy();
  });
});
