import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  ChevronRight, 
  AlertCircle, 
  Atom, 
  FlaskConical, 
  Leaf, 
  Bug,
  GraduationCap
} from "lucide-react";

interface Chapter {
  id: number;
  chapterNumber: number;
  title: string;
  classLevel: string;
  difficultyLevel: number;
  estimatedStudyMinutes: number;
}

interface SyllabusData {
  Physics?: Chapter[];
  Chemistry?: Chapter[];
  Botany?: Chapter[];
  Zoology?: Chapter[];
}

interface ChapterProgress {
  [chapterId: string]: {
    completionPercentage: number;
    masteryLevel: string;
    timeSpentMinutes: number;
  };
}

const getDifficultyLabel = (level: number): { label: string; variant: "default" | "secondary" | "destructive" | "outline" } => {
  if (level <= 2) return { label: "Easy", variant: "secondary" };
  if (level <= 3) return { label: "Medium", variant: "default" };
  return { label: "Hard", variant: "destructive" };
};

const getSubjectIcon = (subject: string) => {
  switch (subject) {
    case "Physics":
      return <Atom className="h-5 w-5" />;
    case "Chemistry":
      return <FlaskConical className="h-5 w-5" />;
    case "Botany":
      return <Leaf className="h-5 w-5" />;
    case "Zoology":
      return <Bug className="h-5 w-5" />;
    default:
      return <BookOpen className="h-5 w-5" />;
  }
};

const getSubjectColor = (subject: string) => {
  switch (subject) {
    case "Physics":
      return "text-blue-500";
    case "Chemistry":
      return "text-purple-500";
    case "Botany":
      return "text-green-500";
    case "Zoology":
      return "text-amber-500";
    default:
      return "text-primary";
  }
};

