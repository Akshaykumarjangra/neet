import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { Header } from "@/components/Header";
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  FileText,
  BookOpen,
  Languages,
  Shield,
  Loader2,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PendingMentor {
  id: number;
  userId: string;
  bio: string;
  subjects: string[];
  topics: string[];
  hourlyRate: number;
  experienceYears: number;
  education: Array<{ degree: string; institution: string; year?: number }>;
  languages: string[];
  verificationDocuments: Array<{ title?: string; url?: string; type?: string }> | null;
  createdAt: string;
  userName: string;
  userEmail: string;
  userAvatar: string | null;
}

export default function AdminMentorApprovals() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [rejectionTarget, setRejectionTarget] = useState<PendingMentor | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [previewMentor, setPreviewMentor] = useState<PendingMentor | null>(null);

  const { data: mentors = [], isLoading } = useQuery<PendingMentor[]>({
    queryKey: ["/api/admin/mentors/pending"],
  });

  const approveMutation = useMutation({
    mutationFn: (mentorId: number) =>
      apiRequest("PUT", `/api/admin/mentors/${mentorId}/verify`, { status: "approved" }),
    onSuccess: () => {
      toast({ title: "Mentor approved" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mentors/pending"] });
    },
    onError: () => toast({ title: "Approval failed", variant: "destructive" }),
  });

  const rejectMutation = useMutation({
    mutationFn: () =>
      rejectionTarget
        ? apiRequest("PUT", `/api/admin/mentors/${rejectionTarget.id}/verify`, {
            status: "rejected",
            rejectionReason: rejectionReason || undefined,
          })
        : Promise.resolve(),
    onSuccess: () => {
      toast({ title: "Mentor rejected" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mentors/pending"] });
      setRejectionTarget(null);
      setRejectionReason("");
    },
    onError: () => toast({ title: "Failed to reject mentor", variant: "destructive" }),
  });

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
          <div className="p-3 rounded-xl bg-purple-500/10">
            <GraduationCap className="h-8 w-8 text-purple-500" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Mentor Approvals</h1>
            <p className="text-muted-foreground">
              Review professional profiles, verify credentials, and approve trusted mentors.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending applications</CardTitle>
            <CardDescription>
              {mentors.length} mentor{mentors.length === 1 ? "" : "s"} waiting for a decision
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
              </div>
            ) : mentors.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                All caught up! No pending mentors.
              </div>
            ) : (
              <div className="space-y-4">
                {mentors.map((mentor) => (
                  <Card key={mentor.id} className="border-primary/20">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          {mentor.userAvatar ? (
                            <AvatarImage src={mentor.userAvatar} />
                          ) : (
                            <AvatarFallback>
                              {mentor.userName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{mentor.userName}</h3>
                            <Badge variant="secondary">{mentor.experienceYears}+ yrs exp</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{mentor.userEmail}</p>
                          <p className="mt-2 text-sm">{mentor.bio}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {mentor.subjects.map((subject) => (
                              <Badge key={subject} variant="outline">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPreviewMentor(mentor)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                      <div className="grid md:grid-cols-3 gap-3">
                        <InfoRow icon={BookOpen} label="Topics" value={mentor.topics.join(", ")} />
                        <InfoRow
                          icon={Languages}
                          label="Languages"
                          value={mentor.languages.join(", ")}
                        />
                        <InfoRow
                          icon={FileText}
                          label="Rate"
                          value={`₹${mentor.hourlyRate}/session`}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          className="flex-1"
                          onClick={() => approveMutation.mutate(mentor.id)}
                          disabled={approveMutation.isPending}
                        >
                          {approveMutation.isPending ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Approving...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Approve
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            setRejectionTarget(mentor);
                            setRejectionReason("");
                          }}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      </main>

      <RejectionDialog
        mentor={rejectionTarget}
        reason={rejectionReason}
        onReasonChange={setRejectionReason}
        onClose={() => setRejectionTarget(null)}
        onSubmit={() => rejectMutation.mutate()}
        isSubmitting={rejectMutation.isPending}
      />

      <PreviewDialog mentor={previewMentor} onClose={() => setPreviewMentor(null)} />
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
}) {
  return (
    <div className="border rounded-lg p-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className="text-sm font-medium">{value || "—"}</p>
    </div>
  );
}

function RejectionDialog({
  mentor,
  reason,
  onReasonChange,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  mentor: PendingMentor | null;
  reason: string;
  onReasonChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  return (
    <Dialog open={!!mentor} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg w-[calc(100%-1.5rem)] sm:w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reject application</DialogTitle>
          <DialogDescription>
            Provide an optional note so the mentor knows what to improve.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          rows={4}
          placeholder="Reason for rejection..."
          value={reason}
          onChange={(e) => onReasonChange(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Rejecting...
              </>
            ) : (
              "Reject"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PreviewDialog({
  mentor,
  onClose,
}: {
  mentor: PendingMentor | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!mentor} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-[calc(100%-1.5rem)] sm:w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mentor?.userName}</DialogTitle>
          <DialogDescription>
            Deep dive into profile details, credentials, and supporting documents.
          </DialogDescription>
        </DialogHeader>
        {mentor && (
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              <section>
                <h3 className="font-semibold mb-2">Bio</h3>
                <p className="text-sm text-muted-foreground">{mentor.bio}</p>
              </section>
              <section>
                <h3 className="font-semibold mb-2">Education</h3>
                <ul className="space-y-2 text-sm">
                  {mentor.education.map((entry, idx) => (
                    <li
                      key={`${entry.degree}-${idx}`}
                      className="border rounded-md p-2 flex justify-between"
                    >
                      <div>
                        <div className="font-medium">{entry.degree}</div>
                        <div className="text-muted-foreground">{entry.institution}</div>
                      </div>
                      {entry.year && (
                        <span className="text-muted-foreground">{entry.year}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h3 className="font-semibold mb-2">Verification documents</h3>
                {mentor.verificationDocuments && mentor.verificationDocuments.length > 0 ? (
                  <div className="grid gap-2">
                    {mentor.verificationDocuments.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "border rounded-md p-3 flex items-center justify-between text-sm hover:border-primary transition-colors",
                          { "pointer-events-none opacity-60": !doc.url }
                        )}
                      >
                        <div>
                          <div className="font-medium">{doc.title || "Document"}</div>
                          <div className="text-muted-foreground text-xs">
                            {doc.type || "attachment"}
                          </div>
                        </div>
                        {doc.url && <Shield className="h-4 w-4" />}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No documents supplied.</p>
                )}
              </section>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
