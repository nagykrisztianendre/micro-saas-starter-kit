import { join } from 'node:path';

import { AuthService } from './auth.service';
import { FileSessionRepository, InMemorySessionRepository } from './session.repository';
import { FileUserRepository, InMemoryUserRepository } from './user.repository';

const DEFAULT_STORE_PATH = join(process.cwd(), 'modules', 'auth', 'data', 'auth-store.json');

export function createFileAuthService(storePath = DEFAULT_STORE_PATH): AuthService {
  return new AuthService({
    userRepository: new FileUserRepository(storePath),
    sessionRepository: new FileSessionRepository(storePath),
  });
}

export function createInMemoryAuthService(): AuthService {
  return new AuthService({
    userRepository: new InMemoryUserRepository(),
    sessionRepository: new InMemorySessionRepository(),
  });
}

export const authService = createFileAuthService();

export * from './auth.service';
export * from './guards';
export * from './session';
export * from './session.repository';
export * from './types';
export * from './user.repository';
export * from './validators';
