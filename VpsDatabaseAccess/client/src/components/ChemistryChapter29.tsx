
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, TestTubes , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  procedures?: string[];
}

const chapter29Topics: Topic[] = [
  {
    id: "qualitative-analysis-cations",
    title: "Qualitative Analysis - Cations",
    description: "Systematic analysis of cations using group reagents.",
    keyPoints: [
      "Group 0 (NH₄⁺): No group reagent, detected by Nessler's reagent",
      "Group I (Pb²⁺, Ag⁺, Hg₂²⁺): Precipitate with dil. HCl as chlorides",
      "Group II (Hg²⁺, Pb²⁺, Bi³⁺, Cu²⁺, Cd²⁺, As³⁺, Sb³⁺, Sn²⁺): H₂S in acidic medium",
      "Group IIA (Cu²⁺, Pb²⁺, Hg²⁺, Bi³⁺, Cd²⁺): Precipitate as sulfides",
      "Group IIB (As³⁺, Sb³⁺, Sn²⁺): Yellow precipitate with (NH₄)₂S",
      "Group III (Fe³⁺, Al³⁺, Cr³⁺): NH₄OH + NH₄Cl, precipitate as hydroxides",
      "Group IV (Co²⁺, Ni²⁺, Mn²⁺, Zn²⁺): (NH₄)₂S in basic medium",
      "Group V (Ba²⁺, Sr²⁺, Ca²⁺): (NH₄)₂CO₃, precipitate as carbonates",
      "Group VI (Mg²⁺, Na⁺, K⁺): Soluble group, no group reagent"
    ],
    examples: [
      "Pb²⁺: White ppt with HCl, yellow ppt with K₂CrO₄",
      "Cu²⁺: Blue solution, black CuS with H₂S",
      "Fe³⁺: Blood red color with KCNS, reddish brown ppt with NH₄OH",
      "Al³⁺: White gelatinous ppt with NH₄OH",
      "Zn²⁺: White ppt with H₂S, dissolves in excess NaOH",
      "Ca²⁺: White ppt with (NH₄)₂CO₃, brick red flame"
    ],
    procedures: [
      "Preliminary tests: Color, smell, flame test",
      "Dry heating test: Observe sublimation, color change, gases evolved",
      "Systematic separation using group reagents",
      "Confirmatory tests for individual cations",
      "Use of masking agents and complexing agents"
    ]
  },
  {
    id: "qualitative-analysis-anions",
    title: "Qualitative Analysis - Anions",
    description: "Detection of common anions through characteristic tests.",
    keyPoints: [
      "Carbonate (CO₃²⁻): Effervescence with dil. acid, CO₂ turns lime water milky",
      "Bicarbonate (HCO₃⁻): Effervescence on heating, CO₂ released",
      "Sulfite (SO₃²⁻): SO₂ gas (pungent smell) decolorizes KMnO₄",
      "Sulfide (S²⁻): H₂S gas (rotten egg smell), blackens lead acetate paper",
      "Nitrate (NO₃⁻): Brown ring test with FeSO₄ + conc. H₂SO₄",
      "Chloride (Cl⁻): White ppt AgCl with AgNO₃, soluble in NH₄OH",
      "Bromide (Br⁻): Pale yellow ppt AgBr, sparingly soluble in NH₄OH",
      "Iodide (I⁻): Yellow ppt AgI, insoluble in NH₄OH",
      "Sulfate (SO₄²⁻): White ppt BaSO₄ with BaCl₂ (insoluble in HCl)",
      "Phosphate (PO₄³⁻): Yellow ppt (NH₄)₃PO₄·12MoO₃ with ammonium molybdate",
      "Acetate (CH₃COO⁻): Ester smell on heating with ethanol + H₂SO₄"
    ],
    examples: [
      "Na₂CO₃ + HCl → Brisk effervescence, CO₂ ↑",
      "NaCl + AgNO₃ → White ppt (curdy) AgCl ↓",
      "KNO₃ + FeSO₄ + H₂SO₄ → Brown ring [Fe(H₂O)₅NO]²⁺",
      "Na₂SO₄ + BaCl₂ → White ppt BaSO₄ ↓",
      "Na₂S + dil. HCl → H₂S gas (rotten egg smell)"
    ]
  },
  {
    id: "volumetric-analysis",
    title: "Volumetric Analysis (Titrations)",
    description: "Quantitative determination using titration techniques.",
    keyPoints: [
      "Acid-Base titration: HCl vs NaOH (Phenolphthalein or Methyl orange)",
      "Redox titration: KMnO₄ vs Mohr's salt (no indicator needed)",
      "Iodometric titration: I₂ vs Na₂S₂O₃ (starch indicator)",
      "Complexometric titration: EDTA vs metal ions (Eriochrome Black T)",
      "Normality equation: N₁V₁ = N₂V₂",
      "Molarity equation: M₁V₁/n₁ = M₂V₂/n₂",
      "Endpoint detection: Color change, pH change, conductivity change",
      "Burette reading: Read from bottom of meniscus, ±0.05 mL accuracy"
    ],
    examples: [
      "KMnO₄ + FeSO₄ in H₂SO₄: Self-indicating (purple → colorless)",
      "Oxalic acid standardization: 2KMnO₄ + 5H₂C₂O₄ + 3H₂SO₄ → products",
      "Mohr's salt analysis: Find Fe²⁺ content",
      "Na₂CO₃ standardization of HCl using methyl orange"
    ],
    procedures: [
      "Rinse burette and pipette with solution to be used",
      "Remove air bubbles from burette tip",
      "Take concordant readings (within ±0.05 mL)",
      "Note initial and final burette readings",
      "Calculate titre value and perform calculations"
    ]
  },
  {
    id: "organic-preparations",
    title: "Organic Preparations",
    description: "Laboratory synthesis of common organic compounds.",
    keyPoints: [
      "Purification: Crystallization, distillation, sublimation",
      "Drying agents: Anhydrous CaCl₂, Na₂SO₄, MgSO₄",
      "Melting point determination: Capillary tube method",
      "Boiling point determination: Distillation method",
      "TLC (Thin Layer Chromatography): Separation and identification",
      "Rf value: Distance moved by compound / Distance moved by solvent",
      "Recrystallization: Dissolve in hot solvent, cool to crystallize",
      "Steam distillation: For temperature-sensitive compounds"
    ],
    examples: [
      "Acetanilide from aniline + acetic anhydride",
      "Aspirin from salicylic acid + acetic anhydride",
      "Benzoic acid from benzyl alcohol (oxidation)",
      "Ester from carboxylic acid + alcohol (esterification)",
      "Soap from oil/fat + NaOH (saponification)"
    ],
    procedures: [
      "Weigh reactants accurately",
      "Heat under reflux if needed",
      "Cool and filter/extract product",
      "Wash and dry the product",
      "Determine melting/boiling point and yield"
    ]
  },
  {
    id: "functional-group-tests",
    title: "Functional Group Tests",
    description: "Chemical tests to identify functional groups in organic compounds.",
    keyPoints: [
      "Alkene: Decolorizes Br₂ water (reddish-brown → colorless)",
      "Alkyne: Decolorizes Br₂ water, white ppt with ammoniacal AgNO₃",
      "Alcohol: Lucas test (3° fast, 2° slow, 1° very slow)",
      "Phenol: Violet color with FeCl₃, white ppt with Br₂ water",
      "Aldehyde: Silver mirror with Tollen's reagent, red ppt with Fehling's",
      "Ketone: Yellow ppt with 2,4-DNP, no reaction with Tollen's",
      "Carboxylic acid: Effervescence with NaHCO₃",
      "Amine: Carbylamine test (1° amine + CHCl₃ + KOH → bad smell)",
      "Amide: Biuret test (violet color with CuSO₄ + NaOH)"
    ],
    examples: [
      "Ethene + Br₂ → 1,2-dibromoethane (decolorization)",
      "Ethanol + Lucas reagent (ZnCl₂ + HCl) → no immediate turbidity",
      "Phenol + FeCl₃ → Violet complex",
      "Glucose + Fehling's → Red Cu₂O precipitate",
      "Acetone + 2,4-DNP → Yellow precipitate",
      "Acetic acid + NaHCO₃ → CO₂ bubbles"
    ]
  },
  {
    id: "chromatography",
    title: "Chromatography Techniques",
    description: "Separation techniques based on differential migration.",
    keyPoints: [
      "Paper chromatography: Stationary phase (paper), mobile phase (solvent)",
      "Thin Layer Chromatography (TLC): Silica gel/alumina on glass plate",
      "Column chromatography: Stationary phase packed in column",
      "Rf value: Retardation factor = Distance by solute / Distance by solvent",
      "Principles: Adsorption, partition, ion exchange",
      "Visualization: UV light, iodine vapors, spraying reagents",
      "Applications: Separation of amino acids, pigments, drugs",
      "Polarity: More polar compounds move slower on polar stationary phase"
    ],
    examples: [
      "Separation of plant pigments (chlorophyll, carotene, xanthophyll)",
      "Separation of amino acids using ninhydrin spray",
      "Drug purity testing using TLC",
      "Ink composition analysis using paper chromatography"
    ]
  }
];



