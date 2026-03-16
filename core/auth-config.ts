export interface AuthConfig {
  sessionDurationMs: number;
  authCookieName: string;
}

const DEFAULT_SESSION_DURATION_MS = 1000 * 60 * 60 * 24;
const DEFAULT_COOKIE_NAME = 'micro_saas_session';

export function getAuthConfig(): AuthConfig {
  const ttlHours = Number(process.env.AUTH_SESSION_TTL_HOURS ?? '24');

  return {
    sessionDurationMs: Number.isFinite(ttlHours) ? ttlHours * 60 * 60 * 1000 : DEFAULT_SESSION_DURATION_MS,
    authCookieName: process.env.AUTH_COOKIE_NAME ?? DEFAULT_COOKIE_NAME,
  };
}
