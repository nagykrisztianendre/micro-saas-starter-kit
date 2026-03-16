import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { authService, getSessionCookieName, requireAuth } from '../../modules/auth';
import { AppShell } from '../_components/shell';

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(getSessionCookieName())?.value;
  const authState = await authService.getAuthState(sessionId);

  if (!authState) redirect('/login');

  const { user } = requireAuth(authState);

  return (
    <AppShell title="Settings" description="Manage your account preferences">
      <p>Signed in as {user.email}</p>
      <p><Link href="/settings/api-keys">Manage API keys</Link></p>
    </AppShell>
  );
}
