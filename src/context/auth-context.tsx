"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "@/components/ui/heroui";
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
  setCredits: (credits: number) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,
  });

  // Silent refresh on mount — restores session from httpOnly refresh cookie.
  // Guard against React StrictMode's double-invoke in dev: a second refresh
  // would replay the same (rotated) token and trip the backend's reuse
  // detection, wiping the session and logging the user out on every reload.
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
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
    toast.success("Logged in", {
      description: data?.user?.name ? `Welcome back, ${data.user.name}.` : undefined,
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
    toast.success("Logged out", {
      description: "You've been signed out of your account.",
    });
  }, [state.accessToken]);

  const setCredits = useCallback((credits: number) => {
    setState((prev) =>
      prev.user ? { ...prev, user: { ...prev.user, credits } } : prev,
    );
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, setCredits }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
