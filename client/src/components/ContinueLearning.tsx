import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { 
  BookOpen, 
  Clock, 
  Play, 
  Sparkles, 
  ChevronRight,
  AlertCircle,
  Rocket 
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ContinueLearningData {
  continueLearning: {
    id: number;
    userId: string;
    topicId: number;
    topicName?: string;
    chapterName?: string;
    subject?: string;
    completionPercentage: number;
    masteryLevel?: number;
    lastAccessedAt: string;
    isCompleted: boolean;
  } | null;
  weakAreas: any[];
  dueFlashcards: number;
}

export function ContinueLearning() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const { data, isLoading, isError, error } = useQuery<ContinueLearningData>({
    queryKey: ["/api/learn/continue-learning"],
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <Card className="glass-panel" data-testid="continue-learning-loading">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-6 w-40" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-10 w-32" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="glass-panel border-destructive/30" data-testid="continue-learning-error">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">Failed to load progress. Please try again.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const continueLearning = data?.continueLearning;

  if (!continueLearning) {
    return (
      <Card className="glass-panel glow-halo border-2 border-primary/20" data-testid="continue-learning-empty">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Start Your Learning Journey!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Choose a subject and begin mastering NEET concepts
              </p>
            </div>
            <Button
              onClick={() => setLocation("/explore")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
              data-testid="button-start-learning"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Explore
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = continueLearning.completionPercentage || 0;
  const topicName = continueLearning.topicName || continueLearning.chapterName || "Topic";
  const subject = continueLearning.subject || "Physics";
  const lastAccessed = continueLearning.lastAccessedAt 
    ? formatDistanceToNow(new Date(continueLearning.lastAccessedAt), { addSuffix: true })
    : "recently";

  const handleContinue = () => {
    setLocation(`/chapter/${subject.toLowerCase()}/11/${continueLearning.topicId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card 
        className="glass-panel glow-halo border-2 border-emerald-500/30 overflow-hidden" 
        data-testid="continue-learning-card"
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              Continue Learning
            </CardTitle>
            <Badge 
              variant="outline" 
              className="text-xs border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
            >
              <Clock className="h-3 w-3 mr-1" />
              {lastAccessed}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-base" data-testid="text-topic-name">
                {topicName}
              </h4>
              <Badge 
                variant="secondary" 
                className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              >
                {subject}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold text-emerald-500" data-testid="text-progress-percentage">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="relative">
                <Progress 
                  value={progress} 
                  className="h-2.5 bg-emerald-500/20" 
                  data-testid="progress-bar"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
          
          <Button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:opacity-90 gap-2 shadow-lg"
            data-testid="button-continue-learning"
          >
            <Play className="h-4 w-4" />
            Continue
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
