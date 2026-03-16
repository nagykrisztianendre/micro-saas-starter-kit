import { db } from '../../core/db';
import { PrismaUserRepository } from '../auth/user.repository';
import type { BillingSubscription, CheckoutSessionResult } from './billing.types';
import { PlanRepository } from './plan.repository';
import { StripeSdkClient, type StripeClient } from './stripe.client';
import { SubscriptionRepository } from './subscription.repository';

export class BillingService {
  private readonly userRepository = new PrismaUserRepository(db);

  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly planRepository: PlanRepository,
    private readonly stripeClient: StripeClient,
  ) {}

  async createCheckoutSession(userId: string): Promise<CheckoutSessionResult> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    const proPlan = await this.planRepository.findByName('pro');
    if (!proPlan) {
      throw new Error('Plan not found.');
    }

    const checkout = await this.stripeClient.createCheckoutSession({
      customerEmail: user.email,
      priceId: proPlan.stripePriceId,
      userId,
    });

    await this.subscriptionRepository.create({
      userId,
      stripeCustomerId: `cus_${userId}`,
      stripeSubscriptionId: checkout.id,
      status: 'active',
      plan: proPlan.name,
    });

    return checkout;
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    await this.subscriptionRepository.cancelById(subscriptionId);
  }

  async getUserSubscription(userId: string): Promise<BillingSubscription | null> {
    return this.subscriptionRepository.findByUserId(userId);
  }
}

export function createBillingService(stripeClient: StripeClient = new StripeSdkClient()): BillingService {
  return new BillingService(new SubscriptionRepository(db), new PlanRepository(db), stripeClient);
}
