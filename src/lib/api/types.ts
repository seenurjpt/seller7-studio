export type SafeUser = {
  _id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AuthData = {
  accessToken: string;
  user: SafeUser;
};

export type ApiResult<T> = {
  success: boolean;
  message: string;
  data: T | null;
};
