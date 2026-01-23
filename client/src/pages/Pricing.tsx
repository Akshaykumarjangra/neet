import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Check,
  X,
  Sparkles,
  Crown,
  Building2,
  Users,
  BookOpen,
  Target,
  Trophy,
  Zap,
  Clock,
  Play,
  Brain,
  MessageSquare,
  Download,
  HelpCircle,
  ArrowRight,
  Atom,
  FlaskConical,
  Leaf,
  GraduationCap,
  Star,
  Shield,
  Headphones,
  AlertCircle,
  LucideIcon,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import type { SubscriptionPlan } from "@shared/schema";
import { Seo } from "@/components/Seo";
import { apiRequest } from "@/lib/queryClient";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

interface PlanFeature {
  name: string;
  free: boolean | string;
  premium: boolean | string;
  organization: boolean | string;
}

const features: PlanFeature[] = [
  { name: "Access to 50,000+ questions", free: "500 questions", premium: true, organization: true },
  { name: "Chapter-wise reading content", free: "3 chapters", premium: true, organization: true },
  { name: "Mock tests (Full NEET pattern)", free: "1 test/month", premium: "Unlimited", organization: "Unlimited" },
  { name: "Detailed performance analytics", free: "Basic", premium: true, organization: true },
  { name: "AI-powered recommendations", free: false, premium: true, organization: true },
  { name: "Video lessons with 3D visuals", free: false, premium: true, organization: true },
  { name: "Interactive simulations", free: "2 simulations", premium: true, organization: true },
  { name: "Flashcard decks", free: "1 deck", premium: "Unlimited", organization: "Unlimited" },
  { name: "1-on-1 mentor sessions", free: false, premium: "2 sessions/month", organization: "10 sessions/month" },
  { name: "Downloadable study materials", free: false, premium: true, organization: true },
  { name: "Doubt clearing support", free: "Community only", premium: "Priority", organization: "Dedicated" },
  { name: "Previous year questions (PYQ)", free: "2020 only", premium: "All years", organization: "All years" },
  { name: "Personalized study plan", free: false, premium: true, organization: true },
  { name: "Progress tracking dashboard", free: "Basic", premium: "Advanced", organization: "Admin + Student" },
  { name: "Teacher/Admin dashboard", free: false, premium: false, organization: true },
  { name: "Bulk student management", free: false, premium: false, organization: true },
  { name: "School-wide analytics", free: false, premium: false, organization: true },
  { name: "Custom branding", free: false, premium: false, organization: true },
];

interface DisplayPlan {
  planId?: number | string | null;
  planType?: "free" | "premium" | "organization";
  name: string;
  slug: string;
  description: string;
  priceMonthly: number | null;
  priceYearly: number | null;
  icon: LucideIcon;
  color: string;
  buttonVariant: "outline" | "default" | "secondary";
  popular: boolean;
  features: string[];
  currency?: string;
  displayPrice?: string;
  displayPeriod?: string;
  billingNote?: string;
  ctaLabel?: string;
  intervalOverride?: "monthly" | "yearly" | "quarterly";
}

const fallbackPlans: DisplayPlan[] = [
  {
    planId: null,
    planType: "free",
    name: "Free",
    slug: "free",
    description: "Get started with basic NEET preparation",
    priceMonthly: 0,
    priceYearly: 0,
    icon: Sparkles,
    color: "from-gray-500 to-slate-500",
    buttonVariant: "outline",
    popular: false,
    features: [
      "500 practice questions",
      "3 sample chapters",
      "1 mock test per month",
      "Basic progress tracking",
      "Community discussions",
    ],
  },
  {
    planId: "quarterly-starter",
    planType: "premium",
    name: "Quarterly Starter",
    slug: "quarterly-starter",
    description: "Complete NEET preparation with a budget-friendly quarterly plan",
    priceMonthly: 333,
    priceYearly: null,
    icon: Crown,
    color: "from-purple-500 to-pink-500",
    buttonVariant: "default",
    popular: true,
    features: [
      "50,000+ questions",
      "All chapters with rich content",
      "Unlimited mock tests",
      "AI-powered learning path",
      "Video lessons & simulations",
      "2 mentor sessions/month",
      "Priority doubt support",
      "Downloadable materials",
    ],
    currency: "INR",
    displayPrice: "₹1,000",
    displayPeriod: "/ 3 months (best value)",
    billingNote: "₹1,000 billed every 3 months. Cancel anytime.",
    ctaLabel: "Start at ₹1,000 / 3mo",
    intervalOverride: "quarterly",
  },
  {
    planId: null,
    planType: "organization",
    name: "Organization",
    slug: "organization",
    description: "For schools, coaching centers & institutions",
    priceMonthly: null,
    priceYearly: null,
    icon: Building2,
    color: "from-blue-500 to-cyan-500",
    buttonVariant: "secondary",
    popular: false,
    features: [
      "Everything in Premium",
      "Bulk student licenses",
      "Teacher admin dashboard",
      "School-wide analytics",
      "10 mentor sessions/month",
      "Dedicated support",
      "Custom branding",
      "API access",
    ],
  },
];

