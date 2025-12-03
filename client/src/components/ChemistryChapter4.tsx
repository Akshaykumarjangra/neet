import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VisualizationTab } from "@/components/VisualizationTab";
import { getChapterVisualizations } from "@/visuals/chapterMappings";
import { BookOpen, Lightbulb, Calculator, Atom, Zap, Network , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter4Topics: Topic[] = [
  {
    id: "ionic-bonding",
    title: "Ionic Bonding & Ionic Compounds",
    description: "Formation of ionic bonds through electron transfer between metals and non-metals.",
    keyPoints: [
      "Ionic bond: Electrostatic attraction between oppositely charged ions",
      "Formed by complete transfer of electrons from metal to non-metal",
      "Metals lose electrons → cations (positive ions)",
      "Non-metals gain electrons → anions (negative ions)",
      "Lattice energy: Energy released when ions combine to form crystal lattice",
      "Higher lattice energy → stronger ionic bond → higher melting point",
      "Ionic compounds: High melting/boiling points, conduct electricity in molten/aqueous state",
      "Born-Haber cycle: Used to calculate lattice energy"
    ],
    examples: [
      "NaCl: Na → Na⁺ + e⁻; Cl + e⁻ → Cl⁻; Na⁺Cl⁻ (table salt)",
      "MgO: Mg → Mg²⁺ + 2e⁻; O + 2e⁻ → O²⁻ (very high lattice energy)",
      "CaF₂: Ca → Ca²⁺; 2F + 2e⁻ → 2F⁻ (fluorite)",
      "Al₂O₃: 2Al → 2Al³⁺; 3O → 3O²⁻ (alumina, very stable)",
      "K₂O: 2K → 2K⁺; O → O²⁻ (potassium oxide)"
    ],
    formulas: [
      "Lattice Energy ∝ (charge of cation × charge of anion) / (r₊ + r₋)",
      "Born-Haber Cycle: ΔH_f = ΔH_sub + IE + ½ΔH_diss + EA - U",
      "U (lattice energy) = (k × z⁺ × z⁻ × e²) / r₀"
    ]
  },
  {
    id: "covalent-bonding",
    title: "Covalent Bonding & Lewis Structures",
    description: "Formation of covalent bonds through sharing of electron pairs.",
    keyPoints: [
      "Covalent bond: Sharing of electron pairs between atoms",
      "Formed between non-metals with similar electronegativities",
      "Single bond: 1 shared pair (σ bond), e.g., H-H",
      "Double bond: 2 shared pairs (1σ + 1π), e.g., O=O",
      "Triple bond: 3 shared pairs (1σ + 2π), e.g., N≡N",
      "Lewis structure: Shows valence electrons as dots/lines",
      "Octet rule: Atoms tend to achieve 8 electrons in valence shell",
      "Exceptions: H (2 electrons), Be, B (incomplete octet), S, P, Cl (expanded octet)"
    ],
    examples: [
      "H₂: H-H (single bond, 2 shared electrons)",
      "O₂: O=O (double bond, 4 shared electrons, 2 lone pairs on each O)",
      "N₂: N≡N (triple bond, 6 shared electrons, 1 lone pair on each N)",
      "CH₄: C shares 4 electrons with 4 H atoms (complete octet)",
      "NH₃: N shares 3 pairs, 1 lone pair on N",
      "H₂O: O shares 2 pairs, 2 lone pairs on O",
      "CO₂: O=C=O (2 double bonds, linear)",
      "PCl₅: P has 10 electrons (expanded octet)"
    ],
    formulas: [
      "Bond order = (Number of bonding electrons - Number of antibonding electrons) / 2",
      "Bond length: Single {'>'} Double {'>'} Triple",
      "Bond energy: Triple {'>'} Double {'>'} Single"
    ]
  },
  {
    id: "vsepr-theory",
    title: "VSEPR Theory & Molecular Geometry",
    description: "Valence Shell Electron Pair Repulsion theory predicts molecular shapes.",
    keyPoints: [
      "VSEPR: Electron pairs around central atom repel each other",
      "Electron pairs arrange to minimize repulsion",
      "Lone pair-lone pair {'>'} lone pair-bond pair {'>'} bond pair-bond pair repulsion",
      "Molecular geometry depends on: bonding pairs + lone pairs",
      "Linear: 2 BP, 0 LP (180°), e.g., CO₂, BeCl₂",
      "Trigonal planar: 3 BP, 0 LP (120°), e.g., BF₃",
      "Tetrahedral: 4 BP, 0 LP (109.5°), e.g., CH₄",
      "Trigonal bipyramidal: 5 BP, 0 LP (90°, 120°), e.g., PCl₅",
      "Octahedral: 6 BP, 0 LP (90°), e.g., SF₆"
    ],
    examples: [
      "CH₄: 4 BP, 0 LP → Tetrahedral (109.5°)",
      "NH₃: 3 BP, 1 LP → Pyramidal (107.5°)",
      "H₂O: 2 BP, 2 LP → Bent (104.5°)",
      "CO₂: 2 BP, 0 LP → Linear (180°)",
      "BF₃: 3 BP, 0 LP → Trigonal planar (120°)",
      "PCl₅: 5 BP, 0 LP → Trigonal bipyramidal",
      "SF₆: 6 BP, 0 LP → Octahedral (90°)",
      "ClF₃: 3 BP, 2 LP → T-shaped"
    ],
    formulas: [
      "Steric number = Number of σ bonds + Number of lone pairs",
      "Bond angle reduction: Each lone pair reduces angle by ~2-3°"
    ]
  },
  {
    id: "hybridization",
    title: "Valence Bond Theory & Hybridization",
    description: "Mixing of atomic orbitals to form hybrid orbitals for bonding.",
    keyPoints: [
      "Hybridization: Mixing of atomic orbitals to form new hybrid orbitals",
      "sp: Linear, 180°, 2 hybrid orbitals (e.g., BeCl₂, C₂H₂)",
      "sp²: Trigonal planar, 120°, 3 hybrid orbitals (e.g., BF₃, C₂H₄)",
      "sp³: Tetrahedral, 109.5°, 4 hybrid orbitals (e.g., CH₄, NH₃)",
      "sp³d: Trigonal bipyramidal, 5 hybrid orbitals (e.g., PCl₅)",
      "sp³d²: Octahedral, 6 hybrid orbitals (e.g., SF₆)",
      "σ bond: Head-on overlap, free rotation",
      "π bond: Sideways overlap, restricted rotation"
    ],
    examples: [
      "BeH₂: sp hybridization, linear, 180°",
      "BH₃: sp² hybridization, trigonal planar, 120°",
      "CH₄: sp³ hybridization, tetrahedral, 109.5°",
      "C₂H₂ (acetylene): C is sp, H-C≡C-H, linear",
      "C₂H₄ (ethylene): C is sp², H₂C=CH₂, planar",
      "C₂H₆ (ethane): C is sp³, H₃C-CH₃, tetrahedral",
      "NH₃: sp³ (1 LP), pyramidal",
      "H₂O: sp³ (2 LP), bent"
    ],
    formulas: [
      "Number of hybrid orbitals = Number of atomic orbitals mixed",
      "sp: 1s + 1p = 2 hybrid orbitals",
      "sp²: 1s + 2p = 3 hybrid orbitals",
      "sp³: 1s + 3p = 4 hybrid orbitals"
    ]
  },
  {
    id: "molecular-orbital",
    title: "Molecular Orbital Theory (MOT)",
    description: "Formation of molecular orbitals through combination of atomic orbitals.",
    keyPoints: [
      "Molecular orbitals: Formed by linear combination of atomic orbitals (LCAO)",
      "Bonding MO: Lower energy, electron density between nuclei (σ, π)",
      "Antibonding MO: Higher energy, node between nuclei (σ*, π*)",
      "Bond order = (Nb - Na) / 2 (Nb = bonding electrons, Na = antibonding)",
      "Higher bond order → shorter bond length, higher bond energy",
      "Paramagnetic: Unpaired electrons (e.g., O₂)",
      "Diamagnetic: All electrons paired (e.g., N₂)",
      "Energy order: σ1s &lt; σ*1s &lt; σ2s &lt; σ*2s &lt; π2p &lt; σ2p &lt; π*2p &lt; σ*2p"
    ],
    examples: [
      "H₂: (σ1s)², BO = 1, diamagnetic",
      "He₂: (σ1s)²(σ*1s)², BO = 0, does not exist",
      "N₂: BO = 3, diamagnetic, very stable (N≡N)",
      "O₂: BO = 2, paramagnetic (2 unpaired electrons in π*2p)",
      "F₂: BO = 1, diamagnetic",
      "C₂: BO = 2, diamagnetic",
      "B₂: Paramagnetic (2 unpaired in π2p)"
    ],
    formulas: [
      "Bond Order (BO) = (Nb - Na) / 2",
      "BO = 0 → molecule doesn't exist",
      "BO = 1 → single bond, BO = 2 → double bond, BO = 3 → triple bond",
      "Bond length ∝ 1 / Bond order",
      "Bond energy ∝ Bond order"
    ]
  },
  {
    id: "hydrogen-bonding",
    title: "Hydrogen Bonding",
    description: "Special type of dipole-dipole attraction involving hydrogen.",
    keyPoints: [
      "Hydrogen bond: Between H bonded to F, O, or N and lone pair on another F, O, or N",
      "Intermolecular: Between different molecules (e.g., H₂O, HF, NH₃)",
      "Intramolecular: Within same molecule (e.g., o-nitrophenol)",
      "Strength: 5-30 kJ/mol (weaker than covalent, stronger than van der Waals)",
      "Causes: High boiling point, high solubility in water",
      "Ice has lower density than water due to H-bonding (open structure)",
      "DNA double helix held together by H-bonds",
      "Protein secondary structure maintained by H-bonds"
    ],
    examples: [
      "H₂O: Each molecule forms ~4 H-bonds, high BP (100°C)",
      "HF: Strong H-bonding, exists as (HF)n polymers",
      "NH₃: Forms H-bonds, BP higher than expected",
      "DNA: A-T (2 H-bonds), G-C (3 H-bonds)",
      "Proteins: α-helix and β-sheet stabilized by H-bonds",
      "Alcohols: Higher BP than corresponding alkanes",
      "Carboxylic acids: Dimerize through H-bonding"
    ],
    formulas: [
      "H-bond energy: 5-30 kJ/mol",
      "Covalent bond energy: 200-400 kJ/mol",
      "Van der Waals: 0.4-4 kJ/mol"
    ]
  },
  {
    id: "polarity",
    title: "Bond Polarity & Dipole Moment",
    description: "Unequal sharing of electrons leads to polar bonds and dipole moments.",
    keyPoints: [
      "Polar bond: Unequal sharing due to electronegativity difference",
      "Dipole moment (μ): Measure of polarity, μ = q × d (charge × distance)",
      "Unit: Debye (D), 1 D = 3.34 × 10⁻³⁰ C·m",
      "Non-polar molecule: μ = 0 (symmetric, dipoles cancel)",
      "Polar molecule: μ ≠ 0 (asymmetric, net dipole)",
      "Greater ΔEN → more polar bond",
      "Molecular shape determines overall polarity",
      "Polar molecules: Better solvents for ionic compounds"
    ],
    examples: [
      "HCl: Polar (ΔEN = 0.9), μ = 1.03 D",
      "H₂O: Polar (bent shape), μ = 1.85 D",
      "NH₃: Polar (pyramidal), μ = 1.47 D",
      "CO₂: Non-polar (linear, dipoles cancel), μ = 0",
      "CCl₄: Non-polar (tetrahedral, symmetric), μ = 0",
      "CH₃Cl: Polar (asymmetric), μ = 1.87 D",
      "BF₃: Non-polar (trigonal planar, symmetric), μ = 0"
    ],
    formulas: [
      "μ = q × d (q = charge, d = distance)",
      "μ (in Debye) = ΔEN × bond length (approximate)",
      "1 Debye = 3.34 × 10⁻³⁰ C·m"
    ]
  },
  {
    id: "resonance",
    title: "Resonance & Delocalization",
    description: "Multiple Lewis structures represent the same molecule.",
    keyPoints: [
      "Resonance: When a molecule can be represented by multiple Lewis structures",
      "Resonance structures: Differ only in position of electrons, not atoms",
      "Resonance hybrid: Actual structure is average of all resonance forms",
      "Resonance stabilization: Molecule is more stable than any single structure",
      "Delocalization: π electrons spread over multiple atoms",
      "Rules: Same number of paired/unpaired electrons, same atomic positions",
      "Lower energy structures contribute more to hybrid",
      "Benzene: Classic example with 2 major resonance structures"
    ],
    examples: [
      "CO₃²⁻ (carbonate): 3 equivalent resonance structures",
      "O₃ (ozone): 2 resonance structures, bent shape",
      "NO₃⁻ (nitrate): 3 equivalent structures, trigonal planar",
      "Benzene (C₆H₆): 2 Kekulé structures, hexagonal delocalized π system",
      "SO₂: 2 resonance structures",
      "Carboxylate ion (RCOO⁻): 2 equivalent structures",
      "Formate ion (HCOO⁻): Equal C-O bond lengths due to resonance"
    ]
  }
];



export function ChemistryChapter4() {
  // Fetch questions from database for Chemical Bonding and Molecular Structure (topicId: 39)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '39'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=39');
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
        <Network className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 4: Chemical Bonding & Molecular Structure</h1>
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
            Structures
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
                  <li>Ionic and covalent bonding mechanisms</li>
                  <li>Lewis structures and octet rule</li>
                  <li>VSEPR theory and molecular geometry</li>
                  <li>Hybridization (sp, sp², sp³, sp³d, sp³d²)</li>
                  <li>Molecular orbital theory for diatomic molecules</li>
                  <li>Hydrogen bonding and its effects</li>
                  <li>Bond polarity and dipole moments</li>
                  <li>Resonance and electron delocalization</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-blue-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Hybridization Quick Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>sp:</strong> Linear, 180° (BeCl₂, C₂H₂)</p>
                    <p><strong>sp²:</strong> Trigonal planar, 120° (BF₃, C₂H₄)</p>
                    <p><strong>sp³:</strong> Tetrahedral, 109.5° (CH₄, NH₃)</p>
                    <p><strong>sp³d:</strong> Trig. bipyramidal (PCl₅)</p>
                    <p><strong>sp³d²:</strong> Octahedral (SF₆)</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Key Formulas</Badge>
                    <CardTitle className="text-lg">Important Relationships</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Bond Order:</strong> (Nb - Na) / 2</p>
                    <p><strong>Dipole:</strong> μ = q × d</p>
                    <p><strong>Lattice Energy:</strong> ∝ charges / distance</p>
                    <p><strong>Repulsion:</strong> LP-LP {'>'} LP-BP {'>'} BP-BP</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    VSEPR Theory Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>2 BP, 0 LP:</strong> Linear (180°) - CO₂</p>
                  <p><strong>3 BP, 0 LP:</strong> Trigonal planar (120°) - BF₃</p>
                  <p><strong>4 BP, 0 LP:</strong> Tetrahedral (109.5°) - CH₄</p>
                  <p><strong>3 BP, 1 LP:</strong> Pyramidal (107.5°) - NH₃</p>
                  <p><strong>2 BP, 2 LP:</strong> Bent (104.5°) - H₂O</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter4Topics.map((topic, index) => (
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
          <VisualizationTab
            chapterId="chemistry-04"
            visualizations={getChapterVisualizations('chemistry-04')?.visualizations || []}
            layout="grid"
            title="Chemical Bonding Visualizations"
            description="Interactive molecular orbitals and crystal structures"
          />
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