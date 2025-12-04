import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  ArrowLeft,
  Clock,
  Target,
  Lightbulb,
  BookMarked,
  TrendingUp,
  AlertCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  StickyNote,
  X,
  Save,
  Copy,
  Check,
  FileText,
  FlaskConical,
  Zap,
  GraduationCap
} from "lucide-react";
import type { ChapterContent, Keypoint, Formula } from "@shared/schema";
import { VisualizationRenderer } from "@/components/visualizations/VisualizationRegistry";
import { ViewportActivatedVisualization } from "@/components/visualizations/ViewportActivatedVisualization";
import { PhetSimulationViewer } from "@/components/PhetSimulationViewer";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChapterViewer() {
  const params = useParams<{ subject: string; classLevel: string; chapterNumber: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const sessionIdRef = useRef<number | null>(null);
  const sessionStartTimeRef = useRef<number | null>(null);

  const { subject, classLevel, chapterNumber } = params;
  const [activeTab, setActiveTab] = useState("overview");
  const [newNote, setNewNote] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedFormulaId, setCopiedFormulaId] = useState<number | null>(null);

  const { data: chapter, isLoading, error } = useQuery<ChapterContent>({
    queryKey: ['chapter', subject, classLevel, chapterNumber],
    queryFn: async () => {
      const response = await fetch(
        `/api/chapters/by-chapter/${subject}/${classLevel}/${chapterNumber}`
      );
      if (!response.ok) {
        throw new Error('Chapter not found');
      }
      return response.json();
    },
    enabled: !!subject && !!classLevel && !!chapterNumber,
  });

  const { data: notes } = useQuery({
    queryKey: ['/api/lms/notes', chapter?.id],
    queryFn: async () => {
      if (!chapter?.id) return [];
      const response = await fetch(`/api/lms/notes?chapterContentId=${chapter.id}`);
      return response.json();
    },
    enabled: !!chapter?.id,
  });

  const { data: bookmarks = [] } = useQuery<any[]>({
    queryKey: ['/api/lms/bookmarks'],
    enabled: !!chapter?.id,
  });

  const { data: keypoints = [], isLoading: keypointsLoading } = useQuery<Keypoint[]>({
    queryKey: ['/api/learn/keypoints', chapter?.id],
    queryFn: async () => {
      if (!chapter?.id) return [];
      const response = await fetch(`/api/learn/keypoints?chapterId=${chapter.id}`);
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!chapter?.id,
  });

  const { data: formulas = [], isLoading: formulasLoading } = useQuery<Formula[]>({
    queryKey: ['/api/learn/formulas', chapter?.id],
    queryFn: async () => {
      if (!chapter?.id) return [];
      const response = await fetch(`/api/learn/formulas?chapterId=${chapter.id}`);
      if (!response.ok) return [];
      return response.json();
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
  });

  const { data: formulaBookmarks = [] } = useQuery<any[]>({
    queryKey: ['/api/learn/bookmarks/formulas'],
    queryFn: async () => {
      const response = await fetch('/api/learn/bookmarks/formulas');
      if (!response.ok) return [];
      return response.json();
    },
  });

  useEffect(() => {
    if (bookmarks && chapter?.id) {
      const bookmark = bookmarks.find((b: any) => b.chapterContentId === chapter.id);
      setIsBookmarked(!!bookmark);
    }
  }, [bookmarks, chapter?.id]);

  const startSessionMutation = useMutation({
    mutationFn: async () => {
      if (!chapter?.id) return;
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

  const endSessionMutation = useMutation({
    mutationFn: async () => {
      if (!sessionIdRef.current || !sessionStartTimeRef.current) return;
      const sessionId = sessionIdRef.current;
      const durationMs = Date.now() - sessionStartTimeRef.current;
      const durationMinutes = Math.floor(durationMs / 60000);

      sessionIdRef.current = null;
      sessionStartTimeRef.current = null;

      return await apiRequest('PATCH', `/api/lms/sessions/${sessionId}`, {
        endedAt: new Date().toISOString(),
        durationMinutes: Math.max(1, durationMinutes),
        sectionsViewed: ['introduction', 'notes', 'concepts'],
        interactionCount: 5,
      });
    },
    onError: () => {
      sessionIdRef.current = null;
      sessionStartTimeRef.current = null;
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      if (!chapter?.id) return;
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
  });

  const addNoteMutation = useMutation({
    mutationFn: async (noteText: string) => {
      if (!chapter?.id || !noteText.trim()) return;
      return await apiRequest('POST', '/api/lms/notes', {
        chapterContentId: chapter.id,
        noteText,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/lms/notes', chapter?.id] });
      setNewNote("");
      toast({
        title: "Note added",
        description: "Your note has been saved",
      });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (noteId: number) => {
      return await apiRequest('DELETE', `/api/lms/notes/${noteId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/lms/notes', chapter?.id] });
      toast({
        title: "Note deleted",
        description: "Your note has been removed",
      });
    },
  });

  const toggleKeypointBookmarkMutation = useMutation({
    mutationFn: async (keypointId: number) => {
      return await apiRequest('POST', `/api/learn/bookmarks/keypoints/${keypointId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/learn/bookmarks/keypoints'] });
      toast({
        title: "Keypoint bookmark updated",
        description: "Your bookmark has been updated",
      });
    },
  });

  const toggleFormulaBookmarkMutation = useMutation({
    mutationFn: async (formulaId: number) => {
      return await apiRequest('POST', `/api/learn/bookmarks/formulas/${formulaId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/learn/bookmarks/formulas'] });
      toast({
        title: "Formula bookmark updated",
        description: "Your bookmark has been updated",
      });
    },
  });

  useEffect(() => {
    if (!chapter?.id) return;

    const sessionStartTime = Date.now();
    const sessionPromise = startSessionMutation.mutateAsync().then((data: any) => {
      if (data && typeof data === 'object' && 'id' in data) {
        sessionIdRef.current = data.id as number;
        sessionStartTimeRef.current = sessionStartTime;
      }
      return data;
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
        return 'text-blue-600 dark:text-blue-400';
      case 'chemistry':
        return 'text-green-600 dark:text-green-400';
      case 'biology':
      case 'botany':
      case 'zoology':
        return 'text-purple-600 dark:text-purple-400';
      default:
        return 'text-foreground';
    }
  };

  const handleBackClick = () => {
    const subjectPath = subject?.toLowerCase();
    navigate(`/${subjectPath}`);
  };

  const handlePreviousChapter = () => {
    const currentChapter = parseInt(chapterNumber);
    if (currentChapter > 1) {
      navigate(`/chapter/${subject}/${classLevel}/${currentChapter - 1}`);
    }
  };

  const handleNextChapter = () => {
    const currentChapter = parseInt(chapterNumber);
    navigate(`/chapter/${subject}/${classLevel}/${currentChapter + 1}`);
  };

  const copyToClipboard = async (text: string, formulaId: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormulaId(formulaId);
      toast({
        title: "Copied!",
        description: "Formula copied to clipboard",
      });
      setTimeout(() => setCopiedFormulaId(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const isKeypointBookmarked = (keypointId: number) => {
    return keypointBookmarks.some((b: any) => b.keypointId === keypointId);
  };

  const isFormulaBookmarked = (formulaId: number) => {
    return formulaBookmarks.some((b: any) => b.formulaId === formulaId);
  };

  const getNeetFrequencyBadge = (frequency: string) => {
    const colors: Record<string, string> = {
      'low': 'bg-slate-500',
      'medium': 'bg-blue-500',
      'high': 'bg-orange-500',
      'very_high': 'bg-red-500',
    };
    const labels: Record<string, string> = {
      'low': 'Low Freq',
      'medium': 'Medium Freq',
      'high': 'High Yield',
      'very_high': 'Very High Yield',
    };
    return (
      <Badge className={`${colors[frequency] || 'bg-slate-500'} text-white`}>
        {labels[frequency] || frequency}
      </Badge>
    );
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      'concept': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'definition': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'law': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'principle': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'theorem': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'rule': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
      'exception': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'application': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    };
    return (
      <Badge className={colors[category] || 'bg-slate-100 text-slate-800'} variant="outline">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6 max-w-5xl">
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
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6 max-w-5xl">
            <Button
              variant="ghost"
              onClick={handleBackClick}
              className="mb-6"
              data-testid="button-back-to-chapters"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chapters
            </Button>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Chapter not found. Please check the chapter number and try again.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  const difficultyLevels = ['Beginner', 'Easy', 'Medium', 'Hard', 'Expert'];
  const difficultyColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto p-6 max-w-5xl">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <Button
              variant="ghost"
              onClick={handleBackClick}
              data-testid="button-back-to-chapters"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {subject} Chapters
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePreviousChapter}
                disabled={parseInt(chapterNumber) <= 1}
                data-testid="button-previous-chapter"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextChapter}
                data-testid="button-next-chapter"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              <Separator orientation="vertical" className="h-8" />

              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="icon"
                onClick={() => bookmarkMutation.mutate()}
                data-testid="button-toggle-bookmark"
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className={getSubjectColor(subject)}>
                {subject} - Class {classLevel}
              </Badge>
              <Badge variant="outline">
                Chapter {chapter.chapterNumber}
              </Badge>
              {chapter.status && (
                <Badge variant={chapter.status === 'published' ? 'default' : 'secondary'}>
                  {chapter.status}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-4" data-testid="text-chapter-title">
              {chapter.chapterTitle}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {chapter.introduction}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {chapter.estimatedStudyMinutes && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{Math.floor(chapter.estimatedStudyMinutes / 60)}h {chapter.estimatedStudyMinutes % 60}m</span>
                </div>
              )}
              {chapter.difficultyLevel && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <Badge className={difficultyColors[chapter.difficultyLevel - 1]}>
                    {difficultyLevels[chapter.difficultyLevel - 1] || 'Medium'}
                  </Badge>
                </div>
              )}
              {chapter.ncertChapterRef && (
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{chapter.ncertChapterRef}</span>
                </div>
              )}
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-2" data-testid="tab-overview">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="keypoints" className="flex items-center gap-2" data-testid="tab-keypoints">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">Keypoints</span>
                {keypoints.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                    {keypoints.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="formulas" className="flex items-center gap-2" data-testid="tab-formulas">
                <FlaskConical className="h-4 w-4" />
                <span className="hidden sm:inline">Formulas</span>
                {formulas.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                    {formulas.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center gap-2" data-testid="tab-practice">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Practice</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-2" data-testid="tab-notes">
                <StickyNote className="h-4 w-4" />
                <span className="hidden sm:inline">Notes</span>
                {notes && notes.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                    {notes.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {chapter.learningObjectives && chapter.learningObjectives.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Learning Objectives
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {chapter.learningObjectives.map((objective, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {chapter.prerequisites && chapter.prerequisites.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookMarked className="h-5 w-5" />
                      Prerequisites
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {chapter.prerequisites.map((prereq, idx) => (
                        <Badge key={idx} variant="secondary">
                          {prereq}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Detailed Notes</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {chapter.detailedNotes}
                  </ReactMarkdown>
                </CardContent>
              </Card>

              {chapter.keyConcepts && chapter.keyConcepts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Key Concepts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {chapter.keyConcepts.map((concept, idx) => (
                        <div key={idx} className="border-l-4 border-primary pl-4 py-2">
                          <h4 className="font-semibold mb-1">{concept.title}</h4>
                          <p className="text-muted-foreground text-sm mb-2">{concept.description}</p>
                          {concept.formula && (
                            <code className="block bg-muted p-2 rounded text-sm font-mono">
                              {concept.formula}
                            </code>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {chapter.formulas && chapter.formulas.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Important Formulas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {chapter.formulas.map((formula, idx) => (
                        <code
                          key={idx}
                          className="block bg-muted p-3 rounded text-sm font-mono"
                          data-testid={`formula-${idx}`}
                        >
                          {formula}
                        </code>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {chapter.importantTopics && chapter.importantTopics.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Important Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {chapter.importantTopics.map((topic, idx) => (
                        <Badge key={idx} variant="outline">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {chapter.phetSimulations && chapter.phetSimulations.length > 0 && (
                <PhetSimulationViewer simulations={chapter.phetSimulations} />
              )}

              {chapter.visualizationsData && chapter.visualizationsData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Visualizations</CardTitle>
                    <CardDescription>
                      Explore these visual aids to deepen your understanding
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {chapter.visualizationsData.map((viz, idx) => (
                        <div key={idx}>
                          <div className="mb-2">
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
                              visualizationConfig={viz.config}
                            />
                          </ViewportActivatedVisualization>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="keypoints" className="space-y-4">
              {keypointsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
              ) : keypoints.length === 0 ? (
                <Card className="py-12">
                  <CardContent className="flex flex-col items-center justify-center text-center">
                    <Zap className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Keypoints Available</h3>
                    <p className="text-muted-foreground max-w-md">
                      Keypoints for this chapter haven't been added yet. Check back later or explore other chapters.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {keypoints.map((keypoint) => (
                    <Card key={keypoint.id} className="relative" data-testid={`keypoint-card-${keypoint.id}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {getCategoryBadge(keypoint.category)}
                              {keypoint.neetFrequency && getNeetFrequencyBadge(keypoint.neetFrequency)}
                              {keypoint.isHighYield && (
                                <Badge className="bg-amber-500 text-white">
                                  <Zap className="h-3 w-3 mr-1" />
                                  High Yield
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-lg">{keypoint.title}</CardTitle>
                          </div>
                          <Button
                            variant={isKeypointBookmarked(keypoint.id) ? "default" : "outline"}
                            size="icon"
                            onClick={() => toggleKeypointBookmarkMutation.mutate(keypoint.id)}
                            data-testid={`button-bookmark-keypoint-${keypoint.id}`}
                          >
                            <Bookmark className={`h-4 w-4 ${isKeypointBookmarked(keypoint.id) ? 'fill-current' : ''}`} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-base leading-relaxed">{keypoint.content}</p>
                        {keypoint.tags && keypoint.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {keypoint.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
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
                    <Skeleton key={i} className="h-40 w-full" />
                  ))}
                </div>
              ) : formulas.length === 0 ? (
                <Card className="py-12">
                  <CardContent className="flex flex-col items-center justify-center text-center">
                    <FlaskConical className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Formulas Available</h3>
                    <p className="text-muted-foreground max-w-md">
                      Formulas for this chapter haven't been added yet. Check back later or explore other chapters.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {formulas.map((formula) => (
                    <Card key={formula.id} className="relative" data-testid={`formula-card-${formula.id}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {formula.neetFrequency && getNeetFrequencyBadge(formula.neetFrequency)}
                              {formula.isHighYield && (
                                <Badge className="bg-amber-500 text-white">
                                  <Zap className="h-3 w-3 mr-1" />
                                  High Yield
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-lg">{formula.name}</CardTitle>
                          </div>
                          <Button
                            variant={isFormulaBookmarked(formula.id) ? "default" : "outline"}
                            size="icon"
                            onClick={() => toggleFormulaBookmarkMutation.mutate(formula.id)}
                            data-testid={`button-bookmark-formula-${formula.id}`}
                          >
                            <Bookmark className={`h-4 w-4 ${isFormulaBookmarked(formula.id) ? 'fill-current' : ''}`} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="relative">
                          <div className="bg-muted p-4 rounded-lg font-mono text-lg flex items-center justify-between gap-4">
                            <code className="break-all">
                              {formula.plainFormula || formula.latexFormula}
                            </code>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="flex-shrink-0"
                              onClick={() => copyToClipboard(formula.plainFormula || formula.latexFormula, formula.id)}
                              data-testid={`button-copy-formula-${formula.id}`}
                            >
                              {copiedFormulaId === formula.id ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {formula.unit && (
                          <div className="text-sm">
                            <span className="font-medium">Unit:</span>{" "}
                            <span className="text-muted-foreground">{formula.unit}</span>
                          </div>
                        )}

                        {formula.variables && formula.variables.length > 0 && (
                          <div>
                            <h4 className="font-medium text-sm mb-2">Variables:</h4>
                            <div className="grid gap-2">
                              {formula.variables.map((variable, idx) => (
                                <div key={idx} className="flex items-baseline gap-2 text-sm">
                                  <code className="font-mono bg-muted px-2 py-0.5 rounded">
                                    {variable.symbol}
                                  </code>
                                  <span className="text-muted-foreground">
                                    {variable.meaning}
                                    {variable.unit && ` (${variable.unit})`}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {formula.conditions && (
                          <div>
                            <h4 className="font-medium text-sm mb-1">Conditions:</h4>
                            <p className="text-sm text-muted-foreground">{formula.conditions}</p>
                          </div>
                        )}

                        {formula.derivation && (
                          <div>
                            <h4 className="font-medium text-sm mb-1">Derivation:</h4>
                            <p className="text-sm text-muted-foreground">{formula.derivation}</p>
                          </div>
                        )}

                        {formula.tags && formula.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {formula.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="practice" className="space-y-6">
              <Card className="py-12">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <GraduationCap className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Ready to Practice?</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Test your understanding of {chapter.chapterTitle} with practice questions tailored to NEET preparation.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => navigate('/practice')}
                    data-testid="button-practice-now"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Start Practice Questions
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <StickyNote className="h-5 w-5" />
                    My Notes for {chapter.chapterTitle}
                  </CardTitle>
                  <CardDescription>
                    Add personal notes to help with your revision
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Add a new note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="min-h-24"
                      data-testid="textarea-new-note"
                    />
                    <Button
                      onClick={() => addNoteMutation.mutate(newNote)}
                      disabled={!newNote.trim() || addNoteMutation.isPending}
                      data-testid="button-save-note"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Note
                    </Button>
                  </div>

                  <Separator />

                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {notes && notes.length > 0 ? (
                        notes.map((note: any) => (
                          <Card key={note.id} className="p-3" data-testid={`note-${note.id}`}>
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm flex-1 whitespace-pre-wrap">{note.noteText}</p>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 flex-shrink-0"
                                onClick={() => deleteNoteMutation.mutate(note.id)}
                                data-testid={`button-delete-note-${note.id}`}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(note.createdAt).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </Card>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">
                            No notes yet. Add your first note above!
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ThemeProvider>
  );
}
