import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, Wind, Droplet, Zap , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter5Topics: Topic[] = [
  {
    id: "ideal-gas",
    title: "Ideal Gas Equation & Gas Laws",
    description: "Relationship between pressure, volume, temperature, and moles for ideal gases.",
    keyPoints: [
      "Ideal Gas Equation: PV = nRT (P = pressure, V = volume, n = moles, R = gas constant, T = temperature)",
      "R = 0.0821 L·atm/(mol·K) = 8.314 J/(mol·K)",
      "Boyle's Law: P ∝ 1/V (at constant T, n) → P₁V₁ = P₂V₂",
      "Charles's Law: V ∝ T (at constant P, n) → V₁/T₁ = V₂/T₂",
      "Gay-Lussac's Law: P ∝ T (at constant V, n) → P₁/T₁ = P₂/T₂",
      "Avogadro's Law: V ∝ n (at constant P, T) → V₁/n₁ = V₂/n₂",
      "Combined Gas Law: P₁V₁/T₁ = P₂V₂/T₂ (for fixed amount of gas)",
      "STP: 273.15 K (0°C), 1 atm; 1 mole gas = 22.4 L at STP",
      "Ideal gas assumptions: No intermolecular forces, negligible molecular volume"
    ],
    examples: [
      "PV = nRT: Calculate volume of 2 moles of gas at 300 K, 2 atm",
      "V = nRT/P = (2)(0.0821)(300)/2 = 24.63 L",
      "Boyle's Law: If P = 1 atm, V = 10 L, find V when P = 2 atm",
      "V₂ = P₁V₁/P₂ = (1)(10)/2 = 5 L (pressure doubles, volume halves)",
      "Charles's Law: Gas at 300 K, 5 L. Find V at 600 K",
      "V₂ = V₁T₂/T₁ = (5)(600)/300 = 10 L (temp doubles, volume doubles)",
      "At STP: 1 mole O₂ = 22.4 L, 32 g O₂ = 22.4 L"
    ],
    formulas: [
      "PV = nRT (Ideal Gas Equation)",
      "P₁V₁ = P₂V₂ (Boyle's Law)",
      "V₁/T₁ = V₂/T₂ (Charles's Law)",
      "P₁/T₁ = P₂/T₂ (Gay-Lussac's Law)",
      "V₁/n₁ = V₂/n₂ (Avogadro's Law)",
      "PM = dRT (P = pressure, M = molar mass, d = density)",
      "1 mole gas at STP = 22.4 L"
    ]
  },
  {
    id: "kinetic-theory",
    title: "Kinetic Molecular Theory of Gases",
    description: "Microscopic explanation of gas behavior based on molecular motion.",
    keyPoints: [
      "Gas molecules in continuous random motion",
      "Collisions are perfectly elastic (no energy loss)",
      "Average kinetic energy ∝ absolute temperature",
      "No intermolecular forces (for ideal gas)",
      "Volume of molecules negligible compared to container volume",
      "KE_avg = (3/2)kT = (3/2)RT/N_A (k = Boltzmann constant)",
      "Root mean square speed: u_rms = √(3RT/M)",
      "Average speed: u_avg = √(8RT/πM)",
      "Most probable speed: u_mp = √(2RT/M)",
      "u_rms > u_avg > u_mp (speed relationship)"
    ],
    examples: [
      "Calculate u_rms for O₂ at 300 K (M = 32 g/mol = 0.032 kg/mol)",
      "u_rms = √(3 × 8.314 × 300 / 0.032) = 483 m/s",
      "Lighter gas molecules move faster: u_rms(H₂) > u_rms(O₂)",
      "Higher temperature → faster molecular motion",
      "At same T: KE(H₂) = KE(O₂), but H₂ moves faster (lighter)",
      "Pressure arises from molecular collisions with walls"
    ],
    formulas: [
      "KE_avg = (3/2)kT = (3/2)(R/N_A)T",
      "u_rms = √(3RT/M) (root mean square speed)",
      "u_avg = √(8RT/πM) (average speed)",
      "u_mp = √(2RT/M) (most probable speed)",
      "u_rms : u_avg : u_mp = √3 : √(8/π) : √2 ≈ 1.73 : 1.60 : 1.41",
      "KE ∝ T (Kelvin temperature)"
    ]
  },
  {
    id: "real-gases",
    title: "Real Gases & van der Waals Equation",
    description: "Deviations from ideal behavior and corrections for real gases.",
    keyPoints: [
      "Real gases deviate from ideal behavior at high P and low T",
      "van der Waals equation: (P + an²/V²)(V - nb) = nRT",
      "a: Measure of intermolecular attractive forces (atm·L²/mol²)",
      "b: Volume occupied by gas molecules (L/mol)",
      "Compressibility factor: Z = PV/nRT",
      "Z = 1 for ideal gas; Z < 1 (attractive forces dominate); Z > 1 (repulsive forces dominate)",
      "At low P: Z < 1 (attractive forces); At high P: Z > 1 (molecular volume)",
      "H₂ and He show Z > 1 even at low P (very weak intermolecular forces)",
      "Boyle temperature: Temperature at which real gas behaves ideally"
    ],
    examples: [
      "Ideal: PV = nRT; Real: (P + an²/V²)(V - nb) = nRT",
      "Larger 'a' value → stronger intermolecular forces → more deviation",
      "NH₃, H₂O have high 'a' (strong H-bonding) → deviate more",
      "He, H₂ have low 'a' (weak forces) → behave nearly ideal",
      "At low pressure and high temperature: gases behave ideally",
      "At high pressure and low temperature: liquefaction occurs"
    ],
    formulas: [
      "(P + an²/V²)(V - nb) = nRT (van der Waals equation)",
      "Z = PV/nRT (compressibility factor)",
      "Z = 1 (ideal), Z < 1 (attractive), Z > 1 (repulsive)",
      "P_real = P_ideal - an²/V² (pressure correction)",
      "V_real = V_ideal - nb (volume correction)"
    ]
  },
  {
    id: "liquefaction",
    title: "Liquefaction of Gases & Critical Temperature",
    description: "Conditions required to convert gas to liquid state.",
    keyPoints: [
      "Liquefaction: Converting gas to liquid by cooling and compression",
      "Critical temperature (T_c): Maximum T at which gas can be liquefied by pressure alone",
      "Critical pressure (P_c): Minimum P required to liquefy gas at T_c",
      "Critical volume (V_c): Volume occupied by 1 mole at T_c and P_c",
      "Above T_c: Gas cannot be liquefied (called supercritical fluid)",
      "Below T_c: Gas can be liquefied by applying sufficient pressure",
      "Gases with higher T_c are easier to liquefy (stronger intermolecular forces)",
      "Permanent gases: T_c very low (H₂: -240°C, He: -268°C)",
      "Joule-Thomson effect: Cooling of gas during adiabatic expansion"
    ],
    examples: [
      "CO₂: T_c = 31.1°C (easily liquefied at room temp with pressure)",
      "NH₃: T_c = 132.4°C (strong H-bonding, high T_c)",
      "H₂O: T_c = 374°C (very high due to H-bonding)",
      "H₂: T_c = -240°C (difficult to liquefy, called permanent gas)",
      "He: T_c = -268°C (lowest T_c, hardest to liquefy)",
      "Liquefied petroleum gas (LPG): Propane, butane under pressure"
    ],
    formulas: [
      "T_c = 8a/(27Rb) (critical temperature)",
      "P_c = a/(27b²) (critical pressure)",
      "V_c = 3b (critical volume)",
      "Higher 'a' → higher T_c (easier to liquefy)"
    ]
  },
  {
    id: "liquid-properties",
    title: "Liquid State Properties",
    description: "Characteristic properties of liquids including surface tension and viscosity.",
    keyPoints: [
      "Liquids: Definite volume, no definite shape, particles close but mobile",
      "Surface tension (γ): Force per unit length acting on surface (N/m or dyne/cm)",
      "Caused by unbalanced intermolecular forces at surface",
      "Higher intermolecular forces → higher surface tension",
      "Temperature increases → surface tension decreases",
      "Viscosity (η): Resistance to flow (measured in poise or Pa·s)",
      "Higher intermolecular forces → higher viscosity",
      "Temperature increases → viscosity decreases (for liquids)",
      "Spherical shape of droplets: Minimum surface area (surface tension)"
    ],
    examples: [
      "Water: High surface tension (72.8 dyne/cm at 20°C) due to H-bonding",
      "Mercury: Very high surface tension (480 dyne/cm), forms spherical drops",
      "Alcohol: Lower surface tension than water (weaker H-bonding)",
      "Honey: High viscosity (thick, flows slowly)",
      "Water: Low viscosity (thin, flows easily)",
      "Insects walk on water due to surface tension",
      "Capillary rise: Adhesive > cohesive forces (water in glass tube)"
    ],
    formulas: [
      "Surface tension γ = F/L (force per unit length)",
      "Surface energy = γ × area",
      "Capillary rise: h = 2γ cosθ / (ρgr)",
      "Viscosity: F = ηA(dv/dx) (Newton's law of viscosity)",
      "1 poise = 0.1 Pa·s"
    ]
  },
  {
    id: "vapor-pressure",
    title: "Vapor Pressure & Evaporation",
    description: "Equilibrium between liquid and vapor phases.",
    keyPoints: [
      "Evaporation: Liquid → vapor (occurs at surface, at all temperatures)",
      "Vapor pressure: Pressure exerted by vapor in equilibrium with liquid",
      "Dynamic equilibrium: Rate of evaporation = rate of condensation",
      "Vapor pressure increases with temperature",
      "Stronger intermolecular forces → lower vapor pressure",
      "Boiling point: Temperature at which vapor pressure = atmospheric pressure",
      "Normal boiling point: BP at 1 atm pressure",
      "Volatile liquids: High vapor pressure, low BP (weak intermolecular forces)",
      "Non-volatile liquids: Low vapor pressure, high BP (strong forces)"
    ],
    examples: [
      "Water: VP = 17.5 mmHg at 20°C, 760 mmHg at 100°C (boiling point)",
      "Ethanol: VP = 44.6 mmHg at 20°C (more volatile than water)",
      "Diethyl ether: Very volatile, VP = 440 mmHg at 20°C, BP = 35°C",
      "Glycerol: Low volatility, VP very low, BP = 290°C",
      "At high altitude: Lower atmospheric P → water boils below 100°C",
      "Pressure cooker: High P → water boils above 100°C"
    ],
    formulas: [
      "Clausius-Clapeyron equation: ln(P₂/P₁) = -ΔH_vap/R (1/T₂ - 1/T₁)",
      "At BP: P_vapor = P_atmospheric",
      "ΔH_vap = enthalpy of vaporization"
    ]
  }
];



