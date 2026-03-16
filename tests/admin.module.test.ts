import { beforeEach, describe, expect, it } from 'vitest';

import { db } from '../core/db';
import { requireRole } from '../modules/auth';
import { adminService } from '../modules/admin';

describe('admin module', () => {
  beforeEach(async () => {
    await db.user.deleteMany();
  });

  it('admin guard enforces admin role', () => {
    expect(() =>
      requireRole(
        {
          user: { id: '1', email: 'a@a.com', role: 'user', createdAt: new Date().toISOString() },
          session: { id: 's', userId: '1', createdAt: new Date().toISOString(), expiresAt: new Date().toISOString() },
        },
        'admin',
      ),
    ).toThrow('You do not have access to this resource.');
  });

  it('lists users', async () => {
    await db.user.create({ data: { email: 'admin-list@example.com', passwordHash: 'h', role: 'admin' } });
    const users = await adminService.listUsers();
    expect(users.length).toBeGreaterThan(0);
  });
});
