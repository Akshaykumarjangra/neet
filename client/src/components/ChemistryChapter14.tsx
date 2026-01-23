
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThreeDViewer } from "@/components/ThreeDViewer";
import { BookOpen, Lightbulb, Calculator, Atom, Zap, TestTubes, Droplet , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter14Topics: Topic[] = [
  {
    id: "group1-alkali",
    title: "Group 1: Alkali Metals (Li, Na, K, Rb, Cs, Fr)",
    description: "Group 1 elements are highly reactive metals with ns¹ valence configuration.",
    keyPoints: [
      "Electronic configuration: [Noble gas] ns¹",
      "Largest atomic radius in their period",
      "Lowest ionization enthalpy among all elements in their period",
      "Strong reducing agents (easily lose electron)",
      "Form M⁺ ions exclusively",
      "Soft metals, low melting/boiling points",
      "React vigorously with water: 2M + 2H₂O → 2MOH + H₂",
      "Reactivity increases down the group (Cs > Rb > K > Na > Li)",
      "Impart characteristic flame colors"
    ],
    examples: [
      "Li: Crimson red flame, lightest metal",
      "Na: Golden yellow flame, highly reactive",
      "K: Lilac flame, reacts violently with water",
      "Cs: Blue flame, most reactive alkali metal",
      "2Na + Cl₂ → 2NaCl (vigorous reaction)"
    ],
    formulas: [
      "Ionization energy: Li > Na > K > Rb > Cs",
      "Atomic radius: Li < Na < K < Rb < Cs",
      "Reducing power: Li < Na < K < Rb < Cs",
      "Hydration energy: Li⁺ > Na⁺ > K⁺ > Rb⁺ > Cs⁺"
    ]
  },
  {
    id: "lithium-anomaly",
    title: "Anomalous Properties of Lithium",
    description: "Lithium shows different behavior from other alkali metals due to its small size and high charge density.",
    keyPoints: [
      "Smallest atomic and ionic radius in Group 1",
      "Highest ionization enthalpy in Group 1",
      "Hardest alkali metal, highest melting point",
      "Only alkali metal to form nitride: 6Li + N₂ → 2Li₃N",
      "Li₂CO₃ decomposes on heating (others stable)",
      "LiOH less soluble than other alkali metal hydroxides",
      "Strong polarizing power (high charge density)",
      "Forms covalent compounds (e.g., LiCl has covalent character)",
      "Diagonal relationship with Mg"
    ],
    examples: [
      "Li₂CO₃ → Li₂O + CO₂ (on heating, unlike Na₂CO₃)",
      "LiCl is soluble in organic solvents (covalent nature)",
      "Li forms Li₃N directly, others don't",
      "Li resembles Mg more than Na"
    ],
    formulas: [
      "Charge density = Charge/Radius",
      "Li⁺ has highest charge density in Group 1",
      "Higher charge density → stronger polarization"
    ]
  },
  {
    id: "group2-alkaline",
    title: "Group 2: Alkaline Earth Metals (Be, Mg, Ca, Sr, Ba, Ra)",
    description: "Group 2 elements have ns² valence configuration and form M²⁺ ions.",
    keyPoints: [
      "Electronic configuration: [Noble gas] ns²",
      "Form M²⁺ ions by losing 2 valence electrons",
      "Higher ionization enthalpy than Group 1 (but lower than Group 13)",
      "Harder and denser than alkali metals",
      "Higher melting/boiling points than Group 1",
      "Less reactive than alkali metals",
      "React with water (reactivity increases down group)",
      "Reducing agents (but weaker than Group 1)",
      "Form basic oxides and hydroxides"
    ],
    examples: [
      "Be doesn't react with water even at high temperature",
      "Mg reacts with hot water: Mg + 2H₂O → Mg(OH)₂ + H₂",
      "Ca reacts readily with cold water",
      "Ba and Sr react violently with water",
      "Ca + Cl₂ → CaCl₂"
    ],
    formulas: [
      "Ionization energy: Be > Mg > Ca > Sr > Ba",
      "Atomic radius: Be < Mg < Ca < Sr < Ba",
      "Reactivity: Be < Mg < Ca < Sr < Ba",
      "Basic character of oxides: BeO < MgO < CaO < SrO < BaO"
    ]
  },
  {
    id: "beryllium-anomaly",
    title: "Anomalous Properties of Beryllium",
    description: "Beryllium differs significantly from other alkaline earth metals.",
    keyPoints: [
      "Smallest atomic and ionic radius in Group 2",
      "Highest ionization enthalpy in Group 2",
      "Doesn't react with water even at high temperature",
      "BeO and Be(OH)₂ are amphoteric (not purely basic)",
      "Forms covalent compounds (high polarizing power)",
      "BeCl₂ has covalent character, forms polymeric structure",
      "Doesn't form complexes with water (others do)",
      "Be²⁺ has maximum hydration enthalpy",
      "Diagonal relationship with Al"
    ],
    examples: [
      "BeO + 2HCl → BeCl₂ + H₂O (acidic behavior)",
      "BeO + 2NaOH → Na₂BeO₂ + H₂O (basic behavior)",
      "BeCl₂ forms polymeric chains (covalent)",
      "Be resembles Al more than Mg"
    ],
    formulas: [
      "Be²⁺ radius ≈ 0.31 Å (very small)",
      "Charge/radius ratio is highest in Group 2",
      "Higher polarizing power → covalent character"
    ]
  },
  {
    id: "important-compounds-group1",
    title: "Important Compounds of Group 1",
    description: "Industrially and biologically important alkali metal compounds.",
    keyPoints: [
      "NaOH (Caustic soda): Strong base, used in soap making",
      "Na₂CO₃ (Soda ash/Washing soda): Used in glass, detergents",
      "NaHCO₃ (Baking soda): Mild base, used in baking, antacid",
      "NaCl (Common salt): Source of sodium compounds",
      "KOH (Caustic potash): Strong base, used in alkaline batteries",
      "K₂CO₃ (Potash): Used in glass, soap manufacturing"
    ],
    examples: [
      "Chlor-alkali process: 2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂",
      "Solvay process: NaCl + NH₃ + CO₂ + H₂O → NaHCO₃ + NH₄Cl",
      "2NaHCO₃ → Na₂CO₃ + H₂O + CO₂ (on heating)",
      "Na₂CO₃·10H₂O is washing soda (decahydrate)"
    ],
    formulas: [
      "NaOH preparation: electrolysis of brine",
      "Na₂CO₃ from NaHCO₃: heating removes CO₂ and H₂O",
      "pH of NaOH solution > 13 (strong base)"
    ]
  },
  {
    id: "important-compounds-group2",
    title: "Important Compounds of Group 2",
    description: "Key alkaline earth metal compounds and their applications.",
    keyPoints: [
      "CaO (Quick lime): Basic oxide, used in cement, plaster",
      "Ca(OH)₂ (Slaked lime): Used in whitewash, mortar",
      "CaCO₃ (Limestone): Found in nature, used in cement",
      "CaSO₄·2H₂O (Gypsum): Used in plaster of Paris",
      "CaSO₄·½H₂O (Plaster of Paris): Sets to form hard mass",
      "Mg(OH)₂ (Milk of magnesia): Antacid",
      "MgSO₄·7H₂O (Epsom salt): Laxative"
    ],
    examples: [
      "CaO + H₂O → Ca(OH)₂ (slaking of lime, exothermic)",
      "Ca(OH)₂ + CO₂ → CaCO₃ + H₂O (used in whitewash)",
      "CaCO₃ → CaO + CO₂ (thermal decomposition at 1200K)",
      "CaSO₄·2H₂O → CaSO₄·½H₂O + 1.5H₂O (heating to 393K)",
      "2(CaSO₄·½H₂O) + 3H₂O → 2(CaSO₄·2H₂O) (setting of POP)"
    ],
    formulas: [
      "Cement composition: CaO (60-67%), SiO₂ (17-25%), Al₂O₃, Fe₂O₃",
      "Portland cement main components: 3CaO·SiO₂, 2CaO·SiO₂, 3CaO·Al₂O₃"
    ]
  },
  {
    id: "biological-importance",
    title: "Biological Importance of s-Block Elements",
    description: "Essential roles of alkali and alkaline earth metals in biological systems.",
    keyPoints: [
      "Na⁺ and K⁺: Maintain electrolyte balance, nerve impulse transmission",
      "Na⁺-K⁺ pump: Active transport across cell membranes",
      "Ca²⁺: Bone formation, muscle contraction, blood clotting",
      "Mg²⁺: Component of chlorophyll, enzyme activator",
      "Li: Used in treatment of bipolar disorder (lithium carbonate)",
      "Na-K balance crucial for osmotic pressure regulation",
      "Ca²⁺ acts as second messenger in cell signaling"
    ],
    examples: [
      "Hydroxyapatite [Ca₁₀(PO₄)₆(OH)₂] in bones and teeth",
      "Chlorophyll contains Mg²⁺ at center of porphyrin ring",
      "Na⁺ higher outside cells, K⁺ higher inside cells",
      "Ca²⁺ deficiency → weak bones (osteoporosis)",
      "Mg²⁺ deficiency → muscle cramps, irregular heartbeat"
    ],
    formulas: [
      "Na⁺-K⁺ ATPase: pumps 3 Na⁺ out, 2 K⁺ in per ATP",
      "Normal blood Ca²⁺: 9-11 mg/dL",
      "Chlorophyll: C₅₅H₇₂MgN₄O₅"
    ]
  },
  {
    id: "diagonal-relationship",
    title: "Diagonal Relationship",
    description: "Similarities between elements diagonally placed in periodic table.",
    keyPoints: [
      "Li resembles Mg (Group 2, 2nd period)",
      "Be resembles Al (Group 13, 3rd period)",
      "Reason: Similar charge/radius ratio (polarizing power)",
      "Similar electronegativity values",
      "Li and Mg both form covalent organometallic compounds",
      "Both Li and Mg form nitrides directly",
      "Be and Al both form amphoteric oxides",
      "BeO and Al₂O₃ both dissolve in acids and bases"
    ],
    examples: [
      "LiCl and MgCl₂ both soluble in ethanol (covalent)",
      "Li₂CO₃ and MgCO₃ both decompose on heating",
      "BeO and Al₂O₃ are both amphoteric",
      "Be and Al both form protective oxide layers",
      "Li and Mg salts crystallize with water of crystallization"
    ],
    formulas: [
      "Li⁺/Be²⁺ small size → high charge density → polarizing power",
      "Similar ionic potential (charge/radius) → similar properties"
    ]
  }
];



export function ChemistryChapter14() {
  // Fetch questions from database for Environmental Chemistry (topicId: 49)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '49'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=49');
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
        <Droplet className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 14: s-Block Elements (Group 1 & 2)</h1>
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
                  <li>Alkali metals (Group 1) - properties and trends</li>
                  <li>Alkaline earth metals (Group 2) - characteristics</li>
                  <li>Anomalous behavior of Li and Be</li>
                  <li>Diagonal relationship (Li-Mg, Be-Al)</li>
                  <li>Important compounds: NaOH, Na₂CO₃, CaO, Ca(OH)₂, Gypsum, POP</li>
                  <li>Biological importance of Na, K, Ca, Mg</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-blue-500">Group 1</Badge>
                    <CardTitle className="text-lg">Alkali Metals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Configuration:</strong> [Noble gas] ns¹</p>
                    <p><strong>Key properties:</strong></p>
                    <p>• Largest atomic radius in period</p>
                    <p>• Lowest IE₁ in period</p>
                    <p>• Strong reducing agents</p>
                    <p>• Form M⁺ ions only</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-green-500">Group 2</Badge>
                    <CardTitle className="text-lg">Alkaline Earth Metals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Configuration:</strong> [Noble gas] ns²</p>
                    <p><strong>Key properties:</strong></p>
                    <p>• Smaller than Group 1 in same period</p>
                    <p>• Higher IE than Group 1</p>
                    <p>• Form M²⁺ ions</p>
                    <p>• Less reactive than Group 1</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Important Trends
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold mb-2">Down the Group ↓</p>
                      <p>✓ Atomic radius increases</p>
                      <p>✓ IE decreases</p>
                      <p>✓ Reactivity increases</p>
                      <p>✓ Metallic character increases</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Across Period →</p>
                      <p>✓ Group 1 {'>'} Group 2 (atomic radius)</p>
                      <p>✓ Group 1 &lt; Group 2 (IE)</p>
                      <p>✓ Group 1 {'>'} Group 2 (reactivity)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter14Topics.map((topic, index) => (
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
                            Important Trends & Formulas
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
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Visualizations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Reactivity Trend - Group 1</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-center font-bold">Li</div>
                        <div className="flex-1 bg-blue-200 dark:bg-blue-800 h-6 rounded" style={{width: '40%'}}></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-center font-bold">Na</div>
                        <div className="flex-1 bg-blue-300 dark:bg-blue-700 h-6 rounded" style={{width: '60%'}}></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-center font-bold">K</div>
                        <div className="flex-1 bg-blue-400 dark:bg-blue-600 h-6 rounded" style={{width: '80%'}}></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-center font-bold">Cs</div>
                        <div className="flex-1 bg-blue-500 dark:bg-blue-500 h-6 rounded" style={{width: '100%'}}></div>
                      </div>
                      <p className="text-xs text-center text-muted-foreground mt-3">Reactivity increases down the group</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Ionization Energy Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-center font-bold">Li</div>
                        <div className="flex-1 bg-green-500 dark:bg-green-500 h-6 rounded" style={{width: '100%'}}></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-center font-bold">Na</div>
                        <div className="flex-1 bg-green-400 dark:bg-green-600 h-6 rounded" style={{width: '75%'}}></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-center font-bold">K</div>
                        <div className="flex-1 bg-green-300 dark:bg-green-700 h-6 rounded" style={{width: '60%'}}></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-center font-bold">Cs</div>
                        <div className="flex-1 bg-green-200 dark:bg-green-800 h-6 rounded" style={{width: '45%'}}></div>
                      </div>
                      <p className="text-xs text-center text-muted-foreground mt-3">IE decreases down the group</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
                <CardHeader>
                  <CardTitle>Flame Colors of Alkali & Alkaline Earth Metals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="w-16 h-16 mx-auto rounded-full bg-red-600 mb-2"></div>
                      <p className="font-semibold">Li</p>
                      <p className="text-xs text-muted-foreground">Crimson Red</p>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="w-16 h-16 mx-auto rounded-full bg-yellow-400 mb-2"></div>
                      <p className="font-semibold">Na</p>
                      <p className="text-xs text-muted-foreground">Golden Yellow</p>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="w-16 h-16 mx-auto rounded-full bg-purple-400 mb-2"></div>
                      <p className="font-semibold">K</p>
                      <p className="text-xs text-muted-foreground">Lilac/Violet</p>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="w-16 h-16 mx-auto rounded-full bg-orange-500 mb-2"></div>
                      <p className="font-semibold">Ca</p>
                      <p className="text-xs text-muted-foreground">Brick Red</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Important Industrial Processes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold mb-2">Chlor-Alkali Process (NaOH production)</h4>
                    <p className="text-sm font-mono mb-2">2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂</p>
                    <p className="text-sm text-muted-foreground">Electrolysis of brine produces caustic soda, chlorine, and hydrogen</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold mb-2">Solvay Process (Na₂CO₃ production)</h4>
                    <p className="text-sm font-mono mb-2">NaCl + NH₃ + CO₂ + H₂O → NaHCO₃ + NH₄Cl</p>
                    <p className="text-sm text-muted-foreground">Ammonia-soda process for manufacturing sodium carbonate</p>
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
