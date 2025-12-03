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
  Save
} from "lucide-react";
import type { ChapterContent } from "@shared/schema";
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
  const [showNotes, setShowNotes] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

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
          {/* Back button and actions */}
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

              <Button
                variant={showNotes ? "default" : "outline"}
                size="icon"
                onClick={() => setShowNotes(!showNotes)}
                data-testid="button-toggle-notes"
              >
                <StickyNote className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Notes panel */}
          {showNotes && (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <StickyNote className="h-5 w-5" />
                    My Notes
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowNotes(false)}
                    data-testid="button-close-notes"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
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

                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {notes && notes.length > 0 ? (
                      notes.map((note: any) => (
                        <Card key={note.id} className="p-3" data-testid={`note-${note.id}`}>
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm flex-1">{note.noteText}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => deleteNoteMutation.mutate(note.id)}
                              data-testid={`button-delete-note-${note.id}`}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(note.createdAt).toLocaleDateString()}
                          </p>
                        </Card>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No notes yet. Add your first note above!
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          {/* Chapter header */}
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

            {/* Chapter metadata */}
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

          {/* Learning objectives */}
          {chapter.learningObjectives && chapter.learningObjectives.length > 0 && (
            <Card className="mb-6">
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

          {/* Prerequisites */}
          {chapter.prerequisites && chapter.prerequisites.length > 0 && (
            <Card className="mb-6">
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

          {/* Main content */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Detailed Notes</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {chapter.detailedNotes}
              </ReactMarkdown>
            </CardContent>
          </Card>

          {/* Key concepts */}
          {chapter.keyConcepts && chapter.keyConcepts.length > 0 && (
            <Card className="mb-6">
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

          {/* Formulas */}
          {chapter.formulas && chapter.formulas.length > 0 && (
            <Card className="mb-6">
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

          {/* Important topics */}
          {chapter.importantTopics && chapter.importantTopics.length > 0 && (
            <Card className="mb-6">
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

          {/* PHET Simulations */}
          {chapter.phetSimulations && chapter.phetSimulations.length > 0 && (
            <PhetSimulationViewer simulations={chapter.phetSimulations} />
          )}

          {/* Visualizations */}
          {chapter.visualizationsData && chapter.visualizationsData.length > 0 && (
            <Card className="mb-6">
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
                          type={viz.type}
                          config={viz.config}
                          title={viz.title}
                          description={viz.description}
                        />
                      </ViewportActivatedVisualization>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Practice button */}
          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              onClick={() => navigate('/practice')}
              data-testid="button-practice-now"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Practice Questions
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
