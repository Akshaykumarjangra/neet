import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Lightbulb,
  Calculator,
  Zap,
  Box,
  Layers,
  Grid3X3,
  Radiation,
  Loader2,
} from "lucide-react";
import { normalizeLegacyQuestions } from "@/lib/questionUtils";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter45Topics: Topic[] = [
  {
    id: "classification",
    title: "Classification of Solids",
    description:
      "Differentiate crystalline solids from amorphous solids and explore the seven crystal systems.",
    keyPoints: [
      "Crystalline solids have long-range order, sharp melting points and are anisotropic.",
      "Amorphous solids (glass, rubber) lack long-range order, soften over a range of temperatures and are isotropic.",
      "Seven crystal systems with 14 Bravais lattices describe every possible 3D arrangement.",
      "Unit cell is the smallest repeating 3D pattern that reproduces the lattice when translated in x, y, z.",
      "Ionic, covalent, metallic and molecular solids differ in bonding, conductivity and hardness.",
    ],
    examples: [
      "Ionic solid: NaCl (electrostatic forces, brittle, conducts in molten state).",
      "Covalent/network: Diamond, SiO2 (very hard, high melting point).",
      "Metallic: Fe, Cu (malleable, ductile, good conductors).",
      "Molecular: Ice, iodine (soft, low melting point, poor conductors).",
    ],
    formulas: [
      "Density (rho) = (Z * M) / (N_A * a^3) for cubic unit cells",
      "Z (number of atoms per unit cell): sc = 1, bcc = 2, fcc = 4",
    ],
  },
  {
    id: "unit-cells",
    title: "Unit Cells and Packing Efficiency",
    description:
      "Evaluate contribution of lattice points, coordination number and packing fraction in cubic cells.",
    keyPoints: [
      "Simple cubic (sc): CN = 6, 52.4% packing efficiency.",
      "Body centered cubic (bcc): CN = 8, 68% packing efficiency.",
      "Face centered cubic (fcc/ccp): CN = 12, 74% packing efficiency (highest for equal spheres).",
      "hcp (hexagonal close packed) and ccp have ABAB... and ABCABC... layer arrangements respectively.",
      "Number of tetrahedral voids = 2n, octahedral voids = n for n close packed spheres.",
    ],
    examples: [
      "In NaCl, Cl- forms fcc lattice and Na+ occupies all octahedral voids (coordination 6:6).",
      "ZnS (zinc blende): S2- in fcc, Zn2+ occupies half the tetrahedral voids (coordination 4:4).",
      "CaF2 (fluorite): Ca2+ in fcc, F- occupies all tetrahedral voids.",
    ],
    formulas: [
      "a_sc = 2r, a_bcc = (4r) / sqrt(3), a_fcc = 2 * sqrt(2) * r",
      "Packing efficiency = (volume occupied by spheres / volume of unit cell) * 100",
    ],
  },
  {
    id: "defects",
    title: "Imperfections in Solids",
    description:
      "Point defects, stoichiometric/non-stoichiometric defects and impurities influence properties.",
    keyPoints: [
      "Schottky defect: Pair of cation-anion vacancies; density decreases.",
      "Frenkel defect: Ion leaves lattice site and occupies interstitial, density unchanged.",
      "Interstitial defect: Extra atom occupies void; substitutional impurity replaces an atom.",
      "F-centre: Electron trapped in anion vacancy produces colour (e.g., NaCl turns yellow).",
      "Stoichiometric defects preserve overall ratio; non-stoichiometric defects cause excess metal or non-metal.",
    ],
    examples: [
      "AgCl shows Frenkel defect because Ag+ is small.",
      "NaCl shows Schottky defect at high temperature.",
      "ZnO on heating loses O2, forming Zn2+ vacancies and releasing electrons (n-type semiconductor).",
    ],
  },
  {
    id: "properties",
    title: "Electrical & Magnetic Properties",
    description:
      "Relationship between band theory, semiconductors and magnetic behavior of solids.",
    keyPoints: [
      "In metals, valence band overlaps conduction band → good conductor.",
      "Semiconductors have small band gap; conductivity increases with temperature.",
      "n-type semiconductor: Doping with group 15 elements provides extra electrons.",
      "p-type semiconductor: Doping with group 13 elements creates holes.",
      "Magnetism: diamagnetic (paired e-), paramagnetic (unpaired e-), ferromagnetic (domains align).",
    ],
    examples: [
      "Si doped with P → n-type; Si doped with B → p-type.",
      "Fe, Co, Ni show ferromagnetism; Fe2O3·ZnO (ferrite) for transformer cores.",
      "Superconductors at very low temperature show zero resistance and Meissner effect.",
    ],
  },
];

