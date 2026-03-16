import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>Micro SaaS Starter</h1>
      <p>
        <Link href="/register">Register</Link> or <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}
