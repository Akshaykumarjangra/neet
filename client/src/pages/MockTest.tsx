
import { Header } from "@/components/Header";
import { QuestionCard } from "@/components/QuestionCard";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect, useMemo } from "react";
import { Clock, ChevronLeft, Flag, AlertTriangle, CheckCircle2, HelpCircle, Eye, Keyboard, Save } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Question, MockTest } from "@shared/schema";
import { useLocation, useRoute } from "wouter";
import { cn } from "@/lib/utils";

export default function MockTestPage() {
  const [, setLocation] = useLocation();
  const routeMatch = useRoute<{ id: string }>("/mock-test/:id") as [boolean, { id: string } | null] | null;
  const testId = routeMatch?.[1]?.id ?? "";

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(180 * 60);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([0]));

  // Auto-save progress to localStorage
  useEffect(() => {
    if (isTestStarted && testData && Object.keys(answers).length > 0) {
      const saveData = {
        answers,
        currentQuestionIndex,
        timeRemaining,
        flaggedQuestions: Array.from(flaggedQuestions),
        visitedQuestions: Array.from(visitedQuestions),
        lastSaved: Date.now(),
      };
      localStorage.setItem(`mocktest_${testId}_progress`, JSON.stringify(saveData));
    }
  }, [answers, currentQuestionIndex, timeRemaining, flaggedQuestions, visitedQuestions, isTestStarted, testId, testData]);

  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  // Check for saved progress on mount
  useEffect(() => {
    if (testId && testData) {
      const savedProgress = localStorage.getItem(`mocktest_${testId}_progress`);
      if (savedProgress) {
        try {
          const progress = JSON.parse(savedProgress);
          // Only show resume option if saved within last 24 hours
          if (progress.lastSaved && Date.now() - progress.lastSaved < 24 * 60 * 60 * 1000) {
            setHasSavedProgress(true);
            setShowResumeDialog(true);
          }
        } catch (e) {
          console.error('Error checking saved progress:', e);
        }
      }
    }
  }, [testId, testData]);

  const handleResumeTest = () => {
    const savedProgress = localStorage.getItem(`mocktest_${testId}_progress`);
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setAnswers(progress.answers || {});
        setCurrentQuestionIndex(progress.currentQuestionIndex || 0);
        setFlaggedQuestions(new Set(progress.flaggedQuestions || []));
        setVisitedQuestions(new Set(progress.visitedQuestions || [0]));
        // Restore time remaining (approximate)
        if (progress.timeRemaining) {
          setTimeRemaining(progress.timeRemaining);
        }
        setIsTestStarted(true);
        setShowResumeDialog(false);
      } catch (e) {
        console.error('Error resuming test:', e);
      }
    }
  };

  const handleStartFresh = () => {
    localStorage.removeItem(`mocktest_${testId}_progress`);
    localStorage.removeItem(`mocktest_${testId}_answers`);
    localStorage.removeItem(`mocktest_${testId}_timeTaken`);
    setIsTestStarted(true);
    setVisitedQuestions(new Set([0]));
    setShowResumeDialog(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (!isTestStarted || isTestSubmitted) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent shortcuts when typing in inputs
      if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'n':
          e.preventDefault();
          if (currentQuestionIndex < (testData?.questions.length || 0) - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
          }
          break;
        case 'ArrowLeft':
        case 'p':
          e.preventDefault();
          if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
          }
          break;
        case 'f':
          e.preventDefault();
          handleToggleFlag();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
          e.preventDefault();
          const optionIndex = parseInt(e.key) - 1;
          const currentQuestion = testData?.questions[currentQuestionIndex];
          if (currentQuestion && currentQuestion.options[optionIndex]) {
            handleAnswerSubmit(currentQuestion.options[optionIndex].id);
          }
          break;
        case 'Escape':
          e.preventDefault();
          // Show submit confirmation dialog
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isTestStarted, isTestSubmitted, currentQuestionIndex, testData]);

  const { data: testData, isLoading, error: testError } = useQuery<{ test: MockTest; questions: Question[] }>({
    queryKey: ['/api/mock-tests', testId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/mock-tests/${testId}`, {
          credentials: 'include',
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to fetch mock test: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Ensure we have the expected format
        if (!data || !data.test) {
          throw new Error('Invalid test data received');
        }
        
        // Ensure questions array exists
        if (!Array.isArray(data.questions)) {
          console.warn('Questions array missing or invalid, using empty array');
          data.questions = [];
        }
        
        return data as { test: MockTest; questions: Question[] };
      } catch (err: any) {
        console.error('Error fetching mock test:', err);
        throw err;
      }
    },
    enabled: !!testId,
    retry: 3, // Auto-retry failed requests
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    networkMode: 'online',
  });

  // Initialize timer when test data loads
  useEffect(() => {
    if (testData?.test && !isTestStarted) {
      const durationSeconds = (testData.test.durationMinutes || 180) * 60;
      setTimeRemaining(durationSeconds);
    }
  }, [testData, isTestStarted]);

  useEffect(() => {
    if (!isTestStarted || isTestSubmitted || !testData) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestStarted, isTestSubmitted, testData]);

  useEffect(() => {
    setVisitedQuestions(prev => new Set([...prev, currentQuestionIndex]));
  }, [currentQuestionIndex]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimeLow = timeRemaining < 10 * 60;
  const isTimeCritical = timeRemaining < 5 * 60;

  const handleAnswerSubmit = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
    // Auto-advance to next question after short delay (optional UX enhancement)
    // Uncomment if desired:
    // setTimeout(() => {
    //   if (currentQuestionIndex < (testData?.questions.length || 0) - 1) {
    //     setCurrentQuestionIndex(prev => prev + 1);
    //   }
    // }, 300);
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestionIndex)) {
        newSet.delete(currentQuestionIndex);
      } else {
        newSet.add(currentQuestionIndex);
      }
      return newSet;
    });
  };

  const handleSubmitTest = () => {
    if (isTestSubmitted) return;
    
    setIsTestSubmitted(true);
    setIsTestStarted(false);
    
    const durationSeconds = testData?.test?.durationMinutes 
      ? testData.test.durationMinutes * 60
      : 180 * 60;
    const timeTaken = durationSeconds - timeRemaining;
    
    localStorage.setItem(`mocktest_${testId}_answers`, JSON.stringify(answers));
    localStorage.setItem(`mocktest_${testId}_timeTaken`, timeTaken.toString());
    
    setLocation(`/mock-test/${testId}/results`);
  };

  const getQuestionStatus = (index: number): 'answered' | 'flagged' | 'visited' | 'not-visited' => {
    if (answers[index]) return 'answered';
    if (flaggedQuestions.has(index)) return 'flagged';
    if (visitedQuestions.has(index)) return 'visited';
    return 'not-visited';
  };

  const getQuestionButtonClasses = (index: number, isCurrent: boolean): string => {
    const status = getQuestionStatus(index);
    const baseClasses = "w-9 h-9 rounded-full text-xs font-medium transition-all relative flex items-center justify-center";
    const ringClasses = isCurrent ? "ring-2 ring-offset-2 ring-primary ring-offset-background" : "";
    
    switch (status) {
      case 'answered':
        return cn(baseClasses, ringClasses, "bg-green-500 text-white hover:bg-green-600 border-green-500");
      case 'flagged':
        return cn(baseClasses, ringClasses, "bg-yellow-500 text-white hover:bg-yellow-600 border-yellow-500");
      case 'visited':
        return cn(baseClasses, ringClasses, "bg-background border-2 border-muted-foreground/50 text-foreground hover:border-primary");
      case 'not-visited':
      default:
        return cn(baseClasses, ringClasses, "bg-muted text-muted-foreground hover:bg-muted/80 border border-muted");
    }
  };

  const stats = useMemo(() => {
    if (!testData) return { answered: 0, flagged: 0, notAnswered: 0, notVisited: 0 };
    const total = testData.questions.length;
    const answered = Object.keys(answers).length;
    const flagged = flaggedQuestions.size;
    const visited = visitedQuestions.size;
    const notAnswered = visited - answered;
    const notVisited = total - visited;
    return { answered, flagged, notAnswered: Math.max(0, notAnswered), notVisited: Math.max(0, notVisited) };
  }, [testData, answers, flaggedQuestions, visitedQuestions]);

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading mock test...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (testError || !testData) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
            <h2 className="text-2xl font-bold">Failed to Load Test</h2>
            <p className="text-muted-foreground">
              {testError instanceof Error ? testError.message : 'An error occurred while loading the test.'}
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (!testData.questions || testData.questions.length === 0) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto" />
            <h2 className="text-2xl font-bold">No Questions Available</h2>
            <p className="text-muted-foreground">
              This test has no questions configured. Please contact support.
            </p>
            <Button onClick={() => setLocation('/mock-tests')}>Back to Tests</Button>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  const currentQuestion = testData.questions[currentQuestionIndex];
  const totalQuestions = testData.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header activeSubject="Mock Test" userPoints={2450} userLevel={12} studyStreak={7} />

        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setLocation('/')} data-testid="button-back">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <CardTitle data-testid="text-test-title">{testData.test.title}</CardTitle>
                    {isTestStarted ? (
                    <div 
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg transition-all",
                        isTimeCritical 
                          ? "bg-red-500/10 text-red-600 animate-pulse" 
                          : isTimeLow 
                            ? "bg-orange-500/10 text-orange-600" 
                            : "bg-muted"
                      )}
                      data-testid="timer-display"
                    >
                      {isTimeLow && <AlertTriangle className="h-5 w-5" />}
                      <Clock className="h-5 w-5" />
                      <span className="font-bold">{formatTime(timeRemaining)}</span>
                    </div>
                    ) : (
                      <Button 
                        onClick={() => {
                          if (hasSavedProgress) {
                            setShowResumeDialog(true);
                          } else {
                            setIsTestStarted(true);
                            setVisitedQuestions(new Set([0]));
                          }
                        }}
                        size="lg"
                        data-testid="button-start-test"
                      >
                        {hasSavedProgress ? "Resume Test" : "Start Test"}
                      </Button>
                    )}
                  </div>
                </CardHeader>
              </Card>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Progress</span>
                  <span className="text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <Button
                  variant={flaggedQuestions.has(currentQuestionIndex) ? "default" : "outline"}
                  size="sm"
                  onClick={handleToggleFlag}
                  className={cn(
                    "gap-2",
                    flaggedQuestions.has(currentQuestionIndex) && "bg-yellow-500 hover:bg-yellow-600 text-white"
                  )}
                  data-testid="button-flag-review"
                >
                  <Flag className="h-4 w-4" />
                  {flaggedQuestions.has(currentQuestionIndex) ? "Flagged for Review" : "Flag for Review"}
                  <span className="text-xs ml-1 opacity-70">(F)</span>
                </Button>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Save className="h-3 w-3" />
                  <span>Auto-saving...</span>
                </div>
              </div>

              {!isTestStarted ? (
                <Card>
                  <CardContent className="p-8 text-center space-y-4">
                    <h3 className="text-xl font-semibold">Ready to Start?</h3>
                    <p className="text-muted-foreground">
                      This test has {totalQuestions} questions and will take approximately {testData.test.durationMinutes || 180} minutes.
                    </p>
                    <Button 
                      onClick={() => {
                        setIsTestStarted(true);
                        setVisitedQuestions(new Set([0]));
                      }}
                      size="lg"
                    >
                      Start Test
                    </Button>
                  </CardContent>
                </Card>
              ) : currentQuestion ? (
                <QuestionCard
                  questionNumber={currentQuestionIndex + 1}
                  difficulty={currentQuestion.difficultyLevel === 1 ? "Easy" : currentQuestion.difficultyLevel === 2 ? "Medium" : "Hard"}
                  subject={currentQuestion.topicId.toString()}
                  topic="NEET PYQ"
                  question={currentQuestion.questionText}
                  options={currentQuestion.options}
                  onSubmit={handleAnswerSubmit}
                  onSkip={() => setCurrentQuestionIndex(Math.min(currentQuestionIndex + 1, totalQuestions - 1))}
                  onPrevious={() => setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0))}
                />
              ) : null}
            </div>

            {/* Resume Dialog */}
            <AlertDialog open={showResumeDialog} onOpenChange={setShowResumeDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Resume Previous Attempt?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You have a saved progress for this test. Would you like to resume from where you left off, or start fresh?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4 space-y-2">
                  <div className="text-sm text-muted-foreground">
                    <p>• Your previous answers will be restored</p>
                    <p>• Flagged questions will be preserved</p>
                    <p>• Timer will continue from saved time</p>
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={handleStartFresh}>Start Fresh</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResumeTest}>Resume Test</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Question Navigation</CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Keyboard className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Keyboard Shortcuts</DialogTitle>
                          <DialogDescription>
                            Use these shortcuts to navigate quickly during the test
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-3 py-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Next Question</span>
                            <div className="flex gap-1">
                              <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">→</kbd>
                              <span className="text-xs text-muted-foreground">or</span>
                              <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">N</kbd>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Previous Question</span>
                            <div className="flex gap-1">
                              <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">←</kbd>
                              <span className="text-xs text-muted-foreground">or</span>
                              <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">P</kbd>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Flag for Review</span>
                            <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">F</kbd>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Select Option 1-4</span>
                            <div className="flex gap-1">
                              <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">1</kbd>
                              <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">2</kbd>
                              <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">3</kbd>
                              <kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">4</kbd>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-5 gap-2" data-testid="question-navigation-grid">
                    {testData.questions.map((_, index) => (
                      <button
                        key={index}
                        className={getQuestionButtonClasses(index, currentQuestionIndex === index)}
                        onClick={() => setCurrentQuestionIndex(index)}
                        data-testid={`nav-question-${index + 1}`}
                      >
                        {flaggedQuestions.has(index) && (
                          <Flag className="h-2 w-2 absolute -top-1 -right-1 text-yellow-500 fill-yellow-500" />
                        )}
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <h4 className="text-sm font-medium">Legend</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500" />
                        <span>Answered</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-500" />
                        <span>Flagged</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/50 bg-background" />
                        <span>Visited</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-muted border border-muted" />
                        <span>Not Visited</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium">Status Summary</h4>
                      <Badge variant="outline" className="text-xs">
                        Auto-saved
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>Answered</span>
                        </div>
                        <Badge variant="secondary" data-testid="stat-answered">{stats.answered}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-yellow-500" />
                          <span>Flagged</span>
                        </div>
                        <Badge variant="secondary" data-testid="stat-flagged">{stats.flagged}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span>Visited (Unanswered)</span>
                        </div>
                        <Badge variant="secondary" data-testid="stat-visited">{stats.notAnswered}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          <span>Not Visited</span>
                        </div>
                        <Badge variant="secondary" data-testid="stat-not-visited">{stats.notVisited}</Badge>
                      </div>
                    </div>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        className="w-full mt-4" 
                        disabled={isTestSubmitted}
                        data-testid="button-submit-test"
                      >
                        Submit Test
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Submit Test?</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-3">
                          <p>Are you sure you want to submit your test? This action cannot be undone.</p>
                          <div className="bg-muted p-3 rounded-lg space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Answered:</span>
                              <span className="font-medium text-green-600">{stats.answered} questions</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Flagged for Review:</span>
                              <span className="font-medium text-yellow-600">{stats.flagged} questions</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Not Answered:</span>
                              <span className="font-medium text-red-600">{totalQuestions - stats.answered} questions</span>
                            </div>
                          </div>
                          {stats.flagged > 0 && (
                            <p className="text-yellow-600 text-sm flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4" />
                              You have {stats.flagged} flagged question(s) to review.
                            </p>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel data-testid="button-cancel-submit">Continue Test</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleSubmitTest}
                          data-testid="button-confirm-submit"
                        >
                          Submit Test
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
