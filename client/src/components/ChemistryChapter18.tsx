
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThreeDViewer } from "@/components/ThreeDViewer";
import { BookOpen, Lightbulb, Calculator, Atom, Zap, TestTubes , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter18Topics: Topic[] = [
  {
    id: "nomenclature",
    title: "IUPAC Nomenclature",
    description: "Systematic naming of organic compounds following IUPAC rules.",
    keyPoints: [
      "Identify longest carbon chain (parent chain)",
      "Number from end nearest to substituent",
      "Name substituents alphabetically with position numbers",
      "Multiple same substituents: di-, tri-, tetra-",
      "Functional group priority: -COOH > -SO₃H > -COOR > -COCl > -CONH₂ > -CN > -CHO > -CO- > -OH > -NH₂ > -C≡C- > -C=C-"
    ],
    examples: [
      "CH₃-CH(CH₃)-CH₂-CH₃ → 2-methylbutane",
      "CH₃-CH₂-CH(OH)-CH₃ → butan-2-ol",
      "CH₃-CO-CH₂-CH₃ → butan-2-one",
      "Br-CH₂-CH₂-Br → 1,2-dibromoethane"
    ],
    formulas: [
      "Alkane: CₙH₂ₙ₊₂",
      "Alkene: CₙH₂ₙ",
      "Alkyne: CₙH₂ₙ₋₂",
      "Cycloalkane: CₙH₂ₙ"
    ]
  },
  {
    id: "isomerism",
    title: "Structural and Stereoisomerism",
    description: "Different types of isomers with same molecular formula but different structures.",
    keyPoints: [
      "Structural isomerism: chain, position, functional group, metamerism",
      "Chain isomerism: different carbon skeleton",
      "Position isomerism: same group, different position",
      "Functional isomerism: different functional groups",
      "Stereoisomerism: geometrical (cis-trans) and optical",
      "Optical isomers: chiral molecules, non-superimposable mirror images"
    ],
    examples: [
      "C₄H₁₀: butane and 2-methylpropane (chain)",
      "C₃H₈O: propan-1-ol and propan-2-ol (position)",
      "C₂H₆O: ethanol and dimethyl ether (functional)",
      "CHCl₃: achiral, CCl₂BrH: chiral"
    ]
  },
  {
    id: "electronic-effects",
    title: "Electronic Effects in Organic Molecules",
    description: "Inductive, mesomeric, electromeric, and hyperconjugation effects.",
    keyPoints: [
      "Inductive effect (-I, +I): permanent, through σ bonds, decreases with distance",
      "-I groups: halogens, -NO₂, -CN, -COOH, -CHO",
      "+I groups: alkyl groups (-CH₃, -C₂H₅)",
      "Resonance/Mesomeric effect (-M, +M): through π bonds, delocalization",
      "+M groups: -OH, -OR, -NH₂, -NHR (donate electrons)",
      "-M groups: -NO₂, -CN, -CHO, -COOH (withdraw electrons)",
      "Hyperconjugation: C-H bonds conjugate with π system"
    ],
    examples: [
      "Acidity: ClCH₂COOH > FCH₂COOH (distance effect)",
      "Basicity: CH₃NH₂ > NH₃ (+I effect)",
      "Stability: (CH₃)₃C⁺ > (CH₃)₂CH⁺ > CH₃CH₂⁺ (hyperconjugation)"
    ]
  },
  {
    id: "reagents",
    title: "Organic Reactions and Reagents",
    description: "Types of organic reactions and common reagents.",
    keyPoints: [
      "Substitution: nucleophilic (SN1, SN2), electrophilic",
      "Addition: electrophilic, nucleophilic, free radical",
      "Elimination: E1, E2 mechanisms",
      "Nucleophiles: OH⁻, CN⁻, NH₃, H₂O",
      "Electrophiles: H⁺, NO₂⁺, Cl⁺, carbocations",
      "Free radicals: Cl•, Br•, alkyl radicals"
    ],
    examples: [
      "SN2: CH₃Br + OH⁻ → CH₃OH + Br⁻",
      "Addition: CH₂=CH₂ + HBr → CH₃CH₂Br",
      "Elimination: CH₃CH₂Br + KOH(alc) → CH₂=CH₂"
    ]
  },
  {
    id: "carbocations",
    title: "Reactive Intermediates",
    description: "Carbocations, carbanions, free radicals, and carbenes.",
    keyPoints: [
      "Carbocation: sp² hybridized, planar, electron deficient",
      "Stability: 3° > 2° > 1° > CH₃⁺ (hyperconjugation + inductive)",
      "Carbanion: sp³ hybridized, pyramidal, electron rich",
      "Stability: CH₃⁻ > 1° > 2° > 3° (opposite to carbocation)",
      "Free radical: sp² hybridized, one unpaired electron",
      "Stability: 3° > 2° > 1° > CH₃• (hyperconjugation)"
    ],
    examples: [
      "(CH₃)₃C⁺ most stable carbocation",
      "CH₃⁻ most stable carbanion",
      "Allylic and benzylic radicals are very stable"
    ]
  },
  {
    id: "acidity-basicity",
    title: "Acidity and Basicity in Organic Compounds",
    description: "Factors affecting acidity and basicity of organic molecules.",
    keyPoints: [
      "Acidity increases with stability of conjugate base",
      "EWG increases acidity (stabilizes anion)",
      "EDG decreases acidity (destabilizes anion)",
      "Order: RCOOH > ArOH > H₂O > ROH > HC≡CH",
      "Basicity increases with electron availability",
      "Order: R₃N > R₂NH > RNH₂ > NH₃ (gas phase)",
      "In aqueous solution: R₂NH > RNH₂ > R₃N > NH₃"
    ],
    examples: [
      "ClCH₂COOH more acidic than CH₃COOH",
      "Phenol more acidic than ethanol",
      "Aniline less basic than cyclohexylamine"
    ]
  }
];



export function ChemistryChapter18() {
  // Fetch questions from database for Chemical Kinetics (topicId: 52)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '52'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=52');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  const [activeTab, setActiveTab] = useState("overview");
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showSolutions, setShowSolutions] = useState(false);

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const checkAnswers = () => {
    setShowSolutions(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowSolutions(false);
  };

  const score = Object.entries(userAnswers).filter(([qId, answerId]) => {
    const question = practiceQuestions.find(q => q.id === Number(qId));
    return question && answerId === question.correctAnswer;
  }).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TestTubes className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 18: General Organic Chemistry</h1>
          <p className="text-muted-foreground">Class XI Chemistry - NEET Syllabus</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
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
                  <li>IUPAC nomenclature of organic compounds</li>
                  <li>Structural and stereoisomerism</li>
                  <li>Electronic effects (inductive, resonance, hyperconjugation)</li>
                  <li>Types of organic reactions and mechanisms</li>
                  <li>Reactive intermediates (carbocations, carbanions, radicals)</li>
                  <li>Acidity and basicity in organic compounds</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Concepts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Carbocation stability: 3° {'>'} 2° {'>'} 1° {'>'} CH₃⁺</p>
                    <p>• Carbanion stability: CH₃⁻ {'>'} 1° {'>'} 2° {'>'} 3°</p>
                    <p>• -I effect: halogens, -NO₂, -CN</p>
                    <p>• +I effect: alkyl groups</p>
                    <p>• Resonance stabilizes molecules</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Quick Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Confusing +I and -I effects</p>
                    <p>• Wrong IUPAC numbering direction</p>
                    <p>• Mixing up SN1 and SN2 mechanisms</p>
                    <p>• Ignoring resonance stabilization</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter18Topics.map((topic, index) => (
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
                Explore organic molecular structures
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ThreeDViewer 
                title="Methane (CH₄) - sp³ Hybridization" 
                modelType="molecule"
              />
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Carbocation Stability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 p-4 rounded-lg">
                      <p className="text-center font-mono text-sm">3° {'>'} 2° {'>'} 1° {'>'} CH₃⁺</p>
                    </div>
                    <p className="text-sm">Hyperconjugation and +I effect stabilize carbocations</p>
                  </CardContent>
                </Card>

                <Card className="border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Electronic Effects</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-semibold">Inductive Effect (-I, +I)</p>
                    <div className="space-y-1 pl-4 border-l-2 border-purple-500">
                      <p>-I: F {'>'} Cl {'>'} Br {'>'} I</p>
                      <p>+I: (CH₃)₃C- {'>'} (CH₃)₂CH- {'>'} CH₃CH₂- {'>'} CH₃-</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                      {q.options.map((option, index) => {
                        const optionId = typeof option === "string" ? String(index) : option.id;
                        const optionText = typeof option === "string" ? option : option.text;

                        return (
                        <Button
                          key={index}
                          variant={
                            showSolutions
                              ? optionId === q.correctAnswer
                                ? "default"
                                : userAnswers[q.id] === optionId
                                ? "destructive"
                                : "outline"
                              : userAnswers[q.id] === optionId
                              ? "secondary"
                              : "outline"
                          }
                          className="w-full justify-start text-left h-auto py-3"
                          onClick={() => !showSolutions && handleAnswerSelect(q.id, optionId)}
                          disabled={showSolutions}
                        >
                          <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                          {optionText}
                        </Button>
                        );
                      })}
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
