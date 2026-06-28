import { apiClient } from "./client";
import type { SafeUser } from "./types";

export const usersApi = {
  updateMe: (updates: { name?: string }, accessToken: string) =>
    apiClient.patch<SafeUser>("/users/me", updates, {
      Authorization: `Bearer ${accessToken}`,
    }),
};
