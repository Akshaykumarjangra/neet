
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, TestTubes, Zap, Dna , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter24Topics: Topic[] = [
  {
    id: "carbohydrates",
    title: "Carbohydrates - Classification",
    description: "Types and classification of carbohydrates based on hydrolysis.",
    keyPoints: [
      "General formula: Cₙ(H₂O)ₙ (polyhydroxy aldehydes/ketones)",
      "Monosaccharides: Cannot be hydrolyzed (glucose, fructose)",
      "Disaccharides: Hydrolyze to 2 monosaccharides (sucrose, maltose)",
      "Polysaccharides: Hydrolyze to many monosaccharides (starch, cellulose)",
      "Reducing sugars: Have free aldehyde/ketone group",
      "Non-reducing sugars: No free carbonyl group (sucrose)",
      "Aldoses: Contain aldehyde group (glucose, ribose)",
      "Ketoses: Contain ketone group (fructose, ribulose)"
    ],
    examples: [
      "Monosaccharides: Glucose (C₆H₁₂O₆), Fructose, Ribose",
      "Disaccharides: Sucrose (glucose + fructose)",
      "Disaccharides: Maltose (glucose + glucose)",
      "Disaccharides: Lactose (glucose + galactose)",
      "Polysaccharides: Starch, Cellulose, Glycogen"
    ]
  },
  {
    id: "glucose-structure",
    title: "Glucose - Structure and Reactions",
    description: "Detailed structure of glucose and its chemical properties.",
    keyPoints: [
      "Molecular formula: C₆H₁₂O₆ (hexose, aldose)",
      "Open chain: CHO-(CHOH)₄-CH₂OH",
      "Cyclic structure: α-D-glucose and β-D-glucose (pyranose ring)",
      "Anomers: α (OH down) and β (OH up) at C-1",
      "Mutarotation: Interconversion of α and β forms in solution",
      "Reducing sugar: Gives positive Fehling's and Tollens' test",
      "Glycosidic linkage: C-O-C bond between sugars",
      "Osazone formation: With phenylhydrazine gives yellow crystals"
    ],
    examples: [
      "α-D-glucose: [α] = +112°",
      "β-D-glucose: [α] = +19°",
      "Equilibrium mixture: [α] = +52.5°",
      "With Tollens': Silver mirror (reducing sugar)",
      "With Fehling's: Red Cu₂O precipitate",
      "Osazone test: Yellow needle-shaped crystals"
    ],
    formulas: [
      "C₆H₁₂O₆ (glucose)",
      "Mutarotation: α-D-glucose ⇌ β-D-glucose"
    ]
  },
  {
    id: "disaccharides",
    title: "Disaccharides",
    description: "Structure and properties of important disaccharides.",
    keyPoints: [
      "Sucrose: Glucose + Fructose (α-1,2 glycosidic linkage)",
      "Sucrose: Non-reducing sugar (no free anomeric carbon)",
      "Invert sugar: Glucose + Fructose from sucrose hydrolysis",
      "Maltose: Glucose + Glucose (α-1,4 linkage)",
      "Maltose: Reducing sugar (has free anomeric carbon)",
      "Lactose: Glucose + Galactose (β-1,4 linkage)",
      "Lactose: Reducing sugar, found in milk",
      "Hydrolysis: Acid or enzyme catalyzed"
    ],
    examples: [
      "Sucrose + H₂O/H⁺ → Glucose + Fructose (inversion)",
      "Maltose + H₂O → 2 Glucose (maltase enzyme)",
      "Lactose + H₂O → Glucose + Galactose (lactase)",
      "Sucrose: Table sugar, cane sugar",
      "Maltose: Malt sugar, in germinating grains",
      "Lactose: Milk sugar, 4-5% in cow milk"
    ]
  },
  {
    id: "polysaccharides",
    title: "Polysaccharides",
    description: "Structure and functions of starch, cellulose, and glycogen.",
    keyPoints: [
      "Starch: (C₆H₁₀O₅)ₙ, storage polysaccharide in plants",
      "Starch components: Amylose (15-20%) + Amylopectin (80-85%)",
      "Amylose: Linear chain, α-1,4 linkages, helical structure",
      "Amylopectin: Branched, α-1,4 and α-1,6 linkages",
      "Cellulose: (C₆H₁₀O₅)ₙ, structural polysaccharide",
      "Cellulose: β-1,4 linkages, straight chain, indigestible",
      "Glycogen: Animal starch, highly branched",
      "Glycogen: Stored in liver and muscles"
    ],
    examples: [
      "Starch + I₂ → Blue-black complex (test)",
      "Cellulose: Cotton, wood, paper (pure cellulose)",
      "Cellulose nitrate: Rayon, explosives",
      "Cellulose acetate: Photographic films",
      "Glycogen: Energy storage in animals"
    ]
  },
  {
    id: "proteins-amino-acids",
    title: "Amino Acids and Proteins",
    description: "Building blocks of proteins and their classification.",
    keyPoints: [
      "Amino acids: H₂N-CHR-COOH (α-amino acids)",
      "20 standard amino acids in proteins",
      "Essential amino acids: Cannot be synthesized (9 types)",
      "Zwitterion: H₃N⁺-CHR-COO⁻ (dipolar ion)",
      "Isoelectric point (pI): pH where net charge is zero",
      "Peptide bond: -CO-NH- linkage between amino acids",
      "Proteins: Polymers of amino acids (polypeptides)",
      "Classification: Simple proteins, conjugated proteins"
    ],
    examples: [
      "Glycine: H₂N-CH₂-COOH (simplest)",
      "Alanine: CH₃-CH(NH₂)-COOH",
      "Essential: Valine, Leucine, Lysine, Phenylalanine",
      "Dipeptide: Gly-Ala (2 amino acids)",
      "Tripeptide: Gly-Ala-Ser (3 amino acids)"
    ],
    formulas: [
      "General: H₂N-CHR-COOH",
      "Peptide bond: -CO-NH-",
      "Zwitterion: ⁺H₃N-CHR-COO⁻"
    ]
  },
  {
    id: "protein-structure",
    title: "Protein Structure",
    description: "Four levels of protein structure organization.",
    keyPoints: [
      "Primary structure: Sequence of amino acids in chain",
      "Secondary structure: α-helix or β-pleated sheet (H-bonds)",
      "α-helix: Right-handed coil, stabilized by H-bonds",
      "β-sheet: Extended conformation, parallel/antiparallel",
      "Tertiary structure: 3D folding of protein chain",
      "Stabilized by: H-bonds, disulfide bridges, ionic, hydrophobic",
      "Quaternary structure: Multiple polypeptide chains",
      "Denaturation: Loss of structure (heat, pH, chemicals)"
    ],
    examples: [
      "Primary: Insulin (51 amino acids, 2 chains)",
      "Secondary: Keratin (α-helix), silk fibroin (β-sheet)",
      "Tertiary: Myoglobin (globular protein)",
      "Quaternary: Hemoglobin (4 subunits)",
      "Denaturation: Boiling egg white (albumin)"
    ]
  },
  {
    id: "enzymes",
    title: "Enzymes",
    description: "Biological catalysts and their mechanism of action.",
    keyPoints: [
      "Enzymes: Biological catalysts (mostly proteins)",
      "Highly specific for substrate (lock and key model)",
      "Active site: Region where substrate binds",
      "Enzyme-substrate complex: E + S ⇌ ES → E + P",
      "Cofactors: Non-protein helper molecules (metal ions)",
      "Coenzymes: Organic cofactors (vitamins)",
      "Optimum pH and temperature for activity",
      "Inhibitors: Competitive and non-competitive"
    ],
    examples: [
      "Amylase: Starch → Maltose",
      "Maltase: Maltose → Glucose",
      "Invertase: Sucrose → Glucose + Fructose",
      "Pepsin: Protein digestion (optimum pH ~2)",
      "Trypsin: Protein digestion (optimum pH ~8)"
    ]
  },
  {
    id: "nucleic-acids",
    title: "Nucleic Acids",
    description: "DNA and RNA - structure and functions.",
    keyPoints: [
      "Nucleotide: Base + Sugar + Phosphate",
      "Bases: Purines (A, G) and Pyrimidines (C, T, U)",
      "DNA: Deoxyribonucleic acid (sugar = deoxyribose)",
      "DNA bases: Adenine, Guanine, Cytosine, Thymine",
      "RNA: Ribonucleic acid (sugar = ribose)",
      "RNA bases: Adenine, Guanine, Cytosine, Uracil",
      "DNA structure: Double helix (Watson-Crick model)",
      "Base pairing: A=T (2 H-bonds), G≡C (3 H-bonds)"
    ],
    examples: [
      "DNA: Genetic information storage",
      "mRNA: Messenger RNA (carries genetic code)",
      "tRNA: Transfer RNA (brings amino acids)",
      "rRNA: Ribosomal RNA (protein synthesis)",
      "Chargaff's rule: [A] = [T], [G] = [C]"
    ],
    formulas: [
      "Nucleotide = Base + Pentose + Phosphate",
      "DNA: 2-deoxyribose sugar",
      "RNA: Ribose sugar"
    ]
  },
  {
    id: "vitamins-hormones",
    title: "Vitamins and Hormones",
    description: "Essential organic compounds and chemical messengers.",
    keyPoints: [
      "Vitamins: Organic compounds needed in small amounts",
      "Fat-soluble: A, D, E, K (stored in body)",
      "Water-soluble: B complex, C (not stored)",
      "Vitamin deficiency diseases: Specific disorders",
      "Hormones: Chemical messengers from endocrine glands",
      "Steroid hormones: Testosterone, estrogen, cortisol",
      "Peptide hormones: Insulin, growth hormone",
      "Amino acid derivatives: Thyroxine, adrenaline"
    ],
    examples: [
      "Vitamin A: Night blindness (deficiency)",
      "Vitamin C: Scurvy (deficiency)",
      "Vitamin D: Rickets (deficiency)",
      "Insulin: Regulates blood glucose",
      "Thyroxine: Controls metabolism",
      "Adrenaline: Fight or flight response"
    ]
  }
];



