import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Question } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, RefreshCcw, CheckCircle2, Trophy } from "lucide-react";
import { QuestionCard } from "./QuestionCard";
import { SolutionPanel } from "./SolutionPanel";
import { trackEvent } from "@/lib/telemetry";
import { getDifficultyLabel } from "@/lib/questionUtils";

interface ChapterQuizProps {
    topicId: number;
    subject?: string;
    chapterTitle?: string;
}

export function ChapterQuiz({ topicId, subject, chapterTitle }: ChapterQuizProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, string | number>>({});
    const [submittedQuestions, setSubmittedQuestions] = useState<Set<number>>(new Set());
    const [quizStarted, setQuizStarted] = useState(false);
    const [score, setScore] = useState(0);

    const { data: questions, isLoading, error, refetch } = useQuery<Question[]>({
        queryKey: ['/api/questions', 'topicId', topicId],
        queryFn: async () => {
            const response = await fetch(`/api/questions?topicId=${topicId}`);
            if (!response.ok) throw new Error('Failed to fetch questions');
            return response.json();
        },
        enabled: !!topicId,
    });

    const handleStartQuiz = () => {
        setQuizStarted(true);
        trackEvent('chapter_quiz_start', { topicId, subject, chapterTitle });
    };

    const handleAnswerSubmit = (questionId: number, answer: string | number) => {
        const question = questions?.find(q => q.id === questionId);
        if (!question) return;

        setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
        setSubmittedQuestions(prev => {
            const next = new Set(prev);
            next.add(questionId);
            return next;
        });

        const isCorrect = String(answer) === String(question.correctAnswer);
        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        trackEvent('chapter_quiz_answer', {
            topicId,
            questionId,
            isCorrect,
            subject,
        });
    };

    const currentQuestion = questions?.[currentQuestionIndex];
    const isComplete = questions && submittedQuestions.size === questions.length;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Loading quiz questions...</p>
            </div>
        );
    }

    if (error || !questions || questions.length === 0) {
        return (
            <Card className="border-destructive/20">
                <CardContent className="flex flex-col items-center justify-center p-12 space-y-4">
                    <p className="text-muted-foreground">
                        {questions?.length === 0
                            ? "No practice questions available for this topic yet."
                            : "Failed to load quiz questions."}
                    </p>
                    <Button variant="outline" onClick={() => refetch()} size="sm">
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Retry
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (!quizStarted) {
        return (
            <Card className="glass-panel glow-halo">
                <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-6">
                    <div className="p-4 bg-primary/10 rounded-full">
                        <Trophy className="h-12 w-12 text-primary" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Ready to Practice?</h3>
                        <p className="text-muted-foreground max-w-sm">
                            Test your knowledge of {chapterTitle || "this chapter"} with {questions.length} practice questions.
                        </p>
                    </div>
                    <Button onClick={handleStartQuiz} size="lg" className="w-full max-w-xs shadow-lg hover:shadow-primary/20">
                        Start Practice Quiz
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (isComplete) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <Card className="border-2 border-primary glass-panel glow-halo float-gentle">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">Quiz Complete! 🎉</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8 text-center pb-12">
                    <div className="space-y-2">
                        <p className="text-6xl font-black text-primary">{score}/{questions.length}</p>
                        <p className="text-xl font-medium text-muted-foreground">
                            {percentage === 100 ? "Perfect Mastery! 🏆" : percentage >= 80 ? "Excellent Work! 🌟" : percentage >= 60 ? "Good Progress! 👍" : "Keep Learning! 📚"}
                        </p>
                    </div>

                    <div className="w-full max-w-md mx-auto space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Accuracy</span>
                            <span>{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-3" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button onClick={() => {
                            setQuizStarted(false);
                            setScore(0);
                            setSubmittedQuestions(new Set());
                            setUserAnswers({});
                            setCurrentQuestionIndex(0);
                        }} variant="outline">
                            Retake Quiz
                        </Button>
                        <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            Review Chapter Notes
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const progressPercentage = (submittedQuestions.size / questions.length) * 100;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                    <div className="flex justify-between text-sm mb-2 font-medium">
                        <span>Progress: {submittedQuestions.size}/{questions.length} questions</span>
                        <span className="text-primary">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                </div>
            </div>

            <div className="grid gap-6">
                {currentQuestion && (
                    <>
                        <QuestionCard
                            questionNumber={currentQuestionIndex + 1}
                            difficulty={getDifficultyLabel(currentQuestion.difficultyLevel) as "Easy" | "Medium" | "Hard"}
                            subject={subject || ""}
                            topic={chapterTitle || ""}
                            question={currentQuestion.questionText}
                            options={currentQuestion.options || [
                                { id: "A", text: currentQuestion.optionA || "" },
                                { id: "B", text: currentQuestion.optionB || "" },
                                { id: "C", text: currentQuestion.optionC || "" },
                                { id: "D", text: currentQuestion.optionD || "" },
                            ]}
                            selectedAnswer={userAnswers[currentQuestion.id]}
                            onSubmit={(answer) => handleAnswerSubmit(currentQuestion.id, answer)}
                            onSkip={() => setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1))}
                            onPrevious={() => setCurrentQuestionIndex(prev => Math.max(prev - 1, 0))}
                            lockOnSubmit={true}
                        />

                        {submittedQuestions.has(currentQuestion.id) && (
                            <SolutionPanel
                                isCorrect={String(userAnswers[currentQuestion.id]) === String(currentQuestion.correctAnswer)}
                                correctAnswer={String(currentQuestion.correctAnswer)}
                                userAnswer={String(userAnswers[currentQuestion.id])}
                                explanation={currentQuestion.solutionDetail || currentQuestion.explanation || ""}
                                steps={currentQuestion.solutionSteps || []}
                                relatedTopics={currentQuestion.relatedTopics || []}
                            />
                        )}

                        <div className="flex justify-between items-center pt-4">
                            <Button
                                variant="ghost"
                                onClick={() => setCurrentQuestionIndex(prev => Math.max(prev - 1, 0))}
                                disabled={currentQuestionIndex === 0}
                            >
                                Previous Question
                            </Button>
                            <Button
                                onClick={() => setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1))}
                                disabled={currentQuestionIndex === questions.length - 1 || !submittedQuestions.has(currentQuestion.id)}
                            >
                                Next Question
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
