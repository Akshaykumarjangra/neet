import { useState } from "react";
import { SwipeableFlashcard } from "@/components/SwipeableFlashcard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const sampleFlashcards = [
  {
    id: 1,
    question: "What is Newton's First Law of Motion?",
    answer: "An object at rest stays at rest and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force (Law of Inertia).",
    topic: "Physics - Mechanics",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "What is the formula for force according to Newton's Second Law?",
    answer: "F = ma (Force equals mass times acceleration)",
    topic: "Physics - Mechanics",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "State Newton's Third Law of Motion",
    answer: "For every action, there is an equal and opposite reaction. Forces always occur in pairs.",
    topic: "Physics - Mechanics",
    difficulty: "Easy"
  },
  {
    id: 4,
    question: "What is the difference between mass and weight?",
    answer: "Mass is the amount of matter in an object (measured in kg), while weight is the force of gravity on that mass (measured in N). Weight = mg",
    topic: "Physics - Mechanics",
    difficulty: "Medium"
  },
  {
    id: 5,
    question: "What is the SI unit of energy?",
    answer: "Joule (J). 1 Joule = 1 Newton-meter = 1 kg⋅m²/s²",
    topic: "Physics - Energy",
    difficulty: "Easy"
  },
  {
    id: 6,
    question: "What is the Law of Conservation of Energy?",
    answer: "Energy cannot be created or destroyed, only transformed from one form to another. The total energy in a closed system remains constant.",
    topic: "Physics - Energy",
    difficulty: "Medium"
  },
  {
    id: 7,
    question: "What is kinetic energy and its formula?",
    answer: "Kinetic energy is the energy of motion. KE = ½mv² where m is mass and v is velocity.",
    topic: "Physics - Energy",
    difficulty: "Medium"
  },
  {
    id: 8,
    question: "What is potential energy?",
    answer: "Potential energy is stored energy due to position or configuration. Gravitational PE = mgh, where h is height above reference point.",
    topic: "Physics - Energy",
    difficulty: "Medium"
  }
];

export default function Flashcards() {
  const [learnedCards, setLearnedCards] = useState<Set<number>>(new Set());
  const [reviewCards, setReviewCards] = useState<Set<number>>(new Set());
  const [bookmarkedCards, setBookmarkedCards] = useState<Set<number>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const handleCardLearned = (cardId: number) => {
    setLearnedCards(prev => new Set([...prev, cardId]));
    setReviewCards(prev => {
      const next = new Set(prev);
      next.delete(cardId);
      return next;
    });
  };

  const handleCardNeedsReview = (cardId: number) => {
    setReviewCards(prev => new Set([...prev, cardId]));
    setLearnedCards(prev => {
      const next = new Set(prev);
      next.delete(cardId);
      return next;
    });
  };

  const handleCardBookmarked = (cardId: number) => {
    setBookmarkedCards(prev => {
      const next = new Set(prev);
      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }
      return next;
    });
  };

  const handleComplete = () => {
    setShowResults(true);
  };

  const resetSession = () => {
    setLearnedCards(new Set());
    setReviewCards(new Set());
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Session Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-green-500/10 border-green-500/20">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                    {learnedCards.size}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Cards Learned</div>
                </CardContent>
              </Card>

              <Card className="bg-orange-500/10 border-orange-500/20">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                    {reviewCards.size}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Need Review</div>
                </CardContent>
              </Card>

              <Card className="bg-blue-500/10 border-blue-500/20">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {bookmarkedCards.size}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Bookmarked</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4">
              <Button onClick={resetSession} className="flex-1" data-testid="button-new-session">
                New Session
              </Button>
              <Link href="/">
                <Button variant="outline" className="flex-1" data-testid="button-dashboard">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Link href="/">
        <Button variant="ghost" className="mb-6" data-testid="button-back">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Interactive Flashcards</h1>
        <p className="text-muted-foreground">
          Use gestures to learn: Tap to flip • Double-tap to bookmark • Swipe right when learned • Swipe left to review later
        </p>
      </div>

      <SwipeableFlashcard
        cards={sampleFlashcards}
        onComplete={handleComplete}
        onCardLearned={handleCardLearned}
        onCardNeedsReview={handleCardNeedsReview}
        onCardBookmarked={handleCardBookmarked}
      />

      <div className="mt-8">
        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {learnedCards.size}
                </div>
                <div className="text-sm text-muted-foreground">Learned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {reviewCards.size}
                </div>
                <div className="text-sm text-muted-foreground">Review</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {bookmarkedCards.size}
                </div>
                <div className="text-sm text-muted-foreground">Bookmarked</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
