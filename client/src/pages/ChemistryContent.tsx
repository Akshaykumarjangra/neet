import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, TestTubes, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const chapters = [
  { id: 1, title: "Some Basic Concepts of Chemistry", status: "available", questions: 60, classLevel: "11" },
  { id: 2, title: "Structure of Atom", status: "available", questions: 45, classLevel: "11" },
  { id: 3, title: "Classification of Elements & Periodicity", status: "available", questions: 50, classLevel: "11" },
  { id: 4, title: "Chemical Bonding & Molecular Structure", status: "available", questions: 55, classLevel: "11" },
  { id: 5, title: "States of Matter - Gases & Liquids", status: "available", questions: 50, classLevel: "11" },
  { id: 6, title: "Thermodynamics", status: "available", questions: 60, classLevel: "11" },
  { id: 7, title: "Equilibrium", status: "available", questions: 55, classLevel: "11" },
  { id: 8, title: "Redox Reactions", status: "available", questions: 55, classLevel: "11" },
  { id: 9, title: "Solutions", status: "available", questions: 60, classLevel: "12" },
  { id: 10, title: "Electrochemistry", status: "available", questions: 55, classLevel: "12" },
  { id: 11, title: "Chemical Kinetics", status: "available", questions: 55, classLevel: "12" },
  { id: 12, title: "Surface Chemistry", status: "available", questions: 50, classLevel: "12" },
  { id: 13, title: "Hydrogen", status: "available", questions: 45, classLevel: "11" },
  { id: 14, title: "s-Block Elements", status: "available", questions: 55, classLevel: "11" },
  { id: 15, title: "p-Block Elements", status: "available", questions: 65, classLevel: "11" },
  { id: 16, title: "d- and f-Block Elements", status: "available", questions: 55, classLevel: "12" },
  { id: 17, title: "Coordination Compounds", status: "available", questions: 60, classLevel: "12" },
  { id: 18, title: "General Organic Chemistry", status: "available", questions: 60, classLevel: "11" },
  { id: 19, title: "Hydrocarbons", status: "available", questions: 60, classLevel: "11" },
  { id: 20, title: "Haloalkanes and Haloarenes", status: "available", questions: 60, classLevel: "12" },
  { id: 21, title: "Alcohols, Phenols and Ethers", status: "available", questions: 60, classLevel: "12" },
  { id: 22, title: "Aldehydes, Ketones and Carboxylic Acids", status: "available", questions: 60, classLevel: "12" },
  { id: 23, title: "Amines", status: "available", questions: 60, classLevel: "12" },
  { id: 24, title: "Biomolecules", status: "available", questions: 60, classLevel: "12" },
  { id: 25, title: "Polymers", status: "available", questions: 60, classLevel: "12" },
  { id: 26, title: "Chemistry in Everyday Life", status: "available", questions: 60, classLevel: "12" },
  { id: 27, title: "Environmental Chemistry", status: "available", questions: 60, classLevel: "11" },
  { id: 28, title: "Comprehensive Revision & Mixed Practice", status: "available", questions: 60, classLevel: "12" },
  { id: 29, title: "Practical Chemistry & Lab Techniques", status: "available", questions: 60, classLevel: "12" },
  { id: 30, title: "Final Revision & Exam Strategy", status: "available", questions: 60, classLevel: "12" },
  { id: 31, title: "Advanced Problem Solving", status: "available", questions: 15, classLevel: "12" },
  { id: 32, title: "Full-Length Mock Test", status: "available", questions: 45, classLevel: "12" },
  { id: 33, title: "Topic-Wise Mastery Tests", status: "available", questions: 90, classLevel: "12" },
  { id: 34, title: "Last-Minute Quick Revision", status: "available", questions: 0, classLevel: "12" },
  { id: 35, title: "Error Analysis & Common Pitfalls", status: "available", questions: 0, classLevel: "12" },
  { id: 36, title: "Final Success Blueprint", status: "available", questions: 0, classLevel: "12" },
  { id: 37, title: "Advanced Numerical Problem Solving", status: "available", questions: 20, classLevel: "12" },
  { id: 38, title: "Revision Mind Maps & Quick Reference", status: "available", questions: 0, classLevel: "12" },
  { id: 39, title: "PYQ Analysis & Trends", status: "available", questions: 0, classLevel: "12" },
  { id: 40, title: "Final Countdown Strategy", status: "available", questions: 0, classLevel: "12" },
  { id: 41, title: "Rapid Fire Revision Capsules", status: "available", questions: 0, classLevel: "12" },
  { id: 42, title: "Final Mock Test & Performance Analysis", status: "available", questions: 15, classLevel: "12" },
  { id: 43, title: "Ultimate Speed Strategies", status: "available", questions: 0, classLevel: "12" },
  { id: 44, title: "Exam Day Mastery", status: "available", questions: 0, classLevel: "12" },
  { id: 45, title: "The Solid State", label: "Class XII Chapter 1: The Solid State", status: "available", questions: 50, classLevel: "12" },
];

export default function ChemistryContent() {
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
              <TestTubes className="h-10 w-10 text-purple-500" />
              <h1 className="text-4xl font-bold">Chemistry - Class XI & XII</h1>
            </div>
            <p className="text-muted-foreground">Complete NEET syllabus with interactive visualizations and practice questions</p>
          </div>

          <div className="grid gap-4">
            {chapters.map((chapter) => {
              const isLocked = chapter.id > 3 && !isPremium;
              
              return (
                <Card
                  key={chapter.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${chapter.status === "coming-soon" ? "opacity-60" : ""} ${isLocked ? "opacity-75 grayscale-[0.2] border-muted" : "border-purple-200"}`}
                  onClick={() => {
                    if (chapter.status === "available") {
                      if (isLocked) {
                        setLocation("/pricing");
                      } else {
                        setLocation(`/chapter/chemistry/${chapter.classLevel}/${chapter.id}`);
                      }
                    }
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${isLocked ? "bg-muted" : "bg-purple-500/10"}`}>
                          {isLocked ? (
                            <Lock className="h-6 w-6 text-muted-foreground" />
                          ) : (
                            <TestTubes className="h-6 w-6 text-purple-500" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">
                              {chapter.label ?? `Chapter ${chapter.id}: ${chapter.title}`}
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
