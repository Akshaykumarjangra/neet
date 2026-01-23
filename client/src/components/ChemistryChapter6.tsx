
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, Flame, Zap, TrendingDown, TrendingUp , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter6Topics: Topic[] = [
  {
    id: "system-surroundings",
    title: "System, Surroundings & Thermodynamic Terms",
    description: "Basic concepts and definitions in thermodynamics.",
    keyPoints: [
      "System: Part of universe under study (open/closed/isolated)",
      "Surroundings: Everything else in universe outside the system",
      "Boundary: Real or imaginary surface separating system from surroundings",
      "Open system: Exchange both matter and energy (e.g., open beaker)",
      "Closed system: Exchange energy only, not matter (e.g., sealed flask)",
      "Isolated system: No exchange of energy or matter (e.g., thermos flask)",
      "State function: Property depends only on state, not path (P, V, T, U, H, S, G)",
      "Path function: Property depends on path taken (q, w)",
      "Extensive property: Depends on amount (mass, volume, enthalpy)",
      "Intensive property: Independent of amount (temperature, pressure, density)"
    ],
    examples: [
      "Boiling water in open pot: Open system",
      "Gas in sealed cylinder with piston: Closed system",
      "Coffee in insulated thermos: Isolated system",
      "Temperature is intensive; heat capacity is extensive",
      "Internal energy U is state function; heat q is path function"
    ],
    formulas: [
      "Universe = System + Surroundings",
      "State functions: ΔX = X_final - X_initial (independent of path)",
      "Path functions: depend on process"
    ]
  },
  {
    id: "internal-energy",
    title: "Internal Energy & First Law",
    description: "Energy conservation in thermodynamic processes.",
    keyPoints: [
      "Internal energy (U): Total energy of system (kinetic + potential)",
      "First Law: ΔU = q + w (energy conservation)",
      "q: Heat absorbed by system (+ve if absorbed, -ve if released)",
      "w: Work done on system (+ve if done on, -ve if done by)",
      "For ideal gas: ΔU = nC_vΔT (depends only on temperature)",
      "Isothermal process (ΔT = 0): ΔU = 0, q = -w",
      "Adiabatic process (q = 0): ΔU = w",
      "Isochoric process (ΔV = 0): w = 0, ΔU = q",
      "Isobaric process (ΔP = 0): w = -PΔV"
    ],
    examples: [
      "Isothermal expansion of ideal gas at 300 K: ΔU = 0",
      "Adiabatic compression: Temperature rises, ΔU = w > 0",
      "Heating gas at constant volume: w = 0, ΔU = q",
      "If system absorbs 100 J heat and does 60 J work: ΔU = 100 - 60 = 40 J"
    ],
    formulas: [
      "ΔU = q + w (First Law of Thermodynamics)",
      "w = -P_ext ΔV (work done by gas)",
      "ΔU = nC_v ΔT (for ideal gas)",
      "q = nC_p ΔT (constant pressure)",
      "q = nC_v ΔT (constant volume)"
    ]
  },
  {
    id: "enthalpy",
    title: "Enthalpy & Heat Capacity",
    description: "Heat content of system at constant pressure.",
    keyPoints: [
      "Enthalpy: H = U + PV (heat content at constant pressure)",
      "ΔH = ΔU + Δ(PV) = ΔU + PΔV (at constant P)",
      "For ideal gas: ΔH = nC_p ΔT",
      "Exothermic reaction: ΔH < 0 (heat released)",
      "Endothermic reaction: ΔH > 0 (heat absorbed)",
      "Relation: C_p - C_v = R (for ideal gas)",
      "γ = C_p/C_v (heat capacity ratio)",
      "For monoatomic gas: C_v = (3/2)R, C_p = (5/2)R, γ = 5/3",
      "For diatomic gas: C_v = (5/2)R, C_p = (7/2)R, γ = 7/5"
    ],
    examples: [
      "Combustion of methane: CH₄ + 2O₂ → CO₂ + 2H₂O, ΔH = -890 kJ (exothermic)",
      "Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂, ΔH > 0 (endothermic)",
      "Melting ice: H₂O(s) → H₂O(l), ΔH = +6.01 kJ/mol",
      "C_p(He) = (5/2)R = 20.8 J/(mol·K)"
    ],
    formulas: [
      "H = U + PV",
      "ΔH = ΔU + PΔV (constant pressure)",
      "ΔH = nC_p ΔT",
      "C_p - C_v = R",
      "γ = C_p/C_v",
      "ΔH = q_p (heat at constant pressure)"
    ]
  },
  {
    id: "hess-law",
    title: "Hess's Law & Enthalpy Calculations",
    description: "Calculating enthalpy changes using thermochemical equations.",
    keyPoints: [
      "Hess's Law: Total enthalpy change is independent of path",
      "ΔH_reaction = Σ ΔH_f(products) - Σ ΔH_f(reactants)",
      "Standard enthalpy of formation (ΔH_f°): Heat change when 1 mole formed from elements",
      "ΔH_f° of elements in standard state = 0",
      "Standard conditions: 298 K (25°C), 1 bar pressure",
      "Thermochemical equations can be added/subtracted/reversed",
      "Reversing equation changes sign of ΔH",
      "Multiplying equation multiplies ΔH by same factor"
    ],
    examples: [
      "C(s) + O₂(g) → CO₂(g), ΔH_f° = -393.5 kJ/mol",
      "H₂(g) + ½O₂(g) → H₂O(l), ΔH_f° = -285.8 kJ/mol",
      "Calculate ΔH for: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)",
      "ΔH = [-393.5 + 2(-285.8)] - [-74.8] = -890.3 kJ",
      "Born-Haber cycle for ionic compound formation"
    ],
    formulas: [
      "ΔH_reaction = Σ ΔH_f°(products) - Σ ΔH_f°(reactants)",
      "ΔH_f° (element) = 0",
      "ΔH(reverse) = -ΔH(forward)",
      "If equation × n, then ΔH × n"
    ]
  },
  {
    id: "bond-enthalpy",
    title: "Bond Enthalpy & Enthalpy of Reaction",
    description: "Energy required to break chemical bonds.",
    keyPoints: [
      "Bond enthalpy: Energy needed to break 1 mole of bonds in gaseous state",
      "Bond breaking: Endothermic (ΔH > 0)",
      "Bond formation: Exothermic (ΔH < 0)",
      "ΔH_reaction = Σ Bond energies (reactants) - Σ Bond energies (products)",
      "Average bond enthalpy: Average over different molecules",
      "Stronger bond → Higher bond enthalpy",
      "Triple bond > Double bond > Single bond",
      "Bond enthalpy decreases down the group (larger atoms, longer bonds)",
      "C≡C (839 kJ/mol) > C=C (606 kJ/mol) > C-C (347 kJ/mol)"
    ],
    examples: [
      "H-H bond: 436 kJ/mol",
      "O=O bond: 498 kJ/mol",
      "C-H bond: ~413 kJ/mol (average)",
      "H₂(g) → 2H(g), ΔH = +436 kJ/mol",
      "Calculate ΔH for CH₄ combustion using bond energies"
    ],
    formulas: [
      "ΔH_reaction = Σ BE(broken) - Σ BE(formed)",
      "ΔH_reaction = Σ BE(reactants) - Σ BE(products)",
      "Bond breaking: positive ΔH",
      "Bond forming: negative ΔH"
    ]
  },
  {
    id: "entropy",
    title: "Entropy & Second Law",
    description: "Measure of disorder or randomness in a system.",
    keyPoints: [
      "Entropy (S): Measure of disorder/randomness (J/(mol·K))",
      "Second Law: Entropy of universe always increases (ΔS_universe > 0)",
      "ΔS_universe = ΔS_system + ΔS_surroundings",
      "For spontaneous process: ΔS_universe > 0",
      "S increases: solid < liquid < gas",
      "Higher temperature → higher entropy",
      "More particles → higher entropy",
      "ΔS = q_rev/T (for reversible process)",
      "Absolute entropy S° can be determined (Third Law)",
      "At 0 K, S = 0 for perfect crystal (Third Law)"
    ],
    examples: [
      "Ice melting: S increases (solid → liquid)",
      "Water evaporating: S increases (liquid → gas)",
      "Mixing gases: S increases",
      "2H₂(g) + O₂(g) → 2H₂O(l): ΔS < 0 (3 moles gas → liquid)",
      "CaCO₃(s) → CaO(s) + CO₂(g): ΔS > 0 (gas formed)"
    ],
    formulas: [
      "ΔS = q_rev/T",
      "ΔS_universe = ΔS_system + ΔS_surroundings",
      "ΔS_reaction = Σ S°(products) - Σ S°(reactants)",
      "For spontaneous: ΔS_universe > 0"
    ]
  },
  {
    id: "gibbs-energy",
    title: "Gibbs Free Energy & Spontaneity",
    description: "Criterion for spontaneity of processes.",
    keyPoints: [
      "Gibbs free energy: G = H - TS",
      "ΔG = ΔH - TΔS (determines spontaneity)",
      "Spontaneous process: ΔG < 0",
      "Equilibrium: ΔG = 0",
      "Non-spontaneous: ΔG > 0",
      "ΔG° = -RT ln K (relation with equilibrium constant)",
      "If ΔH < 0, ΔS > 0: Always spontaneous (ΔG < 0 at all T)",
      "If ΔH > 0, ΔS < 0: Never spontaneous (ΔG > 0 at all T)",
      "If ΔH < 0, ΔS < 0: Spontaneous at low T",
      "If ΔH > 0, ΔS > 0: Spontaneous at high T"
    ],
    examples: [
      "Combustion: ΔH < 0, ΔS > 0 → Always spontaneous",
      "Ice melting at 25°C: ΔH > 0, ΔS > 0 → Spontaneous (TΔS > ΔH)",
      "Ice forming at -10°C: ΔH < 0, ΔS < 0 → Spontaneous (|ΔH| > TΔS)",
      "NH₄NO₃ dissolving: ΔH > 0, ΔS > 0 → Spontaneous at room temp",
      "Calculate ΔG at 298 K if ΔH = -100 kJ, ΔS = -200 J/K"
    ],
    formulas: [
      "G = H - TS",
      "ΔG = ΔH - TΔS",
      "ΔG° = -RT ln K = -2.303 RT log K",
      "ΔG < 0: Spontaneous",
      "ΔG = 0: Equilibrium",
      "ΔG > 0: Non-spontaneous"
    ]
  }
];



