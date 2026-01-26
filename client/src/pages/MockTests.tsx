import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuickNavigationBar } from "@/components/QuickNavigationBar";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Target, FileQuestion, AlertCircle, RefreshCw, ClipboardList, Lock, Crown, Calendar } from "lucide-react";
import { useLocation, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Paywall, useSubscription } from "@/components/Paywall";
import { Seo } from "@/components/SEO";
import { SEO_PAGES, getExamSchema, getBreadcrumbSchema } from "@/config/seo";
import React from "react";

interface MockExamPaper {
  id: number;
  title: string;
  description?: string | null;
  durationMinutes: number;
  sectionCount?: number;
  totalQuestions?: number;
  startsAt?: string | null;
  endsAt?: string | null;
  attemptsAllowed?: number;
}

interface MockExamAttempt {
  id: number;
  paperId: number;
  status: string;
  startedAt: string;
  submittedAt?: string | null;
}

export default function MockTests() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { isPremium, freeLimits, isAuthenticated } = useSubscription();

  const [activeTab, setActiveTab] = React.useState("available");

  const { data: tests = [], isLoading, error, refetch } = useQuery<MockExamPaper[]>({
    queryKey: ["/api/mock-exams/papers", activeTab],
    queryFn: async () => {
      // Fetch based on active tab
      const searchParams = new URLSearchParams(window.location.search);
      const seriesId = searchParams.get("seriesId");
      const status = activeTab === "past" ? "completed" : activeTab === "upcoming" ? "upcoming" : "available";
      const payload = await apiRequest("GET", `/ api / mock - exams / papers ? status = ${status}${seriesId ? `&seriesId=${seriesId}` : ""} `);
      return Array.isArray(payload?.data) ? payload.data : [];
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000,
    networkMode: "online",
  });

  const { data: attempts = [] } = useQuery<MockExamAttempt[]>({
    queryKey: ["/api/mock-exams/attempts"],
    queryFn: async () => {
      const payload = await apiRequest("GET", "/api/mock-exams/attempts");
      return Array.isArray(payload?.data) ? payload.data : [];
    },
    enabled: isAuthenticated,
  });

  const attemptsThisMonth = attempts.filter((attempt) => {
    const dateValue = attempt.submittedAt || attempt.startedAt;
    if (!dateValue) return false;
    const attemptDate = new Date(dateValue);
    const now = new Date();
    return attemptDate.getFullYear() === now.getFullYear() && attemptDate.getMonth() === now.getMonth();
  }).length;

  const freeTestsRemaining = freeLimits.mockTests - attemptsThisMonth;
  const canStartFreeTest = isPremium || freeTestsRemaining > 0;

  const startMutation = useMutation({
    mutationFn: async (paperId: number) => apiRequest("POST", `/ api / mock - exams / papers / ${paperId}/start`),
    onSuccess: (response: any, paperId) => {
      const attemptId = response?.attemptId;
      if (attemptId) {
        localStorage.setItem(`mock_exam_attempt_${paperId}`, String(attemptId));
      }
      if (response?.paper?.title) {
        localStorage.setItem(`mock_exam_paper_${paperId}`, JSON.stringify({
          title: response.paper.title,
          durationMinutes: response.paper.durationMinutes,
          totalMarks: response.paper.totalMarks,
        }));
      }
      sessionStorage.setItem(`mock_exam_start_${paperId}`, JSON.stringify(response));
      setLocation(`/mock-test/${paperId}?attemptId=${attemptId ?? ""}`);
    },
    onError: (error: any) => {
      console.error("Failed to start mock exam:", error);
      const message = typeof error?.message === "string" ? error.message : "Failed to start test. Please try again.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });

  const startTest = async (paperId: number) => {
    startMutation.mutate(paperId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="mb-8">
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-5 w-80" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 max-w-6xl">
          <Card className="max-w-lg mx-auto">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="p-4 rounded-full bg-destructive/10 w-fit mx-auto">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold">Unable to Load Tests</h3>
              <p className="text-muted-foreground">
                {error instanceof Error ? error.message : "We couldn't load the mock tests right now. Please check your connection and try again."}
              </p>
              <Button onClick={() => refetch()} className="gap-2" data-testid="button-retry-tests">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
          <div className="mt-12 pt-8 border-t">
            <QuickNavigationBar currentPath="/mock-tests" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={SEO_PAGES.mockTests.title}
        description={SEO_PAGES.mockTests.description}
        keywords={SEO_PAGES.mockTests.keywords}
        url="https://neet.zeropage.in/mock-tests"
        structuredData={[
          getExamSchema(
            "NEET Mock Test Series 2026",
            "Full-length NEET mock tests matching the exact exam pattern with instant results and detailed analysis"
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Mock Tests", url: "/mock-tests" }
          ])
        ]}
      />
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Mock Tests</h1>
                <p className="text-muted-foreground">
                  Test your knowledge with full-length NEET mock tests
                </p>
              </div>
              {isPremium ? (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 h-8 px-4 w-fit">
                  <Crown className="h-4 w-4 mr-2" />
                  Unlimited Access
                </Badge>
              ) : isAuthenticated ? (
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="h-8 px-4">
                    {freeTestsRemaining > 0 ? (
                      <span>{freeTestsRemaining} free test{freeTestsRemaining !== 1 ? 's' : ''} remaining</span>
                    ) : (
                      <span className="text-muted-foreground">Free tests used</span>
                    )}
                  </Badge>
                  <Link href="/pricing">
                    <Button size="sm" className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Crown className="h-3 w-3" />
                      Upgrade
                    </Button>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>

          <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <div className="overflow-x-auto pb-2 -mx-4 px-4 md:px-0 md:pb-0 md:overflow-visible">
              <TabsList className="w-full justify-start md:w-auto inline-flex">
                <TabsTrigger value="available" className="flex-1 md:flex-none">Available Now</TabsTrigger>
                <TabsTrigger value="upcoming" className="flex-1 md:flex-none">Upcoming</TabsTrigger>
                <TabsTrigger value="past" className="flex-1 md:flex-none">Past / Completed</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>

          <Paywall
            feature="Full Mock Test Series"
            description="Access India's most accurate NEET mock test series with AI-based trend analysis and performance predictions."
            freeLimit="1 Mock Test"
            variant={!canStartFreeTest ? "fullpage" : "inline"}
          >
            {!tests || tests.length === 0 ? (
              <Card className="glass-panel">
                <CardContent className="py-16 text-center space-y-4">
                  <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                    <ClipboardList className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">
                    {activeTab === 'upcoming' ? 'No Upcoming Tests' : activeTab === 'past' ? 'No Past Tests' : 'No Active Tests'}
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {activeTab === 'upcoming'
                      ? "You don't have any scheduled exams coming up."
                      : "Check back later for new mock tests."}
                  </p>
                  {activeTab === 'available' && (
                    <div className="flex gap-3 justify-center pt-4">
                      <Button onClick={() => setLocation('/practice')} variant="outline" data-testid="button-practice-instead">
                        <FileQuestion className="h-4 w-4 mr-2" />
                        Practice Questions
                      </Button>
                      <Button onClick={() => setLocation('/')} data-testid="button-return-dashboard">
                        Return to Dashboard
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {tests.map((test) => {
                  const hasInProgressAttempt = attempts.some(
                    (attempt) => attempt.paperId === test.id && attempt.status === "in_progress"
                  );
                  const isUpcoming = activeTab === 'upcoming';
                  const isPast = activeTab === 'past';
                  const startDate = test.startsAt ? new Date(test.startsAt) : null;

                  return (
                    <Card key={test.id} data-testid={`card-test-${test.id}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{test.title}</CardTitle>
                            {activeTab === 'upcoming' && startDate && (
                              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Starts: {startDate.toLocaleString()}
                              </p>
                            )}
                          </div>
                          {test.sectionCount ? (
                            <Badge variant="outline">{test.sectionCount} sections</Badge>
                          ) : null}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            {test.totalQuestions ?? 0} Questions
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {test.durationMinutes} minutes
                          </div>
                        </div>

                        {(() => {
                          if (isUpcoming) {
                            return (
                              <Button className="w-full" disabled variant="secondary">
                                <Clock className="h-4 w-4 mr-2" />
                                Coming Soon
                              </Button>
                            );
                          }

                          if (hasInProgressAttempt && (canStartFreeTest || isPremium)) {
                            return (
                              <div className="space-y-2">
                                <Button
                                  className="w-full"
                                  onClick={() => startTest(test.id)}
                                  data-testid={`button-resume-test-${test.id}`}
                                  variant="default"
                                >
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Resume Test
                                </Button>
                              </div>
                            );
                          }

                          if (isPast) {
                            return (
                              <Button className="w-full" variant="outline" onClick={() => setLocation(`/mock-test/${test.id}/results`)}>
                                View Results
                              </Button>
                            );
                          }

                          return canStartFreeTest || isPremium ? (
                            <Button
                              className="w-full"
                              onClick={() => startTest(test.id)}
                              data-testid={`button-start-test-${test.id}`}
                            >
                              <Target className="h-4 w-4 mr-2" />
                              Start Test
                            </Button>
                          ) : (
                            <Link href="/pricing">
                              <Button
                                variant="outline"
                                className="w-full gap-2"
                                data-testid={`button-locked-test-${test.id}`}
                              >
                                <Lock className="h-4 w-4" />
                                Upgrade to Access
                              </Button>
                            </Link>
                          );
                        })()}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </Paywall>

          {/* Quick Navigation */}
          <div className="mt-12 pt-8 border-t">
            <QuickNavigationBar currentPath="/mock-tests" />
          </div>
        </main>
      </div>
      </>
      );
}
