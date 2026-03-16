import type { LoginInput, RegisterInput } from './types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateEmail(email: string): void {
  if (!EMAIL_REGEX.test(email)) {
    throw new Error('Invalid email format.');
  }
}

export function validatePassword(password: string): void {
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
  }
}

export function validateRegisterInput(input: RegisterInput): RegisterInput {
  const email = normalizeEmail(input.email);
  validateEmail(email);
  validatePassword(input.password);

  return {
    email,
    password: input.password,
  };
}

export function validateLoginInput(input: LoginInput): LoginInput {
  const email = normalizeEmail(input.email);
  validateEmail(email);

  return {
    email,
    password: input.password,
  };
}
