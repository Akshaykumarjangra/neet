import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, SkipForward, Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionCardProps {
  questionNumber: number;
  difficulty: "Easy" | "Medium" | "Hard";
  subject: string;
  topic: string;
  question: string;
  options: { id: string; text: string }[];
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onSubmit: (answer: string) => void;
  onSkip?: () => void;
  onPrevious?: () => void;
}

export function QuestionCard({
  questionNumber,
  difficulty,
  subject,
  topic,
  question,
  options,
  isBookmarked = false,
  onToggleBookmark,
  onSubmit,
  onSkip,
  onPrevious,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer) {
      setIsSubmitted(true);
      onSubmit(selectedAnswer);
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "Hard":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  return (
    <Card className="w-full" data-testid={`card-question-${questionNumber}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              Q{questionNumber}
            </Badge>
            <Badge className={getDifficultyColor()}>
              {difficulty}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {topic}
            </Badge>
          </div>

          {onToggleBookmark && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleBookmark}
              className="h-8 w-8"
              data-testid="button-bookmark"
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-primary" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        <CardTitle className="text-lg leading-relaxed font-medium">
          {question}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-3">
          <AnimatePresence mode="wait">
            {options.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => !isSubmitted && setSelectedAnswer(option.id)}
                disabled={isSubmitted}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === option.id
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                } ${isSubmitted ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
                data-testid={`option-${option.id.toLowerCase()}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm shrink-0 ${
                      selectedAnswer === option.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30"
                    }`}
                  >
                    {option.id}
                  </span>
                  <span className="flex-1 text-sm">{option.text}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-4 pt-4 border-t">
          <div className="flex gap-2">
            {onPrevious && (
              <Button
                variant="outline"
                size="sm"
                onClick={onPrevious}
                disabled={isSubmitted}
                data-testid="button-previous"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {onSkip && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSkip}
                disabled={isSubmitted}
                data-testid="button-skip"
              >
                Skip
                <SkipForward className="h-4 w-4 ml-1" />
              </Button>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer || isSubmitted}
              size="sm"
              data-testid="button-submit-answer"
            >
              Submit Answer
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
