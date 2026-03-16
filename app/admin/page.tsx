import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { adminService } from '../../modules/admin';
import { authService, getSessionCookieName, requireRole } from '../../modules/auth';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(getSessionCookieName())?.value;
  const authState = await authService.getAuthState(sessionId);

  if (!authState) {
    redirect('/login');
  }

  try {
    requireRole(authState, 'admin');
  } catch {
    redirect('/dashboard');
  }

  const users = await adminService.listUsers();
  const subscriptions = await adminService.listSubscriptions();

  return (
    <main>
      <h1>Admin</h1>
      <h2>Users</h2>
      <table>
        <thead>
          <tr><th>Email</th><th>Role</th></tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}><td>{user.email}</td><td>{user.role}</td></tr>
          ))}
        </tbody>
      </table>

      <h2>Subscriptions</h2>
      <table>
        <thead>
          <tr><th>User ID</th><th>Plan</th><th>Status</th></tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr key={subscription.id}><td>{subscription.userId}</td><td>{subscription.plan}</td><td>{subscription.status}</td></tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
