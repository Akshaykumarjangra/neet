
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
import { Leaf, Dog, ChevronRight, Dna } from "lucide-react";

const chapters = [
  // Botany Chapters
  { id: "B1", title: "The Living World", status: "available", questions: 45, type: "botany" },
  { id: "B2", title: "Biological Classification", status: "available", questions: 50, type: "botany" },
  { id: "B3", title: "Plant Kingdom", status: "available", questions: 60, type: "botany" },
  { id: "B4", title: "Morphology of Flowering Plants", status: "available", questions: 55, type: "botany" },
  { id: "B5", title: "Anatomy of Flowering Plants", status: "available", questions: 50, type: "botany" },
  { id: "B6", title: "Structural Organisation in Animals", status: "available", questions: 40, type: "botany" },
  { id: "B7", title: "Cell Cycle and Cell Division", status: "available", questions: 45, type: "botany" },
  { id: "B8", title: "Transport in Plants", status: "available", questions: 50, type: "botany" },
  { id: "B9", title: "Photosynthesis", status: "available", questions: 55, type: "botany" },
  { id: "B10", title: "Respiration in Plants", status: "available", questions: 50, type: "botany" },
  { id: "B11", title: "Plant Growth and Development", status: "available", questions: 60, type: "botany" },
  { id: "B12", title: "Sexual Reproduction in Flowering Plants", status: "available", questions: 50, type: "botany" },
  { id: "B13", title: "Principles of Inheritance and Variation", status: "available", questions: 55, type: "botany" },
  { id: "B14", title: "Molecular Basis of Inheritance", status: "available", questions: 50, type: "botany" },
  { id: "B15", title: "Evolution", status: "available", questions: 55, type: "botany" },
  { id: "B16", title: "Human Health and Disease", status: "available", questions: 50, type: "botany" },
  { id: "B17", title: "Strategies for Enhancement in Food Production", status: "available", questions: 50, type: "botany" },
  { id: "B18", title: "Microbes in Human Welfare", status: "available", questions: 45, type: "botany" },
  { id: "B19", title: "Biotechnology and its Applications", status: "available", questions: 55, type: "botany" },
  { id: "B20", title: "Biodiversity and Conservation", status: "available", questions: 50, type: "botany" },
  { id: "B21", title: "Organisms and Populations", status: "available", questions: 50, type: "botany" },
  { id: "B22", title: "Ecosystem", status: "available", questions: 55, type: "botany" },
  { id: "B23", title: "Biotechnology and its Applications", status: "available", questions: 55, type: "botany" },
  { id: "B24", title: "Biodiversity and Conservation", status: "available", questions: 50, type: "botany" },
  { id: "B25", title: "Environmental Issues", status: "available", questions: 50, type: "botany" },
  { id: "B26", title: "Organisms and Populations", status: "available", questions: 50, type: "botany" },
  { id: "B27", title: "Ecosystem", status: "available", questions: 55, type: "botany" },
  { id: "B28", title: "Ecological Succession", status: "available", questions: 50, type: "botany" },
  { id: "B29", title: "Environmental Biotechnology", status: "available", questions: 55, type: "botany" },
  { id: "B30", title: "Environmental Issues", status: "available", questions: 50, type: "botany" },
  { id: "B31", title: "Ecosystem", status: "available", questions: 55, type: "botany" },
  { id: "B32", title: "Ecosystem Services and Functions", status: "available", questions: 55, type: "botany" },
  { id: "B33", title: "Strategies for Enhancement in Food Production", status: "available", questions: 50, type: "botany" },
  { id: "B34", title: "Biotechnology and its Applications", status: "available", questions: 55, type: "botany" },
  { id: "B35", title: "Biodiversity & Conservation", status: "available", questions: 50, type: "botany" },
  { id: "B36", title: "Environmental Issues", status: "available", questions: 50, type: "botany" },
  { id: "B37", title: "Biotechnology: Principles & Processes", status: "available", questions: 50, type: "botany" },
  
  // Zoology Chapters
  { id: "Z1", title: "Animal Kingdom", status: "available", questions: 45, type: "zoology" },
  { id: "Z2", title: "Structural Organization in Animals", status: "available", questions: 50, type: "zoology" },
  { id: "Z3", title: "Biomolecules", status: "available", questions: 55, type: "zoology" },
  { id: "Z4", title: "Digestion and Absorption", status: "available", questions: 50, type: "zoology" },
  { id: "Z5", title: "Breathing and Exchange of Gases", status: "available", questions: 50, type: "zoology" },
  { id: "Z6", title: "Body Fluids and Circulation", status: "available", questions: 50, type: "zoology" },
  { id: "Z7", title: "Excretory Products and Elimination", status: "available", questions: 50, type: "zoology" },
  { id: "Z8", title: "Locomotion and Movement", status: "available", questions: 50, type: "zoology" },
  { id: "Z9", title: "Neural Control and Coordination", status: "available", questions: 50, type: "zoology" },
  { id: "Z10", title: "Chemical Coordination and Integration", status: "available", questions: 50, type: "zoology" },
  { id: "Z11", title: "Reproduction in Organisms", status: "available", questions: 50, type: "zoology" },
  { id: "Z12", title: "Sexual Reproduction in Flowering Plants", status: "available", questions: 50, type: "zoology" },
  { id: "Z13", title: "Human Reproduction", status: "available", questions: 50, type: "zoology" },
  { id: "Z14", title: "Reproductive Health", status: "available", questions: 50, type: "zoology" },
  { id: "Z15", title: "Principles of Inheritance and Variation", status: "available", questions: 50, type: "zoology" },
  { id: "Z16", title: "Molecular Basis of Inheritance", status: "available", questions: 50, type: "zoology" },
  { id: "Z17", title: "Evolution", status: "available", questions: 50, type: "zoology" },
  { id: "Z18", title: "Human Health and Disease", status: "available", questions: 50, type: "zoology" },
  { id: "Z19", title: "Strategies for Enhancement in Food Production", status: "available", questions: 50, type: "zoology" },
  { id: "Z20", title: "Microbes in Human Welfare", status: "available", questions: 50, type: "zoology" },
  { id: "Z21", title: "Biotechnology: Principles and Processes", status: "available", questions: 50, type: "zoology" },
  { id: "Z22", title: "Biotechnology and its Applications", status: "available", questions: 50, type: "zoology" },
  { id: "Z23", title: "Organisms and Populations", status: "available", questions: 50, type: "zoology" },
  { id: "Z24", title: "Ecosystem", status: "available", questions: 50, type: "zoology" },
  { id: "Z25", title: "Biodiversity and Conservation", status: "available", questions: 50, type: "zoology" },
  { id: "Z26", title: "Environmental Issues", status: "available", questions: 50, type: "zoology" },
  { id: "Z27", title: "Animal Husbandry", status: "available", questions: 50, type: "zoology" },
  { id: "Z28", title: "Apiculture and Sericulture", status: "available", questions: 50, type: "zoology" },
  { id: "Z29", title: "Dairy Farm Management", status: "available", questions: 50, type: "zoology" },
  { id: "Z30", title: "Poultry Farming", status: "available", questions: 50, type: "zoology" },
  { id: "Z31", title: "Animal Breeding", status: "available", questions: 50, type: "zoology" },
  { id: "Z32", title: "Fishery Sciences", status: "available", questions: 50, type: "zoology" },
  { id: "Z33", title: "Immunology", status: "available", questions: 50, type: "zoology" },
  { id: "Z34", title: "Cancer Biology", status: "available", questions: 50, type: "zoology" },
  { id: "Z35", title: "Neurological Disorders", status: "available", questions: 50, type: "zoology" },
  { id: "Z36", title: "NEET Last Week Revision", status: "available", questions: 50, type: "zoology" },
  { id: "Z37", title: "Stem Cells and Regenerative Medicine", status: "available", questions: 50, type: "zoology" },
  { id: "Z38", title: "Aging and Gerontology", status: "available", questions: 50, type: "zoology" },
];

