import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";

interface QuestionCardProps {
  question: {
    id: number;
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
    explanation?: string;
    difficulty?: string;
    subject?: string;
    topic?: string;
  };
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
  showResult?: boolean;
  onNext?: () => void;
  questionNumber?: number;
  totalQuestions?: number;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  showResult = false,
  onNext,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  const options = [
    { key: "A", text: question.optionA },
    { key: "B", text: question.optionB },
    { key: "C", text: question.optionC },
    { key: "D", text: question.optionD },
  ];

  const isCorrect = selectedAnswer === question.correctAnswer;

  const getOptionStyle = (key: string) => {
    if (!showResult) {
      return selectedAnswer === key
        ? "border-primary bg-primary/10"
        : "border-border hover:border-primary/50";
    }

    if (key === question.correctAnswer) {
      return "border-green-500 bg-green-500/10";
    }
    if (selectedAnswer === key && key !== question.correctAnswer) {
      return "border-red-500 bg-red-500/10";
    }
    return "border-border opacity-50";
  };

  return (
    <Card className="w-full max-w-3xl mx-auto" data-testid={`card-question-${question.id}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          {questionNumber && totalQuestions && (
            <Badge variant="secondary">
              Question {questionNumber} of {totalQuestions}
            </Badge>
          )}
          {question.difficulty && (
            <Badge
              variant={
                question.difficulty === "easy"
                  ? "default"
                  : question.difficulty === "medium"
                  ? "secondary"
                  : "destructive"
              }
            >
              {question.difficulty}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg leading-relaxed">
          {question.questionText}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {options.map(({ key, text }) => (
            <button
              key={key}
              onClick={() => !showResult && onAnswerSelect(key)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${getOptionStyle(
                key
              )}`}
              data-testid={`option-${key.toLowerCase()}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm">
                  {key}
                </span>
                <span className="flex-1">{text}</span>
                {showResult && key === question.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
                {showResult && selectedAnswer === key && key !== question.correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="space-y-4 pt-4 border-t">
            <div
              className={`p-4 rounded-lg ${
                isCorrect ? "bg-green-500/10" : "bg-red-500/10"
              }`}
            >
              <p className={`font-semibold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                {isCorrect ? "Correct!" : "Incorrect"}
              </p>
              {question.explanation && (
                <p className="text-sm text-muted-foreground mt-2">
                  {question.explanation}
                </p>
              )}
            </div>

            {onNext && (
              <Button onClick={onNext} className="w-full" data-testid="button-next-question">
                Next Question <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
