export interface AuthConfig {
  sessionDurationMs: number;
  authCookieName: string;
}

const DEFAULT_SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;
const DEFAULT_COOKIE_NAME = 'msa_session';

export function getAuthConfig(): AuthConfig {
  return {
    sessionDurationMs: DEFAULT_SESSION_DURATION_MS,
    authCookieName: DEFAULT_COOKIE_NAME,
  };
}
