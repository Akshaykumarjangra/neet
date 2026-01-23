import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, CreditCard } from "lucide-react";
import type { SubscriptionPlan } from "@shared/schema";

type BillingInterval = "monthly" | "yearly";

interface RazorpayCheckoutResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayCheckoutPayload {
  provider: "razorpay";
  keyId: string;
  order: { id: string };
  subscriptionId: number;
  transactionId: string;
  amount: number;
  currency: string;
}

type RazorpayInstance = {
  open: () => void;
  on: (event: string, callback: (response: any) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, any>) => RazorpayInstance;
  }
}

const loadRazorpayScript = () => {
  return new Promise<void>((resolve, reject) => {
    if (document.getElementById("razorpay-checkout")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-checkout";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout"));
    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [razorpay, setRazorpay] = useState<RazorpayInstance | null>(null);

  const params = useMemo(() => {
    if (typeof window === "undefined") return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  }, []);

  const planSlug = params.get("plan") || "";
  const intervalParam = params.get("interval");
  const interval: BillingInterval = intervalParam === "yearly" ? "yearly" : "monthly";

  const { data: plans = [], isLoading: plansLoading } = useQuery<SubscriptionPlan[]>({
    queryKey: ["/api/subscription-plans"],
    queryFn: async () => apiRequest("GET", "/api/subscription-plans"),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  const plan = useMemo(() => {
    if (!planSlug) return undefined;
    return plans.find((p) => p.slug === planSlug);
  }, [planSlug, plans]);

  const startCheckout = async () => {
    if (!plan) {
      setError("Selected plan is unavailable. Please pick another plan.");
      return;
    }
    setIsStarting(true);
    setError(null);
    try {
      await loadRazorpayScript();
      const payload = await apiRequest("POST", "/api/billing/checkout", {
        planId: plan.id,
        billingInterval: interval,
        provider: "razorpay",
      });

      const data = payload as RazorpayCheckoutPayload;
      if (data.provider !== "razorpay") {
        throw new Error("Razorpay checkout is not configured.");
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "NEET Prep",
        description: plan.description || plan.name,
        order_id: data.order.id,
        handler: async (response: RazorpayCheckoutResponse) => {
          try {
            await apiRequest("POST", "/api/billing/razorpay/verify", {
              subscriptionId: data.subscriptionId,
              transactionId: data.transactionId,
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            setLocation("/billing-status?status=success");
          } catch (err: any) {
            const message = err?.message || "Payment verification failed.";
            setError(message);
          }
        },
        modal: {
          ondismiss: () => setLocation("/billing-status?status=cancelled"),
        },
        prefill: {
          email: user?.email,
          name: user?.displayName,
        },
        notes: {
          plan: plan.slug,
          interval,
        },
        theme: {
          color: "#7c3aed",
        },
      };

      const instance = new window.Razorpay!(options);
      instance.on("payment.failed", (response) => {
        setError(response?.error?.description || "Payment failed. Please try again.");
      });
      setRazorpay(instance);
      setIsReady(true);
      instance.open();
    } catch (err: any) {
      setError(err?.message || "Unable to start checkout.");
    } finally {
      setIsStarting(false);
    }
  };

  useEffect(() => {
    if (authLoading || plansLoading) return;
    if (!user) return;
    if (!planSlug) {
      setError("No plan selected. Please choose a plan to continue.");
      return;
    }
    if (!plan) {
      setError("Selected plan was not found. Please choose another plan.");
      return;
    }
    if (plan.planType === "organization" || plan.priceMonthly === 0) {
      setError("This plan cannot be purchased online. Please pick another plan.");
      return;
    }
    startCheckout();
  }, [authLoading, plansLoading, user, planSlug, plan]);

  if (authLoading || plansLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    setLocation(`/login?redirect=${encodeURIComponent(`/checkout?plan=${planSlug}&interval=${interval}`)}`);
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-lg w-full shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Secure Checkout</CardTitle>
          <CardDescription>
            {plan ? `You are upgrading to ${plan.name}.` : "Preparing your checkout session."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert className="border-red-500/30 bg-red-500/10">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>Billing interval: {interval}</span>
            <span>Payment provider: Razorpay</span>
          </div>
          <Button
            onClick={() => {
              if (razorpay) {
                razorpay.open();
              } else {
                startCheckout();
              }
            }}
            disabled={isStarting}
            className="w-full gap-2"
          >
            {isStarting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isReady ? "Open Razorpay" : "Start Payment"}
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => setLocation("/pricing")}>
            Back to pricing
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
