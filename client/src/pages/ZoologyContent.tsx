import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dog, ChevronRight, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const chapters = [
  { id: 1, title: "Animal Kingdom", status: "available", questions: 45 },
  { id: 2, title: "Structural Organization in Animals", status: "available", questions: 50 },
  { id: 3, title: "Biomolecules", status: "available", questions: 55 },
  { id: 4, title: "Digestion and Absorption", status: "available", questions: 50 },
  { id: 5, title: "Breathing and Exchange of Gases", status: "available", questions: 50 },
  { id: 6, title: "Body Fluids and Circulation", status: "available", questions: 50 },
  { id: 7, title: "Excretory Products and Elimination", status: "available", questions: 50 },
  { id: 8, title: "Locomotion and Movement", status: "available", questions: 50 },
  { id: 9, title: "Neural Control and Coordination", status: "available", questions: 50 },
  { id: 10, title: "Chemical Coordination and Integration", status: "available", questions: 50 },
  { id: 11, title: "Reproduction in Organisms", status: "available", questions: 50 },
  { id: 12, title: "Sexual Reproduction in Flowering Plants", status: "available", questions: 50 },
  { id: 13, title: "Human Reproduction", status: "available", questions: 50 },
  { id: 14, title: "Reproductive Health", status: "available", questions: 50 },
  { id: 15, title: "Principles of Inheritance and Variation", status: "available", questions: 50 },
  { id: 16, title: "Molecular Basis of Inheritance", status: "available", questions: 50 },
  { id: 17, title: "Evolution", status: "available", questions: 50 },
  { id: 18, title: "Human Health and Disease", status: "available", questions: 50 },
  { id: 19, title: "Strategies for Enhancement in Food Production", status: "available", questions: 50 },
  { id: 20, title: "Microbes in Human Welfare", status: "available", questions: 50 },
  { id: 21, title: "Biotechnology: Principles and Processes", status: "available", questions: 50 },
  { id: 22, title: "Biotechnology and its Applications", status: "available", questions: 50 },
  { id: 23, title: "Organisms and Populations", status: "available", questions: 50 },
  { id: 24, title: "Ecosystem", status: "available", questions: 50 },
  { id: 25, title: "Biodiversity and Conservation", status: "available", questions: 50 },
  { id: 26, title: "Environmental Issues", status: "available", questions: 50 },
  { id: 27, title: "Animal Husbandry", status: "available", questions: 50 },
  { id: 28, title: "Apiculture and Sericulture", status: "available", questions: 50 },
  { id: 29, title: "Dairy Farm Management", status: "available", questions: 50 },
  { id: 30, title: "Poultry Farming", status: "available", questions: 50 },
  { id: 31, title: "Animal Breeding", status: "available", questions: 50 },
  { id: 32, title: "Fishery Sciences", status: "available", questions: 50 },
  { id: 33, title: "Immunology", status: "available", questions: 50 },
  { id: 34, title: "Cancer Biology", status: "available", questions: 50 },
  { id: 35, title: "Neurological Disorders", status: "available", questions: 50 },
  { id: 36, title: "NEET Last Week Revision", status: "available", questions: 50 },
  { id: 37, title: "Stem Cells and Regenerative Medicine", status: "available", questions: 50 },
  { id: 38, title: "Aging and Gerontology", status: "available", questions: 50 },
];

const chapterMapping: Record<number, { subject: string; class: string; num: number }> = {
  // Class 11
  1: { subject: "biology", class: "11", num: 4 }, // Animal Kingdom
  2: { subject: "biology", class: "11", num: 7 }, // Structural Org
  3: { subject: "biology", class: "11", num: 9 }, // Biomolecules
  4: { subject: "biology", class: "11", num: 16 }, // Digestion
  5: { subject: "biology", class: "11", num: 17 }, // Breathing
  6: { subject: "biology", class: "11", num: 18 }, // Body Fluids
  7: { subject: "biology", class: "11", num: 19 }, // Excretory
  8: { subject: "biology", class: "11", num: 20 }, // Locomotion
  9: { subject: "biology", class: "11", num: 21 }, // Neural
  10: { subject: "biology", class: "11", num: 22 }, // Chemical
  // Class 12
  11: { subject: "biology", class: "12", num: 1 }, // Repro in Org
  13: { subject: "biology", class: "12", num: 3 }, // Human Repro
  14: { subject: "biology", class: "12", num: 4 }, // Repro Health
  17: { subject: "biology", class: "12", num: 7 }, // Evolution
};

export default function ZoologyContent() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const isPremium = user?.isPaidUser || false;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto p-6">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Dog className="h-10 w-10 text-orange-500" />
              <h1 className="text-4xl font-bold">Zoology - Class XI & XII</h1>
            </div>
            <p className="text-muted-foreground">Complete NEET syllabus with interactive visualizations and practice questions</p>
          </div>

          <div className="grid gap-4">
            {chapters.map((chapter) => {
              const mapping = chapterMapping[chapter.id];
              const isLocked = chapter.id > 3 && !isPremium;

              return (
                <Card
                  key={chapter.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${chapter.status === "coming-soon" ? "opacity-60" : ""} ${isLocked ? "opacity-75 grayscale-[0.2] border-muted" : "border-orange-200"}`}
                  onClick={() => {
                    if (chapter.status === "available") {
                      if (isLocked) {
                        setLocation("/pricing");
                      } else {
                        const classLevel = mapping ? mapping.class : "11";
                        const num = mapping ? mapping.num : chapter.id;
                        setLocation(`/chapter/biology/${classLevel}/${num}`);
                      }
                    }
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${isLocked ? "bg-muted" : "bg-orange-500/10"}`}>
                          {isLocked ? (
                            <Lock className="h-6 w-6 text-muted-foreground" />
                          ) : (
                            <Dog className="h-6 w-6 text-orange-500" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">
                              Chapter {chapter.id}: {chapter.title}
                            </h3>
                            {isLocked ? (
                              <Badge variant="outline" className="bg-muted text-muted-foreground">Premium</Badge>
                            ) : (
                              chapter.status === "available" ? (
                                <Badge variant="secondary">Available</Badge>
                              ) : (
                                <Badge variant="outline">Coming Soon</Badge>
                              )
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {chapter.questions > 0
                              ? `${chapter.questions} practice questions available`
                              : "Content being prepared"
                            }
                          </p>
                        </div>
                      </div>
                      {chapter.status === "available" && !isLocked && (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                      {isLocked && (
                        <Lock className="h-4 w-4 text-muted-foreground opacity-50" />
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