import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ChevronLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";

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

  const totalPhysicsQuestions = topicsWithCounts?.reduce((sum, topic) => sum + topic.questionCount, 0) || 0;

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
                      setLocation(`/chapter/physics/11/${chapter.id}`);
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
