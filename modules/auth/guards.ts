import type { AuthState, UserRole } from './types';

export function isAuthenticated(authState: AuthState | null): authState is AuthState {
  return Boolean(authState?.session && authState.user);
}

export function requireAuth(authState: AuthState | null): AuthState {
  if (!isAuthenticated(authState)) {
    throw new Error('Authentication required.');
  }

  return authState;
}

export function requireRole(authState: AuthState | null, role: UserRole): AuthState {
  const state = requireAuth(authState);

  if (state.user.role !== role) {
    throw new Error('Forbidden.');
  }

  return state;
}

export const requireAuthenticated = requireAuth;
