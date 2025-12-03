import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, Atom, Zap, TestTubes , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter16Topics: Topic[] = [
  {
    id: "transition-elements",
    title: "Transition Elements (d-Block)",
    description: "Elements with incompletely filled d-orbitals in ground state or common oxidation states.",
    keyPoints: [
      "General electronic configuration: (n-1)d¹⁻¹⁰ ns¹⁻²",
      "d-block: Groups 3-12 in periodic table",
      "Properties intermediate between s and p block elements",
      "Show variable oxidation states",
      "Form colored compounds due to d-d transitions",
      "Paramagnetic due to unpaired electrons",
      "Good catalysts (variable oxidation states, surface area)",
      "High melting and boiling points (metallic bonding)",
      "Form complex compounds",
      "Alloy formation common"
    ],
    examples: [
      "3d series: Sc to Zn (21 to 30)",
      "4d series: Y to Cd (39 to 48)",
      "5d series: La, Hf to Hg (57, 72 to 80)",
      "Fe: [Ar] 3d⁶ 4s²",
      "Cu: [Ar] 3d¹⁰ 4s¹ (exception for stability)",
      "Cr: [Ar] 3d⁵ 4s¹ (half-filled stability)"
    ],
    formulas: [
      "Configuration: (n-1)d¹⁻¹⁰ ns⁰⁻²",
      "Zn, Cd, Hg: Not true transition elements (d¹⁰ configuration)",
      "Exceptions: Cr, Cu (half and fully filled d-orbital stability)"
    ]
  },
  {
    id: "oxidation-states",
    title: "Variable Oxidation States",
    description: "Transition metals exhibit multiple oxidation states due to similar energies of ns and (n-1)d electrons.",
    keyPoints: [
      "Both ns and (n-1)d electrons participate in bonding",
      "Small energy difference between ns and (n-1)d orbitals",
      "Maximum oxidation state = Group number (up to Mn: +7)",
      "Higher oxidation states more stable in oxides and fluorides",
      "Lower oxidation states stabilized by π-acceptor ligands like CO",
      "Most common oxidation state: +2 and +3",
      "Mn shows maximum oxidation states (+2 to +7)",
      "Stability of higher oxidation states decreases across period",
      "+2 state becomes more stable across 3d series"
    ],
    examples: [
      "Mn: +2, +3, +4, +6, +7 (KMnO₄: Mn is +7)",
      "Cr: +2, +3, +6 (K₂Cr₂O₇: Cr is +6)",
      "Fe: +2 (FeSO₄), +3 (Fe₂O₃), +6 (FeO₄²⁻)",
      "Cu: +1 (Cu₂O), +2 (CuSO₄)",
      "Ti: +2, +3, +4 (TiO₂: most stable)",
      "V: +2, +3, +4, +5 (V₂O₅: most stable)"
    ],
    formulas: [
      "Highest oxidation state trend: Sc(+3) to Mn(+7), then decreases",
      "Stability of +2: Mn²⁺ > Fe²⁺ > Co²⁺ > Ni²⁺ > Cu²⁺",
      "E° values increase across series for M²⁺/M couple"
    ]
  },
  {
    id: "magnetic-properties",
    title: "Magnetic Properties and Color",
    description: "Paramagnetism and color arise from unpaired d-electrons.",
    keyPoints: [
      "Paramagnetic: Substances with unpaired electrons (attracted by magnetic field)",
      "Diamagnetic: All electrons paired (weakly repelled)",
      "Magnetic moment (μ) = √[n(n+2)] BM, where n = unpaired electrons",
      "Color due to d-d transitions (electron excitation within d-orbitals)",
      "d⁰ and d¹⁰ ions are colorless (no d-d transition possible)",
      "Color depends on: metal, oxidation state, ligands",
      "Crystal field splitting causes color",
      "Intensity of color depends on number of unpaired electrons"
    ],
    examples: [
      "Cu²⁺ (d⁹): Blue color, paramagnetic",
      "Fe³⁺ (d⁵): Yellow-brown, paramagnetic",
      "Mn²⁺ (d⁵): Pale pink, paramagnetic",
      "Ti³⁺ (d¹): Purple color",
      "Sc³⁺ (d⁰): Colorless, diamagnetic",
      "Zn²⁺ (d¹⁰): Colorless, diamagnetic",
      "Cu⁺ (d¹⁰): Colorless compounds",
      "[Cu(H₂O)₆]²⁺: Blue; [Cu(NH₃)₄]²⁺: Deep blue"
    ],
    formulas: [
      "μ (spin-only) = √[n(n+2)] BM",
      "Fe²⁺ (d⁶): μ = √[4(6)] = 4.9 BM",
      "Cu²⁺ (d⁹): μ = √[1(3)] = 1.73 BM"
    ]
  },
  {
    id: "lanthanoid-contraction",
    title: "Lanthanoid Contraction",
    description: "Steady decrease in atomic and ionic radii of lanthanoids with increasing atomic number.",
    keyPoints: [
      "Lanthanoids: Ce (58) to Lu (71), 4f series",
      "Atomic/ionic radii decrease from Ce to Lu",
      "Caused by poor shielding of 4f electrons",
      "Nuclear charge increases but 4f electrons don't shield effectively",
      "Consequences: Similar properties of 2nd and 3rd transition series",
      "Zr and Hf have almost identical radii and properties",
      "Difficulty in separation of lanthanoids",
      "Variation in basic strength of hydroxides",
      "Affects properties of elements following lanthanoids"
    ],
    examples: [
      "Ionic radii: La³⁺ (1.06 Å) > Ce³⁺ (1.03 Å) > Lu³⁺ (0.85 Å)",
      "Zr (4d) and Hf (5d) have similar radii due to lanthanoid contraction",
      "Y³⁺ and Ho³⁺ have similar ionic radii",
      "Basicity: La(OH)₃ > Lu(OH)₃",
      "Density increases: La < Yb < Lu"
    ],
    formulas: [
      "Effective nuclear charge increases across lanthanoids",
      "Shielding effect of 4f << 3d",
      "Ionic radius decreases by ~0.2 Å from La³⁺ to Lu³⁺"
    ]
  },
  {
    id: "kmno4-preparation",
    title: "Potassium Permanganate (KMnO₄)",
    description: "Important compound of Mn in +7 oxidation state, strong oxidizing agent.",
    keyPoints: [
      "Purple colored crystalline solid",
      "Mn in +7 oxidation state (maximum)",
      "Powerful oxidizing agent in acidic, neutral, and basic medium",
      "Tetrahedral structure (MnO₄⁻ ion)",
      "Paramagnetic due to one unpaired electron in Mn",
      "Decomposes on heating: 2KMnO₄ → K₂MnO₄ + MnO₂ + O₂",
      "Self-indicator in redox titrations (pink to colorless)",
      "Used in analytical chemistry, disinfectant, bleaching"
    ],
    examples: [
      "Acidic medium: MnO₄⁻ → Mn²⁺ (colorless)",
      "Neutral/weakly basic: MnO₄⁻ → MnO₂ (brown ppt)",
      "Strongly basic: MnO₄⁻ → MnO₄²⁻ (green)",
      "Oxidizes FeSO₄: MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O",
      "Oxidizes oxalic acid: 2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O",
      "Baeyer's test: Oxidizes alkenes to diols"
    ],
    formulas: [
      "Preparation: 2MnO₂ + 4KOH + O₂ → 2K₂MnO₄ + 2H₂O",
      "Then: 3K₂MnO₄ + 2H₂O → 2KMnO₄ + MnO₂ + 4KOH",
      "Or by electrolytic oxidation: K₂MnO₄ → KMnO₄"
    ]
  },
  {
    id: "k2cr2o7-preparation",
    title: "Potassium Dichromate (K₂Cr₂O₇)",
    description: "Important compound of Cr in +6 oxidation state, strong oxidizing agent.",
    keyPoints: [
      "Orange-red crystalline solid",
      "Cr in +6 oxidation state",
      "Strong oxidizing agent in acidic medium",
      "Less soluble than K₂CrO₄ (chromate)",
      "Dichromate ⇌ Chromate equilibrium (pH dependent)",
      "Cr₂O₇²⁻ (acidic) ⇌ 2CrO₄²⁻ (basic)",
      "Reduced to green Cr³⁺ in acidic medium",
      "Used in leather tanning, pigments, chromium plating",
      "Carcinogenic, handle with care"
    ],
    examples: [
      "Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O (orange to green)",
      "Oxidizes alcohol: Ethanol → Acetaldehyde → Acetic acid",
      "Oxidizes FeSO₄: Cr₂O₇²⁻ + 6Fe²⁺ + 14H⁺ → 2Cr³⁺ + 6Fe³⁺ + 7H₂O",
      "Chromyl chloride test: 4NaCl + K₂Cr₂O₇ + 6H₂SO₄ → 2CrO₂Cl₂ (red vapors)",
      "pH < 7: Orange Cr₂O₇²⁻; pH > 7: Yellow CrO₄²⁻",
      "2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O"
    ],
    formulas: [
      "Preparation: 4FeCr₂O₄ + 8Na₂CO₃ + 7O₂ → 8Na₂CrO₄ + 2Fe₂O₃ + 8CO₂",
      "2Na₂CrO₄ + H₂SO₄ → Na₂Cr₂O₇ + Na₂SO₄ + H₂O",
      "Na₂Cr₂O₇ + 2KCl → K₂Cr₂O₇ + 2NaCl"
    ]
  },
  {
    id: "f-block-elements",
    title: "f-Block Elements (Lanthanoids and Actinoids)",
    description: "Elements with filling of 4f and 5f orbitals.",
    keyPoints: [
      "Lanthanoids: 4f series (Ce to Lu, 58-71)",
      "Actinoids: 5f series (Th to Lr, 90-103)",
      "All are metals with high reactivity",
      "Show +3 oxidation state predominantly",
      "Lanthanoids: 4f¹⁻¹⁴ 5d⁰⁻¹ 6s²",
      "Actinoids: 5f¹⁻¹⁴ 6d⁰⁻¹ 7s²",
      "Actinoids are radioactive",
      "Lanthanoids show lanthanoid contraction",
      "Actinoids show actinoid contraction (similar but less regular)",
      "Complex formation ability: Actinoids > Lanthanoids"
    ],
    examples: [
      "Lanthanoids: Ce, Pr, Nd, Pm, Sm, Eu, Gd, Tb, Dy, Ho, Er, Tm, Yb, Lu",
      "Actinoids: Th, Pa, U, Np, Pu, Am, Cm, Bk, Cf, Es, Fm, Md, No, Lr",
      "Ce⁴⁺: Colorless (4f⁰ configuration)",
      "Uranium: Used in nuclear reactors (²³⁵U)",
      "Thorium: Used in gas mantles",
      "Americium: Used in smoke detectors"
    ],
    formulas: [
      "Common oxidation state: +3 for both series",
      "Ce also shows +4 (4f⁰ stability)",
      "U shows +3, +4, +5, +6 (most common +6)"
    ]
  },
  {
    id: "catalytic-properties",
    title: "Catalytic Properties of Transition Metals",
    description: "Transition metals and their compounds act as excellent catalysts.",
    keyPoints: [
      "Variable oxidation states allow redox catalysis",
      "Large surface area for adsorption",
      "Form reaction intermediates with reactants",
      "d-orbitals can accept/donate electrons",
      "Provide alternative lower energy pathway",
      "Both heterogeneous and homogeneous catalysis",
      "Form unstable intermediate compounds",
      "Ability to form complexes enhances catalytic activity"
    ],
    examples: [
      "Fe: Haber process (N₂ + 3H₂ → 2NH₃)",
      "V₂O₅: Contact process (2SO₂ + O₂ → 2SO₃)",
      "Ni: Hydrogenation of oils (vegetable oil → vanaspati)",
      "Pt: Ostwald process (NH₃ → NO)",
      "MnO₂: Decomposition of H₂O₂ (2H₂O₂ → 2H₂O + O₂)",
      "TiCl₄ + Al(C₂H₅)₃: Ziegler-Natta catalyst for polymerization",
      "Pd: Hydrogenation reactions",
      "Pt-Rh: Catalytic converters (CO, NOₓ removal)"
    ],
    formulas: [
      "Heterogeneous: Catalyst in different phase from reactants",
      "Homogeneous: Catalyst in same phase as reactants",
      "Catalyst lowers activation energy"
    ]
  }
];



