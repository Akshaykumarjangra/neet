import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Star, Zap } from "lucide-react";

interface DailyChallenge {
  id: number;
  title: string;
  description: string;
  progress: number;
  target: number;
  xpReward: number;
  completed: boolean;
}

interface DailyChallengeCardProps {
  challenges: DailyChallenge[];
}

export function DailyChallengeCard({ challenges }: DailyChallengeCardProps) {
  const completedCount = challenges.filter(c => c.completed).length;
  const totalCount = challenges.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <Card className="glass-panel-strong glow-halo border-2 border-primary/20" data-testid="daily-challenges-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 shadow-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            Daily Challenges
          </CardTitle>
          <Badge variant="outline" className="text-sm border-orange-500/50 text-orange-600 dark:text-orange-400">
            <Clock className="h-3 w-3 mr-1" />
            Resets in 12h
          </Badge>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {completedCount} / {totalCount} Completed
            </p>
            <p className="text-sm font-semibold text-primary">
              {completionPercentage.toFixed(0)}%
            </p>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {challenges.map((challenge) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 rounded-lg border-2 transition-all ${challenge.completed
                ? "bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/50"
                : "bg-background/50 border-muted"
              }`}
            data-testid={`challenge-${challenge.id}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{challenge.title}</h4>
                  {challenge.completed && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{challenge.description}</p>
              </div>
              <Badge
                variant={challenge.completed ? "default" : "secondary"}
                className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none"
              >
                <Star className="h-3 w-3 mr-1" />
                +{challenge.xpReward} XP
              </Badge>
            </div>

            {!challenge.completed && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span className="font-medium">
                    {challenge.progress} / {challenge.target}
                  </span>
                </div>
                <Progress
                  value={(challenge.progress / challenge.target) * 100}
                  className="h-2"
                  data-testid={`challenge-progress-${challenge.id}`}
                />
              </div>
            )}
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
