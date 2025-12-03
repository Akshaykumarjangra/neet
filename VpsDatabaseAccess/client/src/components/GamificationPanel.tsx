import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Zap, 
  Target, 
  Flame, 
  Award,
  Star,
  TrendingUp,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

interface GamificationPanelProps {
  currentLevel: number;
  totalPoints: number;
  studyStreak: number;
  streakFreezes?: number;
  recentAchievements?: Array<{
    id: number;
    name: string;
    icon: string;
    rarity: string;
    unlockedAt: string;
  }>;
  dailyChallengeProgress?: {
    completed: number;
    total: number;
    todayCompleted: boolean;
  };
}

const calculateLevelProgress = (level: number, points: number) => {
  const pointsForCurrentLevel = level * 100;
  const pointsForNextLevel = (level + 1) * 100;
  const progressPoints = points - pointsForCurrentLevel;
  const pointsNeeded = pointsForNextLevel - pointsForCurrentLevel;
  const percentage = Math.min(100, Math.max(0, (progressPoints / pointsNeeded) * 100));
  return {
    percentage,
    current: progressPoints > 0 ? progressPoints : 0,
    needed: pointsNeeded,
    nextLevel: level + 1
  };
};

const getRarityColor = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case 'legendary': return 'bg-yellow-500';
    case 'epic': return 'bg-purple-500';
    case 'rare': return 'bg-blue-500';
    case 'uncommon': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

export function GamificationPanel({
  currentLevel,
  totalPoints,
  studyStreak,
  streakFreezes = 0,
  recentAchievements = [],
  dailyChallengeProgress
}: GamificationPanelProps) {
  const levelProgress = calculateLevelProgress(currentLevel, totalPoints);

  return (
    <div className="space-y-4 float-medium" data-testid="gamification-panel">
      <Card className="glass-panel-strong glow-halo-strong gradient-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary animate-pulse" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Level & XP Display */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400 flex items-center justify-center text-white font-bold text-xl border-4 border-background shadow-lg glow-halo-strong">
                    {currentLevel}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1 border-2 border-primary">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                  </div>
                </motion.div>
                <div>
                  <p className="text-2xl font-bold" data-testid="text-current-level">Level {currentLevel}</p>
                  <p className="text-sm text-muted-foreground">
                    {levelProgress.current}/{levelProgress.needed} XP to Level {levelProgress.nextLevel}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total XP</p>
                <p className="text-2xl font-bold text-primary" data-testid="text-total-xp">{totalPoints}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <Progress value={levelProgress.percentage} className="h-3" data-testid="progress-xp" />
              <p className="text-xs text-muted-foreground text-center">
                {levelProgress.percentage.toFixed(1)}% to next level
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            {/* Daily Streak */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800"
              data-testid="card-streak"
            >
              <div className="flex flex-col items-center gap-2">
                <Flame className={`w-6 h-6 ${studyStreak > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
                <p className="text-2xl font-bold" data-testid="text-streak-count">{studyStreak}</p>
                <p className="text-xs text-muted-foreground text-center">Day Streak</p>
                {streakFreezes > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {streakFreezes} freezes
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800"
              data-testid="card-achievements"
            >
              <div className="flex flex-col items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
                <p className="text-2xl font-bold" data-testid="text-achievement-count">
                  {recentAchievements.length}
                </p>
                <p className="text-xs text-muted-foreground text-center">Achievements</p>
              </div>
            </motion.div>

            {/* Daily Challenges */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800"
              data-testid="card-daily-challenge"
            >
              <div className="flex flex-col items-center gap-2">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                <p className="text-2xl font-bold" data-testid="text-challenge-progress">
                  {dailyChallengeProgress?.completed || 0}/{dailyChallengeProgress?.total || 3}
                </p>
                <p className="text-xs text-muted-foreground text-center">Today's Goals</p>
                {dailyChallengeProgress?.todayCompleted && (
                  <Badge variant="default" className="text-xs">
                    Complete!
                  </Badge>
                )}
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recentAchievements.slice(0, 4).map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card border hover-elevate"
                  data-testid={`achievement-${achievement.id}`}
                >
                  <div className={`w-12 h-12 rounded-full ${getRarityColor(achievement.rarity)} flex items-center justify-center text-white text-xl`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{achievement.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {achievement.rarity}
                      </Badge>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Your Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Current Rank</span>
              <Badge variant="default">Level {currentLevel} Scholar</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Next Milestone</span>
              <span className="font-semibold">{Math.max(0, (Math.ceil(currentLevel / 5) * 5) - currentLevel)} levels away</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Study Consistency</span>
              <span className="font-semibold">{studyStreak > 7 ? 'Excellent' : studyStreak > 3 ? 'Good' : 'Keep Going!'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
