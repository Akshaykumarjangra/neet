import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Swords, Trophy, Clock, Search, X, Loader2, Zap, Shield, ChevronRight } from "lucide-react";

type BattlePlayer = { userId: string; name: string; rating: number; score: number };
type BattleState = {
  id: string;
  players: BattlePlayer[];
  questions: any[];
  currentQuestion: number;
  status: 'waiting' | 'active' | 'finished';
  roundDurationMs: number;
};

export default function BattleLobby() {
  const [inQueue, setInQueue] = useState(false);
  const [battleId, setBattleId] = useState<string | null>(null);
  const [answerSelected, setAnswerSelected] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answerResult, setAnswerResult] = useState<{ isCorrect: boolean, correctAnswer?: string } | null>(null);
  const { toast } = useToast();

  const { data: queueStatus, refetch: refetchQueue } = useQuery<any>({
    queryKey: ["/api/battle/queue/status"],
    refetchInterval: inQueue && !battleId ? 2000 : false,
  });

  const { data: battleState, refetch: refetchBattle } = useQuery<BattleState>({
    queryKey: ["/api/battle", battleId],
    enabled: !!battleId,
    refetchInterval: battleId && !answerSelected ? 1000 : false,
  });

  useEffect(() => {
    if (queueStatus?.inBattle) {
      setBattleId(queueStatus.inBattle);
      setInQueue(false);
    } else if (queueStatus?.inQueue) {
      setInQueue(true);
    }
  }, [queueStatus]);

  useEffect(() => {
    if (battleId && battleState?.status === 'active' && !answerSelected) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [battleId, battleState?.currentQuestion, answerSelected]);

  useEffect(() => {
    // Reset state on new question
    if (battleState?.currentQuestion) {
      setAnswerSelected(null);
      setAnswerResult(null);
      setTimeLeft(30);
    }
  }, [battleState?.currentQuestion]);

  const joinMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/battle/join", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.status === 'matched' || data.status === 'in_battle') {
        setBattleId(data.battleId);
      } else {
        setInQueue(true);
      }
    }
  });

  const leaveMutation = useMutation({
    mutationFn: async () => {
      await fetch("/api/battle/leave", { method: "POST" });
    },
    onSuccess: () => {
      setInQueue(false);
      setBattleId(null);
    }
  });

  const answerMutation = useMutation({
    mutationFn: async (answer: string) => {
      const res = await fetch(`/api/battle/${battleId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionIndex: battleState?.currentQuestion,
          answer,
          timeMs: (30 - timeLeft) * 1000
        })
      });
      return res.json();
    },
    onSuccess: (data) => {
      setAnswerResult({ isCorrect: data.isCorrect, correctAnswer: data.correctAnswer });
      setTimeout(() => refetchBattle(), 1500); // Fetch next question state after a delay
    }
  });

  const handleAnswer = (optionText: string) => {
    setAnswerSelected(optionText);
    answerMutation.mutate(optionText);
  };

  if (battleId && battleState) {
    const isFinished = battleState.status === 'finished';
    const myPlayer = battleState.players[0]; // Simplified: assuming first is current user, or backend needs to identify. Backend usually returns all.
    const currentQ = battleState.questions[battleState.currentQuestion];

    if (isFinished) {
      return (
        <div className="min-h-[80vh] flex items-center justify-center container max-w-3xl p-6 animate-in zoom-in-95 duration-500">
          <Card className="w-full border-2 border-primary/30 shadow-2xl bg-card/80 backdrop-blur-md overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/10 pointer-events-none" />
            <CardContent className="p-10 text-center space-y-6 relative z-10">
              <Trophy className="h-24 w-24 mx-auto text-yellow-500 mb-4 animate-bounce" />
              <h2 className="text-4xl font-extrabold tracking-tight">Battle Finished!</h2>
              <div className="flex justify-center items-center gap-8 text-2xl font-bold py-6">
                {battleState.players.map((p, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className={i === 0 ? "text-primary" : "text-muted-foreground"}>{p.name || `Player ${i+1}`}</span>
                    <span className="text-4xl">{p.score} <span className="text-sm font-normal text-muted-foreground tracking-normal">pts</span></span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="rounded-full px-8 shadow-lg" onClick={() => setBattleId(null)}>
                Return to Lobby
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="container max-w-4xl mx-auto p-4 sm:p-6 space-y-6 animate-in slide-in-from-bottom-8 duration-500">
        {/* Battle Header */}
        <div className="flex items-center justify-between bg-card border shadow-md rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-primary to-blue-500" />
          <div className="flex items-center gap-4">
            <div className="bg-red-500/10 p-3 rounded-xl border border-red-500/20">
              <Swords className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="font-bold text-lg">Live Duel</p>
              <p className="text-sm text-muted-foreground">Question {battleState.currentQuestion + 1} of {battleState.questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
             {battleState.players.map((p, i) => (
               <div key={i} className="text-center">
                 <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{p.name || `Player ${i+1}`}</p>
                 <p className="text-2xl font-bold">{p.score}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Timer Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-muted-foreground flex items-center gap-1"><Clock className="w-4 h-4" /> Time Remaining</span>
            <span className={timeLeft <= 10 ? "text-red-500 font-bold" : "text-primary"}>{timeLeft}s</span>
          </div>
          <Progress value={(timeLeft / 30) * 100} className="h-3 shadow-inner" {...{ indicatorColor: timeLeft <= 10 ? "bg-red-500" : "bg-primary" } as any} />
        </div>

        {/* Question Area */}
        {currentQ ? (
          <Card className="border-2 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6 md:p-8 space-y-8">
              <h3 className="text-2xl font-medium leading-relaxed">{currentQ.questionText}</h3>
              
              <div className="grid gap-3">
                {currentQ.options?.map((opt: string, idx: number) => {
                  let isSelected = answerSelected === opt;
                  let isCorrect = answerResult?.correctAnswer === opt;
                  let isWrong = isSelected && answerResult && !answerResult.isCorrect;
                  
                  let variantClasses = "border-2 hover:bg-muted/50 bg-background text-left transition-all justify-start h-auto p-4 text-base rounded-xl";
                  
                  if (isCorrect) variantClasses = "border-2 border-green-500 bg-green-500/10 text-green-700 dark:text-green-400 justify-start h-auto p-4 text-base rounded-xl";
                  else if (isWrong) variantClasses = "border-2 border-red-500 bg-red-500/10 text-red-700 dark:text-red-400 justify-start h-auto p-4 text-base rounded-xl";
                  else if (isSelected) variantClasses = "border-2 border-primary bg-primary/10 text-primary justify-start h-auto p-4 text-base rounded-xl";

                  return (
                    <Button
                      key={idx}
                      variant="outline"
                      className={variantClasses}
                      onClick={() => !answerSelected && handleAnswer(opt)}
                      disabled={!!answerSelected}
                    >
                      <span className="bg-muted px-3 py-1 rounded-md mr-4 font-mono text-sm border">{String.fromCharCode(65 + idx)}</span>
                      {opt}
                    </Button>
                  );
                })}
              </div>
              
              {answerSelected && !answerResult && (
                <div className="text-center text-muted-foreground animate-pulse flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Waiting for opponent...
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
           <div className="text-center py-20 animate-pulse"><Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />Loading question...</div>
        )}
      </div>
    );
  }

  // Lobby View
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[url('/grid-pattern.svg')] bg-center p-4">
      <Card className="w-full max-w-lg border-2 shadow-2xl overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-red-500/20 rounded-full blur-3xl opacity-50" />
        
        <CardContent className="p-8 md:p-12 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center justify-center p-4 bg-background border shadow-sm rounded-2xl mb-2">
            <Swords className="h-12 w-12 text-primary" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight">Battle Arena</h1>
            <p className="text-lg text-muted-foreground">Test your NEET knowledge against real players in fast-paced 1v1 duels.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 my-8">
            <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
              <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Your Rating</p>
              <p className="text-2xl font-bold">1200</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
              <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Win Streak</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>

          {!inQueue ? (
            <Button 
              size="lg" 
              className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-xl shadow-primary/25 transition-all hover:scale-[1.02]"
              onClick={() => joinMutation.mutate()}
              disabled={joinMutation.isPending}
            >
              {joinMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Find Match"}
            </Button>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary animate-[pulse_2s_ease-in-out_infinite] w-full origin-left scale-x-100" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Search className="h-5 w-5 animate-pulse" />
                  Searching for opponent...
                </div>
                <p className="text-sm text-muted-foreground">Rating range: 1150 - 1250</p>
              </div>
              <Button 
                variant="outline" 
                className="rounded-xl border-destructive/20 text-destructive hover:bg-destructive/10"
                onClick={() => leaveMutation.mutate()}
                disabled={leaveMutation.isPending}
              >
                <X className="h-4 w-4 mr-2" /> Cancel Search
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