export function ChemistryChapter5() {
  // Fetch questions from database for States of Matter (topicId: 40)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '40'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=40');
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
        <Wind className="h-8 w-8 text-cyan-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 5: States of Matter - Gases & Liquids</h1>
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
            <Droplet className="h-4 w-4 mr-2" />
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
                  <li>Ideal gas equation and individual gas laws</li>
                  <li>Kinetic molecular theory of gases</li>
                  <li>Real gases and van der Waals equation</li>
                  <li>Liquefaction of gases and critical temperature</li>
                  <li>Properties of liquids (surface tension, viscosity)</li>
                  <li>Vapor pressure and evaporation</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-cyan-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-cyan-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Gas Laws Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Boyle:</strong> P₁V₁ = P₂V₂ (T, n constant)</p>
                    <p><strong>Charles:</strong> V₁/T₁ = V₂/T₂ (P, n constant)</p>
                    <p><strong>Gay-Lussac:</strong> P₁/T₁ = P₂/T₂ (V, n constant)</p>
                    <p><strong>Avogadro:</strong> V₁/n₁ = V₂/n₂ (P, T constant)</p>
                    <p><strong>Ideal Gas:</strong> PV = nRT</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Key Constants</Badge>
                    <CardTitle className="text-lg">Important Values</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>R:</strong> 8.314 J/(mol·K)</p>
                    <p><strong>R:</strong> 0.0821 L·atm/(mol·K)</p>
                    <p><strong>STP:</strong> 273.15 K, 1 atm</p>
                    <p><strong>Molar Volume at STP:</strong> 22.4 L</p>
                    <p><strong>k (Boltzmann):</strong> 1.38 × 10⁻²³ J/K</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Molecular Speeds
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Root Mean Square:</strong> u_rms = √(3RT/M)</p>
                  <p><strong>Average:</strong> u_avg = √(8RT/πM)</p>
                  <p><strong>Most Probable:</strong> u_mp = √(2RT/M)</p>
                  <p><strong>Order:</strong> u_rms {'>'} u_avg {'>'} u_mp</p>
                  <p className="text-xs text-muted-foreground mt-2">Speed ∝ √T and ∝ 1/√M</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter5Topics.map((topic, index) => (
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
                              <span className="text-cyan-500 mt-1">•</span>
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
                            <div key={i} className="bg-cyan-50 dark:bg-cyan-950/20 p-3 rounded-lg border border-cyan-200 dark:border-cyan-800">
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
              <CardTitle>Gas Laws & Molecular Motion Visualization</CardTitle>
              <p className="text-sm text-muted-foreground">
                Visual representations of gas behavior and liquid properties
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Boyle's Law (P vs V)</CardTitle>
                    <p className="text-sm text-muted-foreground">Inverse relationship at constant T</p>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-6 rounded-lg">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-24 border-2 border-blue-500 rounded flex items-center justify-center">
                            <span className="text-xs">P↑</span>
                          </div>
                          <span className="text-2xl">→</span>
                          <div className="w-8 h-24 border-2 border-blue-500 rounded flex items-center justify-center">
                            <span className="text-xs">V↓</span>
                          </div>
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                          P doubles → V becomes half
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Charles's Law (V vs T)</CardTitle>
                    <p className="text-sm text-muted-foreground">Direct relationship at constant P</p>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 p-6 rounded-lg">
                      <div className="flex justify-center items-end gap-4">
                        <div className="text-center">
                          <div className="w-12 h-16 border-2 border-red-500 rounded mb-2"></div>
                          <span className="text-xs">T₁</span>
                        </div>
                        <span className="text-2xl mb-4">→</span>
                        <div className="text-center">
                          <div className="w-12 h-32 border-2 border-red-500 rounded mb-2"></div>
                          <span className="text-xs">2T₁</span>
                        </div>
                      </div>
                      <p className="text-xs text-center mt-4 text-muted-foreground">
                        T doubles → V doubles
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardHeader>
                  <CardTitle>Molecular Speed Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative h-40 bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
                      <div className="absolute left-0 bottom-0 top-0 w-px bg-gray-300"></div>
                      <svg viewBox="0 0 400 150" className="w-full h-full">
                        <path
                          d="M 20 140 Q 100 100, 150 60 Q 200 30, 250 50 Q 300 80, 380 140"
                          fill="none"
                          stroke="rgb(168, 85, 247)"
                          strokeWidth="2"
                        />
                        <line x1="150" y1="60" x2="150" y2="140" stroke="rgb(59, 130, 246)" strokeDasharray="4" />
                        <line x1="180" y1="50" x2="180" y2="140" stroke="rgb(34, 197, 94)" strokeDasharray="4" />
                        <line x1="210" y1="45" x2="210" y2="140" stroke="rgb(239, 68, 68)" strokeDasharray="4" />
                      </svg>
                      <div className="absolute bottom-2 left-32 text-xs text-blue-600">u_mp</div>
                      <div className="absolute bottom-2 left-44 text-xs text-green-600">u_avg</div>
                      <div className="absolute bottom-2 left-56 text-xs text-red-600">u_rms</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                        <p className="font-semibold">Most Probable</p>
                        <p className="text-blue-600">√(2RT/M)</p>
                      </div>
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded">
                        <p className="font-semibold">Average</p>
                        <p className="text-green-600">√(8RT/πM)</p>
                      </div>
                      <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded">
                        <p className="font-semibold">RMS</p>
                        <p className="text-red-600">√(3RT/M)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/20">
                <CardHeader>
                  <CardTitle>Compressibility Factor (Z)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-yellow-500">
                      <p className="font-bold text-xl mb-2">Z &lt; 1</p>
                      <p className="text-sm text-muted-foreground">Attractive forces dominate</p>
                      <p className="text-xs mt-2">Low pressure, moderate T</p>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-green-500">
                      <p className="font-bold text-xl mb-2">Z = 1</p>
                      <p className="text-sm text-muted-foreground">Ideal gas behavior</p>
                      <p className="text-xs mt-2">Low P, high T</p>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-red-500">
                      <p className="font-bold text-xl mb-2">Z {'>'} 1</p>
                      <p className="text-sm text-muted-foreground">Repulsive forces dominate</p>
                      <p className="text-xs mt-2">High pressure</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-cyan-500/20">
                <CardHeader>
                  <CardTitle>Surface Tension Demonstration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="text-center p-6 bg-gradient-to-b from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg">
                      <div className="relative h-32 flex items-end justify-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg"></div>
                      </div>
                      <p className="text-sm font-semibold mt-4">Water Droplet</p>
                      <p className="text-xs text-muted-foreground">High surface tension → spherical shape</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg">
                      <div className="relative h-32 flex items-end justify-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-2xl"></div>
                      </div>
                      <p className="text-sm font-semibold mt-4">Mercury Droplet</p>
                      <p className="text-xs text-muted-foreground">Very high surface tension</p>
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
                <Card key={q.id} className="border-cyan-500/20">
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
                        <p className="font-semibold mb-2 text-cyan-600 dark:text-cyan-400">Solution:</p>
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
