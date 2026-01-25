
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useMemo, useRef } from "react";
import { Clock, ChevronLeft, Flag, AlertTriangle, CheckCircle2, HelpCircle, Eye, Keyboard, Save, List, X, Menu, Activity } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { cn } from "@/lib/utils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Grid as FixedSizeGrid } from "react-window";
const FixedSizeGridAny = FixedSizeGrid as any;

type MockExamOption = {
  id: number;
  label: string;
  text: string;
  mediaRef?: string | null;
};

type MockExamQuestion = {
  id: number;
  sectionId: number;
  subject: string;
  topic?: string | null;
  subtopic?: string | null;
  difficulty?: string | null;
  stem: string;
  mediaRef?: string | null;
  options: MockExamOption[];
  position: number;
};

type MockExamSection = {
  id: number;
  name: string;
  marksCorrect: number;
  marksIncorrect: number;
  marksUnanswered: number;
  questionCount: number;
  durationMinutes?: number | null;
  displayOrder: number;
};

type MockExamStartPayload = {
  attemptId: number;
  attemptEndsAt?: string | null;
  paper: {
    id: number;
    title: string;
    description?: string | null;
    durationMinutes: number;
    totalMarks?: number | null;
    sections: MockExamSection[];
  };
  questions: MockExamQuestion[];
  savedResponses: Array<{
    questionId: number;
    selectedOptionId: number | null;
    flagged: boolean;
    timeSpentSeconds: number | null;
  }>;
};

