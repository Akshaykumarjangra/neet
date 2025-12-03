
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, Scale, ArrowLeftRight, Droplet, Activity , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter7Topics: Topic[] = [
  {
    id: "equilibrium-concept",
    title: "Dynamic Equilibrium & Equilibrium Constant",
    description: "Understanding reversible reactions and equilibrium state.",
    keyPoints: [
      "Dynamic equilibrium: Forward and reverse rates are equal",
      "At equilibrium, concentrations remain constant (not equal)",
      "Equilibrium is dynamic, not static (reactions continue)",
      "Equilibrium constant (K): Ratio of products to reactants at equilibrium",
      "For aA + bB ⇌ cC + dD: K = [C]^c[D]^d / [A]^a[B]^b",
      "Kc: Equilibrium constant in terms of concentration (mol/L)",
      "Kp: Equilibrium constant in terms of partial pressure (atm)",
      "Kp = Kc(RT)^Δn, where Δn = (moles of gaseous products) - (moles of gaseous reactants)",
      "K > 1: Products favored; K < 1: Reactants favored",
      "K is temperature dependent, not affected by concentration or pressure"
    ],
    examples: [
      "N₂(g) + 3H₂(g) ⇌ 2NH₃(g): Kc = [NH₃]² / [N₂][H₂]³",
      "H₂(g) + I₂(g) ⇌ 2HI(g): Δn = 0, so Kp = Kc",
      "PCl₅(g) ⇌ PCl₃(g) + Cl₂(g): Δn = 1, Kp = Kc(RT)",
      "If Kc = 10⁶: Products predominate at equilibrium",
      "2SO₂(g) + O₂(g) ⇌ 2SO₃(g): Kp = (P_SO₃)² / [(P_SO₂)²(P_O₂)]"
    ],
    formulas: [
      "K = [Products] / [Reactants] (with stoichiometric coefficients as powers)",
      "Kp = Kc(RT)^Δn",
      "Δn = Σn(products) - Σn(reactants) (gaseous only)",
      "For reverse reaction: K_reverse = 1/K_forward"
    ]
  },
  {
    id: "le-chatelier",
    title: "Le Chatelier's Principle",
    description: "Predicting the effect of changes on equilibrium position.",
    keyPoints: [
      "Le Chatelier: System at equilibrium responds to minimize external stress",
      "Concentration change: System shifts to counteract the change",
      "Adding reactant: Equilibrium shifts right (toward products)",
      "Adding product: Equilibrium shifts left (toward reactants)",
      "Pressure change (gases): Shift toward side with fewer moles",
      "Volume decrease (pressure increase): Shift to fewer gas molecules",
      "Temperature change: Depends on whether reaction is exo or endothermic",
      "Exothermic (ΔH < 0): Heat is product; increase T shifts left",
      "Endothermic (ΔH > 0): Heat is reactant; increase T shifts right",
      "Catalyst: No effect on equilibrium position, only rate"
    ],
    examples: [
      "N₂ + 3H₂ ⇌ 2NH₃ (ΔH < 0): High P, low T favor NH₃",
      "Add N₂: Equilibrium shifts right to consume N₂",
      "Increase P: Shifts to 2 moles NH₃ (from 4 moles reactants)",
      "Increase T: Shifts left (exothermic, heat is product)",
      "2SO₂ + O₂ ⇌ 2SO₃: Increase P favors SO₃ (3 → 2 moles)"
    ],
    formulas: [
      "Stress → System responds to minimize stress",
      "ΔH < 0: ↑T shifts ← (exothermic)",
      "ΔH > 0: ↑T shifts → (endothermic)"
    ]
  },
  {
    id: "ionic-equilibrium",
    title: "Ionic Equilibrium in Solutions",
    description: "Ionization of weak acids and bases in water.",
    keyPoints: [
      "Weak electrolytes: Partially ionize in solution",
      "Degree of ionization (α): Fraction of molecules ionized",
      "For weak acid HA: HA ⇌ H⁺ + A⁻",
      "Ka = [H⁺][A⁻] / [HA] (acid dissociation constant)",
      "For weak base BOH: BOH ⇌ B⁺ + OH⁻",
      "Kb = [B⁺][OH⁻] / [BOH] (base dissociation constant)",
      "Larger Ka or Kb: Stronger acid or base",
      "Ostwald's dilution law: For weak electrolyte, Ka = Cα² / (1-α)",
      "If α << 1: Ka ≈ Cα²",
      "Relation: Ka × Kb = Kw = 10⁻¹⁴ at 25°C (conjugate acid-base pairs)"
    ],
    examples: [
      "CH₃COOH ⇌ H⁺ + CH₃COO⁻: Ka = 1.8 × 10⁻⁵",
      "NH₃ + H₂O ⇌ NH₄⁺ + OH⁻: Kb = 1.8 × 10⁻⁵",
      "HCN (Ka = 6.2 × 10⁻¹⁰) weaker than CH₃COOH",
      "For 0.1 M acetic acid with α = 0.01: Ka = 0.1 × (0.01)² / 0.99 ≈ 10⁻⁵",
      "CH₃COO⁻ and CH₃COOH: Ka × Kb = Kw"
    ],
    formulas: [
      "Ka = [H⁺][A⁻] / [HA]",
      "Kb = [B⁺][OH⁻] / [BOH]",
      "Ka = Cα² / (1-α) (Ostwald's dilution law)",
      "Ka × Kb = Kw = 10⁻¹⁴"
    ]
  },
  {
    id: "ph-concept",
    title: "pH Scale & Ionization of Water",
    description: "Measuring acidity and basicity of solutions.",
    keyPoints: [
      "pH = -log[H⁺] (measure of acidity)",
      "pOH = -log[OH⁻] (measure of basicity)",
      "pH + pOH = 14 (at 25°C)",
      "Neutral: pH = 7; Acidic: pH < 7; Basic: pH > 7",
      "Water ionization: H₂O ⇌ H⁺ + OH⁻",
      "Kw = [H⁺][OH⁻] = 10⁻¹⁴ at 25°C (ionic product of water)",
      "In pure water: [H⁺] = [OH⁻] = 10⁻⁷ M",
      "Strong acid: pH = -log C (complete ionization)",
      "Weak acid: pH = ½(pKa - log C)",
      "pKa = -log Ka; pKb = -log Kb; pKa + pKb = 14"
    ],
    examples: [
      "0.01 M HCl: pH = -log(0.01) = 2",
      "0.001 M NaOH: pOH = 3, pH = 14 - 3 = 11",
      "Pure water: [H⁺] = 10⁻⁷, pH = 7",
      "CH₃COOH (Ka = 1.8×10⁻⁵): pKa = 4.74",
      "[H⁺] = 10⁻³ M: pH = 3 (acidic)"
    ],
    formulas: [
      "pH = -log[H⁺]",
      "pOH = -log[OH⁻]",
      "pH + pOH = 14",
      "Kw = [H⁺][OH⁻] = 10⁻¹⁴",
      "pKa = -log Ka",
      "pKb = -log Kb"
    ]
  },
  {
    id: "buffer-solutions",
    title: "Buffer Solutions",
    description: "Solutions that resist pH change on addition of acid or base.",
    keyPoints: [
      "Buffer: Mixture of weak acid + its salt OR weak base + its salt",
      "Acidic buffer: Weak acid + salt of weak acid (e.g., CH₃COOH + CH₃COONa)",
      "Basic buffer: Weak base + salt of weak base (e.g., NH₃ + NH₄Cl)",
      "Henderson-Hasselbalch equation: pH = pKa + log([Salt]/[Acid])",
      "For basic buffer: pOH = pKb + log([Salt]/[Base])",
      "Buffer capacity: Amount of acid/base buffer can neutralize",
      "Maximum capacity when [Salt] = [Acid] (pH = pKa)",
      "Buffer works best when pH = pKa ± 1",
      "Blood buffer: H₂CO₃/HCO₃⁻ maintains pH ≈ 7.4",
      "Buffers important in biological systems"
    ],
    examples: [
      "CH₃COOH + CH₃COONa: Acidic buffer, pH ≈ 4.74",
      "NH₃ + NH₄Cl: Basic buffer, pOH ≈ 4.74",
      "Calculate pH of buffer with 0.1 M CH₃COOH and 0.1 M CH₃COONa: pH = pKa + log(1) = 4.74",
      "Blood: H₂CO₃/HCO₃⁻ buffer system",
      "Add acid to buffer: Salt neutralizes it, pH change minimal"
    ],
    formulas: [
      "pH = pKa + log([Salt]/[Acid]) (Henderson-Hasselbalch)",
      "pOH = pKb + log([Salt]/[Base])",
      "Buffer works when pH ≈ pKa"
    ]
  },
  {
    id: "common-ion",
    title: "Common Ion Effect & Salt Hydrolysis",
    description: "Effect of common ions on equilibrium and pH of salt solutions.",
    keyPoints: [
      "Common ion effect: Addition of common ion suppresses ionization",
      "Adding CH₃COONa to CH₃COOH: Shifts equilibrium left (Le Chatelier)",
      "Degree of ionization decreases with common ion",
      "Salt hydrolysis: Reaction of salt ions with water",
      "Salt of strong acid + strong base: No hydrolysis, pH = 7 (NaCl)",
      "Salt of weak acid + strong base: Basic hydrolysis, pH > 7 (CH₃COONa)",
      "Salt of strong acid + weak base: Acidic hydrolysis, pH < 7 (NH₄Cl)",
      "Salt of weak acid + weak base: pH depends on Ka and Kb",
      "For salt of weak acid: pH = 7 + ½(pKa + log C)",
      "Hydrolysis constant: Kh = Kw/Ka (for salt of weak acid)"
    ],
    examples: [
      "CH₃COOH + CH₃COONa: Common ion CH₃COO⁻ reduces ionization",
      "NaCl in water: No hydrolysis, neutral pH",
      "CH₃COONa: CH₃COO⁻ + H₂O → CH₃COOH + OH⁻ (basic)",
      "NH₄Cl: NH₄⁺ + H₂O → NH₃ + H₃O⁺ (acidic)",
      "Na₂CO₃ solution: pH > 7 (salt of weak acid H₂CO₃)"
    ],
    formulas: [
      "Common ion suppresses ionization",
      "Kh = Kw/Ka (weak acid salt)",
      "Kh = Kw/Kb (weak base salt)",
      "pH (weak acid salt) = 7 + ½(pKa + log C)"
    ]
  },
  {
    id: "solubility",
    title: "Solubility Product (Ksp)",
    description: "Equilibrium involving sparingly soluble ionic compounds.",
    keyPoints: [
      "Sparingly soluble salts: Establish equilibrium with ions",
      "For AmBn(s) ⇌ mA^n+(aq) + nB^m-(aq): Ksp = [A^n+]^m[B^m-]^n",
      "Ksp: Solubility product constant (product of ion concentrations)",
      "Larger Ksp: More soluble salt",
      "Solubility (S): Moles of salt dissolved per liter",
      "For AB: Ksp = S²; For AB₂: Ksp = 4S³",
      "Ionic product (IP): Actual product of ion concentrations",
      "IP > Ksp: Precipitation occurs",
      "IP = Ksp: Saturated solution (equilibrium)",
      "IP < Ksp: Unsaturated, more can dissolve"
    ],
    examples: [
      "AgCl(s) ⇌ Ag⁺ + Cl⁻: Ksp = [Ag⁺][Cl⁻] = 1.8 × 10⁻¹⁰",
      "If S is solubility: Ksp = S × S = S²",
      "BaSO₄: Ksp = 1.1 × 10⁻¹⁰, very sparingly soluble",
      "For Ag₂CrO₄ (AB₂ type): Ksp = [Ag⁺]²[CrO₄²⁻] = 4S³",
      "Adding NaCl to AgCl solution: Common ion, solubility decreases"
    ],
    formulas: [
      "Ksp = [cation]^m[anion]^n",
      "For AB: Ksp = S²",
      "For AB₂: Ksp = 4S³",
      "For A₂B: Ksp = 4S³",
      "IP > Ksp: Precipitation"
    ]
  }
];



