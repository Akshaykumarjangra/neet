
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThreeDViewer } from "@/components/ThreeDViewer";
import { BookOpen, Lightbulb, Calculator, TestTubes, Zap , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter22Topics: Topic[] = [
  {
    id: "nomenclature",
    title: "Nomenclature and Structure",
    description: "IUPAC naming and structural features of aldehydes, ketones, and carboxylic acids.",
    keyPoints: [
      "Aldehydes: -CHO (carbonyl at terminal carbon), suffix -al",
      "Ketones: >C=O (carbonyl at internal carbon), suffix -one",
      "Carboxylic acids: -COOH, suffix -oic acid",
      "C=O bond: sp² hybridized carbon, planar structure",
      "Polar carbonyl group makes compounds dipolar",
      "Common names: Formaldehyde (HCHO), Acetaldehyde (CH₃CHO)",
      "Common names: Acetone (CH₃COCH₃), Benzophenone (Ph₂CO)",
      "Common names: Formic acid (HCOOH), Acetic acid (CH₃COOH)"
    ],
    examples: [
      "Methanal (formaldehyde): HCHO",
      "Ethanal (acetaldehyde): CH₃CHO",
      "Propanone (acetone): CH₃COCH₃",
      "Butanone: CH₃CH₂COCH₃",
      "Ethanoic acid (acetic acid): CH₃COOH",
      "Benzoic acid: C₆H₅COOH",
      "Benzaldehyde: C₆H₅CHO"
    ],
    formulas: [
      "Aldehyde: R-CHO",
      "Ketone: R-CO-R'",
      "Carboxylic acid: R-COOH"
    ]
  },
  {
    id: "preparation-aldehydes-ketones",
    title: "Preparation of Aldehydes & Ketones",
    description: "Methods to synthesize aldehydes and ketones from various starting materials.",
    keyPoints: [
      "Oxidation of alcohols: 1° alcohol → aldehyde, 2° alcohol → ketone",
      "Aldehydes: Use mild oxidizing agents (PCC, CrO₃)",
      "Ketones: Use strong oxidizing agents (KMnO₄, K₂Cr₂O₇)",
      "Ozonolysis of alkenes: Cleaves double bond to form carbonyl",
      "Hydration of alkynes: Terminal alkyne → aldehyde, internal → ketone",
      "Friedel-Crafts acylation: Benzene + RCOCl → aromatic ketone",
      "Calcium salt decarboxylation: (RCOO)₂Ca → R-CO-R + CaCO₃",
      "Rosenmund reduction: RCOCl + H₂/Pd-BaSO₄ → RCHO"
    ],
    examples: [
      "CH₃CH₂OH + PCC → CH₃CHO (acetaldehyde)",
      "(CH₃)₂CHOH + K₂Cr₂O₇ → CH₃COCH₃ (acetone)",
      "CH₃-CH=CH₂ + O₃ → CH₃CHO + HCHO",
      "C₆H₆ + CH₃COCl/AlCl₃ → C₆H₅COCH₃ (acetophenone)",
      "(CH₃COO)₂Ca → CH₃COCH₃ + CaCO₃"
    ],
    formulas: [
      "R-CH₂OH + [O] → R-CHO (aldehyde)",
      "R₂CHOH + [O] → R₂CO (ketone)",
      "RC≡CH + H₂O/Hg²⁺ → RCHO"
    ]
  },
  {
    id: "preparation-carboxylic-acids",
    title: "Preparation of Carboxylic Acids",
    description: "Various methods to synthesize carboxylic acids.",
    keyPoints: [
      "Oxidation of primary alcohols: R-CH₂OH → R-COOH",
      "Oxidation of aldehydes: R-CHO → R-COOH (easy)",
      "Oxidation of alkylbenzenes: C₆H₅-CH₃ → C₆H₅-COOH",
      "Hydrolysis of nitriles: R-CN + H₂O/H⁺ → R-COOH",
      "Grignard reaction: RMgX + CO₂ → R-COOMgX → R-COOH",
      "Hydrolysis of esters: R-COOR' + H₂O → R-COOH + R'OH",
      "Oxidation with KMnO₄ is preferred for strong oxidation"
    ],
    examples: [
      "CH₃CH₂OH + KMnO₄ → CH₃COOH",
      "CH₃CHO + [O] → CH₃COOH (easy oxidation)",
      "C₆H₅CH₃ + KMnO₄ → C₆H₅COOH",
      "CH₃CN + H₂O/H⁺ → CH₃COOH",
      "CH₃MgBr + CO₂ → CH₃COOH"
    ],
    formulas: [
      "R-CH₂OH + [O] → R-COOH",
      "R-CHO + [O] → R-COOH",
      "R-CN + 2H₂O → R-COOH + NH₃"
    ]
  },
  {
    id: "physical-properties",
    title: "Physical Properties",
    description: "Comparison of physical properties across aldehydes, ketones, and carboxylic acids.",
    keyPoints: [
      "Boiling point: Acids > Ketones > Aldehydes (of similar MW)",
      "Carboxylic acids form strong H-bonds (dimers)",
      "Lower aldehydes & ketones soluble in water (H-bonding)",
      "Solubility decreases with increasing carbon chain",
      "Formic & acetic acids miscible with water",
      "Pleasant smell: lower aldehydes/ketones; pungent: acids",
      "Formaldehyde: pungent, lachrymatory",
      "Acetone: sweet, ethereal smell"
    ],
    examples: [
      "HCOOH (46): BP 101°C (H-bonding dimer)",
      "CH₃CHO (44): BP 20°C (dipole-dipole)",
      "CH₃COCH₃ (58): BP 56°C",
      "CH₃COOH (60): BP 118°C (strong H-bonding)",
      "Formaldehyde: soluble in water, used as formalin (40%)"
    ]
  },
  {
    id: "chemical-reactions",
    title: "Chemical Reactions - Nucleophilic Addition",
    description: "Characteristic reactions of carbonyl compounds with nucleophiles.",
    keyPoints: [
      "Nucleophilic addition to C=O (δ+ carbon attracts Nu⁻)",
      "Reactivity: Aldehydes > Ketones (less steric hindrance)",
      "Addition of HCN: Forms cyanohydrin",
      "Addition of NaHSO₃: Forms bisulfite addition product",
      "Addition of NH₃ derivatives: Forms imines, oximes, hydrazones",
      "Aldol condensation: Self-addition in presence of base",
      "Cannizzaro reaction: Disproportionation of aldehydes without α-H",
      "Reduction: LiAlH₄ or NaBH₄ → alcohol"
    ],
    examples: [
      "CH₃CHO + HCN → CH₃CH(OH)CN (cyanohydrin)",
      "CH₃CHO + NaHSO₃ → CH₃CH(OH)SO₃Na",
      "CH₃CHO + NH₂OH → CH₃CH=NOH (oxime)",
      "CH₃CHO + NH₂NH₂ → CH₃CH=NNH₂ (hydrazone)",
      "2CH₃CHO + NaOH → CH₃CH(OH)CH₂CHO (aldol)",
      "2HCHO + NaOH → HCOOH + CH₃OH (Cannizzaro)"
    ],
    formulas: [
      "R-CHO + HCN → R-CH(OH)CN",
      "R-CHO + NaBH₄ → R-CH₂OH",
      "R-CHO + NH₂OH → R-CH=NOH + H₂O"
    ]
  },
  {
    id: "oxidation-reduction",
    title: "Oxidation and Reduction Reactions",
    description: "Redox chemistry of aldehydes, ketones, and carboxylic acids.",
    keyPoints: [
      "Aldehydes: Easily oxidized to carboxylic acids",
      "Ketones: Resistant to oxidation (no oxidizable H)",
      "Tollens' test: Aldehyde + [Ag(NH₃)₂]⁺ → Ag mirror",
      "Fehling's test: Aldehyde + Cu²⁺ → Cu₂O (red ppt)",
      "Iodoform test: CH₃CO- group gives yellow CHI₃",
      "Reduction: Aldehydes/ketones → alcohols",
      "Clemmensen reduction: R-CO-R' + Zn-Hg/HCl → R-CH₂-R'",
      "Wolff-Kishner reduction: R-CO-R' + NH₂NH₂/KOH → R-CH₂-R'"
    ],
    examples: [
      "CH₃CHO + Tollens' → CH₃COOH + Ag↓ (silver mirror)",
      "CH₃CHO + Fehling's → CH₃COOH + Cu₂O↓ (red)",
      "CH₃COCH₃ + I₂/NaOH → CHI₃↓ (yellow) + CH₃COONa",
      "C₆H₅CHO + Zn-Hg/HCl → C₆H₅CH₃ (toluene)",
      "CH₃COCH₃ + NH₂NH₂/KOH → CH₃CH₂CH₃"
    ],
    formulas: [
      "R-CHO + 2[Ag(NH₃)₂]⁺ → R-COO⁻ + 2Ag + 4NH₃",
      "R-CO-CH₃ + 3I₂ + 4NaOH → R-COONa + CHI₃ + 3NaI + 3H₂O"
    ]
  },
  {
    id: "carboxylic-acid-reactions",
    title: "Reactions of Carboxylic Acids",
    description: "Characteristic reactions showing acidic nature and derivatives.",
    keyPoints: [
      "Acidic nature: R-COOH ⇌ R-COO⁻ + H⁺ (weak acid)",
      "React with bases: R-COOH + NaOH → R-COONa + H₂O",
      "React with carbonates: 2R-COOH + Na₂CO₃ → 2R-COONa + CO₂ + H₂O",
      "Esterification: R-COOH + R'OH → R-COOR' + H₂O",
      "Formation of acid chlorides: R-COOH + SOCl₂ → R-COCl",
      "Formation of amides: R-COOH + NH₃ → R-COONH₄ → R-CONH₂",
      "Hell-Volhard-Zelinsky: R-CH₂-COOH + Br₂/P → R-CHBr-COOH",
      "Decarboxylation: R-COOH → R-H + CO₂ (soda lime)"
    ],
    examples: [
      "CH₃COOH + NaHCO₃ → CH₃COONa + CO₂↑ + H₂O",
      "CH₃COOH + C₂H₅OH/H⁺ → CH₃COOC₂H₅ (ethyl acetate)",
      "CH₃COOH + SOCl₂ → CH₃COCl + SO₂ + HCl",
      "CH₃COOH + NH₃ → CH₃CONH₂ + H₂O",
      "CH₃CH₂COOH + Br₂/P → CH₃CHBrCOOH"
    ],
    formulas: [
      "R-COOH + NaOH → R-COONa + H₂O",
      "R-COOH + R'OH ⇌ R-COOR' + H₂O",
      "R-COOH + SOCl₂ → R-COCl + SO₂ + HCl"
    ]
  },
  {
    id: "important-compounds",
    title: "Important Compounds and Uses",
    description: "Industrially and commercially important aldehydes, ketones, and acids.",
    keyPoints: [
      "Formaldehyde (HCHO): Formalin (40% solution), bakelite, polymers",
      "Acetaldehyde (CH₃CHO): Manufacture of acetic acid, resins",
      "Acetone (CH₃COCH₃): Solvent for paints, varnishes, nail polish",
      "Benzaldehyde (C₆H₅CHO): Almond flavor, perfumes",
      "Acetic acid (CH₃COOH): Vinegar (5-8%), preservative",
      "Benzoic acid (C₆H₅COOH): Food preservative (E210)",
      "Formic acid (HCOOH): Found in ant sting, leather tanning",
      "Salicylic acid: Aspirin precursor, antiseptic"
    ],
    examples: [
      "Formalin: 40% HCHO solution, preservative for biological specimens",
      "Vinegar: 5-8% acetic acid, food condiment",
      "Acetone: Industrial solvent, paint remover",
      "Benzaldehyde: Used in perfumes, artificial almond essence",
      "Sodium benzoate: Food preservative in soft drinks"
    ]
  }
];



export function ChemistryChapter22() {
  // Fetch questions from database for d and f Block Elements (topicId: 56)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '56'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=56');
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
        <TestTubes className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 22: Aldehydes, Ketones and Carboxylic Acids</h1>
          <p className="text-muted-foreground">Class XII Chemistry - NEET Syllabus</p>
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
            <TestTubes className="h-4 w-4 mr-2" />
            Reactions
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
                  <li>Nomenclature and structure of aldehydes, ketones, and carboxylic acids</li>
                  <li>Preparation methods from alcohols, alkenes, and alkynes</li>
                  <li>Physical properties and intermolecular forces</li>
                  <li>Nucleophilic addition reactions of carbonyl compounds</li>
                  <li>Oxidation and reduction reactions</li>
                  <li>Characteristic tests: Tollens', Fehling's, Iodoform</li>
                  <li>Reactions of carboxylic acids and derivative formation</li>
                  <li>Important industrial compounds and applications</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Reactions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Tollens' & Fehling's test</p>
                    <p>• Iodoform reaction</p>
                    <p>• Aldol condensation</p>
                    <p>• Cannizzaro reaction</p>
                    <p>• Clemmensen & Wolff-Kishner</p>
                    <p>• Esterification</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Quick Tips</Badge>
                    <CardTitle className="text-lg">Remember</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Aldehydes more reactive than ketones</p>
                    <p>• Only aldehydes give Tollens'/Fehling's</p>
                    <p>• CH₃CO- gives iodoform test</p>
                    <p>• α-H needed for aldol</p>
                    <p>• No α-H for Cannizzaro</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter22Topics.map((topic, index) => (
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
              <CardTitle>Reaction Mechanisms & Comparisons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Characteristic Tests</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <p className="font-semibold mb-1">Tollens' Test (Silver Mirror)</p>
                      <p className="font-mono text-xs">RCHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻</p>
                      <p className="font-mono text-xs">→ RCOO⁻ + 2Ag↓ + 4NH₃ + 2H₂O</p>
                      <Badge className="mt-2">Only Aldehydes</Badge>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded">
                      <p className="font-semibold mb-1">Fehling's Test (Red ppt)</p>
                      <p className="font-mono text-xs">RCHO + 2Cu²⁺ + 5OH⁻</p>
                      <p className="font-mono text-xs">→ RCOO⁻ + Cu₂O↓ + 3H₂O</p>
                      <Badge className="mt-2" variant="destructive">Only Aldehydes</Badge>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                      <p className="font-semibold mb-1">Iodoform Test (Yellow ppt)</p>
                      <p className="font-mono text-xs">R-CO-CH₃ + 3I₂ + 4NaOH</p>
                      <p className="font-mono text-xs">→ R-COONa + CHI₃↓ + 3NaI + 3H₂O</p>
                      <Badge className="mt-2" variant="secondary">CH₃CO- group</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Reactivity Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold mb-2">Nucleophilic Addition:</p>
                      <p className="font-mono">HCHO {'>'} RCHO {'>'} R₂CO</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        (Less steric hindrance = More reactive)
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Ease of Oxidation:</p>
                      <p className="font-mono">RCHO {'>{>'} R₂CO</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        (Aldehydes easily oxidized, ketones resistant)
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Boiling Point:</p>
                      <p className="font-mono">RCOOH {'>'} R₂CO {'>'} RCHO</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        (H-bonding: Acid dimer {'>'} dipole-dipole)
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Acidity:</p>
                      <p className="font-mono">RCOOH {'>'} H₂O {'>'} ROH</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        (Resonance stabilization of RCOO⁻)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardHeader>
                  <CardTitle>Important Name Reactions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold">Aldol Condensation</p>
                      <p className="font-mono text-xs mt-1">2CH₃CHO + NaOH → CH₃CH(OH)CH₂CHO</p>
                      <Badge variant="outline" className="mt-1">Requires α-H</Badge>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold">Cannizzaro Reaction</p>
                      <p className="font-mono text-xs mt-1">2HCHO + NaOH → HCOOH + CH₃OH</p>
                      <Badge variant="outline" className="mt-1">No α-H needed</Badge>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold">Clemmensen Reduction</p>
                      <p className="font-mono text-xs mt-1">R-CO-R' + Zn-Hg/HCl → R-CH₂-R'</p>
                      <Badge variant="outline" className="mt-1">Acidic conditions</Badge>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold">Wolff-Kishner Reduction</p>
                      <p className="font-mono text-xs mt-1">R-CO-R' + NH₂NH₂/KOH → R-CH₂-R'</p>
                      <Badge variant="outline" className="mt-1">Basic conditions</Badge>
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
