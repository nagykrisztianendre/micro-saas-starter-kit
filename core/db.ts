import { PrismaClient } from '@prisma/client';

const DEFAULT_DATABASE_URL = 'file:./dev.db';

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = DEFAULT_DATABASE_URL;
}

declare global {
  // eslint-disable-next-line no-var
  var __db: PrismaClient | undefined;
}

export const db = globalThis.__db ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__db = db;
}
