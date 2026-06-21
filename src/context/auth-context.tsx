"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authApi } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import type { SafeUser } from "@/lib/api/types";

type AuthState = {
  user: SafeUser | null;
  accessToken: string | null;
  isLoading: boolean;
};

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,
  });

  // Silent refresh on mount — restores session from httpOnly refresh cookie
  useEffect(() => {
    authApi
      .refresh()
      .then(({ data }) => {
        setState({
          user: data?.user ?? null,
          accessToken: data?.accessToken ?? null,
          isLoading: false,
        });
      })
      .catch(() => {
        setState({ user: null, accessToken: null, isLoading: false });
      });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await authApi.login(email, password);
    setState({
      user: data?.user ?? null,
      accessToken: data?.accessToken ?? null,
      isLoading: false,
    });
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      const { data } = await authApi.signup(name, email, password);
      setState({
        user: data?.user ?? null,
        accessToken: data?.accessToken ?? null,
        isLoading: false,
      });
    },
    [],
  );

  const logout = useCallback(async () => {
    if (state.accessToken) {
      try {
        await authApi.logout(state.accessToken);
      } catch (err) {
        if (!(err instanceof ApiError)) throw err;
      }
    }
    setState({ user: null, accessToken: null, isLoading: false });
  }, [state.accessToken]);

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
