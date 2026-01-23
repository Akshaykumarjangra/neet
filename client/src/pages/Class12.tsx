import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuickNavigationBar } from "@/components/QuickNavigationBar";
import { 
  Search, 
  BookOpen, 
  Clock, 
  TrendingUp,
  Sparkles,
  Eye,
  FlaskConical,
  Microscope,
  Leaf,
  Bug,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  GraduationCap
} from "lucide-react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { categorizeBiologyChapter } from "@/lib/biologySections";

interface KeyConcept {
  title: string;
  description: string;
  formula?: string;
}

interface ChapterContent {
  id: number;
  subject: string;
  classLevel: string;
  chapterNumber: number;
  chapterTitle: string;
  introduction: string;
  difficultyLevel: number;
  estimatedStudyMinutes: number;
  status: string;
  visualizationsData: Array<{ type: string; title: string }>;
  keyConcepts: KeyConcept[];
  progress: number;
  isBookmarked: boolean;
  lastAccessed: string | null;
}

type Class12Subject = "All" | "Physics" | "Chemistry" | "Botany" | "Zoology";

export default function Class12() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState<Class12Subject>("All");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("All");
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const prefersReducedMotion = useReducedMotion();

  const toggleCardExpansion = (id: number) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const { data: chaptersData, isLoading } = useQuery<ChapterContent[]>({
    queryKey: ['/api/lms/library'],
  });

  const getDifficultyLabel = (level: number): string => {
    if (level <= 2) return "Easy";
    if (level <= 4) return "Medium";
    return "Hard";
  };

  const class12Chapters = chaptersData?.filter(chapter => chapter.classLevel === "12") || [];

  const filteredChapters = class12Chapters.filter(chapter => {
    const matchesSearch = !searchQuery || 
      chapter.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.introduction.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject =
      activeSubject === "All" ||
      (activeSubject === "Botany" || activeSubject === "Zoology"
        ? chapter.subject === "Biology" &&
          categorizeBiologyChapter(
            chapter.chapterTitle,
            chapter.chapterNumber,
            chapter.classLevel
          ) === activeSubject
        : chapter.subject === activeSubject);
    const matchesDifficulty = filterDifficulty === "All" || getDifficultyLabel(chapter.difficultyLevel) === filterDifficulty;
    
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const getDifficultyColor = (level: number) => {
    if (level <= 2) return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
    if (level <= 4) return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
    return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case "Physics":
        return <Sparkles className="h-4 w-4" />;
      case "Chemistry":
        return <FlaskConical className="h-4 w-4" />;
      case "Botany":
        return <Leaf className="h-4 w-4" />;
      case "Zoology":
        return <Bug className="h-4 w-4" />;
      case "Biology":
        return <Microscope className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "Physics":
        return "text-blue-600 dark:text-blue-400";
      case "Chemistry":
        return "text-purple-600 dark:text-purple-400";
      case "Botany":
        return "text-emerald-600 dark:text-emerald-400";
      case "Zoology":
        return "text-orange-600 dark:text-orange-400";
      case "Biology":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-foreground";
    }
  };

  const getSubjectChapterCount = (subject: Class12Subject) => {
    if (subject === "Botany" || subject === "Zoology") {
      return class12Chapters.filter(
        (ch) =>
          ch.subject === "Biology" &&
          categorizeBiologyChapter(ch.chapterTitle, ch.chapterNumber, ch.classLevel) === subject
      ).length;
    }

    if (subject === "All") {
      return class12Chapters.length;
    }

    return class12Chapters.filter(ch => ch.subject === subject).length;
  };

  const physicsCount = getSubjectChapterCount("Physics");
  const chemistryCount = getSubjectChapterCount("Chemistry");
  const botanyCount = getSubjectChapterCount("Botany");
  const zoologyCount = getSubjectChapterCount("Zoology");

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeSubject={activeSubject === "All" ? undefined : activeSubject}
        onSubjectChange={() => {}}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent" data-testid="heading-class12">
              Class 12 NEET Preparation
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Master all Class 12 chapters across Physics ({physicsCount}), Chemistry ({chemistryCount}), Botany ({botanyCount}), and Zoology ({zoologyCount})
          </p>
        </motion.div>

        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Class 12 chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-class12"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Difficulty:</span>
              {["All", "Easy", "Medium", "Hard"].map(diff => (
                <Button
                  key={diff}
                  variant={filterDifficulty === diff ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterDifficulty(diff)}
                  data-testid={`button-filter-${diff.toLowerCase()}`}
                >
                  {diff}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg bg-muted p-1" data-testid="tabs-subjects">
              {(["All", "Physics", "Chemistry", "Botany", "Zoology"] as const).map((subject) => (
                <Button
                  key={subject}
                  variant={activeSubject === subject ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveSubject(subject)}
                  data-testid={`tab-${subject.toLowerCase()}`}
                  className="min-w-24"
                >
                  {subject === "All" ? "All Subjects" : subject}
                  {subject !== "All" && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {getSubjectChapterCount(subject)}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-20 bg-muted rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredChapters.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    No Class 12 chapters found matching your filters
                  </p>
                </CardContent>
              </Card>
            ) : (
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                data-testid="grid-class12-chapters"
              >
                <AnimatePresence mode="popLayout">
                  {filteredChapters.map((chapter) => (
                    <motion.div
                      key={chapter.id}
                      layout
                      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card 
                        className="hover-elevate cursor-pointer h-full flex flex-col"
                        data-testid={`card-chapter-${chapter.id}`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className={`flex items-center gap-1.5 ${getSubjectColor(chapter.subject)}`}>
                              {getSubjectIcon(chapter.subject)}
                              <span className="text-xs font-medium">
                                {chapter.subject} • Class 12
                              </span>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getDifficultyColor(chapter.difficultyLevel)}`}
                              data-testid={`badge-difficulty-${chapter.id}`}
                            >
                              {getDifficultyLabel(chapter.difficultyLevel)}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg leading-tight">
                            Ch {chapter.chapterNumber}: {chapter.chapterTitle}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {chapter.introduction}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                          <div className="space-y-3 mb-4">
                            <div className="flex flex-wrap gap-2">
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="h-3.5 w-3.5" />
                                {chapter.estimatedStudyMinutes} min
                              </div>
                              {chapter.visualizationsData && chapter.visualizationsData.length > 0 && (
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <Eye className="h-3.5 w-3.5" />
                                  {chapter.visualizationsData.length} visualizations
                                </div>
                              )}
                              {chapter.progress > 0 && (
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <TrendingUp className="h-3.5 w-3.5" />
                                  {chapter.progress}% complete
                                </div>
                              )}
                            </div>

                            {chapter.keyConcepts && chapter.keyConcepts.length > 0 && (
                              <div className="mt-3">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCardExpansion(chapter.id);
                                  }}
                                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover-elevate active-elevate-2 transition-colors w-full justify-between p-2 rounded-md"
                                  data-testid={`button-toggle-concepts-${chapter.id}`}
                                >
                                  <div className="flex items-center gap-1.5">
                                    <Lightbulb className="h-3.5 w-3.5" />
                                    <span>{chapter.keyConcepts.length} Key Concepts</span>
                                  </div>
                                  {expandedCards.has(chapter.id) ? (
                                    <ChevronUp className="h-3.5 w-3.5" />
                                  ) : (
                                    <ChevronDown className="h-3.5 w-3.5" />
                                  )}
                                </button>

                                {expandedCards.has(chapter.id) && (
                                  <motion.div
                                    initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="mt-2 space-y-2"
                                  >
                                    {chapter.keyConcepts.slice(0, 3).map((concept, idx) => (
                                      <div 
                                        key={idx} 
                                        className="p-2 rounded-md bg-muted/50 text-xs"
                                        data-testid={`concept-${chapter.id}-${idx}`}
                                      >
                                        <div className="font-medium text-foreground mb-1">
                                          {concept.title}
                                        </div>
                                        {concept.formula && (
                                          <div className="font-mono text-primary mb-1">
                                            {concept.formula}
                                          </div>
                                        )}
                                        <div className="text-muted-foreground line-clamp-2">
                                          {concept.description}
                                        </div>
                                      </div>
                                    ))}
                                    {chapter.keyConcepts.length > 3 && (
                                      <p className="text-xs text-muted-foreground pl-2">
                                        +{chapter.keyConcepts.length - 3} more concepts
                                      </p>
                                    )}
                                  </motion.div>
                                )}
                              </div>
                            )}
                          </div>

                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => setLocation(`/chapter/${chapter.subject}/${chapter.classLevel}/${chapter.chapterNumber}`)}
                            data-testid={`button-study-${chapter.id}`}
                          >
                            <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                            Study
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {!isLoading && filteredChapters.length > 0 && (
              <div className="mt-6 text-center text-sm text-muted-foreground" data-testid="text-results-count">
                Showing {filteredChapters.length} Class 12 chapter{filteredChapters.length !== 1 ? 's' : ''}
              </div>
            )}

            <div className="mt-12 pt-8 border-t">
              <QuickNavigationBar currentPath="/class-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
