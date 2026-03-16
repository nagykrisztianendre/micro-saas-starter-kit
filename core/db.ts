import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __db: PrismaClient | undefined;
}

export const db = globalThis.__db ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__db = db;
}
