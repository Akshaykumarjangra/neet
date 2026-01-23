
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dna, CheckCircle2, XCircle, Brain, Lightbulb, BookOpen , Loader2 } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
export function BotanyChapter13() {
  // Fetch questions from database for Reproduction in Organisms (topicId: 77)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '77'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=77');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: "In a monohybrid cross between two heterozygous plants (Tt × Tt), what is the phenotypic ratio in F₂ generation?",
      options: ["1:2:1", "3:1", "9:3:3:1", "1:1"],
      correctAnswer: "B",
      explanation: "In a monohybrid cross (Tt × Tt), the F₂ generation shows a 3:1 phenotypic ratio (3 tall : 1 dwarf), following Mendel's Law of Dominance."
    },
    {
      id: 2,
      question: "The law of independent assortment is applicable to genes located on:",
      options: ["Same chromosome", "Different chromosomes", "Sex chromosomes only", "Homologous chromosomes"],
      correctAnswer: "B",
      explanation: "The law of independent assortment applies to genes located on different (non-homologous) chromosomes, as they segregate independently during meiosis."
    },
    {
      id: 3,
      question: "In incomplete dominance, the F₁ hybrid shows:",
      options: [
        "Dominant phenotype",
        "Recessive phenotype",
        "Intermediate phenotype",
        "Both parental phenotypes"
      ],
      correctAnswer: "C",
      explanation: "In incomplete dominance, the heterozygous F₁ shows an intermediate phenotype. Example: Red × White = Pink in snapdragon (Antirrhinum)."
    },
    {
      id: 4,
      question: "A test cross is performed between:",
      options: [
        "F₁ hybrid and dominant parent",
        "F₁ hybrid and recessive parent",
        "Two F₁ hybrids",
        "Two homozygous dominant parents"
      ],
      correctAnswer: "B",
      explanation: "A test cross is performed between an organism with unknown genotype (usually F₁) and a homozygous recessive parent to determine the genotype."
    },
    {
      id: 5,
      question: "The phenotypic ratio of a dihybrid cross (F₂) is:",
      options: ["3:1", "1:2:1", "9:3:3:1", "1:1:1:1"],
      correctAnswer: "C",
      explanation: "A dihybrid cross between two heterozygous individuals (AaBb × AaBb) gives a 9:3:3:1 phenotypic ratio in the F₂ generation."
    },
    {
      id: 6,
      question: "Multiple alleles control human ABO blood group system. How many alleles control this trait?",
      options: ["2", "3", "4", "6"],
      correctAnswer: "B",
      explanation: "Three alleles (Iᴬ, Iᴮ, and i) control the ABO blood group system, though an individual can have only two of these alleles."
    },
    {
      id: 7,
      question: "Chromosomal theory of inheritance was proposed by:",
      options: [
        "Mendel",
        "Sutton and Boveri",
        "Morgan",
        "Watson and Crick"
      ],
      correctAnswer: "B",
      explanation: "The chromosomal theory of inheritance was proposed by Walter Sutton and Theodor Boveri (1902), correlating Mendel's laws with chromosome behavior."
    },
    {
      id: 8,
      question: "Linkage was discovered by:",
      options: ["Mendel", "Morgan", "Bateson and Punnett", "Sutton"],
      correctAnswer: "C",
      explanation: "Linkage was first discovered by Bateson and Punnett in sweet pea, but T.H. Morgan provided experimental evidence using Drosophila."
    },
    {
      id: 9,
      question: "The distance between two genes on a chromosome is measured in:",
      options: ["Angstroms", "Map units (centiMorgans)", "Nanometers", "Micrometers"],
      correctAnswer: "B",
      explanation: "Map distance is measured in map units or centiMorgans (cM). 1 map unit = 1% recombination frequency between two genes."
    },
    {
      id: 10,
      question: "Which type of chromosomal aberration involves loss of a chromosome segment?",
      options: ["Duplication", "Deletion", "Inversion", "Translocation"],
      correctAnswer: "B",
      explanation: "Deletion is the loss of a segment of chromosome. It can be terminal (at the end) or intercalary (in the middle)."
    }
  ];

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
    setShowExplanations({ ...showExplanations, [questionId]: false });
  };

  const handleCheckAnswer = (questionId: number) => {
    setShowExplanations({ ...showExplanations, [questionId]: true });
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (String.fromCharCode(65 + (selectedAnswers[q.id] ?? -1)) === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setQuizComplete(true);
    const allExplanations: { [key: number]: boolean } = {};
    questions.forEach((q) => {
      allExplanations[q.id] = true;
    });
    setShowExplanations(allExplanations);
  };

  const progressPercentage = (Object.keys(selectedAnswers).length / questions.length) * 100;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 gradient-mesh-bg min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-violet-700 to-indigo-800 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Dna className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Principles of Inheritance and Variation</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understand Mendel's laws, chromosomal theory, linkage, and genetic variations
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mb-24" />
      </div>

      {/* Learning Objectives */}
      <Card className="glass-panel glow-halo float-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Understand Mendel's laws and monohybrid/dihybrid crosses</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Learn chromosomal theory of inheritance</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Master linkage and crossing over concepts</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Understand chromosomal aberrations and variations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="concepts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
          <TabsTrigger value="laws">Mendel's Laws</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Key Concepts */}
        <TabsContent value="concepts" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-purple-600" />
                Fundamental Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Gene & Allele</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Gene: Unit of inheritance</li>
                    <li>• Allele: Alternative forms of a gene</li>
                    <li>• Example: T (tall) and t (dwarf) are alleles</li>
                  </ul>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-2">Genotype & Phenotype</h4>
                  <ul className="text-sm text-indigo-800 space-y-1">
                    <li>• Genotype: Genetic makeup (TT, Tt, tt)</li>
                    <li>• Phenotype: Physical expression (Tall, Dwarf)</li>
                    <li>• Phenotype = Genotype + Environment</li>
                  </ul>
                </div>
                <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
                  <h4 className="font-semibold text-violet-900 mb-2">Homozygous & Heterozygous</h4>
                  <ul className="text-sm text-violet-800 space-y-1">
                    <li>• Homozygous: Same alleles (TT or tt)</li>
                    <li>• Heterozygous: Different alleles (Tt)</li>
                    <li>• Pure line vs Hybrid</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Dominant & Recessive</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Dominant: Expresses in heterozygous (T)</li>
                    <li>• Recessive: Expresses only in homozygous (t)</li>
                    <li>• Represented by capital and small letters</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Chromosomal Theory of Inheritance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3">Sutton-Boveri Theory (1902)</h4>
                <div className="space-y-2 text-sm text-purple-800">
                  <p>• Chromosomes are carriers of hereditary information</p>
                  <p>• Genes are located on chromosomes in linear order</p>
                  <p>• Pairing and separation of homologous chromosomes during meiosis explains Mendel's laws</p>
                  <p>• Chromosome behavior parallels gene behavior</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Evidence Supporting Theory</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Chromosomes occur in pairs (like alleles)</li>
                    <li>• Segregation during meiosis</li>
                    <li>• Independent assortment of non-homologous chromosomes</li>
                    <li>• Morgan's Drosophila experiments</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Morgan's Contribution</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Used Drosophila melanogaster (fruit fly)</li>
                    <li>• Discovered sex-linked inheritance</li>
                    <li>• Proved genes are on chromosomes</li>
                    <li>• Developed concept of linkage</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Linkage and Crossing Over</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2">Linkage</h4>
                <p className="text-sm text-orange-800 mb-2">
                  Physical association of genes on the same chromosome that tend to be inherited together.
                </p>
                <div className="grid md:grid-cols-2 gap-2 mt-3">
                  <div className="p-2 bg-white rounded">
                    <p className="font-semibold text-xs">Complete Linkage</p>
                    <p className="text-xs text-muted-foreground">Genes always inherited together (no crossing over)</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <p className="font-semibold text-xs">Incomplete Linkage</p>
                    <p className="text-xs text-muted-foreground">Some recombination due to crossing over</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">Crossing Over</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Exchange of segments between non-sister chromatids of homologous chromosomes</li>
                  <li>• Occurs during Prophase I of meiosis</li>
                  <li>• Results in recombination of linked genes</li>
                  <li>• Frequency proportional to distance between genes</li>
                  <li>• 1% recombination = 1 map unit (centiMorgan)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mendel's Laws */}
        <TabsContent value="laws" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Law of Dominance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900 mb-3">
                  In a cross between contrasting characters, only one character expresses itself in F₁ (dominant), 
                  while the other remains hidden (recessive).
                </p>
                <div className="p-3 bg-white rounded border border-blue-300">
                  <p className="font-mono text-sm">
                    <strong>Example:</strong> TT (Tall) × tt (Dwarf) → F₁: All Tt (Tall)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Law of Segregation (Purity of Gametes)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-green-900 mb-3">
                  Alleles of a gene separate during gamete formation and each gamete receives only one allele.
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-white rounded border border-green-300">
                    <p className="font-mono text-sm mb-1"><strong>Monohybrid Cross:</strong></p>
                    <p className="font-mono text-xs">Tt × Tt → Gametes: (T, t) × (T, t)</p>
                    <p className="font-mono text-xs">F₂: TT, Tt, Tt, tt</p>
                    <p className="font-mono text-xs">Genotypic ratio: 1:2:1</p>
                    <p className="font-mono text-xs">Phenotypic ratio: 3:1</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Law of Independent Assortment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-900 mb-3">
                  When two pairs of contrasting characters are considered together, their inheritance is independent of each other.
                </p>
                <div className="p-3 bg-white rounded border border-purple-300">
                  <p className="font-mono text-sm mb-1"><strong>Dihybrid Cross:</strong></p>
                  <p className="font-mono text-xs">RrYy × RrYy (Round Yellow × Round Yellow)</p>
                  <p className="font-mono text-xs">Gametes: RY, Ry, rY, ry from each parent</p>
                  <p className="font-mono text-xs">F₂ Phenotypic ratio: 9:3:3:1</p>
                  <p className="font-mono text-xs">9 Round Yellow : 3 Round Green : 3 Wrinkled Yellow : 1 Wrinkled Green</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Examples */}
        <TabsContent value="examples" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                Deviations from Mendelian Ratios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-600">
                  <h4 className="font-semibold text-pink-900 mb-2">Incomplete Dominance</h4>
                  <p className="text-sm text-pink-800 mb-2">F₁ shows intermediate phenotype</p>
                  <p className="text-xs text-pink-700 font-mono">
                    <strong>Example:</strong> Snapdragon (Antirrhinum)<br/>
                    Red (RR) × White (rr) → Pink (Rr)<br/>
                    F₂ ratio: 1 Red : 2 Pink : 1 White
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-semibold text-blue-900 mb-2">Co-dominance</h4>
                  <p className="text-sm text-blue-800 mb-2">Both alleles express equally</p>
                  <p className="text-xs text-blue-700 font-mono">
                    <strong>Example:</strong> ABO Blood Group<br/>
                    Iᴬ and Iᴮ are co-dominant<br/>
                    IᴬIᴮ → AB blood group
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-semibold text-green-900 mb-2">Multiple Alleles</h4>
                  <p className="text-sm text-green-800 mb-2">More than 2 allelic forms</p>
                  <p className="text-xs text-green-700 font-mono">
                    <strong>Example:</strong> ABO Blood Group<br/>
                    Iᴬ, Iᴮ, i (3 alleles)<br/>
                    Possible genotypes: IᴬIᴬ, IᴬIᴮ, IᴮIᴮ, Iᴬi, Iᴮi, ii
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                  <h4 className="font-semibold text-purple-900 mb-2">Pleiotropy</h4>
                  <p className="text-sm text-purple-800 mb-2">One gene affects multiple traits</p>
                  <p className="text-xs text-purple-700 font-mono">
                    <strong>Example:</strong> Phenylketonuria<br/>
                    Single gene mutation affects:<br/>
                    - Mental retardation<br/>
                    - Hair/skin pigmentation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Chromosomal Aberrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-2">Deletion</h4>
                  <p className="text-sm text-red-800">Loss of chromosome segment</p>
                  <p className="text-xs text-red-700 mt-1">Example: Cri-du-chat syndrome</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-2">Duplication</h4>
                  <p className="text-sm text-orange-800">Repetition of chromosome segment</p>
                  <p className="text-xs text-orange-700 mt-1">Can lead to gene dosage imbalance</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Inversion</h4>
                  <p className="text-sm text-yellow-800">Reversal of chromosome segment</p>
                  <p className="text-xs text-yellow-700 mt-1">Changes gene sequence</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Translocation</h4>
                  <p className="text-sm text-green-800">Transfer of segment to non-homologous chromosome</p>
                  <p className="text-xs text-green-700 mt-1">Example: Chronic myeloid leukemia</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Practice Quiz */}
        <TabsContent value="quiz" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Practice Questions</CardTitle>
                <Badge variant="secondary">
                  {Object.keys(selectedAnswers).length}/{questions.length} Answered
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Progress value={progressPercentage} className="mb-4" />

              {questions.map((q, index) => (
                <div key={q.id} className="p-6 bg-muted/50 rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg">Q{index + 1}. {getQuestionLabel(q)}</h3>
                  <div className="space-y-2">
                    {q.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(q.id, idx)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                          selectedAnswers[q.id] === idx
                            ? showExplanations[q.id]
                              ? String.fromCharCode(65 + idx) === q.correctAnswer
                                ? "border-green-500 bg-green-50"
                                : "border-red-500 bg-red-50"
                              : "border-primary bg-primary/5"
                            : "border-muted hover:border-muted-foreground/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {showExplanations[q.id] && String.fromCharCode(65 + idx) === q.correctAnswer && (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          )}
                          {showExplanations[q.id] && selectedAnswers[q.id] === idx && String.fromCharCode(65 + idx) !== q.correctAnswer && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <span>{getOptionLabel(option)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {selectedAnswers[q.id] !== undefined && !showExplanations[q.id] && (
                    <Button onClick={() => handleCheckAnswer(q.id)} className="w-full">
                      Check Answer
                    </Button>
                  )}

                  {showExplanations[q.id] && (
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <p className="text-sm text-blue-900">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {Object.keys(selectedAnswers).length === questions.length && !quizComplete && (
                <Button onClick={handleSubmitQuiz} className="w-full" size="lg">
                  Submit Quiz
                </Button>
              )}

              {quizComplete && (
                <Card className="border-2 border-primary glass-panel glow-halo float-medium">
                  <CardHeader>
                    <CardTitle className="text-center">Quiz Complete! 🎉</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <p className="text-3xl font-bold text-primary">{score}/{questions.length}</p>
                      <p className="text-muted-foreground">
                        {score === questions.length ? "Perfect Score!" : score >= questions.length * 0.7 ? "Great Job!" : "Keep Practicing!"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
