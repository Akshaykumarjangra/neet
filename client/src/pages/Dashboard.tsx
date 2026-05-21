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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import BookingModal, { type MentorForBooking } from "@/components/mentors/BookingModal";
import { MentorCard, type MentorCardData } from "@/components/mentors/MentorCard";
import { BookOpen, Dna, FlaskConical, Calendar, Trophy, Target, Loader2, Layers, TrendingUp, Zap, ChevronRight } from "lucide-react";
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

import { NextBestAction } from "@/components/NextBestAction";
import { LeadMagnetSection } from "@/components/LeadMagnetSection";
import { DailyPlanCard } from "@/components/DailyPlanCard";
import { RankCard } from "@/components/RankCard";
import { OnboardingModal, useOnboarding } from "@/components/OnboardingModal";
import { Seo } from "@/components/Seo";
import { NotificationManager } from "@/components/NotificationManager";

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

interface BookingTimelineEntry {
  label: string;
  status: "requested" | "confirmed" | "cancelled";
  at: string;
}

interface StudentBooking {
  id: number;
  mentorId: number;
  mentorName: string | null;
  mentorAvatar?: string | null;
  startAt: string;
  endAt: string;
  status: "requested" | "confirmed" | "completed" | "cancelled";
  meetingLink?: string | null;
  priceCents?: number;
  createdAt: string;
  updatedAt: string;
  timeline?: BookingTimelineEntry[];
}

interface MentorRecommendation extends MentorForBooking {
  userHeadline: string | null;
  avgRating: number | null;
  totalSessionsCompleted: number;
}

