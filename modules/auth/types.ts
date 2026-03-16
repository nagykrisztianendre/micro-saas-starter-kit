export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
}

export interface PublicUser {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Session {
  id: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

export interface AuthState {
  user: PublicUser;
  session: Session;
}

export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthStore {
  users: User[];
  sessions: Session[];
}

export interface UserRepository {
  create(input: { email: string; passwordHash: string; role: UserRole }): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  clear(): Promise<void>;
}

export interface SessionRepository {
  create(input: { userId: string; expiresAt: string }): Promise<Session>;
  findById(id: string): Promise<Session | null>;
  deleteById(id: string): Promise<void>;
  deleteExpired(nowIso: string): Promise<void>;
  clear(): Promise<void>;
}
