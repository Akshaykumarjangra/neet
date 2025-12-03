
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, Droplet , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter13Topics: Topic[] = [
  {
    id: "position-periodic-table",
    title: "Position in Periodic Table",
    description: "Unique position of hydrogen in the periodic table.",
    keyPoints: [
      "Electronic configuration: 1s¹ (one electron in valence shell)",
      "Can lose electron to form H⁺ (like alkali metals)",
      "Can gain electron to form H⁻ (like halogens)",
      "Dual nature: resembles both Group 1 and Group 17",
      "Usually placed in Group 1 but unique properties",
      "Lightest element, smallest atomic size"
    ],
    examples: [
      "Like alkali metals: H₂ → 2H⁺ + 2e⁻ (loses electron)",
      "Like halogens: H₂ + 2e⁻ → 2H⁻ (gains electron)",
      "Forms H₂ diatomic molecule (like halogens)",
      "Non-metallic character (unlike Group 1)"
    ]
  },
  {
    id: "isotopes",
    title: "Isotopes of Hydrogen",
    description: "Three isotopes with different mass numbers.",
    keyPoints: [
      "Protium (¹H): 1 proton, 0 neutrons, most abundant (99.985%)",
      "Deuterium (²H or D): 1 proton, 1 neutron (0.015%)",
      "Tritium (³H or T): 1 proton, 2 neutrons, radioactive",
      "All isotopes have same electronic configuration (1s¹)",
      "Chemical properties similar, physical properties differ",
      "Deuterium used in nuclear reactors"
    ],
    examples: [
      "Protium: ordinary hydrogen in H₂O",
      "Deuterium: D₂O (heavy water) used as moderator",
      "Tritium: used in fusion reactions, radioactive (β⁻ decay)",
      "D₂O has higher boiling point (101.4°C) than H₂O (100°C)"
    ],
    formulas: [
      "D₂O molecular mass = 20 (vs H₂O = 18)",
      "Tritium half-life: 12.3 years"
    ]
  },
  {
    id: "heavy-water",
    title: "Heavy Water (D₂O)",
    description: "Properties and applications of deuterium oxide.",
    keyPoints: [
      "Molecular formula: D₂O or ²H₂O",
      "Preparation: prolonged electrolysis of water",
      "During electrolysis, H₂ evolved faster than D₂",
      "Physical properties: higher density, bp, mp than H₂O",
      "Used as moderator in nuclear reactors",
      "Toxic to living organisms in high concentrations"
    ],
    examples: [
      "Preparation: 6H₂O → 5H₂ + D₂O (after prolonged electrolysis)",
      "Moderator: slows down fast neutrons in nuclear fission",
      "Density: D₂O = 1.1 g/mL, H₂O = 1.0 g/mL",
      "Boiling point: D₂O = 101.4°C, H₂O = 100°C"
    ],
    formulas: [
      "D₂O molecular mass = 20 u",
      "Density (D₂O) > Density (H₂O)"
    ]
  },
  {
    id: "hydrides",
    title: "Types of Hydrides",
    description: "Classification based on bonding and properties.",
    keyPoints: [
      "Ionic/Saline hydrides: with s-block metals (NaH, CaH₂)",
      "Covalent hydrides: with p-block elements (CH₄, NH₃, H₂O)",
      "Metallic/Interstitial hydrides: with d-block metals (TiH₂)",
      "Ionic: crystalline, high mp, conduct electricity in molten state",
      "Covalent: volatile, low mp, covalent bonding",
      "Metallic: non-stoichiometric, metallic properties"
    ],
    examples: [
      "Ionic: NaH reacts with water → NaOH + H₂",
      "Covalent: NH₃ (basic), H₂O (amphoteric), HCl (acidic)",
      "Metallic: PdH₀.₆ (non-stoichiometric composition)",
      "LiH used in synthesis, reducing agent"
    ],
    formulas: [
      "NaH + H₂O → NaOH + H₂",
      "CaH₂ + 2H₂O → Ca(OH)₂ + 2H₂"
    ]
  },
  {
    id: "properties-uses",
    title: "Properties and Uses of Hydrogen",
    description: "Physical, chemical properties and applications.",
    keyPoints: [
      "Lightest gas, colorless, odorless, tasteless",
      "Combustible: 2H₂ + O₂ → 2H₂O (highly exothermic)",
      "Reducing agent: reduces metal oxides to metals",
      "Forms hydrogen bonds (in H₂O, NH₃, HF)",
      "Used in ammonia synthesis (Haber process)",
      "Fuel cells: clean energy source"
    ],
    examples: [
      "Combustion: burns with blue flame, produces water",
      "Reducing: CuO + H₂ → Cu + H₂O (Cu extracted)",
      "Haber: N₂ + 3H₂ ⇌ 2NH₃ (Fe catalyst, high P, T)",
      "Fuel cells: 2H₂ + O₂ → 2H₂O + electricity",
      "Hydrogenation: vegetable oils → margarine"
    ],
    formulas: [
      "2H₂ + O₂ → 2H₂O, ΔH = -286 kJ/mol",
      "N₂ + 3H₂ ⇌ 2NH₃"
    ]
  }
];