const componentMap: Record<string, any> = {
  B1: BotanyChapter1, B2: BotanyChapter2, B3: BotanyChapter3, B4: BotanyChapter4, B5: BotanyChapter5,
  B6: BotanyChapter6, B7: BotanyChapter7, B8: BotanyChapter8, B9: BotanyChapter9, B10: BotanyChapter10,
  B11: BotanyChapter11, B12: BotanyChapter12, B13: BotanyChapter13, B14: BotanyChapter14, B15: BotanyChapter15,
  B16: BotanyChapter16, B17: BotanyChapter17, B18: BotanyChapter18, B19: BotanyChapter19, B20: BotanyChapter20,
  B21: BotanyChapter21, B22: BotanyChapter22, B23: BotanyChapter23, B24: BotanyChapter24, B25: BotanyChapter25,
  B26: BotanyChapter26, B27: BotanyChapter27, B28: BotanyChapter28, B29: BotanyChapter29, B30: BotanyChapter30,
  B31: BotanyChapter31, B32: BotanyChapter32, B33: BotanyChapter33, B34: BotanyChapter34, B35: BotanyChapter35,
  B36: BotanyChapter36, B37: BotanyChapter37,
  Z1: ZoologyChapter1, Z2: ZoologyChapter2, Z3: ZoologyChapter3, Z4: ZoologyChapter4, Z5: ZoologyChapter5,
  Z6: ZoologyChapter6, Z7: ZoologyChapter7, Z8: ZoologyChapter8, Z9: ZoologyChapter9, Z10: ZoologyChapter10,
  Z11: ZoologyChapter11, Z12: ZoologyChapter12, Z13: ZoologyChapter13, Z14: ZoologyChapter14, Z15: ZoologyChapter15,
  Z16: ZoologyChapter16, Z17: ZoologyChapter17, Z18: ZoologyChapter18, Z19: ZoologyChapter19, Z20: ZoologyChapter20,
  Z21: ZoologyChapter21, Z22: ZoologyChapter22, Z23: ZoologyChapter23, Z24: ZoologyChapter24, Z25: ZoologyChapter25,
  Z26: ZoologyChapter26, Z27: ZoologyChapter27, Z28: ZoologyChapter28, Z29: ZoologyChapter29, Z30: ZoologyChapter30,
  Z31: ZoologyChapter31, Z32: ZoologyChapter32, Z33: ZoologyChapter33, Z34: ZoologyChapter34, Z35: ZoologyChapter35,
  Z36: ZoologyChapter36, Z37: ZoologyChapter37, Z38: ZoologyChapter38,
};

