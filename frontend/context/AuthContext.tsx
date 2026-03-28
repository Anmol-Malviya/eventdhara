// frontend/context/AuthContext.tsx
'use client';
// WHY 'use client': context uses useState, useEffect — these are
// browser-only React features. Server Components cannot use them.

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import type { User } from '@/types/user';
import { api } from '@/lib/api';
import { setAuthCookie, clearAuthCookie } from '@/lib/utils';
import { AUTH_STORAGE_KEY } from '@/lib/constants';

interface AuthContextType {
  user: User | null;        // null = not logged in
  isLoading: boolean;       // true while checking if token is valid on mount
  isLoggedIn: boolean;      // shorthand for !!user
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// createContext with null default — useAuth() will throw if used
// outside AuthProvider (caught early in development)
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // isLoading starts true because we don't know if user is logged
  // in until useEffect runs and checks localStorage

  useEffect(() => {
    // This runs once when the app first loads in the browser
    const token = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!token) {
      // No token stored — user is definitely not logged in
      setIsLoading(false);
      return;
    }

    // Token exists — verify it's still valid with the backend
    // If token expired, backend returns 401 and we clear everything
    api.get<User>('/auth/me')
      .then((userData) => setUser(userData))
      .catch(() => {
        // Token invalid or expired
        localStorage.removeItem(AUTH_STORAGE_KEY);
        clearAuthCookie();
      })
      .finally(() => setIsLoading(false));
  }, []); // empty array = runs once on mount only

  const login = async (email: string, password: string): Promise<void> => {
    // Throws if login fails — calling component handles the error
    const data = await api.post<{ token: string; user: User }>(
      '/auth/login',
      { email, password }
    );

    localStorage.setItem(AUTH_STORAGE_KEY, data.token); // for api.ts
    setAuthCookie(data.token);                           // for proxy.ts
    setUser(data.user);
  };

  const logout = (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    clearAuthCookie();
    setUser(null);
  };

  // useMemo: the context value object is recreated on every render by default.
  // That would cause ALL consumers (Navbar, dashboard, etc.) to re-render
  // even if nothing auth-related changed. useMemo prevents that.
  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading,
      isLoggedIn: !!user,
      login,
      logout,
    }),
    [user, isLoading] // only recompute when user or isLoading changes
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  // This error only triggers in development if you forget to
  // wrap your app with AuthProvider in layout.tsx
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}