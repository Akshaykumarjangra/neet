import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ContentVersion {
    id: number;
    chapterTitle: string;
    subject: string;
    classLevel: string;
    mentorName: string;
    createdAt: string;
    status: string;
}

interface VersionDetail extends ContentVersion {
    detailedNotes?: string;
    keyConcepts?: any[];
    formulas?: any[];
    currentContent: {
        detailedNotes?: string;
        keyConcepts?: any[];
        formulas?: any[];
    };
}

export default function AdminContentApprovals() {
    const { toast } = useToast();
    const [selectedVersion, setSelectedVersion] = useState<VersionDetail | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [reviewNotes, setReviewNotes] = useState("");
    const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);

    const { data: approvals = [], isLoading } = useQuery<ContentVersion[]>({
        queryKey: ["/api/admin/content-approvals"],
    });

    const detailMutation = useMutation({
        mutationFn: async (id: number) => {
            const res = await apiRequest("GET", `/api/admin/content-approvals/${id}`);
            return res as VersionDetail;
        },
        onSuccess: (data) => {
            setSelectedVersion(data);
            setIsDialogOpen(true);
        },
    });

    const decisionMutation = useMutation({
        mutationFn: async ({ id, action, notes }: { id: number; action: "approve" | "reject"; notes: string }) => {
            return await apiRequest("POST", `/api/admin/content-approvals/${id}/${action}`, { reviewNotes: notes });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/admin/content-approvals"] });
            setIsDialogOpen(false);
            setReviewNotes("");
            setSelectedVersion(null);
            toast({
                title: actionType === "approve" ? "Approved" : "Rejected",
                description: `Content update has been ${actionType === "approve" ? "published" : "rejected"}.`,
            });
        },
        onError: (error: any) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const handleDecision = (action: "approve" | "reject") => {
        if (!selectedVersion) return;
        setActionType(action);
        decisionMutation.mutate({ id: selectedVersion.id, action, notes: reviewNotes });
    };

    return (
        <div className="min-h-screen bg-background p-6 lg:p-10">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Content Approvals</h1>
                        <p className="text-muted-foreground">Review and approve changes submitted by mentors</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center p-20">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : approvals.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center p-10 text-muted-foreground">
                            <Check className="h-12 w-12 mb-4 opacity-20" />
                            <p>No pending approvals</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {approvals.map((item) => (
                            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-lg">{item.chapterTitle}</h3>
                                            <Badge variant="outline">{item.subject}</Badge>
                                            <Badge variant="secondary">Class {item.classLevel}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Submitted by <span className="text-foreground font-medium">{item.mentorName}</span> • {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => detailMutation.mutate(item.id)}
                                            disabled={detailMutation.isPending}
                                        >
                                            {detailMutation.isPending && selectedVersion?.id === item.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            ) : (
                                                <Eye className="h-4 w-4 mr-2" />
                                            )}
                                            Review
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Review Changes</DialogTitle>
                            <DialogDescription>
                                Compare the submitted changes with the current content.
                            </DialogDescription>
                        </DialogHeader>

                        {selectedVersion && (
                            <div className="space-y-6 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2 border-r pr-4">
                                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Current Version</h4>
                                        <div className="text-sm prose dark:prose-invert max-w-none opacity-70">
                                            {selectedVersion.currentContent.detailedNotes?.slice(0, 300)}...
                                        </div>
                                    </div>
                                    <div className="space-y-2 pl-2">
                                        <h4 className="font-semibold text-sm text-primary uppercase tracking-wider">New Version</h4>
                                        <div className="text-sm prose dark:prose-invert max-w-none bg-muted/30 p-2 rounded-md border border-primary/20">
                                            {selectedVersion.detailedNotes?.slice(0, 300)}...
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-medium">Review Notes (Optional)</h4>
                                    <Textarea
                                        placeholder="Add feedback for the mentor..."
                                        value={reviewNotes}
                                        onChange={(e) => setReviewNotes(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <div className="flex gap-2">
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDecision('reject')}
                                    disabled={decisionMutation.isPending}
                                >
                                    <X className="h-4 w-4 mr-1" /> Reject
                                </Button>
                                <Button
                                    onClick={() => handleDecision('approve')}
                                    disabled={decisionMutation.isPending}
                                    className="bg-emerald-600 hover:bg-emerald-700"
                                >
                                    <Check className="h-4 w-4 mr-1" /> Approve & Publish
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
