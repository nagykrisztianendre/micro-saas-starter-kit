import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { adminService } from '../../modules/admin';
import { authService, getSessionCookieName, requireRole } from '../../modules/auth';
import { AppShell } from '../_components/shell';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(getSessionCookieName())?.value;
  const authState = await authService.getAuthState(sessionId);

  if (!authState) redirect('/login');

  try {
    requireRole(authState, 'admin');
  } catch {
    redirect('/dashboard?success=Admin%20access%20is%20restricted');
  }

  const users = await adminService.listUsers();
  const subscriptions = await adminService.listSubscriptions();

  return (
    <AppShell title="Admin" description="Operational visibility for users and subscriptions">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p className="empty">No users found yet.</p>
      ) : (
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
      )}

      <h2>Subscriptions</h2>
      {subscriptions.length === 0 ? (
        <p className="empty">No subscriptions found yet.</p>
      ) : (
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
      )}
    </AppShell>
  );
}
