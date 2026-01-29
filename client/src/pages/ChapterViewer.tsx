import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuthModal } from "@/components/AuthModal";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  BookOpen,
  ArrowLeft,
  Clock,
  Lightbulb,
  AlertCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  FlaskConical,
  Zap,
  GraduationCap,
  Star,
  AlertTriangle,
  List,
  MessageCircle,
  Share2,
  Minus,
  Plus,
  CheckCircle2,
  Timer,
  Brain,
  Trophy,
  ChevronUp,
  ArrowRight,
  Menu,
  Crown,
  Sparkles,
  LogOut,
} from "lucide-react";
import type { ChapterContent, Keypoint, Formula, Question } from "@shared/schema";
import { VisualizationRenderer } from "@/components/visualizations/VisualizationRegistry";
import { ViewportActivatedVisualization } from "@/components/visualizations/ViewportActivatedVisualization";
import { PhetSimulationViewer } from "@/components/PhetSimulationViewer";
import { ChapterChatbot } from "@/components/ChapterChatbot";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChapterViewer() {
  const params = useParams<{ subject: string; classLevel: string; chapterNumber: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const sessionIdRef = useRef<number | null>(null);
  const sessionStartTimeRef = useRef<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { subject, classLevel, chapterNumber } = params;

  // Access Control check
  useEffect(() => {
    if (chapterNumber && parseInt(chapterNumber) > 3 && !user?.isPaidUser) {
      if (user) {
        // Only redirect if user IS loaded
        navigate("/pricing");
        toast({
          title: "Premium Content",
          description: "This chapter is locked. Upgrade to access.",
          variant: "destructive",
        });
      }
    }
  }, [chapterNumber, user, navigate, toast]);

  const [activeTab, setActiveTab] = useState("read");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedKeypointId, setCopiedKeypointId] = useState<number | null>(null);
  const [copiedFormulaId, setCopiedFormulaId] = useState<number | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [showToc, setShowToc] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isChapterComplete, setIsChapterComplete] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showFloatingToolbar, setShowFloatingToolbar] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const normalizedSubject = useMemo(() => {
    if (!subject) return "";
    return subject.charAt(0).toUpperCase() + subject.slice(1).toLowerCase();
  }, [subject]);
  const subjectPath = subject?.toLowerCase();

  const { data: chapter, isLoading, error } = useQuery<ChapterContent>({
    queryKey: ['chapter', subject, classLevel, chapterNumber],
    queryFn: async () => {
      const response = await fetch(
        `/api/chapters/by-chapter/${subject}/${classLevel}/${chapterNumber}`
      );
      if (!response.ok) {
        const error = new Error('Chapter not found');
        (error as any).status = response.status;
        throw error;
      }
      return response.json();
    },
    enabled: !!subject && !!classLevel && !!chapterNumber,
  });

  const { data: chapterIndex = [] } = useQuery<ChapterContent[]>({
    queryKey: ['chapters', normalizedSubject],
    queryFn: async () => {
      if (!normalizedSubject) return [];
      const response = await fetch(`/api/chapters?subject=${normalizedSubject}&status=published`);
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!normalizedSubject,
  });

  const orderedChapters = useMemo(() => {
    if (!chapterIndex.length) return [];
    return [...chapterIndex].sort((a, b) => {
      const classA = parseInt(a.classLevel, 10);
      const classB = parseInt(b.classLevel, 10);
      if (!Number.isNaN(classA) && !Number.isNaN(classB) && classA !== classB) {
        return classA - classB;
      }
      if (a.classLevel !== b.classLevel) {
        return a.classLevel.localeCompare(b.classLevel);
      }
      return (a.chapterNumber ?? 0) - (b.chapterNumber ?? 0);
    });
  }, [chapterIndex]);

  const currentChapterIndex = useMemo(() => {
    if (!orderedChapters.length || !classLevel || !chapterNumber) return -1;
    const currentNumber = parseInt(chapterNumber, 10);
    return orderedChapters.findIndex(
      (item) => item.classLevel === classLevel && item.chapterNumber === currentNumber
    );
  }, [orderedChapters, classLevel, chapterNumber]);

  const previousChapter =
    currentChapterIndex > 0 ? orderedChapters[currentChapterIndex - 1] : null;
  const nextChapter =
    currentChapterIndex >= 0 && currentChapterIndex < orderedChapters.length - 1
      ? orderedChapters[currentChapterIndex + 1]
      : null;

  const { data: bookmarks = [] } = useQuery<any[]>({
    queryKey: ['/api/lms/bookmarks'],
    queryFn: async () => {
      const response = await fetch('/api/lms/bookmarks');
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!chapter?.id && !!user?.id,
  });

  const { data: mentorAssets = [] } = useQuery<any[]>({
    queryKey: ['/api/chapters', chapter?.id, 'assets'],
    queryFn: async () => {
      if (!chapter?.id) return [];
      const response = await fetch(`/api/chapters/${chapter.id}/assets`);
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!chapter?.id,
  });

  const chapterKeyConcepts = chapter?.keyConcepts || [];
  const chapterFormulas = chapter?.formulas || [];
  const keypointsLoading = isLoading;
  const formulasLoading = isLoading;
  const sanitizedNotes = useMemo(() => {
    const notes = chapter?.detailedNotes ?? "";
    const title = chapter?.chapterTitle?.trim().toLowerCase();
    if (!notes || !title) return notes;
    const headingMatch = notes.match(/^#\s+(.+?)(\r?\n|$)/);
    if (!headingMatch) return notes;
    const headingTitle = headingMatch[1].trim().toLowerCase();
    if (headingTitle !== title) return notes;
    return notes.slice(headingMatch[0].length).replace(/^\s+/, "");
  }, [chapter?.detailedNotes, chapter?.chapterTitle]);

  const { data: practiceQuestions = [] } = useQuery<Question[]>({
    queryKey: ['/api/questions/chapter', chapter?.id],
    queryFn: async () => {
      if (!chapter?.id) return [];
      const response = await fetch(`/api/questions?chapterContentId=${chapter.id}&limit=5`);
      if (!response.ok) return [];
      const data = await response.json();
      const questions = Array.isArray(data) ? data : data?.questions || [];
      return questions.slice(0, 5);
    },
    enabled: !!chapter?.id,
  });

  const { data: keypointBookmarks = [] } = useQuery<any[]>({
    queryKey: ['/api/learn/bookmarks/keypoints'],
    queryFn: async () => {
      const response = await fetch('/api/learn/bookmarks/keypoints');
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!user?.id,
  });

  const { data: formulaBookmarks = [] } = useQuery<any[]>({
    queryKey: ['/api/learn/bookmarks/formulas'],
    queryFn: async () => {
      const response = await fetch('/api/learn/bookmarks/formulas');
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (bookmarks && chapter?.id) {
      const bookmark = bookmarks.find((b: any) => b.chapterContentId === chapter.id);
      setIsBookmarked(!!bookmark);
    }
  }, [bookmarks, chapter?.id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = useCallback(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      const scrollTop = window.scrollY - element.offsetTop;
      const scrollHeight = element.scrollHeight - window.innerHeight;
      let progress = 0;
      if (scrollHeight > 0) {
        progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
      }
      setReadingProgress(Number.isFinite(progress) ? progress : 0);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const startSessionMutation = useMutation({
    mutationFn: async () => {
      if (!chapter?.id || !user?.id) return;
      return await apiRequest('POST', '/api/lms/sessions', {
        chapterContentId: chapter.id,
      });
    },
    onSuccess: (data: any) => {
      if (data && typeof data === 'object' && 'id' in data) {
        sessionIdRef.current = data.id;
        sessionStartTimeRef.current = Date.now();
      }
    },
    onError: () => {
      sessionIdRef.current = null;
      sessionStartTimeRef.current = null;
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      if (!chapter?.id) return;
      if (!user?.id) {
        throw new Error("Authentication required");
      }
      if (isBookmarked) {
        const bookmark = bookmarks?.find((b: any) => b.chapterContentId === chapter.id);
        if (bookmark) {
          return await apiRequest('DELETE', `/api/lms/bookmarks/${bookmark.id}`);
        }
      } else {
        return await apiRequest('POST', '/api/lms/bookmarks', {
          chapterContentId: chapter.id,
        });
      }
    },
    onSuccess: () => {
      setIsBookmarked(!isBookmarked);
      queryClient.invalidateQueries({ queryKey: ['/api/lms/bookmarks'] });
      toast({
        title: isBookmarked ? "Bookmark removed" : "Chapter bookmarked",
        description: isBookmarked ? "Removed from bookmarks" : "Added to your bookmarks",
      });
    },
    onError: (error: any) => {
      const message = typeof error?.message === "string" ? error.message : "";
      if (message.includes("Authentication")) {
        toast({
          title: "Login required",
          description: "Please log in to bookmark chapters.",
          variant: "destructive",
        });
      }
    },
  });

  const toggleKeypointBookmarkMutation = useMutation({
    mutationFn: async (keypointId: number) => {
      if (!user?.id) {
        throw new Error("Authentication required");
      }
      return await apiRequest('POST', `/api/learn/bookmarks/keypoints/${keypointId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/learn/bookmarks/keypoints'] });
      toast({
        title: "Keypoint bookmark updated",
        description: "Your bookmark has been updated",
      });
    },
    onError: (error: any) => {
      const message = typeof error?.message === "string" ? error.message : "";
      if (message.includes("Authentication")) {
        toast({
          title: "Login required",
          description: "Please log in to bookmark keypoints.",
          variant: "destructive",
        });
      }
    },
  });

  const toggleFormulaBookmarkMutation = useMutation({
    mutationFn: async (formulaId: number) => {
      if (!user?.id) {
        throw new Error("Authentication required");
      }
      return await apiRequest('POST', `/api/learn/bookmarks/formulas/${formulaId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/learn/bookmarks/formulas'] });
      toast({
        title: "Formula bookmark updated",
        description: "Your bookmark has been updated",
      });
    },
    onError: (error: any) => {
      const message = typeof error?.message === "string" ? error.message : "";
      if (message.includes("Authentication")) {
        toast({
          title: "Login required",
          description: "Please log in to bookmark formulas.",
          variant: "destructive",
        });
      }
    },
  });

  useEffect(() => {
    if (!chapter?.id || !user?.id) return;

    const sessionStartTime = Date.now();
    const sessionPromise = startSessionMutation
      .mutateAsync()
      .then((data: any) => {
        if (data && typeof data === 'object' && 'id' in data) {
          sessionIdRef.current = data.id as number;
          sessionStartTimeRef.current = sessionStartTime;
        }
        return data;
      })
      .catch((error) => {
        console.warn("Session start failed", error);
        return null;
      });

    return () => {
      sessionPromise.then((data: any) => {
        if (data && typeof data === 'object' && 'id' in data && data.id) {
          const durationMs = Date.now() - sessionStartTime;
          const durationMinutes = Math.floor(durationMs / 60000);

          apiRequest('PATCH', `/api/lms/sessions/${data.id}`, {
            endedAt: new Date().toISOString(),
            durationMinutes: Math.max(1, durationMinutes),
            sectionsViewed: ['introduction', 'notes', 'concepts'],
            interactionCount: 5,
          }).catch(() => {
            console.error('Session cleanup failed');
          });
        }
      }).catch(() => {
        console.error('Session start failed');
      });
    };
  }, [chapter?.id]);

  const getSubjectColor = (subj: string) => {
    switch (subj?.toLowerCase()) {
      case 'physics':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'chemistry':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30';
      case 'biology':
      case 'botany':
      case 'zoology':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/10 text-foreground border-gray-500/30';
    }
  };

  const handleBackClick = () => {
    navigate(`/${subjectPath}`);
  };

  const handlePreviousChapter = () => {
    if (!previousChapter || !subjectPath) return;
    navigate(`/chapter/${subjectPath}/${previousChapter.classLevel}/${previousChapter.chapterNumber}`);
  };

  const handleNextChapter = () => {
    if (!nextChapter || !subjectPath) return;
    navigate(`/chapter/${subjectPath}/${nextChapter.classLevel}/${nextChapter.chapterNumber}`);
  };

  const copyToClipboard = async (text: string, id: number, type: 'keypoint' | 'formula') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'keypoint') {
        setCopiedKeypointId(id);
        setTimeout(() => setCopiedKeypointId(null), 2000);
      } else {
        setCopiedFormulaId(id);
        setTimeout(() => setCopiedFormulaId(null), 2000);
      }
      toast({
        title: "Copied!",
        description: `${type === 'keypoint' ? 'Keypoint' : 'Formula'} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: chapter?.chapterTitle,
        text: `Check out this chapter: ${chapter?.chapterTitle}`,
        url: window.location.href,
      });
    } catch (err) {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Chapter link copied to clipboard",
      });
    }
  };

  const adjustFontSize = (delta: number) => {
    setFontSize(prev => Math.min(24, Math.max(14, prev + delta)));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isKeypointBookmarked = (keypointId: number) => {
    return keypointBookmarks.some((b: any) => b.keypointId === keypointId);
  };

  const isFormulaBookmarked = (formulaId: number) => {
    return formulaBookmarks.some((b: any) => b.formulaId === formulaId);
  };

  const getPriorityBadge = (keypoint: Keypoint) => {
    if (keypoint.isHighYield || keypoint.neetFrequency === 'very_high') {
      return (
        <Badge className="bg-red-500 text-white font-semibold">
          <Star className="h-3 w-3 mr-1" />
          Must Know
        </Badge>
      );
    }
    if (keypoint.neetFrequency === 'high' || keypoint.neetFrequency === 'medium') {
      return (
        <Badge className="bg-amber-500 text-white font-semibold">
          <Lightbulb className="h-3 w-3 mr-1" />
          Good to Know
        </Badge>
      );
    }
    return (
      <Badge className="bg-blue-500 text-white font-semibold">
        <Brain className="h-3 w-3 mr-1" />
        For Experts
      </Badge>
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const estimatedReadTime = chapter?.estimatedStudyMinutes
    ? Math.ceil(chapter.estimatedStudyMinutes * 0.6)
    : 15;

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6 max-w-6xl">
            <Skeleton className="h-10 w-32 mb-6" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (error || !chapter) {
    const isPaymentRequired = (error as any)?.status === 402 || (error as any)?.status === 403;

    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6 max-w-6xl">
            <Button
              variant="ghost"
              onClick={handleBackClick}
              className="mb-6"
              data-testid="button-back-to-chapters"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chapters
            </Button>

            {isPaymentRequired ? (
              <Card className="border-primary/50 bg-primary/5 shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <Crown className="h-12 w-12 text-primary/20 rotate-12" />
                </div>
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold tracking-tight">Premium Content</CardTitle>
                  <CardDescription className="text-lg">
                    This chapter is reserved for our Premium members.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3 mt-4">
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-background/50 border">
                      <Zap className="h-6 w-6 text-amber-500 mb-2" />
                      <h4 className="font-semibold text-sm">50,000+ Questions</h4>
                      <p className="text-xs text-muted-foreground">Full question bank access</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-background/50 border">
                      <Trophy className="h-6 w-6 text-blue-500 mb-2" />
                      <h4 className="font-semibold text-sm">Mock Tests</h4>
                      <p className="text-xs text-muted-foreground">Unlimited NEET patterns</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-background/50 border">
                      <Brain className="h-6 w-6 text-purple-500 mb-2" />
                      <h4 className="font-semibold text-sm">AI Guidance</h4>
                      <p className="text-xs text-muted-foreground">Personalized study paths</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 px-8 font-semibold shadow-lg"
                      onClick={() => {
                        if (!user) {
                          setShowAuthModal(true);
                        } else {
                          navigate("/pricing");
                        }
                      }}
                    >
                      {user ? (
                        <>
                          <Crown className="h-4 w-4 mr-2" />
                          Upgrade to Premium
                        </>
                      ) : (
                        <>
                          <LogOut className="h-4 w-4 mr-2 rotate-180" />
                          Login to Unlock
                        </>
                      )}
                    </Button>
                    <AuthModal
                      isOpen={showAuthModal}
                      onClose={() => setShowAuthModal(false)}
                      title="Login to Unlock Content"
                      description="Log in to your account to view this premium chapter and continue your progress."
                    />
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={handleBackClick}
                    >
                      Explore Free Chapters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Chapter not found. Please check the chapter number and try again.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </ThemeProvider>
    );
  }

  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'objectives', title: 'Learning Objectives' },
    { id: 'content', title: 'Main Content' },
    { id: 'concepts', title: 'Key Concepts' },
    { id: 'visualizations', title: 'Interactive Demos' },
  ];

  return (
    <ThemeProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Header />

          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container mx-auto px-2 sm:px-4 py-2">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                  {/* Mobile Chapter Menu */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="shrink-0 lg:hidden">
                        <Menu className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                      <SheetHeader className="p-4 border-b text-left">
                        <SheetTitle>Chapters</SheetTitle>
                      </SheetHeader>
                      <ScrollArea className="h-[calc(100vh-65px)]">
                        <div className="p-4 space-y-1">
                          {orderedChapters.map((c) => (
                            <Button
                              key={c.id}
                              variant={c.id === chapter.id ? "secondary" : "ghost"}
                              className="w-full justify-start text-left h-auto py-2 whitespace-normal"
                              onClick={() => {
                                navigate(`/chapter/${subjectPath}/${c.classLevel}/${c.chapterNumber}`);
                              }}
                            >
                              <div className="flex flex-col items-start gap-1">
                                <span className="text-xs font-medium text-muted-foreground">Ch {c.chapterNumber}</span>
                                <span className={`text-sm ${c.id === chapter.id ? "font-bold text-primary" : ""}`}>
                                  {c.chapterTitle}
                                </span>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </ScrollArea>
                    </SheetContent>
                  </Sheet>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackClick}
                    className="shrink-0 h-8 w-8 p-0 sm:h-auto sm:w-auto sm:p-2 hidden lg:flex"
                    data-testid="button-back-to-chapters"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-xs sm:text-sm font-medium truncate max-w-[80px] sm:max-w-none ml-1 hidden lg:block">
                    {chapter.chapterTitle}
                  </span>
                  <span className="text-xs sm:text-sm font-medium truncate max-w-[120px] lg:hidden">
                    Ch {chapter.chapterNumber}
                  </span>
                </div>

                <div className="flex-1 max-w-[100px] sm:max-w-md mx-1 sm:mx-4">
                  {/* Progress and Timer components (unchanged) */}
                  <Progress value={readingProgress} className="h-1.5 sm:h-2" />
                  <p className="text-[10px] sm:text-xs text-muted-foreground text-center mt-0.5 sm:mt-1">
                    {Number.isFinite(readingProgress) ? Math.round(readingProgress) : 0}%
                  </p>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <Badge variant="outline" className="gap-0.5 sm:gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 hidden sm:flex">
                    <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    {estimatedReadTime}m
                  </Badge>
                  <Badge variant="outline" className="gap-0.5 sm:gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                    <Timer className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    {formatTime(timeSpent)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-6 max-w-7xl" ref={contentRef}>
            <div className="flex gap-8">
              {/* Desktop Sidebar */}
              <div className="hidden lg:block w-64 shrink-0 space-y-4 sticky top-24 h-[calc(100vh-8rem)]">
                <div className="flex items-center gap-2 mb-4">
                  <Button variant="outline" size="sm" onClick={handleBackClick} className="w-full justify-start">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Index
                  </Button>
                </div>
                <Card className="h-full flex flex-col overflow-hidden bg-muted/30 border-none shadow-none">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-bold uppercase text-muted-foreground tracking-wider">
                      {subject} • Class {classLevel}
                    </CardTitle>
                  </CardHeader>
                  <ScrollArea className="flex-1 px-2">
                    <div className="space-y-1 pb-4">
                      {orderedChapters.map((c) => (
                        <Button
                          key={c.id}
                          variant={c.id === chapter.id ? "secondary" : "ghost"}
                          size="sm"
                          className={`w-full justify-start text-left h-auto py-2 px-3 whitespace-normal ${c.id === chapter.id ? "bg-white dark:bg-slate-800 shadow-sm" : ""
                            }`}
                          onClick={() => {
                            if (c.id !== chapter.id) {
                              navigate(`/chapter/${subjectPath}/${c.classLevel}/${c.chapterNumber}`);
                              scrollToTop();
                            }
                          }}
                        >
                          <div className="flex gap-2.5">
                            <span className="text-xs font-semibold text-muted-foreground min-w-[20px] pt-0.5">
                              {c.chapterNumber}.
                            </span>
                            <span className={`text-sm leading-tight break-words ${c.id === chapter.id ? "font-semibold text-primary" : "text-muted-foreground"}`}>
                              {c.chapterTitle}
                            </span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <Badge className={getSubjectColor(subject || '') + " lg:hidden"}>
                      {subject} • Class {classLevel}
                    </Badge>
                    <Badge variant="outline" className="lg:hidden">
                      Chapter {chapter.chapterNumber}
                    </Badge>
                    <div className="hidden lg:block">
                      {/* Desktop chips if needed, but sidebar covers it */}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePreviousChapter}
                      disabled={!previousChapter}
                      title="Previous Chapter"
                      data-testid="button-previous-chapter"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNextChapter}
                      disabled={!nextChapter}
                      title="Next Chapter"
                      data-testid="button-next-chapter"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="mb-6 sm:mb-8">
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 font-serif"
                    data-testid="text-chapter-title"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {chapter.chapterTitle}
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {chapter.introduction}
                  </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-5 mb-4 sm:mb-6 h-10 sm:h-12">
                    <TabsTrigger
                      value="read"
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-base px-1 sm:px-3"
                      data-testid="tab-read"
                    >
                      <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="hidden xs:inline sm:inline">Read</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="keypoints"
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-base px-1 sm:px-3"
                      data-testid="tab-keypoints"
                    >
                      <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="hidden xs:inline sm:inline">Key</span>
                      <span className="hidden md:inline"> Points</span>
                      {chapterKeyConcepts.length > 0 && (
                        <Badge variant="secondary" className="ml-0.5 sm:ml-1 h-4 sm:h-5 px-1 sm:px-1.5 text-[10px] sm:text-xs">
                          {chapterKeyConcepts.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="formulas"
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-base px-1 sm:px-3"
                      data-testid="tab-formulas"
                    >
                      <FlaskConical className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="hidden xs:inline sm:inline">Formulas</span>
                      {chapterFormulas.length > 0 && (
                        <Badge variant="secondary" className="ml-0.5 sm:ml-1 h-4 sm:h-5 px-1 sm:px-1.5 text-[10px] sm:text-xs">
                          {chapterFormulas.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="resources"
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-base px-1 sm:px-3"
                      data-testid="tab-resources"
                    >
                      <List className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="hidden xs:inline sm:inline">Resources</span>
                      {mentorAssets.length > 0 && (
                        <Badge variant="secondary" className="ml-0.5 sm:ml-1 h-4 sm:h-5 px-1 sm:px-1.5 text-[10px] sm:text-xs">
                          {mentorAssets.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="practice"
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-base px-1 sm:px-3"
                      data-testid="tab-practice"
                    >
                      <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="hidden xs:inline sm:inline">Practice</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="resources" className="space-y-4 sm:space-y-6">
                    {mentorAssets.length === 0 ? (
                      <Card>
                        <CardContent className="pt-6 text-center text-muted-foreground">
                          <p>No mentor resources available for this chapter yet.</p>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mentorAssets.map((asset: any) => (
                          <Card key={asset.id} className="overflow-hidden">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <Badge variant={asset.type === 'video' ? 'default' : 'secondary'}>
                                  {asset.type === 'video' ? 'Video' : asset.type === 'pdf' ? 'PDF' : 'Note'}
                                </Badge>
                                {asset.durationSeconds && (
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {formatTime(asset.durationSeconds)}
                                  </div>
                                )}
                              </div>
                              <CardTitle className="mt-2 text-lg">{asset.title}</CardTitle>
                              <CardDescription>{asset.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center gap-3 mb-4">
                                {asset.mentorAvatar ? (
                                  <img src={asset.mentorAvatar} alt={asset.mentorName} className="h-8 w-8 rounded-full" />
                                ) : (
                                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-xs font-bold">{asset.mentorName?.charAt(0)}</span>
                                  </div>
                                )}
                                <div className="text-sm">
                                  <p className="font-medium">{asset.mentorName}</p>
                                  <p className="text-xs text-muted-foreground">Mentor</p>
                                </div>
                              </div>
                              <Button className="w-full" onClick={() => setSelectedAsset(asset)}>
                                View Resource
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="read" className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                      <div className="lg:col-span-3 space-y-6">
                        {chapter.learningObjectives && chapter.learningObjectives.length > 0 && (
                          <Card className="border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-950/20" id="objectives">
                            <CardHeader className="pb-3">
                              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                                <Lightbulb className="h-5 w-5" />
                                Did You Know? - Learning Objectives
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {chapter.learningObjectives.map((objective, idx) => (
                                  <li key={idx} className="flex items-start gap-2" style={{ fontSize: `${fontSize}px` }}>
                                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                    <span className="font-serif">{objective}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        )}

                        {chapter.prerequisites && chapter.prerequisites.length > 0 && (
                          <Card className="border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20">
                            <CardHeader className="pb-3">
                              <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                                <Star className="h-5 w-5" />
                                Remember This! - Prerequisites
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2">
                                {chapter.prerequisites.map((prereq, idx) => (
                                  <Tooltip key={idx}>
                                    <TooltipTrigger>
                                      <Badge variant="secondary" className="cursor-help font-medium">
                                        {prereq}
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>You should understand this topic before proceeding</p>
                                    </TooltipContent>
                                  </Tooltip>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        <Card id="content">
                          <CardContent className="pt-6">
                            <div
                              className="prose dark:prose-invert max-w-none prose-headings:font-serif prose-p:leading-relaxed"
                              style={{ fontSize: `${fontSize}px`, fontFamily: 'Georgia, serif', lineHeight: '1.8' }}
                            >
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {sanitizedNotes}
                              </ReactMarkdown>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-red-400 bg-red-50/50 dark:bg-red-950/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                              <AlertTriangle className="h-5 w-5" />
                              Common Mistakes to Avoid
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3" style={{ fontSize: `${fontSize - 1}px` }}>
                              <li className="flex items-start gap-2 font-serif">
                                <span className="text-red-500 font-bold">✗</span>
                                <span>Don't memorize without understanding the underlying concepts</span>
                              </li>
                              <li className="flex items-start gap-2 font-serif">
                                <span className="text-red-500 font-bold">✗</span>
                                <span>Don't skip the practice questions - they reinforce learning</span>
                              </li>
                              <li className="flex items-start gap-2 font-serif">
                                <span className="text-red-500 font-bold">✗</span>
                                <span>Don't rush through the formulas without noting the conditions</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>

                        {chapter.keyConcepts && chapter.keyConcepts.length > 0 && (
                          <Card id="concepts">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Brain className="h-5 w-5" />
                                Key Concepts
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {chapter.keyConcepts.map((concept, idx) => (
                                  <div
                                    key={idx}
                                    className="border-l-4 border-primary pl-4 py-3 bg-muted/30 rounded-r-lg"
                                  >
                                    <h4 className="font-semibold text-lg mb-2 font-serif">{concept.title}</h4>
                                    <p
                                      className="text-muted-foreground mb-3 font-serif"
                                      style={{ fontSize: `${fontSize}px` }}
                                    >
                                      {concept.description}
                                    </p>
                                    {concept.formula && (
                                      <code className="block bg-slate-100 dark:bg-slate-800 p-3 rounded text-base font-mono">
                                        {concept.formula}
                                      </code>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {chapter.phetSimulations && chapter.phetSimulations.length > 0 && (
                          <div id="visualizations">
                            <PhetSimulationViewer simulations={chapter.phetSimulations} />
                          </div>
                        )}

                        <Card id="visualizations">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Zap className="h-5 w-5" />
                              Interactive Visualizations
                              {chapter.visualizationsData && chapter.visualizationsData.length > 0 && (
                                <Badge variant="secondary" className="ml-2">
                                  {chapter.visualizationsData.length}
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription>
                              Explore these visual aids to deepen your understanding
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            {chapter.visualizationsData && chapter.visualizationsData.length > 0 ? (
                              <div className="space-y-6">
                                {chapter.visualizationsData.map((viz, idx) => (
                                  <div key={idx}>
                                    <div className="mb-3">
                                      <Badge variant="secondary" className="mb-2">
                                        {viz.type}
                                      </Badge>
                                      <h3 className="text-lg font-semibold">{viz.title}</h3>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {viz.description}
                                      </p>
                                    </div>
                                    <ViewportActivatedVisualization>
                                      <VisualizationRenderer
                                        visualizationType={viz.type}
                                        visualizationConfig={{ ...viz.config, title: viz.title, description: viz.description }}
                                        suppressTitleDescription
                                      />
                                    </ViewportActivatedVisualization>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="py-12 text-center space-y-4">
                                <Zap className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
                                <div>
                                  <h3 className="text-lg font-semibold mb-2">No Visualizations Available</h3>
                                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                                    Visualizations for this chapter are being prepared. Check back soon for interactive learning aids.
                                  </p>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>

                      <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-4">
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm flex items-center gap-2">
                                <List className="h-4 w-4" />
                                Quick Navigation
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              {sections.map((section) => (
                                <Button
                                  key={section.id}
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start text-left h-auto py-2"
                                  onClick={() => {
                                    const element = document.getElementById(section.id);
                                    if (element) {
                                      element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                  }}
                                >
                                  {section.title}
                                </Button>
                              ))}
                            </CardContent>
                          </Card>

                          {chapter.importantTopics && chapter.importantTopics.length > 0 && (
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Important Topics</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="flex flex-wrap gap-2">
                                  {chapter.importantTopics.map((topic, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {topic}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
                            <CardContent className="pt-4">
                              <Button
                                className={`w-full ${isChapterComplete ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                onClick={() => {
                                  setIsChapterComplete(!isChapterComplete);
                                  toast({
                                    title: isChapterComplete ? "Unmarked" : "Chapter Completed!",
                                    description: isChapterComplete
                                      ? "Chapter marked as incomplete"
                                      : "Great job! Keep up the learning!",
                                  });
                                }}
                                data-testid="button-mark-complete"
                              >
                                {isChapterComplete ? (
                                  <>
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Completed!
                                  </>
                                ) : (
                                  <>
                                    <Check className="h-4 w-4 mr-2" />
                                    Mark as Complete
                                  </>
                                )}
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="keypoints" className="space-y-4">
                    {keypointsLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <Skeleton key={i} className="h-32 w-full" />
                        ))}
                      </div>
                    ) : chapterKeyConcepts.length === 0 ? (
                      <Card className="py-12">
                        <CardContent className="flex flex-col items-center justify-center text-center">
                          <Zap className="h-16 w-16 text-muted-foreground mb-4" />
                          <h3 className="text-xl font-semibold mb-2">No Keypoints Available</h3>
                          <p className="text-muted-foreground max-w-md">
                            Keypoints for this chapter haven't been added yet. Check back later or explore other chapters.
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="grid gap-4">
                        {chapterKeyConcepts.map((concept: any, idx: number) => (
                          <Card
                            key={idx}
                            className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow"
                            data-testid={`keypoint-card-${idx}`}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between">
                                <CardTitle className="text-lg flex items-center gap-2">
                                  <Zap className="h-5 w-5 text-blue-500" />
                                  {concept.title}
                                </CardTitle>
                                <Badge variant="secondary" className="text-xs">
                                  Concept {idx + 1}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p
                                className="text-base leading-relaxed font-serif text-muted-foreground"
                                style={{ fontSize: `${fontSize}px` }}
                              >
                                {concept.description}
                              </p>
                              <div className="flex items-center gap-2 pt-4 mt-4 border-t">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(concept.description, idx, 'keypoint')}
                                  data-testid={`button-copy-keypoint-${idx}`}
                                >
                                  {copiedKeypointId === idx ? (
                                    <>
                                      <Check className="h-4 w-4 mr-2 text-green-500" />
                                      Copied!
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-4 w-4 mr-2" />
                                      Copy
                                    </>
                                  )}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="formulas" className="space-y-4">
                    {formulasLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <Skeleton key={i} className="h-48 w-full" />
                        ))}
                      </div>
                    ) : chapterFormulas.length === 0 ? (
                      <Card className="py-12">
                        <CardContent className="flex flex-col items-center justify-center text-center">
                          <FlaskConical className="h-16 w-16 text-muted-foreground mb-4" />
                          <h3 className="text-xl font-semibold mb-2">No Formulas Available</h3>
                          <p className="text-muted-foreground max-w-md">
                            Formulas for this chapter haven't been added yet. Check back later or explore other chapters.
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="grid gap-6">
                        {chapterFormulas.map((formula: any, idx: number) => {
                          const normalizedFormula =
                            typeof formula === "string"
                              ? {
                                name: `Formula ${idx + 1}`,
                                formula,
                                description: "",
                              }
                              : {
                                name:
                                  typeof formula?.name === "string" && formula.name.trim()
                                    ? formula.name
                                    : `Formula ${idx + 1}`,
                                formula:
                                  typeof formula?.formula === "string"
                                    ? formula.formula
                                    : "",
                                description:
                                  typeof formula?.description === "string"
                                    ? formula.description
                                    : "",
                              };

                          return (
                            <Card key={idx} className="overflow-hidden" data-testid={`formula-card-${idx}`}>
                              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 pb-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <Badge variant="secondary" className="mb-2">
                                      Formula {idx + 1}
                                    </Badge>
                                    <CardTitle className="text-xl">{normalizedFormula.name}</CardTitle>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="pt-6 space-y-5">
                                <div className="relative">
                                  <div className="bg-slate-900 dark:bg-slate-800 p-6 rounded-xl text-center">
                                    <code className="text-2xl md:text-3xl text-white font-mono tracking-wide">
                                      {normalizedFormula.formula}
                                    </code>
                                  </div>
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    className="absolute top-3 right-3"
                                    onClick={() => copyToClipboard(normalizedFormula.formula, idx, 'formula')}
                                    data-testid={`button-copy-formula-${idx}`}
                                  >
                                    {copiedFormulaId === idx ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>

                                {normalizedFormula.description && (
                                  <p className="text-muted-foreground" style={{ fontSize: `${fontSize}px` }}>
                                    {normalizedFormula.description}
                                  </p>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="practice" className="space-y-6">
                    {practiceQuestions.length > 0 && !showResults ? (
                      <div className="space-y-6">
                        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="flex items-center gap-2">
                                  <Brain className="h-5 w-5" />
                                  Quick Quiz
                                </CardTitle>
                                <CardDescription>
                                  Test your understanding with {practiceQuestions.length} questions
                                </CardDescription>
                              </div>
                              <Badge variant="secondary" className="text-lg px-4 py-2">
                                {Object.keys(selectedAnswers).length} / {practiceQuestions.length}
                              </Badge>
                            </div>
                          </CardHeader>
                        </Card>

                        {practiceQuestions.map((question, idx) => (
                          <Card key={question.id} className="overflow-hidden" data-testid={`quiz-question-${question.id}`}>
                            <CardHeader className="bg-muted/30">
                              <div className="flex items-start justify-between gap-4">
                                <CardTitle className="text-lg font-normal flex-1">
                                  <span className="font-bold mr-2">Q{idx + 1}.</span>
                                  {question.questionText}
                                </CardTitle>
                                <div className="flex gap-2 shrink-0">
                                  <Badge variant="outline">
                                    {['Easy', 'Medium', 'Hard', 'Expert'][question.difficultyLevel - 1] || 'Medium'}
                                  </Badge>
                                  {question.pyqYear && (
                                    <Badge className="bg-orange-500 text-white">
                                      PYQ {question.pyqYear}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                              <div className="grid gap-3">
                                {question.options.map((option) => (
                                  <Button
                                    key={option.id}
                                    variant={selectedAnswers[question.id] === option.id ? "default" : "outline"}
                                    className={`justify-start h-auto py-3 px-4 text-left whitespace-normal ${selectedAnswers[question.id] === option.id
                                      ? 'ring-2 ring-primary'
                                      : ''
                                      }`}
                                    onClick={() => {
                                      setSelectedAnswers(prev => ({
                                        ...prev,
                                        [question.id]: option.id
                                      }));
                                    }}
                                    data-testid={`quiz-option-${question.id}-${option.id}`}
                                  >
                                    <span className="font-bold mr-3">{option.id}.</span>
                                    {option.text}
                                  </Button>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        <div className="flex justify-center gap-4">
                          <Button
                            size="lg"
                            onClick={() => setShowResults(true)}
                            disabled={Object.keys(selectedAnswers).length < practiceQuestions.length}
                            className="px-8"
                            data-testid="button-submit-quiz"
                          >
                            <CheckCircle2 className="mr-2 h-5 w-5" />
                            Check Answers
                          </Button>
                        </div>
                      </div>
                    ) : showResults ? (
                      <div className="space-y-6">
                        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <Trophy className="h-16 w-16 mx-auto text-amber-500 mb-4" />
                              <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                              <p className="text-lg text-muted-foreground mb-4">
                                You got{' '}
                                <span className="font-bold text-green-600">
                                  {practiceQuestions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length}
                                </span>{' '}
                                out of {practiceQuestions.length} correct
                              </p>
                              <div className="flex justify-center gap-4">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedAnswers({});
                                    setShowResults(false);
                                  }}
                                  data-testid="button-retry-quiz"
                                >
                                  Try Again
                                </Button>
                                <Button
                                  onClick={() => navigate(`/practice?subject=${subject}&chapter=${chapterNumber}&classLevel=${classLevel}`)}
                                  data-testid="button-full-practice"
                                >
                                  Full Practice
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {practiceQuestions.map((question, idx) => {
                          const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
                          return (
                            <Card
                              key={question.id}
                              className={`overflow-hidden border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}
                            >
                              <CardHeader className="bg-muted/30">
                                <CardTitle className="text-lg font-normal flex items-start gap-3">
                                  {isCorrect ? (
                                    <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
                                  ) : (
                                    <AlertCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                                  )}
                                  <span>
                                    <span className="font-bold mr-2">Q{idx + 1}.</span>
                                    {question.questionText}
                                  </span>
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="pt-4 space-y-4">
                                <div className="grid gap-2">
                                  {question.options.map((option) => {
                                    const isSelected = selectedAnswers[question.id] === option.id;
                                    const isAnswer = question.correctAnswer === option.id;
                                    return (
                                      <div
                                        key={option.id}
                                        className={`p-3 rounded-lg border ${isAnswer
                                          ? 'bg-green-100 dark:bg-green-900/30 border-green-500'
                                          : isSelected
                                            ? 'bg-red-100 dark:bg-red-900/30 border-red-500'
                                            : 'bg-muted/30'
                                          }`}
                                      >
                                        <span className="font-bold mr-2">{option.id}.</span>
                                        {option.text}
                                        {isAnswer && (
                                          <Badge className="ml-2 bg-green-500">Correct</Badge>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                                {question.solutionDetail && (
                                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                                    <h4 className="font-semibold text-sm mb-2 text-blue-700 dark:text-blue-400">
                                      Explanation
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {question.solutionDetail}
                                    </p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    ) : (
                      <Card className="py-12">
                        <CardContent className="flex flex-col items-center justify-center text-center">
                          <GraduationCap className="h-20 w-20 text-primary mb-6" />
                          <h3 className="text-2xl font-bold mb-3">Ready to Practice?</h3>
                          <p className="text-muted-foreground max-w-md mb-6">
                            Test your understanding of {chapter.chapterTitle} with practice questions tailored to NEET preparation.
                          </p>
                          <Button
                            size="lg"
                            onClick={() => navigate(`/practice?subject=${subject}&chapter=${chapterNumber}&classLevel=${classLevel}`)}
                            className="px-8"
                            data-testid="button-practice-now"
                          >
                            <BookOpen className="mr-2 h-5 w-5" />
                            Start Practice Questions
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              {showFloatingToolbar && (
                <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-50">
                  <Card className="shadow-xl border-2">
                    <CardContent className="p-1.5 sm:p-2 flex items-center gap-0.5 sm:gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowToc(!showToc)}
                            data-testid="button-toggle-toc"
                          >
                            <List className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Table of Contents</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={isBookmarked ? "default" : "ghost"}
                            size="icon"
                            onClick={() => bookmarkMutation.mutate()}
                            data-testid="button-toggle-bookmark"
                          >
                            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{isBookmarked ? 'Remove Bookmark' : 'Bookmark Chapter'}</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleShare}
                            data-testid="button-share"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Share</TooltipContent>
                      </Tooltip>

                      <div className="w-px h-6 bg-border mx-1" />

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsChatbotOpen((prev) => !prev)}
                            data-testid="button-toggle-assistant"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Chapter assistant</TooltipContent>
                      </Tooltip>

                      <div className="w-px h-6 bg-border mx-1" />

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => adjustFontSize(-2)}
                            disabled={fontSize <= 14}
                            data-testid="button-font-decrease"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Decrease Font Size</TooltipContent>
                      </Tooltip>

                      <span className="text-xs font-mono w-8 text-center">{fontSize}</span>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => adjustFontSize(2)}
                            disabled={fontSize >= 24}
                            data-testid="button-font-increase"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Increase Font Size</TooltipContent>
                      </Tooltip>

                      <div className="w-px h-6 bg-border mx-1" />

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={scrollToTop}
                            data-testid="button-scroll-top"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Scroll to Top</TooltipContent>
                      </Tooltip>
                    </CardContent>
                  </Card>
                </div>
              )}

              {showToc && (
                <div className="fixed bottom-36 sm:bottom-24 right-3 sm:right-6 z-50 w-56 sm:w-64">
                  <Card className="shadow-xl">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Table of Contents</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      {sections.map((section) => (
                        <Button
                          key={section.id}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-left h-auto py-2"
                          onClick={() => {
                            const element = document.getElementById(section.id);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                            setShowToc(false);
                          }}
                        >
                          {section.title}
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </TooltipProvider>

      {/* Chapter Chatbot */}
      <ChapterChatbot
        chapterId={chapter?.id}
        chapterTitle={chapter?.chapterTitle}
        chapterSubject={chapter?.subject}
        keyConcepts={chapter?.keyConcepts || []}
        formulas={chapter?.formulas || []}
        isOpen={isChatbotOpen}
        layout="sheet"
        onToggle={() => setIsChatbotOpen((prev) => !prev)}
      />
      <Dialog open={!!selectedAsset} onOpenChange={(open) => !open && setSelectedAsset(null)}>
        <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>{selectedAsset?.title}</DialogTitle>
            <DialogDescription>
              {selectedAsset?.type === 'video' ? 'Video Player' : 'Document Viewer'} • {selectedAsset?.mentorName}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 bg-black/5 relative overflow-hidden" onContextMenu={(e) => e.preventDefault()}>
            {selectedAsset && (
              <iframe
                src={`${selectedAsset.url}${selectedAsset.type === 'pdf' ? '#toolbar=0&navpanes=0' : ''}`}
                className="w-full h-full"
                title={selectedAsset.title}
                sandbox="allow-scripts allow-same-origin allow-forms"
                loading="lazy"
              />
            )}
            {/* Transparent overlay to block direct right-clicks on iframe (partial protection) */}
            <div className="absolute inset-0 pointer-events-none" />
          </div>
        </DialogContent>
      </Dialog>
    </ThemeProvider >
  );
}
