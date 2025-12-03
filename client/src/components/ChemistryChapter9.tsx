import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, Zap, Droplets , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter9Topics: Topic[] = [
  {
    id: "concentration-terms",
    title: "Concentration Terms",
    description: "Different ways to express the concentration of solutions.",
    keyPoints: [
      "Mass percentage (w/w): (Mass of solute / Mass of solution) × 100",
      "Volume percentage (v/v): (Volume of solute / Volume of solution) × 100",
      "Mass by volume percentage (w/v): (Mass of solute / Volume of solution) × 100",
      "Parts per million (ppm): (Mass of solute / Mass of solution) × 10⁶",
      "Mole fraction (χ): Moles of component / Total moles",
      "Molarity (M): Moles of solute / Volume of solution (L)",
      "Molality (m): Moles of solute / Mass of solvent (kg)",
      "Normality (N): Equivalents of solute / Volume of solution (L)",
      "Molarity changes with temperature; molality doesn't"
    ],
    examples: [
      "10% NaCl solution (w/w): 10 g NaCl in 100 g solution",
      "5% glucose (w/v): 5 g glucose in 100 mL solution",
      "0.1 M NaOH: 0.1 mol NaOH in 1 L solution",
      "1 m glucose: 1 mol glucose in 1 kg water",
      "χ(ethanol) in 50:50 ethanol-water mixture = 0.5",
      "ppm of fluoride in water: 1 mg F⁻ per liter"
    ],
    formulas: [
      "Mass % = (Mass solute / Mass solution) × 100",
      "Molarity (M) = n / V(L)",
      "Molality (m) = n / Mass solvent(kg)",
      "Mole fraction χ = n_i / Σn",
      "χ₁ + χ₂ = 1 (for binary solution)",
      "ppm = (Mass solute / Mass solution) × 10⁶",
      "Normality = Molarity × n-factor"
    ]
  },
  {
    id: "raoult-law",
    title: "Raoult's Law",
    description: "Relationship between vapor pressure and mole fraction in solutions.",
    keyPoints: [
      "Raoult's Law: P₁ = χ₁ × P₁° (for ideal solutions)",
      "P₁: Vapor pressure of component 1 in solution",
      "P₁°: Vapor pressure of pure component 1",
      "χ₁: Mole fraction of component 1",
      "Total pressure: P_total = P₁ + P₂ = χ₁P₁° + χ₂P₂°",
      "Relative lowering of vapor pressure: (P° - P)/P° = χ_solute",
      "Valid for volatile solutes in volatile solvents",
      "For non-volatile solute: ΔP = P° - P = χ_solute × P°",
      "Ideal solution: Obeys Raoult's law at all concentrations"
    ],
    examples: [
      "Benzene-toluene mixture (ideal solution)",
      "If χ(benzene) = 0.6, P°(benzene) = 100 mmHg, then P(benzene) = 60 mmHg",
      "Adding sugar to water lowers vapor pressure",
      "ΔP/P° = n_solute/(n_solute + n_solvent) ≈ n_solute/n_solvent (dilute)"
    ],
    formulas: [
      "P₁ = χ₁ × P₁° (Raoult's Law)",
      "P_total = χ₁P₁° + χ₂P₂°",
      "ΔP/P° = χ_solute (relative lowering)",
      "ΔP/P° = n/(n + N) ≈ n/N (dilute solutions)",
      "ΔP = χ_solute × P° (non-volatile solute)"
    ]
  },
  {
    id: "ideal-nonideal",
    title: "Ideal and Non-Ideal Solutions",
    description: "Deviations from Raoult's law and their causes.",
    keyPoints: [
      "Ideal solution: Obeys Raoult's law, ΔH_mix = 0, ΔV_mix = 0",
      "A-A and B-B interactions = A-B interactions",
      "Examples: Benzene-toluene, hexane-heptane",
      "Non-ideal solutions: Show deviations from Raoult's law",
      "Positive deviation: P > Raoult's law prediction, ΔH_mix > 0",
      "A-B interactions weaker than A-A and B-B",
      "Examples: Ethanol-water, acetone-ethanol",
      "Negative deviation: P < Raoult's law prediction, ΔH_mix < 0",
      "A-B interactions stronger than A-A and B-B",
      "Examples: Chloroform-acetone, HNO₃-water"
    ],
    examples: [
      "Ethanol-cyclohexane: Positive deviation, forms minimum boiling azeotrope",
      "HCl-water: Negative deviation, forms maximum boiling azeotrope",
      "Benzene-toluene: Ideal solution",
      "Acetone-CHCl₃: Negative deviation (H-bonding between unlike molecules)"
    ],
    formulas: [
      "Ideal: ΔH_mix = 0, ΔV_mix = 0",
      "Positive deviation: P_obs > P_Raoult, ΔH_mix > 0",
      "Negative deviation: P_obs < P_Raoult, ΔH_mix < 0"
    ]
  },
  {
    id: "colligative-properties",
    title: "Colligative Properties - Introduction",
    description: "Properties that depend only on number of solute particles, not their nature.",
    keyPoints: [
      "Colligative properties: Depend on number of particles, not identity",
      "Four main colligative properties:",
      "1. Relative lowering of vapor pressure",
      "2. Elevation of boiling point",
      "3. Depression of freezing point",
      "4. Osmotic pressure",
      "Valid for dilute solutions of non-volatile solutes",
      "Used to determine molar mass of solutes",
      "More particles → Greater effect on colligative properties"
    ],
    examples: [
      "Salt lowers freezing point of ice (road de-icing)",
      "Antifreeze in car radiators (ethylene glycol)",
      "Adding salt increases boiling point of water",
      "Osmosis in biological cells"
    ]
  },
  {
    id: "boiling-point",
    title: "Elevation of Boiling Point",
    description: "Increase in boiling point when non-volatile solute is added.",
    keyPoints: [
      "Boiling point elevation: ΔT_b = T_b - T_b°",
      "ΔT_b = K_b × m (molality)",
      "K_b: Ebullioscopic constant (molal elevation constant)",
      "K_b depends only on solvent, not solute",
      "K_b = RT_b²M / (1000 × ΔH_vap)",
      "For water: K_b = 0.52 K kg mol⁻¹",
      "For benzene: K_b = 2.53 K kg mol⁻¹",
      "Used to calculate molar mass: M = (K_b × w₂ × 1000)/(ΔT_b × w₁)"
    ],
    examples: [
      "Water boils at 100.52°C with 1 m solution",
      "Adding 1 mol glucose to 1 kg water raises b.p. by 0.52 K",
      "Calculate M: If 10 g solute in 100 g water gives ΔT_b = 0.26 K",
      "M = (0.52 × 10 × 1000)/(0.26 × 100) = 200 g/mol"
    ],
    formulas: [
      "ΔT_b = K_b × m",
      "ΔT_b = K_b × (n/W_solvent in kg)",
      "ΔT_b = K_b × (w₂ × 1000)/(M₂ × w₁)",
      "M₂ = (K_b × w₂ × 1000)/(ΔT_b × w₁)",
      "K_b = RT_b²M/(1000 × ΔH_vap)"
    ]
  },
  {
    id: "freezing-point",
    title: "Depression of Freezing Point",
    description: "Decrease in freezing point when solute is added.",
    keyPoints: [
      "Freezing point depression: ΔT_f = T_f° - T_f",
      "ΔT_f = K_f × m",
      "K_f: Cryoscopic constant (molal depression constant)",
      "For water: K_f = 1.86 K kg mol⁻¹",
      "For benzene: K_f = 5.12 K kg mol⁻¹",
      "K_f = RT_f²M / (1000 × ΔH_fusion)",
      "Used to find molar mass: M = (K_f × w₂ × 1000)/(ΔT_f × w₁)",
      "Practical application: Antifreeze, de-icing roads"
    ],
    examples: [
      "Water freezes at -1.86°C with 1 m solution",
      "Adding NaCl to ice lowers freezing point (ice cream making)",
      "Ethylene glycol as antifreeze in car radiators",
      "If 5 g solute in 50 g water gives ΔT_f = 1.86 K, M = 100 g/mol"
    ],
    formulas: [
      "ΔT_f = K_f × m",
      "ΔT_f = K_f × (n/W_solvent in kg)",
      "ΔT_f = K_f × (w₂ × 1000)/(M₂ × w₁)",
      "M₂ = (K_f × w₂ × 1000)/(ΔT_f × w₁)",
      "K_f = RT_f²M/(1000 × ΔH_fusion)"
    ]
  },
  {
    id: "osmotic-pressure",
    title: "Osmotic Pressure",
    description: "Pressure required to stop osmosis across a semipermeable membrane.",
    keyPoints: [
      "Osmosis: Flow of solvent from lower to higher concentration",
      "Semipermeable membrane: Allows only solvent molecules to pass",
      "Osmotic pressure (π): Pressure needed to prevent osmosis",
      "Van't Hoff equation: π = CRT = (n/V)RT",
      "π = (w₂/M₂) × (RT/V)",
      "For dilute solutions: π = MRT (M = molarity)",
      "Isotonic solutions: Same osmotic pressure",
      "Hypertonic: Higher osmotic pressure (cell shrinks)",
      "Hypotonic: Lower osmotic pressure (cell swells)"
    ],
    examples: [
      "Reverse osmosis for water purification",
      "IV drips must be isotonic with blood (π ≈ 7.7 atm)",
      "Red blood cells in pure water swell (hypotonic)",
      "Plant cells remain turgid due to osmotic pressure",
      "Calculate π: 0.1 M glucose at 300 K: π = 0.1 × 0.0821 × 300 = 2.46 atm"
    ],
    formulas: [
      "π = CRT (Van't Hoff equation)",
      "π = (n/V)RT",
      "π = (w₂/M₂V)RT",
      "M₂ = (w₂RT)/(πV)",
      "For dilute: πV = nRT (similar to PV = nRT)"
    ]
  },
  {
    id: "vant-hoff-factor",
    title: "Van't Hoff Factor",
    description: "Correction factor for electrolytes that dissociate in solution.",
    keyPoints: [
      "Van't Hoff factor (i): Ratio of observed to expected particles",
      "i = (Observed colligative property) / (Calculated for non-electrolyte)",
      "For non-electrolytes: i = 1 (glucose, urea, sucrose)",
      "For strong electrolytes: i = number of ions",
      "NaCl: i ≈ 2 (Na⁺ + Cl⁻)",
      "CaCl₂: i ≈ 3 (Ca²⁺ + 2Cl⁻)",
      "Al₂(SO₄)₃: i ≈ 5 (2Al³⁺ + 3SO₄²⁻)",
      "Weak electrolytes: 1 < i < number of ions (partial dissociation)",
      "Modified equations: ΔT_f = i × K_f × m, π = i × CRT"
    ],
    examples: [
      "Glucose: i = 1 (no dissociation)",
      "NaCl: i = 2 (complete dissociation)",
      "K₂SO₄: i = 3 (2K⁺ + SO₄²⁻)",
      "Acetic acid (weak): i ≈ 1.05 (partial ionization)",
      "0.1 m NaCl: ΔT_f = 2 × 1.86 × 0.1 = 0.372 K"
    ],
    formulas: [
      "i = (Observed particles) / (Formula units dissolved)",
      "ΔT_f = i × K_f × m",
      "ΔT_b = i × K_b × m",
      "π = i × CRT",
      "i = 1 + α(n - 1), where α = degree of dissociation, n = ions per formula"
    ]
  }
];



