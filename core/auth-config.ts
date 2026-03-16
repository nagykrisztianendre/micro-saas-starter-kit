import { getAppConfig } from './config';

export interface AuthConfig {
  sessionDurationMs: number;
  authCookieName: string;
}

export function getAuthConfig(): AuthConfig {
  const config = getAppConfig();

  return {
    sessionDurationMs: config.auth.sessionDurationMs,
    authCookieName: config.auth.cookieName,
  };
}
