import { beforeAll, describe, expect, it } from 'vitest';

import { db } from '../core/db';

describe('database foundation', () => {
  beforeAll(async () => {
    await db.subscription.deleteMany();
    await db.session.deleteMany();
    await db.user.deleteMany();
    await db.plan.deleteMany();
  });

  it('verifies user creation', async () => {
    const user = await db.user.create({
      data: {
        email: 'db-user@example.com',
        passwordHash: 'hash',
        role: 'user',
      },
    });

    expect(user.email).toBe('db-user@example.com');
  });

  it('verifies plan creation', async () => {
    const plan = await db.plan.create({
      data: {
        name: 'starter',
        price: 0,
        stripePriceId: 'price_starter',
      },
    });

    expect(plan.name).toBe('starter');
  });
});
