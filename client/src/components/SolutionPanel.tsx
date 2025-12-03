import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Lightbulb, CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface SolutionPanelProps {
  question: {
    questionText: string;
    correctAnswer: string;
    explanation?: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
  };
  selectedAnswer?: string;
  isCorrect?: boolean;
}

export function SolutionPanel({ question, selectedAnswer, isCorrect }: SolutionPanelProps) {
  const [expanded, setExpanded] = useState(true);

  const getOptionLabel = (key: string) => {
    switch (key) {
      case "A": return question.optionA;
      case "B": return question.optionB;
      case "C": return question.optionC;
      case "D": return question.optionD;
      default: return "";
    }
  };

  return (
    <Card className="mt-4" data-testid="solution-panel">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Solution
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            data-testid="button-toggle-solution"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <Badge className="bg-green-500/10 text-green-600 border-green-500">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Correct
              </Badge>
            ) : (
              <Badge className="bg-red-500/10 text-red-600 border-red-500">
                <XCircle className="w-3 h-3 mr-1" />
                Incorrect
              </Badge>
            )}
          </div>

          <div className="grid gap-3">
            {selectedAnswer && !isCorrect && (
              <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <p className="text-sm text-red-600 font-medium">Your Answer: {selectedAnswer}</p>
                <p className="text-sm text-muted-foreground">{getOptionLabel(selectedAnswer)}</p>
              </div>
            )}

            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <p className="text-sm text-green-600 font-medium">Correct Answer: {question.correctAnswer}</p>
              <p className="text-sm text-muted-foreground">{getOptionLabel(question.correctAnswer)}</p>
            </div>
          </div>

          {question.explanation && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <p className="font-medium text-sm">Explanation</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