export function ChemistryChapter7() {
  // Fetch questions from database for Equilibrium (topicId: 42)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '42'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=42');
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
        <Scale className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 7: Equilibrium</h1>
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
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            Visualization
          </TabsTrigger>
          <TabsTrigger value="practice">
            <Activity className="h-4 w-4 mr-2" />
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
                  <li>Dynamic equilibrium and equilibrium constant (Kc, Kp)</li>
                  <li>Le Chatelier's principle and factors affecting equilibrium</li>
                  <li>Ionic equilibrium: weak acids, bases, and ionization</li>
                  <li>pH scale, pOH, and calculations</li>
                  <li>Buffer solutions and Henderson-Hasselbalch equation</li>
                  <li>Common ion effect and salt hydrolysis</li>
                  <li>Solubility product (Ksp) and precipitation</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-blue-500">Equilibrium Law</Badge>
                    <CardTitle className="text-lg">Mass Action</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>K = [Products] / [Reactants]</strong></p>
                    <p>For aA + bB ⇌ cC + dD:</p>
                    <p className="font-mono">K = [C]^c[D]^d / [A]^a[B]^b</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      K {'>'} 1: Products favored<br/>
                      K &lt; 1: Reactants favored
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Le Chatelier</Badge>
                    <CardTitle className="text-lg">Stress Response</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>System minimizes stress</strong></p>
                    <p>↑ Concentration → Shift away</p>
                    <p>↑ Pressure → Fewer moles</p>
                    <p>↑ Temperature:</p>
                    <p className="text-xs text-muted-foreground">
                      Exo (ΔH &lt; 0): ← shift<br/>
                      Endo (ΔH {'>'} 0): → shift
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">pH Scale</Badge>
                    <CardTitle className="text-lg">Acidity Measure</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>pH = -log[H⁺]</strong></p>
                    <p><strong>pH + pOH = 14</strong></p>
                    <p>Acidic: pH &lt; 7</p>
                    <p>Neutral: pH = 7</p>
                    <p>Basic: pH {'>'} 7</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Kw = [H⁺][OH⁻] = 10⁻¹⁴
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-orange-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-orange-500">Buffer</Badge>
                    <CardTitle className="text-lg">pH Resistance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Henderson-Hasselbalch:</strong></p>
                    <p className="font-mono">pH = pKa + log([Salt]/[Acid])</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Weak acid + its salt<br/>
                      OR Weak base + its salt<br/>
                      Resists pH change
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Key Relationships
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Kp = Kc(RT)^Δn</strong></p>
                  <p><strong>Ka × Kb = Kw = 10⁻¹⁴</strong></p>
                  <p><strong>pKa + pKb = 14</strong></p>
                  <p><strong>For AB type salt: Ksp = S²</strong></p>
                  <p><strong>IP {'>'} Ksp: Precipitation</strong></p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter7Topics.map((topic, index) => (
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

        <TabsContent value="visualization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Equilibrium Visualization</CardTitle>
              <p className="text-sm text-muted-foreground">
                Visual representations of equilibrium concepts
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card className="border-blue-500/20">
                <CardHeader>
                  <CardTitle>Dynamic Equilibrium</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <div className="bg-orange-500 text-white px-4 py-2 rounded-lg mb-2">
                          Reactants
                        </div>
                        <p className="text-xs text-muted-foreground">A + B</p>
                      </div>
                      <div className="flex flex-col items-center px-8">
                        <ArrowLeftRight className="h-12 w-12 text-blue-500 animate-pulse" />
                        <p className="text-xs mt-2 font-semibold">Rate_forward = Rate_reverse</p>
                      </div>
                      <div className="text-center flex-1">
                        <div className="bg-green-500 text-white px-4 py-2 rounded-lg mb-2">
                          Products
                        </div>
                        <p className="text-xs text-muted-foreground">C + D</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardHeader>
                  <CardTitle>pH Scale (0-14)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-16 rounded-lg overflow-hidden flex">
                      <div className="flex-1 bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 flex items-center justify-around text-white font-bold text-sm">
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span className="text-black">7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10</span>
                        <span>11</span>
                        <span>12</span>
                        <span>13</span>
                        <span>14</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <p className="font-semibold text-red-600">Acidic (pH &lt; 7)</p>
                        <p className="text-xs text-muted-foreground">[H⁺] {'>'} 10⁻⁷</p>
                      </div>
                      <div>
                        <p className="font-semibold">Neutral (pH = 7)</p>
                        <p className="text-xs text-muted-foreground">[H⁺] = 10⁻⁷</p>
                      </div>
                      <div>
                        <p className="font-semibold text-green-600">Basic (pH {'>'} 7)</p>
                        <p className="text-xs text-muted-foreground">[H⁺] &lt; 10⁻⁷</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Le Chatelier: Pressure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm font-semibold mb-2">N₂ + 3H₂ ⇌ 2NH₃</p>
                        <p className="text-xs">4 moles → 2 moles</p>
                      </div>
                      <div className="flex items-center justify-center gap-2 py-2">
                        <p className="text-sm">↑ Pressure</p>
                        <ArrowLeftRight className="h-5 w-5 text-green-500" />
                        <p className="text-sm">Shifts →</p>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Favors fewer moles (products)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Le Chatelier: Temperature</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                        <p className="text-sm font-semibold mb-2">N₂ + 3H₂ ⇌ 2NH₃</p>
                        <p className="text-xs">ΔH = -92 kJ (Exothermic)</p>
                      </div>
                      <div className="flex items-center justify-center gap-2 py-2">
                        <p className="text-sm">↑ Temp</p>
                        <ArrowLeftRight className="h-5 w-5 text-orange-500 transform rotate-180" />
                        <p className="text-sm">Shifts ←</p>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Heat = Product, shift away
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-purple-500/20">
                <CardHeader>
                  <CardTitle>Buffer Action</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <p className="font-semibold text-center">Add Acid (H⁺)</p>
                      <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm mb-2">CH₃COOH / CH₃COO⁻</p>
                        <p className="text-xs">CH₃COO⁻ + H⁺ → CH₃COOH</p>
                      </div>
                      <p className="text-xs text-center text-muted-foreground">
                        Salt neutralizes acid
                      </p>
                    </div>
                    <div className="space-y-3">
                      <p className="font-semibold text-center">Add Base (OH⁻)</p>
                      <div className="p-4 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg">
                        <p className="text-sm mb-2">CH₃COOH / CH₃COO⁻</p>
                        <p className="text-xs">CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O</p>
                      </div>
                      <p className="text-xs text-center text-muted-foreground">
                        Acid neutralizes base
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/20">
                <CardHeader>
                  <CardTitle>Solubility Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm font-semibold mb-2 text-center">AgCl(s) ⇌ Ag⁺ + Cl⁻</p>
                      <p className="text-xs text-center">Ksp = [Ag⁺][Cl⁻]</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg text-center">
                        <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">IP &lt; Ksp</p>
                        <p className="text-xs">Unsaturated</p>
                        <p className="text-xs text-muted-foreground">More dissolves</p>
                      </div>
                      <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg text-center">
                        <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 mb-1">IP = Ksp</p>
                        <p className="text-xs">Saturated</p>
                        <p className="text-xs text-muted-foreground">Equilibrium</p>
                      </div>
                      <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg text-center">
                        <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">IP {'>'} Ksp</p>
                        <p className="text-xs">Supersaturated</p>
                        <p className="text-xs text-muted-foreground">Precipitation</p>
                      </div>
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