export function ChemistryChapter13() {
  // Fetch questions from database for Hydrocarbons (topicId: 48)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '48'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=48');
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
        <Droplet className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 13: Hydrogen</h1>
          <p className="text-muted-foreground">Class XI Chemistry - NEET Syllabus</p>
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
                  <li>Unique position of hydrogen in periodic table</li>
                  <li>Three isotopes: Protium, Deuterium, and Tritium</li>
                  <li>Heavy water (D₂O) and its applications</li>
                  <li>Types of hydrides: ionic, covalent, metallic</li>
                  <li>Properties and uses of hydrogen</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card className="border-blue-500/20 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-blue-500">¹H</Badge>
                    <CardTitle className="text-lg">Protium</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-mono">99.985%</p>
                    <p className="text-xs text-muted-foreground">Most abundant, 0 neutrons</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-green-500">²H (D)</Badge>
                    <CardTitle className="text-lg">Deuterium</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-mono">0.015%</p>
                    <p className="text-xs text-muted-foreground">Heavy water D₂O, 1 neutron</p>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">³H (T)</Badge>
                    <CardTitle className="text-lg">Tritium</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-mono">Trace</p>
                    <p className="text-xs text-muted-foreground">Radioactive, 2 neutrons</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-blue-500" />
                    Types of Hydrides
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="font-semibold">Ionic/Saline</p>
                    <p className="text-sm text-muted-foreground">NaH, CaH₂</p>
                    <p className="text-xs">With s-block metals</p>
                  </div>
                  <div>
                    <p className="font-semibold">Covalent</p>
                    <p className="text-sm text-muted-foreground">CH₄, NH₃, H₂O</p>
                    <p className="text-xs">With p-block elements</p>
                  </div>
                  <div>
                    <p className="font-semibold">Metallic</p>
                    <p className="text-sm text-muted-foreground">TiH₂, PdH₀.₆</p>
                    <p className="text-xs">With d-block metals</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted">
                <CardHeader>
                  <CardTitle className="text-lg">NEET Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>✓ Tritium is radioactive, protium and deuterium are stable</p>
                  <p>✓ D₂O (heavy water) used as moderator in nuclear reactors</p>
                  <p>✓ Ionic hydrides (NaH) react with water to liberate H₂</p>
                  <p>✓ Hydrogen has dual nature: resembles both Group 1 and 17</p>
                  <p>✓ D₂O has higher bp (101.4°C) than H₂O (100°C)</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter13Topics.map((topic, index) => (
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
                              <span className="text-primary mt-1">•</span>
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {topic.formulas && topic.formulas.length > 0 && (
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Calculator className="h-4 w-4" />
                            Important Facts
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
                        <h4 className="font-semibold mb-3">Examples & Applications</h4>
                        <div className="space-y-2">
                          {topic.examples.map((example, i) => (
                            <div key={i} className="bg-secondary/10 p-3 rounded-lg border-l-4 border-primary">
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
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Practice Questions</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Test your understanding with NEET-level questions
                  </p>
                </div>
                {showSolutions && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{score}/{practiceQuestions.length}</p>
                    <p className="text-sm text-muted-foreground">Score</p>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {practiceQuestions.map((q, index) => (
                <Card key={q.id} className={`${
                  showSolutions 
                    ? userAnswers[q.id] === q.correctAnswer 
                      ? 'border-green-500' 
                      : userAnswers[q.id] !== undefined 
                        ? 'border-red-500' 
                        : ''
                    : ''
                }`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Q{index + 1}. {q.questionText}</CardTitle>
                      <Badge variant={
                        q.difficultyLevel === 1 ? 'secondary' : 
                        q.difficultyLevel === 2 ? 'default' : 
                        'destructive'
                      }>
                        {q.difficultyLevel === 1 ? 'Easy' : q.difficultyLevel === 2 ? 'Medium' : 'Hard'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {q.options.map((option, idx) => (
                        <div
                          key={idx}
                          onClick={() => !showSolutions && handleAnswerSelect(q.id, String.fromCharCode(65 + idx))}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            showSolutions
                              ? String.fromCharCode(65 + idx) === q.correctAnswer
                                ? 'bg-green-100 border-green-500 dark:bg-green-900/20'
                                : userAnswers[q.id] === String.fromCharCode(65 + idx)
                                  ? 'bg-red-100 border-red-500 dark:bg-red-900/20'
                                  : ''
                              : userAnswers[q.id] === String.fromCharCode(65 + idx)
                                ? 'bg-primary/10 border-primary'
                                : 'hover:bg-muted'
                          }`}
                        >
                          <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>
                          {typeof option === "string" ? option : option.text}
                        </div>
                      ))}
                    </div>

                    {showSolutions && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h5 className="font-semibold mb-2">Solution:</h5>
                        <p className="text-sm">{q.solutionDetail}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              <div className="flex gap-3 pt-4">
                {!showSolutions ? (
                  <Button onClick={checkAnswers} className="flex-1" size="lg">
                    Submit Answers
                  </Button>
                ) : (
                  <Button onClick={resetQuiz} variant="outline" className="flex-1" size="lg">
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
