import { useState } from "react";
import { SpacedRepetitionFlashcard } from "@/components/SpacedRepetitionFlashcard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Paywall } from "@/components/Paywall";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle2,
  RotateCcw,
  AlertCircle,
  Sparkles
} from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

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

interface FlashcardStats {
  dueToday: number;
  learned: number;
  reviewedToday: number;
  total: number;
}

interface FlashcardDeck {
  id: number;
  name: string;
  subject: string | null;
  cardCount: number;
}

const subjects = [
  { value: "all", label: "All Subjects" },
  { value: "Physics", label: "Physics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Botany", label: "Botany" },
  { value: "Zoology", label: "Zoology" },
];

export default function Flashcards() {
  const { user, isLoading: authLoading } = useAuth();
  const isAuthenticated = !!user;

  const [mode, setMode] = useState<"all" | "due">("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDeck, setSelectedDeck] = useState<string>("all");
  const [showResults, setShowResults] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    reviewed: 0,
    skipped: 0,
  });

  const { data: flashcards = [], isLoading: flashcardsLoading, error: flashcardsError } = useQuery<FlashcardWithProgress[]>({
    queryKey: ['/api/learn/flashcards', { subject: selectedSubject, deckId: selectedDeck }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedSubject !== "all") params.append("subject", selectedSubject);
      if (selectedDeck !== "all") params.append("deckId", selectedDeck);
      const response = await fetch(`/api/learn/flashcards?${params.toString()}`);
      if (!response.ok) {
        const err = new Error('Failed to fetch flashcards') as any;
        err.status = response.status;
        throw err;
      }
      return response.json();
    },
    enabled: mode === "all",
    retry: false,
  });

  const { data: dueFlashcards = [], isLoading: dueLoading, error: dueError } = useQuery<FlashcardWithProgress[]>({
    queryKey: ['/api/learn/flashcard-progress/due', { subject: selectedSubject }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedSubject !== "all") params.append("subject", selectedSubject);
      params.append("limit", "50");
      const response = await fetch(`/api/learn/flashcard-progress/due?${params.toString()}`, {
        credentials: 'include'
      });
      if (!response.ok) {
        const err = new Error('Failed to fetch due flashcards') as any;
        err.status = response.status;
        throw err;
      }
      return response.json();
    },
    enabled: mode === "due" && isAuthenticated,
    retry: false,
  });

  const { data: stats } = useQuery<FlashcardStats>({
    queryKey: ['/api/learn/flashcard-progress/stats'],
    queryFn: async () => {
      const response = await fetch('/api/learn/flashcard-progress/stats', {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const { data: decks = [] } = useQuery<FlashcardDeck[]>({
    queryKey: ['/api/learn/flashcard-decks', { subject: selectedSubject }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedSubject !== "all") params.append("subject", selectedSubject);
      const response = await fetch(`/api/learn/flashcard-decks?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch decks');
      return response.json();
    },
  });

  const errors = [flashcardsError, dueError].filter(Boolean);
  const isLocked = errors.some((err: any) => err.status === 402 || err.message?.includes("402"));

  const currentCards = mode === "due" ? dueFlashcards : flashcards;
  const isLoading = mode === "due" ? dueLoading : flashcardsLoading;
  const error = mode === "due" ? dueError : flashcardsError;

  const handleCardReviewed = (cardId: number, quality: number) => {
    setSessionStats(prev => ({
      ...prev,
      reviewed: prev.reviewed + 1,
    }));
  };

  const handleComplete = () => {
    setShowResults(true);
  };

  const resetSession = () => {
    setShowResults(false);
    setSessionStats({ reviewed: 0, skipped: 0 });
  };

  if (authLoading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Skeleton className="h-10 w-48 mb-6" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

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
            <CardTitle className="text-3xl flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-yellow-500" />
              Session Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-green-500/10 border-green-500/20">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                    {sessionStats.reviewed}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Cards Reviewed</div>
                </CardContent>
              </Card>

              <Card className="bg-blue-500/10 border-blue-500/20">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {currentCards.length}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">Total Cards in Session</div>
                </CardContent>
              </Card>
            </div>

            {isAuthenticated && stats && (
              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Your Progress Today</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {stats.reviewedToday}
                      </div>
                      <div className="text-xs text-muted-foreground">Reviewed Today</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                        {stats.dueToday}
                      </div>
                      <div className="text-xs text-muted-foreground">Still Due</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {stats.learned}
                      </div>
                      <div className="text-xs text-muted-foreground">Mastered</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-4">
              <Button onClick={resetSession} className="flex-1" data-testid="button-new-session">
                <RotateCcw className="h-4 w-4 mr-2" />
                New Session
              </Button>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full" data-testid="button-dashboard">
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

      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Spaced Repetition Flashcards</h1>
        <p className="text-muted-foreground">
          {isAuthenticated
            ? "Review cards using SM-2 spaced repetition algorithm for optimal learning"
            : "Sign in to track your progress and enable spaced repetition"}
        </p>
      </div>

      {isAuthenticated && stats && (
        <Card className="mb-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-2xl font-bold">{stats.dueToday}</span>
                </div>
                <span className="text-xs text-muted-foreground">Due Today</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-2xl font-bold">{stats.learned}</span>
                </div>
                <span className="text-xs text-muted-foreground">Mastered</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <RotateCcw className="h-4 w-4" />
                  <span className="text-2xl font-bold">{stats.reviewedToday}</span>
                </div>
                <span className="text-xs text-muted-foreground">Reviewed Today</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-2xl font-bold">{stats.total}</span>
                </div>
                <span className="text-xs text-muted-foreground">Total Progress</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mb-6 space-y-4">
        {isAuthenticated && (
          <Tabs value={mode} onValueChange={(v) => setMode(v as "all" | "due")} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all" data-testid="tab-all-cards">
                <BookOpen className="h-4 w-4 mr-2" />
                All Cards
              </TabsTrigger>
              <TabsTrigger value="due" data-testid="tab-due-review">
                <Clock className="h-4 w-4 mr-2" />
                Due for Review
                {stats && stats.dueToday > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {stats.dueToday}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        <div className="flex flex-wrap gap-3">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[180px]" data-testid="select-subject">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.value} value={subject.value}>
                  {subject.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {mode === "all" && (
            <Select value={selectedDeck} onValueChange={setSelectedDeck}>
              <SelectTrigger className="w-[200px]" data-testid="select-deck">
                <SelectValue placeholder="Select Deck" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Decks</SelectItem>
                {decks.map((deck) => (
                  <SelectItem key={deck.id} value={deck.id.toString()}>
                    {deck.name} ({deck.cardCount})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <div className="flex justify-between">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      ) : error ? (
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
              <p>Failed to load flashcards. Please try again.</p>
            </div>
          </CardContent>
        </Card>
      ) : currentCards.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {mode === "due"
                ? "No cards due for review!"
                : "No flashcards available"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {mode === "due"
                ? "Great job! You've reviewed all your due cards. Check back later or study all cards."
                : selectedSubject !== "all" || selectedDeck !== "all"
                  ? "Try adjusting your filters to see more cards."
                  : "No flashcard decks have been created yet."}
            </p>
            {mode === "due" && (
              <Button onClick={() => setMode("all")} variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Study All Cards
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Paywall
          feature={mode === "due" ? "Spaced Repetition (Due for Review)" : "Premium Flashcard Decks"}
          description={mode === "due"
            ? "Spaced repetition uses AI to show you cards exactly when you're about to forget them. Master concepts 10x faster."
            : "Access 1,000+ premium flashcards covering every sub-topic in the NEET syllabus."}
          freeLimit={mode === "due" ? "None (Basic Review only)" : "1 Deck Free"}
          isLocked={isLocked}
        >
          <SpacedRepetitionFlashcard
            cards={currentCards}
            onComplete={handleComplete}
            onCardReviewed={handleCardReviewed}
            isAuthenticated={isAuthenticated}
          />
        </Paywall>
      )}

      {!isLoading && !error && currentCards.length > 0 && (
        <div className="mt-8">
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {sessionStats.reviewed}
                  </div>
                  <div className="text-sm text-muted-foreground">Session Reviews</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {currentCards.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Cards Available</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
