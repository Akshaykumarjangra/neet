import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { QuickNavigationBar } from "@/components/QuickNavigationBar";
import { BookOpen, Bookmark, Clock, TrendingUp, Search, Filter, StickyNote, Trash2, Grid3x3, List, Sparkles, Eye, AlertCircle, RefreshCw, FolderOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ChapterLibraryItem {
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
  progress: number;
  isBookmarked: boolean;
  lastAccessed: string | null;
}

export default function Library() {
  const [selectedTab, setSelectedTab] = useState("all-chapters");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();
  const prefersReducedMotion = useReducedMotion();

  const { data: chapters, isLoading, error, refetch } = useQuery<ChapterLibraryItem[]>({
    queryKey: ["/api/lms/library"],
  });

  const { data: bookmarks = [] } = useQuery<any[]>({
    queryKey: ['/api/lms/bookmarks'],
  });

  const { data: allNotes = [] } = useQuery<any[]>({
    queryKey: ['/api/lms/notes'],
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: async (bookmarkId: number) => {
      return await apiRequest('DELETE', `/api/lms/bookmarks/${bookmarkId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/lms/bookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['/api/lms/library'] });
      toast({
        title: "Bookmark removed",
        description: "Removed from your bookmarks",
      });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (noteId: number) => {
      return await apiRequest('DELETE', `/api/lms/notes/${noteId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/lms/notes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/lms/library'] });
      toast({
        title: "Note deleted",
        description: "Your note has been removed",
      });
    },
  });

  const subjects = [
    { value: "all", label: "All Subjects" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Botany", label: "Botany" },
    { value: "Zoology", label: "Zoology" },
  ];

  const getDifficultyColor = (level: number) => {
    if (level <= 2) return "text-green-600 dark:text-green-400";
    if (level <= 4) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getDifficultyLabel = (level: number) => {
    if (level <= 2) return "Beginner";
    if (level <= 4) return "Intermediate";
    return "Advanced";
  };

  const filteredChapters = chapters?.filter((chapter) => {
    const matchesSubject = selectedSubject === "all" || chapter.subject === selectedSubject;
    const matchesSearch = chapter.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          chapter.introduction.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || 
                              (difficultyFilter === "beginner" && chapter.difficultyLevel <= 2) ||
                              (difficultyFilter === "intermediate" && chapter.difficultyLevel > 2 && chapter.difficultyLevel <= 4) ||
                              (difficultyFilter === "advanced" && chapter.difficultyLevel > 4);
    return matchesSubject && matchesSearch && matchesDifficulty;
  });

  const groupedByClass = filteredChapters?.reduce((acc, chapter) => {
    const key = `Class ${chapter.classLevel}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(chapter);
    return acc;
  }, {} as Record<string, ChapterLibraryItem[]>);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-5 w-96" />
              </div>
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="glass-panel">
                <CardHeader className="space-y-3">
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-16 w-full" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6">
          <Card className="glass-panel max-w-lg mx-auto mt-20">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="p-4 rounded-full bg-destructive/10 w-fit mx-auto">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold">Unable to Load Library</h3>
              <p className="text-muted-foreground">
                We couldn't load your content library. This might be a temporary issue with our servers.
              </p>
              <Button onClick={() => refetch()} className="gap-2" data-testid="button-retry-library">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!chapters || chapters.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6">
          <Card className="glass-panel max-w-lg mx-auto mt-20">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                <FolderOpen className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">No Content Available Yet</h3>
              <p className="text-muted-foreground">
                Your content library is being prepared. Check back soon for chapters, notes, and study materials.
              </p>
              <Button onClick={() => refetch()} variant="outline" className="gap-2" data-testid="button-refresh-library">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </CardContent>
          </Card>
          <div className="mt-12 pt-8 border-t">
            <QuickNavigationBar currentPath="/library" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header with gradient */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          className="flex flex-col gap-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-2xl blur-xl" />
            <div className="relative glass-panel p-6 rounded-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" data-testid="text-library-title">
                    <BookOpen className="inline h-10 w-10 mr-3 text-primary" />
                    Content Library
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Browse all <span className="font-semibold text-foreground">98 NCERT chapters</span> with progress tracking
                  </p>
                </div>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {chapters?.length || 0} Chapters
                </Badge>
              </div>
            </div>
          </div>

          {/* Enhanced search and filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search chapters by title or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-panel"
                data-testid="input-search-chapters"
              />
            </div>

            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full lg:w-48 glass-panel" data-testid="select-difficulty-filter">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            {/* View mode toggle */}
            <div className="flex gap-2 glass-panel p-1 rounded-lg w-fit">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                data-testid="button-grid-view"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                data-testid="button-list-view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all-chapters" data-testid="tab-all-chapters">
              <BookOpen className="h-4 w-4 mr-2" />
              All Chapters
            </TabsTrigger>
            <TabsTrigger value="bookmarks" data-testid="tab-bookmarks">
              <Bookmark className="h-4 w-4 mr-2" />
              Bookmarks ({bookmarks.length})
            </TabsTrigger>
            <TabsTrigger value="notes" data-testid="tab-notes">
              <StickyNote className="h-4 w-4 mr-2" />
              Notes ({allNotes.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-chapters" className="space-y-6">
            <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
              <TabsList className="grid w-full grid-cols-5 mb-6">
                {subjects.map((subject) => (
                  <TabsTrigger
                    key={subject.value}
                    value={subject.value}
                    data-testid={`tab-${subject.value}`}
                  >
                    {subject.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {subjects.map((subject) => (
                <TabsContent key={subject.value} value={subject.value} className="space-y-8">
              {groupedByClass && Object.entries(groupedByClass).map(([classLevel, classChapters]) => (
                <div key={classLevel}>
                  <h2 className="text-2xl font-semibold mb-4" data-testid={`text-${classLevel.toLowerCase().replace(' ', '-')}`}>
                    {classLevel}
                  </h2>
                  <motion.div
                    className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}
                  >
                    <AnimatePresence>
                    {classChapters.map((chapter, idx) => (
                      <motion.div
                        key={chapter.id}
                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                        transition={{ delay: prefersReducedMotion ? 0 : idx * 0.05, duration: prefersReducedMotion ? 0 : 0.3 }}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      >
                      <Card
                        className="hover-elevate active-elevate-2 transition-all overflow-visible h-full glass-panel"
                        data-testid={`card-chapter-${chapter.id}`}
                      >
                        <CardHeader className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex gap-2">
                              <Badge variant="outline" className="flex-shrink-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                                Ch {chapter.chapterNumber}
                              </Badge>
                              <Badge variant="secondary" className={getDifficultyColor(chapter.difficultyLevel)}>
                                {getDifficultyLabel(chapter.difficultyLevel)}
                              </Badge>
                            </div>
                            {chapter.isBookmarked && (
                              <motion.div
                                initial={prefersReducedMotion ? {} : { scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={prefersReducedMotion ? {} : { type: "spring", stiffness: 500 }}
                              >
                                <Bookmark className="h-5 w-5 text-primary fill-primary" data-testid={`icon-bookmarked-${chapter.id}`} />
                              </motion.div>
                            )}
                          </div>
                          <CardTitle className="text-lg line-clamp-2 leading-snug" data-testid={`text-chapter-title-${chapter.id}`}>
                            {chapter.chapterTitle}
                          </CardTitle>
                          <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                            {chapter.introduction}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <div className="space-y-2 bg-muted/30 p-3 rounded-lg">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground font-medium">Progress</span>
                              <span className="font-bold text-primary">{chapter.progress}%</span>
                            </div>
                            <div className="relative">
                              <Progress value={chapter.progress} className="h-2" data-testid={`progress-${chapter.id}`} />
                              {chapter.progress > 0 && !prefersReducedMotion && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                  animate={{ x: ['-100%', '100%'] }}
                                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                />
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {chapter.estimatedStudyMinutes} min
                              </span>
                            </div>
                            {chapter.visualizationsData && chapter.visualizationsData.length > 0 && (
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <Eye className="h-4 w-4" />
                                <span className="text-xs">{chapter.visualizationsData.length} viz</span>
                              </div>
                            )}
                          </div>

                          {chapter.lastAccessed && (
                            <p className="text-xs text-muted-foreground flex items-center gap-2">
                              <TrendingUp className="h-3 w-3" />
                              Last viewed: {new Date(chapter.lastAccessed).toLocaleDateString()}
                            </p>
                          )}
                        </CardContent>

                        <CardFooter>
                          <Link
                            href={`/chapter/${chapter.subject}/${chapter.classLevel}/${chapter.chapterNumber}`}
                            className="w-full"
                          >
                            <Button 
                              className="w-full group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" 
                              data-testid={`button-view-chapter-${chapter.id}`}
                            >
                              {chapter.progress > 0 ? "Continue Learning" : "Start Chapter"}
                              <TrendingUp className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                      </motion.div>
                    ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ))}

                {filteredChapters?.length === 0 && (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No chapters found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
            </Tabs>
          </TabsContent>

          <TabsContent value="bookmarks" className="space-y-4">
            {bookmarks.length === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No bookmarks yet</h3>
                <p className="text-muted-foreground">
                  Bookmark chapters while reading to save them here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookmarks.map((bookmark: any) => (
                  <Card key={bookmark.id} className="hover-elevate" data-testid={`card-bookmark-${bookmark.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">
                              {bookmark.chapter.subject} - Ch {bookmark.chapter.chapterNumber}
                            </Badge>
                            <Badge variant="secondary">Class {bookmark.chapter.classLevel}</Badge>
                          </div>
                          <CardTitle className="text-lg">{bookmark.chapter.chapterTitle}</CardTitle>
                          <CardDescription className="mt-2">
                            Added {new Date(bookmark.createdAt).toLocaleDateString()}
                          </CardDescription>
                          {bookmark.notes && (
                            <p className="text-sm text-muted-foreground mt-2 italic">"{bookmark.notes}"</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/chapter/${bookmark.chapter.subject}/${bookmark.chapter.classLevel}/${bookmark.chapter.chapterNumber}`}>
                            <Button size="sm" data-testid={`button-view-bookmark-${bookmark.id}`}>View</Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteBookmarkMutation.mutate(bookmark.id)}
                            data-testid={`button-delete-bookmark-${bookmark.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            {allNotes.length === 0 ? (
              <div className="text-center py-12">
                <StickyNote className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No notes yet</h3>
                <p className="text-muted-foreground">
                  Add notes while reading chapters to save them here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {allNotes.map((note: any) => (
                  <Card key={note.id} className="hover-elevate" data-testid={`card-note-${note.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <StickyNote className="h-4 w-4 text-primary" />
                            <span className="text-sm text-muted-foreground">
                              {new Date(note.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{note.noteText}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNoteMutation.mutate(note.id)}
                          data-testid={`button-delete-note-${note.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Navigation */}
        <div className="mt-12 pt-8 border-t">
          <QuickNavigationBar currentPath="/library" />
        </div>
      </div>
    </div>
  );
}
