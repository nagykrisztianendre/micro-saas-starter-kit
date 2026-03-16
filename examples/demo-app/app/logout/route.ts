import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { authService, getExpiredSessionCookieOptions, getSessionCookieName } from '../../../../modules/auth';

export async function GET(request: Request): Promise<NextResponse> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(getSessionCookieName())?.value;
  await authService.logout(sessionId);
  cookieStore.set(getSessionCookieName(), '', getExpiredSessionCookieOptions());

  return NextResponse.redirect(new URL('/login', request.url));
}
