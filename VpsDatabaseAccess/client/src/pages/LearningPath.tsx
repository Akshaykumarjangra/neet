import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { QuickNavigationBar } from "@/components/QuickNavigationBar";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, CheckCircle2, Lock, Play, Zap, Clock, Trophy, ArrowRight, Sparkles, Target, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Chapter {
  chapterId: string;
  title: string;
  subject: string;
  description: string;
  estimatedMinutes: number;
  xpReward: number;
  prerequisites: string[];
  isLocked: boolean;
  progress?: {
    completionPercentage: number;
    notesCompleted: boolean;
    visualizationsViewed: boolean;
    practiceQuestionsAttempted: number;
    quizCompleted: boolean;
  };
}

interface LearningPathData {
  nextChapter?: Chapter;
  allChapters: Chapter[];
  totalChapters: number;
  completedChapters: number;
}

export default function LearningPath() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const prefersReducedMotion = useReducedMotion();

  const { data, isLoading } = useQuery<LearningPathData>({
    queryKey: ['/api/lms/learning-path/next'],
  });

  const startChapter = (chapterId: string) => {
    const parts = chapterId.split('-');
    if (parts.length === 3) {
      const [subject, classLevel, chapterNumber] = parts;
      setLocation(`/chapter/${subject}/${classLevel}/${chapterNumber}`);
    } else {
      toast({
        title: "Error",
        description: "Invalid chapter ID format.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="text-center"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Loading your personalized learning path...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  const progressPercent = data ? Math.round((data.completedChapters / data.totalChapters) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          className="mb-12"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-3xl blur-2xl" />
            <div className="relative glass-panel p-8 rounded-3xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Your Learning Path
                    </h1>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    Master NEET with AI-powered sequential learning and adaptive mastery tracking
                  </p>
                </div>
                
                {data && (
                  <div className="flex flex-col gap-3">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none text-base px-4 py-2">
                      <Trophy className="h-4 w-4 mr-2" />
                      {data.completedChapters} / {data.totalChapters} Completed
                    </Badge>
                    <Badge variant="secondary" className="text-base px-4 py-2">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {progressPercent}% Progress
                    </Badge>
                  </div>
                )}
              </div>

              {/* Overall Progress Bar */}
              {data && (
                <motion.div
                  initial={prefersReducedMotion ? {} : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.3, duration: prefersReducedMotion ? 0 : 0.8 }}
                  className="mt-6 space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Overall Progress</span>
                    <span className="font-bold text-primary">{progressPercent}%</span>
                  </div>
                  <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={prefersReducedMotion ? { width: `${progressPercent}%` } : { width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ delay: prefersReducedMotion ? 0 : 0.5, duration: prefersReducedMotion ? 0 : 1 }}
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full"
                    />
                    {!prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Next Recommended Chapter */}
        <AnimatePresence>
          {data?.nextChapter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card className="glass-panel-strong border-2 border-primary/30 shadow-2xl glow-halo overflow-visible relative">
                <div className="absolute -top-4 left-8">
                  <Badge className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white border-none px-4 py-1.5 shadow-xl sparkle">
                    <Sparkles className="h-4 w-4 mr-1" />
                    Next Up
                  </Badge>
                </div>
                
                <CardHeader className="pt-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-3 text-2xl mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                        {data.nextChapter.title}
                      </CardTitle>
                      <CardDescription className="text-base">{data.nextChapter.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-base px-4 py-2">
                      {data.nextChapter.subject}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Button 
                    onClick={() => startChapter(data.nextChapter!.chapterId)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-6 py-6 group"
                    data-testid="button-start-chapter"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>~{data.nextChapter.estimatedMinutes} minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-orange-500" />
                      <span className="font-semibold text-orange-600">{data.nextChapter.xpReward} XP</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Learning Path Roadmap */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              Your Roadmap
            </h2>
            <Badge variant="secondary" className="text-sm">
              Sequential Unlock System
            </Badge>
          </div>
          
          <div className="relative">
            {/* Connection Lines */}
            {!prefersReducedMotion && (
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 opacity-20" />
            )}
            
            <div className="space-y-6">
              <AnimatePresence>
                {data?.allChapters.map((chapter, index) => {
                  const isCompleted = chapter.progress?.completionPercentage === 100;
                  const isInProgress = chapter.progress && chapter.progress.completionPercentage > 0 && chapter.progress.completionPercentage < 100;
                  
                  return (
                    <motion.div
                      key={chapter.chapterId}
                      initial={prefersReducedMotion ? {} : { opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: prefersReducedMotion ? 0 : index * 0.05, duration: prefersReducedMotion ? 0 : 0.3 }}
                      className="relative"
                    >
                      {/* Connection Dot */}
                      <div className="absolute left-6 top-8 w-4 h-4 rounded-full border-4 border-background z-10"
                        style={{
                          background: isCompleted ? 'linear-gradient(135deg, #10b981, #059669)' :
                                     isInProgress ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
                                     chapter.isLocked ? 'hsl(var(--muted))' :
                                     'linear-gradient(135deg, #a855f7, #ec4899)'
                        }}
                      />
                      
                      <Card 
                        className={`ml-16 glass-panel hover-elevate active-elevate-2 transition-all ${
                          chapter.isLocked ? 'opacity-60' : ''
                        } ${isInProgress ? 'border-orange-500/30' : ''} ${isCompleted ? 'border-green-500/30' : ''}`}
                        data-testid={`card-chapter-${chapter.chapterId}`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                {chapter.isLocked ? (
                                  <Lock className="h-6 w-6 text-muted-foreground" />
                                ) : isCompleted ? (
                                  <motion.div
                                    initial={prefersReducedMotion ? {} : { scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 500 }}
                                  >
                                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                                  </motion.div>
                                ) : (
                                  <BookOpen className="h-6 w-6 text-primary" />
                                )}
                                <CardTitle className="text-xl">{chapter.title}</CardTitle>
                              </div>
                              <CardDescription className="text-sm">{chapter.description}</CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                              {chapter.subject}
                            </Badge>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          {chapter.progress && (
                            <div className="space-y-3">
                              <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                                <div className="flex justify-between text-sm">
                                  <span className="font-medium">Chapter Progress</span>
                                  <span className="font-bold text-primary">{chapter.progress.completionPercentage}%</span>
                                </div>
                                <div className="relative">
                                  <Progress value={chapter.progress.completionPercentage} className="h-2" />
                                  {chapter.progress.completionPercentage > 0 && !prefersReducedMotion && (
                                    <motion.div
                                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                      animate={{ x: ['-100%', '100%'] }}
                                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    />
                                  )}
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                <Badge variant={chapter.progress.notesCompleted ? "default" : "outline"} className="justify-center text-xs">
                                  {chapter.progress.notesCompleted && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                  Notes
                                </Badge>
                                <Badge variant={chapter.progress.visualizationsViewed ? "default" : "outline"} className="justify-center text-xs">
                                  {chapter.progress.visualizationsViewed && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                  3D Viz
                                </Badge>
                                <Badge variant={chapter.progress.practiceQuestionsAttempted >= 10 ? "default" : "outline"} className="justify-center text-xs">
                                  {chapter.progress.practiceQuestionsAttempted >= 10 && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                  Practice
                                </Badge>
                                <Badge variant={chapter.progress.quizCompleted ? "default" : "outline"} className="justify-center text-xs">
                                  {chapter.progress.quizCompleted && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                  Quiz
                                </Badge>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            {chapter.isLocked ? (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-4 py-2 rounded-lg">
                                <Lock className="h-4 w-4" />
                                <span>Complete previous chapter to unlock (50% required)</span>
                              </div>
                            ) : (
                              <>
                                <Button 
                                  onClick={() => startChapter(chapter.chapterId)}
                                  variant={isCompleted ? "outline" : "default"}
                                  className={!isCompleted ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" : ""}
                                  data-testid={`button-chapter-${chapter.chapterId}`}
                                >
                                  {isCompleted ? "Review Chapter" : isInProgress ? "Continue Learning" : "Start Chapter"}
                                </Button>
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    <span>~{chapter.estimatedMinutes} min</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Zap className="h-4 w-4 text-orange-500" />
                                    <span className="font-semibold text-orange-600">{chapter.xpReward} XP</span>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {data?.allChapters.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="glass-panel p-12 rounded-2xl max-w-md mx-auto">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-semibold mb-2">No chapters available</h3>
              <p className="text-muted-foreground">
                Check back soon for new content
              </p>
            </div>
          </motion.div>
        )}

        {/* Quick Navigation */}
        <div className="mt-12 pt-8 border-t">
          <QuickNavigationBar currentPath="/learning-path" />
        </div>
      </main>
    </div>
  );
}
