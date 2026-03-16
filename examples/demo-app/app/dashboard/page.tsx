import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { authService, getSessionCookieName, requireAuth } from '../../../../modules/auth';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(getSessionCookieName())?.value;
  const authState = await authService.getAuthState(sessionId);

  if (!authState) {
    redirect('/login');
  }

  const { user } = requireAuth(authState);

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>
        <Link href="/logout">Log out</Link>
      </p>
    </main>
  );
}
