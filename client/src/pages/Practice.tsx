import { Header } from "@/components/Header";
import { QuestionCard } from "@/components/QuestionCard";
import { SolutionPanel } from "@/components/SolutionPanel";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LootCrate } from "@/components/game/LootCrate";
import { KillCamReplay } from "@/components/game/KillCamReplay";
import { ComboTracker } from "@/components/game/ComboTracker";
import { XpGainAnimation } from "@/components/game/XpGainAnimation";
import { useState, useEffect } from "react";
import { ChevronLeft, Loader2, Filter, RefreshCw } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Question, ContentTopic } from "@shared/schema";
import { useLocation } from "wouter";
import { useGamification } from "@/hooks/useGamification";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function Practice() {
  const [, setLocation] = useLocation();

  // Get URL parameters
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

  // Fetch all topics
  const { data: topics } = useQuery<ContentTopic[]>({
    queryKey: ['/api/topics'],
  });

  // Build query params based on filters
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (selectedSubject !== "all") params.append("subject", selectedSubject);
    if (selectedTopic !== "all") params.append("topicId", selectedTopic);
    if (selectedDifficulty !== "all") params.append("difficulty", selectedDifficulty);
    // Always add a limit to avoid fetching too many questions
    params.append("limit", "100");
    return params.toString();
  };

  // Fetch questions from API with filters
  const { data: questions, isLoading, error, refetch } = useQuery<Question[]>({
    queryKey: ['/api/questions', selectedSubject, selectedTopic, selectedDifficulty],
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
      if (data.length > 0) {
        console.log('📦 Sample question:', {
          id: data[0].id,
          text: data[0].questionText?.substring(0, 50),
          options: data[0].options
        });
      }

      // Shuffle questions for variety
      const shuffled = [...data].sort(() => Math.random() - 0.5);
      console.log('🔀 Questions shuffled');

      return shuffled;
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });

  // Debug logging
  console.log('📊 Practice Page State:', {
    questionsCount: questions?.length || 0,
    isLoading,
    error,
    selectedSubject,
    selectedTopic,
    selectedDifficulty,
    queryParams: buildQueryParams(),
    fullUrl: `/api/questions${buildQueryParams() ? '?' + buildQueryParams() : ''}`
  });

  // Get unique subjects from topics
  const subjects = Array.from(new Set(topics?.map(t => t.subject) || []));

  // Filter topics by selected subject
  const filteredTopics = topics?.filter(t => selectedSubject === "all" || t.subject === selectedSubject) || [];

  const currentQuestion = questions?.[currentQuestionIndex];
  const totalQuestions = questions?.length || 0;
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  // Get effective subject for combo tracking (use "General" for "all")
  const effectiveSubject = selectedSubject === "all" ? "General" : selectedSubject;

  // Fetch user's combo (include subject in queryKey for proper cache invalidation)
  const { data: comboData } = useQuery<{ currentCombo: number; maxCombo: number }>({
    queryKey: ['/api/game/combo', user?.id, effectiveSubject],
    enabled: !!user?.id,
  });

  // Update combo whenever it changes
  useEffect(() => {
    if (comboData) {
      setCurrentCombo(comboData.currentCombo);
      setMaxCombo(comboData.maxCombo);
    }
  }, [comboData]);

  // Update combo mutation (works for all subjects including "all")
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
        // Only reconcile if server state differs from optimistic state
        if (data.currentCombo !== variables.optimisticCombo || data.maxCombo !== variables.optimisticMax) {
          setCurrentCombo(data.currentCombo);
          setMaxCombo(data.maxCombo);
        }
        // Else: optimistic state was correct, no need to re-apply
      } else {
        // If server returns null, revert to previous values
        setCurrentCombo(variables.previousCombo);
        setMaxCombo(variables.previousMax);
      }
      // Invalidate using the subject from variables (not closure)
      queryClient.invalidateQueries({ queryKey: ['/api/game/combo', user?.id, variables.subject] });
    },
    onError: (error, variables) => {
      // Rollback to previous values on failure
      setCurrentCombo(variables.previousCombo);
      setMaxCombo(variables.previousMax);

      toast({
        title: "Connection Error",
        description: "Failed to update combo. Your progress is saved locally.",
        variant: "destructive",
        duration: 3000,
      });

      // Refetch using the subject from variables (not closure)
      queryClient.invalidateQueries({ queryKey: ['/api/game/combo', user?.id, variables.subject] });
    },
  });

  // Submit answer mutation
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

      // ONLY update gamification AFTER successful answer submission
      if (variables.isCorrect) {
        addPoints(variables.pointsEarned);
        updateStreak();

        // Show XP gain animation
        setXpGainAmount(variables.pointsEarned);
        setShowXpGain(true);
      }

      // Update combo state optimistically using pre-captured prevCombo/prevMax from variables
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

      // Persist combo to backend with exact rollback data + optimistic values for reconciliation
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
      // Rollback combo state to exact pre-submit values
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

    const isCorrect = answer === currentQuestion.correctAnswer;
    const difficultyMultiplier = currentQuestion.difficultyLevel;
    const basePoints = 10;
    const pointsEarned = isCorrect ? basePoints * difficultyMultiplier : 0;

    // Capture values in local constants BEFORE any state changes
    const prevCombo = currentCombo;
    const prevMax = maxCombo;
    const currentSubject = effectiveSubject;

    // Submit answer (gamification updates happen in onSuccess)
    submitAnswerMutation.mutate({
      questionId: currentQuestion.id,
      selectedAnswer: answer,
      isCorrect,
      timeTaken: 60, // This should ideally be dynamic
      prevCombo,
      prevMax,
      subject: currentSubject,
      pointsEarned,
    });

    // Provide immediate visual feedback (XP/streak granted in onSuccess)
    if (isCorrect) {
      toast({
        title: "🎉 Correct!",
        description: `+${pointsEarned} XP earned!`,
        duration: 3000,
      });
    } else {
      // Show Kill-Cam for incorrect answers
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
    console.log('🔄 handleNext called:', { currentQuestionIndex, totalQuestions });
    if (currentQuestionIndex < totalQuestions - 1) {
      const nextIndex = currentQuestionIndex + 1;
      console.log('➡️ Moving to question:', nextIndex);
      setCurrentQuestionIndex(nextIndex);
      setShowSolution(false);
      setSubmittedAnswer(null);
      setShowKillCam(false); // Clear kill-cam on navigation
    } else {
      console.log('🏁 End of questions, redirecting to dashboard');
      // End of questions, perhaps show a summary or redirect
      setLocation('/');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowSolution(false);
      setSubmittedAnswer(null);
      setShowKillCam(false); // Clear kill-cam on navigation
    }
  };

  const handleFilterChange = () => {
    setCurrentQuestionIndex(0);
    setShowSolution(false);
    setSubmittedAnswer(null);
  };

  // Listen for level-up events
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

  if (!questions || questions.length === 0) {
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
                {error ? '❌ Error loading questions' : 'No questions available for the selected filters.'}
              </p>
              {error && (
                <p className="text-sm text-destructive">{String(error)}</p>
              )}
              <div className="text-sm text-muted-foreground">
                <p>Current filters:</p>
                <p>Subject: {selectedSubject}</p>
                <p>Topic: {selectedTopic}</p>
                <p>Difficulty: {selectedDifficulty}</p>
                <p>Query URL: /api/questions?{buildQueryParams()}</p>
              </div>
              <div className="flex gap-2 justify-center flex-wrap">
                <Button onClick={() => {
                  setSelectedSubject("all");
                  setSelectedTopic("all");
                  setSelectedDifficulty("all");
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

        {/* Combo Tracker */}
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

        {/* XP Gain Animation */}
        <XpGainAnimation
          amount={xpGainAmount}
          trigger={showXpGain}
          onComplete={() => setShowXpGain(false)}
        />

        {/* Kill-Cam Replay */}
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
          <div className="mb-6 flex justify-between items-center">
            <Button variant="ghost" onClick={() => setLocation('/')} data-testid="button-back">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
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
              Sync Questions ({questions?.length || 0})
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <CardTitle>Filter Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
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
              </div>

              {(selectedSubject !== "all" || selectedTopic !== "all" || selectedDifficulty !== "all") && (
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
                <QuestionCard
                  questionNumber={currentQuestionIndex + 1}
                  difficulty={getDifficultyLabel(currentQuestion.difficultyLevel)}
                  subject={currentQuestion.topicId.toString()}
                  topic="NEET Prep"
                  question={currentQuestion.questionText}
                  options={currentQuestion.options}
                  isBookmarked={isBookmarked}
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

                    <div className="flex justify-end">
                      <Button
                        onClick={handleNext}
                        size="lg"
                        data-testid="button-next-question"
                        disabled={currentQuestionIndex >= totalQuestions - 1}
                      >
                        {currentQuestionIndex >= totalQuestions - 1 ? 'End of Questions' : 'Next Question'}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}