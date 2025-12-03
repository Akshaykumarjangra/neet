import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Medal, Crown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLocation } from "wouter";

interface LeaderboardPlayer {
  rank: number;
  username: string;
  score: number;
  level: number;
  trend: "up" | "down" | "same";
}

interface LeaderboardPreviewProps {
  players: LeaderboardPlayer[];
  currentUserRank?: number;
}

export function LeaderboardPreview({ players, currentUserRank }: LeaderboardPreviewProps) {
  const [, setLocation] = useLocation();
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return "bg-gradient-to-r from-yellow-400 to-orange-500";
    } else if (rank === 2) {
      return "bg-gradient-to-r from-gray-300 to-gray-400";
    } else if (rank === 3) {
      return "bg-gradient-to-r from-amber-500 to-amber-600";
    }
    return "bg-muted";
  };

  return (
    <Card className="glass-panel glow-halo" data-testid="leaderboard-preview">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            Leaderboard
          </CardTitle>
          <Badge variant="outline">This Week</Badge>
        </div>
        {currentUserRank && (
          <p className="text-sm text-muted-foreground">
            Your Rank: <span className="font-bold text-purple-500">#{currentUserRank}</span>
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        {players.map((player, index) => (
          <motion.div
            key={player.username}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              player.rank <= 3 ? getRankBadge(player.rank) : "bg-background/50"
            } ${player.rank <= 3 ? "text-white" : ""}`}
            data-testid={`leaderboard-player-${player.rank}`}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="relative">
                {getRankIcon(player.rank) || (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-bold">#{player.rank}</span>
                  </div>
                )}
              </div>
              
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-sm bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                  {player.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm">{player.username}</p>
                  {player.trend === "up" && (
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                  )}
                </div>
                <p className={`text-xs ${player.rank <= 3 ? "text-white/80" : "text-muted-foreground"}`}>
                  Level {player.level}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold">{player.score.toLocaleString()}</p>
              <p className={`text-xs ${player.rank <= 3 ? "text-white/80" : "text-muted-foreground"}`}>
                points
              </p>
            </div>
          </motion.div>
        ))}
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => setLocation('/leaderboard')}
          className="mt-4 p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center cursor-pointer"
          data-testid="view-full-leaderboard"
        >
          <p className="font-semibold text-sm">View Full Leaderboard</p>
        </motion.div>
      </CardContent>
    </Card>
  );
}
