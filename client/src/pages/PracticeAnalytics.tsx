import { Header } from "@/components/Header";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { Paywall } from "@/components/Paywall";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface SubjectMastery {
  subject: string;
  accuracy: number;
  attempts: number;
}

interface WeakTopic {
  topicId: number;
  topicName: string;
  subject: string;
  accuracy: number;
  attempts: number;
}

interface MockHistory {
  sessionId: number;
  testType: string;
  score?: number;
  status: string;
  startedAt: string;
}

interface AnalyticsResponse {
  practiceSummary: {
    totalAttempts: number;
    correctAnswers: number;
    accuracy: number;
    avgTimeSec?: number;
    totalXp?: number;
    weakTopicsCount: number;
  };
  subjectMastery: SubjectMastery[];
  weakTopics: WeakTopic[];
  mockHistory: MockHistory[];
}

function formatSeconds(sec?: number) {
  if (!sec || sec <= 0) return "–";
  const minutes = Math.floor(sec / 60);
  const seconds = Math.round(sec % 60);
  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

export default function PracticeAnalytics() {
  const { data, isLoading, error } = useQuery<AnalyticsResponse>({
    queryKey: ["/api/analytics/student"],
    queryFn: async () => {
      const response = await fetch("/api/analytics/student", {
        credentials: "include",
      });
      if (!response.ok) {
        const err = new Error("Cannot load analytics") as any;
        err.status = response.status;
        throw err;
      }
      return response.json();
    },
    retry: false, // Don't retry on 402
  });

  const isLocked = (error as any)?.message?.includes("402") || (error as any)?.status === 402;

  const summary = data?.practiceSummary;
  const subjectMastery = useMemo(() => data?.subjectMastery || [], [data]);
  const weakTopics = useMemo(() => data?.weakTopics || [], [data]);
  const mockHistory = useMemo(() => data?.mockHistory || [], [data]);

  const radarData = useMemo(() => {
    return subjectMastery.map(s => ({
      subject: s.subject,
      A: s.accuracy,
      fullMark: 100,
    }));
  }, [subjectMastery]);

  const trendData = useMemo(() => {
    return [...mockHistory]
      .sort((a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime())
      .map(h => ({
        name: `Test #${h.sessionId}`,
        score: h.score || 0,
        date: new Date(h.startedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      }));
  }, [mockHistory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold">Progress Dashboard</h1>
            <p className="text-muted-foreground">Master the NEET syllabus with data-driven practice.</p>
          </div>
          <Button size="lg" onClick={() => (window.location.href = "/practice")}>
            Launch practice
          </Button>
        </div>

        <Paywall
          feature="Advanced Performance Analytics"
          description="Unlock deep insights into your subject mastery, topic-wise accuracy, and performance trends to optimize your NEET preparation."
          freeLimit="Basic Tracking"
          isLocked={isLocked}
        >

          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardHeader>
                <CardTitle>Total Attempts</CardTitle>
                <CardDescription>{summary ? summary.totalAttempts.toLocaleString() : "—"}</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={summary?.totalAttempts ?? 0} max={summary?.totalAttempts ?? 100} className="h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Accuracy</CardTitle>
                <CardDescription>{summary ? `${summary.accuracy}%` : "—"}</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={summary?.accuracy ?? 0} max={100} className="h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Correct Answers</CardTitle>
                <CardDescription>{summary ? summary.correctAnswers.toLocaleString() : "—"}</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={summary?.correctAnswers ?? 0} max={summary?.totalAttempts ?? 100} className="h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total XP</CardTitle>
                <CardDescription>{summary?.totalXp?.toLocaleString() ?? "—"}</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={summary?.totalXp ?? 0} max={(summary?.totalXp ?? 100)} className="h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Avg time/question</CardTitle>
                <CardDescription>{formatSeconds(summary?.avgTimeSec)}</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={summary?.avgTimeSec ?? 0} max={120} className="h-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Radar Chart for Subject Mastery */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Subject Balance</CardTitle>
                <CardDescription>Visualizing your accuracy across subjects.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">Loading...</div>
                ) : radarData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Accuracy"
                        dataKey="A"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.4}
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={false}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-muted-foreground">
                    Not enough data for chart. Start practicing!
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="space-y-4">
              <CardHeader>
                <CardTitle>Weak topics</CardTitle>
                <CardDescription>Focus on the areas needing reinforcement.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weakTopics.length === 0 ? (
                    <p className="text-muted-foreground">Keep solving questions to highlight weak topics.</p>
                  ) : (
                    weakTopics.map((topic) => (
                      <div key={topic.topicId} className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-sm">{topic.topicName}</p>
                          <p className="text-xs text-muted-foreground">{topic.subject}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {topic.accuracy}% accuracy
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trend Area Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>Your mock test scores over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mb-8">
                {trendData.length > 1 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={trendData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        domain={[0, 100]} // Assuming score out of 100 or %
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="url(#colorScore)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                    Complete at least 2 mock tests to see your trend graph.
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent History</h4>
                {mockHistory.length === 0 ? (
                  <p className="text-muted-foreground">Complete mock tests to see the history log.</p>
                ) : (
                  <div className="space-y-3">
                    {mockHistory.slice(0, 5).map((history) => ( // Show only recent 5 in list
                      <div key={history.sessionId} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-semibold">Session #{history.sessionId} · {history.testType}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(history.startedAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{history.score ?? "—"}/100</p>
                          <Badge variant="outline" className="text-xs">
                            {history.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </Paywall>
      </main>
    </div>
  );
}
