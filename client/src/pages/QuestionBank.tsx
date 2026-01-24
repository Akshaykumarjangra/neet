import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Paywall } from "@/components/Paywall";
import { useAuth } from "@/hooks/useAuth";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  BookOpen,
  Search,
  Filter,
  Play,
  Lock,
  Atom,
  FlaskConical,
  Leaf,
  Bug,
  Calendar,
  Trophy,
  Target,
  Sparkles,
  Crown,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionStats {
  total: number;
  bySubject: Record<string, number>;
  byDifficulty: Record<string, number>;
  pyqCount: number;
  pyqByYear: Record<string, number>;
}

interface Topic {
  id: number;
  subject: string;
  classLevel: string;
  topicName: string;
  ncertChapter: string | null;
}

interface Question {
  id: number;
  topicId: number;
  questionText: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  solutionDetail: string;
  difficultyLevel: number;
  sourceType: string;
  pyqYear: number | null;
  topic?: Topic;
  tags?: { tag: string; category: string }[];
}

interface QuestionsResponse {
  questions: Question[];
  total: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  isLimited?: boolean;
  quotaExhausted?: boolean;
  quotaRemaining?: number;
  requiresSignup?: boolean;
  isPreview?: boolean;
  requiresAuth?: boolean;
  message?: string;
}

interface QuestionTagSummary {
  tag: string;
  category: string;
  count: number;
}

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value === 0) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
}

function getDifficultyBadge(level: number) {
  switch (level) {
    case 1:
      return <Badge className="bg-green-500/20 text-green-600 border-green-500/30" data-testid="badge-difficulty-easy">Easy</Badge>;
    case 2:
      return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30" data-testid="badge-difficulty-medium">Medium</Badge>;
    case 3:
    default:
      return <Badge className="bg-red-500/20 text-red-600 border-red-500/30" data-testid="badge-difficulty-hard">Hard</Badge>;
  }
}

function getSubjectIcon(subject: string) {
  switch (subject.toLowerCase()) {
    case "physics":
      return <Atom className="h-5 w-5" />;
    case "chemistry":
      return <FlaskConical className="h-5 w-5" />;
    case "botany":
      return <Leaf className="h-5 w-5" />;
    case "zoology":
      return <Bug className="h-5 w-5" />;
    case "biology":
      return <Leaf className="h-5 w-5" />;
    default:
      return <BookOpen className="h-5 w-5" />;
  }
}

