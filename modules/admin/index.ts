import { db } from '../../core/db';
import type { User } from '../auth/types';
import { PrismaUserRepository } from '../auth/user.repository';
import { SubscriptionRepository } from '../billing/subscription.repository';

export class AdminService {
  constructor(
    private readonly userRepository: PrismaUserRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async listUsers(): Promise<User[]> {
    return this.userRepository.list();
  }

  async listSubscriptions() {
    return this.subscriptionRepository.listAll();
  }
}

export const adminService = new AdminService(new PrismaUserRepository(db), new SubscriptionRepository(db));

export const adminModule = {
  moduleName: 'admin',
  services: { adminService },
  routes: ['/admin'],
  types: ['User'],
};
