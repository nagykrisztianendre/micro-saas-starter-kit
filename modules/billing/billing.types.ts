export interface BillingPlan {
  id: string;
  name: string;
  price: number;
  stripePriceId: string;
}

export interface BillingSubscription {
  id: string;
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  status: string;
  plan: string;
}

export interface CheckoutSessionResult {
  id: string;
  url: string;
}
