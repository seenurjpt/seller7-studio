import { apiClient } from "./client";
import type {
  CreateOrderResponse,
  CreditPack,
  Payment,
  VerifyPaymentResponse,
} from "./types";

function authHeader(accessToken: string) {
  return { Authorization: `Bearer ${accessToken}` };
}

export const paymentsApi = {
  getPacks: () => apiClient.get<CreditPack[]>("/payments/packs"),

  getBalance: (accessToken: string) =>
    apiClient.get<{ credits: number }>("/payments/balance", authHeader(accessToken)),

  getHistory: (accessToken: string) =>
    apiClient.get<Payment[]>("/payments/history", authHeader(accessToken)),

  createOrder: (packId: string, accessToken: string) =>
    apiClient.post<CreateOrderResponse>(
      "/payments/order",
      { packId },
      authHeader(accessToken),
    ),

  verify: (
    payload: {
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
    },
    accessToken: string,
  ) =>
    apiClient.post<VerifyPaymentResponse>(
      "/payments/verify",
      payload,
      authHeader(accessToken),
    ),
};
