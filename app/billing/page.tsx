import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { authService, getSessionCookieName, requireAuth } from '../../modules/auth';
import { billingService } from '../../modules/billing';

export default async function BillingPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(getSessionCookieName())?.value;
  const authState = await authService.getAuthState(sessionId);

  if (!authState) {
    redirect('/login');
  }

  const { user } = requireAuth(authState);
  const subscription = await billingService.getUserSubscription(user.id);

  async function upgradeAction(): Promise<void> {
    'use server';
    await billingService.createCheckoutSession(user.id);
    redirect('/billing');
  }

  return (
    <main>
      <h1>Billing</h1>
      <p>Current plan: {subscription?.plan ?? 'free'}</p>
      <p>Status: {subscription?.status ?? 'inactive'}</p>
      <form action={upgradeAction}>
        <button type="submit">Upgrade to Pro</button>
      </form>
    </main>
  );
}
