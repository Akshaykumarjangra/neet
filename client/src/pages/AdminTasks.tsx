import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, RefreshCw, CheckCircle2, AlertTriangle, Clock4, ServerCog } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";

interface BackgroundJob {
  id: number;
  jobType: string;
  name: string;
  status: "queued" | "running" | "succeeded" | "failed" | "cancelled";
  attempts: number;
  maxAttempts: number;
  progress: number;
  lastError?: string | null;
  result?: Record<string, any> | null;
  createdAt: string;
  startedAt?: string | null;
  finishedAt?: string | null;
}

const STATUS_STYLES: Record<
  BackgroundJob["status"],
  { variant: "default" | "secondary" | "destructive" | "outline"; label: string }
> = {
  queued: { variant: "secondary", label: "Queued" },
  running: { variant: "default", label: "Running" },
  succeeded: { variant: "outline", label: "Succeeded" },
  failed: { variant: "destructive", label: "Failed" },
  cancelled: { variant: "outline", label: "Cancelled" },
};

export default function AdminTasks() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch, isFetching } = useQuery<{ jobs: BackgroundJob[] }>({
    queryKey: ["/api/admin/tasks"],
  });

  const jobs = data?.jobs ?? [];

  const createJobMutation = useMutation({
    mutationFn: () =>
      apiRequest("POST", "/api/admin/tasks", {
        jobType: "question_generation",
      }),
    onSuccess: () => {
      toast({ title: "Job queued", description: "Question generation has started." });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tasks"] });
    },
    onError: () =>
      toast({ title: "Failed to queue job", variant: "destructive" }),
  });

  const retryMutation = useMutation({
    mutationFn: (id: number) => apiRequest("POST", `/api/admin/tasks/${id}/retry`),
    onSuccess: () => {
      toast({ title: "Retry initiated" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tasks"] });
    },
    onError: () => toast({ title: "Retry failed", variant: "destructive" }),
  });

  const cancelMutation = useMutation({
    mutationFn: (id: number) => apiRequest("POST", `/api/admin/tasks/${id}/cancel`),
    onSuccess: () => {
      toast({ title: "Job cancelled" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tasks"] });
    },
    onError: () => toast({ title: "Cancel failed", variant: "destructive" }),
  });

  const tasksInProgress = useMemo(
    () => jobs.filter((job) => job.status === "running").length,
    [jobs]
  );

  if (user && !user.isOwner && !user.isAdmin) {
    setLocation("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="gradient-mesh-bg p-6">
        <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-500/10">
            <ServerCog className="h-8 w-8 text-slate-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Task Queue</h1>
            <p className="text-muted-foreground">
              Monitor long-running background jobs and replay failures with a click.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => createJobMutation.mutate()} disabled={createJobMutation.isPending}>
            {createJobMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Queuing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Queue Question Generation
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Refreshing
              </>
            ) : (
              <>
                <Clock4 className="h-4 w-4 mr-2" />
                Refresh
              </>
            )}
          </Button>
          <Badge variant="secondary">
            Active jobs: {tasksInProgress}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent jobs</CardTitle>
            <CardDescription>Newest tasks first. Old jobs are auto-trimmed.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                No jobs yet. Queue a task to get started.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table className="min-w-[760px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Attempts</TableHead>
                      <TableHead>Queued</TableHead>
                      <TableHead className="w-40">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id} data-testid={`job-row-${job.id}`}>
                        <TableCell className="font-mono text-xs">{job.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{job.name}</div>
                          <div className="text-xs text-muted-foreground">{job.jobType}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={STATUS_STYLES[job.status].variant}>
                            {STATUS_STYLES[job.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="min-w-[120px]">
                          <Progress value={job.progress} className="h-2 mb-1" />
                          <span className="text-xs text-muted-foreground">
                            {job.progress}%
                          </span>
                        </TableCell>
                        <TableCell>
                          {job.attempts}/{job.maxAttempts}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={
                                job.status === "running" ||
                                job.status === "queued" ||
                                retryMutation.isPending
                              }
                              onClick={() => retryMutation.mutate(job.id)}
                            >
                              Retry
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={
                                job.status !== "queued" ||
                                cancelMutation.isPending
                              }
                              onClick={() => cancelMutation.mutate(job.id)}
                            >
                              Cancel
                            </Button>
                          </div>
                          {job.status === "failed" && job.lastError && (
                            <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              {job.lastError}
                            </p>
                          )}
                          {job.status === "succeeded" && job.finishedAt && (
                            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Finished {formatDistanceToNow(new Date(job.finishedAt), { addSuffix: true })}
                            </p>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      </main>
    </div>
  );
}
