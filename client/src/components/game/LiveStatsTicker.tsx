import { useEffect, useState, useCallback } from "react";
import { Users, Trophy, Zap, Target, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

interface LiveStat {
  id: string;
  icon: typeof Users;
  label: string;
  value: string;
  color: string;
}

interface LiveStats {
  usersOnline: number;
  questionsToday: number;
  activeStreaks: number;
  dailyConquerors: number;
}

export function LiveStatsTicker() {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  // Fetch live stats from API
  const { data: liveStats, isLoading } = useQuery<LiveStats>({
    queryKey: ['/api/game/stats/live'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const stats: LiveStat[] = [
    {
      id: "online",
      icon: Users,
      label: "Students Online",
      value: liveStats?.usersOnline.toLocaleString() || "0",
      color: "text-emerald-500",
    },
    {
      id: "questions",
      icon: Target,
      label: "Questions Answered Today",
      value: liveStats?.questionsToday.toLocaleString() || "0",
      color: "text-blue-500",
    },
    {
      id: "streaks",
      icon: Zap,
      label: "Active Streaks",
      value: liveStats?.activeStreaks.toLocaleString() || "0",
      color: "text-yellow-500",
    },
    {
      id: "toppers",
      icon: Trophy,
      label: "Conquerors Today",
      value: liveStats?.dailyConquerors.toLocaleString() || "0",
      color: "text-purple-500",
    },
  ];

  // Auto-rotate stats - THIS MUST BE AFTER ALL OTHER HOOKS
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [stats.length]);

  // Show loading state WITHOUT early return (after all hooks)
  if (isLoading) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-lg p-4 border border-purple-500/20">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
          <span className="text-sm text-muted-foreground">Loading live stats...</span>
        </div>
      </div>
    );
  }

  const currentStat = stats[currentStatIndex];
  const Icon = currentStat.icon;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-lg p-4 border border-purple-500/20">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStat.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
          data-testid={`live-stat-${currentStat.id}`}
        >
          <div className={`p-2 rounded-lg bg-background/50 ${currentStat.color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{currentStat.label}</p>
            <p className={`text-2xl font-bold ${currentStat.color}`}>{currentStat.value}</p>
          </div>
          <div className="flex gap-1">
            {stats.map((_, index) => (
              <div
                key={index}
                className={`h-1 w-8 rounded-full transition-all ${
                  index === currentStatIndex ? "bg-purple-500" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}