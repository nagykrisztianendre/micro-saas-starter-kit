import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { randomUUID } from 'node:crypto';

import type { AuthStore, User, UserRepository, UserRole } from './types';

const INITIAL_STORE: AuthStore = {
  users: [],
  sessions: [],
};

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

  async clear(): Promise<void> {
    this.users = [];
  }
}

export class FileUserRepository implements UserRepository {
  constructor(private readonly storePath: string) {}

  async create(input: { email: string; passwordHash: string; role: UserRole }): Promise<User> {
    const store = await this.loadStore();

    const user: User = {
      id: randomUUID(),
      email: input.email,
      passwordHash: input.passwordHash,
      role: input.role,
      createdAt: new Date().toISOString(),
    };

    store.users.push(user);
    await this.saveStore(store);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const store = await this.loadStore();
    return store.users.find((user) => user.email === email) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const store = await this.loadStore();
    return store.users.find((user) => user.id === id) ?? null;
  }

  async clear(): Promise<void> {
    const store = await this.loadStore();
    await this.saveStore({ ...store, users: [] });
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
