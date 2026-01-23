
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dna, CheckCircle2, XCircle, Brain, Microscope, TestTubes } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
export function BotanyChapter37() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Which enzyme is used to cut DNA at specific recognition sequences?",
      options: ["DNA ligase", "Restriction endonuclease", "DNA polymerase", "Reverse transcriptase"],
      correctAnswer: "B",
      explanation: "Restriction endonucleases (restriction enzymes) are molecular scissors that cut DNA at specific palindromic recognition sequences, producing sticky or blunt ends."
    },
    {
      id: 2,
      question: "The first restriction endonuclease identified was:",
      options: ["EcoRI", "Hind II", "BamHI", "PstI"],
      correctAnswer: "B",
      explanation: "Hind II was the first restriction endonuclease isolated from Haemophilus influenzae by Smith, Wilcox, and Kelley in 1968."
    },
    {
      id: 3,
      question: "Plasmids are used as vectors because they:",
      options: [
        "Cannot replicate",
        "Have antibiotic resistance genes",
        "Are large in size",
        "Cannot integrate into host chromosome"
      ],
      correctAnswer: "B",
      explanation: "Plasmids contain antibiotic resistance genes (selectable markers) that help identify transformed cells, and they can replicate autonomously in bacterial cells."
    },
    {
      id: 4,
      question: "The enzyme used to join DNA fragments is:",
      options: ["Restriction enzyme", "DNA ligase", "DNA polymerase", "Helicase"],
      correctAnswer: "B",
      explanation: "DNA ligase catalyzes the formation of phosphodiester bonds between adjacent nucleotides, joining DNA fragments together."
    },
    {
      id: 5,
      question: "PCR (Polymerase Chain Reaction) requires which enzyme?",
      options: ["DNA ligase", "Taq polymerase", "Reverse transcriptase", "Restriction enzyme"],
      correctAnswer: "B",
      explanation: "Taq polymerase from Thermus aquaticus is a thermostable DNA polymerase that can withstand the high temperatures used in PCR cycles."
    },
    {
      id: 6,
      question: "Which of the following is NOT a step in recombinant DNA technology?",
      options: [
        "Isolation of DNA",
        "Fragmentation of DNA",
        "Translation of protein",
        "Insertion into host"
      ],
      correctAnswer: "C",
      explanation: "The main steps of rDNA technology are: isolation of DNA, fragmentation using restriction enzymes, ligation into vectors, transformation into host cells, and selection. Translation is a natural cellular process, not a step in rDNA technology."
    },
    {
      id: 7,
      question: "EcoRI produces:",
      options: ["Blunt ends", "Sticky ends with 5' overhang", "Sticky ends with 3' overhang", "No cuts"],
      correctAnswer: "B",
      explanation: "EcoRI creates sticky (cohesive) ends with 5' overhangs at the recognition sequence GAATTC, facilitating DNA ligation."
    },
    {
      id: 8,
      question: "Gel electrophoresis separates DNA fragments based on:",
      options: ["Molecular weight", "Charge", "Size", "Both size and charge"],
      correctAnswer: "D",
      explanation: "Gel electrophoresis separates DNA based on size (smaller fragments move faster) and charge (DNA is negatively charged and moves toward the positive electrode)."
    },
    {
      id: 9,
      question: "The role of calcium chloride in bacterial transformation is to:",
      options: [
        "Make bacterial cell wall permeable",
        "Kill bacteria",
        "Cut DNA",
        "Amplify DNA"
      ],
      correctAnswer: "A",
      explanation: "Calcium chloride makes bacterial cells competent by increasing membrane permeability, allowing DNA to enter the cells during transformation."
    },
    {
      id: 10,
      question: "Which of the following is a thermostable polymerase?",
      options: ["E. coli DNA polymerase", "Taq polymerase", "T4 DNA ligase", "Klenow fragment"],
      correctAnswer: "B",
      explanation: "Taq polymerase from Thermus aquaticus is thermostable and can function at high temperatures (94°C) used in PCR denaturation steps."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Dna className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Biotechnology: Principles and Processes</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Recombinant DNA technology, genetic engineering tools, and molecular techniques
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
              <p>Understand principles of genetic engineering</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Master tools of recombinant DNA technology</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Learn cloning vectors and host systems</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Explore biotechnology processes and applications</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="principles" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="principles">Principles</TabsTrigger>
          <TabsTrigger value="tools">Tools & Enzymes</TabsTrigger>
          <TabsTrigger value="processes">Processes</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Principles of Biotechnology */}
        <TabsContent value="principles" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Core Principles of Genetic Engineering</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Two Core Techniques</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-3">1. Genetic Engineering</h4>
                    <p className="text-sm text-purple-800 mb-3">
                      Techniques to alter the chemistry of genetic material (DNA/RNA) to introduce into host organisms
                    </p>
                    <ul className="text-sm text-purple-800 space-y-2">
                      <li>• Changes genotype of organism</li>
                      <li>• Creates recombinant DNA (rDNA)</li>
                      <li>• Produces desired products</li>
                      <li>• Also called gene cloning/DNA cloning</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-3">2. Bioprocess Engineering</h4>
                    <p className="text-sm text-purple-800 mb-3">
                      Maintenance of sterile conditions for growth of desired microbes/cells for manufacture of products
                    </p>
                    <ul className="text-sm text-purple-800 space-y-2">
                      <li>• Large-scale production</li>
                      <li>• Uses bioreactors/fermenters</li>
                      <li>• Sterile environment maintenance</li>
                      <li>• Product purification (downstream processing)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Microscope className="h-6 w-6 text-blue-600" />
                    Recombinant DNA Technology
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 mb-2">Definition</h4>
                    <p className="text-sm text-blue-800">
                      The process of joining DNA molecules from two different species and inserting them into a host organism to produce new genetic combinations
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Step 1: Cut</h4>
                      <p className="text-sm text-green-800">
                        Use restriction enzymes to cut DNA at specific sites, creating compatible ends
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-amber-900 mb-2">Step 2: Paste</h4>
                      <p className="text-sm text-amber-800">
                        Join gene of interest to vector DNA using DNA ligase enzyme
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Step 3: Introduce</h4>
                      <p className="text-sm text-purple-800">
                        Insert recombinant DNA into host cell for replication and expression
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Basic Steps of Genetic Engineering</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-900 mb-2">1. Identification of DNA with desirable genes</h4>
                      <p className="text-sm text-blue-800">Locate and isolate the gene of interest from source organism</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-900 mb-2">2. Introduction into host</h4>
                      <p className="text-sm text-green-800">Transfer recombinant DNA into suitable host cell (transformation/transfection)</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-900 mb-2">3. Maintenance in host & transfer to progeny</h4>
                      <p className="text-sm text-purple-800">Ensure stable replication and inheritance of foreign DNA</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tools and Enzymes */}
        <TabsContent value="tools" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTubes className="h-6 w-6 text-orange-600" />
                Tools of Genetic Engineering
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border-2 border-red-200">
                <h3 className="text-xl font-bold text-red-900 mb-4">Restriction Endonucleases (Molecular Scissors)</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-3">Discovery & Function</h4>
                    <ul className="text-sm text-red-800 space-y-2">
                      <li>• Discovered in bacteria as defense mechanism against viruses</li>
                      <li>• Recognize specific palindromic sequences (4-8 base pairs)</li>
                      <li>• Cut DNA at specific recognition sites</li>
                      <li>• Over 900 restriction enzymes isolated from 230+ bacteria</li>
                      <li>• Named using binomial nomenclature (genus + species + strain)</li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-sm mb-2">Sticky Ends (Cohesive Ends)</h4>
                      <p className="text-xs mb-2">
                        <strong>Example: EcoRI</strong><br/>
                        Recognition: 5'-GAATTC-3'<br/>
                        Cuts between G and A
                      </p>
                      <div className="bg-green-50 p-2 rounded text-xs font-mono">
                        5'-G     AATTC-3'<br/>
                        3'-CTTAA     G-5'
                      </div>
                      <p className="text-xs mt-2">Creates single-stranded overhangs that can base-pair with complementary ends</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-sm mb-2">Blunt Ends</h4>
                      <p className="text-xs mb-2">
                        <strong>Example: SmaI</strong><br/>
                        Recognition: 5'-CCCGGG-3'<br/>
                        Cuts in middle
                      </p>
                      <div className="bg-blue-50 p-2 rounded text-xs font-mono">
                        5'-CCC   GGG-3'<br/>
                        3'-GGG   CCC-5'
                      </div>
                      <p className="text-xs mt-2">Creates no overhangs, straight cut across both strands</p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">Common Restriction Enzymes</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="text-sm space-y-1">
                        <p><strong>EcoRI:</strong> from <em>E. coli</em> RY13</p>
                        <p><strong>BamHI:</strong> from <em>Bacillus amyloliquefaciens</em> H</p>
                        <p><strong>HindIII:</strong> from <em>Haemophilus influenzae</em> Rd</p>
                      </div>
                      <div className="text-sm space-y-1">
                        <p><strong>PstI:</strong> from <em>Providencia stuartii</em></p>
                        <p><strong>SalI:</strong> from <em>Streptomyces albus</em></p>
                        <p><strong>XbaI:</strong> from <em>Xanthomonas badrii</em></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>DNA Ligase (Molecular Glue)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900 mb-2">Function</h4>
                    <ul className="text-sm text-green-800 space-y-2">
                      <li>• Joins DNA fragments by forming phosphodiester bonds</li>
                      <li>• Links sugar-phosphate backbones between adjacent nucleotides</li>
                      <li>• Seals nicks in DNA double helix</li>
                      <li>• Essential for creating recombinant DNA molecules</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Types</h4>
                    <p className="text-sm text-blue-800">
                      <strong>T4 DNA ligase:</strong> Most commonly used, from bacteriophage T4<br/>
                      <strong>E. coli DNA ligase:</strong> Requires NAD+ as cofactor
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Vectors (Cloning Vehicles)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-900 mb-3">Definition & Requirements</h4>
                    <p className="text-sm text-purple-800 mb-3">
                      DNA molecules that carry foreign DNA into host cells and facilitate replication
                    </p>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-sm mb-2">Essential Features:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Origin of replication (ori) - autonomous replication</li>
                        <li>• Selectable marker - antibiotic resistance genes</li>
                        <li>• Cloning sites - recognition sites for restriction enzymes</li>
                        <li>• Small size - easy to manipulate</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold text-amber-900 mb-3">Plasmids</h4>
                      <ul className="text-sm text-amber-800 space-y-1">
                        <li>• Circular, extra-chromosomal DNA</li>
                        <li>• Autonomous replication</li>
                        <li>• 1-200 kb in size</li>
                        <li>• Examples: pBR322, pUC18/19</li>
                        <li>• Carry antibiotic resistance genes</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-cyan-50 rounded-lg">
                      <h4 className="font-semibold text-cyan-900 mb-3">Bacteriophages</h4>
                      <ul className="text-sm text-cyan-800 space-y-1">
                        <li>• Viruses that infect bacteria</li>
                        <li>• Can carry larger DNA inserts</li>
                        <li>• Examples: λ phage, M13</li>
                        <li>• Natural DNA injection mechanism</li>
                        <li>• Higher cloning efficiency</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">pBR322 - Common Cloning Vector</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded text-sm">
                        <p><strong>ampR:</strong> Ampicillin resistance gene</p>
                        <p><strong>tetR:</strong> Tetracycline resistance gene</p>
                        <p><strong>ori:</strong> Origin of replication</p>
                      </div>
                      <div className="bg-white p-3 rounded text-sm">
                        <p><strong>Size:</strong> 4361 base pairs</p>
                        <p><strong>Cloning sites:</strong> PstI, BamHI, SalI in tetR</p>
                        <p><strong>Selection:</strong> Insertional inactivation</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Other Important Enzymes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">DNA Polymerase</h4>
                      <p className="text-sm text-blue-800">
                        Synthesizes new DNA strands using template<br/>
                        <strong>Taq polymerase:</strong> Thermostable, used in PCR
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Reverse Transcriptase</h4>
                      <p className="text-sm text-green-800">
                        Synthesizes DNA from RNA template<br/>
                        Used to make cDNA (complementary DNA) from mRNA
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Alkaline Phosphatase</h4>
                      <p className="text-sm text-purple-800">
                        Removes 5' phosphate groups from DNA<br/>
                        Prevents self-ligation of vector
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-900 mb-2">Polynucleotide Kinase</h4>
                      <p className="text-sm text-orange-800">
                        Adds phosphate groups to 5' ends<br/>
                        Facilitates ligation reactions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Processes */}
        <TabsContent value="processes" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Key Biotechnology Processes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border-2 border-cyan-200">
                <h3 className="text-xl font-bold text-cyan-900 mb-4">Transformation</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-cyan-900 mb-3">Process of Introducing Foreign DNA</h4>
                    <p className="text-sm text-cyan-800 mb-3">
                      The process by which cells take up foreign DNA from their surroundings
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-cyan-50 p-3 rounded">
                        <p className="font-semibold text-sm mb-2">Chemical Method</p>
                        <ul className="text-xs space-y-1">
                          <li>• Cells treated with CaCl₂</li>
                          <li>• Heat shock at 42°C</li>
                          <li>• Creates competent cells</li>
                          <li>• Low efficiency (1-10%)</li>
                        </ul>
                      </div>
                      <div className="bg-cyan-50 p-3 rounded">
                        <p className="font-semibold text-sm mb-2">Electroporation</p>
                        <ul className="text-xs space-y-1">
                          <li>• Electric pulse creates pores</li>
                          <li>• Higher efficiency</li>
                          <li>• Used for plant and animal cells</li>
                          <li>• Temporary membrane disruption</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-cyan-900 mb-2">Selection of Transformants</h4>
                    <p className="text-sm text-cyan-800 mb-2">
                      Identifying cells that have successfully taken up recombinant DNA
                    </p>
                    <div className="bg-cyan-50 p-3 rounded">
                      <p className="text-sm"><strong>Insertional Inactivation:</strong></p>
                      <ul className="text-xs space-y-1 mt-2">
                        <li>• Foreign DNA inserted into antibiotic resistance gene</li>
                        <li>• Recombinants lose resistance to that antibiotic</li>
                        <li>• Non-recombinants retain both resistances</li>
                        <li>• Plate on selective media to identify transformants</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Polymerase Chain Reaction (PCR)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-900 mb-2">Principle</h4>
                    <p className="text-sm text-orange-800">
                      <strong>Invented by:</strong> Kary Mullis (1983)<br/>
                      In vitro amplification of specific DNA sequences using thermostable DNA polymerase
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-3">Three Steps (Repeated 25-35 cycles)</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded">
                        <p className="font-semibold text-sm mb-1">1. Denaturation (94-96°C)</p>
                        <p className="text-xs">Double-stranded DNA separates into single strands</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="font-semibold text-sm mb-1">2. Annealing (50-65°C)</p>
                        <p className="text-xs">Primers bind to complementary sequences on template DNA</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="font-semibold text-sm mb-1">3. Extension (72°C)</p>
                        <p className="text-xs">Taq polymerase synthesizes new DNA strands from primers</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Components Required</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Template DNA</li>
                        <li>• Two primers (forward & reverse)</li>
                        <li>• Taq polymerase enzyme</li>
                        <li>• dNTPs (nucleotides)</li>
                        <li>• Buffer solution</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Applications</h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Gene cloning</li>
                        <li>• DNA fingerprinting</li>
                        <li>• Detection of pathogens</li>
                        <li>• Prenatal diagnosis</li>
                        <li>• Evolutionary studies</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Gel Electrophoresis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-900 mb-2">Principle</h4>
                    <p className="text-sm text-purple-800">
                      Separation of DNA fragments based on size through gel matrix under electric field
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Procedure</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>1. DNA loaded into wells in agarose gel</li>
                        <li>2. Electric current applied</li>
                        <li>3. Negatively charged DNA moves toward positive electrode</li>
                        <li>4. Smaller fragments move faster</li>
                        <li>5. Stain with ethidium bromide</li>
                        <li>6. Visualize under UV light</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Applications</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Separation of restriction fragments</li>
                        <li>• Analysis of PCR products</li>
                        <li>• DNA fingerprinting</li>
                        <li>• Size determination</li>
                        <li>• Purification of DNA fragments</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Bioreactors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                    <h4 className="font-semibold text-amber-900 mb-2">Definition</h4>
                    <p className="text-sm text-amber-800">
                      Large vessels for culturing microorganisms or cells under controlled conditions for production of desired products
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-cyan-50 rounded-lg">
                      <h4 className="font-semibold text-cyan-900 mb-2">Types</h4>
                      <ul className="text-sm text-cyan-800 space-y-1">
                        <li>• Simple stirred-tank bioreactor</li>
                        <li>• Sparged stirred-tank bioreactor</li>
                        <li>• Airlift bioreactor</li>
                        <li>• Fluidized bed bioreactor</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Control Parameters</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Temperature control</li>
                        <li>• pH maintenance</li>
                        <li>• Oxygen supply (aeration)</li>
                        <li>• Nutrient feed</li>
                        <li>• Foam control</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Downstream Processing</h4>
                    <p className="text-sm text-purple-800 mb-2">
                      Series of processes for purification and formulation of biotechnology products
                    </p>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Separation: filtration, centrifugation</li>
                      <li>• Purification: chromatography, crystallization</li>
                      <li>• Formulation: addition of preservatives, quality control</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
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
