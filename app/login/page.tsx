import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { authService, getDefaultSessionCookieOptions, getSessionCookieName } from '../../modules/auth';

export default function LoginPage() {
  async function loginAction(formData: FormData): Promise<void> {
    'use server';

    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    const { session } = await authService.login({ email, password });
    const cookieStore = await cookies();
    cookieStore.set(getSessionCookieName(), session.id, getDefaultSessionCookieOptions());

    redirect('/dashboard');
  }

  return (
    <main>
      <h1>Log in</h1>
      <form action={loginAction}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />

        <button type="submit">Log in</button>
      </form>
      <p>
        Need an account? <Link href="/register">Register</Link>
      </p>
    </main>
  );
}
