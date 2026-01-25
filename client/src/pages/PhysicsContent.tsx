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
import { ChevronLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { ChapterPlaceholder } from "@/components/ChapterPlaceholder";

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

// Component Map 
const chapterComponents: { [key: number]: React.ComponentType } = {
  1: PhysicsChapter1,
  10: PhysicsChapter10,
  11: PhysicsChapter11,
  12: PhysicsChapter12,
  13: PhysicsChapter13,
  14: PhysicsChapter14,
};

const chapters = [
  { id: 1, title: "Physical World and Measurement" },
  { id: 2, title: "Kinematics" },
  { id: 3, title: "Motion in a Plane" },
  { id: 4, title: "Laws of Motion" },
  { id: 5, title: "Work, Energy and Power" },
  { id: 6, title: "System of Particles and Rotational Motion" },
  { id: 7, title: "Gravitation" },
  { id: 8, title: "Mechanical Properties of Solids" },
  { id: 9, title: "Mechanical Properties of Fluids" },
  { id: 10, title: "Thermal Properties of Matter" },
  { id: 11, title: "Thermodynamics" },
  { id: 12, title: "Kinetic Theory" },
  { id: 13, title: "Oscillations" },
  { id: 14, title: "Waves" },
];

export default function PhysicsContent() {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const isPremium = user?.isPaidUser || false;

  const { data: topicsWithCounts } = useQuery<{ id: number; questionCount: number }[]>({
    queryKey: ["/api/topics/counts"],
  });

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
    const topicId = chapterToTopicMap[selectedChapter];
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

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((chapter) => {
              const questionCount = getQuestionCountForChapter(chapter.id);
              const isLocked = chapter.id > 3 && !isPremium;

              return (
                <Card
                  key={chapter.id}
                  className={`
                    cursor-pointer transition-all hover:shadow-lg
                    ${isLocked ? "opacity-75 border-orange-200 bg-orange-50/10" : ""}
                  `}
                  onClick={() => {
                    if (isLocked) {
                      setLocation("/pricing");
                    } else {
                      setSelectedChapter(chapter.id);
                    }
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Chapter {chapter.id}</Badge>
                        {isLocked && <Lock className="h-3 w-3 text-orange-500" />}
                      </div>
                      {questionCount > 0 && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {questionCount} Qs
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[3.5rem]">
                      {chapter.title}
                    </h3>

                    <div className="text-sm text-muted-foreground mt-4">
                      {isLocked ? (
                        <span className="text-orange-600 flex items-center gap-1 font-medium">
                          Premium Content
                        </span>
                      ) : (
                        "Tap to open"
                      )}
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
