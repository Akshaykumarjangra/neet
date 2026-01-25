import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PhysicsChapter1 } from "@/components/PhysicsChapter1";
import { PhysicsChapter10 } from "@/components/PhysicsChapter10";
import { PhysicsChapter11 } from "@/components/PhysicsChapter11";
import { PhysicsChapter12 } from "@/components/PhysicsChapter12";
import { PhysicsChapter13 } from "@/components/PhysicsChapter13";
import { PhysicsChapter14 } from "@/components/PhysicsChapter14";

// Map chapter IDs to topic IDs
const chapterToTopicMap: { [key: number]: number } = {
  1: 13,  // Physical World and Measurement
  2: 1,   // Kinematics
  3: 14,  // Motion in a Plane
  4: 2,   // Laws of Motion
  5: 15,  // Work, Energy and Power
  6: 16,  // System of Particles and Rotational Motion
  7: 17,  // Gravitation
  8: 17,  // Gravitation (Advanced) - same topic
  9: 19,  // Properties of Bulk Matter
  10: 21, // Thermodynamics
  11: 21, // Thermodynamics (Advanced) - same topic
  12: 22, // Kinetic Theory
  13: 23, // Oscillations
  14: 3,  // Electrostatics
  15: 26, // Electrostatic Potential and Capacitance
  16: 27, // Current Electricity
  17: 28, // Moving Charges and Magnetism
  18: 29, // Magnetism and Matter
  19: 30, // Electromagnetic Induction
  20: 33, // Ray Optics
  21: 31, // Alternating Current
  22: 32, // Electromagnetic Waves
  23: 35, // Dual Nature of Radiation and Matter
};

const getQuestionCountForChapter = (chapterId: number): number => {
  if (!topicsWithCounts) return 0;

  const topicId = chapterToTopicMap[chapterId];
  if (!topicId) return 0;

  const matchingTopic = topicsWithCounts.find(t => t.id === topicId);
  return matchingTopic?.questionCount || 0;
};

// Get total questions available
const totalPhysicsQuestions = topicsWithCounts?.reduce((sum, topic) => sum + topic.questionCount, 0) || 0;


if (selectedChapter) {
  const SelectedChapterComponent = chapterComponents[selectedChapter];
  const chapterMeta = chapters.find((chapter) => chapter.id === selectedChapter) || null;
  const questionCount = getQuestionCountForChapter(selectedChapter);
  const practiceHref = topicId ? `/practice?topicId=${topicId}` : undefined;
  const hasInteractiveContent = Boolean(SelectedChapterComponent);
  const isLocked = selectedChapter > 3 && !isPremium;

  if (isLocked) {
    setLocation("/pricing");
    return null;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto p-6 space-y-6">
          <Button
            variant="ghost"
            onClick={() => setSelectedChapter(null)}
            className="w-fit"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to chapters
          </Button>

          <div>
            <p className="text-sm text-muted-foreground">Class XI / Physics</p>
            <h1 className="text-3xl font-bold mt-1">
              Chapter {selectedChapter}: {chapterMeta?.title ?? "Coming soon"}
            </h1>
            {!hasInteractiveContent && (
              <p className="mt-2 text-sm text-muted-foreground">
                We're finalizing the detailed reading experience for this chapter. Practice remains available below.
              </p>
            )}
          </div>

          {hasInteractiveContent && SelectedChapterComponent ? (
            <SelectedChapterComponent />
          ) : (
            <ChapterPlaceholder
              subject="Physics"
              chapterNumber={selectedChapter}
              title={chapterMeta?.title}
              questionCount={questionCount}
              practiceHref={practiceHref}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}


return (
  <ThemeProvider>
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Physics - Class XI</h1>
          <p className="text-muted-foreground">
            Complete NEET syllabus with interactive 3D visualizations
            {totalPhysicsQuestions > 0 && ` - ${totalPhysicsQuestions} practice questions available`}
          </p>
        </div>

        <div className="grid gap-4">
          {/* Show all chapters */}
          {chapters.map((chapter) => {
            const questionCount = getQuestionCountForChapter(chapter.id);
            const topicId = chapterToTopicMap[chapter.id];
            const hasInteractiveContent = Boolean(chapterComponents[chapter.id]);
            const practiceHref = topicId ? `/practice?topicId=${topicId}` : undefined;
            const isLocked = chapter.id > 3 && !isPremium;

            return (
              <Card
                key={chapter.id}
                className={`cursor-pointer transition-all ${isLocked ? "opacity-80 grayscale-[0.5] border-muted" : "hover:shadow-lg"} ${hasInteractiveContent ? "" : "opacity-70"}`}
                onClick={() => {
                  if (isLocked) {
                    setLocation("/pricing");
                  } else {
                    setSelectedChapter(chapter.id);
                  }
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">
                            Chapter {chapter.id}: {chapter.title}
                          </h3>
                          {isLocked ? (
                            <Badge variant="outline" className="bg-secondary/50">
                              <Lock className="h-3 w-3 mr-1" />
                              Premium
                            </Badge>
                          ) : (
                            <Badge variant={hasInteractiveContent ? "secondary" : "outline"}>
                              {hasInteractiveContent ? "Interactive" : "Reading soon"}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {questionCount > 0 ? `${questionCount} practice questions available` : "Questions being prepared"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {questionCount > 0 && practiceHref && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = practiceHref;
                          }}
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Practice
                        </Button>
                      )}
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  </ThemeProvider>
);
}