export function ChemistryChapter6() {
  // Fetch questions from database for Thermodynamics (topicId: 41)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '41'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=41');
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
        <Flame className="h-8 w-8 text-orange-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 6: Thermodynamics</h1>
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
            <Flame className="h-4 w-4 mr-2" />
            Visualization
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
                  <li>System, surroundings, and thermodynamic terminology</li>
                  <li>Internal energy and first law of thermodynamics</li>
                  <li>Enthalpy and heat capacity relationships</li>
                  <li>Hess's law and thermochemical calculations</li>
                  <li>Bond enthalpy and its applications</li>
                  <li>Entropy and second law of thermodynamics</li>
                  <li>Gibbs free energy and spontaneity criteria</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-orange-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-orange-500">First Law</Badge>
                    <CardTitle className="text-lg">Energy Conservation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>ΔU = q + w</strong></p>
                    <p>Change in internal energy equals heat absorbed plus work done on system</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      q: positive if absorbed<br/>
                      w: positive if done on system
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Enthalpy</Badge>
                    <CardTitle className="text-lg">Heat Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>H = U + PV</strong></p>
                    <p><strong>ΔH = q_p</strong> (at constant pressure)</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Exothermic: ΔH &lt; 0<br/>
                      Endothermic: ΔH {'>'} 0
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">Second Law</Badge>
                    <CardTitle className="text-lg">Entropy Principle</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>ΔS_universe {'>'} 0</strong></p>
                    <p>Entropy of universe always increases for spontaneous processes</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      S: solid &lt; liquid &lt; gas
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-green-500">Gibbs Energy</Badge>
                    <CardTitle className="text-lg">Spontaneity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>ΔG = ΔH - TΔS</strong></p>
                    <p><strong>ΔG &lt; 0:</strong> Spontaneous</p>
                    <p><strong>ΔG = 0:</strong> Equilibrium</p>
                    <p><strong>ΔG {'>'} 0:</strong> Non-spontaneous</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Key Relationships
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>C_p - C_v = R</strong> (ideal gas)</p>
                  <p><strong>γ = C_p/C_v</strong> (heat capacity ratio)</p>
                  <p><strong>Monoatomic:</strong> C_v = (3/2)R, γ = 5/3</p>
                  <p><strong>Diatomic:</strong> C_v = (5/2)R, γ = 7/5</p>
                  <p><strong>ΔG° = -RT ln K</strong> (equilibrium relation)</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter6Topics.map((topic, index) => (
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
                              <span className="text-orange-500 mt-1">•</span>
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
                            <div key={i} className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
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
              <CardTitle>Thermodynamics Visualization</CardTitle>
              <p className="text-sm text-muted-foreground">
                Visual representations of energy transformations and spontaneity
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Open System</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-b from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-6 rounded-lg text-center">
                      <div className="border-2 border-dashed border-blue-500 p-4 rounded-lg">
                        <p className="text-sm font-semibold mb-2">System</p>
                        <div className="flex justify-center gap-2">
                          <TrendingUp className="h-5 w-5 text-red-500" />
                          <TrendingDown className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                      <p className="text-xs mt-3 text-muted-foreground">
                        Matter ↕ Energy ↕
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Closed System</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 rounded-lg text-center">
                      <div className="border-4 border-green-500 p-4 rounded-lg">
                        <p className="text-sm font-semibold mb-2">System</p>
                        <div className="flex justify-center gap-2">
                          <Zap className="h-5 w-5 text-yellow-500" />
                        </div>
                      </div>
                      <p className="text-xs mt-3 text-muted-foreground">
                        Matter ✗ Energy ↕
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Isolated System</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-6 rounded-lg text-center">
                      <div className="border-4 border-double border-purple-500 p-4 rounded-lg">
                        <p className="text-sm font-semibold mb-2">System</p>
                        <div className="flex justify-center">
                          <span className="text-2xl">🔒</span>
                        </div>
                      </div>
                      <p className="text-xs mt-3 text-muted-foreground">
                        Matter ✗ Energy ✗
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
                <CardHeader>
                  <CardTitle>Spontaneity Criteria (ΔG = ΔH - TΔS)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg border-2 border-green-500">
                        <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Always Spontaneous</p>
                        <p className="text-sm">ΔH &lt; 0, ΔS {'>'} 0</p>
                        <p className="text-xs text-muted-foreground mt-1">ΔG &lt; 0 at all T</p>
                      </div>
                      <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg border-2 border-yellow-500">
                        <p className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Spontaneous at Low T</p>
                        <p className="text-sm">ΔH &lt; 0, ΔS &lt; 0</p>
                        <p className="text-xs text-muted-foreground mt-1">ΔG &lt; 0 when |ΔH| {'>'} TΔS</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg border-2 border-blue-500">
                        <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Spontaneous at High T</p>
                        <p className="text-sm">ΔH {'>'} 0, ΔS {'>'} 0</p>
                        <p className="text-xs text-muted-foreground mt-1">ΔG &lt; 0 when TΔS {'>'} ΔH</p>
                      </div>
                      <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg border-2 border-red-500">
                        <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Never Spontaneous</p>
                        <p className="text-sm">ΔH {'>'} 0, ΔS &lt; 0</p>
                        <p className="text-xs text-muted-foreground mt-1">ΔG {'>'} 0 at all T</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-500/20">
                <CardHeader>
                  <CardTitle>Enthalpy Diagram</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <p className="font-semibold mb-4 text-blue-600 dark:text-blue-400">Exothermic (ΔH &lt; 0)</p>
                      <div className="relative h-48 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-950/10 rounded-lg p-4">
                        <div className="absolute top-8 left-8 right-8">
                          <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Reactants</div>
                        </div>
                        <div className="absolute top-8 right-8 flex items-center">
                          <TrendingDown className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="absolute bottom-8 left-8 right-8">
                          <div className="bg-green-500 text-white px-3 py-1 rounded text-sm">Products</div>
                        </div>
                        <div className="absolute left-1/2 top-12 bottom-12 w-1 bg-red-500 transform -translate-x-1/2">
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                            <Flame className="h-5 w-5 text-orange-500" />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs mt-2 text-muted-foreground">Heat Released</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold mb-4 text-orange-600 dark:text-orange-400">Endothermic (ΔH {'>'} 0)</p>
                      <div className="relative h-48 bg-gradient-to-b from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-950/10 rounded-lg p-4">
                        <div className="absolute top-8 left-8 right-8">
                          <div className="bg-orange-500 text-white px-3 py-1 rounded text-sm">Reactants</div>
                        </div>
                        <div className="absolute top-8 right-8 flex items-center">
                          <TrendingUp className="h-6 w-6 text-green-500" />
                        </div>
                        <div className="absolute bottom-8 left-8 right-8">
                          <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Products</div>
                        </div>
                        <div className="absolute left-1/2 top-12 bottom-12 w-1 bg-green-500 transform -translate-x-1/2">
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                            <Zap className="h-5 w-5 text-yellow-500" />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs mt-2 text-muted-foreground">Heat Absorbed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-500/20">
                <CardHeader>
                  <CardTitle>Entropy Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-around items-end py-8">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-white text-xs">●●●●</span>
                      </div>
                      <p className="font-semibold">Solid</p>
                      <p className="text-xs text-muted-foreground">Lowest S</p>
                    </div>
                    <div className="text-4xl mb-4">&lt;</div>
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-white text-sm">● ● ●</span>
                      </div>
                      <p className="font-semibold">Liquid</p>
                      <p className="text-xs text-muted-foreground">Medium S</p>
                    </div>
                    <div className="text-4xl mb-4">&lt;</div>
                    <div className="text-center">
                      <div className="w-28 h-28 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-white">● ● ●</span>
                      </div>
                      <p className="font-semibold">Gas</p>
                      <p className="text-xs text-muted-foreground">Highest S</p>
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
                <Card key={q.id} className="border-orange-500/20">
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
                        <p className="font-semibold mb-2 text-orange-600 dark:text-orange-400">Solution:</p>
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
