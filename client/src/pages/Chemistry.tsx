import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Atom,
  Search,
  Clock,
  Star,
  ChevronDown,
  ChevronRight,
  Play,
  Shuffle,
  Zap,
  BookOpen,
  Trophy,
  Target,
  Flame,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Circle,
  Filter,
  ArrowUpDown,
  FlaskConical,
  TestTubes,
  Sparkles,
  Lock,
} from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface ChapterData {
  id: number;
  subject: string;
  classLevel: string;
  chapterNumber: number;
  chapterTitle: string;
  introduction: string;
  difficultyLevel: number;
  estimatedStudyMinutes: number;
  status: string;
  progress: number;
  isBookmarked: boolean;
  lastAccessed: string | null;
  keyConcepts?: string[];
}

interface Unit {
  name: string;
  icon: React.ReactNode;
  chapters: number[];
  color: string;
}

const class11Units: Unit[] = [
  {
    name: "Physical Chemistry",
    icon: <FlaskConical className="h-5 w-5" />,
    chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Inorganic Chemistry",
    icon: <Atom className="h-5 w-5" />,
    chapters: [10, 11, 12, 13, 14, 15, 16],
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Organic Chemistry",
    icon: <Sparkles className="h-5 w-5" />,
    chapters: [17, 18, 19, 20, 21],
    color: "from-pink-500 to-rose-500",
  },
];

const class12Units: Unit[] = [
  {
    name: "Advanced Physical Chemistry",
    icon: <Target className="h-5 w-5" />,
    chapters: [22, 23, 24, 25, 26],
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Inorganic & Coordination Chemistry",
    icon: <TestTubes className="h-5 w-5" />,
    chapters: [27, 28, 29, 30, 31, 32, 33],
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Organic Reaction Mechanisms",
    icon: <Sparkles className="h-5 w-5" />,
    chapters: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    color: "from-purple-500 to-pink-500",
  },
];

function ProgressRing({ progress, size = 48 }: { progress: number; size?: number }) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-muted/30"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary transition-all duration-500"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold">{progress}%</span>
      </div>
    </div>
  );
}

function DifficultyStars({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-3 w-3",
            star <= level
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );
}

