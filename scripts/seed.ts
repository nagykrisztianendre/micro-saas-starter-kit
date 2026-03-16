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

  const passwordHash = await bcrypt.hash('admin12345', 10);
  await db.user.upsert({
    where: { email: 'admin@example.com' },
    update: { role: 'admin', passwordHash },
    create: { email: 'admin@example.com', role: 'admin', passwordHash },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
