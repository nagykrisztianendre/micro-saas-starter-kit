import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { toUserMessage } from '../../core/errors';
import { authService, getSessionCookieName, requireAuth } from '../../modules/auth';
import { billingService } from '../../modules/billing';
import { ConfirmButton } from '../_components/confirm-button';
import { FormSubmitButton } from '../_components/form-submit-button';
import { AppShell } from '../_components/shell';

export default async function BillingPage({ searchParams }: { searchParams: { success?: string; error?: string } }) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(getSessionCookieName())?.value;
  const authState = await authService.getAuthState(sessionId);

  if (!authState) redirect('/login');

  const { user } = requireAuth(authState);
  const subscription = await billingService.getUserSubscription(user.id);

  async function upgradeAction(): Promise<void> {
    'use server';
    try {
      await billingService.createCheckoutSession(user.id);
      redirect('/billing?success=Checkout%20session%20created');
    } catch (error) {
      redirect(`/billing?error=${encodeURIComponent(toUserMessage(error))}`);
    }
  }

  return (
    <AppShell title="Billing" description="Manage your plan and billing status" notice={searchParams.success}>
      {searchParams.error ? <p className="error">{searchParams.error}</p> : null}
      <p>Current plan: {subscription?.plan ?? 'free'}</p>
      <p>Status: {subscription?.status ?? 'inactive'}</p>
      <form action={upgradeAction}>
        <FormSubmitButton label="Upgrade to Pro" pendingLabel="Redirecting…" />
      </form>
      <ConfirmButton label="Cancel subscription (placeholder)" confirmMessage="Confirm cancel subscription?" />
    </AppShell>
  );
}
