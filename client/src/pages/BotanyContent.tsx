import { useState } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, ChevronRight, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { BotanyChapter1 } from "@/components/BotanyChapter1";
import { BotanyChapter2 } from "@/components/BotanyChapter2";
import { BotanyChapter3 } from "@/components/BotanyChapter3";
import { BotanyChapter4 } from "@/components/BotanyChapter4";
import { BotanyChapter5 } from "@/components/BotanyChapter5";
import { BotanyChapter6 } from "@/components/BotanyChapter6";
import { BotanyChapter7 } from "@/components/BotanyChapter7";
import { BotanyChapter8 } from "@/components/BotanyChapter8";
import { BotanyChapter9 } from "@/components/BotanyChapter9";
import { BotanyChapter10 } from "@/components/BotanyChapter10";
import { BotanyChapter11 } from "@/components/BotanyChapter11";
import { BotanyChapter12 } from "@/components/BotanyChapter12";
import { BotanyChapter13 } from "@/components/BotanyChapter13";
import { BotanyChapter14 } from "@/components/BotanyChapter14";
import { BotanyChapter15 } from "@/components/BotanyChapter15";
import { BotanyChapter16 } from "@/components/BotanyChapter16";
import { BotanyChapter17 } from "@/components/BotanyChapter17";
import { BotanyChapter18 } from "@/components/BotanyChapter18";
import { BotanyChapter19 } from "@/components/BotanyChapter19";
import { BotanyChapter20 } from "@/components/BotanyChapter20";
import { BotanyChapter21 } from "@/components/BotanyChapter21";
import { BotanyChapter22 } from "@/components/BotanyChapter22";
import { BotanyChapter23 } from "@/components/BotanyChapter23";
import { BotanyChapter24 } from "@/components/BotanyChapter24";
import { BotanyChapter25 } from "@/components/BotanyChapter25";
import { BotanyChapter26 } from "@/components/BotanyChapter26";
import { BotanyChapter27 } from "@/components/BotanyChapter27";
import { BotanyChapter28 } from "@/components/BotanyChapter28";
import { BotanyChapter29 } from "@/components/BotanyChapter29";
import { BotanyChapter30 } from "@/components/BotanyChapter30";
import { BotanyChapter31 } from "@/components/BotanyChapter31";
import { BotanyChapter32 } from "@/components/BotanyChapter32";
import { BotanyChapter33 } from "@/components/BotanyChapter33";
import { BotanyChapter34 } from "@/components/BotanyChapter34";
import { BotanyChapter35 } from "@/components/BotanyChapter35";
import { BotanyChapter36 } from "@/components/BotanyChapter36";
import { BotanyChapter37 } from "@/components/BotanyChapter37";

// Chapter metadata
const chapters = [
  { id: 1, title: "The Living World", status: "available", questions: 45 },
  { id: 2, title: "Biological Classification", status: "available", questions: 50 },
  { id: 3, title: "Plant Kingdom", status: "available", questions: 60 },
  { id: 4, title: "Morphology of Flowering Plants", status: "available", questions: 55 },
  { id: 5, title: "Anatomy of Flowering Plants", status: "available", questions: 50 },
  { id: 6, title: "Structural Organisation in Animals", status: "available", questions: 40 },
  { id: 7, title: "Cell Cycle and Cell Division", status: "available", questions: 45 },
  { id: 8, title: "Transport in Plants", status: "available", questions: 50 },
  { id: 9, title: "Photosynthesis", status: "available", questions: 55 },
  { id: 10, title: "Respiration in Plants", status: "available", questions: 50 },
  { id: 11, title: "Plant Growth and Development", status: "available", questions: 60 },
  { id: 12, title: "Sexual Reproduction in Flowering Plants", status: "available", questions: 50 },
  { id: 13, title: "Principles of Inheritance and Variation", status: "available", questions: 55 },
  { id: 14, title: "Molecular Basis of Inheritance", status: "available", questions: 50 },
  { id: 15, title: "Evolution", status: "available", questions: 55 },
  { id: 16, title: "Human Health and Disease", status: "available", questions: 50 },
  { id: 17, title: "Strategies for Enhancement in Food Production", status: "available", questions: 50 },
  { id: 18, title: "Microbes in Human Welfare", status: "available", questions: 45 },
  { id: 19, title: "Biotechnology and its Applications", status: "available", questions: 55 },
  { id: 20, title: "Biodiversity and Conservation", status: "available", questions: 50 },
  { id: 21, title: "Organisms and Populations", status: "available", questions: 50 },
  { id: 22, title: "Ecosystem", status: "available", questions: 55 },
  { id: 23, title: "Biotechnology and its Applications", status: "available", questions: 55 },
  { id: 24, title: "Biodiversity and Conservation", status: "available", questions: 50 },
  { id: 25, title: "Environmental Issues", status: "available", questions: 50 },
  { id: 26, title: "Organisms and Populations", status: "available", questions: 50 },
  { id: 27, title: "Ecosystem", status: "available", questions: 55 },
  { id: 28, title: "Ecological Succession", status: "available", questions: 50 },
  { id: 29, title: "Environmental Biotechnology", status: "available", questions: 55 },
  { id: 30, title: "Environmental Issues", status: "available", questions: 50 },
  { id: 31, title: "Ecosystem", status: "available", questions: 55 },
  { id: 32, title: "Ecosystem Services and Functions", status: "available", questions: 55 },
  { id: 33, title: "Strategies for Enhancement in Food Production", status: "available", questions: 50 },
  { id: 34, title: "Biotechnology and its Applications", status: "available", questions: 55 },
  { id: 35, title: "Biodiversity & Conservation", status: "available", questions: 50 },
  { id: 36, title: "Environmental Issues", component: BotanyChapter36 },
  { id: 37, title: "Biotechnology: Principles & Processes", component: BotanyChapter37 },
];

