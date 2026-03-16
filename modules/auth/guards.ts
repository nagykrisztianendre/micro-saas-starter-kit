import { AccessDeniedError, AuthRequiredError } from '../../core/errors';
import type { AuthState, UserRole } from './types';

export function isAuthenticated(authState: AuthState | null): authState is AuthState {
  return Boolean(authState?.session && authState.user);
}

export function requireAuth(authState: AuthState | null): AuthState {
  if (!isAuthenticated(authState)) {
    throw new AuthRequiredError();
  }

  return authState;
}

export function requireRole(authState: AuthState | null, role: UserRole): AuthState {
  const state = requireAuth(authState);

  if (state.user.role !== role) {
    throw new AccessDeniedError();
  }

  return state;
}

export const requireAuthenticated = requireAuth;
