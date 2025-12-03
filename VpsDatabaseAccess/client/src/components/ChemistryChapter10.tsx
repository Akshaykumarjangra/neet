
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, Zap, Battery , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter10Topics: Topic[] = [
  {
    id: "conductance",
    title: "Conductance in Electrolytic Solutions",
    description: "Measurement of ability of ions to conduct electricity in solutions.",
    keyPoints: [
      "Conductance (G): Reciprocal of resistance, G = 1/R, unit: Siemens (S) or mho (℧)",
      "Conductivity (κ): Conductance of 1 cm³ solution, unit: S cm⁻¹",
      "κ = G × (l/A) = G × cell constant",
      "Cell constant = l/A (distance between electrodes / area)",
      "Molar conductivity (Λₘ): Conductivity × volume containing 1 mole",
      "Λₘ = κ × 1000/M (M = molarity)",
      "Equivalent conductivity (Λₑq): Conductivity × volume containing 1 equivalent",
      "Conductivity decreases with dilution (fewer ions per volume)",
      "Molar conductivity increases with dilution (ions move freely)"
    ],
    examples: [
      "Strong electrolyte: NaCl fully dissociates, high conductivity",
      "Weak electrolyte: CH₃COOH partially dissociates, low conductivity",
      "If κ = 0.001 S cm⁻¹, M = 0.1 M, then Λₘ = 0.001 × 1000/0.1 = 10 S cm² mol⁻¹",
      "Distilled water has very low conductivity due to minimal ionization"
    ],
    formulas: [
      "G = 1/R (conductance)",
      "κ = G × (l/A) (conductivity)",
      "Λₘ = κ × 1000/M (molar conductivity)",
      "Cell constant = l/A",
      "Λₑq = Λₘ/n (n = n-factor)"
    ]
  },
  {
    id: "kohlrausch-law",
    title: "Kohlrausch's Law",
    description: "Law of independent migration of ions at infinite dilution.",
    keyPoints: [
      "At infinite dilution: Λₘ° = λ₊° + λ₋°",
      "Λₘ°: Limiting molar conductivity (at infinite dilution)",
      "λ₊°, λ₋°: Limiting ionic conductivities of cation and anion",
      "Each ion contributes independently to total conductivity",
      "Used to calculate Λₘ° for weak electrolytes",
      "Application: Find degree of dissociation (α) = Λₘ/Λₘ°",
      "For weak electrolyte: Ka = Cα²/(1-α) ≈ Cα² (if α << 1)",
      "Variation with concentration: Λₘ = Λₘ° - A√C (strong electrolyte)"
    ],
    examples: [
      "Λₘ°(NaCl) = λ°(Na⁺) + λ°(Cl⁻)",
      "For CH₃COOH: Λₘ°(CH₃COOH) = λ°(CH₃COO⁻) + λ°(H⁺)",
      "Calculate from: Λₘ°(CH₃COONa) + Λₘ°(HCl) - Λₘ°(NaCl)",
      "If Λₘ = 50, Λₘ° = 100, then α = 50/100 = 0.5 or 50%"
    ],
    formulas: [
      "Λₘ° = λ₊° + λ₋° (Kohlrausch's law)",
      "α = Λₘ/Λₘ° (degree of dissociation)",
      "Ka = Cα²/(1-α) (weak electrolyte)",
      "Λₘ = Λₘ° - A√C (Debye-Hückel-Onsager)"
    ]
  },
  {
    id: "electrolytic-cells",
    title: "Electrolytic Cells",
    description: "Cells where electrical energy drives non-spontaneous reactions.",
    keyPoints: [
      "Non-spontaneous reaction: ΔG > 0, requires external voltage",
      "Anode: Positive electrode, oxidation occurs",
      "Cathode: Negative electrode, reduction occurs",
      "Examples: Electrolysis of water, molten NaCl, aqueous solutions",
      "Preferential discharge: Species with lower reduction potential oxidized first",
      "At anode: Species with lower reduction potential (more negative E°)",
      "At cathode: Species with higher reduction potential (more positive E°)",
      "Faraday's laws: Amount of substance ∝ quantity of charge",
      "Applications: Electroplating, extraction of metals, electrorefining"
    ],
    examples: [
      "Electrolysis of H₂O: 2H₂O → 2H₂ + O₂ (needs external voltage)",
      "Electrolysis of molten NaCl: 2NaCl → 2Na + Cl₂",
      "Aqueous NaCl: Cl₂ at anode, H₂ at cathode (H₂O reduced, not Na⁺)",
      "Electroplating: Coating object with metal using electrolysis"
    ],
    formulas: [
      "Q = It (charge = current × time)",
      "W = ZIt = (E/F)It (Faraday's 1st law)",
      "W₁/W₂ = E₁/E₂ (Faraday's 2nd law)",
      "Z = E/F (electrochemical equivalent)"
    ]
  },
  {
    id: "galvanic-cells",
    title: "Galvanic (Voltaic) Cells",
    description: "Cells that convert chemical energy to electrical energy spontaneously.",
    keyPoints: [
      "Spontaneous redox reaction: ΔG < 0, generates electricity",
      "Anode: Negative electrode, oxidation occurs",
      "Cathode: Positive electrode, reduction occurs",
      "Salt bridge: Maintains electrical neutrality, completes circuit",
      "Cell notation: Anode | Anode solution || Cathode solution | Cathode",
      "Example: Zn | Zn²⁺(aq) || Cu²⁺(aq) | Cu (Daniell cell)",
      "Electrons flow from anode to cathode through external circuit",
      "Anions move to anode, cations to cathode in salt bridge"
    ],
    examples: [
      "Daniell cell: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)",
      "At anode: Zn → Zn²⁺ + 2e⁻ (oxidation)",
      "At cathode: Cu²⁺ + 2e⁻ → Cu (reduction)",
      "Salt bridge: KCl or KNO₃ solution in agar-agar"
    ],
    formulas: [
      "Cell notation: Anode | Anode soln || Cathode soln | Cathode",
      "E°cell = E°cathode - E°anode",
      "Oxidation at anode, reduction at cathode"
    ]
  },
  {
    id: "electrode-potential",
    title: "Electrode Potential and EMF",
    description: "Potential difference between electrode and solution.",
    keyPoints: [
      "Electrode potential: Tendency of electrode to lose or gain electrons",
      "Standard electrode potential (E°): Measured at 298K, 1M, 1 atm",
      "Standard Hydrogen Electrode (SHE): Reference, E° = 0 V",
      "Higher E° → Greater tendency to get reduced (better oxidizing agent)",
      "Lower E° → Greater tendency to get oxidized (better reducing agent)",
      "EMF of cell (E°cell) = E°cathode - E°anode",
      "For spontaneous reaction: E°cell > 0, ΔG° < 0",
      "Electrochemical series: Arranged by increasing reduction potential",
      "Top (Li⁺/Li): Strong reducing agent, E° = -3.05 V",
      "Bottom (F₂/F⁻): Strong oxidizing agent, E° = +2.87 V"
    ],
    examples: [
      "Zn²⁺/Zn: E° = -0.76 V (good reducing agent)",
      "Cu²⁺/Cu: E° = +0.34 V (moderate oxidizing agent)",
      "Daniell cell: E°cell = 0.34 - (-0.76) = 1.10 V",
      "Ag⁺/Ag: E° = +0.80 V (good oxidizing agent)"
    ],
    formulas: [
      "E°cell = E°cathode - E°anode",
      "ΔG° = -nFE°cell",
      "E°cell > 0 → spontaneous",
      "E°cell < 0 → non-spontaneous"
    ]
  },
  {
    id: "nernst-equation",
    title: "Nernst Equation",
    description: "Relationship between electrode potential and concentration.",
    keyPoints: [
      "Nernst equation: E = E° - (RT/nF)ln Q",
      "At 298K: E = E° - (0.0591/n)log₁₀ Q",
      "Q: Reaction quotient = [products]/[reactants]",
      "n: Number of electrons transferred",
      "F: Faraday constant = 96500 C mol⁻¹",
      "R: Gas constant = 8.314 J K⁻¹ mol⁻¹",
      "For concentration cell: E = (0.0591/n)log([C₁]/[C₂])",
      "At equilibrium: E = 0, Q = Kc, so E° = (0.0591/n)log Kc"
    ],
    examples: [
      "Zn²⁺/Zn: E = -0.76 - (0.0591/2)log(1/[Zn²⁺])",
      "If [Zn²⁺] = 0.01 M: E = -0.76 - (0.0591/2)log(100) = -0.76 - 0.059 = -0.819 V",
      "Concentration cell: Zn|Zn²⁺(0.1M)||Zn²⁺(1M)|Zn",
      "E = (0.0591/2)log(1/0.1) = 0.0295 V"
    ],
    formulas: [
      "E = E° - (RT/nF)ln Q (general form)",
      "E = E° - (0.0591/n)log Q (at 298K)",
      "E°cell = (0.0591/n)log Kc (at equilibrium)",
      "ΔG = -nFE (relationship with Gibbs energy)"
    ]
  },
  {
    id: "batteries",
    title: "Batteries and Fuel Cells",
    description: "Practical applications of electrochemical cells.",
    keyPoints: [
      "Primary cells: Non-rechargeable, irreversible reactions",
      "Secondary cells: Rechargeable, reversible reactions",
      "Dry cell (Leclanche): Zn anode, carbon cathode, NH₄Cl paste, 1.5V",
      "Mercury cell: Zn-Hg anode, HgO cathode, constant voltage 1.35V",
      "Lead-acid battery: Pb anode, PbO₂ cathode, H₂SO₄ electrolyte",
      "Ni-Cd battery: Cd anode, NiO(OH) cathode, rechargeable",
      "Li-ion battery: High energy density, rechargeable, used in phones",
      "Fuel cell: Converts chemical energy to electrical continuously",
      "H₂-O₂ fuel cell: 2H₂ + O₂ → 2H₂O, clean energy, used in spacecraft"
    ],
    examples: [
      "Dry cell: Used in flashlights, remote controls (primary)",
      "Lead-acid: Car batteries, E = 2.1 V per cell (secondary)",
      "Li-ion: Mobile phones, laptops, electric vehicles",
      "H₂-O₂ fuel cell: Efficiency ~60-70%, only product is water"
    ],
    formulas: [
      "Lead-acid discharge: Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄ + 2H₂O",
      "H₂-O₂ fuel cell: 2H₂ + O₂ → 2H₂O",
      "Overall EMF = Sum of individual cell EMFs"
    ]
  },
  {
    id: "corrosion",
    title: "Corrosion",
    description: "Electrochemical degradation of metals.",
    keyPoints: [
      "Corrosion: Oxidation of metals in presence of moisture and air",
      "Rusting of iron: Electrochemical process, forms Fe₂O₃·xH₂O",
      "Anodic region: Fe → Fe²⁺ + 2e⁻ (oxidation)",
      "Cathodic region: O₂ + 4H⁺ + 4e⁻ → 2H₂O (in acidic)",
      "Or: O₂ + 2H₂O + 4e⁻ → 4OH⁻ (in neutral/basic)",
      "Fe²⁺ oxidized to Fe³⁺, forms rust: 2Fe³⁺ + 4H₂O → Fe₂O₃·H₂O + 6H⁺",
      "Prevention: Painting, galvanization, electroplating, alloying",
      "Galvanization: Coating with Zn (more active, sacrificial protection)",
      "Cathodic protection: Connect to more active metal (Mg, Zn)"
    ],
    examples: [
      "Iron rusting in moist air: Forms reddish-brown Fe₂O₃",
      "Galvanized iron: Zn coating protects Fe (Zn oxidizes first)",
      "Ship hulls: Mg blocks attached for cathodic protection",
      "Stainless steel: Cr forms protective oxide layer, prevents corrosion"
    ],
    formulas: [
      "At anode: Fe → Fe²⁺ + 2e⁻",
      "At cathode: O₂ + 4H⁺ + 4e⁻ → 2H₂O (acidic)",
      "Rust formation: 4Fe²⁺ + O₂ + 4H₂O → 2Fe₂O₃·H₂O + 8H⁺"
    ]
  }
];



