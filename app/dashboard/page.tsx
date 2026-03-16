import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getSessionCookieName, requireAuth } from '../../modules/auth';
import { authService } from '../../modules/auth';
import { billingService } from '../../modules/billing';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(getSessionCookieName())?.value;
  const authState = await authService.getAuthState(sessionId);

  if (!authState) {
    redirect('/login');
  }

  const { user } = requireAuth(authState);
  const subscription = await billingService.getUserSubscription(user.id);

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Plan: {subscription?.plan ?? 'free'}</p>
      <p>Subscription status: {subscription?.status ?? 'inactive'}</p>
      <nav>
        <Link href="/billing">Billing</Link> | <Link href="/settings">Settings</Link> | <Link href="/admin">Admin</Link> |
        <Link href="/logout"> Log out</Link>
      </nav>
    </main>
  );
}
