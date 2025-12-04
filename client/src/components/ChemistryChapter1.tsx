
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThreeDViewer } from "@/components/ThreeDViewer";
import { PhETSimulation } from "@/components/PhETSimulation";
import { BookOpen, Lightbulb, Calculator, Atom, Zap, TestTubes, Loader2, Play } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter1Topics: Topic[] = [
  {
    id: "mole-concept",
    title: "Mole Concept and Avogadro's Number",
    description: "The mole is the SI unit for the amount of substance. One mole contains Avogadro's number (6.022 × 10²³) of particles.",
    keyPoints: [
      "1 mole = 6.022 × 10²³ particles (atoms, molecules, ions)",
      "Molar mass: mass of 1 mole of substance in grams",
      "Molar mass numerically equals atomic/molecular mass",
      "Number of moles (n) = Given mass (m) / Molar mass (M)",
      "Number of particles = n × Nₐ (Avogadro's number)"
    ],
    examples: [
      "1 mole of Carbon-12 = 12 grams = 6.022 × 10²³ atoms",
      "1 mole of H₂O = 18 grams = 6.022 × 10²³ molecules",
      "Calculate moles in 44g CO₂: n = 44/44 = 1 mole"
    ],
    formulas: [
      "n = m/M (moles = mass/molar mass)",
      "N = n × Nₐ (number of particles)",
      "m = n × M (mass = moles × molar mass)"
    ]
  },
  {
    id: "percentage-composition",
    title: "Percentage Composition",
    description: "Percentage composition shows the mass percentage of each element in a compound.",
    keyPoints: [
      "% of element = (Total mass of element / Molar mass of compound) × 100",
      "Sum of all percentages = 100%",
      "Useful for determining purity of samples",
      "Can be calculated from chemical formula"
    ],
    examples: [
      "H₂O: %H = (2×1)/(2×1 + 16) × 100 = 11.11%, %O = 88.89%",
      "NH₃: %N = 14/(14+3) × 100 = 82.35%, %H = 17.65%",
      "CaCO₃: %Ca = 40%, %C = 12%, %O = 48%"
    ],
    formulas: [
      "% composition = (Mass of element / Total mass) × 100",
      "Mass of element = (% composition / 100) × Total mass"
    ]
  },
  {
    id: "empirical-molecular",
    title: "Empirical and Molecular Formula",
    description: "Empirical formula shows simplest whole number ratio of atoms. Molecular formula shows actual number of atoms in a molecule.",
    keyPoints: [
      "Empirical formula: simplest ratio (e.g., CH₂O for glucose)",
      "Molecular formula: actual ratio (e.g., C₆H₁₂O₆ for glucose)",
      "Molecular formula = n × Empirical formula",
      "n = Molecular mass / Empirical formula mass",
      "Both formulas can be same (e.g., H₂O, NH₃)"
    ],
    examples: [
      "Glucose: Empirical = CH₂O, Molecular = C₆H₁₂O₆, n = 6",
      "Benzene: Empirical = CH, Molecular = C₆H₆, n = 6",
      "Acetic acid: Empirical = CH₂O, Molecular = C₂H₄O₂, n = 2"
    ],
    formulas: [
      "n = Molar mass / Empirical formula mass",
      "Molecular formula = (Empirical formula) × n"
    ]
  },
  {
    id: "stoichiometry",
    title: "Stoichiometry and Balancing Equations",
    description: "Stoichiometry deals with quantitative relationships between reactants and products in chemical reactions.",
    keyPoints: [
      "Law of conservation of mass: matter cannot be created or destroyed",
      "Balanced equation: same number of each atom on both sides",
      "Coefficients show mole ratios between substances",
      "Mole ratio used for calculations",
      "Mass ratio = Mole ratio × Molar mass ratio"
    ],
    examples: [
      "2H₂ + O₂ → 2H₂O (2:1:2 mole ratio)",
      "N₂ + 3H₂ → 2NH₃ (1:3:2 mole ratio)",
      "If 2 moles N₂ react, 6 moles H₂ needed, 4 moles NH₃ formed"
    ],
    formulas: [
      "Moles of A / Coefficient of A = Moles of B / Coefficient of B",
      "Mass of product = (Moles × Molar mass) of product"
    ]
  },
  {
    id: "limiting-reagent",
    title: "Limiting Reagent and Excess Reagent",
    description: "Limiting reagent is completely consumed and determines the amount of product formed. Excess reagent is left over.",
    keyPoints: [
      "Limiting reagent: reactant that is consumed first",
      "Determines maximum amount of product",
      "Excess reagent: reactant left over after reaction",
      "Calculate moles of product from each reactant to find limiting reagent",
      "Real-world reactions rarely have exact stoichiometric amounts"
    ],
    examples: [
      "N₂ + 3H₂ → 2NH₃: If 1 mol N₂ + 2 mol H₂, H₂ is limiting",
      "2 mol H₂ needs 2/3 mol N₂, so 1/3 mol N₂ in excess",
      "Product formed = 2 × (2/3) = 4/3 mol NH₃"
    ],
    formulas: [
      "Find moles of each reactant",
      "Calculate theoretical product from each",
      "Smallest product indicates limiting reagent"
    ]
  },
  {
    id: "concentration-terms",
    title: "Concentration Terms",
    description: "Various ways to express the concentration of solutions.",
    keyPoints: [
      "Molarity (M): moles of solute per liter of solution",
      "Molality (m): moles of solute per kg of solvent",
      "Normality (N): gram equivalents per liter",
      "Mole fraction (X): moles of component / total moles",
      "ppm: parts per million (mg/L for dilute aqueous solutions)"
    ],
    examples: [
      "1M NaCl: 1 mole NaCl in 1L solution",
      "1m glucose: 1 mole glucose in 1kg water",
      "Mole fraction of ethanol in 50:50 mixture with water"
    ],
    formulas: [
      "Molarity (M) = moles of solute / volume of solution (L)",
      "Molality (m) = moles of solute / mass of solvent (kg)",
      "Mole fraction (X) = n_component / n_total",
      "% by mass = (mass of solute / mass of solution) × 100"
    ]
  }
];