export default function BiologyContent() {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChapterSelect = (chapterId: string) => {
    setIsLoading(true);
    // Small delay to show loading state
    setTimeout(() => {
      setSelectedChapter(chapterId);
      setIsLoading(false);
    }, 100);
  };

  if (selectedChapter) {
    const ChapterComponent = componentMap[selectedChapter];
    if (ChapterComponent) {
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
              <ChapterComponent />
            </div>
          </div>
        </ThemeProvider>
      );
    } else {
      // Chapter not found, return to chapter list
      setSelectedChapter(null);
    }
  }
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background gradient-mesh-bg">
        <Header />
        {isLoading && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading chapter...</p>
            </div>
          </div>
        )}
        <div className="container mx-auto p-6">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Dna className="h-10 w-10 text-emerald-500" />
              <h1 className="text-4xl font-bold">Biology - Class XI & XII</h1>
            </div>
            <p className="text-muted-foreground">Complete NEET syllabus with interactive visualizations and practice questions</p>
          </div>

          {/* Botany Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="h-8 w-8 text-green-500" />
              <h2 className="text-3xl font-bold">Botany</h2>
            </div>
            <div className="grid gap-4">
              {chapters.filter(ch => ch.type === "botany").map((chapter) => (
                <Card
                  key={chapter.id}
                  className="cursor-pointer transition-all hover:shadow-lg"
                  onClick={() => handleChapterSelect(chapter.id)}
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
                              {chapter.title}
                            </h3>
                            <Badge variant="secondary">Available</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {chapter.questions} practice questions available
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Zoology Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Dog className="h-8 w-8 text-orange-500" />
              <h2 className="text-3xl font-bold">Zoology</h2>
            </div>
            <div className="grid gap-4">
              {chapters.filter(ch => ch.type === "zoology").map((chapter) => (
                <Card
                  key={chapter.id}
                  className="cursor-pointer transition-all hover:shadow-lg"
                  onClick={() => handleChapterSelect(chapter.id)}
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
                              {chapter.title}
                            </h3>
                            <Badge variant="secondary">Available</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {chapter.questions} practice questions available
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
