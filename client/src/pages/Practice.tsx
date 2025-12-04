import { Header } from "@/components/Header";
import { QuestionCard } from "@/components/QuestionCard";
import { SolutionPanel } from "@/components/SolutionPanel";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { LootCrate } from "@/components/game/LootCrate";
import { KillCamReplay } from "@/components/game/KillCamReplay";
import { ComboTracker } from "@/components/game/ComboTracker";
import { XpGainAnimation } from "@/components/game/XpGainAnimation";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { ChevronLeft, Loader2, Filter, RefreshCw, Timer, Clock, Flag, AlertTriangle, HelpCircle, BookmarkCheck, MessageSquare, Trophy, Target, Zap, TrendingUp, Star, Sparkles, PartyPopper, Calendar, X, Award, Minus, Plus, GraduationCap } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Question, ContentTopic } from "@shared/schema";
import { useLocation } from "wouter";
import { useGamification } from "@/hooks/useGamification";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

interface FlaggedQuestion {
  questionId: number;
  flagType: "review" | "error" | "difficult" | "unclear";
  note?: string;
  flaggedAt: string;
}

interface SessionStats {
  questionsAttempted: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalTimeSpent: number;
  timePerQuestion: number[];
  xpEarned: number;
  maxCombo: number;
  currentLevel: number;
  levelProgress: number;
  neetMarksGained: number;
  neetMarksLost: number;
}

const FLAGGED_QUESTIONS_KEY = "neet-flagged-questions";