export default function Dashboard() {
  const [activeSubject, setActiveSubject] = useState("Physics");
  const [, setLocation] = useLocation();
  const { points, level, streak, updateStreak } = useGamification();
  const { toast } = useToast();
  const { user } = useAuth();
  const { showOnboarding, closeOnboarding, updatePreferences, isNewUser, triggerOnboarding } = useOnboarding();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<MentorForBooking | null>(null);

  useEffect(() => {
    if (isNewUser) {
      triggerOnboarding();
    }
  }, [isNewUser]);

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
      const response = await fetch('/api/game/leaderboard?scope=india', { credentials: 'include' });
      if (!response.ok) return [];
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!user?.id,
  });

  const {
    data: studentBookings = [],
    isLoading: bookingsLoading,
    refetch: refetchBookings,
  } = useQuery<StudentBooking[]>({
    queryKey: ['/api/bookings', 'student'],
    queryFn: async () => {
      const response = await fetch('/api/bookings', { credentials: 'include' });
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!user?.id,
    staleTime: 60 * 1000,
  });

  const { data: mentorRecommendations } = useQuery<{
    topRated: MentorCardData[];
    trending: MentorCardData[];
    trendingSubjects: Array<{ subject: string; count: number }>;
  }>({
    queryKey: ['/api/mentors/recommendations'],
    queryFn: async () => {
      const response = await fetch('/api/mentors/recommendations', { credentials: 'include' });
      if (!response.ok) return { topRated: [], trending: [], trendingSubjects: [] };
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const userPosition = leaderboardData?.find((entry: any) => entry.id === user?.id);

  const sortedBookings = [...studentBookings].sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  const upcomingBookings = sortedBookings.filter((b) => b.status === "requested" || b.status === "confirmed");
  const pendingBookings = upcomingBookings.filter((b) => b.status === "requested");
  const confirmedBookings = upcomingBookings.filter((b) => b.status === "confirmed");
  const nextBooking = upcomingBookings[0];
  const recommendedMentors = mentorRecommendations?.topRated?.slice(0, 3) || [];

  const openQuickBook = (mentor: MentorCardData) => {
    if (!mentor || !mentor.id || !mentor.userName) {
      toast({ title: "Error", description: "Invalid mentor data provided.", variant: "destructive" });
      return;
    }
    setSelectedMentor({
      id: mentor.id,
      userName: mentor.userName,
      userAvatar: (mentor as any).userAvatar ?? null,
      subjects: mentor.subjects || [],
      hourlyRate: mentor.hourlyRate || 0,
    });
    setBookingModalOpen(true);
  };

  const quickBookFirst = () => {
    if (recommendedMentors && recommendedMentors.length > 0) {
      openQuickBook(recommendedMentors[0]);
    } else {
      setLocation('/mentors');
    }
  };

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

  const isDashboardLoading = statsLoading || achievementsLoading || challengesLoading || bookingsLoading;

  if (isDashboardLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Seo 
        title="Dashboard | ZERO AI NEET Prep"
        description="Track your NEET preparation progress, daily challenges, and mock test scores."
      />
      <div className="min-h-screen bg-background gradient-mesh-bg overflow-x-hidden">
        <Header
          activeSubject={activeSubject}
          onSubjectChange={setActiveSubject}
          userPoints={points}
          userLevel={level}
          studyStreak={streak}
        />
        <NotificationManager />

        <HeroSection
          onGetStarted={() => setLocation('/learning-path')}
          onTakeMockTest={() => setLocation('/mock-tests')}
        />

        <main className="container mx-auto px-4 py-12 max-w-7xl space-y-12 overflow-hidden">
          <section className="max-w-full">
            <h2 className="text-3xl font-bold mb-6 truncate">Your Progress</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 overflow-hidden">
                <DashboardMetrics
                  questionsSolved={userStats?.totalAttempts || 0}
                  accuracy={userStats?.accuracy || 0}
                  studyStreak={streak}
                  mockTestScore={485}
                />
              </div>
              <div className="max-w-full overflow-hidden">
                {achievementsError || challengesError ? (
                  <Card className="border-destructive">
                    <CardHeader>
                      <CardTitle className="text-destructive truncate">Error Loading Data</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground break-words">
                        {achievementsError && "Failed to load achievements. "}
                        {challengesError && "Failed to load daily challenges. "}
                      </p>
                      <div className="flex flex-wrap gap-2">
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

          <section className="max-w-full overflow-hidden">
            <NextBestAction />
          </section>

          {/* Daily Plan + Rank Card Widgets (Phase 1-7) */}
          <section className="grid gap-6 lg:grid-cols-2 max-w-full overflow-hidden">
            <div className="overflow-hidden">
              <DailyPlanCard />
            </div>
            <div className="overflow-hidden">
              <RankCard
                name={user?.displayName || "Student"}
                rank={userPosition?.rank || 0}
                streak={streak}
                accuracy={userStats?.accuracy || 0}
                code={(user as any)?.referralCode || "NEET100"}
              />
            </div>
          </section>

          <section className="max-w-full overflow-hidden">
            <h2 className="text-3xl font-bold mb-6 truncate">Subjects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {subjects.map((subject, index) => {
                const floatClass = index % 3 === 0 ? 'float-gentle' : index % 3 === 1 ? 'float-medium' : 'float-slow';
                return (
                  <div key={subject.name} className={`cursor-pointer ${floatClass} max-w-full overflow-hidden`}>
                    <SubjectCard
                      subject={subject.name}
                      icon={subject.icon}
                      progress={subject.progress}
                      totalQuestions={subject.total}
                      solvedQuestions={subject.solved}
                      color={subject.color}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          <section className="max-w-full overflow-hidden">
            <LeadMagnetSection />
          </section>

          <div className="grid gap-6 lg:grid-cols-2 max-w-full overflow-hidden">
            <div className="overflow-hidden">
              <ProgressChart />
            </div>

            <Card className="max-w-full overflow-hidden">
              <CardHeader>
                <CardTitle className="truncate">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start gap-2 truncate"
                  variant="outline"
                  onClick={() => setLocation("/syllabus")}
                >
                  <BookOpen className="h-4 w-4 shrink-0" />
                  <span className="truncate">Complete Syllabus</span>
                </Button>
                <Button
                  className="w-full justify-start gap-2 truncate"
                  variant="outline"
                  data-testid="button-daily-practice"
                  onClick={() => setLocation('/practice')}
                >
                  <BookOpen className="h-4 w-4 shrink-0" />
                  <span className="truncate">Start Daily Practice</span>
                </Button>
                <Button
                  className="w-full justify-start gap-2 truncate"
                  variant="outline"
                  data-testid="button-flashcards"
                  onClick={() => setLocation('/flashcards')}
                >
                  <Layers className="h-4 w-4 shrink-0" />
                  <span className="truncate">Interactive Flashcards</span>
                </Button>
                <Button
                  className="w-full justify-start gap-2 truncate"
                  variant="outline"
                  onClick={() => setLocation('/build-test')}
                >
                  <Target className="h-4 w-4 shrink-0" />
                  <span className="truncate">Build Custom Test</span>
                </Button>
                <Button
                  className="w-full justify-start gap-2 truncate"
                  variant="outline"
                  data-testid="button-mock-test"
                  onClick={() => setLocation('/mock-tests')}
                >
                  <Target className="h-4 w-4 shrink-0" />
                  <span className="truncate">Take Mock Test</span>
                </Button>
                <Button className="w-full justify-start gap-2 truncate" variant="outline" data-testid="button-weak-areas">
                  <TrendingUp className="h-4 w-4 shrink-0" />
                  <span className="truncate">Review Weak Areas</span>
                </Button>
                <Button className="w-full justify-start gap-2 truncate" variant="outline" data-testid="button-study-plan">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span className="truncate">View Study Plan</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          <section className="grid gap-6 lg:grid-cols-2 max-w-full">
            <Card className="max-w-full overflow-hidden">
              <CardHeader>
                <CardTitle className="flex flex-wrap items-center justify-between gap-2">
                  <span className="truncate">Mentor Sessions</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {nextBooking && (
                      <Badge variant="outline" className="max-w-full truncate">
                        Next: {new Date(nextBooking.startAt).toLocaleDateString()} at {new Date(nextBooking.startAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </Badge>
                    )}
                    {upcomingBookings.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setLocation('/my-bookings')}
                        className="h-auto py-1 text-xs"
                      >
                        View All
                      </Button>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-muted/40 overflow-hidden">
                    <div className="text-xs text-muted-foreground truncate">Pending</div>
                    <div className="text-xl font-semibold">{pendingBookings.length}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 overflow-hidden">
                    <div className="text-xs text-muted-foreground truncate">Confirmed</div>
                    <div className="text-xl font-semibold">{confirmedBookings.length}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/40 overflow-hidden">
                    <div className="text-xs text-muted-foreground truncate">Total</div>
                    <div className="text-xl font-semibold">{upcomingBookings.length}</div>
                  </div>
                </div>

                {bookingsLoading ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin shrink-0" /> <span className="truncate">Loading bookings...</span>
                  </div>
                ) : upcomingBookings.length > 0 ? (
                  <div className="space-y-3 overflow-hidden">
                    {upcomingBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-3 max-w-full overflow-hidden">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <Avatar className="h-9 w-9 shrink-0">
                              <AvatarImage src={booking.mentorAvatar || undefined} />
                              <AvatarFallback>{booking.mentorName?.charAt(0) || "M"}</AvatarFallback>
                            </Avatar>
                            <div className="overflow-hidden">
                              <div className="font-medium truncate">{booking.mentorName || "Mentor"}</div>
                              <div className="text-xs text-muted-foreground truncate">
                                {new Date(booking.startAt).toLocaleDateString()} · {new Date(booking.startAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </div>
                            </div>
                          </div>
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"} className="shrink-0">{booking.status}</Badge>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                          {booking.timeline?.map((step) => (
                            <Badge key={`${booking.id}-${step.status}`} variant="outline" className="text-[10px] whitespace-nowrap shrink-0">
                              {step.label} · {new Date(step.at).toLocaleString([], { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" })}
                            </Badge>
                          )) || (
                              <Badge variant="outline" className="text-[10px] shrink-0">Requested</Badge>
                            )}
                          {booking.meetingLink && (
                            <Badge variant="secondary" className="text-[10px] shrink-0">Link ready</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground break-words">No upcoming mentor bookings yet.</p>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  <Button size="sm" onClick={quickBookFirst} className="shrink-0">
                    Quick book
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setLocation('/mentors')} className="shrink-0">
                    Browse mentors
                  </Button>
                  {upcomingBookings.length > 0 && (
                    <Button size="sm" variant="outline" onClick={() => setLocation('/my-bookings')} className="shrink-0">
                      View All
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="max-w-full overflow-hidden">
              <CardHeader>
                <CardTitle className="flex flex-wrap items-center justify-between gap-2">
                  <span className="truncate">Mentor Recommendations</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLocation("/mentors")}
                    className="text-xs h-auto py-1 shrink-0"
                  >
                    View All
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="max-w-full overflow-hidden">
                {mentorRecommendations ? (
                  recommendedMentors.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 overflow-hidden">
                      {recommendedMentors.map((mentor) => (
                        <div key={mentor.id} className="max-w-full overflow-hidden">
                          <MentorCard
                            mentor={mentor}
                            size="compact"
                            onViewProfile={() => setLocation(`/mentors/${mentor.id}`)}
                            onBookSession={() => openQuickBook(mentor)}
                            showQuickBook={true}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4 truncate">No recommendations yet.</p>
                  )
                ) : (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-4 truncate">
                    <Loader2 className="h-4 w-4 animate-spin shrink-0" /> Loading mentor picks...
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Leaderboard and Daily Challenges Section */}
          <section className="max-w-full overflow-hidden">
            <h2 className="text-3xl font-bold mb-6 truncate">🎯 Today's Challenges & Rankings</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="overflow-hidden">
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
              </div>

              <div className="overflow-hidden">
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
            </div>
          </section>

          <section className="max-w-full overflow-hidden">
            <h2 className="text-3xl font-bold mb-6 truncate">Interactive Learning</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="overflow-hidden">
                <ThreeDViewer title="Atomic Structure - Carbon Atom" />
              </div>
              <div className="overflow-hidden">
                <PhETEmbed
                  title="Projectile Motion Simulation"
                  simUrl="https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html"
                  subject="Physics"
                  description="Explore projectile motion by firing various objects. Adjust angle, speed, and observe trajectories."
                />
              </div>
            </div>
          </section>

          <BookingModal
            mentor={selectedMentor}
            open={bookingModalOpen}
            onOpenChange={(open) => {
              setBookingModalOpen(open);
              if (!open) setSelectedMentor(null);
            }}
            onBooked={() => refetchBookings()}
          />
          
          <OnboardingModal 
            isOpen={showOnboarding} 
            onClose={closeOnboarding} 
            onComplete={updatePreferences} 
            userName={user?.name || "Student"} 
          />
        </main>
      </div>
    </ThemeProvider>
  );
}
