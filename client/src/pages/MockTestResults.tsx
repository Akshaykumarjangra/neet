import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMemo } from "react";
import {
  ChevronLeft,
  Trophy,
  Crown,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  MinusCircle,
  BarChart3,
  RefreshCw,
  Home,
  TrendingUp,
  Award,
  Zap,
  Users,
  PartyPopper,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";

interface SubjectStats {
  name: string;
  correct: number;
  incorrect: number;
  unanswered: number;
  total: number;
  score: number;
  maxScore: number;
}

interface MockExamReviewItem {
  question: {
    id: number;
    stem: string;
    subject?: string | null;
    topic?: string | null;
    subtopic?: string | null;
    difficulty?: string | null;
    explanation?: string | null;
    options: Array<{
      id: number;
      label: string;
      text: string;
      mediaRef?: string | null;
      isCorrect?: boolean;
    }>;
    correctOptionIds: number[];
  };
  response: {
    selectedOptionId: number | null;
    isCorrect: boolean | null;
    timeSpentSeconds: number | null;
    flagged: boolean;
  } | null;
}

interface MockExamReviewResponse {
  attempt: {
    id: number;
    score: number | null;
    correctCount: number | null;
    wrongCount: number | null;
    unansweredCount: number | null;
    submittedAt?: string | null;
  };
  items: MockExamReviewItem[];
}

interface MockExamAnalyticsResponse {
  rank: number;
  percentile: number;
  totalParticipants: number;
  totals: {
    totalQuestions: number;
    correct: number;
    wrong: number;
    unanswered: number;
    accuracy: number;
    totalTimeSeconds: number;
  };
  topperStats: {
    score: number;
    timeTaken: number;
    accuracy: number;
  } | null;
  averageStats: {
    score: number;
    timeTaken: number;
  };
  bySubject: Array<{
    subject: string;
    correct: number;
    wrong: number;
    unanswered: number;
    totalQuestions: number;
    accuracy: number;
    totalTimeSeconds: number;
  }>;
}

export default function MockTestResults() {
  const [, setLocation] = useLocation();
  const routeMatch = useRoute<{ id: string }>("/mock-test/:id/results") as
    | [boolean, { id: string } | null]
    | null;
  const testId = routeMatch?.[1]?.id ?? "";
  const paperId = Number(testId);
  const hasValidPaperId = Number.isInteger(paperId);

  const attemptIdFromQuery = Number(new URLSearchParams(window.location.search).get("attemptId"));
  const storedAttemptId = Number(localStorage.getItem(`mock_exam_attempt_${paperId}`));
  const attemptId = Number.isInteger(attemptIdFromQuery)
    ? attemptIdFromQuery
    : Number.isInteger(storedAttemptId)
      ? storedAttemptId
      : null;

  const cachedPaperMeta = useMemo(() => {
    if (!hasValidPaperId) return null;
    const raw = localStorage.getItem(`mock_exam_paper_${paperId}`);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as { title?: string; durationMinutes?: number; totalMarks?: number };
    } catch {
      return null;
    }
  }, [paperId, hasValidPaperId]);

  const { data: paperData } = useQuery<{ paper: { title: string; durationMinutes: number; totalMarks?: number } }>({
    queryKey: ["/api/mock-exams/papers", paperId],
    queryFn: async () => apiRequest("GET", `/api/mock-exams/papers/${paperId}`),
    enabled: hasValidPaperId && !cachedPaperMeta,
  });

  const paperMeta = cachedPaperMeta ?? paperData?.paper ?? null;

  const {
    data: reviewData,
    isLoading: reviewLoading,
    error: reviewError,
  } = useQuery<MockExamReviewResponse>({
    queryKey: ["/api/mock-exams/attempts", attemptId, "review"],
    queryFn: async () => apiRequest("GET", `/api/mock-exams/attempts/${attemptId}/review`),
    enabled: !!attemptId,
  });

  const {
    data: analyticsData,
    isLoading: analyticsLoading,
    error: analyticsError,
  } = useQuery<MockExamAnalyticsResponse>({
    queryKey: ["/api/mock-exams/attempts", attemptId, "analytics"],
    queryFn: async () => apiRequest("GET", `/api/mock-exams/attempts/${attemptId}/analytics`),
    enabled: !!attemptId,
  });

  const isLoading = reviewLoading || analyticsLoading;
  const testError = reviewError || analyticsError;

  const results = useMemo(() => {
    if (!reviewData && !analyticsData) return null;

    const totalQuestions = analyticsData?.totals?.totalQuestions ?? reviewData?.items.length ?? 0;
    const totalCorrect = analyticsData?.totals?.correct ?? reviewData?.attempt?.correctCount ?? 0;
    const totalIncorrect = analyticsData?.totals?.wrong ?? reviewData?.attempt?.wrongCount ?? 0;
    const totalUnanswered = analyticsData?.totals?.unanswered ?? reviewData?.attempt?.unansweredCount ?? 0;
    const totalScore = reviewData?.attempt?.score ?? (totalCorrect * 4 - totalIncorrect);
    const maxScore = paperMeta?.totalMarks ?? totalQuestions * 4;
    const percentage = maxScore ? Math.round((Math.max(0, totalScore) / maxScore) * 100) : 0;
    const accuracy = analyticsData?.totals?.accuracy
      ? Math.round(analyticsData.totals.accuracy * 100)
      : totalCorrect + totalIncorrect > 0
        ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100)
        : 0;
    const questionsAttempted = totalCorrect + totalIncorrect;
    const timeTaken = analyticsData?.totals?.totalTimeSeconds ?? 0;
    const totalTime = paperMeta?.durationMinutes ? paperMeta.durationMinutes * 60 : 0;

    const subjects: SubjectStats[] = (analyticsData?.bySubject || []).map((subject) => ({
      name: subject.subject,
      correct: subject.correct,
      incorrect: subject.wrong,
      unanswered: subject.unanswered,
      total: subject.totalQuestions,
      score: subject.correct * 4 - subject.wrong,
      maxScore: subject.totalQuestions * 4,
    }));

    const questionResults = (reviewData?.items || []).map((item, index) => {
      const selectedOptionId = item.response?.selectedOptionId ?? null;
      const isCorrect = item.response?.isCorrect === true;
      const isAttempted = selectedOptionId != null;
      const subject = item.question.subject || "Unknown";
      const selectedLabel = selectedOptionId
        ? item.question.options.find((opt) => opt.id === selectedOptionId)?.label ?? String(selectedOptionId)
        : "";
      const correctLabels = item.question.correctOptionIds
        .map((id) => item.question.options.find((opt) => opt.id === id)?.label ?? String(id))
        .join(", ");

      return {
        question: item.question,
        index,
        selectedOptionId,
        isCorrect,
        isAttempted,
        subject,
        selectedLabel,
        correctLabels,
      };
    });

    return {
      totalCorrect,
      totalIncorrect,
      totalUnanswered,
      totalScore: Math.max(0, totalScore),
      maxScore,
      percentage: Math.max(0, percentage),
      accuracy,
      questionsAttempted,
      totalQuestions,
      subjects,
      questionResults,
      timeTaken,
      totalTime,
      averageTimePerQuestion: Math.round(timeTaken / (questionsAttempted || 1)),
    };
  }, [reviewData, analyticsData, paperMeta]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-yellow-500";
    if (percentage >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500/10 border-green-500/20";
    if (percentage >= 60) return "bg-yellow-500/10 border-yellow-500/20";
    if (percentage >= 40) return "bg-orange-500/10 border-orange-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  const handleRetakeTest = () => {
    if (hasValidPaperId) {
      localStorage.removeItem(`mock_exam_attempt_${paperId}`);
      sessionStorage.removeItem(`mock_exam_start_${paperId}`);
    }
    setLocation(`/mock-test/${testId}`);
  };

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Loading test results...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (!attemptId || testError || !reviewData) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="p-4 rounded-full bg-destructive/10 w-fit mx-auto">
                <XCircle className="h-12 w-12 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold">Unable to Load Results</h3>
              <p className="text-muted-foreground">
                {testError instanceof Error
                  ? testError.message
                  : "Missing attempt details for this test. Please retake the test."}
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => setLocation('/mock-tests')} variant="outline">
                  Back to Tests
                </Button>
                <Button onClick={() => window.location.reload()}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    );
  }

  if (!results) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="p-4 rounded-full bg-yellow-500/10 w-fit mx-auto">
                <MinusCircle className="h-12 w-12 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold">No Results Available</h3>
              <p className="text-muted-foreground">
                Unable to calculate results. Please try taking the test again.
              </p>
              <Button onClick={handleRetakeTest}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retake Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header activeSubject="Mock Test Results" userPoints={2450} userLevel={12} studyStreak={7} />

        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setLocation('/dashboard')} data-testid="button-back-dashboard">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" data-testid="text-results-title">Test Results</h1>
            <p className="text-muted-foreground" data-testid="text-test-name">{paperMeta?.title || "Mock Exam"}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 mb-8">
            <Card className={cn("lg:col-span-1 border-2", getScoreBgColor(results.percentage))}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5" />
                  Overall Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={cn("text-5xl font-bold mb-2", getScoreColor(results.percentage))} data-testid="text-total-score">
                    {results.totalScore}
                  </div>
                  <div className="text-lg text-muted-foreground mb-4" data-testid="text-max-score">
                    out of {results.maxScore}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Badge
                      variant={results.percentage >= 60 ? "default" : "secondary"}
                      className="text-lg px-4 py-1"
                      data-testid="badge-percentage"
                    >
                      {results.percentage}%
                    </Badge>
                  </div>
                  <Progress value={results.percentage} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1 border-2 bg-indigo-500/5 border-indigo-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Crown className="h-5 w-5 text-indigo-500" />
                  Your Rank
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2 text-indigo-500" data-testid="text-rank">
                    #{analyticsData?.rank ?? "-"}
                  </div>
                  <div className="text-lg text-muted-foreground mb-4">
                    Top {analyticsData?.percentile ?? 0}%ile
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Badge variant="outline" className="px-3">
                      <Users className="h-3 w-3 mr-1" />
                      {analyticsData?.totalParticipants ?? 0} Students
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Avg Score: {Math.round(analyticsData?.averageStats?.score || 0)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5" />
                  Topper Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[180px] w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'You', score: results.totalScore, fill: '#6366f1' },
                        { name: 'Avg', score: analyticsData?.averageStats?.score || 0, fill: '#94a3b8' },
                        { name: 'Top', score: analyticsData?.topperStats?.score || 0, fill: '#22c55e' },
                      ]}
                      margin={{ top: 5, right: 5, bottom: 5, left: -20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5" />
                  Performance Visuals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Donut Chart - Question Status */}
                  <div className="h-[250px] w-full relative">
                    <h4 className="absolute top-0 left-0 text-sm font-medium text-muted-foreground z-10">Breakdown</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Correct', value: results.totalCorrect, color: '#22c55e' },
                            { name: 'Incorrect', value: results.totalIncorrect, color: '#ef4444' },
                            { name: 'Unanswered', value: results.totalUnanswered, color: '#94a3b8' },
                          ]}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell key="cell-0" fill="#22c55e" />
                          <Cell key="cell-1" fill="#ef4444" />
                          <Cell key="cell-2" fill="#94a3b8" />
                        </Pie>
                        <Tooltip
                          contentStyle={{ borderRadius: '8px' }}
                          formatter={(value: number, name: string) => [`${value} Questions`, name]}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-4">
                      <div className="text-center">
                        <span className="text-2xl font-bold">{results.questionsAttempted}</span>
                        <p className="text-xs text-muted-foreground">Attempted</p>
                      </div>
                    </div>
                  </div>

                  {/* Summary Stats Grid (Mini) */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-full">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-green-700">{results.totalCorrect}</p>
                          <p className="text-xs text-green-600">Correct</p>
                        </div>
                      </div>
                      <span className="text-sm font-mono font-medium text-green-700">+{results.totalCorrect * 4}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/20 rounded-full">
                          <XCircle className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-red-700">{results.totalIncorrect}</p>
                          <p className="text-xs text-red-600">Incorrect</p>
                        </div>
                      </div>
                      <span className="text-sm font-mono font-medium text-red-700">-{results.totalIncorrect}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-500/10 border border-gray-500/20">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-500/20 rounded-full">
                          <MinusCircle className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-gray-700">{results.totalUnanswered}</p>
                          <p className="text-xs text-gray-600">Unanswered</p>
                        </div>
                      </div>
                      <span className="text-sm font-mono font-medium text-gray-700">0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5" />
                  Subject-wise Breakdown
                </CardTitle>
                <CardDescription>Performance in each subject</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {results.subjects.map((subject) => (
                  <div key={subject.name} className="space-y-2" data-testid={`subject-breakdown-${subject.name.toLowerCase()}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{subject.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.max(0, subject.score)}/{subject.maxScore}
                      </span>
                    </div>
                    <div className="flex gap-1 h-6 rounded-lg overflow-hidden bg-muted">
                      {subject.correct > 0 && (
                        <div
                          className="bg-green-500 flex items-center justify-center text-xs text-white font-medium"
                          style={{ width: `${(subject.correct / subject.total) * 100}%` }}
                        >
                          {subject.correct}
                        </div>
                      )}
                      {subject.incorrect > 0 && (
                        <div
                          className="bg-red-500 flex items-center justify-center text-xs text-white font-medium"
                          style={{ width: `${(subject.incorrect / subject.total) * 100}%` }}
                        >
                          {subject.incorrect}
                        </div>
                      )}
                      {subject.unanswered > 0 && (
                        <div
                          className="bg-gray-400 flex items-center justify-center text-xs text-white font-medium"
                          style={{ width: `${(subject.unanswered / subject.total) * 100}%` }}
                        >
                          {subject.unanswered}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Correct: {subject.correct}
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        Incorrect: {subject.incorrect}
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                        Unanswered: {subject.unanswered}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>Detailed analysis of your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Award className="h-4 w-4" />
                      <span className="text-sm">Accuracy</span>
                    </div>
                    <div className="text-2xl font-bold" data-testid="text-accuracy">
                      {results.accuracy}%
                    </div>
                    <Progress value={results.accuracy} className="h-2 mt-2" />
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Time Taken</span>
                    </div>
                    <div className="text-2xl font-bold" data-testid="text-time-taken">
                      {formatTime(results.timeTaken)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      of {formatTime(results.totalTime)} allocated
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Zap className="h-4 w-4" />
                      <span className="text-sm">Avg. Time/Question</span>
                    </div>
                    <div className="text-2xl font-bold" data-testid="text-avg-time">
                      {results.averageTimePerQuestion}s
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      per attempted question
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Target className="h-4 w-4" />
                      <span className="text-sm">Attempted</span>
                    </div>
                    <div className="text-2xl font-bold" data-testid="text-attempted">
                      {results.questionsAttempted}/{results.totalQuestions}
                    </div>
                    <Progress
                      value={(results.questionsAttempted / results.totalQuestions) * 100}
                      className="h-2 mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5" />
                Question Review
              </CardTitle>
              <CardDescription>
                Review all questions with answers and explanations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {results.questionResults.map((result, idx) => (
                  <AccordionItem
                    key={result.index}
                    value={`question-${result.index}`}
                    className={cn(
                      "border rounded-lg mb-2 px-4",
                      result.isAttempted
                        ? result.isCorrect
                          ? "border-green-500/30 bg-green-500/5"
                          : "border-red-500/30 bg-red-500/5"
                        : "border-gray-500/30 bg-gray-500/5"
                    )}
                    data-testid={`question-review-${idx + 1}`}
                  >
                    <AccordionTrigger className="hover:no-underline py-3">
                      <div className="flex items-center gap-3 text-left w-full">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                          result.isAttempted
                            ? result.isCorrect
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                            : "bg-gray-400 text-white"
                        )}>
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {result.subject}
                            </Badge>
                            {result.isAttempted ? (
                              result.isCorrect ? (
                                <Badge className="bg-green-500 text-xs">Correct (+4)</Badge>
                              ) : (
                                <Badge className="bg-red-500 text-xs">Incorrect (-1)</Badge>
                              )
                            ) : (
                              <Badge variant="secondary" className="text-xs">Unanswered (0)</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                            {result.question.stem.substring(0, 100)}...
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Question:</h4>
                          <p className="text-sm bg-muted/50 p-3 rounded-lg">
                            {result.question.stem}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Options:</h4>
                          <div className="space-y-2">
                            {result.question.options.map((option) => {
                              const isCorrectOption = result.question.correctOptionIds.includes(option.id);
                              const isSelected = option.id === result.selectedOptionId;
                              return (
                                <div
                                  key={option.id}
                                  className={cn(
                                    "p-3 rounded-lg border text-sm flex items-center gap-2",
                                    isCorrectOption
                                      ? "bg-green-500/10 border-green-500/30"
                                      : isSelected && !result.isCorrect
                                        ? "bg-red-500/10 border-red-500/30"
                                        : "bg-muted/30"
                                  )}
                                >
                                  <span className="font-medium w-6">{option.label}.</span>
                                  <span className="flex-1">{option.text}</span>
                                  {isCorrectOption && (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                  )}
                                  {isSelected && !result.isCorrect && (
                                    <XCircle className="h-4 w-4 text-red-500" />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Your Answer: </span>
                            <span className={cn(
                              "font-medium",
                              result.isAttempted
                                ? result.isCorrect ? "text-green-600" : "text-red-600"
                                : "text-gray-500"
                            )}>
                              {result.selectedLabel || "Not attempted"}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Correct Answer: </span>
                            <span className="font-medium text-green-600">
                              {result.correctLabels || "—"}
                            </span>
                          </div>
                        </div>

                        {result.question.explanation && (
                          <div>
                            <h4 className="font-medium mb-2">Explanation:</h4>
                            <p className="text-sm bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                              {result.question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={handleRetakeTest}
                  className="gap-2"
                  data-testid="button-retake-test"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retake Test
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setLocation('/dashboard')}
                  className="gap-2"
                  data-testid="button-back-to-dashboard"
                >
                  <Home className="h-4 w-4" />
                  Back to Dashboard
                </Button>
                <Button
                  variant="secondary"
                  disabled
                  className="gap-2"
                  data-testid="button-detailed-analysis"
                >
                  <TrendingUp className="h-4 w-4" />
                  View Detailed Analysis
                  <Badge variant="outline" className="ml-2 text-xs">Coming Soon</Badge>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ThemeProvider>
  );
}
