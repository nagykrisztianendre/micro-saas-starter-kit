import bcrypt from 'bcryptjs';

import { db } from '../core/db';

async function main() {
  await db.plan.upsert({
    where: { name: 'free' },
    update: { price: 0, stripePriceId: 'price_free' },
    create: { name: 'free', price: 0, stripePriceId: 'price_free' },
  });

  await db.plan.upsert({
    where: { name: 'pro' },
    update: { price: 2900, stripePriceId: process.env.STRIPE_PRICE_PRO ?? 'price_pro' },
    create: { name: 'pro', price: 2900, stripePriceId: process.env.STRIPE_PRICE_PRO ?? 'price_pro' },
  });

  const adminPasswordHash = await bcrypt.hash('admin12345', 10);
  const userPasswordHash = await bcrypt.hash('user12345', 10);

  const admin = await db.user.upsert({
    where: { email: 'admin@example.com' },
    update: { role: 'admin', passwordHash: adminPasswordHash },
    create: { email: 'admin@example.com', role: 'admin', passwordHash: adminPasswordHash },
  });

  const user = await db.user.upsert({
    where: { email: 'user@example.com' },
    update: { role: 'user', passwordHash: userPasswordHash },
    create: { email: 'user@example.com', role: 'user', passwordHash: userPasswordHash },
  });

  await db.subscription.upsert({
    where: { stripeSubscriptionId: `sub_seed_${user.id}` },
    update: { status: 'active', plan: 'pro' },
    create: {
      userId: user.id,
      stripeCustomerId: `cus_seed_${user.id}`,
      stripeSubscriptionId: `sub_seed_${user.id}`,
      status: 'active',
      plan: 'pro',
    },
  });

  console.log('Seed complete');
  console.log('Admin login: admin@example.com / admin12345');
  console.log('User login: user@example.com / user12345');
  console.log(`Sample subscription assigned to ${user.email}`);
  console.log(`Admin account ID: ${admin.id}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
