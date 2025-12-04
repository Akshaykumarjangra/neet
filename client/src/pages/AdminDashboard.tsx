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
  Zap,
  Sparkles,
  Wand2,
  Brain,
  Save,
  Loader2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isAdmin: boolean;
  isPaidUser: boolean;
  currentLevel: number;
  totalPoints: number;
  createdAt: string;
}

interface GenerationStatus {
  totalQuestions: number;
  totalTopics: number;
  progress: string;
  estimatedSets?: number;
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
  
  // AI Content Generation State
  const [showAIGeneration, setShowAIGeneration] = useState(false);
  const [aiSubject, setAiSubject] = useState("Physics");
  const [aiTopic, setAiTopic] = useState("");
  const [aiQuestionCount, setAiQuestionCount] = useState([5]);
  const [aiDifficulty, setAiDifficulty] = useState("medium");
  const [aiFlashcardCount, setAiFlashcardCount] = useState([10]);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  const [generatedFlashcards, setGeneratedFlashcards] = useState<any[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

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

  const { data: generationStatus, refetch: refetchStatus } = useQuery<GenerationStatus>({
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

  // Topics for dropdown
  const { data: topics = [] } = useQuery<any[]>({
    queryKey: ["/api/admin/topics"],
  });

  // AI Question Generation Mutation
  const generateQuestionsMutation = useMutation({
    mutationFn: async (data: { subject: string; topic: string; count: number; difficulty: string }) => {
      const response = await fetch("/api/admin/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to generate questions");
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedQuestions(data.questions || []);
      toast({ title: "Questions Generated!", description: `Created ${data.count} questions` });
    },
    onError: () => {
      toast({ title: "Generation Failed", description: "Please try again", variant: "destructive" });
    },
  });

  // AI Flashcard Generation Mutation
  const generateFlashcardsMutation = useMutation({
    mutationFn: async (data: { subject: string; topic: string; count: number }) => {
      const response = await fetch("/api/admin/generate-flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to generate flashcards");
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedFlashcards(data.flashcards || []);
      toast({ title: "Flashcards Generated!", description: `Created ${data.count} flashcards` });
    },
    onError: () => {
      toast({ title: "Generation Failed", description: "Please try again", variant: "destructive" });
    },
  });

  // Save Generated Questions
  const saveQuestionsMutation = useMutation({
    mutationFn: async (data: { topicId: number; generatedQuestions: any[] }) => {
      const response = await fetch("/api/admin/save-generated-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to save questions");
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedQuestions([]);
      setSelectedTopicId(null);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content-stats"] });
      toast({ title: "Saved!", description: data.message });
    },
    onError: () => {
      toast({ title: "Save Failed", description: "Please try again", variant: "destructive" });
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
    return user.isPaidUser || user.isAdmin;
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
    adminUsers: users.filter(u => u.isAdmin).length,
    totalPoints: users.reduce((sum, u) => sum + u.totalPoints, 0),
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
                    <AvatarFallback>{getInitials(u.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{u.name}</p>
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

        {/* AI Content Generation Section */}
        <Collapsible open={showAIGeneration} onOpenChange={setShowAIGeneration}>
          <Card className="glass-panel mb-8 border-2 border-purple-500/20" data-testid="ai-generation-section">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      AI Content Generation
                      <Badge variant="secondary" className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                        Powered by GPT-5
                      </Badge>
                    </CardTitle>
                    <CardDescription>Generate questions and flashcards using AI</CardDescription>
                  </div>
                  {showAIGeneration ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <Tabs defaultValue="questions" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="questions" className="flex items-center gap-2" data-testid="tab-questions">
                      <Brain className="h-4 w-4" />
                      Questions
                    </TabsTrigger>
                    <TabsTrigger value="flashcards" className="flex items-center gap-2" data-testid="tab-flashcards">
                      <BookOpen className="h-4 w-4" />
                      Flashcards
                    </TabsTrigger>
                  </TabsList>

                  {/* Questions Generator Tab */}
                  <TabsContent value="questions" className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Subject</Label>
                        <Select value={aiSubject} onValueChange={setAiSubject}>
                          <SelectTrigger data-testid="select-subject">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Physics">Physics</SelectItem>
                            <SelectItem value="Chemistry">Chemistry</SelectItem>
                            <SelectItem value="Biology">Biology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Topic</Label>
                        <Input 
                          value={aiTopic} 
                          onChange={(e) => setAiTopic(e.target.value)}
                          placeholder="e.g., Laws of Motion, Organic Chemistry"
                          data-testid="input-topic"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Number of Questions: {aiQuestionCount[0]}</Label>
                        <Slider
                          value={aiQuestionCount}
                          onValueChange={setAiQuestionCount}
                          min={1}
                          max={10}
                          step={1}
                          data-testid="slider-question-count"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Difficulty</Label>
                        <Select value={aiDifficulty} onValueChange={setAiDifficulty}>
                          <SelectTrigger data-testid="select-difficulty">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button 
                      onClick={() => generateQuestionsMutation.mutate({
                        subject: aiSubject,
                        topic: aiTopic,
                        count: aiQuestionCount[0],
                        difficulty: aiDifficulty
                      })}
                      disabled={generateQuestionsMutation.isPending || !aiTopic.trim()}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      data-testid="button-generate-questions"
                    >
                      {generateQuestionsMutation.isPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                      ) : (
                        <><Wand2 className="mr-2 h-4 w-4" /> Generate Questions</>
                      )}
                    </Button>

                    {/* Generated Questions Preview */}
                    {generatedQuestions.length > 0 && (
                      <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Generated Questions ({generatedQuestions.length})
                          </h4>
                          <div className="flex items-center gap-2">
                            <Select value={selectedTopicId?.toString() || ""} onValueChange={(v) => setSelectedTopicId(Number(v))}>
                              <SelectTrigger className="w-[200px]" data-testid="select-save-topic">
                                <SelectValue placeholder="Select topic to save" />
                              </SelectTrigger>
                              <SelectContent>
                                {topics.map((t: any) => (
                                  <SelectItem key={t.id} value={t.id.toString()}>
                                    {t.topicName} ({t.subject})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              onClick={() => selectedTopicId && saveQuestionsMutation.mutate({
                                topicId: selectedTopicId,
                                generatedQuestions
                              })}
                              disabled={!selectedTopicId || saveQuestionsMutation.isPending}
                              data-testid="button-save-questions"
                            >
                              {saveQuestionsMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <><Save className="mr-2 h-4 w-4" /> Save</>
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto">
                          {generatedQuestions.map((q, idx) => (
                            <div key={idx} className="p-4 rounded-lg border bg-card/50" data-testid={`question-preview-${idx}`}>
                              <p className="font-medium mb-2">Q{idx + 1}: {q.questionText}</p>
                              <div className="grid grid-cols-2 gap-2 mb-3">
                                {q.options?.map((opt: any) => (
                                  <div 
                                    key={opt.id}
                                    className={`p-2 rounded text-sm ${opt.id === q.correctAnswer ? 'bg-green-500/20 border-green-500' : 'bg-muted/50'} border`}
                                  >
                                    <span className="font-semibold">{opt.id}.</span> {opt.text}
                                  </div>
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground"><strong>Explanation:</strong> {q.solutionDetail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* Flashcards Generator Tab */}
                  <TabsContent value="flashcards" className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Subject</Label>
                        <Select value={aiSubject} onValueChange={setAiSubject}>
                          <SelectTrigger data-testid="select-flashcard-subject">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Physics">Physics</SelectItem>
                            <SelectItem value="Chemistry">Chemistry</SelectItem>
                            <SelectItem value="Biology">Biology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Topic</Label>
                        <Input 
                          value={aiTopic} 
                          onChange={(e) => setAiTopic(e.target.value)}
                          placeholder="e.g., Cell Division, Thermodynamics"
                          data-testid="input-flashcard-topic"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Number of Flashcards: {aiFlashcardCount[0]}</Label>
                      <Slider
                        value={aiFlashcardCount}
                        onValueChange={setAiFlashcardCount}
                        min={1}
                        max={20}
                        step={1}
                        data-testid="slider-flashcard-count"
                      />
                    </div>

                    <Button 
                      onClick={() => generateFlashcardsMutation.mutate({
                        subject: aiSubject,
                        topic: aiTopic,
                        count: aiFlashcardCount[0]
                      })}
                      disabled={generateFlashcardsMutation.isPending || !aiTopic.trim()}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      data-testid="button-generate-flashcards"
                    >
                      {generateFlashcardsMutation.isPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                      ) : (
                        <><Wand2 className="mr-2 h-4 w-4" /> Generate Flashcards</>
                      )}
                    </Button>

                    {/* Generated Flashcards Preview */}
                    {generatedFlashcards.length > 0 && (
                      <div className="mt-6 space-y-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Generated Flashcards ({generatedFlashcards.length})
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {generatedFlashcards.map((card, idx) => (
                            <div 
                              key={idx}
                              className="relative h-48 cursor-pointer perspective-1000"
                              onClick={() => {
                                const newFlipped = new Set(flippedCards);
                                if (newFlipped.has(idx)) {
                                  newFlipped.delete(idx);
                                } else {
                                  newFlipped.add(idx);
                                }
                                setFlippedCards(newFlipped);
                              }}
                              data-testid={`flashcard-${idx}`}
                            >
                              <div className={`absolute inset-0 rounded-lg border-2 p-4 flex items-center justify-center text-center transition-all duration-500 ${flippedCards.has(idx) ? 'opacity-0 rotate-y-180' : 'opacity-100'} bg-gradient-to-br from-purple-500/10 to-pink-500/10`}>
                                <p className="font-medium">{card.front}</p>
                              </div>
                              <div className={`absolute inset-0 rounded-lg border-2 p-4 flex items-center justify-center text-center transition-all duration-500 ${flippedCards.has(idx) ? 'opacity-100' : 'opacity-0 rotate-y-180'} bg-gradient-to-br from-green-500/10 to-blue-500/10`}>
                                <p className="text-sm">{card.back}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground text-center">Click cards to flip</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

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
                            <div className="font-semibold">{u.name}</div>
                            <div className="text-sm text-muted-foreground">{u.email}</div>
                          </div>

                          <div className="flex items-center gap-3">
                            {hasAccess(u) ? (
                              <Badge variant="default" className="bg-green-500">Active</Badge>
                            ) : (
                              <Badge variant="secondary">No Access</Badge>
                            )}

                            {u.isPaidUser && <Badge>Paid</Badge>}
                            {u.isAdmin && <Badge variant="outline">Admin</Badge>}

                            <div className="text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 inline mr-1" />
                              Level {u.currentLevel} · {u.totalPoints} pts
                            </div>

                            {!u.isPaidUser ? (
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
