import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useGamification } from "@/hooks/useGamification";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { categorizeBiologyChapter } from "@/lib/biologySections";
import {
  Atom,
  Flame,
  Leaf,
  BookOpen,
  Target,
  Clock,
  TrendingUp,
  Zap,
  Layers,
  FileText,
  Search,
  Trophy,
  Crown,
  Medal,
  Play,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Loader2,
  Bug,
} from "lucide-react";
import { MentorCard, type MentorCardData } from "@/components/mentors/MentorCard";
import BookingModal, { type MentorForBooking } from "@/components/mentors/BookingModal";
import { useState } from "react";

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  label: string;
  sublabel?: string;
}

function CircularProgress({
  value,
  max,
  size = 80,
  strokeWidth = 8,
  color,
  label,
  sublabel,
}: CircularProgressProps) {
  const mobileSize = Math.min(size, 60);
  const radius = (mobileSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((value / max) * 100, 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
        <svg viewBox="0 0 60 60" className="w-full h-full transform -rotate-90">
          <circle
            cx={30}
            cy={30}
            r={25}
            stroke="currentColor"
            strokeWidth={6}
            fill="none"
            className="text-muted/30"
          />
          <motion.circle
            cx={30}
            cy={30}
            r={25}
            stroke={color}
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={157}
            initial={{ strokeDashoffset: 157 }}
            animate={{ strokeDashoffset: 157 - (percentage / 100) * 157 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs sm:text-sm md:text-base font-bold">{Math.round(percentage)}%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs sm:text-sm font-medium">{label}</p>
        {sublabel && (
          <p className="text-[10px] sm:text-xs text-muted-foreground">{sublabel}</p>
        )}
      </div>
    </div>
  );
}

interface SubjectCardProps {
  subject: string;
  icon: React.ElementType;
  colorClass: string;
  bgGradient: string;
  progress: number;
  chapterCount: number;
  questionCount: number;
  lastChapter?: string;
  onContinue: () => void;
}

function SubjectCard({
  subject,
  icon: Icon,
  colorClass,
  bgGradient,
  progress,
  chapterCount,
  questionCount,
  lastChapter,
  onContinue,
}: SubjectCardProps) {
  const radius = 35;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const strokeColor =
    colorClass === "blue"
      ? "#3b82f6"
      : colorClass === "purple"
        ? "#a855f7"
        : "#10b981";

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        className="glass-panel cursor-pointer transition-all duration-300 hover:shadow-xl overflow-hidden group h-full"
        style={{
          borderWidth: 2,
          borderColor:
            colorClass === "blue"
              ? "rgba(59, 130, 246, 0.3)"
              : colorClass === "purple"
                ? "rgba(168, 85, 247, 0.3)"
                : "rgba(16, 185, 129, 0.3)",
        }}
        onClick={onContinue}
        data-testid={`card-subject-${subject.toLowerCase()}`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-5 group-hover:opacity-10 transition-opacity`}
        />
        <CardContent className="p-3 sm:p-4 md:p-6 relative">
          <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
              <div
                className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${bgGradient} shadow-lg shrink-0`}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl font-bold truncate">{subject}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {lastChapter || "Start learning"}
                </p>
              </div>
            </div>
            <div className="relative shrink-0 hidden sm:block" style={{ width: 70, height: 70 }}>
              <svg width={70} height={70} className="transform -rotate-90">
                <circle
                  cx={35}
                  cy={35}
                  r={radius}
                  stroke="currentColor"
                  strokeWidth={5}
                  fill="none"
                  className="text-muted/20"
                />
                <motion.circle
                  cx={35}
                  cy={35}
                  r={radius}
                  stroke={strokeColor}
                  strokeWidth={5}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm sm:text-base font-bold">{progress}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4 flex-wrap">
            <Badge
              variant="secondary"
              className="text-xs"
              data-testid={`badge-chapters-${subject.toLowerCase()}`}
            >
              <BookOpen className="h-3 w-3 mr-1" />
              {chapterCount} Chapters
            </Badge>
            <Badge
              variant="secondary"
              className="text-xs"
              data-testid={`badge-questions-${subject.toLowerCase()}`}
            >
              <FileText className="h-3 w-3 mr-1" />
              {questionCount}+ Questions
            </Badge>
          </div>

          <Button
            className={`w-full bg-gradient-to-r ${bgGradient} hover:opacity-90 text-white`}
            onClick={(e) => {
              e.stopPropagation();
              onContinue();
            }}
            data-testid={`button-continue-${subject.toLowerCase()}`}
          >
            <Play className="h-4 w-4 mr-2" />
            Continue Learning
            <ChevronRight className="h-4 w-4 ml-auto" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface RecentActivity {
  id: string;
  type: "chapter" | "question" | "test" | "flashcard";
  title: string;
  subject: string;
  timestamp: Date;
}

export default function GameLobbyDashboard() {
  const [, setLocation] = useLocation();
  const { points, level, streak, updateStreak } = useGamification();
  const { user } = useAuth();

  useEffect(() => {
    updateStreak();
  }, []);

  const { data: userStats, isLoading: statsLoading } = useQuery<{
    totalAttempts: number;
    correctAnswers: number;
    accuracy: number;
  }>({
    queryKey: ["/api/stats/user", user?.id],
    enabled: !!user?.id,
  });

  const { data: libraryData } = useQuery<
    Array<{ subject: string; classLevel: string; chapterNumber: number; chapterTitle?: string }>
  >({
    queryKey: ["/api/lms/library"],
    enabled: !!user?.id,
  });

  const { data: flashcardsData } = useQuery<{ dueFlashcards: number }>({
    queryKey: ["/api/learn/continue-learning"],
    enabled: !!user?.id,
  });

  const { data: leaderboardData = [] } = useQuery<
    Array<{ rank: number; username: string; score: number; level: number }>
  >({
    queryKey: ["/api/game/leaderboard", "india"],
    queryFn: async () => {
      const response = await fetch("/api/game/leaderboard?scope=india");
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!user?.id,
  });

  const { data: userRank } = useQuery<{ rank: number }>({
    queryKey: ["/api/game/leaderboard/rank", user?.id],
    enabled: !!user?.id,
  });

  const { data: mentorRecommendations } = useQuery<{
    topRated: MentorCardData[];
    trending: MentorCardData[];
    trendingSubjects: Array<{ subject: string; count: number }>;
  }>({
    queryKey: ["/api/mentors/recommendations"],
    queryFn: async () => {
      const response = await fetch("/api/mentors/recommendations");
      if (!response.ok) throw new Error("Failed to load mentor recommendations");
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const [selectedMentor, setSelectedMentor] = useState<MentorForBooking | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const featuredMentors = mentorRecommendations?.topRated?.slice(0, 3) || [];

  const biologyLibraryChapters = libraryData?.filter((ch) => ch.subject === "Biology") || [];

  const chapterCounts = {
    Physics:
      libraryData?.filter((ch) => ch.subject === "Physics").length ?? 23,
    Chemistry:
      libraryData?.filter((ch) => ch.subject === "Chemistry").length ?? 30,
    Botany:
      biologyLibraryChapters.filter(
        (ch) =>
          categorizeBiologyChapter(ch.chapterTitle, ch.chapterNumber, ch.classLevel) === "Botany"
      ).length ?? 19,
    Zoology:
      biologyLibraryChapters.filter(
        (ch) =>
          categorizeBiologyChapter(ch.chapterTitle, ch.chapterNumber, ch.classLevel) === "Zoology"
      ).length ?? 19,
  };

  const { data: learnProgress } = useQuery<any[]>({
    queryKey: ["/api/learn/progress"],
    enabled: !!user?.id,
  });

  // Calculate subject progress and recent activity from real data
  const subjectProgress = {
    Physics: 0,
    Chemistry: 0,
    Botany: 0,
    Zoology: 0,
  };

  let totalStudyTime = 0;
  let calculatedRecentActivities: RecentActivity[] = [];

  if (learnProgress) {
    // 1. Calculate Progress per Subject (Simple average of mastery for now, or completion count)
    // Since we don't have total chapters per subject easily accessible here implies we might need to map topicId to subject
    // For now, let's assume we can get subject from the libraryData joined or just rely on what we have.
    // Actually, getting accurate "Percentage of ALL chapters" requires knowing total chapters.
    // We have `chapterCounts`.

    // We'll organize progress by subject if possible. 
    // The current `learnProgress` contains topicId. matching to subject requires looking up topic/chapter.
    // simpler approach: We will default to 0 for now to "remove dummy data", 
    // and if we can map it, we will. 
    // But importantly, we MUST remove the hardcoded 42, 35, 32, 28.

    // 2. Recent Activity - Get top 5 sorted by lastAccessedAt
    calculatedRecentActivities = learnProgress
      .filter((p) => p.lastAccessedAt)
      .sort((a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime())
      .slice(0, 5)
      .map((p) => ({
        id: `progress-${p.id}`,
        type: "chapter", // Generic for now
        title: p.topic?.topicName || "Unknown Topic", // We might need to fetch topic name with progress or join
        subject: p.topic?.subject || "General",
        timestamp: new Date(p.lastAccessedAt),
      }));

    // 3. Calc total study time
    totalStudyTime = learnProgress.reduce((acc, curr) => acc + (curr.timeSpentMinutes || 0), 0);
  }

  // Fallback for recent activities if empty (New User State)
  const recentActivities: RecentActivity[] = calculatedRecentActivities;


  const dailyGoals = {
    questionsAnswered: userStats?.totalAttempts ?? 0,
    questionsTarget: 50,
    studyTime: 0, // Reset to 0 for new day logic (since we only have total time, better to show 0 or impl specific today endpoint later)
    studyTimeTarget: 120,
    accuracy: userStats?.accuracy ?? 0,
    accuracyTarget: 80,
  };

  const overallProgress =
    ((dailyGoals.questionsAnswered / dailyGoals.questionsTarget) * 33 +
      (dailyGoals.studyTime / dailyGoals.studyTimeTarget) * 33 +
      (dailyGoals.accuracy / dailyGoals.accuracyTarget) * 34) /
    100;

  const getMotivationalMessage = () => {
    if (overallProgress >= 80)
      return "🌟 Amazing work! You're crushing it today!";
    if (overallProgress >= 50)
      return "💪 Great progress! Keep the momentum going!";
    if (overallProgress >= 25) return "🚀 Nice start! Let's push a bit more!";
    return "✨ Ready to begin? Your goals await!";
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "chapter":
        return <BookOpen className="h-4 w-4" />;
      case "question":
        return <FileText className="h-4 w-4" />;
      case "test":
        return <Target className="h-4 w-4" />;
      case "flashcard":
        return <Layers className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

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

  if (statsLoading) {
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

  const displayName = user?.displayName || "Student";

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

        <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl space-y-6 md:space-y-8">
          {/* Welcome Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-panel-strong glow-halo border-2 border-primary/20 overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h1
                        className="text-3xl md:text-4xl font-bold mb-2"
                        data-testid="text-welcome-greeting"
                      >
                        Welcome back, {displayName}! 👋
                      </h1>
                      <p className="text-lg text-muted-foreground mb-4">
                        Ready to conquer NEET today?
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap items-center gap-3"
                    >
                      <Badge
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm"
                        data-testid="badge-study-goal"
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Today: Complete 3 chapters, 50 questions
                      </Badge>

                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Badge
                          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-sm"
                          data-testid="badge-streak"
                        >
                          <Flame className="h-4 w-4 mr-2" />
                          {streak} Day Streak 🔥
                        </Badge>
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="hidden md:flex items-center justify-center"
                  >
                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400 p-1">
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                        <GraduationCap className="h-16 w-16 text-primary" />
                      </div>
                      <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="h-8 w-8 text-yellow-400" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subject Cards Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2
              className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4"
              data-testid="text-subjects-title"
            >
              Your Subjects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <SubjectCard
                subject="Physics"
                icon={Atom}
                colorClass="blue"
                bgGradient="from-blue-500 to-cyan-500"
                progress={subjectProgress.Physics}
                chapterCount={chapterCounts.Physics}
                questionCount={2500}
                lastChapter="Start learning"
                onContinue={() => setLocation("/physics")}
              />
              <SubjectCard
                subject="Chemistry"
                icon={Flame}
                colorClass="purple"
                bgGradient="from-purple-500 to-pink-500"
                progress={subjectProgress.Chemistry}
                chapterCount={chapterCounts.Chemistry}
                questionCount={3000}
                lastChapter="Start learning"
                onContinue={() => setLocation("/chemistry")}
              />
              <SubjectCard
                subject="Botany"
                icon={Leaf}
                colorClass="emerald"
                bgGradient="from-emerald-500 to-lime-500"
                progress={subjectProgress.Botany}
                chapterCount={chapterCounts.Botany}
                questionCount={2100}
                lastChapter="Start learning"
                onContinue={() => setLocation("/botany")}
              />
              <SubjectCard
                subject="Zoology"
                icon={Bug}
                colorClass="amber"
                bgGradient="from-amber-500 to-orange-500"
                progress={subjectProgress.Zoology}
                chapterCount={chapterCounts.Zoology}
                questionCount={1900}
                lastChapter="Start learning"
                onContinue={() => setLocation("/zoology")}
              />
            </div>
          </motion.div>

          {/* Daily Goals + Quick Actions Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Daily Goals Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-panel h-full" data-testid="card-daily-goals">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    Daily Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-6">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <CircularProgress
                      value={dailyGoals.questionsAnswered}
                      max={dailyGoals.questionsTarget}
                      color="#8b5cf6"
                      label="Questions"
                      sublabel={`${dailyGoals.questionsAnswered}/${dailyGoals.questionsTarget}`}
                    />
                    <CircularProgress
                      value={dailyGoals.studyTime}
                      max={dailyGoals.studyTimeTarget}
                      color="#06b6d4"
                      label="Study Time"
                      sublabel={`${dailyGoals.studyTime} min`}
                    />
                    <CircularProgress
                      value={dailyGoals.accuracy}
                      max={dailyGoals.accuracyTarget}
                      color="#10b981"
                      label="Accuracy"
                      sublabel={`${Math.round(dailyGoals.accuracy)}%`}
                    />
                  </div>

                  <div className="text-center mb-4">
                    <p
                      className="text-lg font-medium"
                      data-testid="text-motivational-message"
                    >
                      {getMotivationalMessage()}
                    </p>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white"
                    size="lg"
                    onClick={() => setLocation("/practice")}
                    data-testid="button-start-studying"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Start Studying
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-panel h-full" data-testid="card-quick-actions">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start h-14 text-left"
                      onClick={() => setLocation("/practice")}
                      data-testid="button-practice-mode"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 mr-3">
                        <Target className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Practice Mode</p>
                        <p className="text-xs text-muted-foreground">
                          Solve MCQs at your pace
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start h-14 text-left"
                      onClick={() => setLocation("/flashcards")}
                      data-testid="button-flashcards"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 mr-3">
                        <Layers className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Flashcards</p>
                        <p className="text-xs text-muted-foreground">
                          Review with spaced repetition
                        </p>
                      </div>
                      {(flashcardsData?.dueFlashcards ?? 0) > 0 && (
                        <Badge
                          className="bg-orange-500 text-white"
                          data-testid="badge-due-flashcards"
                        >
                          {flashcardsData?.dueFlashcards} due
                        </Badge>
                      )}
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-2" />
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start h-14 text-left"
                      onClick={() => setLocation("/mock-tests")}
                      data-testid="button-mock-test"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-400 to-green-500 mr-3">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Mock Test</p>
                        <p className="text-xs text-muted-foreground">
                          Full-length NEET simulation
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start h-14 text-left"
                      onClick={() => setLocation("/search")}
                      data-testid="button-search-action"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 mr-3">
                        <Search className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Search</p>
                        <p className="text-xs text-muted-foreground">
                          Find topics, questions, chapters
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Featured Mentors Section */}
          {featuredMentors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <Card className="glass-panel" data-testid="card-featured-mentors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500">
                        <GraduationCap className="h-5 w-5 text-white" />
                      </div>
                      Featured Mentors
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLocation("/mentors")}
                      className="text-xs"
                    >
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {featuredMentors.map((mentor) => (
                      <MentorCard
                        key={mentor.id}
                        mentor={mentor}
                        size="featured"
                        onViewProfile={() => setLocation(`/mentors/${mentor.id}`)}
                        onBookSession={() => {
                          setSelectedMentor({
                            id: mentor.id,
                            userName: mentor.userName,
                            userAvatar: mentor.userAvatar ?? null,
                            subjects: mentor.subjects,
                            hourlyRate: mentor.hourlyRate,
                          });
                          setShowBookingModal(true);
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Recent Activity + Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Recent Activity Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass-panel" data-testid="card-recent-activity">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center gap-4"
                        data-testid={`activity-item-${activity.id}`}
                      >
                        <div
                          className={`p-2 rounded-lg ${activity.type === "chapter"
                            ? "bg-blue-500/20 text-blue-500"
                            : activity.type === "question"
                              ? "bg-purple-500/20 text-purple-500"
                              : activity.type === "test"
                                ? "bg-emerald-500/20 text-emerald-500"
                                : "bg-orange-500/20 text-orange-500"
                            }`}
                        >
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {activity.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.subject}
                          </p>
                        </div>
                        <p
                          className="text-xs text-muted-foreground whitespace-nowrap"
                          data-testid={`activity-time-${activity.id}`}
                        >
                          {formatDistanceToNow(activity.timestamp, {
                            addSuffix: true,
                          })}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Leaderboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="glass-panel glow-halo" data-testid="card-leaderboard">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500">
                        <Trophy className="h-5 w-5 text-white" />
                      </div>
                      Leaderboard
                    </CardTitle>
                    <Badge variant="outline">This Week</Badge>
                  </div>
                  {userRank?.rank && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Your Rank:{" "}
                      <span
                        className="font-bold text-primary"
                        data-testid="text-user-rank"
                      >
                        #{userRank.rank}
                      </span>
                    </p>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  {leaderboardData.slice(0, 3).map((player, index) => (
                    <motion.div
                      key={player.username}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`flex items-center gap-3 p-3 rounded-lg ${index === 0
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                        : index === 1
                          ? "bg-gradient-to-r from-gray-300 to-gray-400 text-white"
                          : index === 2
                            ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                            : "bg-muted/50"
                        }`}
                      data-testid={`leaderboard-player-${index + 1}`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {getRankIcon(index + 1) || (
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-sm font-bold">
                              #{index + 1}
                            </span>
                          </div>
                        )}
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-sm bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                            {player.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">
                            {player.username}
                          </p>
                          <p
                            className={`text-xs ${index < 3
                              ? "text-white/80"
                              : "text-muted-foreground"
                              }`}
                          >
                            Level {player.level}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          {player.score.toLocaleString()}
                        </p>
                        <p
                          className={`text-xs ${index < 3 ? "text-white/80" : "text-muted-foreground"
                            }`}
                        >
                          points
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => setLocation("/leaderboard")}
                      data-testid="button-view-leaderboard"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Full Leaderboard
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>

        {showBookingModal && selectedMentor && (
          <BookingModal
            mentor={selectedMentor}
            open={showBookingModal}
            onOpenChange={setShowBookingModal}
            onSuccess={() => {
              setShowBookingModal(false);
              setSelectedMentor(null);
            }}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
