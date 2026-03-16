import Link from 'next/link';

import { getWelcomeMessage } from '../src';

export default function HomePage() {
  return (
    <main>
      <h1>Micro-SaaS Starter Kit</h1>
      <p>{getWelcomeMessage()}</p>
      <ul>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </main>
  );
}