export function ChemistryChapter1() {
  // Fetch questions from database for Atomic Structure (topicId: 4)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '4'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=4');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  

  

  const [activeTab, setActiveTab] = useState("overview");
  const [userAnswers, setUserAnswers] = useState<{[key: number]: number}>({});
  const [showSolutions, setShowSolutions] = useState(false);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const checkAnswers = () => {
    setShowSolutions(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowSolutions(false);
  };

  const score = Object.entries(userAnswers).filter(
    ([qId, answer]) => {
      const question = practiceQuestions.find(q => q.id === parseInt(qId));
      return question && answer === question.correctAnswer;
    }
  ).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TestTubes className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 1: Some Basic Concepts of Chemistry</h1>
          <p className="text-muted-foreground">Class XI Chemistry - NEET Syllabus</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="topics">
            <Lightbulb className="h-4 w-4 mr-2" />
            Topics
          </TabsTrigger>
          <TabsTrigger value="visualization">
            <Atom className="h-4 w-4 mr-2" />
            3D Models
          </TabsTrigger>
          <TabsTrigger value="simulations" data-testid="tab-simulations">
            <Play className="h-4 w-4 mr-2" />
            Simulations
          </TabsTrigger>
          <TabsTrigger value="practice">
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
                  <li>Mole concept and Avogadro's number</li>
                  <li>Molar mass and percentage composition</li>
                  <li>Empirical and molecular formulas</li>
                  <li>Stoichiometry and balancing chemical equations</li>
                  <li>Limiting reagent and excess reagent</li>
                  <li>Various concentration terms</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Formulas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm font-mono">
                    <p>• n = m/M (moles)</p>
                    <p>• N = n × Nₐ (particles)</p>
                    <p>• % = (mass/total) × 100</p>
                    <p>• M = n/V (molarity)</p>
                    <p>• m = n/kg (molality)</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Quick Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Confusing molarity with molality</p>
                    <p>• Not balancing equations before calculations</p>
                    <p>• Forgetting to identify limiting reagent</p>
                    <p>• Mixing up empirical and molecular formulas</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Important Constants
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 font-mono text-sm">
                  <p><strong>Avogadro's Number (Nₐ):</strong> 6.022 × 10²³ mol⁻¹</p>
                  <p><strong>1 amu:</strong> 1.66 × 10⁻²⁴ g</p>
                  <p><strong>STP conditions:</strong> 273.15 K, 1 atm</p>
                  <p><strong>Molar volume at STP:</strong> 22.4 L</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter1Topics.map((topic, index) => (
              <AccordionItem key={topic.id} value={topic.id}>
                <Card>
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-start gap-3 text-left">
                      <Badge variant="outline" className="mt-1">
                        {index + 1}
                      </Badge>
                      <div>
                        <h3 className="text-lg font-semibold">{topic.title}</h3>
                        <p className="text-sm text-muted-foreground">{topic.description}</p>
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
                              <span className="text-purple-500 mt-1">•</span>
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {topic.formulas && topic.formulas.length > 0 && (
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Calculator className="h-4 w-4" />
                            Important Formulas
                          </h4>
                          <div className="space-y-2">
                            {topic.formulas.map((formula, i) => (
                              <p key={i} className="font-mono text-sm bg-background p-2 rounded">
                                {formula}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-3">Examples</h4>
                        <div className="space-y-2">
                          {topic.examples.map((example, i) => (
                            <div key={i} className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                              <p className="text-sm">{example}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        Practice Questions on {topic.title}
                      </Button>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive 3D Visualizations</CardTitle>
              <p className="text-sm text-muted-foreground">
                Explore molecular structures and atomic arrangements
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ThreeDViewer 
                title="Water Molecule (H₂O) - Molecular Structure" 
                modelType="molecule"
              />
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Mole Concept Visualization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
                      <p className="text-center text-2xl font-bold">6.022 × 10²³</p>
                      <p className="text-center text-sm text-muted-foreground">Avogadro's Number</p>
                    </div>
                    <p className="text-sm">This number of particles in 1 mole is enormous - if you counted 1 particle per second, it would take 19 billion years!</p>
                  </CardContent>
                </Card>

                <Card className="border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Stoichiometry Example</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-semibold">2H₂ + O₂ → 2H₂O</p>
                    <div className="space-y-1 pl-4 border-l-2 border-purple-500">
                      <p>2 molecules H₂ react with 1 molecule O₂</p>
                      <p>2 moles H₂ react with 1 mole O₂</p>
                      <p>4g H₂ react with 32g O₂ to give 36g H₂O</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                <CardHeader>
                  <CardTitle>Concentration Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="font-semibold mb-2">Molarity (M)</p>
                      <p className="text-sm text-muted-foreground">moles/Liter solution</p>
                      <Badge variant="secondary" className="mt-2">Temperature dependent</Badge>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="font-semibold mb-2">Molality (m)</p>
                      <p className="text-sm text-muted-foreground">moles/kg solvent</p>
                      <Badge variant="secondary" className="mt-2">Temperature independent</Badge>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="font-semibold mb-2">Mole Fraction (X)</p>
                      <p className="text-sm text-muted-foreground">n₁/(n₁+n₂)</p>
                      <Badge variant="secondary" className="mt-2">Unitless</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simulations" className="space-y-6" data-testid="simulations-content">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-purple-500" />
                Interactive PhET Simulations
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Explore chemistry concepts through interactive simulations from PhET Colorado
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  About these simulations:
                </h4>
                <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
                  <li>• These simulations help visualize stoichiometry and molecular concepts</li>
                  <li>• Build molecules from atoms to understand chemical formulas</li>
                  <li>• Practice balancing chemical equations interactively</li>
                  <li>• Use fullscreen mode for better experience</li>
                </ul>
              </div>

              <PhETSimulation
                simulationId="build-a-molecule"
                title="Build a Molecule"
                description="Construct molecules from atoms to understand molecular formulas and stoichiometry. Build simple molecules like H₂O, CO₂, and more complex compounds."
                subject="Chemistry"
                height={500}
              />

              <PhETSimulation
                simulationId="balancing-chemical-equations"
                title="Balancing Chemical Equations"
                description="Learn to balance chemical equations by adjusting coefficients. Understand the law of conservation of mass through interactive gameplay."
                subject="Chemistry"
                height={500}
              />

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-3">Related Topics in This Chapter:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/50 dark:bg-white/5 p-3 rounded-lg">
                      <p className="font-medium">Build a Molecule → Mole Concept</p>
                      <p className="text-sm text-muted-foreground">Understand how atoms combine in fixed ratios</p>
                    </div>
                    <div className="bg-white/50 dark:bg-white/5 p-3 rounded-lg">
                      <p className="font-medium">Balancing Equations → Stoichiometry</p>
                      <p className="text-sm text-muted-foreground">Apply conservation of mass in reactions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          {questionsLoading ? (
            <Card>
              <CardContent className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
                <span>Loading questions from database...</span>
              </CardContent>
            </Card>
          ) : practiceQuestions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                <p>No questions available for this chapter yet.</p>
              </CardContent>
            </Card>
          ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Practice Questions</CardTitle>
                {showSolutions && (
                  <Badge variant={score >= 12 ? "default" : score >= 8 ? "secondary" : "destructive"}>
                    Score: {score}/{practiceQuestions.length}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {practiceQuestions.map((q, index) => (
                <Card key={q.id} className="border-purple-500/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">{q.difficultyLevel === 1 ? 'Easy' : q.difficultyLevel === 2 ? 'Medium' : 'Hard'}</Badge>
                        <p className="font-medium">Q{index + 1}. {q.questionText}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {q.options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            showSolutions
                              ? index === q.correctAnswer
                                ? "default"
                                : userAnswers[q.id] === index
                                ? "destructive"
                                : "outline"
                              : userAnswers[q.id] === index
                              ? "secondary"
                              : "outline"
                          }
                          className="w-full justify-start text-left h-auto py-3"
                          onClick={() => !showSolutions && handleAnswerSelect(q.id, index)}
                          disabled={showSolutions}
                        >
                          <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                          {typeof option === "string" ? option : option.text}
                        </Button>
                      ))}
                    </div>
                    {showSolutions && (
                      <div className="bg-muted p-4 rounded-lg mt-4">
                        <p className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Solution:</p>
                        <p className="text-sm">{q.solutionDetail}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              <div className="flex gap-3">
                {!showSolutions ? (
                  <Button 
                    onClick={checkAnswers} 
                    className="flex-1"
                    disabled={Object.keys(userAnswers).length === 0}
                  >
                    Check Answers
                  </Button>
                ) : (
                  <Button onClick={resetQuiz} variant="outline" className="flex-1">
                    Try Again
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        
          )}</TabsContent>
      </Tabs>
    </div>
  );
}
