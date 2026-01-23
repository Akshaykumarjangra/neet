
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

const chapter15Topics: Topic[] = [
  {
    id: "group13-boron",
    title: "Group 13: Boron Family (B, Al, Ga, In, Tl)",
    description: "Group 13 elements have ns² np¹ valence configuration and show +1 and +3 oxidation states.",
    keyPoints: [
      "Electronic configuration: [Noble gas] ns² np¹",
      "Oxidation states: +3 (common), +1 (inert pair effect increases down group)",
      "Boron: Only non-metal in group, forms covalent compounds",
      "Atomic radius increases down group, but Ga < Al (d-block contraction)",
      "Ionization energy decreases down group",
      "Boron forms electron-deficient compounds (BH₃, BF₃)",
      "Lewis acids: Accept electron pairs (BF₃ + NH₃ → F₃B-NH₃)",
      "Diagonal relationship: B and Si",
      "Inert pair effect: Tl shows +1 more stable than +3"
    ],
    examples: [
      "Borax: Na₂B₄O₇·10H₂O (cleaning agent, glass making)",
      "Boric acid: B(OH)₃ (weak monobasic acid, antiseptic)",
      "Diborane: B₂H₆ (banana bonds, electron-deficient)",
      "Alums: K₂SO₄·Al₂(SO₄)₃·24H₂O (water purification)",
      "Anhydrous AlCl₃: Friedel-Crafts catalyst"
    ],
    formulas: [
      "Ionization energy: B > Al > Ga > In > Tl",
      "Stability of +1 state: Tl > In > Ga > Al > B",
      "Lewis acid strength: BF₃ > BCl₃ > BBr₃ > BI₃"
    ]
  },
  {
    id: "group14-carbon",
    title: "Group 14: Carbon Family (C, Si, Ge, Sn, Pb)",
    description: "Group 14 elements show diverse properties from non-metal to metal.",
    keyPoints: [
      "Electronic configuration: [Noble gas] ns² np²",
      "Oxidation states: +4, +2 (inert pair effect for Pb)",
      "Carbon: Unique catenation ability, forms millions of compounds",
      "Allotropes: Diamond (sp³, hardest), Graphite (sp², conductor), Fullerene (C₆₀)",
      "Silicon: Second most abundant element, semiconductor",
      "Germanium: Semiconductor, used in transistors",
      "Tin and Lead: Metals, Pb²⁺ more stable than Pb⁴⁺",
      "CO: Toxic, neutral oxide; CO₂: Acidic oxide (greenhouse gas)",
      "Silicones: (R₂SiO)ₙ polymers, water repellent"
    ],
    examples: [
      "Diamond: 3D network, sp³, hardest natural substance",
      "Graphite: Layered structure, sp², good conductor",
      "CO₂ + H₂O → H₂CO₃ (carbonic acid)",
      "SiO₂: Quartz, silica gel, glass (network solid)",
      "CCl₄: Non-polar, used as solvent (now banned)",
      "Silicones: Used in lubricants, sealants, implants"
    ],
    formulas: [
      "Diamond: Each C bonded to 4 C atoms tetrahedrally",
      "Graphite: Hexagonal layers, C-C distance 1.42 Å within layer",
      "SiO₂: Network covalent, very high melting point"
    ]
  },
  {
    id: "group15-nitrogen",
    title: "Group 15: Nitrogen Family (N, P, As, Sb, Bi)",
    description: "Group 15 elements (pnictogens) have ns² np³ configuration.",
    keyPoints: [
      "Electronic configuration: [Noble gas] ns² np³",
      "Oxidation states: -3, +3, +5 (N doesn't show +5 due to no d-orbitals)",
      "Nitrogen: Diatomic gas (N≡N), very stable triple bond",
      "Phosphorus allotropes: White P₄ (reactive), Red P (stable), Black P",
      "Metallic character increases down group (N, P non-metals; Bi metal)",
      "Ammonia: NH₃ (Haber process), weak base, pyramidal shape",
      "Nitric acid: HNO₃ (Ostwald process), strong acid, oxidizing agent",
      "Phosphoric acid: H₃PO₄ (tribasic), used in fertilizers",
      "NOₓ gases: Air pollutants, acid rain formation"
    ],
    examples: [
      "Haber process: N₂ + 3H₂ ⇌ 2NH₃ (Fe catalyst, high P, T)",
      "Ostwald process: 4NH₃ + 5O₂ → 4NO + 6H₂O (Pt catalyst)",
      "2NO + O₂ → 2NO₂ (brown gas)",
      "3NO₂ + H₂O → 2HNO₃ + NO",
      "White phosphorus: P₄, tetrahedral, highly reactive, poisonous",
      "PCl₅ ⇌ PCl₃ + Cl₂ (thermal decomposition)"
    ],
    formulas: [
      "NH₃: sp³ hybridization, pyramidal, bond angle 107°",
      "N₂O₃: Acidic oxide (N₂O₃ + H₂O → 2HNO₂)",
      "P₄O₁₀: Most acidic oxide (P₄O₁₀ + 6H₂O → 4H₃PO₄)"
    ]
  },
  {
    id: "group16-oxygen",
    title: "Group 16: Oxygen Family (O, S, Se, Te, Po)",
    description: "Group 16 elements (chalcogens) have ns² np⁴ configuration.",
    keyPoints: [
      "Electronic configuration: [Noble gas] ns² np⁴",
      "Oxidation states: -2 (most common), +4, +6",
      "Oxygen: Most abundant element, diatomic O₂, paramagnetic",
      "Ozone: O₃, bent shape, shields UV radiation, oxidizing agent",
      "Sulfur allotropes: Rhombic S₈ (yellow), Monoclinic S₈",
      "H₂SO₄: King of chemicals, dehydrating agent, Contact process",
      "SO₂: Acidic oxide, bleaching agent, preservative",
      "Metallic character increases down group",
      "Oxygen doesn't show +6 (no d-orbitals), S shows up to +6"
    ],
    examples: [
      "O₃ formation: 3O₂ → 2O₃ (UV radiation)",
      "Contact process: 2SO₂ + O₂ → 2SO₃ (V₂O₅ catalyst)",
      "SO₃ + H₂O → H₂SO₄ (oleum route)",
      "H₂S: Rotten egg smell, weak dibasic acid, reducing agent",
      "SO₂ + Cl₂ + 2H₂O → H₂SO₄ + 2HCl (bleaching)",
      "H₂SO₄: Dehydrates sugar (C₁₂H₂₂O₁₁ → 12C + 11H₂O)"
    ],
    formulas: [
      "O₃: sp² hybridization, bent, bond angle 117°",
      "SO₂: sp² hybridization, V-shaped, bond angle 119.5°",
      "H₂SO₄: Dibasic acid, two ionizable H atoms"
    ]
  },
  {
    id: "group17-halogens",
    title: "Group 17: Halogens (F, Cl, Br, I, At)",
    description: "Most reactive non-metals with ns² np⁵ configuration.",
    keyPoints: [
      "Electronic configuration: [Noble gas] ns² np⁵",
      "Oxidation states: -1 (most common), +1, +3, +5, +7 (except F)",
      "Fluorine: Most electronegative, most reactive, only -1 state",
      "Colors: F₂ (pale yellow), Cl₂ (greenish yellow), Br₂ (red-brown), I₂ (violet)",
      "Reactivity: F > Cl > Br > I (oxidizing power decreases)",
      "Displacement: More reactive displaces less reactive",
      "Interhalogens: XYₙ where n = 1, 3, 5, 7 (ClF₃, BrF₅, IF₇)",
      "HCl, HBr, HI: Strong acids; HF: Weak acid (H-bonding)",
      "Bleaching powder: Ca(OCl)₂·CaCl₂·Ca(OH)₂·2H₂O"
    ],
    examples: [
      "F₂ + H₂ → 2HF (explosive even in dark)",
      "Cl₂ + 2KBr → 2KCl + Br₂ (displacement)",
      "Cl₂ + 2NaOH → NaCl + NaOCl + H₂O (cold, dilute)",
      "3Cl₂ + 6NaOH → 5NaCl + NaClO₃ + 3H₂O (hot, conc.)",
      "Bleaching: Cl₂ + H₂O → HCl + HOCl (HOCl oxidizes)",
      "HF etches glass: 4HF + SiO₂ → SiF₄ + 2H₂O"
    ],
    formulas: [
      "Electron affinity: Cl > F > Br > I (F is anomalous)",
      "Bond energy: Cl-Cl > Br-Br > F-F > I-I (F is anomalous)",
      "Acidity: HI > HBr > HCl > HF (bond strength decreases)"
    ]
  },
  {
    id: "group18-noble",
    title: "Group 18: Noble Gases (He, Ne, Ar, Kr, Xe, Rn)",
    description: "Inert gases with complete octet configuration.",
    keyPoints: [
      "Electronic configuration: ns² np⁶ (He: 1s²)",
      "Chemically inert due to stable octet (complete valence shell)",
      "Monoatomic gases, colorless, odorless",
      "Low boiling points (increase down group)",
      "Noble gas compounds: Xe forms compounds (XeF₂, XeF₄, XeF₆, XeO₃)",
      "Kr forms KrF₂; Rn is radioactive",
      "He, Ne, Ar: No known stable compounds",
      "Uses: He (balloons, cryogenics), Ne (signs), Ar (inert atmosphere)",
      "Xe compounds: Powerful fluorinating and oxidizing agents"
    ],
    examples: [
      "XeF₂: Linear (sp³d hybridization)",
      "XeF₄: Square planar (sp³d² hybridization)",
      "XeF₆: Distorted octahedral (sp³d³ hybridization)",
      "XeO₃: Pyramidal, explosive",
      "He: Used in diving gas mixtures (less soluble than N₂)",
      "Rn: Radioactive, from Ra decay, health hazard"
    ],
    formulas: [
      "Boiling point: He < Ne < Ar < Kr < Xe < Rn",
      "Xe + F₂ → XeF₂ (200°C, 1:1 ratio)",
      "Xe + 2F₂ → XeF₄ (400°C, 1:5 ratio, Ni vessel)"
    ]
  },
  {
    id: "oxoacids-comparison",
    title: "Oxoacids and Their Properties",
    description: "Comparison of oxoacids of p-block elements.",
    keyPoints: [
      "Acidity order of N oxoacids: HNO₃ > HNO₂ > H₃NO₂ (hyponitrous)",
      "Phosphorus oxoacids: H₃PO₂ (monobasic), H₃PO₃ (dibasic), H₃PO₄ (tribasic)",
      "Only H atoms attached to O are acidic (not P-H)",
      "Acidity of halogen oxoacids: HClO₄ > HClO₃ > HClO₂ > HClO",
      "For same halogen: Higher oxidation state = stronger acid",
      "For same oxidation state: HClO₄ > HBrO₄ > HIO₄",
      "Basicity determined by number of OH groups",
      "Reducing character: H₃PO₂ > H₃PO₃ (presence of P-H bonds)"
    ],
    examples: [
      "H₃PO₂: One OH, two P-H (monobasic, reducing agent)",
      "H₃PO₃: Two OH, one P-H (dibasic, reducing)",
      "H₃PO₄: Three OH (tribasic, not reducing)",
      "HClO₄: Perchloric acid, strongest oxoacid",
      "H₂SO₄ vs H₂SO₃: H₂SO₄ stronger (higher oxidation state)",
      "HNO₃: Strong acid, powerful oxidizing agent"
    ],
    formulas: [
      "Basicity = Number of ionizable H (attached to O)",
      "Acid strength ∝ Oxidation state of central atom",
      "Acid strength ∝ Electronegativity of central atom"
    ]
  },
  {
    id: "important-compounds",
    title: "Important p-Block Compounds & Industrial Processes",
    description: "Key compounds and their manufacturing processes.",
    keyPoints: [
      "Ammonia (Haber): N₂ + 3H₂ ⇌ 2NH₃ (Fe, 450-500°C, 200 atm)",
      "Nitric acid (Ostwald): NH₃ → NO → NO₂ → HNO₃",
      "Sulfuric acid (Contact): S → SO₂ → SO₃ → H₂SO₄ (V₂O₅ catalyst)",
      "Chlorine: Electrolysis of brine (chlor-alkali process)",
      "NaOH production: Chlor-alkali as byproduct",
      "Bleaching powder: Ca(OH)₂ + Cl₂",
      "Fertilizers: NH₃, (NH₄)₂SO₄, NH₄NO₃, urea",
      "Glass: SiO₂ + Na₂CO₃ + CaCO₃ (fused)",
      "Cement: CaO, SiO₂, Al₂O₃, Fe₂O₃"
    ],
    examples: [
      "Haber: Optimum yield at moderate T, high P, Fe catalyst",
      "Contact: V₂O₅ at 450°C, SO₃ dissolved in H₂SO₄ (oleum)",
      "Chlor-alkali: 2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂",
      "Fertilizer NPK: Contains N, P₂O₅, K₂O",
      "Urea: 2NH₃ + CO₂ → NH₂CONH₂ + H₂O (high P, T)",
      "Superphosphate: Ca₃(PO₄)₂ + 2H₂SO₄ → soluble phosphate"
    ],
    formulas: [
      "Haber equilibrium shifts right at high P, low T",
      "Contact process yield: ~98% with V₂O₅",
      "NPK ratio examples: 15-15-15, 20-20-0"
    ]
  }
];



