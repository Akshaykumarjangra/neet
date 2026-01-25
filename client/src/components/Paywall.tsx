import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import {
  Lock,
  Crown,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Target,
  BookOpen,
  Video,
  Brain,
  Users
} from "lucide-react";

interface PaywallProps {
  feature: string;
  description?: string;
  freeLimit?: string;
  variant?: "inline" | "fullpage" | "modal";
  children?: React.ReactNode;
  isLocked?: boolean;
}

const premiumFeatures = [
  { icon: Target, text: "50,000+ practice questions" },
  { icon: BookOpen, text: "All chapters with rich content" },
  { icon: Video, text: "Video lessons & 3D simulations" },
  { icon: Brain, text: "AI-powered learning path" },
  { icon: Users, text: "2 mentor sessions/month" },
];

export function Paywall({
  feature,
  description,
  freeLimit,
  variant = "inline",
  isLocked,
  children
}: PaywallProps) {
  const { user, isAuthenticated } = useAuth();

  if (user?.isPaidUser && !isLocked) {
    return <>{children}</>;
  }

  if (variant === "fullpage") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <Card className="max-w-lg w-full border-2 border-primary/20 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 p-4 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <Crown className="h-12 w-12 text-primary" />
            </div>
            <Badge className="mx-auto mb-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              Premium Feature
            </Badge>
            <CardTitle className="text-2xl">{feature}</CardTitle>
            <CardDescription className="text-base">
              {description || "Upgrade to Premium to unlock this feature"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {freeLimit && (
              <div className="p-3 rounded-lg bg-muted/50 text-center text-sm">
                <span className="text-muted-foreground">Free plan limit: </span>
                <span className="font-medium">{freeLimit}</span>
              </div>
            )}
            <div className="space-y-2">
              <p className="text-sm font-medium text-center text-muted-foreground">
                Premium includes:
              </p>
              <div className="grid gap-2">
                {premiumFeatures.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    <span>{feat.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Link href="/pricing" className="w-full">
              <Button className="w-full gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" data-testid="button-upgrade-premium">
                <Crown className="h-4 w-4" />
                Upgrade to Premium
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            {!isAuthenticated && (
              <p className="text-sm text-center text-muted-foreground">
                Already have Premium?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Log in
                </Link>
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (variant === "modal") {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-primary/20 shadow-2xl animate-in zoom-in-95 duration-200">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 p-3 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <Lock className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-xl">{feature}</CardTitle>
            <CardDescription>
              {description || "This feature requires a Premium subscription"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {freeLimit && (
              <div className="p-2 rounded-lg bg-muted/50 text-center text-sm mb-4">
                <span className="text-muted-foreground">Free limit reached: </span>
                <span className="font-medium">{freeLimit}</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex gap-2">
            <Link href="/pricing" className="flex-1">
              <Button className="w-full gap-2" data-testid="button-view-plans">
                <Crown className="h-4 w-4" />
                View Plans
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10 flex items-end justify-center pb-8">
        <Card className="max-w-sm shadow-lg border-2 border-primary/20">
          <CardContent className="pt-6 text-center space-y-3">
            <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{feature}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {description || "Upgrade to Premium to unlock"}
              </p>
            </div>
            {freeLimit && (
              <p className="text-xs text-muted-foreground bg-muted rounded-lg py-1.5 px-3">
                Free limit: {freeLimit}
              </p>
            )}
            <Link href="/pricing">
              <Button className="gap-2" size="sm" data-testid="button-upgrade-inline">
                <Crown className="h-4 w-4" />
                Upgrade to Premium
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <div className="opacity-30 pointer-events-none select-none blur-[2px]">
        {children}
      </div>
    </div>
  );
}

export function PremiumBadge({ className }: { className?: string }) {
  return (
    <Badge className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 ${className}`}>
      <Crown className="h-3 w-3 mr-1" />
      Premium
    </Badge>
  );
}

export function useSubscription() {
  const { user, isAuthenticated, isLoading } = useAuth();

  return {
    isPremium: user?.isPaidUser ?? false,
    isAdmin: user?.isAdmin ?? false,
    subscription: {
      type: user?.isPaidUser ? "premium" : "free",
      expiresAt: user?.accessExpiry ? new Date(user.accessExpiry) : null,
    },
    isAuthenticated,
    isLoading,
    canAccess: (feature: "mock_tests" | "full_questions" | "video_lessons" | "ai_features" | "mentor_sessions") => {
      if (!isAuthenticated) return false;
      if (user?.isPaidUser) return true;

      const freeAccessMap: Record<string, boolean> = {
        mock_tests: false,
        full_questions: false,
        video_lessons: false,
        ai_features: false,
        mentor_sessions: false,
      };

      return freeAccessMap[feature] ?? false;
    },
    freeLimits: {
      questions: 10,
      mockTests: 1,
      chapters: 3,
      simulations: 2,
      flashcardDecks: 1,
    },
  };
}