const getPlanConfig = (planType: string): { icon: LucideIcon; color: string; buttonVariant: "outline" | "default" | "secondary" } => {
  switch (planType) {
    case "free":
      return {
        icon: Sparkles,
        color: "from-gray-500 to-slate-500",
        buttonVariant: "outline",
      };
    case "premium":
      return {
        icon: Crown,
        color: "from-purple-500 to-pink-500",
        buttonVariant: "default",
      };
    case "organization":
      return {
        icon: Building2,
        color: "from-blue-500 to-cyan-500",
        buttonVariant: "secondary",
      };
    default:
      return {
        icon: Sparkles,
        color: "from-gray-500 to-slate-500",
        buttonVariant: "outline",
      };
  }
};

const transformApiPlan = (apiPlan: SubscriptionPlan): DisplayPlan => {
  const config = getPlanConfig(apiPlan.planType);
  return {
    planId: apiPlan.id,
    planType: apiPlan.planType as "free" | "premium" | "organization",
    name: apiPlan.name,
    slug: apiPlan.slug,
    description: apiPlan.description || "",
    priceMonthly: apiPlan.planType === "organization" ? null : Math.round(apiPlan.priceMonthly / 100),
    priceYearly: apiPlan.planType === "organization" ? null : (apiPlan.priceYearly ? Math.round(apiPlan.priceYearly / 100) : null),
    icon: config.icon,
    color: config.color,
    buttonVariant: config.buttonVariant,
    popular: apiPlan.isPopular,
    features: apiPlan.features || [],
    currency: apiPlan.currency || "INR",
  };
};

