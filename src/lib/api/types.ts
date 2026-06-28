export type SafeUser = {
  _id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  credits: number;
  createdAt: string;
  updatedAt: string;
};

export type AuthData = {
  accessToken: string;
  user: SafeUser;
};

export type CreditPack = {
  id: string;
  name: string;
  credits: number;
  /** Amount in paise. */
  amount: number;
  currency: string;
};

export type CreateOrderResponse = {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  pack: { id: string; name: string; credits: number };
};

export type VerifyPaymentResponse = {
  credits: number;
  alreadyProcessed: boolean;
};

export type Payment = {
  _id: string;
  packId: string;
  credits: number;
  amount: number;
  currency: string;
  status: "created" | "paid" | "failed";
  razorpayPaymentId?: string;
  createdAt: string;
};

export type ApiResult<T> = {
  success: boolean;
  message: string;
  data: T | null;
};
