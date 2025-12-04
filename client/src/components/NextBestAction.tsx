import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import {
  Play,
  Bookmark,
  Flame,
  BookOpen,
  Zap,
  ChevronRight,
  Target,
  Trophy,
  Clock,
  Star,
  Sparkles,
} from "lucide-react";

interface ActionSuggestion {
  id: string;
  type: "practice" | "bookmarks" | "streak" | "chapter" | "mock-test" | "achievement";
  priority: number;
  title: string;
  description: string;
  icon: typeof Play;
  gradient: string;
  route: string;
  badge?: string;
  urgency?: "low" | "medium" | "high";
}

interface UserStats {
  totalAttempts: number;
  correctAnswers: number;
  accuracy: number;
  todayAttempts?: number;
}

interface ChapterProgress {
  subject: string;
  chapterNumber: number;
  chapterName: string;
  progress: number;
}

export function NextBestAction() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [currentActionIndex, setCurrentActionIndex] = useState(0);

  const { data: userStats } = useQuery<UserStats>({
    queryKey: ['/api/stats/user', user?.id],
    enabled: !!user?.id,
  });

  const { data: bookmarkedQuestions } = useQuery<any[]>({
    queryKey: ['/api/questions/bookmarked'],
    enabled: !!user?.id,
  });

  const { data: chapterProgress } = useQuery<ChapterProgress[]>({
    queryKey: ['/api/progress/chapters', user?.id],
    enabled: !!user?.id,
  });

  const streak = user?.studyStreak || 0;
  const todayPracticed = (userStats?.todayAttempts || 0) > 0;
  const hasBookmarks = (bookmarkedQuestions?.length || 0) > 0;

  // Ensure chapterProgress is an array before using .find()
  const chapterProgressArray = Array.isArray(chapterProgress) ? chapterProgress : [];
  const incompleteChapter = chapterProgressArray.find(
    (ch) => ch.progress > 0 && ch.progress < 100
  );

  const generateActions = (): ActionSuggestion[] => {
    const actions: ActionSuggestion[] = [];

    if (!todayPracticed) {
      actions.push({
        id: "daily-practice",
        type: "practice",
        priority: 1,
        title: "Start Daily Practice",
        description: "Keep your momentum going with today's practice session",
        icon: Play,
        gradient: "from-green-500 to-emerald-500",
        route: "/practice",
        badge: "Daily Goal",
        urgency: "high",
      });
    }

    if (streak > 0 && streak >= 3) {
      actions.push({
        id: "maintain-streak",
        type: "streak",
        priority: !todayPracticed ? 2 : 5,
        title: `Maintain Your ${streak}-Day Streak! 🔥`,
        description: "Don't break your winning momentum",
        icon: Flame,
        gradient: "from-orange-500 to-red-500",
        route: "/practice",
        badge: `${streak} days`,
        urgency: !todayPracticed ? "high" : "low",
      });
    }

    if (hasBookmarks) {
      actions.push({
        id: "review-bookmarks",
        type: "bookmarks",
        priority: 3,
        title: "Review Saved Questions",
        description: `You have ${bookmarkedQuestions?.length} bookmarked questions to review`,
        icon: Bookmark,
        gradient: "from-blue-500 to-indigo-500",
        route: "/practice?filter=bookmarked",
        badge: `${bookmarkedQuestions?.length} saved`,
        urgency: "medium",
      });
    }

    if (incompleteChapter) {
      actions.push({
        id: "continue-chapter",
        type: "chapter",
        priority: 4,
        title: `Continue: ${incompleteChapter.chapterName}`,
        description: `${incompleteChapter.progress}% complete - keep going!`,
        icon: BookOpen,
        gradient: "from-purple-500 to-pink-500",
        route: `/chapter/${incompleteChapter.subject.toLowerCase()}/11/${incompleteChapter.chapterNumber}`,
        badge: `${incompleteChapter.progress}%`,
        urgency: "medium",
      });
    }

    actions.push({
      id: "take-mock-test",
      type: "mock-test",
      priority: 6,
      title: "Take a Mock Test",
      description: "Test your knowledge with a full practice exam",
      icon: Target,
      gradient: "from-cyan-500 to-blue-500",
      route: "/mock-tests",
      badge: "Practice",
      urgency: "low",
    });

    actions.push({
      id: "explore-achievements",
      type: "achievement",
      priority: 7,
      title: "Unlock Achievements",
      description: "Discover challenges and earn rewards",
      icon: Trophy,
      gradient: "from-yellow-500 to-amber-500",
      route: "/achievements",
      urgency: "low",
    });

    return actions.sort((a, b) => a.priority - b.priority);
  };

  const actions = generateActions();
  const primaryAction = actions[0];
  const secondaryActions = actions.slice(1, 3);

  useEffect(() => {
    if (actions.length > 1) {
      const interval = setInterval(() => {
        setCurrentActionIndex((prev) => (prev + 1) % Math.min(actions.length, 3));
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [actions.length]);

  if (!primaryAction) return null;

  const handleActionClick = (route: string) => {
    setLocation(route);
  };

  const getUrgencyStyles = (urgency?: string) => {
    switch (urgency) {
      case "high":
        return "ring-2 ring-offset-2 ring-offset-background ring-red-500/50";
      case "medium":
        return "ring-1 ring-offset-1 ring-offset-background ring-yellow-500/30";
      default:
        return "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
      data-testid="next-best-action-container"
    >
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Recommended for You</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          className="md:col-span-2"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Card
            className={`overflow-hidden cursor-pointer transition-all hover:shadow-lg ${getUrgencyStyles(primaryAction.urgency)}`}
            onClick={() => handleActionClick(primaryAction.route)}
            data-testid={`action-${primaryAction.id}`}
          >
            <CardContent className="p-0">
              <div className="flex items-stretch">
                <div
                  className={`w-2 bg-gradient-to-b ${primaryAction.gradient}`}
                />
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${primaryAction.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                      >
                        <primaryAction.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold">{primaryAction.title}</h3>
                          {primaryAction.badge && (
                            <Badge
                              variant="secondary"
                              className={`bg-gradient-to-r ${primaryAction.gradient} text-white border-0`}
                            >
                              {primaryAction.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">
                          {primaryAction.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className={`bg-gradient-to-r ${primaryAction.gradient} hover:opacity-90 gap-2 shadow-lg hidden sm:flex`}
                      data-testid={`button-${primaryAction.id}`}
                    >
                      <Zap className="h-4 w-4" />
                      Start Now
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {secondaryActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
              >
                <Card
                  className="cursor-pointer transition-all hover:shadow-md"
                  onClick={() => handleActionClick(action.route)}
                  data-testid={`action-${action.id}`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <action.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {action.title}
                        </h4>
                        {action.badge && (
                          <span className="text-xs text-muted-foreground">
                            {action.badge}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default NextBestAction;