function PlanCardSkeleton() {
  return (
    <Card className="relative h-full flex flex-col">
      <CardHeader className="text-center pb-4">
        <Skeleton className="mx-auto h-14 w-14 rounded-xl mb-4" />
        <Skeleton className="h-8 w-32 mx-auto mb-2" />
        <Skeleton className="h-4 w-48 mx-auto" />
      </CardHeader>
      <CardContent className="flex-1">
        <div className="text-center mb-6">
          <Skeleton className="h-10 w-24 mx-auto mb-2" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-start gap-2">
              <Skeleton className="h-5 w-5 shrink-0 mt-0.5" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-11 w-full" />
      </CardFooter>
    </Card>
  );
}

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const { theme, setTheme } = useTheme();
  const [, navigate] = useLocation();
  const { user } = useAuth();

  const { data: apiPlans = [], isLoading, isError } = useQuery<SubscriptionPlan[]>({
    queryKey: ["/api/subscription-plans"],
    queryFn: async () => apiRequest("GET", "/api/subscription-plans"),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });

  const plans: DisplayPlan[] = apiPlans && apiPlans.length > 0
    ? apiPlans.map(transformApiPlan)
    : fallbackPlans;

  const formatINR = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const formatPrice = (price: number | null) => {
    if (price === null) return "Custom";
    if (price === 0) return "Free";
    return formatINR.format(price);
  };

  const renderFeatureValue = (value: boolean | string) => {
    if (value === true) {
      return <Check className="h-5 w-5 text-green-500" />;
    }
    if (value === false) {
      return <X className="h-5 w-5 text-muted-foreground/50" />;
    }
    return <span className="text-sm text-muted-foreground">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Pricing | NEET Prep"
        description="Choose the right NEET prep plan: start free, quarterly at ₹1,000/3 months, or talk to sales for institutions."
      />
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">NEET Prep</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" data-testid="button-login">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button data-testid="button-signup">Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Sparkles className="h-3 w-3 mr-1" />
            NEET 2026 Preparation
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-pricing-title">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of NEET aspirants. Get access to comprehensive study materials,
            mock tests, and expert mentorship.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <Label htmlFor="billing-toggle" className={!isYearly ? "font-semibold" : "text-muted-foreground"}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
              data-testid="switch-billing-toggle"
            />
            <Label htmlFor="billing-toggle" className={isYearly ? "font-semibold" : "text-muted-foreground"}>
              Yearly
              <Badge variant="secondary" className="ml-2 bg-green-500/10 text-green-600">
                Save 33%
              </Badge>
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Quarterly Starter is ₹1,000 billed every 3 months (best value). Yearly toggle applies to other plans.
          </p>
        </motion.div>

        {isError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <Card className="border-yellow-500/50 bg-yellow-500/10">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  Unable to load latest pricing. Showing default plans.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid gap-8 md:gap-6 md:grid-cols-3 max-w-6xl mx-auto mb-16">
          {isLoading ? (
            <>
              <PlanCardSkeleton />
              <PlanCardSkeleton />
              <PlanCardSkeleton />
            </>
          ) : (
            plans.map((plan, index) => (
              <motion.div
                key={plan.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`relative h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${plan.popular
                      ? "border-2 border-primary shadow-lg shadow-primary/10"
                      : "hover:border-primary/50"
                    }`}
                  data-testid={`card-plan-${plan.slug}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 w-max">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 shadow-md text-sm">
                        <Star className="h-3.5 w-3.5 mr-1.5 fill-current" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`mx-auto p-3 rounded-xl bg-gradient-to-br ${plan.color} w-fit mb-4`}
                    >
                      <plan.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="text-center mb-6">
                      {plan.displayPrice ? (
                        <>
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-4xl font-bold">
                              {plan.displayPrice}
                            </span>
                            {plan.displayPeriod && (
                              <span className="text-muted-foreground">{plan.displayPeriod}</span>
                            )}
                          </div>
                          {plan.billingNote && (
                            <p className="text-sm text-muted-foreground mt-1">{plan.billingNote}</p>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-4xl font-bold">
                              {formatPrice(isYearly ? plan.priceYearly : plan.priceMonthly)}
                            </span>
                            {plan.priceMonthly !== null && plan.priceMonthly > 0 && (
                              <span className="text-muted-foreground">
                                /{isYearly ? "year" : "month"}
                              </span>
                            )}
                          </div>
                          {isYearly && plan.priceMonthly && plan.priceMonthly > 0 && plan.priceYearly && (
                            <p className="text-sm text-muted-foreground mt-1">
                              ₹{Math.round(plan.priceYearly / 12)}/month billed yearly
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full ${plan.popular
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white"
                          : ""
                        }`}
                      variant={plan.buttonVariant}
                      size="lg"
                      data-testid={`button-select-${plan.slug}`}
                      onClick={() => {
                        if (plan.priceMonthly === null || plan.planType === "organization") {
                          navigate("/contact");
                          return;
                        }
                        if (plan.priceMonthly === 0) {
                          navigate("/signup");
                          return;
                        }
                        const interval = plan.intervalOverride ?? (isYearly ? "yearly" : "monthly");
                        if (user) {
                          navigate(`/checkout?plan=${plan.slug}&interval=${interval}`);
                        } else {
                          navigate(`/signup?redirect=${encodeURIComponent(`/checkout?plan=${plan.slug}&interval=${interval}`)}`);
                        }
                      }}
                    >
                      {plan.priceMonthly === null ? (
                        <>Contact Sales</>
                      ) : plan.priceMonthly === 0 ? (
                        <>Get Started Free</>
                      ) : (
                        <>
                          {plan.ctaLabel ?? "Start Free Trial"}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-8" data-testid="text-compare-title">
            Compare All Features
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse" data-testid="table-features">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 font-medium">
                    <div className="flex flex-col items-center gap-1">
                      <Sparkles className="h-5 w-5 text-gray-500" />
                      Free
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-medium">
                    <div className="flex flex-col items-center gap-1">
                      <Crown className="h-5 w-5 text-purple-500" />
                      Premium
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-medium">
                    <div className="flex flex-col items-center gap-1">
                      <Building2 className="h-5 w-5 text-blue-500" />
                      Organization
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-muted/30" : ""}
                  >
                    <td className="py-3 px-4 text-sm">{feature.name}</td>
                    <td className="py-3 px-4 text-center">
                      {renderFeatureValue(feature.free)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {renderFeatureValue(feature.premium)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {renderFeatureValue(feature.organization)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border-none">
            <CardContent className="p-8">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    For Schools & Coaching Centers
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Get bulk licenses, dedicated support, and powerful analytics
                    to track your students' progress. Custom pricing based on
                    the number of seats.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Secure & Private</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Headphones className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">Dedicated Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-500" />
                      <span className="text-sm">Bulk Management</span>
                    </div>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <Link href="/contact">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white" data-testid="button-contact-sales">
                      <Building2 className="h-5 w-5 mr-2" />
                      Contact Sales
                    </Button>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-3">
                    Or email us at{" "}
                    <a href="mailto:sales@neetprep.com" className="text-primary hover:underline">
                      sales@neetprep.com
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4 text-left">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Can I cancel my subscription anytime?</h4>
                <p className="text-muted-foreground text-sm">
                  Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Is there a free trial for Premium?</h4>
                <p className="text-muted-foreground text-sm">
                  Yes! You get a 7-day free trial when you sign up for Premium. No credit card required to start.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
                <p className="text-muted-foreground text-sm">
                  We accept all major credit/debit cards, UPI, net banking, and popular wallets. For organizations, we also support bank transfers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
                <p className="text-muted-foreground text-sm">
                  We offer a 7-day money-back guarantee if you're not satisfied with our Premium plan.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>

      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 NEET Prep. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


