import Stripe from 'stripe';

import { getAppConfig } from '../../core/config';
import type { CheckoutSessionResult } from './billing.types';

export interface StripeClient {
  createCheckoutSession(input: { customerEmail: string; priceId: string; userId: string }): Promise<CheckoutSessionResult>;
}

export class StripeSdkClient implements StripeClient {
  private readonly stripe: Stripe;

  constructor(secretKey = getAppConfig().billing.stripeSecretKey) {
    this.stripe = new Stripe(secretKey);
  }

  async createCheckoutSession(input: { customerEmail: string; priceId: string; userId: string }): Promise<CheckoutSessionResult> {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: input.customerEmail,
      line_items: [{ price: input.priceId, quantity: 1 }],
      success_url: 'http://localhost:3000/billing?status=success',
      cancel_url: 'http://localhost:3000/billing?status=cancelled',
      metadata: { userId: input.userId },
    });

    return { id: session.id, url: session.url ?? '' };
  }
}
