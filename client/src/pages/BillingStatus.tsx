import { useMemo } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle, Clock, GraduationCap, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";

type BillingInterval = "monthly" | "yearly";

interface SubscriptionStatusResponse {
  subscription: {
    id: number;
    status: string;
    billingInterval: BillingInterval;
    currentPeriodEnd: string | null;
    currentPeriodStart: string | null;
    autoRenew: boolean | null;
    planName: string;
    planSlug: string;
    currency: string | null;
  } | null;
}

const STATUS_COPY: Record<
  string,
  { title: string; message: string; tone: "success" | "warning" | "info"; icon: typeof CheckCircle2 }
> = {
  success: {
    title: "Payment received",
    message: "Thanks for upgrading! Your subscription is being activated.",
    tone: "success",
    icon: CheckCircle2,
  },
  cancelled: {
    title: "Checkout cancelled",
    message: "No charges were made. You can restart the payment whenever you're ready.",
    tone: "warning",
    icon: AlertCircle,
  },
  active: {
    title: "Subscription already active",
    message: "You're already on a premium plan. Enjoy the learning experience!",
    tone: "info",
    icon: CheckCircle2,
  },
};

const STATUS_BADGE_STYLES: Record<string, string> = {
  active: "bg-green-500/15 text-green-600 border-green-500/20",
  pending: "bg-yellow-500/15 text-yellow-600 border-yellow-500/20",
  cancelled: "bg-red-500/15 text-red-600 border-red-500/20",
  expired: "bg-slate-500/15 text-slate-600 border-slate-500/20",
};

export default function BillingStatus() {
  const { user } = useAuth();

  const {
    data = { subscription: null },
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery<SubscriptionStatusResponse>({
    queryKey: ["/api/billing/status"],
    queryFn: async () => apiRequest("GET", "/api/billing/status"),
    enabled: !!user,
    staleTime: 60_000,
  });

  const statusParam = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    return new URLSearchParams(window.location.search).get("status") || undefined;
  }, []);

  const subscription = data.subscription ?? null;
  const renewalDate =
    subscription?.currentPeriodEnd ? format(new Date(subscription.currentPeriodEnd), "PPP") : "—";

  const statusLabel = subscription?.status
    ? subscription.status.replace(/_/g, " ")
    : "Not Subscribed";

  const badgeStyle =
    (subscription?.status && STATUS_BADGE_STYLES[subscription.status]) ||
    "bg-slate-500/15 text-slate-600 border-slate-500/20";

  const bannerCopy = statusParam ? STATUS_COPY[statusParam] : undefined;
  const BannerIcon = bannerCopy?.icon ?? AlertCircle;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold">NEET Prep</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to app
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Billing Status</h1>
          <p className="text-muted-foreground">
            Track your subscription and confirm recent payment attempts.
          </p>
        </div>

        {bannerCopy && (
          <Alert
            className={`border ${
              bannerCopy.tone === "success"
                ? "border-green-500/30 bg-green-500/10"
                : bannerCopy.tone === "warning"
                  ? "border-yellow-500/30 bg-yellow-500/10"
                  : "border-blue-500/30 bg-blue-500/10"
            }`}
          >
            <BannerIcon className="h-4 w-4" />
            <AlertDescription>
              <span className="font-medium block">{bannerCopy.title}</span>
              <span className="text-sm">{bannerCopy.message}</span>
            </AlertDescription>
          </Alert>
        )}

        {isError && (
          <Alert className="border-red-500/30 bg-red-500/10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between gap-4">
              <span>We couldn't load your subscription details.</span>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Card className="shadow-lg">
            <CardHeader className="flex flex-col gap-2 text-center">
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                {subscription ? "Here are the latest details for your subscription." : "No active subscription found."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {subscription ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Plan</p>
                      <p className="text-xl font-semibold">{subscription.planName}</p>
                    </div>
                    <Badge className={badgeStyle} variant="outline">
                      {statusLabel}
                    </Badge>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-lg border bg-muted/50">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Billing interval
                      </p>
                      <p className="text-lg font-semibold capitalize">
                        {subscription.billingInterval}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border bg-muted/50">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Renews on
                      </p>
                      <p className="text-lg font-semibold flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {renewalDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link href="/dashboard">
                      <Button size="lg">Go to Dashboard</Button>
                    </Link>
                    <Link href="/pricing">
                      <Button variant="outline" size="lg">
                        Manage Plan
                      </Button>
                    </Link>
                  </div>
                  {isFetching && (
                    <p className="text-xs text-muted-foreground text-center">
                      Refreshing latest status...
                    </p>
                  )}
                </>
              ) : (
                <div className="space-y-6 text-center">
                  <p className="text-muted-foreground">
                    You don't have an active subscription yet. Upgrade to unlock premium content.
                  </p>
                  <Link href="/pricing">
                    <Button size="lg" className="gap-2">
                      View Plans
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
