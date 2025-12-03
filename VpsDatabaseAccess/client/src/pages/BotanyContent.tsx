import { useState } from "react";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, ChevronRight } from "lucide-react";

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

export default function BotanyContent() {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

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
            <BotanyChapter1 />
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
            <BotanyChapter2 />
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
            <BotanyChapter3 />
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
            <BotanyChapter4 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 5
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
            <BotanyChapter5 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 6
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
            <BotanyChapter6 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 7
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
            <BotanyChapter7 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 8
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
            <BotanyChapter8 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 9
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
            <BotanyChapter9 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 10
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
            <BotanyChapter10 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 11
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
            <BotanyChapter11 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 12
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
            <BotanyChapter12 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 13
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
            <BotanyChapter13 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 14
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
            <BotanyChapter14 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 15
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
            <BotanyChapter15 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 16
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
            <BotanyChapter16 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 17
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
            <BotanyChapter17 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 18
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
            <BotanyChapter18 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 19
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
            <BotanyChapter19 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 20
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
            <BotanyChapter20 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 21
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
            <BotanyChapter21 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 22
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
            <BotanyChapter22 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 23
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
            <BotanyChapter23 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 24
  if (selectedChapter === 24) {
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
            <BotanyChapter24 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 25
  if (selectedChapter === 25) {
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
            <BotanyChapter25 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 26
  if (selectedChapter === 26) {
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
            <BotanyChapter26 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 27
  if (selectedChapter === 27) {
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
            <BotanyChapter27 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 28
  if (selectedChapter === 28) {
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
            <BotanyChapter28 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 29
  if (selectedChapter === 29) {
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
            <BotanyChapter29 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 30
  if (selectedChapter === 30) {
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
            <BotanyChapter30 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 31
  if (selectedChapter === 31) {
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
            <BotanyChapter31 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 32
  if (selectedChapter === 32) {
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
            <BotanyChapter32 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 33
  if (selectedChapter === 33) {
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
            <BotanyChapter33 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 34
  if (selectedChapter === 34) {
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
            <BotanyChapter34 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 35
  if (selectedChapter === 35) {
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
            <BotanyChapter35 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Added conditional rendering for Chapter 36
  if (selectedChapter === 36) {
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
            <BotanyChapter36 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 37) {
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
            <BotanyChapter37 />
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
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="h-10 w-10 text-green-500" />
              <h1 className="text-4xl font-bold">Botany - Class XI & XII</h1>
            </div>
            <p className="text-muted-foreground">Complete NEET syllabus with interactive visualizations and practice questions</p>
          </div>

          <div className="grid gap-4">
            {chapters.map((chapter) => (
              <Card
                key={chapter.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  chapter.status === "coming-soon" ? "opacity-60" : ""
                }`}
                onClick={() => chapter.status === "available" && setSelectedChapter(chapter.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-green-500" />
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
                          {(chapter.questions ?? 0) > 0
                            ? `${chapter.questions} practice questions available`
                            : "Content being prepared"
                          }
                        </p>
                      </div>
                    </div>
                    {chapter.status === "available" && (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}