export function ChemistryChapter9() {
  // Fetch questions from database for Hydrogen (topicId: 44)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '44'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=44');
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
        <Droplets className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 9: Solutions</h1>
          <p className="text-muted-foreground">Class XI & XII Chemistry - NEET Syllabus</p>
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
                  <li>Concentration terms: molarity, molality, mole fraction, mass percentage</li>
                  <li>Raoult's law and vapor pressure of solutions</li>
                  <li>Ideal and non-ideal solutions</li>
                  <li>Colligative properties: depend on number of particles</li>
                  <li>Elevation of boiling point and depression of freezing point</li>
                  <li>Osmotic pressure and its applications</li>
                  <li>Van't Hoff factor for electrolytes</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-blue-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Concepts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Colligative Properties:</strong> Depend on NUMBER of particles, not nature</p>
                    <p><strong>Molality vs Molarity:</strong> Molality doesn't change with temperature</p>
                    <p><strong>Van't Hoff factor:</strong> Correction for electrolyte dissociation</p>
                    <p><strong>Raoult's Law:</strong> P₁ = χ₁ × P₁° (ideal solutions)</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Quick Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Confusing molarity (moles/L solution) with molality (moles/kg solvent)</p>
                    <p>• Forgetting Van't Hoff factor for ionic compounds</p>
                    <p>• Wrong mass units: molality needs kg, not g</p>
                    <p>• Not converting temperature to Kelvin for osmotic pressure</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Colligative Properties Formulas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm font-mono">
                  <p><strong>Relative lowering of VP:</strong> ΔP/P° = χ_solute</p>
                  <p><strong>Boiling point elevation:</strong> ΔT_b = K_b × m</p>
                  <p><strong>Freezing point depression:</strong> ΔT_f = K_f × m</p>
                  <p><strong>Osmotic pressure:</strong> π = CRT</p>
                  <p><strong>With Van't Hoff factor:</strong> Multiply by i</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle>Important Constants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold mb-2">For Water:</p>
                      <p>K_f = 1.86 K kg mol⁻¹</p>
                      <p>K_b = 0.52 K kg mol⁻¹</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">For Benzene:</p>
                      <p>K_f = 5.12 K kg mol⁻¹</p>
                      <p>K_b = 2.53 K kg mol⁻¹</p>
                    </div>
                  </div>
                  <p className="mt-2"><strong>R (gas constant):</strong> 0.0821 L atm K⁻¹ mol⁻¹</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter9Topics.map((topic, index) => (
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
                            <div key={i} className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                              <p className="text-sm font-mono">{example}</p>
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

          <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
            <CardHeader>
              <CardTitle>Van't Hoff Factor (i) - Quick Reference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Non-Electrolytes</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Glucose: i = 1</li>
                    <li>• Urea: i = 1</li>
                    <li>• Sucrose: i = 1</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Strong Electrolytes</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• NaCl: i = 2</li>
                    <li>• CaCl₂: i = 3</li>
                    <li>• K₂SO₄: i = 3</li>
                    <li>• Al₂(SO₄)₃: i = 5</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mt-4">
                <p className="font-semibold mb-2">Modified Colligative Property Equations:</p>
                <div className="space-y-1 text-sm font-mono">
                  <p>ΔT_f = i × K_f × m</p>
                  <p>ΔT_b = i × K_b × m</p>
                  <p>π = i × CRT</p>
                  <p>ΔP/P° = i × χ_solute</p>
                </div>
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