export function ChemistryChapter29() {
  // Fetch questions from database for Polymers (topicId: 63)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '63'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=63');
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
        <TestTubes className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 29: Practical Chemistry & Lab Techniques</h1>
          <p className="text-muted-foreground">Qualitative Analysis, Titrations & Organic Tests</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="topics">
            <Lightbulb className="h-4 w-4 mr-2" />
            Topics
          </TabsTrigger>
          <TabsTrigger value="practice">
            <Calculator className="h-4 w-4 mr-2" />
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
                  <li>Qualitative analysis of cations and anions</li>
                  <li>Group separation and confirmatory tests</li>
                  <li>Volumetric analysis and titration techniques</li>
                  <li>Organic compound preparation and purification</li>
                  <li>Functional group identification tests</li>
                  <li>Chromatography principles and applications</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <TestTubes className="h-6 w-6 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">Qualitative Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>Cation & anion detection</p>
                    <p className="text-muted-foreground mt-2">Group reagents, confirmatory tests</p>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20">
                  <CardHeader>
                    <TestTubes className="h-6 w-6 text-purple-500 mb-2" />
                    <CardTitle className="text-lg">Titrations</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>Volumetric analysis</p>
                    <p className="text-muted-foreground mt-2">Acid-base, redox, complexometric</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardHeader>
                    <TestTubes className="h-6 w-6 text-green-500 mb-2" />
                    <CardTitle className="text-lg">Organic Tests</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>Functional group identification</p>
                    <p className="text-muted-foreground mt-2">Chromato­graphy, purification</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle>Important Lab Safety Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>🥽 <strong>Always wear safety goggles</strong> and lab coat</p>
                  <p>🧪 <strong>Handle acids/bases carefully</strong> - add acid to water, not reverse</p>
                  <p>🔥 <strong>Heat under reflux</strong> for volatile compounds</p>
                  <p>⚠️ <strong>Dispose waste properly</strong> in designated containers</p>
                  <p>📝 <strong>Record observations</strong> immediately and accurately</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter29Topics.map((topic, index) => (
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
                              <span className="text-blue-500 mt-1">•</span>
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {topic.procedures && topic.procedures.length > 0 && (
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-3">Procedure</h4>
                          <ol className="list-decimal list-inside space-y-2">
                            {topic.procedures.map((proc, i) => (
                              <li key={i} className="text-sm">{proc}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-3">Examples</h4>
                        <div className="space-y-2">
                          {topic.examples.map((example, i) => (
                            <div key={i} className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
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
                <Card key={q.id} className="border-blue-500/20">
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
                        <p className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Solution:</p>
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