export function ChemistryChapter24() {
  // Fetch questions from database for Haloalkanes and Haloarenes (topicId: 58)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '58'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=58');
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
        <Dna className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 24: Biomolecules</h1>
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
                  <li>Carbohydrates: Classification, structure, and properties</li>
                  <li>Monosaccharides, disaccharides, and polysaccharides</li>
                  <li>Amino acids and peptide bond formation</li>
                  <li>Protein structure: Primary, secondary, tertiary, quaternary</li>
                  <li>Enzymes as biological catalysts</li>
                  <li>Nucleic acids: DNA and RNA structure</li>
                  <li>Vitamins and hormones</li>
                  <li>Importance in biological systems</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Concepts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Reducing vs non-reducing sugars</p>
                    <p>• Glycosidic linkages (α, β)</p>
                    <p>• Peptide bond formation</p>
                    <p>• DNA base pairing rules</p>
                    <p>• Enzyme specificity</p>
                    <p>• Vitamin deficiencies</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Remember</Badge>
                    <CardTitle className="text-lg">Quick Facts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Sucrose: Non-reducing</p>
                    <p>• Cellulose: β-1,4 linkage</p>
                    <p>• Glycine: Simplest amino acid</p>
                    <p>• A=T, G≡C in DNA</p>
                    <p>• RNA has uracil, not thymine</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter24Topics.map((topic, index) => (
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
              <CardTitle>Biomolecule Structures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Carbohydrate Classification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <p className="font-semibold mb-2">Monosaccharides</p>
                      <p className="text-xs">• Glucose (aldohexose)</p>
                      <p className="text-xs">• Fructose (ketohexose)</p>
                      <p className="text-xs">• Ribose (aldopentose)</p>
                      <Badge className="mt-2">Single unit</Badge>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                      <p className="font-semibold mb-2">Disaccharides</p>
                      <p className="text-xs">• Sucrose (Glu + Fru)</p>
                      <p className="text-xs">• Maltose (Glu + Glu)</p>
                      <p className="text-xs">• Lactose (Glu + Gal)</p>
                      <Badge variant="secondary" className="mt-2">Two units</Badge>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded">
                      <p className="font-semibold mb-2">Polysaccharides</p>
                      <p className="text-xs">• Starch (storage)</p>
                      <p className="text-xs">• Cellulose (structural)</p>
                      <p className="text-xs">• Glycogen (animal)</p>
                      <Badge variant="outline" className="mt-2">Many units</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Protein Structure Levels</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                      <p className="font-semibold">1° Primary</p>
                      <p className="text-xs mt-1">Amino acid sequence</p>
                      <p className="font-mono text-xs">-Gly-Ala-Val-Leu-</p>
                    </div>
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded">
                      <p className="font-semibold">2° Secondary</p>
                      <p className="text-xs mt-1">α-helix, β-sheet</p>
                      <p className="text-xs">H-bond stabilized</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded">
                      <p className="font-semibold">3° Tertiary</p>
                      <p className="text-xs mt-1">3D folding</p>
                      <p className="text-xs">Disulfide, H-bonds</p>
                    </div>
                    <div className="p-3 bg-pink-50 dark:bg-pink-950/20 rounded">
                      <p className="font-semibold">4° Quaternary</p>
                      <p className="text-xs mt-1">Multiple subunits</p>
                      <p className="text-xs">e.g., Hemoglobin</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardHeader>
                  <CardTitle>DNA Base Pairing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold mb-2">Purines (2 rings)</p>
                      <p className="font-mono">Adenine (A)</p>
                      <p className="font-mono">Guanine (G)</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold mb-2">Pyrimidines (1 ring)</p>
                      <p className="font-mono">Cytosine (C)</p>
                      <p className="font-mono">Thymine (T) - DNA</p>
                      <p className="font-mono">Uracil (U) - RNA</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded text-center">
                    <p className="font-semibold mb-3">Chargaff's Rules</p>
                    <p className="font-mono text-lg">A = T (2 H-bonds)</p>
                    <p className="font-mono text-lg">G ≡ C (3 H-bonds)</p>
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
