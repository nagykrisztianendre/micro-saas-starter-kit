export default function DemoDashboardPage() {
  const user = { email: 'founder@example.com', plan: 'pro', status: 'active' };

  return (
    <main>
      <h1>Demo SaaS Dashboard</h1>
      <p>This page is intended to be protected by authentication in the demo tenant.</p>
      <p>Email: {user.email}</p>
      <p>Plan: {user.plan}</p>
      <p>Subscription status: {user.status}</p>
    </main>
  );
}
