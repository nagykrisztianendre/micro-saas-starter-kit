import { AuthService } from './auth.service';
import { requireAuth } from './guards';
import type { AuthUser } from './types';

export async function getCurrentUser(authService: AuthService, sessionId?: string): Promise<AuthUser | null> {
  const authState = await authService.getAuthState(sessionId);
  return authState?.user ?? null;
}

export async function requireCurrentUser(authService: AuthService, sessionId?: string): Promise<AuthUser> {
  const authState = await authService.getAuthState(sessionId);
  return requireAuth(authState).user;
}