export function ChemistryChapter16() {
  // Fetch questions from database for Solutions (topicId: 51)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '51'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=51');
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
          <h1 className="text-4xl font-bold">Chapter 16: d- and f-Block Elements</h1>
          <p className="text-muted-foreground">Class XI-XII Chemistry - NEET Syllabus</p>
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
            Visualizations
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
                  <li>d-Block elements and their general properties</li>
                  <li>Electronic configuration and variable oxidation states</li>
                  <li>Magnetic properties and color in transition metals</li>
                  <li>Lanthanoid contraction and its consequences</li>
                  <li>Important compounds: KMnO₄, K₂Cr₂O₇</li>
                  <li>f-Block elements (Lanthanoids and Actinoids)</li>
                  <li>Catalytic properties of transition metals</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">d-Block</Badge>
                    <CardTitle className="text-lg">Transition Elements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Incomplete (n-1)d orbitals</p>
                    <p>• Variable oxidation states</p>
                    <p>• Colored compounds</p>
                    <p>• Paramagnetic</p>
                    <p>• Good catalysts</p>
                  </CardContent>
                </Card>

                <Card className="border-pink-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-pink-500">Important Compounds</Badge>
                    <CardTitle className="text-lg">KMnO₄ & K₂Cr₂O₇</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Strong oxidizing agents</p>
                    <p>• Color changes in reactions</p>
                    <p>• Used in redox titrations</p>
                    <p>• Different products in different pH</p>
                  </CardContent>
                </Card>

                <Card className="border-orange-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-orange-500">f-Block</Badge>
                    <CardTitle className="text-lg">Lanthanoids & Actinoids</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• 4f and 5f series</p>
                    <p>• Lanthanoid contraction</p>
                    <p>• Predominantly +3 state</p>
                    <p>• Actinoids are radioactive</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Key Properties Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold mb-2">Color Origin</p>
                      <p>✓ d-d transitions in partially filled d-orbitals</p>
                      <p>✓ d⁰ and d¹⁰ → Colorless</p>
                      <p>✓ d¹-d⁹ → Colored</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Magnetism</p>
                      <p>✓ Unpaired e⁻ → Paramagnetic</p>
                      <p>✓ All paired → Diamagnetic</p>
                      <p>✓ μ = √[n(n+2)] BM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter16Topics.map((topic, index) => (
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
                            Important Formulas & Trends
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
                        <h4 className="font-semibold mb-3">Examples & Reactions</h4>
                        <div className="space-y-2">
                          {topic.examples.map((example, i) => (
                            <div key={i} className="bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
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
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Visualizations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Oxidation States of 3d Series</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-purple-50 dark:bg-purple-950/20 rounded">
                        <span className="font-semibold">Sc</span>
                        <span>+3 only</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-purple-100 dark:bg-purple-900/20 rounded">
                        <span className="font-semibold">Ti</span>
                        <span>+2, +3, +4</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-purple-100 dark:bg-purple-900/20 rounded">
                        <span className="font-semibold">V</span>
                        <span>+2, +3, +4, +5</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-purple-200 dark:bg-purple-800/30 rounded">
                        <span className="font-semibold">Cr</span>
                        <span>+2, +3, +6</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-purple-300 dark:bg-purple-700/30 rounded">
                        <span className="font-semibold">Mn</span>
                        <span>+2 to +7 (max)</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-purple-200 dark:bg-purple-800/30 rounded">
                        <span className="font-semibold">Fe</span>
                        <span>+2, +3, +6</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-purple-100 dark:bg-purple-900/20 rounded">
                        <span className="font-semibold">Cu</span>
                        <span>+1, +2</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Color of Common Ions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 rounded">
                        <div className="w-12 h-12 rounded-full bg-blue-400"></div>
                        <div>
                          <p className="font-semibold">Cu²⁺ (d⁹)</p>
                          <p className="text-xs text-muted-foreground">Blue</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded">
                        <div className="w-12 h-12 rounded-full bg-green-300"></div>
                        <div>
                          <p className="font-semibold">Ni²⁺ (d⁸)</p>
                          <p className="text-xs text-muted-foreground">Green</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded">
                        <div className="w-12 h-12 rounded-full bg-yellow-600"></div>
                        <div>
                          <p className="font-semibold">Fe³⁺ (d⁵)</p>
                          <p className="text-xs text-muted-foreground">Yellow-brown</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded">
                        <div className="w-12 h-12 rounded-full bg-purple-400"></div>
                        <div>
                          <p className="font-semibold">MnO₄⁻</p>
                          <p className="text-xs text-muted-foreground">Purple</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded">
                        <div className="w-12 h-12 rounded-full bg-orange-500"></div>
                        <div>
                          <p className="font-semibold">Cr₂O₇²⁻</p>
                          <p className="text-xs text-muted-foreground">Orange</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardHeader>
                  <CardTitle>KMnO₄ Reactions in Different Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <Badge className="mb-2 bg-red-500">Acidic Medium</Badge>
                      <p className="font-semibold mt-3">MnO₄⁻ → Mn²⁺</p>
                      <p className="text-xs text-muted-foreground mt-1">Purple to Colorless</p>
                      <p className="text-xs font-mono mt-2">+7 → +2</p>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <Badge className="mb-2 bg-yellow-600">Neutral/Weak Basic</Badge>
                      <p className="font-semibold mt-3">MnO₄⁻ → MnO₂</p>
                      <p className="text-xs text-muted-foreground mt-1">Purple to Brown ppt</p>
                      <p className="text-xs font-mono mt-2">+7 → +4</p>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <Badge className="mb-2 bg-green-600">Strong Basic</Badge>
                      <p className="font-semibold mt-3">MnO₄⁻ → MnO₄²⁻</p>
                      <p className="text-xs text-muted-foreground mt-1">Purple to Green</p>
                      <p className="text-xs font-mono mt-2">+7 → +6</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lanthanoid Contraction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Steady decrease in atomic/ionic radii from La³⁺ to Lu³⁺ due to poor shielding of 4f electrons
                    </p>
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950/30 dark:to-purple-950/30 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="font-bold text-2xl">La³⁺</p>
                          <p className="text-sm">1.06 Å</p>
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                          <p className="text-center text-xs mt-1">Decreasing ionic radius →</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-2xl">Lu³⁺</p>
                          <p className="text-sm">0.85 Å</p>
                        </div>
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