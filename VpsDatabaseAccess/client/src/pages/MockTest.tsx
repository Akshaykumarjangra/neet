
import { Header } from "@/components/Header";
import { QuestionCard } from "@/components/QuestionCard";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Clock, ChevronLeft } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Question, MockTest } from "@shared/schema";
import { useLocation, useRoute } from "wouter";

export default function MockTestPage() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/mock-test/:id");
  const testId = params?.id;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(180 * 60); // 180 minutes in seconds
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);

  const { data: testData, isLoading } = useQuery({
    queryKey: ['/api/mock-tests', testId],
    queryFn: async () => {
      const response = await fetch(`/api/mock-tests/${testId}`);
      if (!response.ok) throw new Error('Failed to fetch mock test');
      return response.json() as Promise<{ test: MockTest; questions: Question[] }>;
    },
    enabled: !!testId,
  });

  // Timer effect
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

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSubmit = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleSubmitTest = () => {
    setIsTestSubmitted(true);
    // Calculate score
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    testData?.questions.forEach((question, index) => {
      if (answers[index]) {
        if (answers[index] === question.correctAnswer) {
          correct++;
        } else {
          incorrect++;
        }
      } else {
        unanswered++;
      }
    });

    console.log({
      correct,
      incorrect,
      unanswered,
      score: correct * 4 - incorrect * 1,
    });
  };

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
            <Button variant="ghost" onClick={() => setLocation('/')}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{testData.test.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span className="text-lg font-mono">{formatTime(timeRemaining)}</span>
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
                <CardHeader>
                  <CardTitle>Question Palette</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {testData.questions.map((_, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant={answers[index] ? "default" : "outline"}
                        className={currentQuestionIndex === index ? "ring-2 ring-primary" : ""}
                        onClick={() => setCurrentQuestionIndex(index)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Badge>Answered: {Object.keys(answers).length}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline">Not Answered: {totalQuestions - Object.keys(answers).length}</Badge>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    onClick={handleSubmitTest}
                    disabled={isTestSubmitted}
                  >
                    Submit Test
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
