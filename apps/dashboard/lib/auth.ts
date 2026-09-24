'use client';

import { create } from 'zustand';
import { z } from 'zod';
import type { AuthUser } from '@/lib/auth-session';

export type { AuthUser } from '@/lib/auth-session';

type AuthStatus = 'checking' | 'authenticated' | 'anonymous';

const authUserSchema = z.object({
  userId: z.string().min(1).max(128),
  tenantId: z.string().min(1).max(128),
  roles: z.array(z.string().min(1).max(64)).min(1).max(20),
  email: z.string().max(254),
});

interface AuthState {
  readonly user: AuthUser | null;
  readonly status: AuthStatus;
  hydrate: () => Promise<void>;
  login: (user: AuthUser) => void;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
}

async function readSession(): Promise<AuthUser | null> {
  const response = await fetch('/api/auth/session', {
    credentials: 'same-origin',
    cache: 'no-store',
  });
  if (!response.ok) return null;
  const body: unknown = await response.json();
  const session = z.object({ user: authUserSchema }).safeParse(body);
  return session.success ? session.data.user : null;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  status: 'checking',
  hasRole: (role) => get().user?.roles.includes(role) === true,
  hydrate: async () => {
    try {
      const user = await readSession();
      set({ user, status: user ? 'authenticated' : 'anonymous' });
    } catch {
      set({ user: null, status: 'anonymous' });
    }
  },
  login: (user) => set({ user, status: 'authenticated' }),
  logout: async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-store',
      });
    } finally {
      set({ user: null, status: 'anonymous' });
    }
  },
}));
