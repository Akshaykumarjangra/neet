import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Heart, 
  Trophy, 
  Flame, 
  Calendar, 
  ShieldCheck, 
  ArrowUpRight,
  User,
  Zap,
  BookOpen,
  Activity
} from "lucide-react";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function ParentPortal() {
  const { token } = useParams<{ token: string }>();

  const { data: progress, isLoading, error } = useQuery({
    queryKey: ["/api/parent/progress", token],
    queryFn: async () => {
      const res = await fetch(`/api/parent/progress/${token}`);
      if (!res.ok) throw new Error("Invalid or expired link");
      return res.json();
    },
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground animate-pulse">Loading student progress...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
        <Card className="max-w-md w-full border-rose-200 dark:border-rose-900 shadow-xl overflow-hidden">
          <div className="h-2 bg-rose-500" />
          <CardHeader className="text-center pt-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-4">
              <ShieldCheck className="h-8 w-8 text-rose-600" />
            </div>
            <CardTitle className="text-2xl">Access Link Expired</CardTitle>
            <CardDescription className="text-lg">
              This secure progress link is no longer valid.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-8">
            <p className="text-muted-foreground mb-6">
              Please ask your child to regenerate and share a new secure link from their Profile settings.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
        <div className="bg-white dark:bg-slate-900 border-b border-border/40 py-6 px-4 mb-8">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                NP
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Parent Portal</h1>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Secure Monitoring</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-3 py-1 gap-2 font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Link
            </Badge>
          </div>
        </div>

        <main className="max-w-5xl mx-auto px-4 space-y-8">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card className="md:col-span-2 relative overflow-hidden border-none shadow-2xl bg-gradient-to-br from-indigo-600 to-primary text-white">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <User className="w-32 h-32" />
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl font-bold">
                    {progress.name?.charAt(0) || "S"}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">{progress.name}'s Progress</h2>
                    <p className="text-indigo-100 font-medium opacity-80">Tracked performance for NEET Preparation</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-100 mb-1">Study Streak</p>
                    <div className="flex items-center gap-2">
                      <Flame className="h-6 w-6 text-orange-400 fill-orange-400" />
                      <span className="text-2xl font-bold">{progress.study_streak} Days</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-100 mb-1">Last Mock Score</p>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-6 w-6 text-yellow-400" />
                      <span className="text-2xl font-bold">{progress.last_mock || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-border/40 bg-white dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Last 7 days behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Practice Attempts</span>
                    <span className="text-primary font-bold">{progress.week_attempts}</span>
                  </div>
                  <Progress value={Math.min(100, (progress.week_attempts / 50) * 100)} className="h-2 bg-slate-100 dark:bg-slate-800" />
                  <p className="text-[10px] text-muted-foreground text-right uppercase tracking-wider font-bold">Goal: 50 / week</p>
                </div>

                <div className="pt-4 border-t border-border/40">
                  <p className="text-sm font-semibold mb-3">Overall Mastery</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Accuracy</p>
                      <p className="text-xl font-bold text-emerald-600">78%</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Consistency</p>
                      <p className="text-xl font-bold text-blue-600">High</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-xl border-border/40 bg-white dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-500" />
                  Learning Focus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { subject: "Biology", progress: 85, color: "bg-emerald-500" },
                  { subject: "Chemistry", progress: 62, color: "bg-blue-500" },
                  { subject: "Physics", progress: 45, color: "bg-indigo-500" }
                ].map((s) => (
                  <div key={s.subject} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span>{s.subject}</span>
                      <span>{s.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.progress}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-xl border-border/40 bg-white dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Parental Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-between h-12 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-foreground border-none shadow-none group">
                  <span className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    Schedule Mentor Sync
                  </span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
                <Button className="w-full justify-between h-12 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-foreground border-none shadow-none group">
                  <span className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                      <Heart className="h-4 w-4 text-rose-500" />
                    </div>
                    Send Encouragement
                  </span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Mentor Support & Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <Card className="shadow-xl border-border/40 bg-white dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Recent Mentor Sessions
                </CardTitle>
                <CardDescription>Sessions attended with expert mentors</CardDescription>
              </CardHeader>
              <CardContent>
                {progress.recent_sessions && progress.recent_sessions.length > 0 ? (
                  <div className="space-y-4">
                    {progress.recent_sessions.map((session: any) => (
                      <div key={session.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{session.mentor_name}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(session.start_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="capitalize text-[10px]">
                          {session.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No recent sessions found.</p>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-xl border-border/40 bg-white dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Student Feedback
                </CardTitle>
                <CardDescription>How {progress.name} rated their mentors</CardDescription>
              </CardHeader>
              <CardContent>
                {progress.recent_reviews && progress.recent_reviews.length > 0 ? (
                  <div className="space-y-4">
                    {progress.recent_reviews.map((review: any) => (
                      <div key={review.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-semibold">{review.mentor_name}</p>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground italic">"{review.comment}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No feedback provided yet.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Notice */}
          <div className="text-center py-10 opacity-40">
            <p className="text-xs font-medium uppercase tracking-[0.2em]">End-to-End Encrypted Access • Zero AI NEET</p>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
