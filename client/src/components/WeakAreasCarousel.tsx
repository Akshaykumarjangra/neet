import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  Dumbbell,
  ChevronRight,
  AlertCircle,
  Sparkles
} from "lucide-react";

interface WeakArea {
  id: number;
  userId: string;
  topicId: number;
  topicName?: string;
  chapterName?: string;
  subject?: string;
  completionPercentage: number;
  masteryLevel?: number;
  quizScore?: number;
  lastAccessedAt?: string;
}

interface ContinueLearningData {
  continueLearning: any;
  weakAreas: WeakArea[];
  dueFlashcards: number;
}

export function WeakAreasCarousel() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery<ContinueLearningData>({
    queryKey: ["/api/learn/continue-learning"],
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <Card className="glass-panel" data-testid="weak-areas-loading">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-6 w-40" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-48 flex-shrink-0 rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="glass-panel border-destructive/30" data-testid="weak-areas-error">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">Failed to load weak areas. Please try again.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const weakAreas = data?.weakAreas || [];

  if (weakAreas.length === 0) {
    return (
      <Card className="glass-panel glow-halo border-2 border-emerald-500/30" data-testid="weak-areas-empty">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Great Job! 🎉</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You're doing well across all topics. Keep up the excellent work!
              </p>
            </div>
            <Button
              onClick={() => setLocation("/practice")}
              variant="outline"
              className="border-emerald-500/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
              data-testid="button-practice-more"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Practice More
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handlePractice = (topicId: number, subject?: string) => {
    setLocation(`/practice?topicId=${topicId}${subject ? `&subject=${subject}` : ""}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="glass-panel glow-halo border-2 border-orange-500/30" data-testid="weak-areas-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 shadow-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              Areas to Improve
            </CardTitle>
            <Badge 
              variant="outline" 
              className="text-xs border-orange-500/50 text-orange-600 dark:text-orange-400"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              {weakAreas.length} topics
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 pb-4">
              {weakAreas.map((area, index) => {
                const mastery = area.masteryLevel ?? area.quizScore ?? area.completionPercentage ?? 0;
                const isLowMastery = mastery < 50;
                const topicName = area.topicName || area.chapterName || `Topic ${area.topicId}`;
                const subject = area.subject || "Physics";

                return (
                  <motion.div
                    key={area.id || `weak-${index}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="flex-shrink-0"
                  >
                    <Card 
                      className={`w-56 h-full transition-all cursor-pointer ${
                        isLowMastery 
                          ? "border-red-500/40 bg-gradient-to-br from-red-500/5 to-orange-500/5" 
                          : "border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-yellow-500/5"
                      }`}
                      onClick={() => handlePractice(area.topicId, subject)}
                      data-testid={`weak-area-card-${area.topicId}`}
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate" data-testid={`text-topic-name-${area.topicId}`}>
                              {topicName}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {subject}
                            </p>
                          </div>
                          {isLowMastery && (
                            <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 ml-2" />
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Mastery</span>
                            <span 
                              className={`text-sm font-bold ${
                                isLowMastery ? "text-red-500" : "text-orange-500"
                              }`}
                              data-testid={`text-mastery-${area.topicId}`}
                            >
                              {Math.round(mastery)}%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                isLowMastery 
                                  ? "bg-gradient-to-r from-red-500 to-orange-500" 
                                  : "bg-gradient-to-r from-orange-400 to-yellow-400"
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${mastery}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                            />
                          </div>
                        </div>

                        <Button
                          size="sm"
                          className={`w-full ${
                            isLowMastery
                              ? "bg-gradient-to-r from-red-500 to-orange-500"
                              : "bg-gradient-to-r from-orange-400 to-yellow-500"
                          } hover:opacity-90 text-white gap-1`}
                          data-testid={`button-practice-${area.topicId}`}
                        >
                          <Dumbbell className="h-3 w-3" />
                          Practice
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
}
