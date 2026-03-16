import { beforeEach, describe, expect, it } from 'vitest';

import { db } from '../core/db';
import { BillingService } from '../modules/billing';
import { PlanRepository } from '../modules/billing/plan.repository';
import type { StripeClient } from '../modules/billing/stripe.client';
import { SubscriptionRepository } from '../modules/billing/subscription.repository';

const stripeMock: StripeClient = {
  createCheckoutSession: async () => ({ id: 'sub_mock', url: 'https://example.test/checkout' }),
};

describe('billing service', () => {
  const service = new BillingService(new SubscriptionRepository(db), new PlanRepository(db), stripeMock);

  beforeEach(async () => {
    await db.subscription.deleteMany();
    await db.user.deleteMany();
    await db.plan.deleteMany();

    await db.plan.create({ data: { name: 'pro', price: 2900, stripePriceId: 'price_pro' } });
  });

  it('creates subscription', async () => {
    const user = await db.user.create({ data: { email: 'bill@example.com', passwordHash: 'hash', role: 'user' } });

    const checkout = await service.createCheckoutSession(user.id);
    expect(checkout.id).toBe('sub_mock');

    const sub = await service.getUserSubscription(user.id);
    expect(sub?.plan).toBe('pro');
  });

  it('retrieves subscription', async () => {
    const user = await db.user.create({ data: { email: 'bill2@example.com', passwordHash: 'hash', role: 'user' } });

    await db.subscription.create({
      data: {
        userId: user.id,
        stripeCustomerId: 'cus_1',
        stripeSubscriptionId: 'sub_1',
        status: 'active',
        plan: 'pro',
      },
    });

    const sub = await service.getUserSubscription(user.id);
    expect(sub?.stripeSubscriptionId).toBe('sub_1');
  });
});
