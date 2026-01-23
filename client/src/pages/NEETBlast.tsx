import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Sparkles,
  BarChart3,
  BookOpen,
  Rocket,
  Award,
} from "lucide-react";

const timeline = [
  {
    year: 2014,
    headline: "NEET debut",
    detail: "The first NEET exam set the tone for high-stakes, high-precision questions.",
  },
  {
    year: 2016,
    headline: "NEET pattern evolution",
    detail: "More passage-based reasoning made deep conceptual clarity a must.",
  },
  {
    year: 2018,
    headline: "AI-based analytics arrive",
    detail: "NEET Prep introduced data-backed diagnostics to highlight weak areas.",
  },
  {
    year: 2020,
    headline: "NEET 10-markers surge",
    detail: "More multi-concept questions demanded faster analytical thinking.",
  },
  {
    year: 2022,
    headline: "NEET Blast Challenge launched",
    detail: "Students began tracking streaks over 50K+ QA spanning 10 years of exams.",
  },
  {
    year: 2024,
    headline: "Precision analytics",
    detail: "Score trajectories, topic heatmaps, and peer percentiles guide every decision.",
  },
];

const highlights = [
  {
    title: "50,000+ NEET QA",
    description: "Blended AI-generated questions with verified PYQs to simulate the toughest 10 years.",
    icon: BookOpen,
  },
  {
    title: "Confidence Builder",
    description: "Analyze every mock test down to the concept so you can own exam-day pacing.",
    icon: Rocket,
  },
  {
    title: "Explicit Analytics",
    description: "Breakdown of accuracy, XP, and subject mastery gives you surgical insights.",
    icon: BarChart3,
  },
];

interface BlastStats {
  summary: {
    totalSessions: number;
    avgScore: number;
    bestScore: number;
    questionsAttempted: number;
  };
  xp: {
    xpEarned: number;
  };
  subjectBreakdown: Array<{
    label: string;
    attempts: number;
    avgScore: number;
  }>;
}

export default function NEETBlast() {
  const { data, isLoading } = useQuery<BlastStats>(
    {
      queryKey: ["/api/mock-tests/blast-stats"],
      queryFn: () => apiRequest("GET", "/api/mock-tests/blast-stats"),
      staleTime: 5 * 60 * 1000,
    }
  );

  const stats = data?.summary;
  const xp = data?.xp;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-background">
      <Header />

      <main className="container mx-auto px-4 py-10 space-y-10">
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-slate-900/80 p-8 text-white shadow-xl shadow-purple-500/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">NEET Blast</p>
              <h1 className="mt-2 text-4xl font-bold leading-tight">
                10 Years of NEET QA, 50K+ Questions, One Deep Dive
              </h1>
              <p className="mt-3 max-w-2xl text-base text-white/80">
                Analyze your mock-test journey with NEET-grade analytics, unlock NEET Blast streaks,
                and master the questions that have shaped the exam over the past decade.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/mock-tests">
                <Button variant="default" className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-400">
                  <Sparkles className="h-4 w-4" />
                  Start NEET Blast Mock
                </Button>
              </Link>
              <Link href="/neet-blast">
                <Button variant="outline" className="gap-2 border-white/40 text-white">
                  <Award className="h-4 w-4" />
                  NEET Blast Insights
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {["Total Sessions", "Avg Score", "Best Score", "Questions Attempted", "XP Earned"].map((label, idx) => {
            const valueMap: Record<string, string> = {
              "Total Sessions": stats ? stats.totalSessions.toString() : "—",
              "Avg Score": stats ? `${stats.avgScore}%` : "—",
              "Best Score": stats ? `${stats.bestScore}%` : "—",
              "Questions Attempted": stats ? stats.questionsAttempted.toLocaleString() : "—",
              "XP Earned": xp ? xp.xpEarned.toLocaleString() : "—",
            };
            return (
              <Card key={label} className="bg-white/5 border-white/10 text-white">
                <CardContent>
                  <p className="text-sm text-white/60">{label}</p>
                  <p className="mt-2 text-3xl font-semibold">{valueMap[label]}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Subject Momentum</h2>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-0">Live feed</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(data?.subjectBreakdown ?? []).map((subject) => (
              <Card key={subject.label} className="border-white/10 bg-slate-900/40 text-white">
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">{subject.label}</CardTitle>
                  <Badge className="bg-white/10 text-white">
                    {subject.attempts} attempts
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-white/60">
                    Average Score: {subject.avgScore}%
                  </p>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                      style={{ width: `${Math.min(subject.avgScore, 100)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            {!data?.subjectBreakdown?.length && (
              <Card className="border-dashed border-white/30 bg-slate-900/40 text-white">
                <CardContent className="text-center text-sm text-white/60">
                  Complete a mock test to unlock the subject breakdown.
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">NEET Blast Timeline</h2>
            <Badge className="bg-purple-500/20 border-0 text-purple-200">10-year QA</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {timeline.map((item) => (
              <Card key={item.year} className="bg-white/5 border-white/10 text-white">
                <CardContent>
                  <p className="text-sm text-emerald-300">NEET {item.year}</p>
                  <h3 className="text-xl font-semibold">{item.headline}</h3>
                  <p className="text-sm text-white/70">{item.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {highlights.map((highlight) => (
            <Card key={highlight.title} className="border border-white/10 bg-slate-900/60 text-white">
              <CardHeader className="flex items-center gap-2">
                <highlight.icon className="h-5 w-5 text-emerald-400" />
                <CardTitle className="text-lg font-semibold">{highlight.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/70">
                {highlight.description}
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
