'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api } from '@/lib/api';

type User = { _id?: string; id?: string; name: string; email: string };

type AuthCtx = {
  user: User | null;
  loading: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>(null as any);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<User>('/auth/me')
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const register = async (name: string, email: string, password: string) => {
    setUser(await api<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }));
  };

  const login = async (email: string, password: string) => {
    setUser(await api<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }));
  };

  const logout = async () => {
    await api('/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return (
    <Ctx.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </Ctx.Provider>
  );
}