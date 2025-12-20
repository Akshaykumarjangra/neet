import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useMemo } from "react";
import {
  ChevronLeft,
  Trophy,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  MinusCircle,
  BarChart3,
  RefreshCw,
  Home,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Question, MockTest } from "@shared/schema";
import { useLocation, useRoute } from "wouter";
import { cn } from "@/lib/utils";

interface SubjectStats {
  name: string;
  correct: number;
  incorrect: number;
  unanswered: number;
  total: number;
  score: number;
  maxScore: number;
  color: string;
}

interface TestResultData {
  test: MockTest;
  questions: Question[];
  answers: Record<number, string>;
  timeTaken: number;
  totalTime: number;
}

function getSubjectFromTopicId(topicId: number): string {
  if (topicId >= 1 && topicId <= 100) return "Physics";
  if (topicId >= 101 && topicId <= 200) return "Chemistry";
  return "Biology";
}

export default function MockTestResults() {
  const [, setLocation] = useLocation();
  const routeMatch = useRoute<{ id: string }>("/mock-test/:id/results") as
    | [boolean, { id: string } | null]
    | null;
  const testId = routeMatch?.[1]?.id ?? "";

  const { data: testData, isLoading, error: testError } = useQuery<TestResultData>({
    queryKey: ['/api/mock-tests', testId, 'results'],
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
      
      const storedAnswers = localStorage.getItem(`mocktest_${testId}_answers`);
      const storedTimeTaken = localStorage.getItem(`mocktest_${testId}_timeTaken`);
      
      return {
          test: data.test,
          questions: data.questions || [],
        answers: storedAnswers ? JSON.parse(storedAnswers) : {},
          timeTaken: storedTimeTaken ? parseInt(storedTimeTaken) : (data.test.durationMinutes || 180) * 60,
          totalTime: (data.test.durationMinutes || 180) * 60,
      } as TestResultData;
      } catch (err: any) {
        console.error('Error fetching mock test results:', err);
        throw err;
      }
    },
    enabled: !!testId,
  });

  const results = useMemo(() => {
    if (!testData) return null;

    const { questions, answers } = testData;
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalUnanswered = 0;

    const subjectMap: Record<string, SubjectStats> = {
      Physics: { name: "Physics", correct: 0, incorrect: 0, unanswered: 0, total: 0, score: 0, maxScore: 0, color: "blue" },
      Chemistry: { name: "Chemistry", correct: 0, incorrect: 0, unanswered: 0, total: 0, score: 0, maxScore: 0, color: "green" },
      Biology: { name: "Biology", correct: 0, incorrect: 0, unanswered: 0, total: 0, score: 0, maxScore: 0, color: "purple" },
    };

    const questionResults = questions.map((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      const isAttempted = !!userAnswer;
      const subject = getSubjectFromTopicId(question.topicId);

      subjectMap[subject].total++;
      subjectMap[subject].maxScore += 4;

      if (isAttempted) {
        if (isCorrect) {
          totalCorrect++;
          subjectMap[subject].correct++;
          subjectMap[subject].score += 4;
        } else {
          totalIncorrect++;
          subjectMap[subject].incorrect++;
          subjectMap[subject].score -= 1;
        }
      } else {
        totalUnanswered++;
        subjectMap[subject].unanswered++;
      }

      return {
        question,
        index,
        userAnswer,
        isCorrect,
        isAttempted,
        subject,
      };
    });

    const totalScore = totalCorrect * 4 - totalIncorrect * 1;
    const maxScore = 720;
    const percentage = Math.round((totalScore / maxScore) * 100);
    const accuracy = totalCorrect + totalIncorrect > 0
      ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100)
      : 0;
    const questionsAttempted = totalCorrect + totalIncorrect;

    return {
      totalCorrect,
      totalIncorrect,
      totalUnanswered,
      totalScore: Math.max(0, totalScore),
      maxScore,
      percentage: Math.max(0, percentage),
      accuracy,
      questionsAttempted,
      totalQuestions: questions.length,
      subjects: Object.values(subjectMap),
      questionResults,
      timeTaken: testData.timeTaken,
      totalTime: testData.totalTime,
      averageTimePerQuestion: Math.round(testData.timeTaken / (questionsAttempted || 1)),
    };
  }, [testData]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-yellow-500";
    if (percentage >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500/10 border-green-500/20";
    if (percentage >= 60) return "bg-yellow-500/10 border-yellow-500/20";
    if (percentage >= 40) return "bg-orange-500/10 border-orange-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  const handleRetakeTest = () => {
    localStorage.removeItem(`mocktest_${testId}_answers`);
    localStorage.removeItem(`mocktest_${testId}_timeTaken`);
    setLocation(`/mock-test/${testId}`);
  };

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Loading test results...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (testError || !testData) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="p-4 rounded-full bg-destructive/10 w-fit mx-auto">
                <XCircle className="h-12 w-12 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold">Unable to Load Results</h3>
              <p className="text-muted-foreground">
                {testError instanceof Error ? testError.message : 'Failed to load test results. Please try again.'}
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => setLocation('/mock-tests')} variant="outline">
                  Back to Tests
                </Button>
                <Button onClick={() => window.location.reload()}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    );
  }

  if (!results) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="p-4 rounded-full bg-yellow-500/10 w-fit mx-auto">
                <MinusCircle className="h-12 w-12 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold">No Results Available</h3>
              <p className="text-muted-foreground">
                Unable to calculate results. Please try taking the test again.
              </p>
              <Button onClick={handleRetakeTest}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retake Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header activeSubject="Mock Test Results" userPoints={2450} userLevel={12} studyStreak={7} />

        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setLocation('/dashboard')} data-testid="button-back-dashboard">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" data-testid="text-results-title">Test Results</h1>
            <p className="text-muted-foreground" data-testid="text-test-name">{testData.test.title}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 mb-8">
            <Card className={cn("lg:col-span-1 border-2", getScoreBgColor(results.percentage))}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5" />
                  Overall Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={cn("text-5xl font-bold mb-2", getScoreColor(results.percentage))} data-testid="text-total-score">
                    {results.totalScore}
                  </div>
                  <div className="text-lg text-muted-foreground mb-4" data-testid="text-max-score">
                    out of {results.maxScore}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Badge 
                      variant={results.percentage >= 60 ? "default" : "secondary"}
                      className="text-lg px-4 py-1"
                      data-testid="badge-percentage"
                    >
                      {results.percentage}%
                    </Badge>
                  </div>
                  <Progress value={results.percentage} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5" />
                  Quick Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600" data-testid="text-correct-count">
                      {results.totalCorrect}
                    </div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                    <div className="text-xs text-green-600 mt-1">+{results.totalCorrect * 4} marks</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-600" data-testid="text-incorrect-count">
                      {results.totalIncorrect}
                    </div>
                    <div className="text-sm text-muted-foreground">Incorrect</div>
                    <div className="text-xs text-red-600 mt-1">-{results.totalIncorrect} marks</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gray-500/10 border border-gray-500/20">
                    <MinusCircle className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-600" data-testid="text-unanswered-count">
                      {results.totalUnanswered}
                    </div>
                    <div className="text-sm text-muted-foreground">Unanswered</div>
                    <div className="text-xs text-gray-600 mt-1">0 marks</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5" />
                  Subject-wise Breakdown
                </CardTitle>
                <CardDescription>Performance in each subject</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {results.subjects.map((subject) => (
                  <div key={subject.name} className="space-y-2" data-testid={`subject-breakdown-${subject.name.toLowerCase()}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{subject.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.max(0, subject.score)}/{subject.maxScore}
                      </span>
                    </div>
                    <div className="flex gap-1 h-6 rounded-lg overflow-hidden bg-muted">
                      {subject.correct > 0 && (
                        <div 
                          className="bg-green-500 flex items-center justify-center text-xs text-white font-medium"
                          style={{ width: `${(subject.correct / subject.total) * 100}%` }}
                        >
                          {subject.correct}
                        </div>
                      )}
                      {subject.incorrect > 0 && (
                        <div 
                          className="bg-red-500 flex items-center justify-center text-xs text-white font-medium"
                          style={{ width: `${(subject.incorrect / subject.total) * 100}%` }}
                        >
                          {subject.incorrect}
                        </div>
                      )}
                      {subject.unanswered > 0 && (
                        <div 
                          className="bg-gray-400 flex items-center justify-center text-xs text-white font-medium"
                          style={{ width: `${(subject.unanswered / subject.total) * 100}%` }}
                        >
                          {subject.unanswered}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Correct: {subject.correct}
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        Incorrect: {subject.incorrect}
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                        Unanswered: {subject.unanswered}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>Detailed analysis of your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Award className="h-4 w-4" />
                      <span className="text-sm">Accuracy</span>
                    </div>
                    <div className="text-2xl font-bold" data-testid="text-accuracy">
                      {results.accuracy}%
                    </div>
                    <Progress value={results.accuracy} className="h-2 mt-2" />
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Time Taken</span>
                    </div>
                    <div className="text-2xl font-bold" data-testid="text-time-taken">
                      {formatTime(results.timeTaken)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      of {formatTime(results.totalTime)} allocated
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Zap className="h-4 w-4" />
                      <span className="text-sm">Avg. Time/Question</span>
                    </div>
                    <div className="text-2xl font-bold" data-testid="text-avg-time">
                      {results.averageTimePerQuestion}s
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      per attempted question
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Target className="h-4 w-4" />
                      <span className="text-sm">Attempted</span>
                    </div>
                    <div className="text-2xl font-bold" data-testid="text-attempted">
                      {results.questionsAttempted}/{results.totalQuestions}
                    </div>
                    <Progress 
                      value={(results.questionsAttempted / results.totalQuestions) * 100} 
                      className="h-2 mt-2" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5" />
                Question Review
              </CardTitle>
              <CardDescription>
                Review all questions with answers and explanations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {results.questionResults.map((result, idx) => (
                  <AccordionItem 
                    key={result.index} 
                    value={`question-${result.index}`}
                    className={cn(
                      "border rounded-lg mb-2 px-4",
                      result.isAttempted 
                        ? result.isCorrect 
                          ? "border-green-500/30 bg-green-500/5" 
                          : "border-red-500/30 bg-red-500/5"
                        : "border-gray-500/30 bg-gray-500/5"
                    )}
                    data-testid={`question-review-${idx + 1}`}
                  >
                    <AccordionTrigger className="hover:no-underline py-3">
                      <div className="flex items-center gap-3 text-left w-full">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                          result.isAttempted 
                            ? result.isCorrect 
                              ? "bg-green-500 text-white" 
                              : "bg-red-500 text-white"
                            : "bg-gray-400 text-white"
                        )}>
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {result.subject}
                            </Badge>
                            {result.isAttempted ? (
                              result.isCorrect ? (
                                <Badge className="bg-green-500 text-xs">Correct (+4)</Badge>
                              ) : (
                                <Badge className="bg-red-500 text-xs">Incorrect (-1)</Badge>
                              )
                            ) : (
                              <Badge variant="secondary" className="text-xs">Unanswered (0)</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                            {result.question.questionText.substring(0, 100)}...
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Question:</h4>
                          <p className="text-sm bg-muted/50 p-3 rounded-lg">
                            {result.question.questionText}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Options:</h4>
                          <div className="space-y-2">
                            {result.question.options.map((option) => (
                              <div 
                                key={option.id}
                                className={cn(
                                  "p-3 rounded-lg border text-sm flex items-center gap-2",
                                  option.id === result.question.correctAnswer 
                                    ? "bg-green-500/10 border-green-500/30"
                                    : option.id === result.userAnswer && !result.isCorrect
                                      ? "bg-red-500/10 border-red-500/30"
                                      : "bg-muted/30"
                                )}
                              >
                                <span className="font-medium w-6">{option.id}.</span>
                                <span className="flex-1">{option.text}</span>
                                {option.id === result.question.correctAnswer && (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                )}
                                {option.id === result.userAnswer && !result.isCorrect && (
                                  <XCircle className="h-4 w-4 text-red-500" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Your Answer: </span>
                            <span className={cn(
                              "font-medium",
                              result.isAttempted 
                                ? result.isCorrect ? "text-green-600" : "text-red-600"
                                : "text-gray-500"
                            )}>
                              {result.userAnswer || "Not attempted"}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Correct Answer: </span>
                            <span className="font-medium text-green-600">
                              {result.question.correctAnswer}
                            </span>
                          </div>
                        </div>

                        {result.question.solutionDetail && (
                          <div>
                            <h4 className="font-medium mb-2">Explanation:</h4>
                            <p className="text-sm bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                              {result.question.solutionDetail}
                            </p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={handleRetakeTest}
                  className="gap-2"
                  data-testid="button-retake-test"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retake Test
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setLocation('/dashboard')}
                  className="gap-2"
                  data-testid="button-back-to-dashboard"
                >
                  <Home className="h-4 w-4" />
                  Back to Dashboard
                </Button>
                <Button 
                  variant="secondary"
                  disabled
                  className="gap-2"
                  data-testid="button-detailed-analysis"
                >
                  <TrendingUp className="h-4 w-4" />
                  View Detailed Analysis
                  <Badge variant="outline" className="ml-2 text-xs">Coming Soon</Badge>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ThemeProvider>
  );
}
