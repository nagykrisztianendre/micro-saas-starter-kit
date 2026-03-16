import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { toUserMessage } from '../../core/errors';
import { authService, getDefaultSessionCookieOptions, getSessionCookieName } from '../../modules/auth';
import { FormSubmitButton } from '../_components/form-submit-button';
import { AuthShell } from '../_components/shell';

export default function RegisterPage({ searchParams }: { searchParams: { error?: string } }) {
  async function registerAction(formData: FormData): Promise<void> {
    'use server';

    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    try {
      await authService.register({ email, password });
      const { session } = await authService.login({ email, password });
      const cookieStore = await cookies();
      cookieStore.set(getSessionCookieName(), session.id, getDefaultSessionCookieOptions());
      redirect('/dashboard?success=Account%20created');
    } catch (error) {
      redirect(`/register?error=${encodeURIComponent(toUserMessage(error))}`);
    }
  }

  return (
    <AuthShell title="Create account" footer={<p>Already have an account? <Link href="/login">Log in</Link></p>}>
      {searchParams?.error ? <p className="error">{searchParams.error}</p> : null}
      <form action={registerAction}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" />

        <FormSubmitButton label="Sign up" pendingLabel="Creating account…" />
      </form>
    </AuthShell>
  );
}