function QuestionCard({ question, index, isLocked, onManageTags }: { question: Question; index: number; isLocked: boolean; onManageTags?: () => void }) {
  const truncatedText = question.questionText.length > 200
    ? question.questionText.substring(0, 200) + "..."
    : question.questionText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        className={`relative transition-all hover:shadow-md ${isLocked ? 'opacity-60' : ''}`}
        data-testid={`card-question-${question.id}`}
      >
        {isLocked && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
            <div className="text-center p-4">
              <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Premium Only</p>
            </div>
          </div>
        )}
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {getDifficultyBadge(question.difficultyLevel)}
            {question.pyqYear && (
              <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/30" data-testid={`badge-pyq-${question.id}`}>
                <Calendar className="h-3 w-3 mr-1" />
                PYQ {question.pyqYear}
              </Badge>
            )}
            {question.topic && (
              <Badge variant="secondary" className="text-xs" data-testid={`badge-topic-${question.id}`}>
                {question.topic.topicName}
              </Badge>
            )}
          </div>
          <p className="text-sm leading-relaxed" data-testid={`text-question-${question.id}`}>
            {truncatedText}
          </p>
        </CardContent>
        {question.tags && question.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 px-4 pb-4 pt-1">
            {question.tags.map((tag) => (
              <Badge key={`${tag.category}-${tag.tag}`} variant="outline" className="text-xs uppercase">
                {tag.tag}
              </Badge>
            ))}
          </div>
        )}
        {onManageTags && (
          <div className="flex justify-end px-4 pb-4">
            <Button variant="outline" size="sm" onClick={onManageTags}>
              Manage tags
            </Button>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

function SignupWall({ onNavigate, totalQuestions }: { onNavigate: () => void; totalQuestions: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="col-span-full"
    >
      <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0 shadow-xl" data-testid="card-signup-wall">
        <CardContent className="p-8 md:p-12 text-center text-white">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-signup-title">
            Create a free account to continue
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-md mx-auto">
            Sign up to access 10 preview questions, or upgrade to Premium for unlimited access to all {totalQuestions.toLocaleString()}+ questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onNavigate}
              size="lg"
              className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8"
              data-testid="button-signup-wall"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Sign Up Free
            </Button>
          </div>
          <p className="text-sm text-white/70 mt-6">
            Already have an account?{" "}
            <button
              onClick={() => window.location.href = '/login'}
              className="underline hover:text-white transition-colors"
              data-testid="link-login-wall"
            >
              Log in
            </button>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function QuestionBank() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const isOwner = user?.isOwner ?? false;
  const isPremium = user?.isPaidUser ?? false;

  const [activeSubject, setActiveSubject] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [pyqOnly, setPyqOnly] = useState(false);
  const [pyqYear, setPyqYear] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [tagInputValue, setTagInputValue] = useState("");
  const [tagCategory, setTagCategory] = useState("custom");
  const questionsPerPage = 15;
  const sortedSelectedTags = useMemo(() => [...selectedTags].sort(), [selectedTags]);
  const openTagModal = (question: Question) => {
    setEditingQuestion(question);
    setTagInputValue((question.tags ?? []).map((tag) => tag.tag).join(", "));
    setTagCategory(question.tags?.[0]?.category ?? "custom");
  };

  const closeTagModal = () => {
    setEditingQuestion(null);
    setTagInputValue("");
    setTagCategory("custom");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeSubject, difficulty, pyqOnly, pyqYear, selectedTags]);

  const { data: stats, isLoading: statsLoading } = useQuery<QuestionStats>({
    queryKey: ["/api/questions/stats"],
  });

  const { data: tagSummary = [], isLoading: tagsLoading } = useQuery<QuestionTagSummary[]>({
    queryKey: ["/api/question-tags"],
    queryFn: async () => {
      const response = await fetch("/api/question-tags", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to load question tags");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (activeSubject !== "all") params.append("subject", activeSubject);
    if (difficulty !== "all") params.append("difficulty", difficulty);
    if (pyqOnly) params.append("pyqOnly", "true");
    if (pyqYear !== "all") params.append("pyqYear", pyqYear);
    if (debouncedSearch) params.append("search", debouncedSearch);
    sortedSelectedTags.forEach((tag) => params.append("tags", tag));
    params.append("page", String(currentPage));
    params.append("limit", String(questionsPerPage));
    return params.toString();
  };

  const { data: questionsData, isLoading: questionsLoading } = useQuery<QuestionsResponse>({
    queryKey: [
      "/api/questions",
      user?.id,
      activeSubject,
      difficulty,
      pyqOnly,
      pyqYear,
      sortedSelectedTags,
      debouncedSearch,
      currentPage,
    ],
    queryFn: async () => {
      try {
        // For unauthenticated users, use the preview endpoint (fixed 5 questions, no filters)
        if (!user) {
          const response = await fetch("/api/questions/preview", {
            credentials: 'include',
          });
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || "Failed to fetch preview questions");
          }
          const data = await response.json();
          // Ensure consistent format
          return {
            questions: Array.isArray(data.questions) ? data.questions : (Array.isArray(data) ? data : []),
            total: data.total || (Array.isArray(data) ? data.length : 0),
            page: data.page || 1,
            limit: data.limit || 5,
            totalPages: data.totalPages || 1,
            isPreview: true,
          };
        }

        // For authenticated users, use the main endpoint with filters
        const response = await fetch(`/api/questions?${buildQueryString()}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Session expired - treat as unauthenticated
            const previewResponse = await fetch("/api/questions/preview", {
              credentials: 'include',
            });
            if (!previewResponse.ok) {
              const errorData = await previewResponse.json().catch(() => ({}));
              throw new Error(errorData.error || "Failed to fetch preview questions");
            }
            const previewData = await previewResponse.json();
            return {
              questions: Array.isArray(previewData.questions) ? previewData.questions : (Array.isArray(previewData) ? previewData : []),
              total: previewData.total || (Array.isArray(previewData) ? previewData.length : 0),
              page: previewData.page || 1,
              limit: previewData.limit || 5,
              totalPages: previewData.totalPages || 1,
              isPreview: true,
            };
          }
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to fetch questions: ${response.statusText}`);
        }

        const data = await response.json();

        // Ensure consistent format
        return {
          questions: Array.isArray(data.questions) ? data.questions : [],
          total: data.total || 0,
          page: data.page || 1,
          limit: data.limit || 20,
          totalPages: data.totalPages || 1,
          isLimited: data.isLimited || false,
          quotaExhausted: data.quotaExhausted || false,
          quotaRemaining: data.quotaRemaining,
          requiresSignup: data.requiresSignup || false,
        };
      } catch (err: any) {
        console.error('Error fetching questions:', err);
        throw err;
      }
    },
  });

  const tagMutation = useMutation({
    mutationFn: async (payload: { questionId: number; tags: { tag: string; category: string }[] }) => {
      const response = await fetch(`/api/question-tags/question/${payload.questionId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tags: payload.tags,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to update tags");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Tags saved" });
      closeTagModal();
      queryClient.invalidateQueries({ queryKey: ["/api/questions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/question-tags"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to save tags",
        description: error?.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const handleSaveTags = () => {
    if (!editingQuestion) return;
    const parsedTags = tagInputValue
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((tag) => ({ tag, category: tagCategory }));

    tagMutation.mutate({ questionId: editingQuestion.id, tags: parsedTags });
  };

  const handleStartPractice = () => {
    const params = new URLSearchParams();
    if (activeSubject !== "all") params.append("subject", activeSubject);
    if (difficulty !== "all") params.append("difficulty", difficulty);
    if (pyqOnly) params.append("pyqOnly", "true");
    if (pyqYear !== "all") params.append("pyqYear", pyqYear);
    setLocation(`/practice?${params.toString()}`);
  };

  const toggleTagFilter = (tag: string) => {
    const normalized = tag.trim();
    setSelectedTags((current) =>
      current.includes(normalized)
        ? current.filter((value) => value !== normalized)
        : [...current, normalized]
    );
  };

  const clearTagFilters = () => {
    setSelectedTags([]);
  };

  const subjects = ["Physics", "Chemistry", "Botany", "Zoology"];
  const pyqYears = stats?.pyqByYear ? Object.keys(stats.pyqByYear).sort((a, b) => Number(b) - Number(a)) : [];

  const renderPaginationItems = () => {
    if (!questionsData) return null;
    const { totalPages } = questionsData;
    const items = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
              data-testid={`pagination-page-${i}`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => setCurrentPage(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
            data-testid="pagination-page-1"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="ellipsis-start" />);
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
              data-testid={`pagination-page-${i}`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="ellipsis-end" />);
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => setCurrentPage(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
            data-testid={`pagination-page-${totalPages}`}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />

      <main className="container mx-auto px-4 py-8" data-testid="page-question-bank">
        <section className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-primary">NEET Question Bank</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-hero-title">
              <AnimatedCounter value={stats?.total || 50000} />+ Questions
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Master every topic with our comprehensive question bank covering Physics, Chemistry, Botany, and Zoology.
              Practice with Previous Year Questions and track your progress.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {subjects.map((subject) => (
                <Card key={subject} className="bg-background/50 backdrop-blur-sm border-primary/10">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${subject === "Physics" ? "bg-blue-500/10 text-blue-600" :
                      subject === "Chemistry" ? "bg-orange-500/10 text-orange-600" :
                        subject === "Botany" ? "bg-green-500/10 text-green-600" :
                          "bg-purple-500/10 text-purple-600"
                      }`}>
                      {getSubjectIcon(subject)}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{subject}</p>
                      <p className="font-semibold" data-testid={`stat-subject-${subject.toLowerCase()}`}>
                        {statsLoading ? (
                          <Skeleton className="h-5 w-12" />
                        ) : (
                          <AnimatedCounter
                            value={
                              subject === "Botany" || subject === "Zoology"
                                ? Math.floor((stats?.bySubject?.["Biology"] || 0) / 2)
                                : stats?.bySubject?.[subject] || 0
                            }
                          />
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">
                  <strong data-testid="stat-pyq-count">
                    {statsLoading ? <Skeleton className="h-4 w-8 inline-block" /> : <AnimatedCounter value={stats?.pyqCount || 0} />}
                  </strong>{" "}
                  Previous Year Questions
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm">
                <Target className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  <strong>Easy: {stats?.byDifficulty?.easy || 0}</strong> |
                  <strong> Medium: {stats?.byDifficulty?.medium || 0}</strong> |
                  <strong> Hard: {stats?.byDifficulty?.hard || 0}</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        <Tabs value={activeSubject} onValueChange={setActiveSubject} className="mb-8">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto" data-testid="tabs-subjects">
            <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
            <TabsTrigger value="Physics" data-testid="tab-physics">Physics</TabsTrigger>
            <TabsTrigger value="Chemistry" data-testid="tab-chemistry">Chemistry</TabsTrigger>
            <TabsTrigger value="Botany" data-testid="tab-botany">Botany</TabsTrigger>
            <TabsTrigger value="Zoology" data-testid="tab-zoology">Zoology</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search"
                  />
                </div>
              </div>

              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-[140px]" data-testid="select-difficulty">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="1">Easy</SelectItem>
                  <SelectItem value="2">Medium</SelectItem>
                  <SelectItem value="3">Hard</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Switch
                  id="pyq-toggle"
                  checked={pyqOnly}
                  onCheckedChange={setPyqOnly}
                  data-testid="switch-pyq"
                />
                <Label htmlFor="pyq-toggle" className="text-sm cursor-pointer">
                  PYQ Only
                </Label>
              </div>

              {pyqOnly && pyqYears.length > 0 && (
                <Select value={pyqYear} onValueChange={setPyqYear}>
                  <SelectTrigger className="w-[120px]" data-testid="select-year">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {pyqYears.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Button onClick={handleStartPractice} className="gap-2" data-testid="button-start-practice">
                <Play className="h-4 w-4" />
                Start Practice
              </Button>

              {questionsData?.isLimited && !isPremium && !questionsData?.requiresSignup && (
                <Badge
                  variant="outline"
                  className={`gap-1 ${questionsData.quotaRemaining === 0
                    ? 'bg-red-500/10 text-red-600 border-red-500/30'
                    : 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                    }`}
                  data-testid="badge-quota-remaining"
                >
                  <AlertCircle className="h-3 w-3" />
                  {10 - (questionsData.quotaRemaining ?? 0)}/10 free previews used
                </Badge>
              )}

              {(questionsData?.requiresSignup || questionsData?.isPreview) && (
                <Badge
                  variant="outline"
                  className="gap-1 bg-blue-500/10 text-blue-600 border-blue-500/30"
                  data-testid="badge-signup-prompt"
                >
                  <AlertCircle className="h-3 w-3" />
                  Sign up to access all questions
                </Badge>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm font-semibold text-muted-foreground">Tags</span>
              {tagsLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                tagSummary.slice(0, 12).map((entry) => (
                  <Button
                    key={`${entry.category}-${entry.tag}`}
                    variant={selectedTags.includes(entry.tag) ? "default" : "outline"}
                    size="sm"
                    className="uppercase tracking-wide text-xs h-8 px-3"
                    onClick={() => toggleTagFilter(entry.tag)}
                  >
                    {entry.tag}
                    <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                      {entry.count}
                    </span>
                  </Button>
                ))
              )}
              {selectedTags.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearTagFilters}>
                  Clear tags
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {questionsLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex gap-2 mb-3">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : questionsData?.quotaExhausted ? (
          <Paywall
            variant="fullpage"
            feature="Unlock 50,000+ Questions"
            description="You've reached the free preview limit. Upgrade to Premium to access our complete question bank with detailed solutions and AI insights."
            freeLimit="10 Questions"
          />
        ) : questionsData?.questions.length === 0 ? (
          <Card className="p-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No questions found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </Card>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground" data-testid="text-results-count">
                {questionsData?.isPreview ? (
                  <>Showing {questionsData?.questions.length} sample questions (Sign up for full access to {(stats?.total || 50000).toLocaleString()}+ questions)</>
                ) : (
                  <>Showing {questionsData?.questions.length} of {(stats?.total || questionsData?.total || 0).toLocaleString()} questions</>
                )}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {questionsData?.questions.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={index}
                  isLocked={false}
                  onManageTags={isOwner ? () => openTagModal(question) : undefined}
                />
              ))}

              {(questionsData?.requiresSignup || questionsData?.isPreview) && (
                <SignupWall
                  onNavigate={() => setLocation('/signup')}
                  totalQuestions={stats?.total || 50000}
                />
              )}
            </div>

            {questionsData?.isLimited && !questionsData?.requiresSignup && !questionsData?.isPreview && (
              <div className="mt-8">
                <Paywall
                  feature="Full Question Bank Access"
                  description={`Unlock all ${(stats?.total || 50000).toLocaleString()}+ questions, including Previous Year Questions, to supercharge your NEET preparation.`}
                  freeLimit="10 preview questions"
                  variant="inline"
                />
              </div>
            )}

            {questionsData && (questionsData.totalPages ?? 0) > 1 && !questionsData.isLimited && !questionsData.isPreview && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        data-testid="pagination-prev"
                      />
                    </PaginationItem>
                    {renderPaginationItems()}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((p) => Math.min(questionsData.totalPages, p + 1))}
                        className={currentPage === questionsData.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        data-testid="pagination-next"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </main>
      <Dialog open={Boolean(editingQuestion)} onOpenChange={(open) => !open && closeTagModal()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage question tags</DialogTitle>
            <DialogDescription>
              Add comma separated tags to classify the question for filtering or analytics.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="question-tags" className="text-sm">Tags</Label>
              <Input
                id="question-tags"
                value={tagInputValue}
                onChange={(event) => setTagInputValue(event.target.value)}
                placeholder="e.g., pyq, derivations, skill-based"
              />
            </div>
            <div>
              <Label htmlFor="tag-category" className="text-sm">Category</Label>
              <Select
                value={tagCategory}
                onValueChange={(value) => setTagCategory(value)}
              >
                <SelectTrigger id="tag-category" className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concept">Concept</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                  <SelectItem value="pyq">PYQ</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={closeTagModal}>
              Cancel
            </Button>
            <Button onClick={handleSaveTags} disabled={tagMutation.isPending}>
              {tagMutation.isPending ? "Saving..." : "Save tags"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
