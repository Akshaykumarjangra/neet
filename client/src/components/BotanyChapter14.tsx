import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dna, CheckCircle2, XCircle, Brain, Lightbulb, BookOpen , Loader2 } from "lucide-react";

export function BotanyChapter14() {
  // Fetch questions from database for Sexual Reproduction in Flowering Plants (topicId: 78)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '78'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=78');
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
      question: "The DNA molecule is a double helix composed of:",
      options: [
        "Two parallel polynucleotide chains",
        "Two antiparallel polynucleotide chains",
        "Three parallel chains",
        "Single polynucleotide chain"
      ],
      correctAnswer: 1,
      explanation: "DNA consists of two antiparallel polynucleotide chains (one runs 5'→3', other runs 3'→5') held together by hydrogen bonds between complementary bases."
    },
    {
      id: 2,
      question: "According to Chargaff's rule:",
      options: [
        "A = T and G = C",
        "A = G and T = C",
        "A + T = G + C",
        "A = C and G = T"
      ],
      correctAnswer: 0,
      explanation: "Chargaff's rule states that in DNA, the amount of adenine equals thymine (A=T) and amount of guanine equals cytosine (G=C)."
    },
    {
      id: 3,
      question: "Which enzyme joins Okazaki fragments during DNA replication?",
      options: ["DNA polymerase", "DNA ligase", "Helicase", "Primase"],
      correctAnswer: 1,
      explanation: "DNA ligase joins the Okazaki fragments on the lagging strand by forming phosphodiester bonds between adjacent nucleotides."
    },
    {
      id: 4,
      question: "The genetic code is said to be degenerate because:",
      options: [
        "One codon codes for multiple amino acids",
        "Multiple codons code for the same amino acid",
        "Some codons don't code for any amino acid",
        "Codons overlap with each other"
      ],
      correctAnswer: 1,
      explanation: "The genetic code is degenerate because multiple codons can code for the same amino acid. For example, leucine is coded by 6 different codons."
    },
    {
      id: 5,
      question: "The enzyme that catalyzes transcription is:",
      options: [
        "DNA polymerase",
        "RNA polymerase",
        "DNA ligase",
        "Reverse transcriptase"
      ],
      correctAnswer: 1,
      explanation: "RNA polymerase catalyzes the synthesis of RNA from DNA template during transcription."
    },
    {
      id: 6,
      question: "The anticodon of tRNA pairs with:",
      options: [
        "DNA template strand",
        "mRNA codon",
        "Another tRNA",
        "rRNA"
      ],
      correctAnswer: 1,
      explanation: "The anticodon (3 nucleotide sequence) on tRNA pairs with the complementary codon on mRNA during translation."
    },
    {
      id: 7,
      question: "The lac operon is an example of:",
      options: [
        "Positive gene regulation",
        "Negative gene regulation",
        "Post-transcriptional regulation",
        "Post-translational regulation"
      ],
      correctAnswer: 1,
      explanation: "The lac operon is a classic example of negative gene regulation where the repressor protein blocks transcription in the absence of lactose."
    },
    {
      id: 8,
      question: "In eukaryotes, transcription occurs in:",
      options: ["Cytoplasm", "Nucleus", "Ribosome", "Mitochondria"],
      correctAnswer: 1,
      explanation: "In eukaryotes, transcription (DNA→RNA) occurs in the nucleus, while translation (RNA→Protein) occurs in the cytoplasm on ribosomes."
    },
    {
      id: 9,
      question: "The process of removal of introns and joining of exons is called:",
      options: ["Capping", "Tailing", "Splicing", "Editing"],
      correctAnswer: 2,
      explanation: "Splicing is the process where introns (non-coding sequences) are removed and exons (coding sequences) are joined together during RNA processing in eukaryotes."
    },
    {
      id: 10,
      question: "The Human Genome Project was completed in:",
      options: ["1990", "2000", "2003", "2010"],
      correctAnswer: 2,
      explanation: "The Human Genome Project was completed in 2003, revealing that humans have approximately 3 billion base pairs and about 20,000-25,000 genes."
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
      if (selectedAnswers[q.id] === q.correctAnswer) {
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-700 to-teal-800 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Dna className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Molecular Basis of Inheritance</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understand DNA structure, replication, transcription, translation, and gene regulation
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mb-24" />
      </div>

      {/* Learning Objectives */}
      <Card className="glass-panel glow-halo float-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p>Understand DNA structure and replication mechanism</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p>Learn genetic code and protein synthesis</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p>Master transcription and translation processes</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p>Understand gene regulation and Human Genome Project</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="concepts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="concepts">DNA Structure</TabsTrigger>
          <TabsTrigger value="processes">Central Dogma</TabsTrigger>
          <TabsTrigger value="regulation">Gene Regulation</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* DNA Structure */}
        <TabsContent value="concepts" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                DNA Structure (Watson-Crick Model)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Double Helix Model (1953)</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-blue-800"><strong>Structure Features:</strong></p>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Two antiparallel polynucleotide chains</li>
                      <li>• Right-handed helix</li>
                      <li>• Diameter: 20 Å (2 nm)</li>
                      <li>• Pitch: 34 Å (10 base pairs per turn)</li>
                      <li>• Distance between bases: 3.4 Å</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-blue-800"><strong>Chemical Composition:</strong></p>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Sugar: Deoxyribose</li>
                      <li>• Phosphate group</li>
                      <li>• Nitrogenous bases: A, T, G, C</li>
                      <li>• Sugar-phosphate backbone (outside)</li>
                      <li>• Bases inside (H-bonded)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Base Pairing Rules</h4>
                  <div className="space-y-2 text-sm text-purple-800">
                    <p><strong>Adenine (A) ≡ Thymine (T)</strong></p>
                    <p className="text-xs ml-4">2 hydrogen bonds</p>
                    <p className="mt-2"><strong>Guanine (G) ≡ Cytosine (C)</strong></p>
                    <p className="text-xs ml-4">3 hydrogen bonds</p>
                    <p className="mt-2 text-xs italic">Complementary base pairing (Chargaff's rule)</p>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">DNA Packaging</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• DNA + Histone proteins = Nucleosome</li>
                    <li>• Nucleosome = DNA (147 bp) + Histone octamer</li>
                    <li>• Nucleosomes → Chromatin → Chromosome</li>
                    <li>• Allows 2m DNA to fit in nucleus</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>DNA Replication (Semi-conservative)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-3">Meselson-Stahl Experiment (1958)</h4>
                <p className="text-sm text-amber-800 mb-2">
                  Proved that DNA replication is semi-conservative (each new DNA has one old strand and one new strand).
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Replication Process:</h4>
                {[
                  { step: 1, title: "Initiation", desc: "Helicase unwinds DNA at origin of replication, forming replication fork" },
                  { step: 2, title: "Unwinding", desc: "Topoisomerase relieves tension, SSB proteins stabilize single strands" },
                  { step: 3, title: "Primer Synthesis", desc: "Primase synthesizes short RNA primers (10-60 nucleotides)" },
                  { step: 4, title: "Elongation", desc: "DNA polymerase III adds nucleotides in 5'→3' direction" },
                  { step: 5, title: "Leading Strand", desc: "Continuous synthesis in 5'→3' direction" },
                  { step: 6, title: "Lagging Strand", desc: "Discontinuous synthesis forming Okazaki fragments" },
                  { step: 7, title: "Primer Removal", desc: "DNA polymerase I removes RNA primers, fills gaps" },
                  { step: 8, title: "Ligation", desc: "DNA ligase joins Okazaki fragments" }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-blue-800">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Central Dogma */}
        <TabsContent value="processes" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Central Dogma of Molecular Biology</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                <div className="text-center font-mono text-lg font-bold text-purple-900">
                  DNA → RNA → Protein
                </div>
                <p className="text-center text-sm text-purple-800 mt-2">(Transcription) (Translation)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Transcription (DNA → RNA)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { step: 1, title: "Initiation", desc: "RNA polymerase binds to promoter region on DNA" },
                  { step: 2, title: "Elongation", desc: "RNA polymerase synthesizes RNA in 5'→3' direction using template strand (3'→5')" },
                  { step: 3, title: "Termination", desc: "Transcription stops at terminator sequence" }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900">{item.title}</h4>
                      <p className="text-sm text-green-800">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">RNA Processing (Eukaryotes only)</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• <strong>5' Capping:</strong> 7-methylguanosine cap added</li>
                  <li>• <strong>3' Polyadenylation:</strong> Poly-A tail (200-300 adenine) added</li>
                  <li>• <strong>Splicing:</strong> Introns removed, exons joined</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Translation (RNA → Protein)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2">The Genetic Code</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="text-sm text-orange-800 space-y-1">
                    <p>• Triplet code (3 bases = 1 codon)</p>
                    <p>• 64 codons (4³ combinations)</p>
                    <p>• 61 code for amino acids</p>
                    <p>• 3 stop codons (UAA, UAG, UGA)</p>
                  </div>
                  <div className="text-sm text-orange-800 space-y-1">
                    <p>• <strong>Universal:</strong> same in all organisms</p>
                    <p>• <strong>Degenerate:</strong> multiple codons for same AA</p>
                    <p>• <strong>Unambiguous:</strong> one codon = one AA</p>
                    <p>• Start codon: AUG (Methionine)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Translation Steps:</h4>
                {[
                  { step: 1, title: "Initiation", desc: "Ribosome binds to mRNA at start codon (AUG), tRNA brings methionine" },
                  { step: 2, title: "Elongation", desc: "tRNA brings amino acids according to codons, peptide bonds form" },
                  { step: 3, title: "Termination", desc: "Stop codon (UAA/UAG/UGA) reached, release factors cause ribosome to dissociate" }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-900">{item.title}</h4>
                      <p className="text-sm text-indigo-800">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gene Regulation */}
        <TabsContent value="regulation" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                Lac Operon (Jacob-Monod Model)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Components</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>Regulatory gene (i):</strong> Produces repressor protein</li>
                  <li>• <strong>Promoter (P):</strong> RNA polymerase binding site</li>
                  <li>• <strong>Operator (O):</strong> Repressor binding site</li>
                  <li>• <strong>Structural genes:</strong> z (β-galactosidase), y (permease), a (transacetylase)</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
                  <h4 className="font-semibold text-red-900 mb-2">Lactose Absent (OFF)</h4>
                  <p className="text-sm text-red-800">
                    Repressor binds to operator → blocks RNA polymerase → genes not transcribed
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-semibold text-green-900 mb-2">Lactose Present (ON)</h4>
                  <p className="text-sm text-green-800">
                    Lactose (inducer) binds repressor → repressor inactive → genes transcribed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Human Genome Project (HGP)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3">Key Facts</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-800">
                  <div className="space-y-1">
                    <p>• Started: 1990</p>
                    <p>• Completed: 2003</p>
                    <p>• Duration: 13 years</p>
                    <p>• Cost: $3 billion</p>
                  </div>
                  <div className="space-y-1">
                    <p>• Genes: ~20,000-25,000</p>
                    <p>• Chromosomes: 23 pairs</p>
                    <p>• Coding DNA: &lt;2%</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Applications</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Identification of disease genes</li>
                  <li>• Gene therapy development</li>
                  <li>• Personalized medicine</li>
                  <li>• Understanding human evolution</li>
                  <li>• Forensic applications (DNA fingerprinting)</li>
                </ul>
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
                  <h3 className="font-semibold text-lg">Q{index + 1}. {q.questionText}</h3>
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
                          {showExplanations[q.id] && selectedAnswers[q.id] === idx && idx !== q.correctAnswer && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <span>{typeof option === "string" ? option : option.text}</span>
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