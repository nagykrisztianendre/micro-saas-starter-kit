import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { authService, getDefaultSessionCookieOptions, getSessionCookieName } from '../../../../modules/auth';

export default function RegisterPage() {
  async function registerAction(formData: FormData): Promise<void> {
    'use server';

    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    await authService.register({ email, password });
    const { session } = await authService.login({ email, password });
    const cookieStore = await cookies();
    cookieStore.set(getSessionCookieName(), session.id, getDefaultSessionCookieOptions());

    redirect('/dashboard');
  }

  return (
    <main>
      <h1>Create account</h1>
      <form action={registerAction}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required minLength={8} />

        <button type="submit">Sign up</button>
      </form>
      <p>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}
