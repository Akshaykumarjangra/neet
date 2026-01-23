import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Header } from "@/components/Header";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Calendar, Plus, Trash2, Edit, FileText, Layers } from "lucide-react";
import { format } from "date-fns";

export default function AdminTestSeries() {
    const { user } = useAuth();
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const [isSeriesDialogOpen, setIsSeriesDialogOpen] = useState(false);
    const [isPaperDialogOpen, setIsPaperDialogOpen] = useState(false);

    // Forms state
    const [seriesForm, setSeriesForm] = useState({ title: "", description: "" });
    const [paperForm, setPaperForm] = useState({
        seriesId: "",
        title: "",
        description: "",
        durationMinutes: "180",
        totalMarks: "720",
        startsAt: "",
        endsAt: "",
    });

    const { data: seriesList = [], isLoading: seriesLoading } = useQuery({
        queryKey: ["/api/admin/mock-exam-series"],
        queryFn: async () => {
            const res = await fetch("/api/admin/mock-exam-series", { credentials: "include" });
            if (!res.ok) throw new Error("Failed to fetch series");
            return res.json();
        },
    });

    const { data: papersList = [], isLoading: papersLoading } = useQuery({
        queryKey: ["/api/admin/mock-exam-papers"],
        queryFn: async () => {
            const res = await fetch("/api/admin/mock-exam-papers", { credentials: "include" });
            if (!res.ok) throw new Error("Failed to fetch papers");
            return res.json();
        },
    });

    const createSeriesMutation = useMutation({
        mutationFn: async () => {
            return apiRequest("POST", "/api/admin/mock-exam-series", seriesForm);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/admin/mock-exam-series"] });
            setIsSeriesDialogOpen(false);
            setSeriesForm({ title: "", description: "" });
            toast({ title: "Series created successfully" });
        },
    });

    const createPaperMutation = useMutation({
        mutationFn: async () => {
            return apiRequest("POST", "/api/admin/mock-exam-papers", {
                ...paperForm,
                seriesId: parseInt(paperForm.seriesId),
                durationMinutes: parseInt(paperForm.durationMinutes),
                totalMarks: parseFloat(paperForm.totalMarks),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/admin/mock-exam-papers"] });
            setIsPaperDialogOpen(false);
            setPaperForm({
                seriesId: "",
                title: "",
                description: "",
                durationMinutes: "180",
                totalMarks: "720",
                startsAt: "",
                endsAt: "",
            });
            toast({ title: "Paper scheduled successfully" });
        },
        onError: (err: any) => {
            toast({ title: "Failed to schedule paper", description: err.message, variant: "destructive" });
        }
    });

    if (!user?.isAdmin) {
        setLocation("/");
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    <Button
                        variant="ghost"
                        onClick={() => setLocation("/admin")}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Button>

                    <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Test Series Management</h1>
                            <p className="text-muted-foreground mt-2">
                                Create structured test series and schedule exam papers.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={() => setIsSeriesDialogOpen(true)} variant="outline">
                                <Layers className="h-4 w-4 mr-2" />
                                New Series
                            </Button>
                            <Button onClick={() => setIsPaperDialogOpen(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Schedule Paper
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Series List */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Series</CardTitle>
                                <CardDescription>Collections of related exams (e.g., Weekly Tests)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {seriesLoading ? (
                                    <div className="text-center py-4">Loading...</div>
                                ) : seriesList.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground border border-dashed rounded-md">
                                        No active series found. Create one to get started.
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {seriesList.map((series: any) => (
                                            <div key={series.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                                                <div>
                                                    <h3 className="font-semibold">{series.title}</h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-1">{series.description}</p>
                                                </div>
                                                <Badge variant={series.isPublished ? "default" : "outline"}>
                                                    {series.isPublished ? "Published" : "Draft"}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Scheduled Papers List */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Scheduled Papers</CardTitle>
                                <CardDescription>Upcoming and past exam papers</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {papersLoading ? (
                                    <div className="text-center py-4">Loading...</div>
                                ) : papersList.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground border border-dashed rounded-md">
                                        No papers scheduled yet.
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {papersList.map((paper: any) => (
                                            <div key={paper.id} className="p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors space-y-2">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <FileText className="h-4 w-4 text-primary" />
                                                            <h3 className="font-semibold">{paper.title}</h3>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {paper.seriesTitle} • {paper.durationMinutes} mins • {paper.totalMarks} marks
                                                        </p>
                                                    </div>
                                                    <Badge variant="secondary" className="font-mono text-xs">
                                                        ID: {paper.id}
                                                    </Badge>
                                                </div>

                                                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t mt-2">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        Start: {paper.startsAt ? format(new Date(paper.startsAt), "MMM d, h:mm a") : "Not set"}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        End: {paper.endsAt ? format(new Date(paper.endsAt), "MMM d, h:mm a") : "Not set"}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Create Series Dialog */}
                <Dialog open={isSeriesDialogOpen} onOpenChange={setIsSeriesDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create Test Series</DialogTitle>
                            <DialogDescription>
                                Group related exams together under a series.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Series Title</Label>
                                <Input
                                    placeholder="e.g. Weekly Biology Tests - Class 12"
                                    value={seriesForm.title}
                                    onChange={e => setSeriesForm({ ...seriesForm, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    placeholder="Brief description of this test series..."
                                    value={seriesForm.description}
                                    onChange={e => setSeriesForm({ ...seriesForm, description: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsSeriesDialogOpen(false)}>Cancel</Button>
                            <Button onClick={() => createSeriesMutation.mutate()} disabled={createSeriesMutation.isPending}>
                                Create Series
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Schedule Paper Dialog */}
                <Dialog open={isPaperDialogOpen} onOpenChange={setIsPaperDialogOpen}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Schedule Exam Paper</DialogTitle>
                            <DialogDescription>
                                Add a new exam paper to a series with specific timing.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-2 col-span-2">
                                <Label>Select Series</Label>
                                <Select
                                    value={paperForm.seriesId}
                                    onValueChange={val => setPaperForm({ ...paperForm, seriesId: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a series..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {seriesList.map((s: any) => (
                                            <SelectItem key={s.id} value={String(s.id)}>{s.title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2 col-span-2">
                                <Label>Paper Title</Label>
                                <Input
                                    placeholder="e.g. Unit Test 1: Electrostatics"
                                    value={paperForm.title}
                                    onChange={e => setPaperForm({ ...paperForm, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Duration (Minutes)</Label>
                                <Input type="number" value={paperForm.durationMinutes} onChange={e => setPaperForm({ ...paperForm, durationMinutes: e.target.value })} />
                            </div>

                            <div className="space-y-2">
                                <Label>Total Marks</Label>
                                <Input type="number" value={paperForm.totalMarks} onChange={e => setPaperForm({ ...paperForm, totalMarks: e.target.value })} />
                            </div>

                            <div className="space-y-2">
                                <Label>Start Time</Label>
                                <Input
                                    type="datetime-local"
                                    value={paperForm.startsAt}
                                    onChange={e => setPaperForm({ ...paperForm, startsAt: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>End Time</Label>
                                <Input
                                    type="datetime-local"
                                    value={paperForm.endsAt}
                                    onChange={e => setPaperForm({ ...paperForm, endsAt: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2 col-span-2">
                                <Label>Instructions</Label>
                                <Textarea
                                    placeholder="Exam instructions for students..."
                                    value={paperForm.description}
                                    onChange={e => setPaperForm({ ...paperForm, description: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsPaperDialogOpen(false)}>Cancel</Button>
                            <Button onClick={() => createPaperMutation.mutate()} disabled={createPaperMutation.isPending}>
                                Schedule Paper
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </main>
        </div>
    );
}
