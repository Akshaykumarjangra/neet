import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LiveStatsTicker } from "@/components/game/LiveStatsTicker";
import { SeasonProgressBar } from "@/components/game/SeasonProgressBar";
import { DropIntoChapter } from "@/components/game/DropIntoChapter";
import { DailyChallengeCard } from "@/components/game/DailyChallengeCard";
import { LeaderboardPreview } from "@/components/game/LeaderboardPreview";
import { XpGainAnimation } from "@/components/game/XpGainAnimation";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { NextBestAction } from "@/components/NextBestAction";
import { OnboardingModal, useOnboarding } from "@/components/OnboardingModal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useGamification } from "@/hooks/useGamification";
import { useAuth } from "@/hooks/useAuth";
import { Atom, Flame, Leaf, Dog, Loader2, Crown, Star, Zap, Dna, Compass, GraduationCap } from "lucide-react";
import confetti from "canvas-confetti";

interface UserStats {
  totalAttempts: number;
  correctAnswers: number;
  accuracy: number;
  subjectStats: {
    subject: string;
    accuracy: number;
    correct: number;
    total: number;
  }[];
}

export default function GameLobbyDashboard() {
  const [, setLocation] = useLocation();
  const { points, level, streak, updateStreak } = useGamification();
  const { user } = useAuth();
  const [showXpGain, setShowXpGain] = useState(false);
  const [xpGainAmount, setXpGainAmount] = useState(0);

  const {
    showOnboarding,
    setShowOnboarding,
    isNewUser,
    preferences,
    updatePreferences,
  } = useOnboarding();

  // Update streak on mount
  useEffect(() => {
    updateStreak();
  }, []);

  // Trigger onboarding for new users
  useEffect(() => {
    if (user && isNewUser) {
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, isNewUser, setShowOnboarding]);

  // Fetch user statistics
  const { data: userStats, isLoading: statsLoading } = useQuery<UserStats>({
    queryKey: ['/api/stats/user', user?.id],
    enabled: !!user?.id,
  });

  // Fetch daily challenges
  const { data: dailyChallengesData = [] } = useQuery<Array<{
    id: string;
    title: string;
    description: string;
    reward: number;
    xpReward: number;
    progress: number;
    target: number;
    completed: boolean;
  }>>({
    queryKey: ['/api/game/challenges/daily'],
    enabled: !!user?.id,
  });

  // Transform daily challenges to match component interface
  const dailyChallenges = dailyChallengesData.length > 0
    ? dailyChallengesData.map(dc => ({
      id: parseInt(dc.id) || 0,
      title: dc.title,
      description: dc.description,
      progress: dc.progress,
      target: dc.target,
      xpReward: dc.xpReward,
      completed: dc.completed
    }))
    : [
      {
        id: 1,
        title: "Complete 10 Practice Questions",
        description: "Solve 10 questions from any subject",
        progress: 3,
        target: 10,
        xpReward: 50,
        completed: false
      },
      {
        id: 2,
        title: "Study for 30 Minutes",
        description: "Spend at least 30 minutes learning today",
        progress: 15,
        target: 30,
        xpReward: 30,
        completed: false
      },
      {
        id: 3,
        title: "Maintain Your Streak",
        description: "Log in and study every day",
        progress: user?.studyStreak || 0,
        target: (user?.studyStreak || 0) + 1,
        xpReward: 20,
        completed: false
      }
    ];

  // Fetch leaderboard (India scope for preview)
  const { data: leaderboardData = [] } = useQuery<any[]>({
    queryKey: ['/api/game/leaderboard', 'india'],
    queryFn: async () => {
      const response = await fetch('/api/game/leaderboard?scope=india');
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      return response.json();
    },
    enabled: !!user?.id,
  });

  // Fetch user's rank
  const { data: userRank } = useQuery<{ rank: number; points: number }>({
    queryKey: ['/api/game/leaderboard/rank', user?.id],
    enabled: !!user?.id,
  });

  // Fetch chapter counts from library
  const { data: libraryData, isLoading: libraryLoading } = useQuery<Array<{
    subject: string;
    classLevel: string;
    chapterNumber: number;
  }>>({
    queryKey: ['/api/lms/library'],
    enabled: !!user?.id,
  });

  // Calculate chapter counts per subject
  const chapterCounts = {
    Physics: libraryData?.filter(ch => ch.subject === 'Physics').length ?? 30,
    Chemistry: libraryData?.filter(ch => ch.subject === 'Chemistry').length ?? 30,
    Biology: libraryData?.filter(ch => ch.subject === 'Biology').length ?? 38,
  };

  const leaderboardPlayers = leaderboardData.slice(0, 5);

  const handleSubjectDrop = (subject: string) => {
    setXpGainAmount(25);
    setShowXpGain(true);

    // Epic confetti celebration
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#a855f7", "#ec4899", "#3b82f6", "#10b981", "#f59e0b"],
    });

    setTimeout(() => {
      setLocation(`/${subject.toLowerCase()}`);
    }, 800);
  };

  // Welcome celebration on first load
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }, 500);
      sessionStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  if (statsLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Loading game lobby...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background gradient-mesh-bg">
        <Header
          activeSubject="Dashboard"
          onSubjectChange={() => { }}
          userPoints={points}
          userLevel={level}
          studyStreak={streak}
        />

        <OnboardingModal
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={updatePreferences}
          userName={user?.username || user?.name || "Student"}
        />

        <XpGainAnimation
          amount={xpGainAmount}
          trigger={showXpGain}
          onComplete={() => setShowXpGain(false)}
        />

        <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl space-y-6 md:space-y-8">
          {/* Epic Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden"
          >
            <Card className="glass-panel glow-halo border-2 border-purple-500/30">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                      <Crown className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                        Welcome to the Arena, {user?.username}!
                      </h1>
                      <p className="text-lg text-muted-foreground mt-2">
                        Choose your battlefield and dominate the NEET exam
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg px-4 py-2">
                      <Star className="h-5 w-5 mr-2" />
                      Level {level}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-4 py-2">
                      <Zap className="h-5 w-5 mr-2" />
                      {points.toLocaleString()} XP
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Best Action - Top Priority */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <NextBestAction />
          </motion.div>

          {/* Live Stats Ticker */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <LiveStatsTicker />
          </motion.div>

          {/* Season Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SeasonProgressBar
              currentTier={Math.floor(level / 2)}
              totalXp={points}
              nextTierXp={level * 1000}
              maxTier={50}
              seasonName="NEET Season 2025"
              isPremium={false}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Drop Into Chapters */}
            <div className="lg:col-span-2 space-y-6">
              <div className="mb-4">
                <h2 className="text-3xl font-bold">Choose Your Map</h2>
              </div>

              <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full min-h-[140px]"
                >
                  <DropIntoChapter
                    subject="Physics"
                    icon={Atom}
                    chapters={chapterCounts.Physics}
                    iconColor="from-blue-500 to-cyan-500"
                    isUnlocked={true}
                    onDrop={() => handleSubjectDrop('Physics')}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full min-h-[140px]"
                >
                  <DropIntoChapter
                    subject="Chemistry"
                    icon={Flame}
                    chapters={chapterCounts.Chemistry}
                    iconColor="from-purple-500 to-pink-500"
                    isUnlocked={true}
                    onDrop={() => handleSubjectDrop('Chemistry')}
                  />
                </motion.div>

                {/* Biology Card - Replaces Botany and Zoology */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className="glass-panel cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20 border-2 border-emerald-500/30 h-full min-h-[140px]"
                    onClick={() => {
                      setLocation('/biology');
                    }}
                    data-testid="card-biology"
                  >
                    <CardContent className="p-6 h-full flex flex-col justify-between">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
                          <Dna className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Biology</h3>
                          <p className="text-sm text-muted-foreground" data-testid="text-biology-chapters">
                            {chapterCounts.Biology} Chapters
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Complete NCERT Coverage</span>
                          <span className="font-medium">Class 11 & 12</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Explore All Content Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Card
                    className="glass-panel cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 border-2 border-purple-500/30 h-full min-h-[140px]"
                    onClick={() => setLocation('/explore')}
                    data-testid="card-explore"
                  >
                    <CardContent className="p-6 h-full flex flex-col justify-center">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center shadow-lg">
                            <Compass className="h-7 w-7 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                              Explore All Content
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Browse all NCERT chapters with topics & visualizations
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:block">
                          <Badge variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                            {chapterCounts.Physics + chapterCounts.Chemistry + chapterCounts.Biology} Chapters
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

              </div>

              {/* Performance Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-8"
              >
                <h3 className="text-2xl font-bold mb-4">Your Combat Stats</h3>
                <DashboardMetrics
                  questionsSolved={userStats?.totalAttempts || 0}
                  accuracy={userStats?.accuracy || 0}
                  studyStreak={streak}
                  mockTestScore={485}
                />
              </motion.div>
            </div>

            {/* Right Column - Challenges & Leaderboard */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <DailyChallengeCard challenges={dailyChallenges} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <LeaderboardPreview
                  players={leaderboardPlayers}
                  currentUserRank={userRank?.rank || 0}
                />
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}