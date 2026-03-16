import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { toUserMessage } from '../../core/errors';
import { authService, getDefaultSessionCookieOptions, getSessionCookieName } from '../../modules/auth';
import { FormSubmitButton } from '../_components/form-submit-button';
import { AuthShell } from '../_components/shell';

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  async function loginAction(formData: FormData): Promise<void> {
    'use server';

    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    try {
      const { session } = await authService.login({ email, password });
      const cookieStore = await cookies();
      cookieStore.set(getSessionCookieName(), session.id, getDefaultSessionCookieOptions());
      redirect('/dashboard?success=Welcome%20back');
    } catch (error) {
      redirect(`/login?error=${encodeURIComponent(toUserMessage(error))}`);
    }
  }

  return (
    <AuthShell title="Log in" footer={<p>Need an account? <Link href="/register">Register</Link></p>}>
      {searchParams?.error ? <p className="error">{searchParams.error}</p> : null}
      <form action={loginAction}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required minLength={8} autoComplete="current-password" />

        <FormSubmitButton label="Log in" pendingLabel="Logging in…" />
      </form>
    </AuthShell>
  );
}