function ChapterCard({ 
  chapter, 
  subject, 
  progress, 
  onClick 
}: { 
  chapter: Chapter; 
  subject: string; 
  progress?: { completionPercentage: number; masteryLevel: string; timeSpentMinutes: number };
  onClick: () => void;
}) {
  const difficulty = getDifficultyLabel(chapter.difficultyLevel);
  const hasProgress = progress && progress.completionPercentage > 0;

  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] group"
      onClick={onClick}
      data-testid={`card-chapter-${subject.toLowerCase()}-${chapter.chapterNumber}`}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0 ${getSubjectColor(subject)}`}>
                {getSubjectIcon(subject)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground font-medium">
                  Chapter {chapter.chapterNumber}
                </p>
                <h3 className="font-semibold text-sm line-clamp-2" data-testid={`text-chapter-title-${chapter.id}`}>
                  {chapter.title}
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Badge variant={difficulty.variant} className="text-xs" data-testid={`badge-difficulty-${chapter.id}`}>
                {difficulty.label}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{chapter.estimatedStudyMinutes} min</span>
              </div>
            </div>

            {hasProgress && (
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{progress.completionPercentage}%</span>
                </div>
                <Progress value={progress.completionPercentage} className="h-1.5" />
              </div>
            )}
          </div>

          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
}

function ChapterCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-full max-w-[200px]" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <Skeleton className="h-5 w-5 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ subject }: { subject: string }) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className={`h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4 ${getSubjectColor(subject)}`}>
          {getSubjectIcon(subject)}
        </div>
        <h3 className="text-lg font-semibold mb-1">No chapters available</h3>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Chapters for {subject} will be added soon. Check back later!
        </p>
      </CardContent>
    </Card>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Card className="border-destructive">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold mb-1">Failed to load syllabus</h3>
        <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
          Something went wrong while fetching the syllabus. Please try again.
        </p>
        <Button onClick={onRetry} variant="outline" data-testid="button-retry">
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}

function ChapterGrid({ 
  chapters, 
  subject, 
  classLevel,
  progress,
  isLoading,
  onChapterClick
}: { 
  chapters: Chapter[] | undefined;
  subject: string;
  classLevel: string;
  progress: ChapterProgress;
  isLoading: boolean;
  onChapterClick: (chapter: Chapter) => void;
}) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ChapterCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const filteredChapters = chapters?.filter(c => c.classLevel === classLevel) || [];

  if (filteredChapters.length === 0) {
    return <EmptyState subject={subject} />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredChapters.map((chapter) => (
        <ChapterCard
          key={chapter.id}
          chapter={chapter}
          subject={subject}
          progress={progress[chapter.id]}
          onClick={() => onChapterClick(chapter)}
        />
      ))}
    </div>
  );
}

export default function Syllabus() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [activeSubject, setActiveSubject] = useState("Physics");
  const [classLevel, setClassLevel] = useState<"Class 11" | "Class 12">("Class 11");

  const { data: syllabusData, isLoading, isError, refetch } = useQuery<SyllabusData>({
    queryKey: ["/api/learn/syllabus"],
    staleTime: 5 * 60 * 1000,
  });

  const { data: progressData } = useQuery<ChapterProgress>({
    queryKey: ["/api/progress/chapters", user?.id],
    enabled: isAuthenticated && !!user?.id,
    staleTime: 60 * 1000,
  });

  const handleChapterClick = (chapter: Chapter, subject: string) => {
    setLocation(`/chapter/${subject.toLowerCase()}/${chapter.classLevel.replace(" ", "")}/${chapter.chapterNumber}`);
  };

  const getChapterCount = (subject: string) => {
    const subjectData = subject === "Biology" 
      ? [...(syllabusData?.Botany || []), ...(syllabusData?.Zoology || [])]
      : syllabusData?.[subject as keyof SyllabusData] || [];
    return subjectData.filter(c => c.classLevel === classLevel).length;
  };

  const subjects = [
    { id: "Physics", label: "Physics", icon: <Atom className="h-4 w-4" /> },
    { id: "Chemistry", label: "Chemistry", icon: <FlaskConical className="h-4 w-4" /> },
    { id: "Biology", label: "Biology", icon: <Leaf className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <aside className="hidden lg:flex w-64 shrink-0 border-r min-h-[calc(100vh-4rem)] bg-muted/30">
          <div className="flex flex-col p-4 w-full">
            <div className="mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5" />
                Syllabus
              </h2>
              <p className="text-sm text-muted-foreground">
                Complete NEET curriculum for {classLevel}
              </p>
            </div>

            <div className="space-y-1">
              {subjects.map((subject) => (
                <Button
                  key={subject.id}
                  variant={activeSubject === subject.id ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveSubject(subject.id)}
                  data-testid={`sidebar-subject-${subject.id.toLowerCase()}`}
                >
                  {subject.icon}
                  <span>{subject.label}</span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {getChapterCount(subject.id)}
                  </Badge>
                </Button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-muted-foreground mb-3 font-medium">Class Level</p>
              <div className="flex flex-col gap-1">
                <Button
                  variant={classLevel === "Class 11" ? "secondary" : "ghost"}
                  size="sm"
                  className="justify-start"
                  onClick={() => setClassLevel("Class 11")}
                  data-testid="button-class-11"
                >
                  Class 11
                </Button>
                <Button
                  variant={classLevel === "Class 12" ? "secondary" : "ghost"}
                  size="sm"
                  className="justify-start"
                  onClick={() => setClassLevel("Class 12")}
                  data-testid="button-class-12"
                >
                  Class 12
                </Button>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">NEET Syllabus</h1>
              <p className="text-muted-foreground">
                Browse and study chapters across Physics, Chemistry, and Biology
              </p>
            </div>

            <div className="lg:hidden mb-6">
              <div className="flex gap-2 mb-4">
                <Button
                  variant={classLevel === "Class 11" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setClassLevel("Class 11")}
                  data-testid="button-class-11-mobile"
                >
                  Class 11
                </Button>
                <Button
                  variant={classLevel === "Class 12" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setClassLevel("Class 12")}
                  data-testid="button-class-12-mobile"
                >
                  Class 12
                </Button>
              </div>
            </div>

            {isError ? (
              <ErrorState onRetry={() => refetch()} />
            ) : (
              <Tabs value={activeSubject} onValueChange={setActiveSubject} className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:hidden mb-6">
                  {subjects.map((subject) => (
                    <TabsTrigger 
                      key={subject.id} 
                      value={subject.id}
                      data-testid={`tab-subject-${subject.id.toLowerCase()}`}
                    >
                      <span className="flex items-center gap-1.5">
                        {subject.icon}
                        <span className="hidden sm:inline">{subject.label}</span>
                        <span className="sm:hidden">{subject.label.slice(0, 3)}</span>
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="Physics" className="mt-0">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <Atom className="h-5 w-5 text-blue-500" />
                      Physics
                      <Badge variant="secondary" className="ml-2">
                        {classLevel}
                      </Badge>
                    </h2>
                  </div>
                  <ChapterGrid
                    chapters={syllabusData?.Physics}
                    subject="Physics"
                    classLevel={classLevel}
                    progress={progressData || {}}
                    isLoading={isLoading}
                    onChapterClick={(chapter) => handleChapterClick(chapter, "Physics")}
                  />
                </TabsContent>

                <TabsContent value="Chemistry" className="mt-0">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <FlaskConical className="h-5 w-5 text-purple-500" />
                      Chemistry
                      <Badge variant="secondary" className="ml-2">
                        {classLevel}
                      </Badge>
                    </h2>
                  </div>
                  <ChapterGrid
                    chapters={syllabusData?.Chemistry}
                    subject="Chemistry"
                    classLevel={classLevel}
                    progress={progressData || {}}
                    isLoading={isLoading}
                    onChapterClick={(chapter) => handleChapterClick(chapter, "Chemistry")}
                  />
                </TabsContent>

                <TabsContent value="Biology" className="mt-0">
                  <div className="space-y-8">
                    <div>
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                          <Leaf className="h-5 w-5 text-green-500" />
                          Botany
                          <Badge variant="secondary" className="ml-2">
                            {classLevel}
                          </Badge>
                        </h2>
                      </div>
                      <ChapterGrid
                        chapters={syllabusData?.Botany}
                        subject="Botany"
                        classLevel={classLevel}
                        progress={progressData || {}}
                        isLoading={isLoading}
                        onChapterClick={(chapter) => handleChapterClick(chapter, "Botany")}
                      />
                    </div>

                    <div>
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                          <Bug className="h-5 w-5 text-amber-500" />
                          Zoology
                          <Badge variant="secondary" className="ml-2">
                            {classLevel}
                          </Badge>
                        </h2>
                      </div>
                      <ChapterGrid
                        chapters={syllabusData?.Zoology}
                        subject="Zoology"
                        classLevel={classLevel}
                        progress={progressData || {}}
                        isLoading={isLoading}
                        onChapterClick={(chapter) => handleChapterClick(chapter, "Zoology")}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