export function ChemistryChapter15() {
  // Fetch questions from database for Solid State (topicId: 50)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '50'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=50');
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
        <TestTubes className="h-8 w-8 text-indigo-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 15: p-Block Elements</h1>
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
                  <li>Group 13-18 elements (B to Rn family)</li>
                  <li>Allotropes: Diamond, Graphite, Fullerene, Phosphorus forms</li>
                  <li>Important compounds: NH₃, HNO₃, H₂SO₄, Halogens</li>
                  <li>Industrial processes: Haber, Ostwald, Contact process</li>
                  <li>Noble gases and their compounds</li>
                  <li>Oxoacids and their properties</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-blue-500">Group 13-14</Badge>
                    <CardTitle className="text-lg">Boron & Carbon Family</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• B: Non-metal, electron-deficient</p>
                    <p>• Al: Amphoteric metal</p>
                    <p>• C: Allotropes, catenation</p>
                    <p>• Si: Semiconductor, silicones</p>
                    <p>• Inert pair effect in Tl, Pb</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-green-500">Group 15-16</Badge>
                    <CardTitle className="text-lg">Nitrogen & Oxygen Family</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• N₂: Triple bond, Haber process</p>
                    <p>• P: White (P₄), Red allotropes</p>
                    <p>• O₂: Paramagnetic, O₃: Ozone layer</p>
                    <p>• S: Rhombic, Contact process</p>
                    <p>• Oxoacids of N, P, S</p>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">Group 17-18</Badge>
                    <CardTitle className="text-lg">Halogens & Noble Gases</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• F: Most reactive, only -1 state</p>
                    <p>• Cl₂: Greenish, bleaching agent</p>
                    <p>• Interhalogens: ClF₃, IF₇</p>
                    <p>• Noble gases: Inert, Xe compounds</p>
                    <p>• XeF₂, XeF₄, XeF₆</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Key Industrial Processes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="font-semibold mb-1">Haber Process</p>
                      <p className="font-mono text-xs">N₂ + 3H₂ ⇌ 2NH₃</p>
                      <p className="text-muted-foreground text-xs">Fe, 450°C, 200 atm</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Contact Process</p>
                      <p className="font-mono text-xs">2SO₂ + O₂ → 2SO₃</p>
                      <p className="text-muted-foreground text-xs">V₂O₅, 450°C</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Ostwald Process</p>
                      <p className="font-mono text-xs">NH₃ → NO → HNO₃</p>
                      <p className="text-muted-foreground text-xs">Pt catalyst</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter15Topics.map((topic, index) => (
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
                              <span className="text-indigo-500 mt-1">•</span>
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
                            <div key={i} className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg border border-indigo-200 dark:border-indigo-800">
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
                    <CardTitle className="text-lg">Halogen Reactivity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-center font-bold text-yellow-300">F₂</div>
                        <div className="flex-1 bg-yellow-300 dark:bg-yellow-600 h-6 rounded" style={{width: '100%'}}></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-center font-bold text-green-500">Cl₂</div>
                        <div className="flex-1 bg-green-500 dark:bg-green-600 h-6 rounded" style={{width: '80%'}}></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-center font-bold text-red-600">Br₂</div>
                        <div className="flex-1 bg-red-600 dark:bg-red-700 h-6 rounded" style={{width: '60%'}}></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 text-center font-bold text-purple-600">I₂</div>
                        <div className="flex-1 bg-purple-600 dark:bg-purple-700 h-6 rounded" style={{width: '40%'}}></div>
                      </div>
                      <p className="text-xs text-center text-muted-foreground mt-3">Oxidizing power decreases down group</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Allotropes of Carbon</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-gray-200 dark:bg-gray-800 rounded">
                      <p className="font-semibold">Diamond</p>
                      <p className="text-xs">sp³, 3D network, hardest, insulator</p>
                    </div>
                    <div className="p-3 bg-gray-600 dark:bg-gray-700 rounded text-white">
                      <p className="font-semibold">Graphite</p>
                      <p className="text-xs">sp², layers, soft, conductor</p>
                    </div>
                    <div className="p-3 bg-purple-200 dark:bg-purple-900 rounded">
                      <p className="font-semibold">Fullerene (C₆₀)</p>
                      <p className="text-xs">Soccer ball structure, 60 C atoms</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-yellow-50 to-green-50 dark:from-yellow-950/20 dark:to-green-950/20">
                <CardHeader>
                  <CardTitle>Shapes of Xenon Fluorides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="font-semibold mb-2">XeF₂</p>
                      <p className="text-sm text-muted-foreground">Linear</p>
                      <p className="text-xs font-mono mt-1">sp³d</p>
                      <p className="text-xs">3 lone pairs</p>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="font-semibold mb-2">XeF₄</p>
                      <p className="text-sm text-muted-foreground">Square Planar</p>
                      <p className="text-xs font-mono mt-1">sp³d²</p>
                      <p className="text-xs">2 lone pairs</p>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="font-semibold mb-2">XeF₆</p>
                      <p className="text-sm text-muted-foreground">Distorted Octahedral</p>
                      <p className="text-xs font-mono mt-1">sp³d³</p>
                      <p className="text-xs">1 lone pair</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Phosphorus Oxoacids Basicity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                      <h4 className="font-semibold mb-2">H₃PO₂</h4>
                      <p className="text-sm font-mono mb-2">Hypophosphorous acid</p>
                      <p className="text-sm">Basicity: <strong>1</strong> (monobasic)</p>
                      <p className="text-xs text-muted-foreground mt-1">One OH, two P-H bonds</p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                      <h4 className="font-semibold mb-2">H₃PO₃</h4>
                      <p className="text-sm font-mono mb-2">Phosphorous acid</p>
                      <p className="text-sm">Basicity: <strong>2</strong> (dibasic)</p>
                      <p className="text-xs text-muted-foreground mt-1">Two OH, one P-H bond</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-semibold mb-2">H₃PO₄</h4>
                      <p className="text-sm font-mono mb-2">Phosphoric acid</p>
                      <p className="text-sm">Basicity: <strong>3</strong> (tribasic)</p>
                      <p className="text-xs text-muted-foreground mt-1">Three OH, no P-H bond</p>
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
                <Card key={q.id} className="border-indigo-500/20">
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
                        <p className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Solution:</p>
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
