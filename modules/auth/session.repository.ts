import type { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import type { SessionRepository, UserSession } from './types';

export class InMemorySessionRepository implements SessionRepository {
  private sessions: UserSession[] = [];

  async create(input: { userId: string; expiresAt: string }): Promise<UserSession> {
    const session: UserSession = {
      id: randomUUID(),
      userId: input.userId,
      createdAt: new Date().toISOString(),
      expiresAt: input.expiresAt,
    };

    this.sessions.push(session);
    return session;
  }

  async findById(id: string): Promise<UserSession | null> {
    return this.sessions.find((session) => session.id === id) ?? null;
  }

  async deleteById(id: string): Promise<void> {
    this.sessions = this.sessions.filter((session) => session.id !== id);
  }

  async deleteExpired(nowIso: string): Promise<void> {
    this.sessions = this.sessions.filter((session) => session.expiresAt > nowIso);
  }

  async clear(): Promise<void> {
    this.sessions = [];
  }
}

export class PrismaSessionRepository implements SessionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: { userId: string; expiresAt: string }): Promise<UserSession> {
    const session = await this.prisma.session.create({
      data: {
        userId: input.userId,
        expiresAt: new Date(input.expiresAt),
      },
    });

    return mapSession(session);
  }

  async findById(id: string): Promise<UserSession | null> {
    const session = await this.prisma.session.findUnique({ where: { id } });
    return session ? mapSession(session) : null;
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.session.deleteMany({ where: { id } });
  }

  async deleteExpired(nowIso: string): Promise<void> {
    await this.prisma.session.deleteMany({ where: { expiresAt: { lt: new Date(nowIso) } } });
  }

  async clear(): Promise<void> {
    await this.prisma.session.deleteMany();
  }
}

function mapSession(session: { id: string; userId: string; createdAt: Date; expiresAt: Date }): UserSession {
  return {
    id: session.id,
    userId: session.userId,
    createdAt: session.createdAt.toISOString(),
    expiresAt: session.expiresAt.toISOString(),
  };
}
