import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import {
  Play,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Loader2,
  BarChart3,
  Settings,
} from "lucide-react";
import { useState } from "react";

interface MarketingReport {
  id: number;
  status: string;
  startedAt: string;
  completedAt: string | null;
  outputSummary: string | null;
  fullOutput: string | null;
  tasksCompleted: number;
  totalTasks: number;
  errorMessage: string | null;
  createdAt: string;
}

interface SchedulerStatus {
  nextScheduledRun: string | null;
  scheduleCron: string | null;
  recentReports: MarketingReport[];
  isActive: boolean;
}

export default function AdminMarketing() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [cronExpression, setCronExpression] = useState("0 2 * * 0"); // Default: Sunday 2 AM

  const { data: status, isLoading: statusLoading, refetch: refetchStatus } = useQuery<SchedulerStatus>({
    queryKey: ["/api/marketing/status"],
    queryFn: async () => {
      const res = await fetch("/api/marketing/status", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch status");
      return res.json();
    },
  });

  const { data: reports, isLoading: reportsLoading, refetch: refetchReports } = useQuery<MarketingReport[]>({
    queryKey: ["/api/marketing/reports"],
    queryFn: async () => {
      const res = await fetch("/api/marketing/reports?limit=20", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch reports");
      return res.json();
    },
  });

  const runMarketingMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/marketing/run", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to trigger marketing");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Marketing run triggered successfully" });
      refetchStatus();
      refetchReports();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateScheduleMutation = useMutation({
    mutationFn: async (cron: string) => {
      const res = await fetch("/api/marketing/schedule", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cronExpression: cron }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update schedule");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Schedule updated successfully" });
      refetchStatus();
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "running":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      completed: "bg-green-500/10 text-green-500 border-green-500/20",
      failed: "bg-red-500/10 text-red-500 border-red-500/20",
      running: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    };
    return (
      <Badge className={variants[status] || variants.pending}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user?.isAdmin && user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-8 px-4">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">You don't have permission to access this page.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <TrendingUp className="h-8 w-8" />
              Marketing Automation
            </h1>
            <p className="text-muted-foreground mt-2">
              Automated marketing using AI agents for SEO, content, social media, and more
            </p>
          </div>
          <Button
            onClick={() => runMarketingMutation.mutate()}
            disabled={runMarketingMutation.isPending}
            size="lg"
            className="gap-2"
          >
            {runMarketingMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run Marketing Now
              </>
            )}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reports?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {reports?.filter(r => r.status === "completed").length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {reports?.filter(r => r.status === "failed").length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-mono">
                {status?.scheduleCron || "Not set"}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Schedule Configuration */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule
              </CardTitle>
              <CardDescription>
                Configure when marketing runs automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Cron Expression</Label>
                <Input
                  value={cronExpression}
                  onChange={(e) => setCronExpression(e.target.value)}
                  placeholder="0 2 * * 0"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Default: Sunday at 2 AM IST
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Presets:</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCronExpression("0 2 * * 0")}
                  >
                    Weekly (Sun)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCronExpression("0 2 * * *")}
                  >
                    Daily
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCronExpression("0 2 1 * *")}
                  >
                    Monthly
                  </Button>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => updateScheduleMutation.mutate(cronExpression)}
                disabled={updateScheduleMutation.isPending}
              >
                {updateScheduleMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Settings className="h-4 w-4 mr-2" />
                    Update Schedule
                  </>
                )}
              </Button>
              {status?.nextScheduledRun && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Next scheduled run:</p>
                  <p className="text-sm font-medium">{formatDate(status.nextScheduledRun)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Marketing Reports
                  </CardTitle>
                  <CardDescription>
                    Recent marketing automation runs
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { refetchReports(); refetchStatus(); }}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {reportsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : reports && reports.length > 0 ? (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(report.status)}
                          <span className="font-medium">Report #{report.id}</span>
                          {getStatusBadge(report.status)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(report.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span>
                          Tasks: {report.tasksCompleted}/{report.totalTasks}
                        </span>
                        {report.startedAt && (
                          <span>
                            Started: {formatDate(report.startedAt)}
                          </span>
                        )}
                        {report.completedAt && (
                          <span>
                            Completed: {formatDate(report.completedAt)}
                          </span>
                        )}
                      </div>
                      {report.errorMessage && (
                        <p className="text-sm text-red-500 bg-red-500/10 p-2 rounded">
                          Error: {report.errorMessage}
                        </p>
                      )}
                      {report.outputSummary && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {report.outputSummary}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No reports yet. Run the marketing automation to generate reports.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Marketing Agents Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About Marketing Automation</CardTitle>
            <CardDescription>
              Your NEET app is integrated with a 30-agent marketing swarm that performs:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <strong>SEO Optimization</strong>
                <p className="text-xs text-muted-foreground mt-1">Technical, local, international SEO</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <strong>Content Marketing</strong>
                <p className="text-xs text-muted-foreground mt-1">Articles, blogs, content strategy</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <strong>Social Media</strong>
                <p className="text-xs text-muted-foreground mt-1">Posts, engagement, growth</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <strong>PPC & Analytics</strong>
                <p className="text-xs text-muted-foreground mt-1">Campaigns, ROI tracking</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <strong>Email Marketing</strong>
                <p className="text-xs text-muted-foreground mt-1">Automation, campaigns</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <strong>Link Building</strong>
                <p className="text-xs text-muted-foreground mt-1">Backlinks, PR, authority</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <strong>Brand Strategy</strong>
                <p className="text-xs text-muted-foreground mt-1">Positioning, voice, identity</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <strong>Growth Hacking</strong>
                <p className="text-xs text-muted-foreground mt-1">Viral mechanics, experiments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}