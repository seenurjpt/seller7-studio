"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Loader2, Zap } from "lucide-react";
import { toast } from "@/components/ui/heroui";
import { useAuth } from "@/context/auth-context";
import { paymentsApi } from "@/lib/api/payments";
import { ApiError } from "@/lib/api/client";
import { openCheckout } from "@/lib/razorpay";
import type { CreditPack, Payment } from "@/lib/api/types";

const PRIMARY = "#cc785c";

// Presentation overlay keyed by pack id — pricing/credits still come from the API.
const PRESENTATION: Record<
  string,
  { tagline: string; featured?: boolean; features: string[] }
> = {
  trial: { tagline: "Test the waters", features: ["All styles", "Brand kit", "Standard support"] },
  starter: { tagline: "For getting going", features: ["All styles", "Brand kit", "Standard support"] },
  popular: {
    tagline: "Best value for regular sellers",
    featured: true,
    features: ["All styles", "Brand kit", "Priority generation", "Multi-format export"],
  },
  bulk: {
    tagline: "For high-volume sellers & agencies",
    features: ["All styles", "Brand kit", "Priority generation", "Dedicated support"],
  },
};

const inr = (paise: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function BillingPage() {
  const { user, accessToken, setCredits } = useAuth();
  const [packs, setPacks] = useState<CreditPack[]>([]);
  const [history, setHistory] = useState<Payment[]>([]);
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    if (!accessToken) return;
    try {
      const { data } = await paymentsApi.getHistory(accessToken);
      setHistory(data ?? []);
    } catch {
      /* non-fatal — leave history empty */
    }
  }, [accessToken]);

  useEffect(() => {
    paymentsApi
      .getPacks()
      .then(({ data }) => {
        const list = data ?? [];
        setPacks(list);
        // Default-select the featured pack, else the first.
        const featured = list.find((p) => PRESENTATION[p.id]?.featured);
        setSelectedId(featured?.id ?? list[0]?.id ?? null);
      })
      .catch(() => setPacks([]));
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleBuy = async (pack: CreditPack) => {
    if (!accessToken || buyingId) return;
    setBuyingId(pack.id);

    try {
      const { data: order } = await paymentsApi.createOrder(pack.id, accessToken);
      if (!order) throw new Error("No order returned");

      await openCheckout({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Seller7 Studio",
        description: `${order.pack.name} — ${order.pack.credits} credits`,
        prefill: { name: user?.name, email: user?.email },
        theme: { color: PRIMARY },
        modal: { ondismiss: () => setBuyingId(null) },
        handler: async (resp) => {
          try {
            const { data: result } = await paymentsApi.verify(
              {
                razorpayOrderId: resp.razorpay_order_id,
                razorpayPaymentId: resp.razorpay_payment_id,
                razorpaySignature: resp.razorpay_signature,
              },
              accessToken,
            );
            if (result) {
              setCredits(result.credits);
              toast.success(`${pack.credits} credits added`, {
                description: `New balance: ${result.credits} credits.`,
              });
              loadHistory();
            }
          } catch (err) {
            toast.danger("Payment verification failed", {
              description:
                err instanceof ApiError
                  ? err.message
                  : "Please contact support if you were charged.",
            });
          } finally {
            setBuyingId(null);
          }
        },
      });
    } catch (err) {
      toast.danger("Couldn't start checkout", {
        description: err instanceof ApiError ? err.message : "Please try again.",
      });
      setBuyingId(null);
    }
  };

  const selectedPack = packs.find((p) => p.id === selectedId) ?? null;
  const selectedMeta =
    (selectedPack && PRESENTATION[selectedPack.id]) ?? { tagline: "", features: [] };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Balance header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-hairline bg-surface-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">Available credits</p>
          <div className="mt-1 flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            <span className="font-display text-4xl font-semibold text-ink">
              {user?.credits ?? 0}
            </span>
            <span className="text-sm text-muted">credits</span>
          </div>
        </div>
        <p className="max-w-xs text-sm text-muted">
          Each credit generates one image. Credits never expire — top up whenever you need more.
        </p>
      </div>

      {/* Packs — select & pay */}
      <h2 className="mt-10 font-display text-2xl font-medium text-ink">Buy credits</h2>
      <p className="mt-1 text-sm text-muted">
        Secure payment via Razorpay — UPI, cards &amp; netbanking. GST invoice available.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {packs.map((pack) => {
          const meta = PRESENTATION[pack.id] ?? { tagline: "", features: [] };
          const perImage = Math.round(pack.amount / 100 / pack.credits);
          const isSelected = selectedId === pack.id;

          return (
            <button
              key={pack.id}
              type="button"
              onClick={() => setSelectedId(pack.id)}
              aria-pressed={isSelected}
              className={`relative flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                isSelected
                  ? "border-primary bg-primary/[0.06] ring-1 ring-primary"
                  : "border-hairline bg-surface-card hover:border-primary/40"
              }`}
            >
              {meta.featured && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-on-primary">
                  Most Popular
                </span>
              )}

              {/* Radio dot */}
              <span
                className={`absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full border ${
                  isSelected ? "border-primary bg-primary" : "border-hairline"
                }`}
              >
                {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-on-primary" />}
              </span>

              <span className="text-sm font-medium text-ink">{pack.name}</span>
              <span className="mt-2 font-display text-2xl font-semibold leading-none text-ink">
                {pack.credits}
                <span className="ml-1 text-xs font-normal text-muted">credits</span>
              </span>
              <span className="mt-2 text-sm font-semibold text-ink">{inr(pack.amount)}</span>
              <span className="mt-0.5 text-[11px] text-muted">₹{perImage}/image</span>
            </button>
          );
        })}
      </div>

      {/* Selected summary + single pay CTA */}
      {selectedPack && (
        <div className="mt-5 flex flex-col gap-4 rounded-xl border border-hairline bg-surface-soft p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-ink">
              {selectedPack.name} · {selectedPack.credits} credits
            </p>
            {selectedMeta.features.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {selectedMeta.features.map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-xs text-muted">
                    <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            onClick={() => handleBuy(selectedPack)}
            disabled={!!buyingId}
            className="inline-flex h-11 min-w-[200px] items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-active disabled:cursor-not-allowed disabled:opacity-60"
          >
            {buyingId ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : (
              `Pay ${inr(selectedPack.amount)} · ${selectedPack.credits} credits`
            )}
          </button>
        </div>
      )}

      {/* History */}
      <h2 className="mt-12 font-display text-2xl font-medium text-ink">Purchase history</h2>
      {history.length === 0 ? (
        <p className="mt-3 rounded-xl border border-dashed border-hairline p-6 text-center text-sm text-muted">
          No purchases yet. Your credit purchases will appear here.
        </p>
      ) : (
        <div className="mt-4 overflow-hidden rounded-xl border border-hairline">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-hairline bg-surface-soft text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Pack</th>
                <th className="px-4 py-3 font-medium">Credits</th>
                <th className="px-4 py-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {history.map((p) => (
                <tr key={p._id} className="border-b border-hairline last:border-0">
                  <td className="px-4 py-3 text-muted">{formatDate(p.createdAt)}</td>
                  <td className="px-4 py-3 capitalize text-ink">{p.packId}</td>
                  <td className="px-4 py-3 text-ink">+{p.credits}</td>
                  <td className="px-4 py-3 text-ink">{inr(p.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
