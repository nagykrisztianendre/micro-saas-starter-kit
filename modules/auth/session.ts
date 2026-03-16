import { getAuthConfig } from '../../core/auth-config';

export interface SessionCookieOptions {
  httpOnly: boolean;
  sameSite: 'lax';
  secure: boolean;
  path: string;
  expires?: Date;
}

export function getSessionCookieName(): string {
  return getAuthConfig().authCookieName;
}

export function getSessionIdFromCookieHeader(cookieHeader: string | null | undefined): string | undefined {
  if (!cookieHeader) {
    return undefined;
  }

  const cookieName = getSessionCookieName();
  const target = cookieHeader
    .split(';')
    .map((value) => value.trim())
    .find((cookie) => cookie.startsWith(`${cookieName}=`));

  if (!target) {
    return undefined;
  }

  return target.split('=')[1];
}

export function getDefaultSessionCookieOptions(): SessionCookieOptions {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  };
}

export function getExpiredSessionCookieOptions(): SessionCookieOptions {
  return {
    ...getDefaultSessionCookieOptions(),
    expires: new Date(0),
  };
}