export function ChemistryChapter10() {
  // Fetch questions from database for The s-Block Elements (topicId: 45)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '45'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=45');
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
        <Battery className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 10: Electrochemistry</h1>
          <p className="text-muted-foreground">Class XII Chemistry - NEET Syllabus</p>
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
                  <li>Conductance in electrolytic solutions</li>
                  <li>Kohlrausch's law of independent migration of ions</li>
                  <li>Electrolytic and galvanic cells</li>
                  <li>Electrode potential and EMF</li>
                  <li>Nernst equation and its applications</li>
                  <li>Batteries and fuel cells</li>
                  <li>Corrosion and its prevention</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-yellow-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-yellow-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Concepts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Galvanic:</strong> Spontaneous, E°cell {'>'} 0, ΔG &lt; 0</p>
                    <p><strong>Electrolytic:</strong> Non-spontaneous, needs external voltage</p>
                    <p><strong>Nernst equation:</strong> E = E° - (0.0591/n)log Q</p>
                    <p><strong>Higher E°:</strong> Better oxidizing agent</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Quick Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Confusing anode/cathode in galvanic vs electrolytic cells</p>
                    <p>• Wrong sign in E°cell = E°cathode - E°anode</p>
                    <p>• Forgetting to convert log to ln in Nernst equation</p>
                    <p>• Wrong n value in Nernst equation</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Important Formulas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm font-mono">
                  <p><strong>Conductance:</strong> Λₘ = κ × 1000/M</p>
                  <p><strong>EMF:</strong> E°cell = E°cathode - E°anode</p>
                  <p><strong>Nernst:</strong> E = E° - (0.0591/n)log Q (298K)</p>
                  <p><strong>Gibbs:</strong> ΔG° = -nFE°cell</p>
                  <p><strong>Faraday:</strong> W = (E/F)It = ZIt</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle>Important Constants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Faraday constant (F):</strong> 96500 C mol⁻¹</p>
                  <p><strong>Gas constant (R):</strong> 8.314 J K⁻¹ mol⁻¹</p>
                  <p><strong>Standard temperature:</strong> 298 K (25°C)</p>
                  <p><strong>Standard pressure:</strong> 1 bar (1 atm)</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter10Topics.map((topic, index) => (
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
                              <span className="text-yellow-500 mt-1">•</span>
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
                            <div key={i} className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
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
                <Card key={q.id} className="border-yellow-500/20">
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
                        <p className="font-semibold mb-2 text-yellow-600 dark:text-yellow-400">Solution:</p>
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
