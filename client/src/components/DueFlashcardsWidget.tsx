import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { 
  Layers, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Brain,
  Sparkles
} from "lucide-react";

interface ContinueLearningData {
  continueLearning: any;
  weakAreas: any[];
  dueFlashcards: number;
}

export function DueFlashcardsWidget() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery<ContinueLearningData>({
    queryKey: ["/api/learn/continue-learning"],
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <Card className="glass-panel" data-testid="due-flashcards-loading">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-9 w-20" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="glass-panel border-destructive/30" data-testid="due-flashcards-error">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">Failed to load flashcards</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const dueCount = data?.dueFlashcards || 0;

  if (dueCount === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card 
          className="glass-panel glow-halo border-2 border-emerald-500/30" 
          data-testid="due-flashcards-empty"
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">All Caught Up! 🌟</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  No flashcards due for review
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocation("/flashcards")}
                className="border-emerald-500/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                data-testid="button-browse-flashcards"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Browse
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const urgencyLevel = dueCount > 20 ? "high" : dueCount > 10 ? "medium" : "low";
  const gradientClass = 
    urgencyLevel === "high" 
      ? "from-red-500 to-orange-500" 
      : urgencyLevel === "medium" 
        ? "from-orange-400 to-yellow-500" 
        : "from-purple-500 to-pink-500";
  const borderClass = 
    urgencyLevel === "high" 
      ? "border-red-500/40" 
      : urgencyLevel === "medium" 
        ? "border-orange-500/30" 
        : "border-purple-500/30";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`glass-panel glow-halo border-2 ${borderClass} overflow-hidden`} 
        data-testid="due-flashcards-card"
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <motion.div 
              className={`p-2.5 rounded-lg bg-gradient-to-br ${gradientClass} shadow-lg`}
              animate={{ 
                scale: urgencyLevel === "high" ? [1, 1.05, 1] : 1 
              }}
              transition={{ 
                duration: 1.5, 
                repeat: urgencyLevel === "high" ? Infinity : 0 
              }}
            >
              <Layers className="h-5 w-5 text-white" />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm">Flashcards Due</h4>
                <Badge 
                  className={`bg-gradient-to-r ${gradientClass} text-white border-none text-xs`}
                  data-testid="badge-due-count"
                >
                  {dueCount}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {urgencyLevel === "high" 
                  ? "Many cards need review!" 
                  : urgencyLevel === "medium"
                    ? "Good time to review"
                    : "Keep your streak going"}
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => setLocation("/flashcards")}
              className={`bg-gradient-to-r ${gradientClass} hover:opacity-90 gap-1`}
              data-testid="button-review-flashcards"
            >
              <Brain className="h-3 w-3" />
              Review
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
