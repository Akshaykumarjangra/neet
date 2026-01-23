
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThreeDViewer } from "@/components/ThreeDViewer";
import { BookOpen, Lightbulb, Calculator, Atom, Zap, Network , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter17Topics: Topic[] = [
  {
    id: "intro-coordination",
    title: "Introduction to Coordination Compounds",
    description: "Coordination compounds contain a central metal atom/ion bonded to molecules or ions called ligands.",
    keyPoints: [
      "Coordination entity: central metal atom/ion + ligands",
      "Ligands: Lewis bases that donate electron pairs",
      "Coordination number: number of ligand atoms bonded to metal",
      "Coordination sphere: metal + ligands (written in square brackets)",
      "Counter ions: ions outside coordination sphere",
      "Examples: [Fe(CN)₆]⁴⁻, [Co(NH₃)₆]³⁺, [Ni(CO)₄]"
    ],
    examples: [
      "K₄[Fe(CN)₆]: coordination entity is [Fe(CN)₆]⁴⁻",
      "[Co(NH₃)₆]Cl₃: coordination sphere [Co(NH₃)₆]³⁺, counter ion Cl⁻",
      "[Ni(CO)₄]: zero coordination compound (no counter ion)"
    ]
  },
  {
    id: "nomenclature",
    title: "IUPAC Nomenclature",
    description: "Systematic naming of coordination compounds follows specific IUPAC rules.",
    keyPoints: [
      "Cation named first, then anion",
      "Ligands named alphabetically (ignoring prefixes)",
      "Anionic ligands end in -o (Cl⁻ = chlorido, CN⁻ = cyanido)",
      "Neutral ligands: usual name (except H₂O = aqua, NH₃ = ammine)",
      "Prefixes: di-, tri-, tetra-, penta-, hexa- for simple ligands",
      "bis-, tris-, tetrakis- for complex ligands",
      "Oxidation state in Roman numerals after metal name",
      "Metal in anionic complex ends in -ate"
    ],
    examples: [
      "[Co(NH₃)₆]Cl₃: Hexaamminecobalt(III) chloride",
      "K₄[Fe(CN)₆]: Potassium hexacyanoferrate(II)",
      "[Pt(NH₃)₂Cl₂]: Diamminedichloridoplatinum(II)",
      "[Cr(en)₃]Cl₃: Tris(ethylenediamine)chromium(III) chloride"
    ]
  },
  {
    id: "types-ligands",
    title: "Types of Ligands",
    description: "Ligands classified by denticity (number of donor atoms) and charge.",
    keyPoints: [
      "Monodentate: 1 donor atom (Cl⁻, NH₃, H₂O, CN⁻)",
      "Bidentate: 2 donor atoms (en, ox²⁻, acac⁻)",
      "Polydentate: multiple donor atoms (EDTA⁴⁻ is hexadentate)",
      "Chelating ligands: form ring structures (bidentate or higher)",
      "Ambidentate: can coordinate through different atoms (NO₂⁻, SCN⁻)",
      "Negative ligands: Cl⁻, CN⁻, NO₂⁻, OH⁻",
      "Neutral ligands: NH₃, H₂O, CO, NO",
      "Positive ligand: NO₂⁺ (nitronium)"
    ],
    examples: [
      "en (ethylenediamine): bidentate chelating ligand",
      "EDTA⁴⁻: hexadentate ligand (6 donor atoms)",
      "NO₂⁻: ambidentate (binds through N or O)",
      "SCN⁻: ambidentate (binds through S or N)"
    ]
  },
  {
    id: "isomerism",
    title: "Isomerism in Coordination Compounds",
    description: "Coordination compounds show various types of structural and stereoisomerism.",
    keyPoints: [
      "Structural isomerism: different connectivity",
      "- Ionization: exchange of ions (e.g., [Co(NH₃)₅Br]SO₄ vs [Co(NH₃)₅SO₄]Br)",
      "- Coordination: ligand exchange with counter ion",
      "- Linkage: ambidentate ligand bonds differently",
      "Stereoisomerism: same connectivity, different spatial arrangement",
      "- Geometrical: cis-trans in square planar/octahedral",
      "- Optical: non-superimposable mirror images (chiral)"
    ],
    examples: [
      "Linkage: [Co(NH₃)₅NO₂]Cl₂ (nitro) vs [Co(NH₃)₅ONO]Cl₂ (nitrito)",
      "Geometrical: cis-[Pt(NH₃)₂Cl₂] vs trans-[Pt(NH₃)₂Cl₂]",
      "Optical: [Co(en)₃]³⁺ has d and l forms"
    ]
  },
  {
    id: "bonding-vbt",
    title: "Bonding - Valence Bond Theory",
    description: "VBT explains bonding through hybridization of metal orbitals and ligand donation.",
    keyPoints: [
      "Metal provides empty hybrid orbitals",
      "Ligands donate electron pairs (coordinate covalent bonds)",
      "Hybridization determines geometry",
      "sp³ → tetrahedral (e.g., [Ni(CO)₄])",
      "dsp² → square planar (e.g., [Ni(CN)₄]²⁻)",
      "d²sp³ (inner orbital) → octahedral low spin",
      "sp³d² (outer orbital) → octahedral high spin"
    ],
    examples: [
      "[Ni(CO)₄]: Ni(0) sp³, tetrahedral, diamagnetic",
      "[Ni(CN)₄]²⁻: Ni(II) dsp², square planar, diamagnetic",
      "[CoF₆]³⁻: Co(III) sp³d², octahedral, paramagnetic (4 unpaired)"
    ]
  },
  {
    id: "cft",
    title: "Crystal Field Theory",
    description: "CFT treats metal-ligand interaction as electrostatic, explaining d-orbital splitting.",
    keyPoints: [
      "Ligands are point charges creating electric field",
      "d-orbitals split into two sets (energy difference = Δ)",
      "Octahedral: t₂g (lower) and eg (higher), Δₒ",
      "Tetrahedral: e (lower) and t₂ (higher), Δₜ = 4/9 Δₒ",
      "Square planar: complex splitting pattern",
      "Strong field ligands (CN⁻, CO): large Δ → low spin",
      "Weak field ligands (F⁻, H₂O): small Δ → high spin",
      "CFSE (Crystal Field Stabilization Energy) from electron arrangement"
    ],
    examples: [
      "[Fe(CN)₆]⁴⁻: strong field, low spin, diamagnetic",
      "[FeF₆]³⁻: weak field, high spin, paramagnetic",
      "Spectrochemical series: I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < CN⁻ < CO"
    ]
  },
  {
    id: "color-magnetism",
    title: "Colour and Magnetic Properties",
    description: "d-d transitions and unpaired electrons explain colour and magnetism in complexes.",
    keyPoints: [
      "Colour from d-d transitions (electron jumps between split d-orbitals)",
      "Complementary colour observed",
      "d⁰ and d¹⁰ complexes are colourless",
      "Intensity depends on selection rules",
      "Magnetic moment: μ = √n(n+2) BM",
      "Low spin: fewer unpaired electrons (strong field)",
      "High spin: more unpaired electrons (weak field)"
    ],
    examples: [
      "[Ti(H₂O)₆]³⁺: d¹, purple (absorbs yellow-green)",
      "[Cu(H₂O)₄]²⁺: d⁹, blue",
      "[Zn(H₂O)₆]²⁺: d¹⁰, colourless"
    ],
    formulas: [
      "μ = √n(n+2) BM",
      "CFSE(oct) = (-0.4x + 0.6y)Δₒ"
    ]
  },
  {
    id: "applications",
    title: "Applications of Coordination Compounds",
    description: "Coordination compounds have wide applications in industry, medicine, and analysis.",
    keyPoints: [
      "Metallurgy: purification (e.g., Mond process for Ni)",
      "Qualitative analysis: detection of metal ions",
      "Medicine: cisplatin (anticancer), vitamin B₁₂ (Co complex)",
      "Photography: AgBr dissolves in Na₂S₂O₃ as [Ag(S₂O₃)₂]³⁻",
      "Catalysis: Wilkinson's catalyst, Ziegler-Natta",
      "Electroplating: metal deposition from complex solutions",
      "Biological systems: hemoglobin, chlorophyll"
    ],
    examples: [
      "Mond process: Ni + 4CO → [Ni(CO)₄] (purification)",
      "Cisplatin: cis-[Pt(NH₃)₂Cl₂] (anticancer drug)",
      "EDTA: chelation therapy, water softening"
    ]
  }
];



export function ChemistryChapter17() {
// Fetch questions from database for Coordination Compounds (topicId: 2105)
const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
  queryKey: ['/api/questions', 'topicId', '2105'],
  queryFn: async () => {
    const response = await fetch('/api/questions?topicId=2105');
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
        <Network className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 17: Coordination Compounds</h1>
          <p className="text-muted-foreground">Complex Chemistry - Class XII Chemistry</p>
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
                  <li>Introduction to coordination compounds and terminology</li>
                  <li>IUPAC nomenclature of coordination compounds</li>
                  <li>Types of ligands and their classification</li>
                  <li>Isomerism in coordination compounds</li>
                  <li>Bonding theories: VBT and Crystal Field Theory</li>
                  <li>Colour and magnetic properties</li>
                  <li>Applications in industry and medicine</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Concepts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Coordination number and geometry</p>
                    <p>• IUPAC naming rules</p>
                    <p>• Types of isomerism</p>
                    <p>• Crystal field splitting</p>
                    <p>• High spin vs low spin</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Quick Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Wrong oxidation state calculation</p>
                    <p>• Confusing denticity with coordination number</p>
                    <p>• Incorrect IUPAC names (order matters!)</p>
                    <p>• Missing geometrical isomers</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Important Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Magnetic moment:</strong> μ = √n(n+2) BM</p>
                  <p><strong>EAN rule:</strong> Effective Atomic Number = Z - oxidation state + 2×CN</p>
                  <p><strong>Spectrochemical series:</strong> I⁻ &lt; Br⁻ &lt; Cl⁻ &lt; F⁻ &lt; OH⁻ &lt; H₂O &lt; NH₃ &lt; en &lt; CN⁻ &lt; CO</p>
                  <p><strong>Geometry:</strong> CN 4 (tetrahedral/square planar), CN 6 (octahedral)</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter17Topics.map((topic, index) => (
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
              <CardTitle>Coordination Compound Visualizations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Common Geometries</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="bg-purple-100 dark:bg-purple-900/40 p-3 rounded">
                        <p className="font-bold">Tetrahedral (CN = 4)</p>
                        <p>[Ni(CO)₄], [FeCl₄]⁻</p>
                      </div>
                      <div className="bg-pink-100 dark:bg-pink-900/40 p-3 rounded">
                        <p className="font-bold">Square Planar (CN = 4)</p>
                        <p>[Pt(NH₃)₂Cl₂], [Ni(CN)₄]²⁻</p>
                      </div>
                      <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded">
                        <p className="font-bold">Octahedral (CN = 6)</p>
                        <p>[Co(NH₃)₆]³⁺, [Fe(CN)₆]⁴⁻</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Isomerism Types</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                      <p className="font-bold mb-1">Structural</p>
                      <p>• Ionization</p>
                      <p>• Coordination</p>
                      <p>• Linkage</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                      <p className="font-bold mb-1">Stereoisomerism</p>
                      <p>• Geometrical (cis-trans)</p>
                      <p>• Optical (d, l)</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                <CardHeader>
                  <CardTitle>Crystal Field Splitting</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="font-bold mb-3">Octahedral Field</p>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <div className="space-y-2 text-sm">
                          <div className="border-t-2 border-red-500 pt-2">
                            <p>eg (dz², dx²-y²)</p>
                          </div>
                          <p className="text-purple-500 font-bold">Δₒ</p>
                          <div className="border-b-2 border-blue-500 pb-2">
                            <p>t₂g (dxy, dyz, dzx)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-bold mb-3">Tetrahedral Field</p>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <div className="space-y-2 text-sm">
                          <div className="border-t-2 border-blue-500 pt-2">
                            <p>e (dz², dx²-y²)</p>
                          </div>
                          <p className="text-purple-500 font-bold">Δₜ ≈ 4/9 Δₒ</p>
                          <div className="border-b-2 border-red-500 pb-2">
                            <p>t₂ (dxy, dyz, dzx)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ligand Types Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 text-left">Type</th>
                          <th className="p-2 text-left">Examples</th>
                          <th className="p-2 text-left">Denticity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">Monodentate</td>
                          <td className="p-2">Cl⁻, NH₃, H₂O, CN⁻</td>
                          <td className="p-2">1</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Bidentate</td>
                          <td className="p-2">en, ox²⁻, acac⁻</td>
                          <td className="p-2">2</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Hexadentate</td>
                          <td className="p-2">EDTA⁴⁻</td>
                          <td className="p-2">6</td>
                        </tr>
                        <tr>
                          <td className="p-2">Ambidentate</td>
                          <td className="p-2">NO₂⁻, SCN⁻</td>
                          <td className="p-2">1 (variable)</td>
                        </tr>
                      </tbody>
                    </table>
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
