import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Clock, 
  Brain,
  SkipForward,
  Loader2
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FlashcardWithProgress {
  id: number;
  front: string;
  back: string;
  deckId: number;
  deckName: string;
  deckSubject: string | null;
  topicId: number | null;
  order: number;
  createdAt: string;
  progressId?: number;
  easeFactor?: number;
  interval?: number;
  repetitions?: number;
  nextReviewAt?: string;
  lastReviewedAt?: string | null;
}

interface ConfidenceButton {
  quality: 0 | 1 | 2 | 3 | 4 | 5;
  label: string;
  description: string;
  color: string;
  hoverColor: string;
}

const confidenceButtons: ConfidenceButton[] = [
  { quality: 0, label: "Blackout", description: "Forgot completely", color: "bg-red-600", hoverColor: "hover:bg-red-700" },
  { quality: 1, label: "Wrong", description: "Recognized it", color: "bg-red-500", hoverColor: "hover:bg-red-600" },
  { quality: 2, label: "Hard", description: "Took effort", color: "bg-orange-500", hoverColor: "hover:bg-orange-600" },
  { quality: 3, label: "Good", description: "Some hesitation", color: "bg-yellow-500", hoverColor: "hover:bg-yellow-600" },
  { quality: 4, label: "Easy", description: "No hesitation", color: "bg-green-500", hoverColor: "hover:bg-green-600" },
  { quality: 5, label: "Perfect", description: "Instant recall", color: "bg-emerald-500", hoverColor: "hover:bg-emerald-600" },
];

interface SpacedRepetitionFlashcardProps {
  cards: FlashcardWithProgress[];
  onComplete?: () => void;
  onCardReviewed?: (cardId: number, quality: number) => void;
  isAuthenticated?: boolean;
}

export function SpacedRepetitionFlashcard({ 
  cards, 
  onComplete,
  onCardReviewed,
  isAuthenticated = false
}: SpacedRepetitionFlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCards, setReviewedCards] = useState<Set<number>>(new Set());
  const [skippedCards, setSkippedCards] = useState<Set<number>>(new Set());
  
  const queryClient = useQueryClient();
  
  const reviewMutation = useMutation({
    mutationFn: async ({ flashcardId, quality }: { flashcardId: number; quality: number }) => {
      const response = await fetch(`/api/learn/flashcard-progress/${flashcardId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ quality })
      });
      if (!response.ok) throw new Error('Failed to submit review');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/learn/flashcard-progress/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/learn/flashcard-progress/due'] });
    }
  });

  const currentCard = cards[currentIndex];

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, cards.length, onComplete]);

  const handlePrevious = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleConfidenceClick = async (quality: 0 | 1 | 2 | 3 | 4 | 5) => {
    if (!currentCard) return;
    
    setReviewedCards(prev => new Set([...prev, currentCard.id]));
    
    if (isAuthenticated) {
      try {
        await reviewMutation.mutateAsync({ flashcardId: currentCard.id, quality });
      } catch (error) {
        console.error('Failed to submit review:', error);
      }
    }
    
    if (onCardReviewed) {
      onCardReviewed(currentCard.id, quality);
    }
    
    handleNext();
  };

  const handleSkip = () => {
    if (!currentCard) return;
    setSkippedCards(prev => new Set([...prev, currentCard.id]));
    handleNext();
  };

  const formatInterval = (days: number) => {
    if (days === 0) return "Today";
    if (days === 1) return "1 day";
    if (days < 7) return `${days} days`;
    if (days < 30) return `${Math.round(days / 7)} weeks`;
    if (days < 365) return `${Math.round(days / 30)} months`;
    return `${Math.round(days / 365)} years`;
  };

  const getEaseFactorLabel = (ef: number) => {
    if (ef >= 2.5) return { label: "High", variant: "default" as const };
    if (ef >= 2.0) return { label: "Medium", variant: "secondary" as const };
    return { label: "Low", variant: "destructive" as const };
  };

  if (!currentCard) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No flashcards available</p>
        </CardContent>
      </Card>
    );
  }

  const hasProgress = currentCard.progressId !== undefined;
  const easeFactor = currentCard.easeFactor ?? 2.5;
  const interval = currentCard.interval ?? 0;
  const repetitions = currentCard.repetitions ?? 0;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4" data-testid="flashcard-container">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Card {currentIndex + 1} of {cards.length}</span>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs">
            {reviewedCards.size} reviewed
          </Badge>
          {skippedCards.size > 0 && (
            <Badge variant="secondary" className="text-xs">
              {skippedCards.size} skipped
            </Badge>
          )}
        </div>
      </div>

      {hasProgress && (
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Next: {formatInterval(interval)}
          </Badge>
          <Badge variant={getEaseFactorLabel(easeFactor).variant} className="flex items-center gap-1">
            <Brain className="w-3 h-3" />
            Ease: {easeFactor.toFixed(2)}
          </Badge>
          <Badge variant="outline">
            Reviews: {repetitions}
          </Badge>
        </div>
      )}

      {currentCard.deckName && (
        <div className="text-center">
          <Badge variant="secondary" className="text-xs">
            {currentCard.deckSubject && `${currentCard.deckSubject} • `}{currentCard.deckName}
          </Badge>
        </div>
      )}

      <div
        className="perspective-1000 cursor-pointer"
        onClick={handleFlip}
        data-testid="flashcard"
      >
        <Card
          className={`min-h-[280px] transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          <CardContent className="p-8 flex items-center justify-center min-h-[280px]">
            <div className="text-center w-full">
              <p className="text-lg font-medium whitespace-pre-wrap">
                {isFlipped ? currentCard.back : currentCard.front}
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                {isFlipped ? "Click to see question" : "Click to reveal answer"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {isFlipped && isAuthenticated ? (
        <div className="space-y-3">
          <p className="text-center text-sm text-muted-foreground">
            How well did you know this?
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {confidenceButtons.map((btn) => (
              <Button
                key={btn.quality}
                onClick={() => handleConfidenceClick(btn.quality)}
                disabled={reviewMutation.isPending}
                className={`${btn.color} ${btn.hoverColor} text-white flex flex-col h-auto py-2 px-1`}
                data-testid={`button-confidence-${btn.quality}`}
              >
                {reviewMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span className="text-xs font-semibold">{btn.label}</span>
                    <span className="text-[10px] opacity-80 hidden sm:block">{btn.description}</span>
                  </>
                )}
              </Button>
            ))}
          </div>
        </div>
      ) : isFlipped ? (
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={handleSkip}
            data-testid="button-skip"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Skip
          </Button>
          <Button
            onClick={handleNext}
            data-testid="button-next-card"
          >
            {currentIndex === cards.length - 1 ? "Complete" : "Next"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      ) : null}

      {!isFlipped && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            data-testid="button-previous-card"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              data-testid="button-reset-cards"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={handleSkip}
              data-testid="button-skip"
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Skip
            </Button>
          </div>

          <Button
            onClick={handleFlip}
            data-testid="button-reveal"
          >
            Reveal Answer
          </Button>
        </div>
      )}
    </div>
  );
}