const legacyPracticeQuestions = [
  {
    question: "Which statement about crystalline solids is correct?",
    options: [
      "They are isotropic and soften gradually",
      "They possess long-range order and sharp melting points",
      "They never conduct electricity",
      "Their unit cells are amorphous",
    ],
    correctAnswer: 1,
    solution: "Crystalline solids show long-range order, anisotropy, and sharp melting points.",
    difficulty: "Easy",
    topic: "Solid State Basics",
  },
  {
    question: "In an fcc unit cell of edge length 'a', what is the relation with the atomic radius r?",
    options: ["a = 2r", "a = 2√2 r", "a = 4r", "a = √3 r"],
    correctAnswer: 1,
    solution: "Face diagonal of fcc is 4r = √2 a, hence a = 2√2 r.",
    difficulty: "Medium",
    topic: "Unit Cells",
  },
  {
    question: "A Schottky defect in NaCl results in:",
    options: [
      "Charge imbalance only",
      "A pair of cation-anion vacancies reducing density",
      "Cation occupying interstitial site",
      "Electrons trapped in anion vacancy",
    ],
    correctAnswer: 1,
    solution: "Schottky defects create equal cation and anion vacancies, reducing density.",
    difficulty: "Medium",
    topic: "Crystal Defects",
  },
  {
    question: "Which statement about n-type semiconductors is true?",
    options: [
      "Formed by doping silicon with aluminum",
      "Holes are the majority carriers",
      "Formed by doping with group 15 elements providing extra electrons",
      "Conductivity decreases with temperature",
    ],
    correctAnswer: 2,
    solution: "Group 15 (donor) dopants add electrons making n-type semiconductors; conductivity increases with T.",
    difficulty: "Easy",
    topic: "Semiconductors",
  },
  {
    question: "The number of tetrahedral voids in an hcp array of N spheres is:",
    options: ["N/2", "N", "2N", "N^2"],
    correctAnswer: 2,
    solution: "Each close-packed arrangement of N spheres contains 2N tetrahedral voids.",
    difficulty: "Medium",
    topic: "Packing Efficiency",
  },
];

const fallbackQuestions = normalizeLegacyQuestions(legacyPracticeQuestions, {
  sourceType: "chemistry_ch45_fallback",
  defaultDifficulty: 2,
  topicId: 2111,
});

