import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getSessionCookieName, requireAuth } from '../../modules/auth';
import { authService } from '../../modules/auth';
import { billingService } from '../../modules/billing';
import { AppShell } from '../_components/shell';
import { readSearchParam, type PageSearchParams } from '../_components/search-params';

export default async function DashboardPage({ searchParams }: { searchParams: PageSearchParams }) {
  const successMessage = await readSearchParam(searchParams, 'success');
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(getSessionCookieName())?.value;
  const authState = await authService.getAuthState(sessionId);

  if (!authState) redirect('/login');

  const { user } = requireAuth(authState);
  const subscription = await billingService.getUserSubscription(user.id);

  return (
    <AppShell title="Dashboard" description="Overview of your account and subscription" notice={successMessage}>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Plan: {subscription?.plan ?? 'free'}</p>
      <p>Subscription status: {subscription?.status ?? 'inactive'}</p>
    </AppShell>
  );
}
