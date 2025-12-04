import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Users, 
  Plus, 
  Upload, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle, 
  GraduationCap, 
  ChevronDown, 
  ChevronUp, 
  Layers,
  FileText,
  BookOpen,
  ClipboardList,
  Database,
  Play,
  RefreshCw,
  Check,
  ArrowRight,
  Activity,
  TrendingUp,
  Zap
} from "lucide-react";

interface User {
  id: string;
  username: string;
  email: string;
  isPaidUser: boolean;
  adminGranted: boolean;
  accessExpiry: string | null;
  openaiTokensUsed: number;
  openaiTokensLimit: number;
  createdAt: string;
}

interface PendingMentor {
  id: number;
  userId: string;
  bio: string;
  subjects: string[];
  topics: string[];
  hourlyRate: number;
  experienceYears: number;
  education: Array<{degree: string; institution: string; year?: number}>;
  languages: string[];
  verificationDocuments: any[];
  createdAt: string;
  userName: string;
  userEmail: string;
  userAvatar: string | null;
}

interface ContentStats {
  totalQuestions: number;
  totalTopics: number;
  totalTests: number;
  totalFlashcards: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserUsername, setNewUserUsername] = useState("");
  const [bulkEmails, setBulkEmails] = useState("");
  const [expandedMentors, setExpandedMentors] = useState<Set<number>>(new Set());
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showMentorVerification, setShowMentorVerification] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (user && !user.isAdmin) {
      setLocation("/");
    }
  }, [user, setLocation]);

  if (!user || !user.isAdmin) {
    return null;
  }

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
  });

  const { data: pendingMentors = [], isLoading: isLoadingMentors } = useQuery<PendingMentor[]>({
    queryKey: ["/api/admin/mentors/pending"],
  });

  const { data: contentStats } = useQuery<ContentStats>({
    queryKey: ["/api/admin/content-stats"],
    queryFn: async () => {
      try {
        const [questionsRes, topicsRes, testsRes, decksRes] = await Promise.all([
          fetch("/api/admin/questions", { credentials: "include" }),
          fetch("/api/admin/topics", { credentials: "include" }),
          fetch("/api/admin/mock-tests", { credentials: "include" }),
          fetch("/api/admin/flashcard-decks", { credentials: "include" }),
        ]);
        
        const questionsData = await questionsRes.json();
        const topicsData = await topicsRes.json();
        const testsData = await testsRes.json();
        const decksData = await decksRes.json();
        
        return {
          totalQuestions: questionsData?.pagination?.total || questionsData?.questions?.length || 0,
          totalTopics: Array.isArray(topicsData) ? topicsData.length : 0,
          totalTests: Array.isArray(testsData) ? testsData.length : 0,
          totalFlashcards: Array.isArray(decksData) ? decksData.reduce((sum: number, d: any) => sum + (d.cardCount || 0), 0) : 0,
        };
      } catch {
        return { totalQuestions: 0, totalTopics: 0, totalTests: 0, totalFlashcards: 0 };
      }
    },
  });

  const { data: generationStatus, refetch: refetchStatus } = useQuery({
    queryKey: ['/api/questions/generation-status'],
    refetchInterval: isGenerating ? 5000 : false,
  });

  const grantAccessMutation = useMutation({
    mutationFn: async (userId: string) => {
      return apiRequest("POST", `/api/admin/grant-access/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Access granted successfully" });
    },
  });

  const revokeAccessMutation = useMutation({
    mutationFn: async (userId: string) => {
      return apiRequest("POST", `/api/admin/revoke-access/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "Access revoked successfully" });
    },
  });

  const addUserMutation = useMutation({
    mutationFn: async (data: { email: string; username: string }) => {
      return apiRequest("POST", "/api/admin/add-user", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "User added successfully" });
      setNewUserEmail("");
      setNewUserUsername("");
    },
  });

  const bulkImportMutation = useMutation({
    mutationFn: async (emails: string[]) => {
      return apiRequest("POST", "/api/admin/bulk-import", { emails });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Bulk import completed",
        description: `Imported ${data.imported} users`
      });
      setBulkEmails("");
    },
  });

  const verifyMentorMutation = useMutation({
    mutationFn: async (mentorId: number) => {
      return apiRequest("PUT", `/api/admin/mentors/${mentorId}/verify`, { status: "approved" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mentors/pending"] });
      toast({ title: "Mentor approved successfully", description: "The mentor can now accept students." });
    },
    onError: () => {
      toast({ title: "Failed to approve mentor", variant: "destructive" });
    },
  });

  const rejectMentorMutation = useMutation({
    mutationFn: async (mentorId: number) => {
      return apiRequest("PUT", `/api/admin/mentors/${mentorId}/verify`, { status: "rejected" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mentors/pending"] });
      toast({ title: "Mentor application rejected" });
    },
    onError: () => {
      toast({ title: "Failed to reject mentor", variant: "destructive" });
    },
  });

  const generateMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/questions/generate-bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.json();
    },
    onSuccess: () => {
      setIsGenerating(true);
      toast({ title: "Question generation started" });
    },
    onError: () => {
      toast({ title: "Failed to start generation", variant: "destructive" });
    },
  });

  const handleBulkImport = () => {
    const emails = bulkEmails
      .split("\n")
      .map(e => e.trim())
      .filter(e => e.length > 0);

    if (emails.length === 0) {
      toast({ title: "No emails provided", variant: "destructive" });
      return;
    }

    bulkImportMutation.mutate(emails);
  };

  const hasAccess = (user: User) => {
    if (user.adminGranted) return true;
    if (!user.accessExpiry) return false;
    return new Date(user.accessExpiry) > new Date();
  };

  const toggleMentorExpanded = (mentorId: number) => {
    setExpandedMentors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(mentorId)) {
        newSet.delete(mentorId);
      } else {
        newSet.add(mentorId);
      }
      return newSet;
    });
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleGenerateQuestions = () => {
    if (confirm('This will generate 50,000+ questions in sets of 100. This process may take several minutes. Continue?')) {
      generateMutation.mutate();
    }
  };

  const stats = {
    totalUsers: users.length,
    paidUsers: users.filter(u => u.isPaidUser).length,
    freeUsers: users.filter(u => u.adminGranted && !u.isPaidUser).length,
    totalTokens: users.reduce((sum, u) => sum + u.openaiTokensUsed, 0),
    pendingMentors: pendingMentors.length,
  };

  const totalQuestions = Number(generationStatus?.totalQuestions || contentStats?.totalQuestions || 0);
  const generationProgress = parseFloat(generationStatus?.progress || '0');
  const isComplete = totalQuestions >= 50000;

  const navigationCards = [
    {
      id: "users",
      title: "User Management",
      description: "Manage user access and accounts",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      action: () => setShowUserManagement(!showUserManagement),
      badge: stats.totalUsers,
    },
    {
      id: "mentors",
      title: "Mentor Verification",
      description: "Review and approve mentor applications",
      icon: GraduationCap,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      action: () => setShowMentorVerification(!showMentorVerification),
      badge: stats.pendingMentors,
      badgeVariant: stats.pendingMentors > 0 ? "destructive" : "secondary",
    },
    {
      id: "questions",
      title: "Questions & Topics",
      description: "Manage questions and organize topics",
      icon: FileText,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      action: () => setLocation("/admin/content?tab=questions"),
      badge: contentStats?.totalQuestions || 0,
    },
    {
      id: "tests",
      title: "Mock Tests",
      description: "Create and manage mock tests",
      icon: ClipboardList,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      action: () => setLocation("/admin/content?tab=mock-tests"),
      badge: contentStats?.totalTests || 0,
    },
    {
      id: "flashcards",
      title: "Flashcards",
      description: "Create flashcard decks",
      icon: Layers,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      action: () => setLocation("/admin/content?tab=flashcards"),
      badge: contentStats?.totalFlashcards || 0,
    },
    {
      id: "chapters",
      title: "Chapters & Content",
      description: "Manage chapter-specific content",
      icon: BookOpen,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      action: () => setLocation("/admin/content?tab=chapters"),
      badge: contentStats?.totalTopics || 0,
    },
  ];

  return (
    <div className="min-h-screen gradient-mesh-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-yellow-500/10">
              <Shield className="h-10 w-10 text-yellow-500" />
            </div>
            <div>
              <h1 className="text-4xl font-bold" data-testid="text-admin-title">Admin Hub</h1>
              <p className="text-muted-foreground">Manage your NEET LMS platform</p>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card className="glass-panel" data-testid="stat-total-users">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Users</span>
              </div>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card className="glass-panel" data-testid="stat-questions">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Questions</span>
              </div>
              <div className="text-2xl font-bold">{(contentStats?.totalQuestions || 0).toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="glass-panel" data-testid="stat-topics">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-muted-foreground">Topics</span>
              </div>
              <div className="text-2xl font-bold">{contentStats?.totalTopics || 0}</div>
            </CardContent>
          </Card>

          <Card className="glass-panel" data-testid="stat-tests">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <ClipboardList className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-muted-foreground">Mock Tests</span>
              </div>
              <div className="text-2xl font-bold">{contentStats?.totalTests || 0}</div>
            </CardContent>
          </Card>

          <Card className="glass-panel" data-testid="stat-paid-users">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-muted-foreground">Paid Users</span>
              </div>
              <div className="text-2xl font-bold">{stats.paidUsers}</div>
            </CardContent>
          </Card>

          <Card className="glass-panel" data-testid="stat-pending-mentors">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-4 w-4 text-pink-500" />
                <span className="text-sm text-muted-foreground">Pending Mentors</span>
              </div>
              <div className="text-2xl font-bold">{stats.pendingMentors}</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {navigationCards.map((card) => (
              <Card 
                key={card.id}
                className="glass-panel hover:border-primary/50 transition-all cursor-pointer group"
                onClick={card.action}
                data-testid={`nav-card-${card.id}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${card.bgColor}`}>
                      <card.icon className={`h-6 w-6 ${card.color}`} />
                    </div>
                    <Badge variant={card.badgeVariant as any || "secondary"} data-testid={`badge-${card.id}`}>
                      {card.badge}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mt-4 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
                  <div className="flex items-center gap-1 mt-3 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Open</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Question Bank Generator */}
        <Card className="glass-panel mb-8" data-testid="question-generator-section">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-indigo-500" />
                  Question Bank Generator
                </CardTitle>
                <CardDescription>
                  Generate 50,000+ NEET practice questions automatically
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => refetchStatus()}
                  disabled={isGenerating}
                  data-testid="button-refresh-status"
                >
                  <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                </Button>
                <Button
                  onClick={handleGenerateQuestions}
                  disabled={isGenerating || generateMutation.isPending || isComplete}
                  data-testid="button-generate-questions"
                >
                  {generateMutation.isPending ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Starting...
                    </>
                  ) : isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : isComplete ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Complete
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Generate Questions
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Total Questions</p>
                <p className="text-2xl font-bold">{totalQuestions.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Question Sets</p>
                <p className="text-2xl font-bold">{generationStatus?.estimatedSets || Math.floor(totalQuestions / 100)}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Topics Covered</p>
                <p className="text-2xl font-bold">{generationStatus?.totalTopics || contentStats?.totalTopics || 0}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={isComplete ? "default" : "secondary"} className="mt-1">
                  {isComplete ? <><Check className="h-3 w-3 mr-1" /> Complete</> : 'In Progress'}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to 50,000 questions</span>
                <span className="font-semibold">{generationProgress.toFixed(1)}%</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {50000 - totalQuestions > 0 
                  ? `${(50000 - totalQuestions).toLocaleString()} questions remaining`
                  : 'Target achieved! 🎉'}
              </p>
            </div>

            {isGenerating && (
              <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm">
                ⏳ Generation in progress... This may take several minutes. The progress updates automatically.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity Section */}
        <Card className="glass-panel mb-8" data-testid="recent-activity-section">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-500" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest platform activity and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.slice(0, 5).map((u, index) => (
                <div key={u.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30" data-testid={`activity-item-${index}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{getInitials(u.username)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{u.username}</p>
                    <p className="text-xs text-muted-foreground">
                      Joined {new Date(u.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasAccess(u) ? (
                      <Badge variant="default" className="bg-green-500">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                  </div>
                </div>
              ))}
              {users.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* User Management Section (Collapsible) */}
        <Collapsible open={showUserManagement} onOpenChange={setShowUserManagement}>
          <Card className="glass-panel mb-8" data-testid="user-management-section">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      User Management
                    </CardTitle>
                    <CardDescription>Add and manage user access</CardDescription>
                  </div>
                  {showUserManagement ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                {/* Add User Forms */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4 p-4 rounded-lg border">
                    <h4 className="font-medium flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Single User
                    </h4>
                    <div>
                      <Label>Email</Label>
                      <Input
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="student@example.com"
                        data-testid="input-new-user-email"
                      />
                    </div>
                    <div>
                      <Label>Username</Label>
                      <Input
                        value={newUserUsername}
                        onChange={(e) => setNewUserUsername(e.target.value)}
                        placeholder="student123"
                        data-testid="input-new-user-username"
                      />
                    </div>
                    <Button
                      onClick={() => addUserMutation.mutate({ email: newUserEmail, username: newUserUsername })}
                      disabled={addUserMutation.isPending || !newUserEmail || !newUserUsername}
                      className="w-full"
                      data-testid="button-add-user"
                    >
                      Add User
                    </Button>
                  </div>

                  <div className="space-y-4 p-4 rounded-lg border">
                    <h4 className="font-medium flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Bulk Import
                    </h4>
                    <Textarea
                      value={bulkEmails}
                      onChange={(e) => setBulkEmails(e.target.value)}
                      placeholder="student1@example.com&#10;student2@example.com&#10;student3@example.com"
                      rows={5}
                      data-testid="textarea-bulk-emails"
                    />
                    <Button
                      onClick={handleBulkImport}
                      disabled={bulkImportMutation.isPending || !bulkEmails.trim()}
                      className="w-full"
                      data-testid="button-bulk-import"
                    >
                      Import Users
                    </Button>
                  </div>
                </div>

                {/* Users List */}
                <div className="space-y-2">
                  <h4 className="font-medium">All Users ({users.length})</h4>
                  {isLoading ? (
                    <p>Loading users...</p>
                  ) : (
                    <div className="max-h-[400px] overflow-y-auto space-y-2">
                      {users.map((u) => (
                        <div key={u.id} className="flex items-center justify-between p-4 rounded-lg bg-card/50 hover:bg-muted/50 transition-colors" data-testid={`user-row-${u.id}`}>
                          <div className="flex-1">
                            <div className="font-semibold">{u.username}</div>
                            <div className="text-sm text-muted-foreground">{u.email}</div>
                          </div>

                          <div className="flex items-center gap-3">
                            {hasAccess(u) ? (
                              <Badge variant="default" className="bg-green-500">Active</Badge>
                            ) : (
                              <Badge variant="secondary">No Access</Badge>
                            )}

                            {u.isPaidUser && <Badge>Paid</Badge>}
                            {u.adminGranted && <Badge variant="outline">Admin Granted</Badge>}

                            <div className="text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 inline mr-1" />
                              {u.openaiTokensUsed.toLocaleString()} tokens
                            </div>

                            {!u.adminGranted ? (
                              <Button
                                size="sm"
                                onClick={() => grantAccessMutation.mutate(u.id)}
                                disabled={grantAccessMutation.isPending}
                                data-testid={`button-grant-${u.id}`}
                              >
                                Grant Access
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => revokeAccessMutation.mutate(u.id)}
                                disabled={revokeAccessMutation.isPending}
                                data-testid={`button-revoke-${u.id}`}
                              >
                                Revoke
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Mentor Verification Section (Collapsible) */}
        <Collapsible open={showMentorVerification} onOpenChange={setShowMentorVerification}>
          <Card className="glass-panel mb-8" data-testid="mentor-verification-section">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-purple-500" />
                      Mentor Verification
                    </CardTitle>
                    {pendingMentors.length > 0 && (
                      <Badge variant="destructive" data-testid="pending-mentor-count">
                        {pendingMentors.length} pending
                      </Badge>
                    )}
                  </div>
                  {showMentorVerification ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
                <CardDescription>Review and approve mentor applications</CardDescription>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                {isLoadingMentors ? (
                  <p data-testid="mentor-loading">Loading mentor applications...</p>
                ) : pendingMentors.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground" data-testid="mentor-empty-state">
                    <GraduationCap className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No pending mentor applications</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingMentors.map((mentor) => (
                      <Collapsible
                        key={mentor.id}
                        open={expandedMentors.has(mentor.id)}
                        onOpenChange={() => toggleMentorExpanded(mentor.id)}
                      >
                        <div
                          className="p-4 rounded-lg bg-card/50 border border-border/50 hover:border-border transition-colors"
                          data-testid={`mentor-card-${mentor.id}`}
                        >
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12" data-testid={`mentor-avatar-${mentor.id}`}>
                              <AvatarImage src={mentor.userAvatar || undefined} alt={mentor.userName} />
                              <AvatarFallback>{getInitials(mentor.userName)}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <div>
                                  <h4 className="font-semibold" data-testid={`mentor-name-${mentor.id}`}>
                                    {mentor.userName}
                                  </h4>
                                  <p className="text-sm text-muted-foreground" data-testid={`mentor-email-${mentor.id}`}>
                                    {mentor.userEmail}
                                  </p>
                                </div>
                                <CollapsibleTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    data-testid={`button-expand-mentor-${mentor.id}`}
                                  >
                                    {expandedMentors.has(mentor.id) ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                  </Button>
                                </CollapsibleTrigger>
                              </div>

                              <div className="flex flex-wrap gap-1 mb-2" data-testid={`mentor-subjects-${mentor.id}`}>
                                {(mentor.subjects || []).map((subject, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {subject}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                <span data-testid={`mentor-experience-${mentor.id}`}>
                                  {mentor.experienceYears} years experience
                                </span>
                                <span data-testid={`mentor-rate-${mentor.id}`}>
                                  ₹{mentor.hourlyRate}/hour
                                </span>
                              </div>

                              {mentor.bio && (
                                <p
                                  className="text-sm text-muted-foreground line-clamp-2 mb-3"
                                  data-testid={`mentor-bio-preview-${mentor.id}`}
                                >
                                  {mentor.bio}
                                </p>
                              )}

                              <CollapsibleContent>
                                <div className="pt-3 border-t border-border/50 space-y-3">
                                  {mentor.bio && (
                                    <div>
                                      <h5 className="font-medium text-sm mb-1">Full Bio</h5>
                                      <p className="text-sm text-muted-foreground" data-testid={`mentor-bio-full-${mentor.id}`}>
                                        {mentor.bio}
                                      </p>
                                    </div>
                                  )}

                                  {mentor.education && mentor.education.length > 0 && (
                                    <div>
                                      <h5 className="font-medium text-sm mb-1">Education</h5>
                                      <ul className="space-y-1" data-testid={`mentor-education-${mentor.id}`}>
                                        {mentor.education.map((edu, idx) => (
                                          <li key={idx} className="text-sm text-muted-foreground">
                                            {edu.degree} - {edu.institution}
                                            {edu.year && ` (${edu.year})`}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {mentor.languages && mentor.languages.length > 0 && (
                                    <div>
                                      <h5 className="font-medium text-sm mb-1">Languages</h5>
                                      <div className="flex gap-1" data-testid={`mentor-languages-${mentor.id}`}>
                                        {mentor.languages.map((lang, idx) => (
                                          <Badge key={idx} variant="secondary" className="text-xs">
                                            {lang}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {mentor.topics && mentor.topics.length > 0 && (
                                    <div>
                                      <h5 className="font-medium text-sm mb-1">Topics</h5>
                                      <div className="flex flex-wrap gap-1" data-testid={`mentor-topics-${mentor.id}`}>
                                        {mentor.topics.map((topic, idx) => (
                                          <Badge key={idx} variant="outline" className="text-xs">
                                            {topic}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  <div className="text-xs text-muted-foreground" data-testid={`mentor-created-${mentor.id}`}>
                                    Applied: {new Date(mentor.createdAt).toLocaleDateString()}
                                  </div>
                                </div>
                              </CollapsibleContent>

                              <div className="flex gap-2 mt-3">
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => verifyMentorMutation.mutate(mentor.id)}
                                  disabled={verifyMentorMutation.isPending || rejectMentorMutation.isPending}
                                  data-testid={`button-approve-mentor-${mentor.id}`}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => rejectMentorMutation.mutate(mentor.id)}
                                  disabled={verifyMentorMutation.isPending || rejectMentorMutation.isPending}
                                  data-testid={`button-reject-mentor-${mentor.id}`}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Collapsible>
                    ))}
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </div>
  );
}
