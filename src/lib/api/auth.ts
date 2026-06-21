import { apiClient } from "./client";
import type { AuthData, SafeUser } from "./types";

export const authApi = {
  signup: (name: string, email: string, password: string) =>
    apiClient.post<AuthData>("/auth/signup", { name, email, password }),

  login: (email: string, password: string) =>
    apiClient.post<AuthData>("/auth/login", { email, password }),

  logout: (accessToken: string) =>
    apiClient.post<null>("/auth/logout", {}, {
      Authorization: `Bearer ${accessToken}`,
    }),

  refresh: () => apiClient.post<AuthData>("/auth/refresh", {}),

  forgotPassword: (email: string) =>
    apiClient.post<null>("/auth/forgot-password", { email }),

  resetPassword: (token: string, newPassword: string) =>
    apiClient.post<null>("/auth/reset-password", { token, newPassword }),

  getMe: (accessToken: string) =>
    apiClient.get<SafeUser>("/users/me", {
      Authorization: `Bearer ${accessToken}`,
    }),
};
