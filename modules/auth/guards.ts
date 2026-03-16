import type { AuthState, UserRole } from './types';

export function isAuthenticated(authState: AuthState | null): authState is AuthState {
  return Boolean(authState?.session && authState.user);
}

export function requireAuthenticated(authState: AuthState | null): AuthState {
  if (!isAuthenticated(authState)) {
    throw new Error('Authentication required.');
  }

  return authState;
}

export function hasRole(authState: AuthState | null, role: UserRole): boolean {
  return authState?.user.role === role;
}
