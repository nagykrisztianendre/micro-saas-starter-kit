import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="page">
      <h1>Micro-SaaS Starter</h1>
      <p>Ship a polished SaaS foundation with auth, billing, admin, and product docs.</p>
      <p>
        <Link href="/register">Register</Link> or <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}