function getFlaggedQuestions(): FlaggedQuestion[] {
  const stored = localStorage.getItem(FLAGGED_QUESTIONS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveFlaggedQuestions(flags: FlaggedQuestion[]) {
  localStorage.setItem(FLAGGED_QUESTIONS_KEY, JSON.stringify(flags));
}

export default function Practice() {
  const [, setLocation] = useLocation();

  const urlParams = new URLSearchParams(window.location.search);
  const topicIdFromUrl = urlParams.get('topicId');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showKillCam, setShowKillCam] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [submittedAnswer, setSubmittedAnswer] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>(topicIdFromUrl || "all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [currentCombo, setCurrentCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [showXpGain, setShowXpGain] = useState(false);
  const [xpGainAmount, setXpGainAmount] = useState(0);
  const { points, level, streak, addPoints, updateStreak } = useGamification();
  const { toast } = useToast();
  const { user } = useAuth();

  const [timedModeEnabled, setTimedModeEnabled] = useState(false);
  const [timerDuration, setTimerDuration] = useState(60);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const questionStartTimeRef = useRef<number>(Date.now());

  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    questionsAttempted: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    totalTimeSpent: 0,
    timePerQuestion: [],
    xpEarned: 0,
    maxCombo: 0,
    currentLevel: level,
    levelProgress: 0,
    neetMarksGained: 0,
    neetMarksLost: 0,
  });

  const [flaggedQuestions, setFlaggedQuestions] = useState<FlaggedQuestion[]>([]);
  const [showFlagPopover, setShowFlagPopover] = useState(false);
  const [flagNote, setFlagNote] = useState("");
  const [selectedFlagType, setSelectedFlagType] = useState<"review" | "error" | "difficult" | "unclear" | null>(null);
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);

  const [pyqOnly, setPyqOnly] = useState(false);
  const [pyqYear, setPyqYear] = useState<string>("all");
  const [neetMarkingMode, setNeetMarkingMode] = useState(false);
  const [neetScore, setNeetScore] = useState(0);

  useEffect(() => {
    setFlaggedQuestions(getFlaggedQuestions());
  }, []);

  const { data: topics } = useQuery<ContentTopic[]>({
    queryKey: ['/api/topics'],
  });

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (selectedSubject !== "all") params.append("subject", selectedSubject);
    if (selectedTopic !== "all") params.append("topicId", selectedTopic);
    if (selectedDifficulty !== "all") params.append("difficulty", selectedDifficulty);
    if (pyqOnly) params.append("pyqOnly", "true");
    if (pyqYear !== "all") params.append("pyqYear", pyqYear);
    params.append("limit", "100");
    return params.toString();
  };

  const { data: questions, isLoading, error, refetch } = useQuery<Question[]>({
    queryKey: ['/api/questions', selectedSubject, selectedTopic, selectedDifficulty, pyqOnly, pyqYear],
    queryFn: async () => {
      const queryParams = buildQueryParams();
      const url = `/api/questions${queryParams ? '?' + queryParams : ''}`;
      console.log('🔍 Fetching questions from:', url);
      const response = await fetch(url, {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error:', response.status, errorText);
        throw new Error(`Failed to fetch questions: ${response.status} ${errorText}`);
      }
      const data = await response.json();
      console.log('✅ Questions received:', data.length);
      const shuffled = [...data].sort(() => Math.random() - 0.5);
      return shuffled;
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });

  const filteredQuestions = showFlaggedOnly && questions
    ? questions.filter(q => flaggedQuestions.some(f => f.questionId === q.id))
    : questions;

  const subjects = Array.from(new Set(topics?.map(t => t.subject) || []));
  const filteredTopics = topics?.filter(t => selectedSubject === "all" || t.subject === selectedSubject) || [];

  const currentQuestion = filteredQuestions?.[currentQuestionIndex];
  const totalQuestions = filteredQuestions?.length || 0;
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  const effectiveSubject = selectedSubject === "all" ? "General" : selectedSubject;

  const currentTopicName = useMemo(() => {
    if (selectedTopic !== "all") {
      const topic = topics?.find(t => t.id.toString() === selectedTopic);
      return topic?.topicName || null;
    }
    return null;
  }, [selectedTopic, topics]);

  const neetNetScore = sessionStats.neetMarksGained - sessionStats.neetMarksLost;
  const neetPercentile = useMemo(() => {
    const maxMarks = sessionStats.questionsAttempted * 4;
    if (maxMarks === 0) return 0;
    const percentage = (neetNetScore / maxMarks) * 100;
    if (percentage >= 90) return 99;
    if (percentage >= 80) return 95;
    if (percentage >= 70) return 85;
    if (percentage >= 60) return 70;
    if (percentage >= 50) return 50;
    if (percentage >= 40) return 30;
    return 10;
  }, [neetNetScore, sessionStats.questionsAttempted]);

  const neet720Equivalent = useMemo(() => {
    if (sessionStats.questionsAttempted === 0) return 0;
    const accuracy = sessionStats.correctAnswers / sessionStats.questionsAttempted;
    return Math.round(accuracy * 720);
  }, [sessionStats.correctAnswers, sessionStats.questionsAttempted]);

  const { data: comboData } = useQuery<{ currentCombo: number; maxCombo: number }>({
    queryKey: ['/api/game/combo', user?.id, effectiveSubject],
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (comboData) {
      setCurrentCombo(comboData.currentCombo);
      setMaxCombo(comboData.maxCombo);
    }
  }, [comboData]);

  useEffect(() => {
    if (timedModeEnabled && !showSolution && currentQuestion) {
      setTimeRemaining(timerDuration);
      setIsTimerRunning(true);
      questionStartTimeRef.current = Date.now();
    }
  }, [currentQuestionIndex, timedModeEnabled, timerDuration, currentQuestion, showSolution]);

  useEffect(() => {
    if (!isTimerRunning || !timedModeEnabled || showSolution) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleTimerExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timedModeEnabled, showSolution]);

  const handleTimerExpired = useCallback(() => {
    if (!currentQuestion || showSolution) return;
    setIsTimerRunning(false);
    toast({
      title: "⏰ Time's Up!",
      description: "The answer was auto-submitted.",
      variant: "destructive",
      duration: 3000,
    });
    handleSubmit("");
  }, [currentQuestion, showSolution]);

  const updateComboMutation = useMutation({
    mutationFn: async (data: {
      isCorrect: boolean;
      previousCombo: number;
      previousMax: number;
      subject: string;
      optimisticCombo: number;
      optimisticMax: number;
    }) => {
      if (!user?.id) return null;
      return apiRequest('POST', `/api/game/combo/${user.id}/update`, {
        subject: data.subject,
        isCorrect: data.isCorrect,
      });
    },
    onSuccess: (data: any, variables) => {
      if (data) {
        if (data.currentCombo !== variables.optimisticCombo || data.maxCombo !== variables.optimisticMax) {
          setCurrentCombo(data.currentCombo);
          setMaxCombo(data.maxCombo);
        }
      } else {
        setCurrentCombo(variables.previousCombo);
        setMaxCombo(variables.previousMax);
      }
      queryClient.invalidateQueries({ queryKey: ['/api/game/combo', user?.id, variables.subject] });
    },
    onError: (error, variables) => {
      setCurrentCombo(variables.previousCombo);
      setMaxCombo(variables.previousMax);
      toast({
        title: "Connection Error",
        description: "Failed to update combo. Your progress is saved locally.",
        variant: "destructive",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/game/combo', user?.id, variables.subject] });
    },
  });

  const submitAnswerMutation = useMutation({
    mutationFn: async (data: {
      questionId: number;
      selectedAnswer: string;
      isCorrect: boolean;
      timeTaken: number;
      prevCombo: number;
      prevMax: number;
      subject: string;
      pointsEarned: number;
    }) => {
      if (!user?.id) throw new Error("User not authenticated");
      return apiRequest('POST', '/api/performance', {
        userId: user.id,
        questionId: data.questionId,
        userAnswer: data.selectedAnswer,
        isCorrect: data.isCorrect,
        timeTakenSec: data.timeTaken,
      });
    },
    onSuccess: (_, variables) => {
      setSubmittedAnswer(variables.selectedAnswer);
      setShowSolution(true);
      setIsTimerRunning(false);

      const neetMarksChange = variables.isCorrect ? 4 : (variables.selectedAnswer ? 1 : 0);
      
      setSessionStats(prev => ({
        ...prev,
        questionsAttempted: prev.questionsAttempted + 1,
        correctAnswers: variables.isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        incorrectAnswers: variables.isCorrect ? prev.incorrectAnswers : prev.incorrectAnswers + 1,
        totalTimeSpent: prev.totalTimeSpent + variables.timeTaken,
        timePerQuestion: [...prev.timePerQuestion, variables.timeTaken],
        xpEarned: prev.xpEarned + variables.pointsEarned,
        maxCombo: Math.max(prev.maxCombo, variables.isCorrect ? variables.prevCombo + 1 : 0),
        currentLevel: level,
        neetMarksGained: variables.isCorrect ? prev.neetMarksGained + 4 : prev.neetMarksGained,
        neetMarksLost: !variables.isCorrect && variables.selectedAnswer ? prev.neetMarksLost + 1 : prev.neetMarksLost,
      }));

      if (neetMarkingMode) {
        setNeetScore(prev => prev + (variables.isCorrect ? 4 : (variables.selectedAnswer ? -1 : 0)));
      }

      if (variables.isCorrect) {
        addPoints(variables.pointsEarned);
        updateStreak();
        setXpGainAmount(variables.pointsEarned);
        setShowXpGain(true);
      }

      let newCombo = variables.prevCombo;
      let newMax = variables.prevMax;
      if (variables.isCorrect) {
        newCombo = variables.prevCombo + 1;
        setCurrentCombo(newCombo);
        if (newCombo > variables.prevMax) {
          newMax = newCombo;
          setMaxCombo(newMax);
        }
      } else {
        newCombo = 0;
        setCurrentCombo(0);
      }

      updateComboMutation.mutate({
        isCorrect: variables.isCorrect,
        previousCombo: variables.prevCombo,
        previousMax: variables.prevMax,
        subject: variables.subject,
        optimisticCombo: newCombo,
        optimisticMax: newMax,
      });

      if (user?.id) {
        queryClient.invalidateQueries({ queryKey: ['/api/stats/user', user.id] });
      }
    },
    onError: (error, variables) => {
      setCurrentCombo(variables.prevCombo);
      setMaxCombo(variables.prevMax);
      toast({
        title: "Connection Error",
        description: "Failed to save your answer. Please check your connection.",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const handleSubmit = (answer: string) => {
    if (!currentQuestion) return;

    const timeTaken = timedModeEnabled
      ? Math.round((Date.now() - questionStartTimeRef.current) / 1000)
      : 60;

    const isCorrect = answer === currentQuestion.correctAnswer;
    const difficultyMultiplier = currentQuestion.difficultyLevel;
    const basePoints = 10;

    let timeBonus = 0;
    if (timedModeEnabled && isCorrect) {
      const percentTimeRemaining = timeRemaining / timerDuration;
      if (percentTimeRemaining > 0.75) timeBonus = 10;
      else if (percentTimeRemaining > 0.5) timeBonus = 5;
      else if (percentTimeRemaining > 0.25) timeBonus = 2;
    }

    const pointsEarned = isCorrect ? (basePoints * difficultyMultiplier) + timeBonus : 0;

    const prevCombo = currentCombo;
    const prevMax = maxCombo;
    const currentSubject = effectiveSubject;

    submitAnswerMutation.mutate({
      questionId: currentQuestion.id,
      selectedAnswer: answer,
      isCorrect,
      timeTaken,
      prevCombo,
      prevMax,
      subject: currentSubject,
      pointsEarned,
    });

    if (isCorrect) {
      const bonusText = timeBonus > 0 ? ` (includes +${timeBonus} time bonus!)` : "";
      toast({
        title: "🎉 Correct!",
        description: `+${pointsEarned} XP earned!${bonusText}`,
        duration: 3000,
      });
    } else {
      setShowKillCam(true);
      toast({
        title: "❌ Incorrect",
        description: "Watch the Kill-Cam replay to learn!",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setShowSolution(false);
      setSubmittedAnswer(null);
      setShowKillCam(false);
    } else {
      handleEndSession();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowSolution(false);
      setSubmittedAnswer(null);
      setShowKillCam(false);
    }
  };

  const handleEndSession = () => {
    setIsTimerRunning(false);
    const avgTime = sessionStats.timePerQuestion.length > 0
      ? sessionStats.timePerQuestion.reduce((a, b) => a + b, 0) / sessionStats.timePerQuestion.length
      : 0;

    setSessionStats(prev => ({
      ...prev,
      levelProgress: (points % 1000) / 10,
    }));

    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.6 },
      colors: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
    });

    setShowSummaryModal(true);
  };

  const handlePracticeAgain = () => {
    setShowSummaryModal(false);
    setCurrentQuestionIndex(0);
    setShowSolution(false);
    setSubmittedAnswer(null);
    setShowKillCam(false);
    setNeetScore(0);
    setSessionStats({
      questionsAttempted: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      totalTimeSpent: 0,
      timePerQuestion: [],
      xpEarned: 0,
      maxCombo: 0,
      currentLevel: level,
      levelProgress: 0,
      neetMarksGained: 0,
      neetMarksLost: 0,
    });
    refetch();
  };

  const handleClearTopicFilter = () => {
    setSelectedTopic("all");
    handleFilterChange();
  };

  const handleFilterChange = () => {
    setCurrentQuestionIndex(0);
    setShowSolution(false);
    setSubmittedAnswer(null);
  };

  const handleFlagQuestion = (flagType: "review" | "error" | "difficult" | "unclear") => {
    if (!currentQuestion) return;

    const newFlag: FlaggedQuestion = {
      questionId: currentQuestion.id,
      flagType,
      note: flagType === "error" ? flagNote : undefined,
      flaggedAt: new Date().toISOString(),
    };

    const existingFlagIndex = flaggedQuestions.findIndex(f => f.questionId === currentQuestion.id);
    let newFlags: FlaggedQuestion[];

    if (existingFlagIndex >= 0) {
      newFlags = [...flaggedQuestions];
      newFlags[existingFlagIndex] = newFlag;
    } else {
      newFlags = [...flaggedQuestions, newFlag];
    }

    setFlaggedQuestions(newFlags);
    saveFlaggedQuestions(newFlags);
    setShowFlagPopover(false);
    setFlagNote("");
    setSelectedFlagType(null);

    const flagLabels = {
      review: "Marked for Review",
      error: "Reported Error",
      difficult: "Marked as Too Difficult",
      unclear: "Marked as Unclear",
    };

    toast({
      title: "🚩 Question Flagged",
      description: flagLabels[flagType],
      duration: 3000,
    });
  };

  const removeFlagFromQuestion = () => {
    if (!currentQuestion) return;

    const newFlags = flaggedQuestions.filter(f => f.questionId !== currentQuestion.id);
    setFlaggedQuestions(newFlags);
    saveFlaggedQuestions(newFlags);

    toast({
      title: "Flag Removed",
      description: "Question unflagged successfully.",
      duration: 2000,
    });
  };

  const getCurrentQuestionFlag = () => {
    if (!currentQuestion) return null;
    return flaggedQuestions.find(f => f.questionId === currentQuestion.id);
  };

  useEffect(() => {
    const handleLevelUp = (event: CustomEvent) => {
      const { level } = event.detail;
      toast({
        title: "🎊 Level Up!",
        description: `Congratulations! You've reached Level ${level}!`,
        duration: 5000,
      });
    };

    window.addEventListener('levelUp', handleLevelUp as EventListener);
    return () => {
      window.removeEventListener('levelUp', handleLevelUp as EventListener);
    };
  }, []);

  const getDifficultyLabel = (level: number): "Easy" | "Medium" | "Hard" => {
    if (level === 1) return "Easy";
    if (level === 2) return "Medium";
    return "Hard";
  };

  const getTimerColor = () => {
    if (timeRemaining <= 10) return "text-red-500";
    if (timeRemaining <= 20) return "text-yellow-500";
    return "text-green-500";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const accuracyPercentage = sessionStats.questionsAttempted > 0
    ? Math.round((sessionStats.correctAnswers / sessionStats.questionsAttempted) * 100)
    : 0;

  const avgTimePerQuestion = sessionStats.timePerQuestion.length > 0
    ? Math.round(sessionStats.timePerQuestion.reduce((a, b) => a + b, 0) / sessionStats.timePerQuestion.length)
    : 0;

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Loading questions...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (!filteredQuestions || filteredQuestions.length === 0) {
    return (
      <ThemeProvider>
        <Header
          activeSubject={selectedSubject}
          onSubjectChange={(subject) => setSelectedSubject(subject)}
          userPoints={points}
          userLevel={level}
          studyStreak={streak}
        />
        <main className="container mx-auto px-4 py-8 max-w-5xl">
          <Card>
            <CardContent className="p-8 text-center space-y-4">
              <p className="text-lg text-muted-foreground">
                {error ? '❌ Error loading questions' : showFlaggedOnly ? 'No flagged questions found.' : 'No questions available for the selected filters.'}
              </p>
              {error && (
                <p className="text-sm text-destructive">{String(error)}</p>
              )}
              <div className="flex gap-2 justify-center flex-wrap">
                <Button onClick={() => {
                  setSelectedSubject("all");
                  setSelectedTopic("all");
                  setSelectedDifficulty("all");
                  setShowFlaggedOnly(false);
                }}>
                  Reset Filters
                </Button>
                <Button onClick={() => {
                  queryClient.clear();
                  refetch();
                }} variant="outline">
                  Force Refetch
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </ThemeProvider>
    );
  }

  const currentFlag = getCurrentQuestionFlag();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header
          activeSubject={selectedSubject}
          onSubjectChange={(subject) => setSelectedSubject(subject)}
          userPoints={points}
          userLevel={level}
          studyStreak={streak}
        />

        {currentCombo > 0 && (
          <ComboTracker
            currentCombo={currentCombo}
            maxCombo={maxCombo}
            onComboMilestone={(combo) => {
              toast({
                title: `🔥 ${combo}x COMBO!`,
                description: "You're on fire! Keep it going!",
                duration: 2000,
              });
            }}
          />
        )}

        <XpGainAnimation
          amount={xpGainAmount}
          trigger={showXpGain}
          onComplete={() => setShowXpGain(false)}
        />

        {currentQuestion && (
          <KillCamReplay
            isVisible={showKillCam}
            isCorrect={false}
            question={currentQuestion.questionText}
            userAnswer={submittedAnswer || ""}
            correctAnswer={currentQuestion.correctAnswer}
            explanation={currentQuestion.solutionDetail}
            solutionSteps={currentQuestion.solutionSteps || []}
            onClose={() => setShowKillCam(false)}
            onNextQuestion={handleNext}
          />
        )}

        <main className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
            <Button variant="ghost" onClick={() => setLocation('/')} data-testid="button-back">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>

            <div className="flex items-center gap-4 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEndSession}
                data-testid="button-end-session"
              >
                End Session
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  queryClient.invalidateQueries({ queryKey: ['/api/questions'] });
                  refetch();
                }}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Sync ({filteredQuestions?.length || 0})
              </Button>
            </div>
          </div>

          <Card className="mb-6" data-testid="card-timed-mode">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Timed Mode</CardTitle>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="timed-mode"
                      checked={timedModeEnabled}
                      onCheckedChange={(checked) => {
                        setTimedModeEnabled(checked);
                        if (checked) {
                          setTimeRemaining(timerDuration);
                          setIsTimerRunning(!showSolution);
                          questionStartTimeRef.current = Date.now();
                        } else {
                          setIsTimerRunning(false);
                        }
                      }}
                      data-testid="switch-timed-mode"
                    />
                    <Label htmlFor="timed-mode" className="text-sm font-medium">
                      {timedModeEnabled ? "Enabled" : "Disabled"}
                    </Label>
                  </div>

                  {timedModeEnabled && (
                    <Select
                      value={timerDuration.toString()}
                      onValueChange={(value) => {
                        const newDuration = parseInt(value);
                        setTimerDuration(newDuration);
                        setTimeRemaining(newDuration);
                      }}
                    >
                      <SelectTrigger className="w-[120px]" data-testid="select-timer-duration">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="60">60 seconds</SelectItem>
                        <SelectItem value="120">2 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </CardHeader>

            {timedModeEnabled && !showSolution && currentQuestion && (
              <CardContent className="pt-0">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-3"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={timeRemaining}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-center gap-2 text-4xl font-bold ${getTimerColor()}`}
                      data-testid="text-timer"
                    >
                      <Clock className={`h-8 w-8 ${timeRemaining <= 10 ? 'animate-pulse' : ''}`} />
                      {formatTime(timeRemaining)}
                    </motion.div>
                  </AnimatePresence>

                  {timeRemaining <= 10 && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Badge variant="destructive" className="animate-pulse">
                        Hurry!
                      </Badge>
                    </motion.div>
                  )}
                </motion.div>

                <Progress
                  value={(timeRemaining / timerDuration) * 100}
                  className={`h-2 mt-4 ${timeRemaining <= 10 ? '[&>div]:bg-red-500' : timeRemaining <= 20 ? '[&>div]:bg-yellow-500' : ''}`}
                />
              </CardContent>
            )}
          </Card>

          <Card className="mb-6" data-testid="card-neet-mode">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">NEET Marking Mode</CardTitle>
                  <Badge variant="secondary" className="text-xs">-1/+4</Badge>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="neet-mode"
                      checked={neetMarkingMode}
                      onCheckedChange={(checked) => {
                        setNeetMarkingMode(checked);
                        if (checked) {
                          setNeetScore(0);
                        }
                      }}
                      data-testid="switch-neet-mode"
                    />
                    <Label htmlFor="neet-mode" className="text-sm font-medium">
                      {neetMarkingMode ? "Enabled" : "Disabled"}
                    </Label>
                  </div>
                </div>
              </div>
            </CardHeader>

            {neetMarkingMode && (
              <CardContent className="pt-0">
                <div className="flex items-center justify-center gap-6 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-green-600">
                      <Plus className="h-4 w-4" />
                      <span className="text-2xl font-bold">{sessionStats.neetMarksGained}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Marks Gained</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-red-600">
                      <Minus className="h-4 w-4" />
                      <span className="text-2xl font-bold">{sessionStats.neetMarksLost}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Marks Lost</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${neetNetScore >= 0 ? 'text-primary' : 'text-red-600'}`}>
                      {neetNetScore >= 0 ? '+' : ''}{neetNetScore}
                    </div>
                    <p className="text-xs text-muted-foreground">Net Score</p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {currentTopicName && (
            <Card className="mb-6 border-primary/50 bg-primary/5" data-testid="card-topic-mode">
              <CardContent className="py-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span className="font-medium">Topic-Focused Practice:</span>
                    <Badge variant="default" className="text-sm">{currentTopicName}</Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearTopicFilter}
                    data-testid="button-clear-topic"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear Topic Filter
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <CardTitle>Filter Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select
                    value={selectedSubject}
                    onValueChange={(value) => {
                      setSelectedSubject(value);
                      setSelectedTopic("all");
                      handleFilterChange();
                    }}
                  >
                    <SelectTrigger data-testid="select-subject">
                      <SelectValue placeholder="All Subjects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Topic</label>
                  <Select
                    value={selectedTopic}
                    onValueChange={(value) => {
                      setSelectedTopic(value);
                      handleFilterChange();
                    }}
                    disabled={selectedSubject === "all"}
                  >
                    <SelectTrigger data-testid="select-topic">
                      <SelectValue placeholder="All Topics" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Topics</SelectItem>
                      {filteredTopics.map((topic) => (
                        <SelectItem key={topic.id} value={topic.id.toString()}>
                          {topic.topicName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <Select
                    value={selectedDifficulty}
                    onValueChange={(value) => {
                      setSelectedDifficulty(value);
                      handleFilterChange();
                    }}
                  >
                    <SelectTrigger data-testid="select-difficulty">
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="1">Easy</SelectItem>
                      <SelectItem value="2">Medium</SelectItem>
                      <SelectItem value="3">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">PYQ Filter</label>
                  <div className="flex items-center gap-2 h-10">
                    <Switch
                      id="pyq-only"
                      checked={pyqOnly}
                      onCheckedChange={(checked) => {
                        setPyqOnly(checked);
                        if (!checked) setPyqYear("all");
                        handleFilterChange();
                      }}
                      data-testid="switch-pyq-only"
                    />
                    <Label htmlFor="pyq-only" className="text-sm flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      PYQ Only
                    </Label>
                  </div>
                </div>

                {pyqOnly && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">PYQ Year</label>
                    <Select
                      value={pyqYear}
                      onValueChange={(value) => {
                        setPyqYear(value);
                        handleFilterChange();
                      }}
                    >
                      <SelectTrigger data-testid="select-pyq-year">
                        <SelectValue placeholder="All Years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            NEET {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Show</label>
                  <div className="flex items-center gap-2 h-10">
                    <Switch
                      id="flagged-only"
                      checked={showFlaggedOnly}
                      onCheckedChange={(checked) => {
                        setShowFlaggedOnly(checked);
                        handleFilterChange();
                      }}
                      data-testid="switch-flagged-only"
                    />
                    <Label htmlFor="flagged-only" className="text-sm">
                      Flagged Only ({flaggedQuestions.length})
                    </Label>
                  </div>
                </div>
              </div>

              {(selectedSubject !== "all" || selectedTopic !== "all" || selectedDifficulty !== "all" || showFlaggedOnly || pyqOnly) && (
                <div className="flex gap-2 mt-4 flex-wrap">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {selectedSubject !== "all" && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedSubject}
                      <button onClick={() => { setSelectedSubject("all"); handleFilterChange(); }}>×</button>
                    </Badge>
                  )}
                  {selectedTopic !== "all" && (
                    <Badge variant="secondary" className="gap-1">
                      {filteredTopics.find(t => t.id.toString() === selectedTopic)?.topicName}
                      <button onClick={() => { setSelectedTopic("all"); handleFilterChange(); }}>×</button>
                    </Badge>
                  )}
                  {selectedDifficulty !== "all" && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedDifficulty === "1" ? "Easy" : selectedDifficulty === "2" ? "Medium" : "Hard"}
                      <button onClick={() => { setSelectedDifficulty("all"); handleFilterChange(); }}>×</button>
                    </Badge>
                  )}
                  {showFlaggedOnly && (
                    <Badge variant="secondary" className="gap-1">
                      Flagged Only
                      <button onClick={() => { setShowFlaggedOnly(false); handleFilterChange(); }}>×</button>
                    </Badge>
                  )}
                  {pyqOnly && (
                    <Badge variant="secondary" className="gap-1 bg-purple-500/10 text-purple-600">
                      <Calendar className="h-3 w-3" />
                      PYQ Only {pyqYear !== "all" ? `(${pyqYear})` : ""}
                      <button onClick={() => { setPyqOnly(false); setPyqYear("all"); handleFilterChange(); }}>×</button>
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mb-8 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">
                {selectedSubject !== "all" ? `Practice Mode - ${selectedSubject}` : "Practice Mode - All Subjects"}
              </span>
              <span className="text-muted-foreground" data-testid="text-question-progress">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-6">
            {currentQuestion && (
              <>
                <div className="flex justify-between items-center mb-4">
                  {currentFlag && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Badge
                        variant={currentFlag.flagType === "error" ? "destructive" : "secondary"}
                        className="gap-1"
                        data-testid="badge-flagged"
                      >
                        <Flag className="h-3 w-3" />
                        {currentFlag.flagType === "review" && "Marked for Review"}
                        {currentFlag.flagType === "error" && "Reported Error"}
                        {currentFlag.flagType === "difficult" && "Too Difficult"}
                        {currentFlag.flagType === "unclear" && "Unclear"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeFlagFromQuestion}
                        data-testid="button-remove-flag"
                      >
                        Remove
                      </Button>
                    </motion.div>
                  )}

                  <div className="ml-auto">
                    <Popover open={showFlagPopover} onOpenChange={setShowFlagPopover}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          data-testid="button-flag-question"
                        >
                          <Flag className="h-4 w-4" />
                          Flag Question
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" align="end">
                        <div className="space-y-4">
                          <h4 className="font-medium">Flag this question</h4>
                          <div className="grid gap-2">
                            <Button
                              variant={selectedFlagType === "review" ? "default" : "outline"}
                              size="sm"
                              className="justify-start gap-2"
                              onClick={() => {
                                setSelectedFlagType("review");
                                handleFlagQuestion("review");
                              }}
                              data-testid="button-flag-review"
                            >
                              <BookmarkCheck className="h-4 w-4" />
                              Mark for Review
                            </Button>
                            <Button
                              variant={selectedFlagType === "difficult" ? "default" : "outline"}
                              size="sm"
                              className="justify-start gap-2"
                              onClick={() => {
                                setSelectedFlagType("difficult");
                                handleFlagQuestion("difficult");
                              }}
                              data-testid="button-flag-difficult"
                            >
                              <AlertTriangle className="h-4 w-4" />
                              Too Difficult
                            </Button>
                            <Button
                              variant={selectedFlagType === "unclear" ? "default" : "outline"}
                              size="sm"
                              className="justify-start gap-2"
                              onClick={() => {
                                setSelectedFlagType("unclear");
                                handleFlagQuestion("unclear");
                              }}
                              data-testid="button-flag-unclear"
                            >
                              <HelpCircle className="h-4 w-4" />
                              Unclear Question
                            </Button>

                            <div className="border-t pt-2 mt-2">
                              <p className="text-sm text-muted-foreground mb-2">Report an error (add note)</p>
                              <Textarea
                                placeholder="Describe the issue..."
                                value={flagNote}
                                onChange={(e) => setFlagNote(e.target.value)}
                                className="mb-2"
                                data-testid="textarea-flag-note"
                              />
                              <Button
                                variant="destructive"
                                size="sm"
                                className="w-full gap-2"
                                onClick={() => handleFlagQuestion("error")}
                                data-testid="button-flag-error"
                              >
                                <MessageSquare className="h-4 w-4" />
                                Report Error
                              </Button>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <QuestionCard
                  questionNumber={currentQuestionIndex + 1}
                  difficulty={getDifficultyLabel(currentQuestion.difficultyLevel)}
                  subject={currentQuestion.topicId.toString()}
                  topic={currentTopicName || "NEET Prep"}
                  question={currentQuestion.questionText}
                  options={currentQuestion.options}
                  isBookmarked={isBookmarked}
                  pyqYear={(currentQuestion as any).pyqYear}
                  onToggleBookmark={() => setIsBookmarked(!isBookmarked)}
                  onSubmit={handleSubmit}
                  onSkip={handleNext}
                  onPrevious={handlePrevious}
                />

                {showSolution && submittedAnswer !== null && (
                  <div className="space-y-4">
                    <SolutionPanel
                      isCorrect={submittedAnswer === currentQuestion.correctAnswer}
                      correctAnswer={currentQuestion.correctAnswer}
                      userAnswer={submittedAnswer}
                      explanation={currentQuestion.solutionDetail || "No detailed explanation available."}
                      steps={currentQuestion.solutionSteps || []}
                      relatedTopics={currentQuestion.relatedTopics || []}
                    />

                    <div className="flex justify-end gap-2">
                      {currentQuestionIndex >= totalQuestions - 1 ? (
                        <Button
                          onClick={handleEndSession}
                          size="lg"
                          data-testid="button-end-session-final"
                        >
                          View Summary
                        </Button>
                      ) : (
                        <Button
                          onClick={handleNext}
                          size="lg"
                          data-testid="button-next-question"
                        >
                          Next Question
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        <Dialog open={showSummaryModal} onOpenChange={setShowSummaryModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-summary">
            <DialogHeader>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="flex items-center justify-center mb-4"
              >
                <div className="relative">
                  <PartyPopper className="h-16 w-16 text-primary" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                  </motion.div>
                </div>
              </motion.div>
              <DialogTitle className="text-center text-2xl">Practice Session Complete!</DialogTitle>
              <DialogDescription className="text-center">
                Great job! Here's your performance summary.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-muted/50 rounded-lg p-4 text-center"
                >
                  <Target className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <p className="text-2xl font-bold" data-testid="stat-attempted">{sessionStats.questionsAttempted}</p>
                  <p className="text-xs text-muted-foreground">Questions Attempted</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-green-500/10 rounded-lg p-4 text-center"
                >
                  <Trophy className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <p className="text-2xl font-bold text-green-600" data-testid="stat-correct">{sessionStats.correctAnswers}</p>
                  <p className="text-xs text-muted-foreground">Correct</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-red-500/10 rounded-lg p-4 text-center"
                >
                  <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-red-500" />
                  <p className="text-2xl font-bold text-red-600" data-testid="stat-incorrect">{sessionStats.incorrectAnswers}</p>
                  <p className="text-xs text-muted-foreground">Incorrect</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-primary/10 rounded-lg p-4 text-center"
                >
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-primary" data-testid="stat-accuracy">{accuracyPercentage}%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-4"
              >
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <Zap className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
                  <p className="text-xl font-bold" data-testid="stat-xp">+{sessionStats.xpEarned}</p>
                  <p className="text-xs text-muted-foreground">XP Earned</p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <Star className="h-5 w-5 mx-auto mb-1 text-orange-500" />
                  <p className="text-xl font-bold" data-testid="stat-combo">{sessionStats.maxCombo}x</p>
                  <p className="text-xs text-muted-foreground">Best Combo</p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                  <p className="text-xl font-bold" data-testid="stat-avg-time">{avgTimePerQuestion}s</p>
                  <p className="text-xs text-muted-foreground">Avg Time/Question</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Level {level}</span>
                  <span className="text-sm text-muted-foreground">{points % 1000}/1000 XP to next level</span>
                </div>
                <Progress value={(points % 1000) / 10} className="h-3" />
              </motion.div>

              {sessionStats.questionsAttempted > 0 && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg p-4 border border-primary/20"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <span className="font-semibold">NEET Score Analysis</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="bg-white/50 dark:bg-black/20 rounded-md p-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-green-600">
                          <Plus className="h-3 w-3" />
                          <span className="font-bold">{sessionStats.neetMarksGained}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Marks Gained</p>
                      </div>
                      <div className="bg-white/50 dark:bg-black/20 rounded-md p-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-red-600">
                          <Minus className="h-3 w-3" />
                          <span className="font-bold">{sessionStats.neetMarksLost}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Negative Marks</p>
                      </div>
                      <div className="bg-white/50 dark:bg-black/20 rounded-md p-2 text-center">
                        <div className={`font-bold ${neetNetScore >= 0 ? 'text-primary' : 'text-red-600'}`}>
                          {neetNetScore >= 0 ? '+' : ''}{neetNetScore}
                        </div>
                        <p className="text-[10px] text-muted-foreground">Net Score</p>
                      </div>
                      <div className="bg-white/50 dark:bg-black/20 rounded-md p-2 text-center">
                        <div className="font-bold text-purple-600">{neet720Equivalent}/720</div>
                        <p className="text-[10px] text-muted-foreground">720 Equivalent</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Estimated Percentile</span>
                        <Badge variant="secondary" className="font-bold">
                          {neetPercentile}th Percentile
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">NEET Cutoff Comparison:</span>
                        <Badge 
                          variant={neet720Equivalent >= 650 ? "default" : "outline"} 
                          className={`text-[10px] ${neet720Equivalent >= 650 ? 'bg-green-500' : ''}`}
                        >
                          650+ {neet720Equivalent >= 650 ? '✓' : ''}
                        </Badge>
                        <Badge 
                          variant={neet720Equivalent >= 600 ? "default" : "outline"} 
                          className={`text-[10px] ${neet720Equivalent >= 600 && neet720Equivalent < 650 ? 'bg-blue-500' : neet720Equivalent >= 650 ? 'bg-green-500' : ''}`}
                        >
                          600+ {neet720Equivalent >= 600 ? '✓' : ''}
                        </Badge>
                        <Badge 
                          variant={neet720Equivalent >= 550 ? "default" : "outline"} 
                          className={`text-[10px] ${neet720Equivalent >= 550 && neet720Equivalent < 600 ? 'bg-yellow-500' : neet720Equivalent >= 600 ? 'bg-green-500' : ''}`}
                        >
                          550+ {neet720Equivalent >= 550 ? '✓' : ''}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="h-48"
                  >
                    <p className="text-sm font-medium mb-2">Performance Overview</p>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Correct', value: sessionStats.correctAnswers, color: '#22c55e' },
                            { name: 'Incorrect', value: sessionStats.incorrectAnswers, color: '#ef4444' },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="#22c55e" />
                          <Cell fill="#ef4444" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                </>
              )}
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowSummaryModal(false);
                  setLocation('/');
                }}
                className="w-full sm:w-auto"
                data-testid="button-back-dashboard"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <Button
                onClick={handlePracticeAgain}
                className="w-full sm:w-auto"
                data-testid="button-practice-again"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Practice Again
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
