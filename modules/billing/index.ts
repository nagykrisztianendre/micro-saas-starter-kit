import { createBillingService } from './billing.service';

export const billingService = createBillingService();

export const billingModule = {
  moduleName: 'billing',
  services: { billingService },
  routes: ['/billing'],
  types: ['BillingPlan', 'BillingSubscription'],
};

export * from './billing.service';
export * from './billing.types';
export * from './plan.repository';
export * from './stripe.client';
export * from './subscription.repository';
