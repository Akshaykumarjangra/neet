import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PhysicsChapter1 } from "@/components/PhysicsChapter1";
import { PhysicsChapter2 } from "@/components/PhysicsChapter2";
import { PhysicsChapter3 } from "@/components/PhysicsChapter3";
import { PhysicsChapter4 } from "@/components/PhysicsChapter4";
import { PhysicsChapter5 } from "@/components/PhysicsChapter5";
import { PhysicsChapter6 } from "@/components/PhysicsChapter6";
import { PhysicsChapter7 } from "@/components/PhysicsChapter7";
import { PhysicsChapter8 } from "@/components/PhysicsChapter8";
import { PhysicsChapter9 } from "@/components/PhysicsChapter9";
import { PhysicsChapter10 } from "@/components/PhysicsChapter10";
import { PhysicsChapter11 } from "@/components/PhysicsChapter11";
import { PhysicsChapter12 } from "@/components/PhysicsChapter12";
import { PhysicsChapter13 } from "@/components/PhysicsChapter13";
import { PhysicsChapter14 } from "@/components/PhysicsChapter14";
import { PhysicsChapter15 } from "@/components/PhysicsChapter15";
import { PhysicsChapter16 } from "@/components/PhysicsChapter16";
import { PhysicsChapter17 } from "@/components/PhysicsChapter17";
import { PhysicsChapter18 } from "@/components/PhysicsChapter18";
import { PhysicsChapter19 } from "@/components/PhysicsChapter19";
import { PhysicsChapter20 } from "@/components/PhysicsChapter20";
import { PhysicsChapter21 } from "@/components/PhysicsChapter21";
import { PhysicsChapter22 } from "@/components/PhysicsChapter22";
import { PhysicsChapter23 } from "@/components/PhysicsChapter23";
import { ChemistryChapter1 } from "@/components/ChemistryChapter1";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ChevronRight } from "lucide-react";

const chapters = [
  { id: 1, title: "Physical World and Measurement", status: "available", questions: 45 },
  { id: 2, title: "Motion in a Straight Line", status: "available", questions: 60 },
  { id: 3, title: "Motion in a Plane", status: "available", questions: 55 },
  { id: 4, title: "Laws of Motion", status: "available", questions: 65 },
  { id: 5, title: "Work, Energy and Power", status: "available", questions: 60 },
  { id: 6, title: "System of Particles and Rotational Motion", status: "available", questions: 70 },
  { id: 7, title: "Gravitation", status: "available", questions: 65 },
  { id: 8, title: "Gravitation (Advanced)", status: "available", questions: 55 },
  { id: 9, title: "Properties of Bulk Matter", status: "available", questions: 70 },
  { id: 10, title: "Thermodynamics", status: "available", questions: 75 },
  { id: 11, title: "Thermodynamics (Advanced)", status: "available", questions: 65 },
  { id: 12, title: "Kinetic Theory of Gases", status: "available", questions: 60 },
  { id: 13, title: "Oscillations and Waves", status: "available", questions: 70 },
  { id: 14, title: "Electric Charges and Fields", status: "available", questions: 65 },
  { id: 15, title: "Electrostatic Potential and Capacitance", status: "available", questions: 65 },
  { id: 16, title: "Current Electricity", status: "available", questions: 65 },
  { id: 17, title: "Magnetic Effects of Current", status: "available", questions: 65 },
  { id: 18, title: "Magnetism and Matter", status: "available", questions: 65 },
  { id: 19, title: "Electromagnetic Induction", status: "available", questions: 65 },
  { id: 20, title: "Optics", status: "available", questions: 70 },
  { id: 21, title: "Alternating Current", status: "available", questions: 60 },
  { id: 22, title: "Electromagnetic Waves", status: "available", questions: 55 },
  { id: 23, title: "Dual Nature of Radiation and Matter", status: "available", questions: 60 },
];

export default function PhysicsContent() {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null); // Initialize to null to show chapters first

  // Fetch topics with real question counts
  const { data: topicsWithCounts } = useQuery<any[]>({
    queryKey: ['/api/topics/with-counts'],
    select: (data) => data.filter(t => t.subject === 'Physics')
  });

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

  if (selectedChapter === 1) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter1 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 2) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter2 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 3) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter3 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 4) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter4 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 5) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter5 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // New conditional rendering for Chapter 6
  if (selectedChapter === 6) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter6 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 7) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter7 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // New conditional rendering for Chapter 8
  if (selectedChapter === 8) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter8 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 9) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter9 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 10) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter10 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 11) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter11 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 12) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter12 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 13) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter13 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 14) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter14 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 15) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter15 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 16) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter16 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 17) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter17 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 18) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter18 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 19) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter19 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 20) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter20 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 21) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter21 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 22) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter22 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 23) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedChapter(null)}
              className="mb-4"
            >
              ← Back to Chapters
            </Button>
            <PhysicsChapter23 />
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
              {totalPhysicsQuestions > 0 && ` • ${totalPhysicsQuestions} practice questions available`}
            </p>
          </div>

          <div className="grid gap-4">
            {/* Show all chapters */}
            {chapters.map((chapter) => {
              const questionCount = getQuestionCountForChapter(chapter.id);
              const hasQuestions = questionCount > 0;
              const topicId = chapterToTopicMap[chapter.id];

              return (
                <Card
                  key={chapter.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${chapter.status === "coming-soon" ? "opacity-60" : ""
                    }`}
                  onClick={() => {
                    if (chapter.status === "available") {
                      // Always go to chapter content when clicking the card
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
                            {chapter.status === "available" && (
                              <Badge variant="secondary">Available</Badge>
                            )}
                            {chapter.status === "coming-soon" && (
                              <Badge variant="outline">Coming Soon</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {(() => {
                              const realCount = getQuestionCountForChapter(chapter.id);
                              if (realCount > 0) {
                                return `${realCount} practice questions available`;
                              }
                              return "Questions being prepared";
                            })()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const qCount = getQuestionCountForChapter(chapter.id);
                          const tId = chapterToTopicMap[chapter.id];

                          return qCount > 0 && tId ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `/practice?topicId=${tId}`;
                              }}
                            >
                              <BookOpen className="h-4 w-4 mr-2" />
                              Practice
                            </Button>
                          ) : null
                        })()}
                        {chapter.status === "available" && (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
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