export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface UserSession {
  id: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

export interface AuthState {
  user: AuthUser;
  session: UserSession;
}

export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserRepository {
  create(input: { email: string; passwordHash: string; role: UserRole }): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  list(): Promise<User[]>;
  clear(): Promise<void>;
}

export interface SessionRepository {
  create(input: { userId: string; expiresAt: string }): Promise<UserSession>;
  findById(id: string): Promise<UserSession | null>;
  deleteById(id: string): Promise<void>;
  deleteExpired(nowIso: string): Promise<void>;
  clear(): Promise<void>;
}
