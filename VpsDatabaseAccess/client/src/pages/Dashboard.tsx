import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SubjectCard } from "@/components/SubjectCard";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { ProgressChart } from "@/components/ProgressChart";
import { ThreeDViewer } from "@/components/ThreeDViewer";
import { PhETEmbed } from "@/components/PhETEmbed";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GamificationPanel } from "@/components/GamificationPanel";
import { DailyChallengeCard } from "@/components/game/DailyChallengeCard";
import { LeaderboardPreview } from "@/components/game/LeaderboardPreview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Dna, FlaskConical, Calendar, Trophy, Target, Loader2, Layers, TrendingUp, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useGamification } from "@/hooks/useGamification";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

import physicsIcon from "@assets/generated_images/Physics_subject_icon_5641b5eb.png";
import chemistryIcon from "@assets/generated_images/Chemistry_subject_icon_f3b65af3.png";
import botanyIcon from "@assets/generated_images/Botany_subject_icon_f51f8d03.png";
import zoologyIcon from "@assets/generated_images/Zoology_subject_icon_879d7407.png";

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

interface UserAchievement {
  id: number;
  userId: string;
  achievementId: number;
  unlockedAt: Date | string;
  achievement: {
    id: number;
    name: string;
    description: string;
    icon: string;
    category: string;
    xpReward: number;
    rarity: string;
  };
}

interface UserDailyChallenge {
  id: number;
  userId: string;
  challengeId: number;
  progress: number;
  completed: boolean;
  completedAt: Date | string | null;
  challenge: {
    id: number;
    challengeDate: Date | string;
    title: string;
    description: string;
    targetType: string;
    targetValue: number;
    xpReward: number;
    subject: string | null;
  };
}