function ChapterCard({
  chapter,
  classLevel,
  onClick,
  prefersReducedMotion,
}: {
  chapter: ChapterData;
  classLevel: string;
  onClick: () => void;
  prefersReducedMotion: boolean;
  isPremium: boolean;
}) {
  const hasPYQ = chapter.chapterNumber <= 10;
  const isLocked = chapter.chapterNumber > 3 && !isPremium;

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      whileHover={prefersReducedMotion ? {} : { scale: isLocked ? 1 : 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: isLocked ? 1 : 0.98 }}
    >
      <Card
        className={cn(
          "cursor-pointer transition-all border-2 bg-gradient-to-br from-card to-card/80",
          isLocked
            ? "opacity-80 grayscale-[0.5] border-muted hover:border-muted"
            : "hover:shadow-lg hover:border-primary/50"
        )}
        onClick={onClick}
        data-testid={`card-chapter-chemistry-${classLevel}-${chapter.chapterNumber}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <ProgressRing progress={chapter.progress} />
              {isLocked && (
                <div className="absolute -top-1 -right-1 bg-background rounded-full p-0.5 border shadow-sm">
                  <Lock className="h-3 w-3 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Chapter {chapter.chapterNumber}
                  </p>
                  <h4 className="font-semibold text-sm line-clamp-2" data-testid={`text-chapter-title-${chapter.id}`}>
                    {chapter.chapterTitle}
                  </h4>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <DifficultyStars level={chapter.difficultyLevel} />
                  {isLocked ? (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-secondary/50">
                      Premium
                    </Badge>
                  ) : hasPYQ && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      PYQ
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {chapter.estimatedStudyMinutes} min
                  </span>
                </div>

                <Button
                  size="sm"
                  variant={isLocked ? "secondary" : (chapter.progress > 0 ? "default" : "outline")}
                  className="h-7 text-xs"
                  data-testid={`button-start-chapter-${chapter.id}`}
                >
                  {isLocked ? (
                    <>
                      <Lock className="h-3 w-3 mr-1" />
                      Locked
                    </>
                  ) : chapter.progress > 0 ? (
                    <>
                      <Play className="h-3 w-3 mr-1" />
                      Continue
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function UnitSection({
  unit,
  chapters,
  classLevel,
  onChapterClick,
  prefersReducedMotion,
  isPremium,
}: {
  unit: Unit;
  chapters: ChapterData[];
  classLevel: string;
  onChapterClick: (chapter: ChapterData) => void;
  prefersReducedMotion: boolean;
  isPremium: boolean;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const unitChapters = chapters.filter((c) =>
    unit.chapters.includes(c.chapterNumber)
  );

  const completedCount = unitChapters.filter((c) => c.progress === 100).length;
  const unitProgress = unitChapters.length > 0
    ? Math.round(
      unitChapters.reduce((sum, c) => sum + c.progress, 0) / unitChapters.length
    )
    : 0;

  if (unitChapters.length === 0) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-3">
      <CollapsibleTrigger asChild>
        <motion.div
          whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
          className={cn(
            "w-full p-4 rounded-xl cursor-pointer transition-all",
            "bg-gradient-to-r",
            unit.color,
            "text-white shadow-lg hover:shadow-xl"
          )}
          data-testid={`unit-trigger-${unit.name.toLowerCase().replace(" ", "-")}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                {unit.icon}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">{unit.name}</h3>
                <p className="text-sm text-white/80">
                  {completedCount}/{unitChapters.length} chapters completed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-bold">{unitProgress}%</p>
                <Progress
                  value={unitProgress}
                  className="w-24 h-2 bg-white/20"
                />
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-6 w-6" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <AnimatePresence>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
            className="grid grid-cols-1 gap-2 sm:gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-3"
          >
            {unitChapters.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                classLevel={classLevel}
                onClick={() => onChapterClick(chapter)}
                prefersReducedMotion={prefersReducedMotion}
                isPremium={isPremium}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );
}

function TopicSelectionModal({
  open,
  onOpenChange,
  chapters,
  classLevel,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chapters: ChapterData[];
  classLevel: string;
}) {
  const [, setLocation] = useLocation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Quick Practice
          </DialogTitle>
          <DialogDescription>
            Select a chapter to start practicing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          {chapters.map((chapter) => (
            <Button
              key={chapter.id}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => {
                setLocation(`/chapter/chemistry/${classLevel}/${chapter.chapterNumber}`);
                onOpenChange(false);
              }}
              data-testid={`modal-chapter-${chapter.id}`}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="flex-shrink-0">
                  {chapter.progress === 100 ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : chapter.progress > 0 ? (
                    <Circle className="h-5 w-5 text-yellow-500 fill-yellow-500/30" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Ch {chapter.chapterNumber}: {chapter.chapterTitle}</p>
                  <p className="text-xs text-muted-foreground">{chapter.progress}% complete</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6">
        <Skeleton className="h-40 sm:h-48 w-full rounded-xl sm:rounded-2xl" />
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-full sm:w-32" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-20 w-full rounded-xl" />
            <div className="grid grid-cols-1 gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-32 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Chemistry() {
  const [, setLocation] = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [selectedClass, setSelectedClass] = useState<"11" | "12">("11");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "not-started" | "in-progress" | "completed">("all");
  const [sortBy, setSortBy] = useState<"number" | "difficulty" | "time">("number");
  const [practiceModalOpen, setPracticeModalOpen] = useState(false);
  const { user } = useAuth();
  const isPremium = user?.isPaidUser || user?.role === "admin" || user?.isOwner;

  const { data: allChapters, isLoading, error, refetch } = useQuery<ChapterData[]>({
    queryKey: ["/api/lms/library"],
  });

  const chemistryChapters = useMemo(() => {
    if (!allChapters) return [];
    return allChapters.filter(
      (c) => c.subject === "Chemistry" && c.classLevel === selectedClass
    );
  }, [allChapters, selectedClass]);

  const filteredChapters = useMemo(() => {
    let filtered = [...chemistryChapters];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.chapterTitle.toLowerCase().includes(query) ||
          c.chapterNumber.toString().includes(query)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => {
        if (statusFilter === "not-started") return c.progress === 0;
        if (statusFilter === "in-progress") return c.progress > 0 && c.progress < 100;
        if (statusFilter === "completed") return c.progress === 100;
        return true;
      });
    }

    filtered.sort((a, b) => {
      if (sortBy === "number") return a.chapterNumber - b.chapterNumber;
      if (sortBy === "difficulty") return b.difficultyLevel - a.difficultyLevel;
      if (sortBy === "time") return a.estimatedStudyMinutes - b.estimatedStudyMinutes;
      return 0;
    });

    return filtered;
  }, [chemistryChapters, searchQuery, statusFilter, sortBy]);

  const overallProgress = useMemo(() => {
    if (chemistryChapters.length === 0) return { completed: 0, total: 0, percentage: 0 };
    const completed = chemistryChapters.filter((c) => c.progress === 100).length;
    return {
      completed,
      total: chemistryChapters.length,
      percentage: Math.round(
        chemistryChapters.reduce((sum, c) => sum + c.progress, 0) / chemistryChapters.length
      ),
    };
  }, [chemistryChapters]);

  const handleChapterClick = (chapter: ChapterData) => {
    const isLocked = chapter.chapterNumber > 3 && !isPremium;
    if (isLocked) {
      setLocation("/pricing");
      return;
    }
    setLocation(`/chapter/chemistry/${selectedClass}/${chapter.chapterNumber}`);
  };

  const handleRandomChapter = () => {
    const incompleteChapters = chemistryChapters.filter((c) => c.progress < 100);
    if (incompleteChapters.length > 0) {
      const random = incompleteChapters[Math.floor(Math.random() * incompleteChapters.length)];
      handleChapterClick(random);
    }
  };

  const units = selectedClass === "11" ? class11Units : class12Units;

  const heroGradient = "from-purple-600 via-fuchsia-600 to-pink-500";
  const quickPracticeGradient = "from-purple-600 to-pink-500";

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto p-6">
          <Card className="max-w-lg mx-auto mt-20">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="p-4 rounded-full bg-destructive/10 w-fit mx-auto">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold">Unable to Load Chemistry Chapters</h3>
              <p className="text-muted-foreground">
                Something went wrong while loading. Please try again.
              </p>
              <Button onClick={() => refetch()} className="gap-2" data-testid="button-retry">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${heroGradient} p-4 sm:p-6 md:p-8 text-white`}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-3xl"
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div
                    animate={prefersReducedMotion ? {} : { rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="p-2 sm:p-3 rounded-xl bg-white/20 backdrop-blur-sm"
                  >
                    <TestTubes className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                  </motion.div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold" data-testid="text-chemistry-title">
                      Chemistry
                    </h1>
                    <p className="text-white/80 text-sm sm:text-base">NEET 2025 Chemistry Syllabus</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80">Overall Progress</span>
                    <span className="font-bold">
                      {overallProgress.completed}/{overallProgress.total} chapters complete
                    </span>
                  </div>
                  <div className="relative">
                    <Progress
                      value={overallProgress.percentage}
                      className="h-3 bg-white/20"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={prefersReducedMotion ? {} : { x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 p-1 bg-white/20 rounded-xl backdrop-blur-sm">
                <Button
                  variant={selectedClass === "11" ? "secondary" : "ghost"}
                  className={cn(
                    "relative px-3 sm:px-6 text-sm sm:text-base transition-all",
                    selectedClass === "11" ? "bg-white text-indigo-700 shadow-lg" : "text-white hover:bg-white/10"
                  )}
                  onClick={() => setSelectedClass("11")}
                  data-testid="button-class-11"
                >
                  <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Class </span>11
                </Button>
                <Button
                  variant={selectedClass === "12" ? "secondary" : "ghost"}
                  className={cn(
                    "relative px-3 sm:px-6 text-sm sm:text-base transition-all",
                    selectedClass === "12" ? "bg-white text-indigo-700 shadow-lg" : "text-white hover:bg-white/10"
                  )}
                  onClick={() => setSelectedClass("12")}
                  data-testid="button-class-12"
                >
                  <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Class </span>12
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.1 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-chapters"
            />
          </div>

          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
            <SelectTrigger className="w-full sm:w-40" data-testid="select-status-filter">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Chapters</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="w-full sm:w-40" data-testid="select-sort-by">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="number">Chapter Number</SelectItem>
              <SelectItem value="difficulty">Difficulty</SelectItem>
              <SelectItem value="time">Study Time</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedClass}
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="space-y-6"
            >
              {units.map((unit) => (
                <UnitSection
                  key={unit.name}
                  unit={unit}
                  chapters={filteredChapters}
                  classLevel={selectedClass}
                  onChapterClick={handleChapterClick}
                  prefersReducedMotion={prefersReducedMotion}
                  isPremium={isPremium}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredChapters.length === 0 && (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No chapters found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <motion.div
          initial={prefersReducedMotion ? {} : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.3, type: "spring" }}
        >
          <Button
            size="lg"
            variant="outline"
            className="rounded-full w-14 h-14 p-0 shadow-lg bg-background hover:bg-muted"
            onClick={handleRandomChapter}
            title="Random Chapter"
            data-testid="button-random-chapter"
          >
            <Shuffle className="h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.4, type: "spring" }}
        >
          <Button
            size="lg"
            className={`rounded-full w-14 h-14 p-0 shadow-lg bg-gradient-to-r ${quickPracticeGradient} hover:from-purple-700 hover:to-pink-600`}
            onClick={() => setPracticeModalOpen(true)}
            title="Quick Practice"
            data-testid="button-quick-practice"
          >
            <Zap className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      <TopicSelectionModal
        open={practiceModalOpen}
        onOpenChange={setPracticeModalOpen}
        chapters={chemistryChapters}
        classLevel={selectedClass}
      />
    </div>
  );
}