export default function MockTestPage() {
  const [, setLocation] = useLocation();
  const routeMatch = useRoute<{ id: string }>("/mock-test/:id") as [boolean, { id: string } | null] | null;
  const testId = routeMatch?.[1]?.id ?? "";
  const paperId = Number(testId);
  const hasValidPaperId = Number.isInteger(paperId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeSpentByQuestion, setTimeSpentByQuestion] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(180 * 60);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set());
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [resumeDecision, setResumeDecision] = useState<"pending" | "resume" | "fresh">("pending");

  const saveTimerRef = useRef<number | null>(null);
  const pendingSaveIdsRef = useRef<Set<number>>(new Set());
  const answersRef = useRef<Record<number, number>>({});
  const flaggedRef = useRef<Set<number>>(new Set());
  const timeSpentRef = useRef<Record<number, number>>({});
  const questionStartRef = useRef<number>(Date.now());
  const currentQuestionIdRef = useRef<number | null>(null);

  // Heartbeat Effect
  useEffect(() => {
    if (!isTestStarted || isTestSubmitted || !attemptId) return;

    const heartbeatInterval = setInterval(() => {
      // Calculate time spent delta (approximate) or just send heartbeat
      // For now we assume server tracks total time via start/end, or we can send client accumulating time
      // Let's send a simple ping
      apiRequest("POST", `/api/mock-exams/attempts/${attemptId}/heartbeat`, {
        timeRemainingSeconds: timeRemaining
      }).catch(err => console.error("Heartbeat failed", err));
    }, 30000); // 30 seconds

    return () => clearInterval(heartbeatInterval);
  }, [isTestStarted, isTestSubmitted, attemptId, timeRemaining]);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    flaggedRef.current = flaggedQuestions;
  }, [flaggedQuestions]);

  useEffect(() => {
    timeSpentRef.current = timeSpentByQuestion;
  }, [timeSpentByQuestion]);

  const { data: startData, isLoading, error: testError } = useQuery<MockExamStartPayload>({
    queryKey: ["/api/mock-exams/papers", paperId, "start"],
    queryFn: async () => {
      const cached = sessionStorage.getItem(`mock_exam_start_${paperId}`);
      if (cached) {
        sessionStorage.removeItem(`mock_exam_start_${paperId}`);
        return JSON.parse(cached) as MockExamStartPayload;
      }
      return apiRequest("POST", `/api/mock-exams/papers/${paperId}/start`);
    },
    enabled: hasValidPaperId,
    retry: 2,
  });

  const questions = startData?.questions ?? [];

  useEffect(() => {
    if (!startData) return;
    setAttemptId(startData.attemptId);
    if (startData.paper?.title) {
      localStorage.setItem(
        `mock_exam_paper_${paperId}`,
        JSON.stringify({
          title: startData.paper.title,
          durationMinutes: startData.paper.durationMinutes,
          totalMarks: startData.paper.totalMarks,
        })
      );
    }
    localStorage.setItem(`mock_exam_attempt_${paperId}`, String(startData.attemptId));
  }, [startData, paperId]);

  useEffect(() => {
    if (!startData || resumeDecision !== "pending") return;
    const saved = startData.savedResponses || [];
    const hasSaved = saved.some(
      (resp) => resp.selectedOptionId != null || resp.flagged || (resp.timeSpentSeconds ?? 0) > 0
    );
    setHasSavedProgress(hasSaved);
    if (hasSaved) {
      setShowResumeDialog(true);
    } else {
      setResumeDecision("fresh");
      setIsTestStarted(true);
    }
  }, [startData, resumeDecision]);

  useEffect(() => {
    if (!startData) return;
    const endsAtValue = startData.attemptEndsAt ? new Date(startData.attemptEndsAt).getTime() : null;
    if (endsAtValue) {
      const remainingSeconds = Math.max(0, Math.floor((endsAtValue - Date.now()) / 1000));
      setTimeRemaining(remainingSeconds);
      return;
    }
    if (startData.paper?.durationMinutes) {
      setTimeRemaining(startData.paper.durationMinutes * 60);
    }
  }, [startData]);

  const applySavedResponses = (responses: MockExamStartPayload["savedResponses"]) => {
    const nextAnswers: Record<number, number> = {};
    const nextFlags = new Set<number>();
    const nextTime: Record<number, number> = {};
    const nextVisited = new Set<number>();

    responses.forEach((resp) => {
      if (resp.selectedOptionId != null) {
        nextAnswers[resp.questionId] = resp.selectedOptionId;
      }
      if (resp.flagged) {
        nextFlags.add(resp.questionId);
      }
      if (resp.timeSpentSeconds != null) {
        nextTime[resp.questionId] = resp.timeSpentSeconds;
      }
      nextVisited.add(resp.questionId);
    });

    const firstQuestionId = questions[0]?.id;
    if (firstQuestionId) {
      nextVisited.add(firstQuestionId);
    }

    setAnswers(nextAnswers);
    setFlaggedQuestions(nextFlags);
    setTimeSpentByQuestion(nextTime);
    setVisitedQuestions(nextVisited);

    const firstUnansweredIndex = questions.findIndex((q) => !nextAnswers[q.id]);
    setCurrentQuestionIndex(firstUnansweredIndex >= 0 ? firstUnansweredIndex : 0);
  };

  const saveResponses = async (questionIds: number[]) => {
    if (!attemptId || !questionIds.length || isTestSubmitted) return;
    const responses = questionIds.map((questionId) => ({
      questionId,
      selectedOptionId: answersRef.current[questionId] ?? null,
      timeSpentSeconds: timeSpentRef.current[questionId] ?? 0,
      flagged: flaggedRef.current.has(questionId),
    }));

    try {
      await apiRequest("POST", `/api/mock-exams/attempts/${attemptId}/save`, { responses });
    } catch (error) {
      console.error("Failed to save mock exam responses:", error);
    }
  };

  const queueSave = (questionId: number) => {
    if (!attemptId || isTestSubmitted) return;
    pendingSaveIdsRef.current.add(questionId);
    if (saveTimerRef.current) return;
    saveTimerRef.current = window.setTimeout(() => {
      const ids = Array.from(pendingSaveIdsRef.current);
      pendingSaveIdsRef.current.clear();
      saveTimerRef.current = null;
      void saveResponses(ids);
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  const handleResumeTest = () => {
    if (!startData) return;
    applySavedResponses(startData.savedResponses || []);
    setResumeDecision("resume");
    setIsTestStarted(true);
    setShowResumeDialog(false);
  };

  const handleStartFresh = async () => {
    setAnswers({});
    setFlaggedQuestions(new Set());
    setTimeSpentByQuestion({});
    const firstQuestionId = questions[0]?.id;
    setVisitedQuestions(firstQuestionId ? new Set([firstQuestionId]) : new Set());
    setCurrentQuestionIndex(0);
    setHasSavedProgress(false);
    setResumeDecision("fresh");
    setIsTestStarted(true);
    setShowResumeDialog(false);

    if (attemptId && questions.length) {
      const responses = questions.map((question) => ({
        questionId: question.id,
        selectedOptionId: null,
        timeSpentSeconds: 0,
        flagged: false,
      }));
      try {
        await apiRequest("POST", `/api/mock-exams/attempts/${attemptId}/save`, { responses });
      } catch (error) {
        console.error("Failed to clear mock exam responses:", error);
      }
    }
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
          if (currentQuestionIndex < questions.length - 1) {
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
        case '4': {
          e.preventDefault();
          const optionIndex = parseInt(e.key) - 1;
          const currentQuestion = questions[currentQuestionIndex];
          if (currentQuestion && currentQuestion.options[optionIndex]) {
            handleAnswerSubmit(currentQuestion.options[optionIndex].id);
          }
          break;
        }
        case 'Escape':
          e.preventDefault();
          // Show submit confirmation dialog
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isTestStarted, isTestSubmitted, currentQuestionIndex, questions]);

  useEffect(() => {
    if (!isTestStarted || isTestSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          void handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestStarted, isTestSubmitted]);

  useEffect(() => {
    if (!isTestStarted || !questions.length) return;
    const currentQuestionId = questions[currentQuestionIndex]?.id;
    if (!currentQuestionId) return;

    const now = Date.now();
    if (currentQuestionIdRef.current && currentQuestionIdRef.current !== currentQuestionId) {
      const elapsedSeconds = Math.max(0, Math.round((now - questionStartRef.current) / 1000));
      if (elapsedSeconds > 0) {
        setTimeSpentByQuestion((prev) => ({
          ...prev,
          [currentQuestionIdRef.current as number]:
            (prev[currentQuestionIdRef.current as number] || 0) + elapsedSeconds,
        }));
        queueSave(currentQuestionIdRef.current);
      }
    }

    currentQuestionIdRef.current = currentQuestionId;
    questionStartRef.current = now;

    setVisitedQuestions((prev) => {
      const next = new Set(prev);
      next.add(currentQuestionId);
      return next;
    });
  }, [currentQuestionIndex, isTestStarted, questions]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyLabel = (value?: string | null) => {
    if (!value) return "Medium";
    const normalized = String(value).toLowerCase();
    if (["easy", "1", "beginner"].includes(normalized)) return "Easy";
    if (["hard", "3", "difficult", "advanced", "expert"].includes(normalized)) return "Hard";
    return "Medium";
  };

  const isTimeLow = timeRemaining < 10 * 60;
  const isTimeCritical = timeRemaining < 5 * 60;

  const handleAnswerSubmit = (answer: string | number) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;
    const selectedOptionId = typeof answer === "number" ? answer : Number(answer);
    if (!Number.isFinite(selectedOptionId)) return;
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedOptionId,
    }));
    queueSave(currentQuestion.id);
    // Auto-advance to next question after short delay (optional UX enhancement)
    // Uncomment if desired:
    // setTimeout(() => {
    //   if (currentQuestionIndex < (questions.length || 0) - 1) {
    //     setCurrentQuestionIndex(prev => prev + 1);
    //   }
    // }, 300);
  };

  const handleToggleFlag = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
    queueSave(currentQuestion.id);
  };

  const handleSubmitTest = async () => {
    if (!attemptId || isTestSubmitted || isSubmitting) return;
    if (!questions.length) return;

    const currentQuestionId = questions[currentQuestionIndex]?.id;
    if (isTestStarted && currentQuestionId) {
      const elapsedSeconds = Math.max(0, Math.round((Date.now() - questionStartRef.current) / 1000));
      if (elapsedSeconds > 0) {
        setTimeSpentByQuestion((prev) => ({
          ...prev,
          [currentQuestionId]: (prev[currentQuestionId] || 0) + elapsedSeconds,
        }));
        timeSpentRef.current = {
          ...timeSpentRef.current,
          [currentQuestionId]: (timeSpentRef.current[currentQuestionId] || 0) + elapsedSeconds,
        };
      }
    }

    setIsSubmitting(true);
    try {
      const responses = questions.map((question) => ({
        questionId: question.id,
        selectedOptionId: answersRef.current[question.id] ?? null,
        timeSpentSeconds: timeSpentRef.current[question.id] ?? 0,
        flagged: flaggedRef.current.has(question.id),
      }));

      await apiRequest("POST", `/api/mock-exams/attempts/${attemptId}/submit`, { responses });
      setIsTestSubmitted(true);
      setIsTestStarted(false);
      setLocation(`/mock-test/${paperId}/results?attemptId=${attemptId}`);
    } catch (error) {
      console.error("Failed to submit mock exam:", error);
      setIsSubmitting(false);
    }
  };

  const getQuestionStatus = (questionId: number): 'answered' | 'flagged' | 'visited' | 'not-visited' => {
    if (answers[questionId] != null) return 'answered';
    if (flaggedQuestions.has(questionId)) return 'flagged';
    if (visitedQuestions.has(questionId)) return 'visited';
    return 'not-visited';
  };

  const getQuestionButtonClasses = (questionId: number, isCurrent: boolean): string => {
    const status = getQuestionStatus(questionId);
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
    const total = questions.length;
    const answered = Object.keys(answers).length;
    const flagged = flaggedQuestions.size;
    const visited = visitedQuestions.size;
    const notAnswered = visited - answered;
    const notVisited = total - visited;
    return { answered, flagged, notAnswered: Math.max(0, notAnswered), notVisited: Math.max(0, notVisited) };
  }, [questions, answers, flaggedQuestions, visitedQuestions]);

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

  if (testError || !startData) {
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

  if (!questions.length) {
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

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
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

          <div className="grid gap-6 lg:grid-cols-4 relative">
            {/* Mobile Sticky Header for Test */}
            <div className="lg:hidden sticky top-14 z-30 -mx-4 px-4 bg-background/95 backdrop-blur border-b py-2 mb-4 flex items-center justify-between shadow-sm">
              <div className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm transition-all border",
                isTimeCritical
                  ? "bg-red-500/10 text-red-600 border-red-200 animate-pulse"
                  : isTimeLow
                    ? "bg-orange-500/10 text-orange-600 border-orange-200"
                    : "bg-muted border-transparent"
              )}>
                <Clock className="h-4 w-4" />
                <span className="font-bold">{formatTime(timeRemaining)}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile Progress Indicator */}
                <span className="text-xs text-muted-foreground mr-2">
                  {currentQuestionIndex + 1}/{totalQuestions}
                </span>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <List className="h-4 w-4" />
                      Questions
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <SheetHeader className="mb-4">
                      <SheetTitle>Question Palette</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-100px)] pr-4">
                      <div className="grid grid-cols-5 gap-2">
                        {questions.map((question, index) => (
                          <button
                            key={question.id}
                            className={getQuestionButtonClasses(question.id, currentQuestionIndex === index)}
                            onClick={() => {
                              setCurrentQuestionIndex(index);
                              // Close sheet via a localized workaround or standard Radix usage if we controlled state, but standard Sheet dismisses on click outside/escape. 
                              // For explicit close we'd need controlled state, but let's rely on user tapping out or adding a close button behavior if critical.
                              // actually, radix sheet doesn't auto-close on inner click unless we control it.
                              // Let's assume user wants to jump around.
                            }}
                          >
                            {flaggedQuestions.has(question.id) && (
                              <Flag className="h-2 w-2 absolute -top-1 -right-1 text-yellow-500 fill-yellow-500" />
                            )}
                            {index + 1}
                          </button>
                        ))}
                      </div>

                      <div className="border-t pt-4 space-y-3 mt-6">
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

                      <Button
                        className="w-full mt-6"
                        variant="default"
                        onClick={() => {
                          // Start Submit Flow
                          handleSubmitTest();
                        }}
                      >
                        Submit Test
                      </Button>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <CardTitle data-testid="text-test-title">{startData.paper.title}</CardTitle>
                    {isTestStarted ? (
                      <div
                        className={cn(
                          "hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg transition-all",
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
                            const firstQuestionId = questions[0]?.id;
                            setVisitedQuestions(firstQuestionId ? new Set([firstQuestionId]) : new Set());
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
                  variant={currentQuestion && flaggedQuestions.has(currentQuestion.id) ? "default" : "outline"}
                  size="sm"
                  onClick={handleToggleFlag}
                  className={cn(
                    "gap-2",
                    currentQuestion && flaggedQuestions.has(currentQuestion.id) && "bg-yellow-500 hover:bg-yellow-600 text-white"
                  )}
                  data-testid="button-flag-review"
                >
                  <Flag className="h-4 w-4" />
                  {currentQuestion && flaggedQuestions.has(currentQuestion.id) ? "Flagged for Review" : "Flag for Review"}
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
                      This test has {totalQuestions} questions and will take approximately {startData.paper.durationMinutes || 180} minutes.
                    </p>
                    <Button
                      onClick={() => {
                        setIsTestStarted(true);
                        const firstQuestionId = questions[0]?.id;
                        setVisitedQuestions(firstQuestionId ? new Set([firstQuestionId]) : new Set());
                      }}
                      size="lg"
                    >
                      Start Test
                    </Button>
                  </CardContent>
                </Card>
              ) : currentQuestion ? (
                <QuestionCard
                  key={currentQuestion.id}
                  questionNumber={currentQuestionIndex + 1}
                  difficulty={getDifficultyLabel(currentQuestion.difficulty)}
                  subject={currentQuestion.subject || "Mock Exam"}
                  topic={currentQuestion.topic || "Mock Exam"}
                  question={currentQuestion.stem}
                  options={currentQuestion.options.map((option) => ({
                    id: option.id,
                    label: option.label,
                    text: option.text,
                  }))}
                  selectedAnswer={answers[currentQuestion.id] ?? null}
                  lockOnSubmit={false}
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

            <div className="hidden lg:block lg:col-span-1">
              <Card className="sticky top-24">
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
                  <div className="h-[300px] w-full" data-testid="question-navigation-grid">
                    {questions.length > 0 && FixedSizeGridAny && (
                      <FixedSizeGridAny
                        columnCount={5}
                        columnWidth={55}
                        height={300}
                        rowCount={Math.ceil(questions.length / 5)}
                        rowHeight={50}
                        width={280}
                        itemData={{
                          questions,
                          currentQuestionIndex,
                          flaggedQuestions,
                          setCurrentQuestionIndex,
                          getQuestionButtonClasses
                        }}
                      >
                        {(({ columnIndex, rowIndex, style, data }: any) => {
                          const index = rowIndex * 5 + columnIndex;
                          if (index >= data.questions.length) return null;
                          const question = data.questions[index];

                          return (
                            <div style={style} className="flex items-center justify-center">
                              <button
                                key={question.id}
                                className={data.getQuestionButtonClasses(question.id, data.currentQuestionIndex === index)}
                                onClick={() => data.setCurrentQuestionIndex(index)}
                                data-testid={`nav-question-${index + 1}`}
                              >
                                {data.flaggedQuestions.has(question.id) && (
                                  <Flag className="h-2 w-2 absolute -top-1 -right-1 text-yellow-500 fill-yellow-500" />
                                )}
                                {index + 1}
                              </button>
                            </div>
                          );
                        }) as any}
                      </FixedSizeGridAny>
                    )}
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
                        disabled={isTestSubmitted || isSubmitting}
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
                          disabled={isSubmitting}
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
