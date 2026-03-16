import { db } from '../../core/db';
import { AuthService } from './auth.service';
import { PrismaSessionRepository, InMemorySessionRepository } from './session.repository';
import { PrismaUserRepository, InMemoryUserRepository } from './user.repository';

export function createAuthService(): AuthService {
  return new AuthService({
    userRepository: new PrismaUserRepository(db),
    sessionRepository: new PrismaSessionRepository(db),
  });
}

export function createInMemoryAuthService(): AuthService {
  return new AuthService({
    userRepository: new InMemoryUserRepository(),
    sessionRepository: new InMemorySessionRepository(),
  });
}

export const authService = createAuthService();

export const authModule = {
  moduleName: 'auth',
  services: { authService },
  routes: ['/login', '/register', '/logout'],
  types: ['AuthUser', 'UserSession'],
};

export * from './auth.service';
export * from './guards';
export * from './session';
export * from './session.service';
export * from './session.repository';
export * from './types';
export * from './user.repository';
export * from './validators';
