import { motion } from "framer-motion";
import { Trophy, Lock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface SeasonProgressBarProps {
  currentTier: number;
  totalXp: number;
  nextTierXp: number;
  maxTier: number;
  seasonName: string;
  isPremium?: boolean;
}

export function SeasonProgressBar({
  currentTier,
  totalXp,
  nextTierXp,
  maxTier,
  seasonName,
  isPremium = false,
}: SeasonProgressBarProps) {
  const progress = (totalXp / nextTierXp) * 100;
  const tierRewards = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  return (
    <Card className="glass-panel glow-halo overflow-hidden" data-testid="season-progress-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{seasonName}</h3>
              <p className="text-sm text-muted-foreground">
                Tier {currentTier} / {maxTier}
              </p>
            </div>
          </div>
          {isPremium && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none">
              <Star className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>

        {/* XP Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {totalXp.toLocaleString()} / {nextTierXp.toLocaleString()} XP
            </span>
            <span className="font-semibold text-purple-500">
              {Math.floor(progress)}%
            </span>
          </div>
          <div className="relative">
            <Progress value={progress} className="h-3 bg-muted" data-testid="xp-progress-bar" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Tier Rewards Preview */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tierRewards.map((tier) => (
            <motion.div
              key={tier}
              whileHover={{ scale: 1.1 }}
              className={`flex-shrink-0 w-12 h-12 rounded-lg border-2 flex items-center justify-center ${
                currentTier >= tier
                  ? "bg-gradient-to-br from-purple-500 to-pink-500 border-purple-400"
                  : "bg-muted border-muted-foreground/20"
              }`}
              data-testid={`tier-reward-${tier}`}
            >
              {currentTier >= tier ? (
                <Star className="h-5 w-5 text-white fill-white" />
              ) : (
                <Lock className="h-4 w-4 text-muted-foreground" />
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
