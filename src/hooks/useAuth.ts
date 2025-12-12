'use client';
import { useEffect, useState } from 'react';
import type { User } from '../lib/auth';
import { getCurrentUser, registerUser, loginUser, logoutUser } from '../lib/auth';

export default function useAuth() {
  const [user, setUser] = useState<User | null>(() => getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onStorage = () => setUser(getCurrentUser());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const signUp = async (data: { fullName: string; email: string; password: string }) => {
    setError(null);
    setLoading(true);
    try {
      const res = registerUser({ fullName: data.fullName, email: data.email, password: data.password });
      if (!res.success) {
        setError(res.error || 'Signup failed');
        return null;
      }
      setUser(res.user || null);
      return res.user || null;
    } catch (err) {
      setError((err as Error)?.message || 'Signup failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const res = loginUser(email, password);
      if (!res.success) {
        setError(res.error || 'Invalid credentials');
        return null;
      }
      setUser(res.user || null);
      return res.user || null;
    } catch (err) {
      setError((err as Error)?.message || 'Sign in failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    logoutUser();
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
    clearError: () => setError(null),
  } as const;
}
