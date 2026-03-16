import type { PrismaClient } from '@prisma/client';

import type { BillingSubscription } from './billing.types';

export class SubscriptionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: Omit<BillingSubscription, 'id'>): Promise<BillingSubscription> {
    return this.prisma.subscription.create({ data: input });
  }

  async findByUserId(userId: string): Promise<BillingSubscription | null> {
    return this.prisma.subscription.findFirst({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  async cancelById(subscriptionId: string): Promise<void> {
    await this.prisma.subscription.update({ where: { id: subscriptionId }, data: { status: 'canceled' } });
  }

  async listAll(): Promise<BillingSubscription[]> {
    return this.prisma.subscription.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
