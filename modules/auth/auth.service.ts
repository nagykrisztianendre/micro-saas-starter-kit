import bcrypt from 'bcryptjs';

import { AppError } from '../../core/errors';
import { getAuthConfig } from '../../core/auth-config';
import type { AuthState, AuthUser, LoginInput, RegisterInput, SessionRepository, UserRepository } from './types';
import { validateLoginInput, validateRegisterInput } from './validators';

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

  async register(input: RegisterInput): Promise<AuthUser> {
    const normalizedInput = validateRegisterInput(input);
    const existingUser = await this.deps.userRepository.findByEmail(normalizedInput.email);

    if (existingUser) {
      throw new AppError('AUTH_DUPLICATE_EMAIL', 'This email is already registered. Try logging in instead.', 409, true);
    }

    const passwordHash = await hashPassword(normalizedInput.password);
    const user = await this.deps.userRepository.create({ email: normalizedInput.email, passwordHash, role: 'user' });

    return toAuthUser(user);
  }

  async login(input: LoginInput): Promise<AuthState> {
    const normalizedInput = validateLoginInput(input);
    const user = await this.deps.userRepository.findByEmail(normalizedInput.email);

    if (!user || !(await verifyPassword(normalizedInput.password, user.passwordHash))) {
      throw new AppError('AUTH_INVALID_CREDENTIALS', 'Invalid email or password.', 401, true);
    }

    const expiresAt = new Date(Date.now() + this.sessionDurationMs).toISOString();
    const session = await this.deps.sessionRepository.create({ userId: user.id, expiresAt });

    return { user: toAuthUser(user), session };
  }

  async getAuthState(sessionId: string | undefined): Promise<AuthState | null> {
    if (!sessionId) return null;

    await this.deps.sessionRepository.deleteExpired(new Date().toISOString());
    const session = await this.deps.sessionRepository.findById(sessionId);
    if (!session) return null;

    const user = await this.deps.userRepository.findById(session.userId);
    if (!user) return null;

    return { user: toAuthUser(user), session };
  }

  async logout(sessionId: string | undefined): Promise<void> {
    if (!sessionId) return;
    await this.deps.sessionRepository.deleteById(sessionId);
  }
}

function toAuthUser(user: { id: string; email: string; role: 'user' | 'admin'; createdAt: string }): AuthUser {
  return { id: user.id, email: user.email, role: user.role, createdAt: user.createdAt };
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  return bcrypt.compare(password, storedHash);
}
