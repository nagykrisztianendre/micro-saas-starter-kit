import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { authService, getSessionCookieName, requireAuth } from '../../modules/auth';

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(getSessionCookieName())?.value;
  const authState = await authService.getAuthState(sessionId);

  if (!authState) {
    redirect('/login');
  }

  const { user } = requireAuth(authState);

  return (
    <main>
      <h1>Settings</h1>
      <p>Profile update placeholder for {user.email}</p>
    </main>
  );
}
