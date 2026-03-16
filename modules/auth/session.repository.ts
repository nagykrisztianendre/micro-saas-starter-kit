import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { dirname } from 'node:path';

import type { AuthStore, Session, SessionRepository } from './types';

const INITIAL_STORE: AuthStore = {
  users: [],
  sessions: [],
};

export class InMemorySessionRepository implements SessionRepository {
  private sessions: Session[] = [];

  async create(input: { userId: string; expiresAt: string }): Promise<Session> {
    const session: Session = {
      id: randomUUID(),
      userId: input.userId,
      createdAt: new Date().toISOString(),
      expiresAt: input.expiresAt,
    };

    this.sessions.push(session);
    return session;
  }

  async findById(id: string): Promise<Session | null> {
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

export class FileSessionRepository implements SessionRepository {
  constructor(private readonly storePath: string) {}

  async create(input: { userId: string; expiresAt: string }): Promise<Session> {
    const store = await this.loadStore();

    const session: Session = {
      id: randomUUID(),
      userId: input.userId,
      createdAt: new Date().toISOString(),
      expiresAt: input.expiresAt,
    };

    store.sessions.push(session);
    await this.saveStore(store);

    return session;
  }

  async findById(id: string): Promise<Session | null> {
    const store = await this.loadStore();
    return store.sessions.find((session) => session.id === id) ?? null;
  }

  async deleteById(id: string): Promise<void> {
    const store = await this.loadStore();
    const updatedStore: AuthStore = {
      ...store,
      sessions: store.sessions.filter((session) => session.id !== id),
    };

    await this.saveStore(updatedStore);
  }

  async deleteExpired(nowIso: string): Promise<void> {
    const store = await this.loadStore();
    const updatedStore: AuthStore = {
      ...store,
      sessions: store.sessions.filter((session) => session.expiresAt > nowIso),
    };

    await this.saveStore(updatedStore);
  }

  async clear(): Promise<void> {
    const store = await this.loadStore();
    await this.saveStore({ ...store, sessions: [] });
  }

  private async loadStore(): Promise<AuthStore> {
    try {
      const content = await readFile(this.storePath, 'utf-8');
      const parsed = JSON.parse(content) as Partial<AuthStore>;

      return {
        users: parsed.users ?? [],
        sessions: parsed.sessions ?? [],
      };
    } catch {
      return INITIAL_STORE;
    }
  }

  private async saveStore(store: AuthStore): Promise<void> {
    await mkdir(dirname(this.storePath), { recursive: true });
    await writeFile(this.storePath, JSON.stringify(store, null, 2), 'utf-8');
  }
}
