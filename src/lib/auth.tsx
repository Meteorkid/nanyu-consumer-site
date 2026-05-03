"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

interface StoredUser extends User {
  passwordHash: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

const USERS_STORAGE_KEY = "nanyu-users";
const CURRENT_USER_KEY = "nanyu-current-user";

function hashPassword(password: string): string {
  // 简单哈希，生产环境应使用 bcrypt 等
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `hashed_${Math.abs(hash).toString(36)}`;
}

function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function getStoredUsers(): StoredUser[] {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function getCurrentUser(): User | null {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveCurrentUser(user: User | null) {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const user = getCurrentUser();
    setState({ user, isLoading: false });
  }, []);

  const login = async (email: string, password: string) => {
    const users = getStoredUsers();
    const storedUser = users.find((u) => u.email === email);

    if (!storedUser) {
      return { success: false, error: "用户不存在" };
    }

    if (storedUser.passwordHash !== hashPassword(password)) {
      return { success: false, error: "密码错误" };
    }

    const { passwordHash: _, ...user } = storedUser;
    saveCurrentUser(user);
    setState({ user, isLoading: false });
    return { success: true };
  };

  const register = async (data: RegisterData) => {
    const users = getStoredUsers();

    if (users.some((u) => u.email === data.email)) {
      return { success: false, error: "该邮箱已注册" };
    }

    const newUser: StoredUser = {
      id: generateId(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      passwordHash: hashPassword(data.password),
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    const { passwordHash: _, ...user } = newUser;
    saveCurrentUser(user);
    setState({ user, isLoading: false });
    return { success: true };
  };

  const logout = () => {
    saveCurrentUser(null);
    setState({ user: null, isLoading: false });
  };

  const updateProfile = (data: Partial<User>) => {
    if (!state.user) return;

    const updatedUser = { ...state.user, ...data };
    saveCurrentUser(updatedUser);

    // 同时更新 users 列表
    const users = getStoredUsers();
    const index = users.findIndex((u) => u.id === state.user!.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...data };
      saveUsers(users);
    }

    setState({ user: updatedUser, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
