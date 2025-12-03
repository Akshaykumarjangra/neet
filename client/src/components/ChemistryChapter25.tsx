
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, TestTubes, Zap, Network , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter25Topics: Topic[] = [
  {
    id: "polymer-basics",
    title: "Introduction to Polymers",
    description: "Basic concepts, classification, and terminology of polymers.",
    keyPoints: [
      "Polymer: Large molecule made of repeating units (monomers)",
      "Monomer: Small molecule that can join to form polymer",
      "Degree of polymerization (n): Number of monomer units",
      "Macromolecule: Very large molecular mass (10³ to 10⁷)",
      "Classification by source: Natural, synthetic, semi-synthetic",
      "Classification by structure: Linear, branched, cross-linked",
      "Classification by mode: Addition and condensation polymers",
      "Classification by molecular forces: Elastomers, fibers, thermoplastics"
    ],
    examples: [
      "Natural: Starch, cellulose, proteins, rubber",
      "Synthetic: Polyethylene, PVC, nylon, bakelite",
      "Semi-synthetic: Cellulose acetate, vulcanized rubber",
      "Monomers: Ethylene → Polyethylene",
      "Monomers: Vinyl chloride → PVC"
    ]
  },
  {
    id: "addition-polymers",
    title: "Addition Polymers",
    description: "Polymers formed by addition of monomers without loss of molecules.",
    keyPoints: [
      "Addition polymerization: Monomers add without byproduct",
      "Requires unsaturated monomers (C=C double bond)",
      "Free radical mechanism: Initiation, propagation, termination",
      "Polyethylene (PE): n(CH₂=CH₂) → -(CH₂-CH₂)ₙ-",
      "Polypropylene (PP): n(CH₂=CH-CH₃) → -(CH₂-CH(CH₃))ₙ-",
      "Polyvinyl chloride (PVC): n(CH₂=CHCl) → -(CH₂-CHCl)ₙ-",
      "Polystyrene (PS): n(CH₂=CH-C₆H₅) → -(CH₂-CH(C₆H₅))ₙ-",
      "Teflon: n(CF₂=CF₂) → -(CF₂-CF₂)ₙ-"
    ],
    examples: [
      "LDPE: Low density polyethylene (branched, soft)",
      "HDPE: High density polyethylene (linear, hard)",
      "PVC: Pipes, flooring, electrical insulation",
      "Polystyrene: Packaging, insulation",
      "Teflon: Non-stick cookware, lubricant"
    ],
    formulas: [
      "n(CH₂=CH₂) → -(CH₂-CH₂)ₙ-",
      "n(CH₂=CHCl) → -(CH₂-CHCl)ₙ-"
    ]
  },
  {
    id: "condensation-polymers",
    title: "Condensation Polymers",
    description: "Polymers formed by condensation with elimination of small molecules.",
    keyPoints: [
      "Condensation polymerization: Loss of small molecule (H₂O, HCl)",
      "Requires bifunctional or polyfunctional monomers",
      "Nylon-6,6: Hexamethylenediamine + Adipic acid",
      "Nylon-6: Self-condensation of caprolactam",
      "Terylene (Dacron): Ethylene glycol + Terephthalic acid",
      "Bakelite: Phenol + Formaldehyde (cross-linked)",
      "Melamine formaldehyde: Melamine + Formaldehyde",
      "Polyesters and polyamides are condensation polymers"
    ],
    examples: [
      "Nylon-6,6: Synthetic fibers, ropes, textiles",
      "Terylene: Fabrics, bottles (PET)",
      "Bakelite: Electrical switches, handles (thermosetting)",
      "Glyptal: Paints and lacquers",
      "Melamine: Laminated sheets, utensils"
    ],
    formulas: [
      "Nylon-6,6: n[H₂N-(CH₂)₆-NH₂] + n[HOOC-(CH₂)₄-COOH] → Polymer + 2nH₂O",
      "Terylene: n[HO-CH₂CH₂-OH] + n[HOOC-C₆H₄-COOH] → Polymer + 2nH₂O"
    ]
  },
  {
    id: "rubber",
    title: "Natural and Synthetic Rubber",
    description: "Structure, vulcanization, and types of rubber.",
    keyPoints: [
      "Natural rubber: Polyisoprene (cis-1,4-polyisoprene)",
      "Monomer: Isoprene (2-methyl-1,3-butadiene)",
      "Vulcanization: Cross-linking with sulfur (1-3%)",
      "Vulcanization improves strength and elasticity",
      "Synthetic rubber: Neoprene, Buna-S, Buna-N",
      "Buna-S: Butadiene + Styrene (copolymer)",
      "Buna-N: Butadiene + Acrylonitrile (oil-resistant)",
      "Neoprene: Polymerization of chloroprene"
    ],
    examples: [
      "Natural rubber: Latex from rubber tree (Hevea)",
      "Vulcanized rubber: Tyres, tubes, footwear",
      "Buna-S: Car tyres (styrene-butadiene rubber)",
      "Buna-N: Fuel hoses, seals (nitrile rubber)",
      "Neoprene: Gaskets, corrosion-resistant products"
    ],
    formulas: [
      "Isoprene: CH₂=C(CH₃)-CH=CH₂",
      "Natural rubber: -(CH₂-C(CH₃)=CH-CH₂)ₙ-"
    ]
  },
  {
    id: "types-by-structure",
    title: "Classification by Molecular Forces",
    description: "Elastomers, fibers, thermoplastics, and thermosetting polymers.",
    keyPoints: [
      "Elastomers: Weak intermolecular forces, elastic (rubber)",
      "Can be stretched and return to original shape",
      "Fibers: Strong H-bonds/dipole interactions, high tensile strength",
      "Fibers have crystalline nature (nylon, polyester)",
      "Thermoplastics: Softens on heating, hardens on cooling",
      "Can be remolded (PVC, polythene, polystyrene)",
      "Thermosetting: Cross-linked, cannot be remelted",
      "Irreversibly hardened on heating (bakelite, melamine)"
    ],
    examples: [
      "Elastomers: Natural rubber, neoprene, Buna-S",
      "Fibers: Nylon-6,6, terylene, orlon",
      "Thermoplastics: PVC, polythene, polystyrene",
      "Thermosetting: Bakelite, melamine, urea-formaldehyde"
    ]
  },
  {
    id: "biodegradable-polymers",
    title: "Biodegradable Polymers",
    description: "Environmentally friendly polymers that can decompose.",
    keyPoints: [
      "Biodegradable: Can be broken down by microorganisms",
      "PHBV: Poly-β-hydroxybutyrate-co-β-hydroxyvalerate",
      "Produced by bacteria, used in packaging",
      "Nylon-2-nylon-6: Condensation of amino acids",
      "Aliphatic polyesters: Degradable by hydrolysis",
      "PLA: Polylactic acid (from corn starch)",
      "Important for reducing plastic waste",
      "Applications: Medical sutures, drug delivery, packaging"
    ],
    examples: [
      "PHBV: Biodegradable packaging material",
      "Nylon-2-nylon-6: Biodegradable fiber",
      "PLA: Food packaging, disposable utensils",
      "Starch-based polymers: Shopping bags"
    ]
  },
  {
    id: "common-polymers",
    title: "Important Commercial Polymers",
    description: "Widely used synthetic polymers and their applications.",
    keyPoints: [
      "Polyethylene (PE): Most common plastic, bags, bottles",
      "PVC: Construction, pipes, medical equipment",
      "Polypropylene (PP): Ropes, carpets, bottles",
      "Polystyrene (PS): Packaging, disposable cups",
      "Teflon (PTFE): Non-stick coating, chemically inert",
      "Nylon: Textiles, ropes, machine parts",
      "PET (Terylene): Bottles, fabrics",
      "Bakelite: Electrical switches, handles"
    ],
    examples: [
      "LDPE: Plastic bags, squeeze bottles",
      "HDPE: Milk jugs, detergent bottles",
      "PVC: Water pipes, window frames",
      "Nylon-6,6: Stockings, parachutes",
      "PET: Soft drink bottles, polyester fabrics"
    ]
  },
  {
    id: "polymer-properties",
    title: "Properties and Uses",
    description: "Physical and chemical properties determining polymer applications.",
    keyPoints: [
      "Molecular weight: Higher MW = stronger polymer",
      "Crystallinity: Affects strength, transparency, density",
      "Glass transition temperature (Tg): Below = glassy, above = rubbery",
      "Tensile strength: Resistance to breaking under tension",
      "Thermal stability: Resistance to heat degradation",
      "Chemical resistance: Inertness to chemicals",
      "Flexibility: Depends on chain structure and cross-linking",
      "Recyclability: Thermoplastics recyclable, thermosetting not"
    ],
    examples: [
      "High crystallinity: HDPE (rigid, opaque)",
      "Low crystallinity: LDPE (flexible, transparent)",
      "High Tg: Rigid at room temperature (PS)",
      "Low Tg: Flexible at room temperature (rubber)",
      "Recyclable: PET, HDPE, LDPE, PP, PS"
    ]
  }
];



