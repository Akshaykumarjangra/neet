
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dna, CheckCircle2, XCircle, Brain, Scissors, TestTubes } from "lucide-react";

export function BotanyChapter28() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: "The first restriction endonuclease discovered was:",
      options: ["EcoRI", "Hind II", "BamHI", "Pst I"],
      correctAnswer: 1,
      explanation: "Hind II was the first restriction endonuclease discovered from Haemophilus influenzae. It recognizes and cuts specific DNA sequences."
    },
    {
      id: 2,
      question: "Which enzyme is used to join DNA fragments in recombinant DNA technology?",
      options: ["DNA polymerase", "DNA ligase", "Restriction endonuclease", "Helicase"],
      correctAnswer: 1,
      explanation: "DNA ligase acts as a molecular glue that joins DNA fragments by forming phosphodiester bonds between adjacent nucleotides."
    },
    {
      id: 3,
      question: "The Ti plasmid used in genetic engineering is obtained from:",
      options: ["E. coli", "Agrobacterium tumefaciens", "Bacillus thuringiensis", "Saccharomyces"],
      correctAnswer: 1,
      explanation: "Ti (Tumor-inducing) plasmid is naturally found in Agrobacterium tumefaciens and is used as a vector for plant genetic engineering."
    },
    {
      id: 4,
      question: "PCR technique was developed by:",
      options: ["Paul Berg", "Kary Mullis", "Stanley Cohen", "Herbert Boyer"],
      correctAnswer: 1,
      explanation: "Kary Mullis developed the Polymerase Chain Reaction (PCR) technique in 1983, for which he received the Nobel Prize in 1993."
    },
    {
      id: 5,
      question: "In gel electrophoresis, DNA moves towards:",
      options: ["Negative pole", "Positive pole", "Remains stationary", "Moves randomly"],
      correctAnswer: 1,
      explanation: "DNA is negatively charged due to phosphate groups in its backbone, so it moves towards the positive (anode) pole in an electric field."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-600 to-teal-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Dna className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Biotechnology: Principles and Processes</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understanding genetic engineering tools and techniques
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
              <p>Understand principles of genetic engineering</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p>Learn about recombinant DNA technology tools</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p>Study cloning vectors and their types</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p>Explore biotechnology processes and applications</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="principles" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="principles">Principles</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="processes">Processes</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Principles */}
        <TabsContent value="principles" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Core Principles of Biotechnology</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Genetic Engineering</h3>
                  <div className="space-y-3 text-sm text-blue-800">
                    <p>Techniques to alter the genetic makeup of cells by introducing foreign genes</p>
                    <div>
                      <p className="font-semibold">Steps:</p>
                      <p>1. Isolation of DNA</p>
                      <p>2. Cutting DNA at specific sites</p>
                      <p>3. Joining DNA fragments</p>
                      <p>4. Insertion into host cell</p>
                      <p>5. Selection and multiplication</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Recombinant DNA (rDNA)</h3>
                  <div className="space-y-3 text-sm text-green-800">
                    <p>DNA molecule formed by combining DNA from two different sources</p>
                    <div>
                      <p className="font-semibold">Applications:</p>
                      <p>• Production of insulin</p>
                      <p>• Human growth hormone</p>
                      <p>• Vaccines</p>
                      <p>• Genetically modified crops</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Basic Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Gene of Interest</h4>
                  <p className="text-sm text-purple-800">The specific DNA sequence that codes for the desired protein or trait</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-2">Vector</h4>
                  <p className="text-sm text-indigo-800">DNA molecule used as a vehicle to carry foreign DNA into host cell (plasmids, bacteriophages)</p>
                </div>
                <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                  <h4 className="font-semibold text-cyan-900 mb-2">Host Organism</h4>
                  <p className="text-sm text-cyan-800">Cell that receives and multiplies the recombinant DNA (E. coli, yeast, plant/animal cells)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tools */}
        <TabsContent value="tools" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scissors className="h-6 w-6" />
                Tools of Recombinant DNA Technology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-red-50 rounded-lg border-2 border-red-200">
                <h3 className="text-xl font-bold text-red-900 mb-4">Restriction Enzymes (Molecular Scissors)</h3>
                <div className="space-y-3 text-sm text-red-800">
                  <p className="font-semibold">Functions:</p>
                  <p>• Cut DNA at specific recognition sequences (palindromic)</p>
                  <p>• Produce sticky ends or blunt ends</p>
                  <div className="mt-3">
                    <p className="font-semibold">Examples:</p>
                    <p>• EcoRI: Recognizes GAATTC</p>
                    <p>• BamHI: Recognizes GGATCC</p>
                    <p>• Hind III: Recognizes AAGCTT</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-red-200 mt-3">
                    <p className="font-semibold">Naming Convention:</p>
                    <p>First letter: Genus (E for Escherichia)</p>
                    <p>Next two letters: Species (co for coli)</p>
                    <p>Letter/number: Strain/order (R, I, II, III)</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">DNA Ligase (Molecular Glue)</h4>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p>• Joins DNA fragments</p>
                    <p>• Forms phosphodiester bonds</p>
                    <p>• Essential for sealing nicks</p>
                    <p>• Used after inserting gene into vector</p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">DNA Polymerase</h4>
                  <div className="text-sm text-green-800 space-y-2">
                    <p>• Synthesizes new DNA strands</p>
                    <p>• Used in PCR (Taq polymerase)</p>
                    <p>• Heat stable enzyme</p>
                    <p>• Amplifies DNA sequences</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Cloning Vectors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-3">Plasmids</h4>
                  <div className="text-sm text-yellow-800 space-y-1">
                    <p>• Circular extra-chromosomal DNA</p>
                    <p>• Found in bacteria</p>
                    <p>• Can replicate independently</p>
                    <p>• Small size (1-200 kb)</p>
                    <p>• Example: pBR322</p>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-3">Bacteriophages</h4>
                  <div className="text-sm text-orange-800 space-y-1">
                    <p>• Viruses that infect bacteria</p>
                    <p>• DNA injected into host</p>
                    <p>• Higher DNA capacity</p>
                    <p>• Example: λ phage</p>
                  </div>
                </div>

                <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <h4 className="font-semibold text-pink-900 mb-3">BAC & YAC</h4>
                  <div className="text-sm text-pink-800 space-y-1">
                    <p>• BAC: Bacterial Artificial Chromosome</p>
                    <p>• YAC: Yeast Artificial Chromosome</p>
                    <p>• Large DNA capacity</p>
                    <p>• Used for genome projects</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3">Features of an Ideal Vector</h4>
                <div className="grid md:grid-cols-2 gap-2 text-sm text-purple-800">
                  <p>• Origin of replication (ori)</p>
                  <p>• Selectable marker genes (antibiotic resistance)</p>
                  <p>• Cloning sites (multiple restriction sites)</p>
                  <p>• Small size for easy manipulation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Processes */}
        <TabsContent value="processes" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTubes className="h-6 w-6" />
                Biotechnology Processes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-cyan-50 rounded-lg border-2 border-cyan-200">
                <h3 className="text-xl font-bold text-cyan-900 mb-4">Polymerase Chain Reaction (PCR)</h3>
                <div className="space-y-3 text-sm text-cyan-800">
                  <p className="font-semibold">In vitro DNA amplification technique</p>
                  <div className="p-3 bg-white rounded border border-cyan-200">
                    <p className="font-semibold mb-2">Three Steps (repeated 25-30 cycles):</p>
                    <p><strong>1. Denaturation (94°C):</strong> DNA strands separate</p>
                    <p><strong>2. Annealing (50-60°C):</strong> Primers bind to DNA</p>
                    <p><strong>3. Extension (72°C):</strong> DNA polymerase synthesizes new strands</p>
                  </div>
                  <div>
                    <p className="font-semibold">Requirements:</p>
                    <p>• Template DNA</p>
                    <p>• Two primers (forward and reverse)</p>
                    <p>• Taq DNA polymerase</p>
                    <p>• dNTPs (deoxynucleotide triphosphates)</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-teal-50 rounded-lg border-2 border-teal-200">
                <h3 className="text-xl font-bold text-teal-900 mb-4">Gel Electrophoresis</h3>
                <div className="space-y-3 text-sm text-teal-800">
                  <p>Technique to separate DNA fragments based on size</p>
                  <div>
                    <p className="font-semibold">Principle:</p>
                    <p>• DNA is negatively charged</p>
                    <p>• Moves towards positive electrode (anode)</p>
                    <p>• Smaller fragments move faster</p>
                    <p>• Larger fragments move slower</p>
                  </div>
                  <div>
                    <p className="font-semibold">Components:</p>
                    <p>• Agarose gel matrix</p>
                    <p>• Buffer solution (TAE/TBE)</p>
                    <p>• Electric current</p>
                    <p>• Ethidium bromide (staining)</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">Transformation</h4>
                  <div className="text-sm text-green-800 space-y-2">
                    <p>Process of introducing foreign DNA into host cells</p>
                    <p className="font-semibold mt-2">Methods:</p>
                    <p>• Heat shock treatment</p>
                    <p>• Electroporation</p>
                    <p>• Gene gun (biolistics)</p>
                    <p>• Microinjection</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">Selection of Recombinants</h4>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p>Identifying cells with recombinant DNA</p>
                    <p className="font-semibold mt-2">Techniques:</p>
                    <p>• Antibiotic resistance</p>
                    <p>• Insertional inactivation</p>
                    <p>• Blue-white screening (lacZ gene)</p>
                    <p>• Replica plating</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Bioreactors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-3">Large-scale Production</h4>
                <div className="text-sm text-amber-800 space-y-2">
                  <p>Vessels for culturing microorganisms to produce desired products</p>
                  <div className="mt-3">
                    <p className="font-semibold">Types:</p>
                    <p>• Stirred-tank bioreactor (most common)</p>
                    <p>• Air-lift bioreactor</p>
                  </div>
                  <div className="mt-3">
                    <p className="font-semibold">Components:</p>
                    <p>• Agitator system (mixing)</p>
                    <p>• Oxygen delivery system</p>
                    <p>• Foam control system</p>
                    <p>• Temperature and pH control</p>
                  </div>
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
                  <h3 className="font-semibold text-lg">Q{index + 1}. {q.question}</h3>
                  <div className="space-y-2">
                    {q.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(q.id, idx)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                          selectedAnswers[q.id] === idx
                            ? showExplanations[q.id]
                              ? idx === q.correctAnswer
                                ? "border-green-500 bg-green-50"
                                : "border-red-500 bg-red-50"
                              : "border-primary bg-primary/5"
                            : "border-muted hover:border-muted-foreground/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {showExplanations[q.id] && idx === q.correctAnswer && (
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
