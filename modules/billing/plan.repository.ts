import type { PrismaClient } from '@prisma/client';

import type { BillingPlan } from './billing.types';

export class PlanRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async listPlans(): Promise<BillingPlan[]> {
    return this.prisma.plan.findMany({ orderBy: { price: 'asc' } });
  }

  async findByName(name: string): Promise<BillingPlan | null> {
    return this.prisma.plan.findUnique({ where: { name } });
  }
}
