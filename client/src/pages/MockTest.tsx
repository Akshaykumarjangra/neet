
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
import { useState, useEffect, useMemo } from "react";
import { Clock, ChevronLeft, Flag, AlertTriangle, CheckCircle2, HelpCircle, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Question, MockTest } from "@shared/schema";
import { useLocation, useRoute } from "wouter";
import { cn } from "@/lib/utils";

export default function MockTestPage() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/mock-test/:id");
  const testId = params?.id;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(180 * 60);
  const [isTestStarted, setIsTestStarted] = useState(true);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([0]));

  const { data: testData, isLoading } = useQuery({
    queryKey: ['/api/mock-tests', testId],
    queryFn: async () => {
      const response = await fetch(`/api/mock-tests/${testId}`);
      if (!response.ok) throw new Error('Failed to fetch mock test');
      return response.json() as Promise<{ test: MockTest; questions: Question[] }>;
    },
    enabled: !!testId,
  });

  useEffect(() => {
    if (!isTestStarted || isTestSubmitted) return;

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
  }, [isTestStarted, isTestSubmitted]);

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
    setIsTestSubmitted(true);
    
    const timeTaken = testData?.test?.durationMinutes 
      ? (testData.test.durationMinutes * 60) - timeRemaining 
      : 180 * 60 - timeRemaining;
    
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

  if (isLoading || !testData) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p>Loading mock test...</p>
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

              <div className="flex items-center justify-between">
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
                </Button>
              </div>

              {currentQuestion && (
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
              )}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Question Navigation</CardTitle>
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
                    <h4 className="text-sm font-medium mb-3">Status Summary</h4>
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
