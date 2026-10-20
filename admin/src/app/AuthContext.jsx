'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { adminApi } from '@/lib/adminApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    try {
      const res = await adminApi.me();
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMe(); }, [fetchMe]);

  const login = async (email, password) => {
    const res = await adminApi.login({ email, password });
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    await adminApi.logout().catch(() => {});
    setUser(null);
  };

  // Helper: does user have a specific permission?
  const can = (module, action) =>
    user?.permissions?.[module]?.[action] === true;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, can, refreshUser: fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