export function ChemistryChapter45() {
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions", "topicId", "2111"],
    queryFn: async () => {
      const response = await fetch("/api/questions?topicId=2111");
      if (!response.ok) throw new Error("Failed to fetch questions");
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions?.length ? dbQuestions : fallbackQuestions;

  const [activeTab, setActiveTab] = useState("overview");
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showSolutions, setShowSolutions] = useState(false);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const checkAnswers = () => {
    setShowSolutions(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowSolutions(false);
  };

  const score = Object.entries(userAnswers).filter(([qId, answer]) => {
    const question = practiceQuestions.find((q) => q.id === parseInt(qId));
    return question && answer === question.correctAnswer;
  }).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Box className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">
            Class XII Chapter 1: The Solid State
          </h1>
          <p className="text-muted-foreground">
            Crystal lattices, packing efficiency, defects and semiconductor
            basics
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="topics">
            <Lightbulb className="h-4 w-4 mr-2" />
            Topics
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <Zap className="h-4 w-4 mr-2" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chapter Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Classification of solids and crystal systems.</li>
                  <li>Unit cells, packing efficiency and voids.</li>
                  <li>Point defects: Schottky, Frenkel, interstitial and impurity defects.</li>
                  <li>Electrical and magnetic properties of solids.</li>
                  <li>Band theory, semiconductors and doping strategies.</li>
                  <li>Real-life applications: alloys, ceramics, superconductors.</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">
                      NEET Favourite
                    </Badge>
                    <CardTitle className="text-lg">Key Highlights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>
                      <strong>Packing efficiency:</strong> fcc & hcp give 74%
                      occupancy with CN 12.
                    </p>
                    <p>
                      <strong>Density formula:</strong> rho = (Z * M) / (N_A * a^3).
                    </p>
                    <p>
                      <strong>Schottky vs Frenkel:</strong> Former lowers density,
                      latter does not.
                    </p>
                    <p>
                      <strong>Band theory:</strong> Metals have overlapping bands,
                      semiconductors have small gap.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">
                      Quick Tips
                    </Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>&bull; Confusing number of atoms contributed per lattice point.</p>
                    <p>&bull; Forgetting relationship between voids and number of atoms.</p>
                    <p>&bull; Mixing up conduction type in n-type vs p-type semiconductors.</p>
                    <p>&bull; Interchanging Schottky and Frenkel defect characteristics.</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Important Relationships
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm font-mono">
                  <p>rho = (Z * M) / (N_A * a^3)</p>
                  <p>a_bcc = (4r) / sqrt(3)</p>
                  <p>a_fcc = 2 * sqrt(2) * r</p>
                  <p>Number of octahedral voids = number of atoms in ccp/hcp</p>
                  <p>Number of tetrahedral voids = 2 * number of atoms</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
                <CardHeader>
                  <CardTitle>Real-World Connections</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Semiconductor devices rely on controlled doping for rectifiers
                    and transistors.
                  </p>
                  <p>
                    Colour of gemstones often arises from F-centres or transition
                    metal impurities.
                  </p>
                  <p>
                    Defect engineering improves catalysts, sensors and ionic
                    conductors used in fuel cells.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter45Topics.map((topic, index) => (
              <AccordionItem key={topic.id} value={topic.id}>
                <Card>
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-start gap-3 text-left">
                      <Badge variant="outline" className="mt-1">
                        {index + 1}
                      </Badge>
                      <div>
                        <h3 className="text-lg font-semibold">{topic.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <CardContent className="space-y-6 pt-4">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          Key Concepts
                        </h4>
                        <ul className="space-y-2">
                          {topic.keyPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-purple-500 mt-1">&bull;</span>
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {topic.formulas && topic.formulas.length > 0 && (
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Calculator className="h-4 w-4" />
                            Important Equations
                          </h4>
                          <div className="space-y-2">
                            {topic.formulas.map((formula, i) => (
                              <p
                                key={i}
                                className="font-mono text-sm bg-background p-2 rounded"
                              >
                                {formula}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Layers className="h-4 w-4" />
                          Examples
                        </h4>
                        <div className="space-y-2">
                          {topic.examples.map((example, i) => (
                            <div
                              key={i}
                              className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800"
                            >
                              <p className="text-sm">{example}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Grid3X3 className="h-4 w-4" />
                  Coordination Numbers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>sc:</strong> 6</p>
                <p><strong>bcc:</strong> 8</p>
                <p><strong>fcc/hcp:</strong> 12</p>
                <p><strong>ZnS:</strong> 4:4</p>
                <p><strong>CaF2:</strong> Ca 8, F 4</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radiation className="h-4 w-4" />
                  Magnetic Behaviour
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Diamagnetic:</strong> All electrons paired (CuCl, NaCl).</p>
                <p><strong>Paramagnetic:</strong> Unpaired electrons (O2, Cu2+).</p>
                <p><strong>Ferromagnetic:</strong> Domain formation (Fe, Co, Ni).</p>
                <p><strong>Ferrimagnetic:</strong> Unequal antiparallel alignment (Fe3O4).</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Semiconductor Basics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>Band gap (Eg) small for semiconductors, large for insulators.</p>
                <p>n-type: donor impurities (P in Si) add electrons.</p>
                <p>p-type: acceptor impurities (B in Si) create holes.</p>
                <p>Intrinsic conductivity increases with temperature.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Solid State Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Test your understanding of packing, defects and semiconductor
                    concepts.
                  </p>
                  <div className="mt-2">
                    <p className="text-2xl font-bold text-primary">
                      {score}/{practiceQuestions.length || 5}
                    </p>
                    <p className="text-xs text-muted-foreground">Current Score</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={checkAnswers} disabled={practiceQuestions.length === 0}>
                    Check Answers
                  </Button>
                  <Button variant="outline" onClick={resetQuiz}>
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {questionsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : practiceQuestions.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Practice questions will appear here once they are added to the
                database.
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Attempt the Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {practiceQuestions.map((q, index) => (
                  <div key={q.id} className="space-y-3 border-b pb-4 last:border-none">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary">{index + 1}</Badge>
                      <div>
                        <p className="font-medium">{q.questionText}</p>
                        <div className="grid gap-2 mt-3">
                          {q.options.map((option) => (
                            <Button
                              key={option.id}
                              variant={
                                showSolutions
                                  ? option.id === q.correctAnswer
                                    ? "default"
                                    : userAnswers[q.id] === option.id
                                    ? "destructive"
                                    : "outline"
                                  : userAnswers[q.id] === option.id
                                  ? "default"
                                  : "outline"
                              }
                              className="justify-start text-left"
                              onClick={() => handleAnswerSelect(q.id, option.id)}
                              disabled={showSolutions}
                            >
                              {option.text}
                            </Button>
                          ))}
                        </div>
                        {showSolutions && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Correct: {q.correctAnswer} – {q.solutionDetail}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
