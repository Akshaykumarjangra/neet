import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface FlashcardData {
  id: number;
  front: string;
  back: string;
  category?: string;
}

interface SwipeableFlashcardProps {
  cards: FlashcardData[];
  onComplete?: () => void;
}

export function SwipeableFlashcard({ cards, onComplete }: SwipeableFlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (!currentCard) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No flashcards available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-4" data-testid="flashcard-container">
      <div className="text-center text-sm text-muted-foreground">
        Card {currentIndex + 1} of {cards.length}
      </div>

      <div
        className="perspective-1000 cursor-pointer"
        onClick={handleFlip}
        data-testid="flashcard"
      >
        <Card
          className={`min-h-[300px] transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          <CardContent className="p-8 flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <p className="text-lg font-medium">
                {isFlipped ? currentCard.back : currentCard.front}
              </p>
              {currentCard.category && !isFlipped && (
                <p className="text-sm text-muted-foreground mt-4">
                  Category: {currentCard.category}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-4">
                {isFlipped ? "Click to see question" : "Click to reveal answer"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

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
          onClick={handleNext}
          data-testid="button-next-card"
        >
          {currentIndex === cards.length - 1 ? "Complete" : "Next"}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