export default function Dashboard() {
  const [activeSubject, setActiveSubject] = useState("Physics");
  const [, setLocation] = useLocation();
  const { points, level, streak, updateStreak } = useGamification();
  const { toast } = useToast();
  const { user } = useAuth();

  // Update streak on component mount
  useEffect(() => {
    updateStreak();
  }, []);

  // Listen for level-up events
  useEffect(() => {
    const handleLevelUp = (event: CustomEvent) => {
      const { level } = event.detail;
      toast({
        title: "🎊 Level Up!",
        description: `Congratulations! You've reached Level ${level}!`,
        duration: 5000,
      });
    };

    window.addEventListener('levelUp', handleLevelUp as EventListener);
    return () => {
      window.removeEventListener('levelUp', handleLevelUp as EventListener);
    };
  }, []);

  // Fetch user statistics
  const { data: userStats, isLoading: statsLoading } = useQuery<UserStats>({
    queryKey: ['/api/stats/user', user?.id],
    enabled: !!user?.id,
  });

  // Fetch all topics to count total questions
  const { data: topics } = useQuery({
    queryKey: ['/api/topics'],
  });

  // Fetch user achievements
  const {
    data: userAchievements = [],
    isLoading: achievementsLoading,
    isError: achievementsError,
    refetch: refetchAchievements
  } = useQuery<UserAchievement[]>({
    queryKey: ['/api/gamification/achievements', user?.id],
    enabled: !!user?.id,
  });

  // Fetch daily challenges
  const {
    data: dailyChallenges = [],
    isLoading: challengesLoading,
    isError: challengesError,
    refetch: refetchChallenges
  } = useQuery<UserDailyChallenge[]>({
    queryKey: ['/api/gamification/daily-challenges', user?.id],
    enabled: !!user?.id,
  });

  // Fetch leaderboard data
  const { data: leaderboardData } = useQuery({
    queryKey: ['/api/game/leaderboard', 'india'],
    queryFn: async () => {
      const response = await fetch('/api/game/leaderboard?scope=india');
      if (!response.ok) return [];
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!user?.id,
  });

  const userPosition = leaderboardData?.find((entry: any) => entry.id === user?.id);

  // Show error toast for gamification data failures
  useEffect(() => {
    if (achievementsError) {
      toast({
        title: "❌ Failed to load achievements",
        description: "Unable to fetch your achievements. Please try again.",
        variant: "destructive",
        action: (
          <Button variant="outline" size="sm" onClick={() => refetchAchievements()}>
            Retry
          </Button>
        ),
      });
    }
  }, [achievementsError, toast]);

  useEffect(() => {
    if (challengesError) {
      toast({
        title: "❌ Failed to load daily challenges",
        description: "Unable to fetch today's challenges. Please try again.",
        variant: "destructive",
        action: (
          <Button variant="outline" size="sm" onClick={() => refetchChallenges()}>
            Retry
          </Button>
        ),
      });
    }
  }, [challengesError, toast]);

  const subjects = [
    {
      name: "Physics",
      icon: physicsIcon,
      progress: 0,
      total: 0,
      solved: 0,
      color: "#3b82f6",
    },
    {
      name: "Chemistry",
      icon: chemistryIcon,
      progress: 0,
      total: 0,
      solved: 0,
      color: "#a855f7",
    },
    {
      name: "Botany",
      icon: botanyIcon,
      progress: 0,
      total: 0,
      solved: 0,
      color: "#22c55e",
    },
    {
      name: "Zoology",
      icon: zoologyIcon,
      progress: 0,
      total: 0,
      solved: 0,
      color: "#f97316",
    },
  ].map((subject) => {
    const subjectStat = userStats?.subjectStats.find((s) => s.subject === subject.name);
    return {
      ...subject,
      solved: subjectStat?.correct || 0,
      total: subjectStat?.total || 0,
      progress: subjectStat?.accuracy || 0,
    };
  });

  if (statsLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Loading your progress...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background gradient-mesh-bg">
        <Header
          activeSubject={activeSubject}
          onSubjectChange={setActiveSubject}
          userPoints={points}
          userLevel={level}
          studyStreak={streak}
        />

        <HeroSection
          onGetStarted={() => setLocation('/learning-path')}
          onTakeMockTest={() => setLocation('/mock-tests')}
        />

        <main className="container mx-auto px-4 py-12 max-w-7xl space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">Your Progress</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <DashboardMetrics
                  questionsSolved={userStats?.totalAttempts || 0}
                  accuracy={userStats?.accuracy || 0}
                  studyStreak={streak}
                  mockTestScore={485}
                />
              </div>
              <div>
                {achievementsLoading || challengesLoading ? (
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Loading gamification data...</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : achievementsError || challengesError ? (
                  <Card className="border-destructive">
                    <CardHeader>
                      <CardTitle className="text-destructive">Error Loading Data</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {achievementsError && "Failed to load achievements. "}
                        {challengesError && "Failed to load daily challenges. "}
                      </p>
                      <div className="flex gap-2">
                        {achievementsError && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => refetchAchievements()}
                            data-testid="button-retry-achievements"
                          >
                            Retry Achievements
                          </Button>
                        )}
                        {challengesError && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => refetchChallenges()}
                            data-testid="button-retry-challenges"
                          >
                            Retry Challenges
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <GamificationPanel
                    currentLevel={level}
                    totalPoints={points}
                    studyStreak={streak}
                    streakFreezes={0}
                    recentAchievements={userAchievements.slice(0, 3).map(ua => ({
                      id: ua.achievement.id,
                      name: ua.achievement.name,
                      icon: ua.achievement.icon,
                      rarity: ua.achievement.rarity,
                      unlockedAt: typeof ua.unlockedAt === 'string' ? ua.unlockedAt : ua.unlockedAt.toISOString()
                    }))}
                    dailyChallengeProgress={{
                      completed: dailyChallenges.filter(c => c.completed).length,
                      total: dailyChallenges.length,
                      todayCompleted: dailyChallenges.every(c => c.completed)
                    }}
                  />
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Subjects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {subjects.map((subject, index) => {
                const floatClass = index % 3 === 0 ? 'float-gentle' : index % 3 === 1 ? 'float-medium' : 'float-slow';
                if (subject.name === "Physics") {
                  return (
                    <div key={subject.name} onClick={() => window.location.href = "/physics"} className={`cursor-pointer ${floatClass}`}>
                      <SubjectCard
                        subject={subject.name}
                        icon={physicsIcon}
                        progress={subject.progress}
                        totalQuestions={subject.total}
                        solvedQuestions={subject.solved}
                        color={subject.color}
                      />
                    </div>
                  );
                }
                if (subject.name === "Chemistry") {
                  return (
                    <div key={subject.name} onClick={() => window.location.href = "/chemistry"} className={`cursor-pointer ${floatClass}`}>
                      <SubjectCard
                        subject={subject.name}
                        icon={chemistryIcon}
                        progress={subject.progress}
                        totalQuestions={subject.total}
                        solvedQuestions={subject.solved}
                        color={subject.color}
                      />
                    </div>
                  );
                }
                // This block handles the merged Biology subject
                if (subject.name === "Botany" || subject.name === "Zoology") {
                  // We only want to render the Biology card once, so we check if it's the first one (Botany)
                  if (subject.name === "Botany") {
                    const botanyStat = userStats?.subjectStats.find((s) => s.subject === "Botany");
                    const zoologyStat = userStats?.subjectStats.find((s) => s.subject === "Zoology");
                    const totalBiologySolved = (botanyStat?.correct || 0) + (zoologyStat?.correct || 0);
                    const totalBiologyQuestions = (botanyStat?.total || 0) + (zoologyStat?.total || 0);
                    const averageBiologyAccuracy = totalBiologyQuestions > 0 ? (totalBiologySolved / totalBiologyQuestions) * 100 : 0;

                    return (
                      <div key="Biology" onClick={() => setLocation('/biology')} className={`cursor-pointer ${floatClass}`}>
                        <SubjectCard
                          subject="Biology"
                          icon={Dna} // Use Dna icon for Biology
                          progress={averageBiologyAccuracy}
                          totalQuestions={totalBiologyQuestions}
                          solvedQuestions={totalBiologySolved}
                          color="#10b981" // A color for Biology, e.g., emerald-500
                        />
                      </div>
                    );
                  }
                  // If it's Zoology, we don't render anything as it's merged into Biology
                  return null;
                }
                return (
                  <SubjectCard
                    key={subject.name}
                    subject={subject.name}
                    icon={subject.icon}
                    progress={subject.progress}
                    totalQuestions={subject.total}
                    solvedQuestions={subject.solved}
                    color={subject.color}
                    onClick={() => setLocation('/practice')}
                  />
                );
              })}
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <ProgressChart />

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start gap-2"
                  variant="outline"
                  onClick={() => setLocation("/syllabus")}
                >
                  <BookOpen className="h-4 w-4" />
                  Complete Syllabus
                </Button>
                <Button
                  className="w-full justify-start gap-2"
                  variant="outline"
                  data-testid="button-daily-practice"
                  onClick={() => setLocation('/practice')}
                >
                  <BookOpen className="h-4 w-4" />
                  Start Daily Practice
                </Button>
                <Button
                  className="w-full justify-start gap-2"
                  variant="outline"
                  data-testid="button-flashcards"
                  onClick={() => setLocation('/flashcards')}
                >
                  <Layers className="h-4 w-4" />
                  Interactive Flashcards
                </Button>
                <Button
                  className="w-full justify-start gap-2"
                  variant="outline"
                  onClick={() => setLocation('/build-test')}
                >
                  <Target className="h-4 w-4" />
                  Build Custom Test
                </Button>
                <Button
                  className="w-full justify-start gap-2"
                  variant="outline"
                  data-testid="button-mock-test"
                  onClick={() => setLocation('/mock-tests')}
                >
                  <Target className="h-4 w-4" />
                  Take Mock Test
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline" data-testid="button-weak-areas">
                  <TrendingUp className="h-4 w-4" />
                  Review Weak Areas
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline" data-testid="button-study-plan">
                  <Calendar className="h-4 w-4" />
                  View Study Plan
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard and Daily Challenges Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">🎯 Today's Challenges & Rankings</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <DailyChallengeCard
                challenges={
                  dailyChallenges.length > 0
                    ? dailyChallenges.map(dc => ({
                      id: dc.id,
                      title: dc.challenge.title,
                      description: dc.challenge.description,
                      progress: dc.progress,
                      target: dc.challenge.targetValue,
                      xpReward: dc.challenge.xpReward,
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
                        progress: streak,
                        target: streak + 1,
                        xpReward: 20,
                        completed: false
                      }
                    ]
                }
              />

              <LeaderboardPreview
                players={[
                  { rank: 1, username: "TopStudent", score: 15420, level: 28, trend: "up" },
                  { rank: 2, username: "QuizMaster", score: 14250, level: 26, trend: "up" },
                  { rank: 3, username: "NeetChamp", score: 13890, level: 25, trend: "same" },
                  { rank: 4, username: "StudyPro", score: 12100, level: 23, trend: "down" },
                  { rank: 5, username: "BrainBox", score: 11500, level: 22, trend: "up" }
                ]}
                currentUserRank={userPosition?.rank}
              />
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Interactive Learning</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <ThreeDViewer title="Atomic Structure - Carbon Atom" />
              <PhETEmbed
                title="Projectile Motion Simulation"
                simUrl="https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html"
                subject="Physics"
                description="Explore projectile motion by firing various objects. Adjust angle, speed, and observe trajectories."
              />
            </div>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}