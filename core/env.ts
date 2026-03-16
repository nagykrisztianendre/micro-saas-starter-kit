import { AppError } from './errors';

const DEFAULT_DATABASE_URL = 'file:./dev.db';

function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function readDatabaseUrl(): string {
  const value = readEnv('DATABASE_URL');
  if (value) return value;

  // Keep starter builds/dev smooth by defaulting to local SQLite when not explicitly configured.
  process.env.DATABASE_URL = DEFAULT_DATABASE_URL;
  return DEFAULT_DATABASE_URL;
}

function readNumberEnv(name: string, fallback: number): number {
  const raw = readEnv(name);
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function getEnv() {
  const nodeEnv = readEnv('NODE_ENV') ?? 'development';
  const isProduction = nodeEnv === 'production';
  const emailProvider = readEnv('EMAIL_PROVIDER') ?? 'mock';

  return {
    nodeEnv,
    isProduction,
    databaseUrl: readDatabaseUrl(),
    authCookieName: readEnv('AUTH_COOKIE_NAME') ?? 'micro_saas_session',
    authSessionTtlHours: readNumberEnv('AUTH_SESSION_TTL_HOURS', 24),
    stripeSecretKey: readEnv('STRIPE_SECRET_KEY') ?? 'sk_test_placeholder',
    stripeWebhookSecret: readEnv('STRIPE_WEBHOOK_SECRET') ?? 'whsec_placeholder',
    stripePricePro: readEnv('STRIPE_PRICE_PRO') ?? 'price_pro',
    emailProvider,
    emailFrom: readEnv('EMAIL_FROM') ?? 'hello@example.com',
    smtpHost: readEnv('SMTP_HOST'),
    smtpPort: readNumberEnv('SMTP_PORT', 587),
    smtpUser: readEnv('SMTP_USER'),
    smtpPass: readEnv('SMTP_PASS'),
  };
}

export function assertEnv(value: unknown, message: string): asserts value {
  if (!value) {
    throw new AppError('VALIDATION_ERROR', message, 500, true);
  }
}
