
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThreeDViewer } from "@/components/ThreeDViewer";
import { BookOpen, Lightbulb, Calculator, Atom, Zap, TrendingUp , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter3Topics: Topic[] = [
  {
    id: "periodic-law",
    title: "Modern Periodic Law & Periodic Table",
    description: "Properties of elements are periodic functions of their atomic numbers.",
    keyPoints: [
      "Modern Periodic Law: Properties are periodic function of atomic number (not atomic mass)",
      "18 groups (vertical columns) and 7 periods (horizontal rows)",
      "s-block: Groups 1 & 2 (alkali & alkaline earth metals)",
      "p-block: Groups 13-18 (including noble gases)",
      "d-block: Groups 3-12 (transition metals)",
      "f-block: Lanthanides & Actinides (inner transition metals)",
      "Elements in same group have similar chemical properties"
    ],
    examples: [
      "Group 1: Li, Na, K, Rb, Cs, Fr (alkali metals)",
      "Group 17: F, Cl, Br, I, At (halogens)",
      "Group 18: He, Ne, Ar, Kr, Xe, Rn (noble gases)",
      "Period 2: Li, Be, B, C, N, O, F, Ne (8 elements)",
      "Transition metals: Sc to Zn (3d series)"
    ]
  },
  {
    id: "atomic-radius",
    title: "Atomic and Ionic Radii Trends",
    description: "Size of atoms and ions varies periodically across periods and groups.",
    keyPoints: [
      "Atomic radius: Half the distance between nuclei of two bonded atoms",
      "Across period (left to right): Atomic radius DECREASES",
      "Reason: Nuclear charge increases, pulling electrons closer",
      "Down a group: Atomic radius INCREASES",
      "Reason: New electron shells added, shielding effect increases",
      "Cation (M⁺) is smaller than parent atom (loses electrons)",
      "Anion (X⁻) is larger than parent atom (gains electrons)",
      "Isoelectronic species: More nuclear charge = smaller size"
    ],
    examples: [
      "Period 2: Li (152 pm) > Be (111 pm) > B (88 pm) > C (77 pm)",
      "Group 1: Li (152 pm) < Na (186 pm) < K (227 pm) < Rb (248 pm)",
      "Na (186 pm) > Na⁺ (102 pm) - cation smaller",
      "Cl (99 pm) < Cl⁻ (181 pm) - anion larger",
      "Isoelectronic: O²⁻ > F⁻ > Na⁺ > Mg²⁺ > Al³⁺ (all have 10 electrons)"
    ],
    formulas: [
      "Nuclear charge ∝ 1/radius (inverse relation)",
      "Shielding effect ∝ radius (direct relation)",
      "For isoelectronic species: radius ∝ 1/Z"
    ]
  },
  {
    id: "ionization-enthalpy",
    title: "Ionization Enthalpy (Ionization Energy)",
    description: "Energy required to remove an electron from gaseous atom.",
    keyPoints: [
      "Ionization enthalpy: M(g) → M⁺(g) + e⁻, ΔH = IE",
      "Across period: Ionization enthalpy INCREASES (left to right)",
      "Reason: Smaller size, higher nuclear charge, harder to remove electron",
      "Down a group: Ionization enthalpy DECREASES",
      "Reason: Larger size, shielding effect, easier to remove electron",
      "Exceptions: Group 2 > Group 13 (filled vs half-filled s subshell)",
      "Group 15 > Group 16 (half-filled vs beyond half-filled p subshell)",
      "Noble gases have highest ionization enthalpies",
      "Second IE > First IE (removing from cation is harder)"
    ],
    examples: [
      "Period 2: Li (520 kJ/mol) < Be (899) < B (801) < C (1086) < N (1402) < O (1314) < F (1681)",
      "Be > B exception: 2s² fully filled more stable than 2s²2p¹",
      "N > O exception: 2p³ half-filled more stable than 2p⁴",
      "Group 1: Li (520) > Na (496) > K (419) kJ/mol",
      "He has highest IE (2372 kJ/mol) - most stable configuration"
    ],
    formulas: [
      "IE₁ < IE₂ < IE₃ ... (successive ionization energies)",
      "IE ∝ Nuclear charge / Size²",
      "IE ∝ 1/Atomic radius"
    ]
  },
  {
    id: "electron-gain",
    title: "Electron Gain Enthalpy (Electron Affinity)",
    description: "Energy change when electron is added to gaseous atom.",
    keyPoints: [
      "Electron gain enthalpy: X(g) + e⁻ → X⁻(g), ΔH = EA",
      "Usually exothermic (negative ΔH), energy released",
      "Across period: EA becomes more negative (left to right)",
      "Reason: Smaller size, higher nuclear attraction for incoming electron",
      "Down a group: EA becomes less negative",
      "Reason: Larger size, less attraction for incoming electron",
      "Exception: F < Cl (fluorine anomaly due to small size, electron-electron repulsion)",
      "Noble gases have positive EA (very stable, don't accept electrons)",
      "Halogens have most negative EA (want to achieve noble gas configuration)"
    ],
    examples: [
      "Cl has most negative EA (-349 kJ/mol) - most reactive non-metal",
      "F (-328 kJ/mol) < Cl (-349) - fluorine anomaly",
      "Group 17: F (-328) < Cl (-349) > Br (-325) > I (-295)",
      "Noble gases: positive EA (unfavorable process)",
      "O (-141 kJ/mol) wants to gain 2 electrons to form O²⁻"
    ],
    formulas: [
      "EA ∝ Nuclear charge (more positive nucleus, more negative EA)",
      "EA ∝ 1/Atomic radius (smaller atom, more negative EA)",
      "More negative EA = more energy released = more stable anion"
    ]
  },
  {
    id: "electronegativity",
    title: "Electronegativity",
    description: "Tendency of atom to attract shared pair of electrons in a covalent bond.",
    keyPoints: [
      "Electronegativity: Ability to attract bonding electrons",
      "Pauling scale: Most common scale (0 to 4)",
      "Across period: Electronegativity INCREASES (left to right)",
      "Down a group: Electronegativity DECREASES",
      "Fluorine is most electronegative element (EN = 4.0)",
      "Francium is least electronegative (EN ≈ 0.7)",
      "Noble gases not assigned EN values (don't form bonds normally)",
      "EN difference determines bond type: <0.5 covalent, 0.5-1.7 polar covalent, >1.7 ionic"
    ],
    examples: [
      "F (4.0) > O (3.5) > N (3.0) > Cl (3.0) > C (2.5)",
      "Period 2: Li (1.0) < Be (1.5) < B (2.0) < C (2.5) < N (3.0) < O (3.5) < F (4.0)",
      "Group 17: F (4.0) > Cl (3.0) > Br (2.8) > I (2.5)",
      "HF bond: ΔEN = 4.0 - 2.1 = 1.9 (highly polar)",
      "NaCl: ΔEN = 3.0 - 0.9 = 2.1 (ionic bond)"
    ],
    formulas: [
      "EN ∝ Ionization Energy + Electron Affinity",
      "EN ∝ Nuclear charge / Atomic radius",
      "Bond polarity ∝ ΔEN (electronegativity difference)"
    ]
  },
  {
    id: "valency",
    title: "Valency and Oxidation States",
    description: "Combining capacity of elements varies periodically.",
    keyPoints: [
      "Valency: Number of electrons an atom can lose, gain, or share",
      "Across period: Valency increases 1 to 4, then decreases to 1",
      "With respect to H: Increases from 1 to 4 (LiH, CH₄)",
      "With respect to O: Increases from 1 to 7 (Na₂O, Cl₂O₇)",
      "Group number = Maximum valency (for representative elements)",
      "s-block: Valency = group number (Group 1: valency 1, Group 2: valency 2)",
      "p-block: Valency = group number - 10 OR 18 - group number",
      "Transition metals: Variable valency (multiple oxidation states)"
    ],
    examples: [
      "Period 3: Na(1), Mg(2), Al(3), Si(4), P(3,5), S(2,4,6), Cl(1,3,5,7)",
      "Group 1: All have valency 1 (Li⁺, Na⁺, K⁺)",
      "Group 17: Valency 1 (but oxidation states from -1 to +7)",
      "Carbon: valency 4 (forms CH₄, CO₂, CCl₄)",
      "Iron: Fe²⁺, Fe³⁺ (variable valency)"
    ]
  },
  {
    id: "metallic-character",
    title: "Metallic and Non-metallic Character",
    description: "Tendency to lose or gain electrons determines metallic/non-metallic nature.",
    keyPoints: [
      "Metallic character: Tendency to lose electrons and form cations",
      "Across period: Metallic character DECREASES (left to right)",
      "Down a group: Metallic character INCREASES",
      "Metals: Low IE, low EN, large size, form basic oxides",
      "Non-metals: High IE, high EN, small size, form acidic oxides",
      "Metalloids: Intermediate properties (B, Si, Ge, As, Sb, Te)",
      "Diagonal line separates metals from non-metals in periodic table",
      "Most reactive metal: Cs or Fr (Group 1, bottom)",
      "Most reactive non-metal: F (Group 17, top)"
    ],
    examples: [
      "Period 3: Na (metal) > Mg > Al > Si (metalloid) > P > S > Cl (non-metal)",
      "Group 1: Li < Na < K < Rb < Cs (metallic character increases)",
      "Oxides: Na₂O (basic) < MgO < Al₂O₃ (amphoteric) < SiO₂ < P₄O₁₀ < SO₃ < Cl₂O₇ (acidic)",
      "Cs is most reactive metal, F is most reactive non-metal"
    ]
  },
  {
    id: "chemical-reactivity",
    title: "Chemical Reactivity Trends",
    description: "Reactivity of elements varies based on their position in periodic table.",
    keyPoints: [
      "Alkali metals (Group 1): Reactivity increases down the group",
      "Reason: Lower ionization energy, easier to lose electron",
      "Halogens (Group 17): Reactivity decreases down the group",
      "Reason: Higher electron gain enthalpy at top, easier to gain electron",
      "Least reactive: Noble gases (Group 18) - stable octet configuration",
      "Most reactive metal: Cs (or Fr, but radioactive)",
      "Most reactive non-metal: F (highest electronegativity, smallest size)",
      "Reactivity in middle of period is generally lower"
    ],
    examples: [
      "Alkali metals: Li < Na < K < Rb < Cs (reactivity with water)",
      "Halogens: F > Cl > Br > I (reactivity, oxidizing power)",
      "F₂ + 2NaCl → 2NaF + Cl₂ (F displaces Cl)",
      "Cl₂ + 2NaBr → 2NaCl + Br₂ (Cl displaces Br)",
      "Noble gases: He, Ne, Ar don't react under normal conditions"
    ]
  }
];



export function ChemistryChapter3() {
  // Fetch questions from database for Electrochemistry (topicId: 6)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '6'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=6');
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
        <TrendingUp className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 3: Classification of Elements & Periodicity</h1>
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
            Trends
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
                  <li>Modern periodic law and periodic table structure</li>
                  <li>Atomic and ionic radii trends</li>
                  <li>Ionization enthalpy and electron gain enthalpy</li>
                  <li>Electronegativity and valency variations</li>
                  <li>Metallic and non-metallic character</li>
                  <li>Chemical reactivity trends</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Periodic Trends Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Across Period (→):</strong></p>
                    <p>• Size ↓, IE ↑, EA ↑ (more -ve)</p>
                    <p>• EN ↑, Metallic ↓</p>
                    <p><strong>Down Group (↓):</strong></p>
                    <p>• Size ↑, IE ↓, EA ↓ (less -ve)</p>
                    <p>• EN ↓, Metallic ↑</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Quick Tips</Badge>
                    <CardTitle className="text-lg">Common Exceptions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• IE: Be {'>'} B, N {'>'} O (stability)</p>
                    <p>• EA: F &lt; Cl (size effect)</p>
                    <p>• Isoelectronic: More Z = Smaller</p>
                    <p>• Noble gases: Highest IE, no EN</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Key Relationships
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Size:</strong> Cation &lt; Atom &lt; Anion</p>
                  <p><strong>IE:</strong> IE₁ &lt; IE₂ &lt; IE₃ (successive ionizations)</p>
                  <p><strong>EN:</strong> F (4.0) {'>'} O (3.5) {'>'} Cl,N (3.0) {'>'} Br (2.8)</p>
                  <p><strong>Reactivity:</strong> Alkali metals ↑ down, Halogens ↓ down</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter3Topics.map((topic, index) => (
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
                            Important Relations
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
              <CardTitle>Periodic Trends Visualization</CardTitle>
              <p className="text-sm text-muted-foreground">
                Understand how properties vary across the periodic table
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      Atomic Radius Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-950/20 rounded-lg">
                        <p className="text-sm font-semibold mb-2">Across Period →</p>
                        <div className="flex justify-center items-center gap-2">
                          <span className="text-2xl">●</span>
                          <span className="text-xl">●</span>
                          <span className="text-lg">●</span>
                          <span className="text-base">●</span>
                          <span className="text-sm">●</span>
                        </div>
                        <p className="text-xs mt-2 text-muted-foreground">DECREASES →</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-b from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-950/20 rounded-lg">
                        <p className="text-sm font-semibold mb-2">Down Group ↓</p>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm">●</span>
                          <span className="text-base">●</span>
                          <span className="text-lg">●</span>
                          <span className="text-xl">●</span>
                          <span className="text-2xl">●</span>
                        </div>
                        <p className="text-xs mt-2 text-muted-foreground">INCREASES ↓</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5 text-red-500" />
                      Ionization Energy Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-center p-4 bg-gradient-to-r from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-950/20 rounded-lg">
                        <p className="text-sm font-semibold mb-2">Across Period →</p>
                        <div className="flex justify-center items-end gap-2">
                          <div className="w-8 h-8 bg-red-300 dark:bg-red-700"></div>
                          <div className="w-8 h-12 bg-red-400 dark:bg-red-600"></div>
                          <div className="w-8 h-16 bg-red-500 dark:bg-red-500"></div>
                          <div className="w-8 h-20 bg-red-600 dark:bg-red-400"></div>
                        </div>
                        <p className="text-xs mt-2 text-muted-foreground">INCREASES →</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-b from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-950/20 rounded-lg">
                        <p className="text-sm font-semibold mb-2">Down Group ↓</p>
                        <div className="flex justify-center items-end gap-2">
                          <div className="w-8 h-20 bg-orange-600 dark:bg-orange-400"></div>
                          <div className="w-8 h-16 bg-orange-500 dark:bg-orange-500"></div>
                          <div className="w-8 h-12 bg-orange-400 dark:bg-orange-600"></div>
                          <div className="w-8 h-8 bg-orange-300 dark:bg-orange-700"></div>
                        </div>
                        <p className="text-xs mt-2 text-muted-foreground">DECREASES ↓</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardHeader>
                  <CardTitle>Electronegativity Scale (Pauling)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-500">
                      <p className="font-bold text-2xl text-purple-600">F</p>
                      <p className="text-sm text-muted-foreground">4.0</p>
                      <Badge className="mt-1 bg-purple-500">Highest</Badge>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="font-bold text-2xl text-blue-600">O</p>
                      <p className="text-sm text-muted-foreground">3.5</p>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="font-bold text-2xl text-green-600">Cl, N</p>
                      <p className="text-sm text-muted-foreground">3.0</p>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="font-bold text-2xl text-yellow-600">C</p>
                      <p className="text-sm text-muted-foreground">2.5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/20">
                <CardHeader>
                  <CardTitle>Isoelectronic Series Size Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center items-center gap-4 p-4">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-lg font-bold">O²⁻</div>
                      <p className="text-xs mt-2">Largest</p>
                      <p className="text-xs text-muted-foreground">Z = 8</p>
                    </div>
                    <span className="text-2xl">→</span>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center text-lg font-bold">F⁻</div>
                      <p className="text-xs mt-2">Z = 9</p>
                    </div>
                    <span className="text-2xl">→</span>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-yellow-200 dark:bg-yellow-800 flex items-center justify-center text-sm font-bold">Na⁺</div>
                      <p className="text-xs mt-2">Z = 11</p>
                    </div>
                    <span className="text-2xl">→</span>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-orange-200 dark:bg-orange-800 flex items-center justify-center text-sm font-bold">Mg²⁺</div>
                      <p className="text-xs mt-2">Z = 12</p>
                    </div>
                    <span className="text-2xl">→</span>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-red-200 dark:bg-red-800 flex items-center justify-center text-xs font-bold">Al³⁺</div>
                      <p className="text-xs mt-2">Smallest</p>
                      <p className="text-xs text-muted-foreground">Z = 13</p>
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-4">All have 10 electrons - More protons = Smaller size</p>
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
