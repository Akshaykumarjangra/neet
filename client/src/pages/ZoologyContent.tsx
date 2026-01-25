import { useState } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ZoologyChapter1 } from "@/components/ZoologyChapter1";
import { ZoologyChapter2 } from "@/components/ZoologyChapter2";
import { ZoologyChapter3 } from "@/components/ZoologyChapter3";
import { ZoologyChapter4 } from "@/components/ZoologyChapter4";
import { ZoologyChapter5 } from "@/components/ZoologyChapter5";
import { ZoologyChapter6 } from "@/components/ZoologyChapter6";
import { ZoologyChapter7 } from "@/components/ZoologyChapter7";
import { ZoologyChapter8 } from "@/components/ZoologyChapter8";
import { ZoologyChapter9 } from "@/components/ZoologyChapter9";
import { ZoologyChapter10 } from "@/components/ZoologyChapter10";
import { ZoologyChapter11 } from "@/components/ZoologyChapter11";
import { ZoologyChapter12 } from "@/components/ZoologyChapter12";
import { ZoologyChapter13 } from "@/components/ZoologyChapter13";
import { ZoologyChapter14 } from "@/components/ZoologyChapter14";
import { ZoologyChapter15 } from "@/components/ZoologyChapter15";
import { ZoologyChapter16 } from "@/components/ZoologyChapter16";
import { ZoologyChapter17 } from "@/components/ZoologyChapter17";
import { ZoologyChapter18 } from "@/components/ZoologyChapter18";
import { ZoologyChapter19 } from "@/components/ZoologyChapter19";
import { ZoologyChapter20 } from "@/components/ZoologyChapter20";
import { ZoologyChapter21 } from "@/components/ZoologyChapter21";
import { ZoologyChapter22 } from "@/components/ZoologyChapter22";
import { ZoologyChapter23 } from "@/components/ZoologyChapter23";
import { ZoologyChapter24 } from "@/components/ZoologyChapter24";
import { ZoologyChapter25 } from "@/components/ZoologyChapter25";
import { ZoologyChapter26 } from "@/components/ZoologyChapter26";
import { ZoologyChapter27 } from "@/components/ZoologyChapter27";
import { ZoologyChapter28 } from "@/components/ZoologyChapter28";
import { ZoologyChapter29 } from "@/components/ZoologyChapter29";
import { ZoologyChapter30 } from "@/components/ZoologyChapter30";
import { ZoologyChapter31 } from "@/components/ZoologyChapter31";
import { ZoologyChapter32 } from "@/components/ZoologyChapter32";
import { ZoologyChapter33 } from "@/components/ZoologyChapter33";
import { ZoologyChapter34 } from "@/components/ZoologyChapter34";
import { ZoologyChapter35 } from "@/components/ZoologyChapter35";
import { ZoologyChapter36 } from "@/components/ZoologyChapter36";
import { ZoologyChapter37 } from "@/components/ZoologyChapter37";
import { ZoologyChapter38 } from "@/components/ZoologyChapter38";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dog, ChevronRight } from "lucide-react";

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
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [, setLocation] = useLocation();

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
            <ZoologyChapter1 />
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
            <ZoologyChapter2 />
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
            <ZoologyChapter3 />
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
            <ZoologyChapter4 />
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
            <ZoologyChapter5 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

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
            <ZoologyChapter6 />
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
            <ZoologyChapter7 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

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
            <ZoologyChapter8 />
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
            <ZoologyChapter9 />
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
            <ZoologyChapter10 />
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
            <ZoologyChapter11 />
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
            <ZoologyChapter12 />
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
            <ZoologyChapter13 />
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
            <ZoologyChapter14 />
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
            <ZoologyChapter15 />
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
            <ZoologyChapter16 />
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
            <ZoologyChapter17 />
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
            <ZoologyChapter18 />
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
            <ZoologyChapter19 />
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
            <ZoologyChapter20 />
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
            <ZoologyChapter21 />
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
            <ZoologyChapter22 />
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
            <ZoologyChapter23 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

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
            <ZoologyChapter24 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

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
            <ZoologyChapter25 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

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
            <ZoologyChapter26 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

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
            <ZoologyChapter27 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

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
            <ZoologyChapter28 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

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
            <ZoologyChapter29 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

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
            <ZoologyChapter30 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

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
            <ZoologyChapter31 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

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
            <ZoologyChapter32 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

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
            <ZoologyChapter33 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

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
            <ZoologyChapter34 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

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
            <ZoologyChapter35 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

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
            <ZoologyChapter36 />
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
            <ZoologyChapter37 />
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (selectedChapter === 38) {
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
            <ZoologyChapter38 />
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
              <Dog className="h-10 w-10 text-orange-500" />
              <h1 className="text-4xl font-bold">Zoology - Class XI & XII</h1>
            </div>
            <p className="text-muted-foreground">Complete NEET syllabus with interactive visualizations and practice questions</p>
          </div>

          <div className="grid gap-4">
            {chapters.map((chapter) => (
              <Card
                key={chapter.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${chapter.status === "coming-soon" ? "opacity-60" : ""
                  }`}
                onClick={() => {
                  if (chapter.status === "available") {
                    const mapping = chapterMapping[chapter.id];
                    if (mapping) {
                      setLocation(`/chapter/${mapping.subject}/${mapping.class}/${mapping.num}`);
                    } else {
                      setSelectedChapter(chapter.id);
                    }
                  }
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <Dog className="h-6 w-6 text-orange-500" />
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
                          {chapter.questions > 0
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