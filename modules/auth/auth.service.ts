import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

import { getAuthConfig } from '../../core/auth-config';
import type { AuthState, LoginInput, PublicUser, RegisterInput, SessionRepository, UserRepository } from './types';
import { validateLoginInput, validateRegisterInput } from './validators';

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

export interface AuthServiceDependencies {
  userRepository: UserRepository;
  sessionRepository: SessionRepository;
  sessionDurationMs?: number;
}

export class AuthService {
  private readonly sessionDurationMs: number;

  constructor(private readonly deps: AuthServiceDependencies) {
    this.sessionDurationMs = deps.sessionDurationMs ?? getAuthConfig().sessionDurationMs;
  }

  async register(input: RegisterInput): Promise<PublicUser> {
    const normalizedInput = validateRegisterInput(input);
    const existingUser = await this.deps.userRepository.findByEmail(normalizedInput.email);

    if (existingUser) {
      throw new Error('Email is already registered.');
    }

    const passwordHash = await hashPassword(normalizedInput.password);
    const user = await this.deps.userRepository.create({
      email: normalizedInput.email,
      passwordHash,
      role: 'user',
    });

    return toPublicUser(user);
  }

  async login(input: LoginInput): Promise<AuthState> {
    const normalizedInput = validateLoginInput(input);
    const user = await this.deps.userRepository.findByEmail(normalizedInput.email);

    if (!user) {
      throw new Error('Invalid credentials.');
    }

    const isValidPassword = await verifyPassword(normalizedInput.password, user.passwordHash);

    if (!isValidPassword) {
      throw new Error('Invalid credentials.');
    }

    const expiresAt = new Date(Date.now() + this.sessionDurationMs).toISOString();
    const session = await this.deps.sessionRepository.create({
      userId: user.id,
      expiresAt,
    });

    return {
      user: toPublicUser(user),
      session,
    };
  }

  async getAuthState(sessionId: string | undefined): Promise<AuthState | null> {
    if (!sessionId) {
      return null;
    }

    await this.deps.sessionRepository.deleteExpired(new Date().toISOString());
    const session = await this.deps.sessionRepository.findById(sessionId);

    if (!session) {
      return null;
    }

    const user = await this.deps.userRepository.findById(session.userId);

    if (!user) {
      return null;
    }

    return {
      user: toPublicUser(user),
      session,
    };
  }

  async logout(sessionId: string | undefined): Promise<void> {
    if (!sessionId) {
      return;
    }

    await this.deps.sessionRepository.deleteById(sessionId);
  }
}

function toPublicUser(user: { id: string; email: string; role: 'user' | 'admin'; createdAt: string }): PublicUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;

  return `${salt}:${derivedKey.toString('hex')}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, originalHash] = storedHash.split(':');

  if (!salt || !originalHash) {
    return false;
  }

  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  const originalKey = Buffer.from(originalHash, 'hex');

  if (derivedKey.length !== originalKey.length) {
    return false;
  }

  return timingSafeEqual(derivedKey, originalKey);
}
