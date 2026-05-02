import { useState } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, ChevronRight, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

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
  { id: 36, title: "Environmental Issues", status: "available" },
  { id: 37, title: "Biotechnology: Principles & Processes", status: "available" },
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
  36: { subject: "biology", class: "12", num: 36 }, 
  37: { subject: "biology", class: "12", num: 37 },
};

export default function BotanyContent() {
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
                      } else {
                        // Fallback mapping if not strictly defined
                        setLocation(`/chapter/biology/11/${chapter.id}`);
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