export function ChemistryChapter25() {
  // Fetch questions from database for Alcohols, Phenols and Ethers (topicId: 59)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '59'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=59');
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
        <Network className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 25: Polymers</h1>
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
            Types
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
                  <li>Basic concepts: Monomers, polymers, polymerization</li>
                  <li>Addition polymers: Polyethylene, PVC, polystyrene, teflon</li>
                  <li>Condensation polymers: Nylon, terylene, bakelite</li>
                  <li>Natural and synthetic rubber</li>
                  <li>Classification by molecular forces: Elastomers, fibers, plastics</li>
                  <li>Biodegradable polymers and environmental concerns</li>
                  <li>Important commercial polymers and applications</li>
                  <li>Properties determining polymer uses</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Polymers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Polyethylene (addition)</p>
                    <p>• PVC (addition)</p>
                    <p>• Nylon-6,6 (condensation)</p>
                    <p>• Terylene (condensation)</p>
                    <p>• Bakelite (thermosetting)</p>
                    <p>• Natural rubber (isoprene)</p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Classifications</Badge>
                    <CardTitle className="text-lg">Types</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Addition vs Condensation</p>
                    <p>• Thermoplastic vs Thermosetting</p>
                    <p>• Elastomers vs Fibers</p>
                    <p>• Natural vs Synthetic</p>
                    <p>• Biodegradable polymers</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter25Topics.map((topic, index) => (
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
                            Polymerization Reactions
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
                        <h4 className="font-semibold mb-3">Examples & Applications</h4>
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
              <CardTitle>Polymer Classifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">By Polymerization Type</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <p className="font-semibold mb-2">Addition Polymers</p>
                      <p className="text-xs">• No byproduct formed</p>
                      <p className="text-xs">• Unsaturated monomers</p>
                      <p className="font-mono text-xs mt-2">Examples:</p>
                      <p className="text-xs">PE, PVC, PS, Teflon</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                      <p className="font-semibold mb-2">Condensation Polymers</p>
                      <p className="text-xs">• Small molecule eliminated</p>
                      <p className="text-xs">• Bifunctional monomers</p>
                      <p className="font-mono text-xs mt-2">Examples:</p>
                      <p className="text-xs">Nylon, Terylene, Bakelite</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">By Thermal Behavior</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded">
                      <p className="font-semibold mb-2">Thermoplastic</p>
                      <p className="text-xs">• Softens on heating</p>
                      <p className="text-xs">• Can be remolded</p>
                      <p className="font-mono text-xs mt-2">Examples:</p>
                      <p className="text-xs">PVC, PE, PS, Nylon</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded">
                      <p className="font-semibold mb-2">Thermosetting</p>
                      <p className="text-xs">• Cross-linked structure</p>
                      <p className="text-xs">• Cannot remelt</p>
                      <p className="font-mono text-xs mt-2">Examples:</p>
                      <p className="text-xs">Bakelite, Melamine, Urea-formaldehyde</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardHeader>
                  <CardTitle>By Molecular Forces</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold mb-2">Elastomers</p>
                      <p className="text-xs mb-2">Weak intermolecular forces</p>
                      <p className="text-xs mb-2">Elastic, can stretch</p>
                      <Badge variant="outline" className="mt-2">Rubber, Neoprene</Badge>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold mb-2">Fibers</p>
                      <p className="text-xs mb-2">Strong H-bonds</p>
                      <p className="text-xs mb-2">High tensile strength</p>
                      <Badge variant="outline" className="mt-2">Nylon, Terylene</Badge>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded">
                      <p className="font-semibold mb-2">Thermoplastics</p>
                      <p className="text-xs mb-2">Intermediate forces</p>
                      <p className="text-xs mb-2">Moldable</p>
                      <Badge variant="outline" className="mt-2">PVC, PE, PS</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Common Polymers & Uses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 border rounded">
                      <p className="font-semibold">LDPE</p>
                      <p className="text-xs">Plastic bags, squeeze bottles</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="font-semibold">HDPE</p>
                      <p className="text-xs">Milk jugs, detergent bottles</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="font-semibold">PVC</p>
                      <p className="text-xs">Pipes, flooring, insulation</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="font-semibold">Polystyrene</p>
                      <p className="text-xs">Packaging foam, cups</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="font-semibold">Teflon</p>
                      <p className="text-xs">Non-stick cookware</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="font-semibold">Nylon-6,6</p>
                      <p className="text-xs">Textiles, ropes, gears</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="font-semibold">PET</p>
                      <p className="text-xs">Bottles, polyester fabrics</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="font-semibold">Bakelite</p>
                      <p className="text-xs">Electrical switches, handles</p>
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
