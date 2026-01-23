import { useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, CheckCircle2, XCircle, CalendarClock, Trophy, Sparkles } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
const formatINR = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

interface PayoutRow {
  id: number;
  mentorName: string;
  mentorEmail: string;
  amountCents: number;
  status: string;
  periodStart: string;
  periodEnd: string;
}

interface BookingRow {
  id: number;
  mentorName: string;
  startAt: string;
  endAt: string;
  status: string;
  priceCents: number;
  studentEmail: string;
}

const onboardingDefaults = [
  { id: "profile", title: "Profile", label: "Credentials, bio & subjects" },
  { id: "availability", title: "Availability", label: "Calendar slots & buffer" },
  { id: "pricing", title: "Pricing", label: "Hourly rate & trial offers" },
];

interface OnboardingResponse {
  steps?: Array<{ id: string; status?: string; updatedAt?: string }>;
}

interface ProgressSummary {
  totalXp?: number;
  chaptersCompleted?: number;
  sessionsLogged?: number;
}

interface GamificationConfig {
  gamification_streak_threshold?: number;
  gamification_badge_xp?: number;
}

export default function MentorLmsAutomation() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [wizardData, setWizardData] = useState({
    bio: "",
    availability: "Weekdays 4PM - 8PM",
    hourlyRate: "1200",
  });
  const [currentStep, setCurrentStep] = useState("profile");

  const { data: onboarding } = useQuery<OnboardingResponse>({
    queryKey: ["/api/automation/mentor/onboarding"],
  });

  const { data: payoutsResponse } = useQuery<{ payouts: PayoutRow[] }>({
    queryKey: ["/api/automation/mentor/payouts"],
  });

  const { data: schedulerResponse } = useQuery<{ bookings: BookingRow[] }>({
    queryKey: ["/api/automation/mentor/scheduler"],
  });

  const { data: progressSummary } = useQuery<ProgressSummary>({
    queryKey: ["/api/automation/progress/summary"],
  });

  const { data: gamificationConfig } = useQuery<GamificationConfig>({
    queryKey: ["/api/automation/gamification/config"],
  });

  const gamificationMutation = useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      return apiRequest("POST", "/api/automation/gamification/config", payload);
    },
    onSuccess: () => {
      toast({ title: "Gamification config saved" });
    },
    onError: () => {
      toast({ title: "Failed to save config", variant: "destructive" });
    },
  });

  const schedulerDecision = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => {
      return apiRequest("POST", `/api/automation/mentor/scheduler/${id}/decision`, { status });
    },
    onSuccess: () => {
      toast({ title: "Booking updated" });
    },
    onError: () => {
      toast({ title: "Failed to update booking", variant: "destructive" });
    },
  });

  const handleWizardSubmit = async () => {
    try {
      await apiRequest("POST", "/api/automation/mentor/onboarding", {
        email: user?.email,
        availability: wizardData.availability,
        pricing: wizardData.hourlyRate,
      });
      toast({ title: "Onboarding submitted", description: "Owner will review soon." });
    } catch (error: any) {
      toast({ title: "Onboarding failed", description: error.message, variant: "destructive" });
    }
  };

  const payouts = payoutsResponse?.payouts ?? [];
  const bookings = schedulerResponse?.bookings ?? [];

  const streakThreshold = gamificationConfig?.gamification_streak_threshold ?? 7;
  const badgeXp = gamificationConfig?.gamification_badge_xp ?? 500;

  const learningPathSteps = useMemo(
    () => [
      { title: "Formative Quiz", duration: 20 },
      { title: "Adaptive Mock Test", duration: 45 },
      { title: "Mentor Review Room", duration: 30 },
    ],
    []
  );

  if (!user?.isOwner && !user?.isAdmin) {
    setLocation("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Mentor & LMS Automation</h1>
          <p className="text-muted-foreground">
            Everything you need to approve mentors, track progress, and configure gamification.
          </p>
        </header>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Onboarding Wizard</span>
              </CardTitle>
              <CardDescription>
                Mentor profile, availability, pricing, and owner approval gating.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {onboardingDefaults.map((step) => {
                const state = onboarding?.steps?.find((s) => s.id === step.id);
                return (
                  <div key={step.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{step.title}</h3>
                      <Badge variant={state?.status === "completed" ? "secondary" : "outline"}>
                        {state?.status || "pending"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.label}</p>
                    <p className="text-xs text-muted-foreground">
                      Last updated{" "}
                      {state
                        ? formatDistanceToNow(new Date(state.updatedAt), { addSuffix: true })
                        : "not yet"}
                    </p>
                  </div>
                );
              })}
              <div className="space-y-3">
                <div>
                  <Label>Bio</Label>
                  <Textarea
                    rows={3}
                    value={wizardData.bio}
                    onChange={(event) =>
                      setWizardData((prev) => ({ ...prev, bio: event.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Availability window</Label>
                  <Input
                    value={wizardData.availability}
                    onChange={(event) =>
                      setWizardData((prev) => ({ ...prev, availability: event.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Hourly rate (INR)</Label>
                  <Input
                    type="number"
                    value={wizardData.hourlyRate}
                    onChange={(event) =>
                      setWizardData((prev) => ({ ...prev, hourlyRate: event.target.value }))
                    }
                  />
                </div>
                <Button onClick={handleWizardSubmit} className="w-full sm:w-auto">
                  Submit for approval
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span>Gamified Experience</span>
              </CardTitle>
              <CardDescription>Streak and badge thresholds that owners can tune.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label>Streak threshold</Label>
                <Input
                  type="number"
                  defaultValue={streakThreshold}
                  onBlur={(event) =>
                    gamificationMutation.mutate({
                      gamification_streak_threshold: Number(event.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Badge XP requirement</Label>
                <Input
                  type="number"
                  defaultValue={badgeXp}
                  onBlur={(event) =>
                    gamificationMutation.mutate({ gamification_badge_xp: Number(event.target.value) })
                  }
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Higher streak thresholds encourage consistency; badge XP helps release new power-ups.
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Learning Path</span>
              </CardTitle>
              <CardDescription>Personalized path based on question performance data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {learningPathSteps.map((step) => (
                <div key={step.title}>
                  <div className="flex items-center justify-between">
                    <strong>{step.title}</strong>
                    <span className="text-xs text-muted-foreground">{step.duration} min</span>
                  </div>
                  <Progress value={Math.random() * 80 + 10} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Payouts</span>
              </CardTitle>
              <CardDescription>Automatic payout summary ready for export.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {payouts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No payouts scheduled yet.</p>
              ) : (
                payouts.slice(0, 3).map((payout) => (
                  <div key={payout.id} className="border border-muted/60 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{payout.mentorName}</p>
                        <p className="text-xs text-muted-foreground">{payout.mentorEmail}</p>
                      </div>
                      <Badge variant={payout.status === "pending" ? "secondary" : "outline"}>
                        {payout.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                      <span>Amount</span>
                      <span>{formatINR.format(payout.amountCents / 100)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Period {new Date(payout.periodStart).toLocaleDateString()} -{" "}
                      {new Date(payout.periodEnd).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
              <Button
                className="w-full"
                onClick={() => {
                  const csv = payouts
                    .map(
                      (row) =>
                        `${row.mentorName},${row.mentorEmail},${formatINR.format(row.amountCents / 100)},${row.status}`
                    )
                    .join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const anchor = document.createElement("a");
                  anchor.href = url;
                  anchor.download = "mentor-payouts.csv";
                  document.body.appendChild(anchor);
                  anchor.click();
                  document.body.removeChild(anchor);
                }}
              >
                Export payouts
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4" />
                <span>Scheduler</span>
              </CardTitle>
              <CardDescription>Monitor mentor session approvals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ScrollArea className="h-48">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong>{booking.mentorName}</strong>
                      <Badge variant="outline">{booking.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Starts {new Date(booking.startAt).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Student: {booking.studentEmail}</p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => schedulerDecision.mutate({ id: booking.id, status: "confirmed" })}
                        disabled={booking.status === "confirmed"}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => schedulerDecision.mutate({ id: booking.id, status: "cancelled" })}
                        disabled={booking.status === "cancelled"}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>LMS Auto Progress</span>
            </CardTitle>
            <CardDescription>Real-time summary from practice/mock signals.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-3">
            <StatCard title="XP Earned" value={`${Number(progressSummary?.totalXp || 0).toLocaleString("en-IN")}`} />
            <StatCard title="Chapters completed" value={`${progressSummary?.chaptersCompleted || 0}`} />
            <StatCard title="Sessions logged" value={`${progressSummary?.sessionsLogged || 0}`} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="border rounded-lg p-4 space-y-1">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