const chapterMapping: Record<number, { subject: string; class: string; num: number }> = {
  // Class 11
  1: { subject: "biology", class: "11", num: 1 },
  2: { subject: "biology", class: "11", num: 2 },
  3: { subject: "biology", class: "11", num: 3 },
  4: { subject: "biology", class: "11", num: 4 },
  5: { subject: "biology", class: "11", num: 5 },
  6: { subject: "biology", class: "11", num: 6 },
  7: { subject: "biology", class: "11", num: 7 },
  8: { subject: "biology", class: "11", num: 8 },
  9: { subject: "biology", class: "11", num: 9 },
  10: { subject: "biology", class: "11", num: 10 },
  11: { subject: "biology", class: "11", num: 11 },
  // Class 12
  12: { subject: "biology", class: "12", num: 1 }, // Sexual Repro in Flowering Plants
  13: { subject: "biology", class: "12", num: 2 }, // Principles of Inheritance
};

const componentMap: Record<number, React.ComponentType> = {
  1: BotanyChapter1,
  2: BotanyChapter2,
  3: BotanyChapter3,
  4: BotanyChapter4,
  5: BotanyChapter5,
  6: BotanyChapter6,
  7: BotanyChapter7,
  8: BotanyChapter8,
  9: BotanyChapter9,
  10: BotanyChapter10,
  11: BotanyChapter11,
  12: BotanyChapter12,
  13: BotanyChapter13,
  14: BotanyChapter14,
  15: BotanyChapter15,
  16: BotanyChapter16,
  17: BotanyChapter17,
  18: BotanyChapter18,
  19: BotanyChapter19,
  20: BotanyChapter20,
  21: BotanyChapter21,
  22: BotanyChapter22,
  23: BotanyChapter23,
  24: BotanyChapter24,
  25: BotanyChapter25,
  26: BotanyChapter26,
  27: BotanyChapter27,
  28: BotanyChapter28,
  29: BotanyChapter29,
  30: BotanyChapter30,
  31: BotanyChapter31,
  32: BotanyChapter32,
  33: BotanyChapter33,
  34: BotanyChapter34,
  35: BotanyChapter35,
  36: BotanyChapter36,
  37: BotanyChapter37,
};

export default function BotanyContent() {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const isPremium = user?.isPaidUser || false;

  if (selectedChapter !== null) {
    const Component = componentMap[selectedChapter];
    if (Component) {
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
              <Component />
            </div>
          </div>
        </ThemeProvider>
      );
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto p-6">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="h-10 w-10 text-green-500" />
              <h1 className="text-4xl font-bold">Botany - Class XI & XII</h1>
            </div>
            <p className="text-muted-foreground">Complete NEET syllabus with interactive visualizations and practice questions</p>
          </div>

          <div className="grid gap-4">
            {chapters.map((chapter) => {
              const mapping = chapterMapping[chapter.id];
              const chapterNum = mapping ? mapping.num : 0;
              const isLocked = chapterNum > 3 && !isPremium;

              return (
                <Card
                  key={chapter.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${chapter.status === "coming-soon" ? "opacity-60" : ""
                    } ${isLocked ? "opacity-75 grayscale-[0.2] border-muted" : "border-green-200"}`}
                  onClick={() => {
                    if (chapter.status === "available") {
                      if (isLocked) {
                        setLocation("/pricing");
                        return;
                      }
                      if (mapping) {
                        setLocation(`/chapter/${mapping.subject}/${mapping.class}/${mapping.num}`);
                      }
                    }
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${isLocked ? "bg-muted" : "bg-green-500/10"
                          }`}>
                          {isLocked ? (
                            <Lock className="h-6 w-6 text-muted-foreground" />
                          ) : (
                            <Leaf className="h-6 w-6 text-green-500" />
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
                            {(chapter.questions ?? 0) > 0
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
