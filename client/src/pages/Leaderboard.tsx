import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, TrendingUp, Crown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useGamification } from "@/hooks/useGamification";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LeaderboardEntry {
  id: string;
  username: string;
  level: number;
  points: number;
  rank: number;
  streak: number;
  location?: string;
}

type RankTier = "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond" | "Master" | "Grandmaster";

const getRankTier = (rank: number): RankTier => {
  if (rank === 1) return "Grandmaster";
  if (rank <= 3) return "Master";
  if (rank <= 10) return "Diamond";
  if (rank <= 50) return "Platinum";
  if (rank <= 100) return "Gold";
  if (rank <= 500) return "Silver";
  return "Bronze";
};

const getTierColor = (tier: RankTier): string => {
  const colors: Record<RankTier, string> = {
    "Grandmaster": "from-purple-600 to-pink-600",
    "Master": "from-yellow-400 to-orange-500",
    "Diamond": "from-cyan-400 to-blue-500",
    "Platinum": "from-slate-300 to-slate-500",
    "Gold": "from-yellow-500 to-yellow-600",
    "Silver": "from-gray-300 to-gray-400",
    "Bronze": "from-orange-700 to-orange-900",
  };
  return colors[tier];
};

const getTierIcon = (rank: number) => {
  if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
  if (rank === 2) return <Trophy className="h-6 w-6 text-gray-300" />;
  if (rank === 3) return <Trophy className="h-6 w-6 text-orange-600" />;
  if (rank <= 10) return <Medal className="h-5 w-5 text-blue-500" />;
  return <Award className="h-5 w-5 text-muted-foreground" />;
};

export default function Leaderboard() {
  const { points, level, streak } = useGamification();
  const { user } = useAuth();
  const [selectedScope, setSelectedScope] = useState<string>("india");

  // Fetch leaderboard data for the selected scope
  const { data: leaderboardData, isLoading, error } = useQuery<LeaderboardEntry[]>({
    queryKey: ['/api/game/leaderboard', selectedScope],
    queryFn: async () => {
      const response = await fetch(`/api/game/leaderboard?scope=${selectedScope}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to fetch leaderboard' }));
        throw new Error(errorData.error || 'Failed to fetch leaderboard');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: false, // Don't retry on 400 errors (missing profile data)
  });

  // Find user's position
  const userPosition = leaderboardData?.find(entry => entry.id === user?.id);
  const userRank = userPosition?.rank || 0;
  const userTier = userRank ? getRankTier(userRank) : "Bronze";

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header
          activeSubject="all"
          onSubjectChange={() => {}}
          userPoints={points}
          userLevel={level}
          studyStreak={streak}
        />

        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Hero Section */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Trophy className="h-10 w-10 text-primary" />
                Global Leaderboard
              </h1>
              <p className="text-muted-foreground">
                Compete with students across your school, city, state, and all of India!
              </p>
            </motion.div>
          </div>

          {/* User Rank Card */}
          {userPosition && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-primary">
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                          {user?.username?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">{user?.username}</h3>
                          <Badge className={`bg-gradient-to-r ${getTierColor(userTier)} text-white border-0`}>
                            {userTier}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">Level {level} • {points} XP</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary">#{userRank}</p>
                        <p className="text-sm text-muted-foreground">Rank</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-orange-500">{streak}</p>
                        <p className="text-sm text-muted-foreground">Streak</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Leaderboard Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedScope} onValueChange={setSelectedScope}>
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="school" data-testid="tab-school">School</TabsTrigger>
                  <TabsTrigger value="city" data-testid="tab-city">City</TabsTrigger>
                  <TabsTrigger value="state" data-testid="tab-state">State</TabsTrigger>
                  <TabsTrigger value="india" data-testid="tab-india">India</TabsTrigger>
                </TabsList>

                {/* Only render the active scope's content */}
                <TabsContent value={selectedScope} className="space-y-3">
                  {isLoading ? (
                    <div className="text-center py-12 text-muted-foreground">
                      Loading rankings...
                    </div>
                  ) : error ? (
                    <div className="text-center py-12">
                      <p className="text-destructive font-semibold mb-2">
                        {error instanceof Error ? error.message : 'Failed to load leaderboard'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Complete your profile to view {selectedScope} rankings
                      </p>
                    </div>
                  ) : leaderboardData && leaderboardData.length > 0 ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedScope}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                      >
                          {leaderboardData.map((entry, index) => {
                            const tier = getRankTier(entry.rank);
                            const isCurrentUser = entry.id === user?.id;

                            return (
                              <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                              >
                                <Card className={`hover-elevate ${isCurrentUser ? 'border-primary bg-primary/5' : ''}`}>
                                  <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-4 flex-1">
                                        <div className="flex items-center gap-2 min-w-[60px]">
                                          {getTierIcon(entry.rank)}
                                          <span className="text-lg font-bold">#{entry.rank}</span>
                                        </div>

                                        <Avatar className="h-10 w-10">
                                          <AvatarFallback className="bg-muted">
                                            {entry.username.substring(0, 2).toUpperCase()}
                                          </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1">
                                          <div className="flex items-center gap-2">
                                            <span className="font-semibold">{entry.username}</span>
                                            {isCurrentUser && (
                                              <Badge variant="outline" className="text-xs">You</Badge>
                                            )}
                                          </div>
                                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <span>Level {entry.level}</span>
                                            <span>•</span>
                                            <span>{entry.streak} day streak</span>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-4">
                                        <Badge className={`bg-gradient-to-r ${getTierColor(tier)} text-white border-0`}>
                                          {tier}
                                        </Badge>
                                        <div className="text-right">
                                          <p className="text-xl font-bold text-primary">{entry.points.toLocaleString()}</p>
                                          <p className="text-xs text-muted-foreground">XP</p>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            );
                        })}
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      No rankings available for this scope yet.
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </ThemeProvider>
  );
}
