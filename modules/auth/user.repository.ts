import type { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import type { User, UserRepository, UserRole } from './types';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(input: { email: string; passwordHash: string; role: UserRole }): Promise<User> {
    const user: User = {
      id: randomUUID(),
      email: input.email,
      passwordHash: input.passwordHash,
      role: input.role,
      createdAt: new Date().toISOString(),
    };

    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }

  async list(): Promise<User[]> {
    return [...this.users];
  }

  async clear(): Promise<void> {
    this.users = [];
  }
}

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: { email: string; passwordHash: string; role: UserRole }): Promise<User> {
    const user = await this.prisma.user.create({ data: input });
    return mapUser(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? mapUser(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? mapUser(user) : null;
  }

  async list(): Promise<User[]> {
    const users = await this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    return users.map(mapUser);
  }

  async clear(): Promise<void> {
    await this.prisma.user.deleteMany();
  }
}

function mapUser(user: { id: string; email: string; passwordHash: string; role: string; createdAt: Date }): User {
  return {
    id: user.id,
    email: user.email,
    passwordHash: user.passwordHash,
    role: user.role as UserRole,
    createdAt: user.createdAt.toISOString(),
  };
}
