import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { QuickNavigationBar } from "@/components/QuickNavigationBar";
import { Trophy, Medal, Award, TrendingUp, Crown, AlertCircle, RefreshCw, Users } from "lucide-react";
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
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Card key={i} className="hover-elevate">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 flex-1">
                                <Skeleton className="h-6 w-16" />
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="flex-1">
                                  <Skeleton className="h-5 w-32 mb-2" />
                                  <Skeleton className="h-4 w-24" />
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-8 w-16" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : error ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="p-4 rounded-full bg-destructive/10 w-fit mx-auto">
                        <AlertCircle className="h-12 w-12 text-destructive" />
                      </div>
                      <h3 className="text-xl font-semibold">Unable to Load Rankings</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        {error instanceof Error && error.message.includes('profile') 
                          ? `Complete your profile to view ${selectedScope} rankings. Add your location details to compete with others nearby!`
                          : "We couldn't load the leaderboard right now. Please check your connection and try again."}
                      </p>
                      <Button onClick={() => window.location.reload()} className="gap-2" data-testid="button-retry-leaderboard">
                        <RefreshCw className="h-4 w-4" />
                        Try Again
                      </Button>
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
                    <div className="text-center py-12 space-y-4">
                      <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                        <Users className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">No Rankings Yet</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Be the first to climb the {selectedScope} leaderboard! Complete lessons and earn XP to appear here.
                      </p>
                      <Button onClick={() => window.location.href = '/practice'} variant="outline" className="gap-2" data-testid="button-start-earning">
                        <Trophy className="h-4 w-4" />
                        Start Earning XP
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Quick Navigation */}
          <div className="mt-12 pt-8 border-t">
            <QuickNavigationBar currentPath="/leaderboard" />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
