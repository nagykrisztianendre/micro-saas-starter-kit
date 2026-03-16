import { getEnv } from './env';

export interface AppConfig {
  auth: {
    cookieName: string;
    sessionDurationMs: number;
  };
  billing: {
    stripeSecretKey: string;
    stripeWebhookSecret: string;
    stripePricePro: string;
  };
  email: {
    provider: string;
    from: string;
    smtp?: {
      host: string;
      port: number;
      user: string;
      pass: string;
    };
  };
}

export function getAppConfig(): AppConfig {
  const env = getEnv();

  return {
    auth: {
      cookieName: env.authCookieName,
      sessionDurationMs: env.authSessionTtlHours * 60 * 60 * 1000,
    },
    billing: {
      stripeSecretKey: env.stripeSecretKey,
      stripeWebhookSecret: env.stripeWebhookSecret,
      stripePricePro: env.stripePricePro,
    },
    email: {
      provider: env.emailProvider,
      from: env.emailFrom,
      smtp: env.emailProvider === 'smtp' && env.smtpHost && env.smtpUser && env.smtpPass
        ? {
            host: env.smtpHost,
            port: env.smtpPort,
            user: env.smtpUser,
            pass: env.smtpPass,
          }
        : undefined,
    },
  };
}
