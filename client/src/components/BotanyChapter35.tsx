import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dna, CheckCircle2, XCircle, Brain, Scissors, TestTubes } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
export function BotanyChapter35() {
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
      explanation: "Restriction endonucleases (or restriction enzymes) are molecular scissors that cut DNA at specific palindromic recognition sequences."
    },
    {
      id: 2,
      question: "The first restriction endonuclease isolated was:",
      options: ["EcoRI", "Hind II", "BamHI", "Pst I"],
      correctAnswer: "B",
      explanation: "Hind II was the first restriction endonuclease to be isolated from Haemophilus influenzae in 1970."
    },
    {
      id: 3,
      question: "Sticky ends are produced by:",
      options: ["Blunt-end restriction enzymes", "DNA ligase", "Staggered cut restriction enzymes", "Exonucleases"],
      correctAnswer: "C",
      explanation: "Restriction enzymes that make staggered cuts produce sticky ends (overhanging single-stranded DNA) which can easily bind with complementary sequences."
    },
    {
      id: 4,
      question: "Which vector is most commonly used for cloning genes in bacteria?",
      options: ["Bacteriophage", "Cosmid", "Plasmid", "YAC"],
      correctAnswer: "C",
      explanation: "Plasmids are small, circular, extrachromosomal DNA molecules that are the most commonly used vectors for cloning in bacteria."
    },
    {
      id: 5,
      question: "The origin of replication (ori) in a cloning vector is important for:",
      options: ["Cutting DNA", "Autonomous replication", "Antibiotic resistance", "Selecting recombinants"],
      correctAnswer: "B",
      explanation: "The ori sequence allows the vector to replicate autonomously inside the host cell, independent of chromosomal DNA replication."
    },
    {
      id: 6,
      question: "Insertional inactivation is used for:",
      options: ["DNA cutting", "Selection of recombinants", "DNA amplification", "Gene sequencing"],
      correctAnswer: "B",
      explanation: "Insertional inactivation involves inserting foreign DNA into a marker gene (like antibiotic resistance), disrupting it and allowing selection of recombinant clones."
    },
    {
      id: 7,
      question: "EcoRI cuts DNA between bases:",
      options: ["G and A in GAATTC", "A and A in GAATTC", "T and T in GAATTC", "C and G in GAATTC"],
      correctAnswer: "A",
      explanation: "EcoRI recognizes the palindromic sequence GAATTC and cuts between G and A on both strands, producing sticky ends with AATT overhangs."
    },
    {
      id: 8,
      question: "Which technique is used to introduce recombinant DNA into animal cells?",
      options: ["Electroporation", "Gene gun", "Microinjection", "All of the above"],
      correctAnswer: "D",
      explanation: "All three methods - electroporation (electric shock), gene gun (biolistics), and microinjection - can be used to introduce DNA into animal cells."
    },
    {
      id: 9,
      question: "The process of separating DNA fragments by size using electric current is called:",
      options: ["PCR", "Gel electrophoresis", "Blotting", "Centrifugation"],
      correctAnswer: "B",
      explanation: "Gel electrophoresis separates DNA fragments based on size - smaller fragments move faster through the gel matrix toward the positive electrode."
    },
    {
      id: 10,
      question: "PCR requires which of the following?",
      options: ["Template DNA", "Primers", "DNA polymerase", "All of the above"],
      correctAnswer: "D",
      explanation: "PCR (Polymerase Chain Reaction) requires template DNA, primers (short oligonucleotides), heat-stable DNA polymerase (Taq), and deoxynucleotides to amplify DNA."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Dna className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Biotechnology: Principles and Processes</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Tools and techniques of genetic engineering - restriction enzymes, vectors, and gene cloning
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
              <p>Understand genetic engineering principles</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Learn about restriction enzymes and vectors</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Master gene cloning techniques</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Explore PCR and DNA manipulation</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="principles" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="principles">Core Principles</TabsTrigger>
          <TabsTrigger value="tools">Tools & Enzymes</TabsTrigger>
          <TabsTrigger value="cloning">Gene Cloning</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Core Principles */}
        <TabsContent value="principles" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Principles of Biotechnology</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Two Core Techniques</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-3">1. Genetic Engineering</h4>
                    <ul className="text-sm text-purple-800 space-y-2">
                      <li>• In vitro modification of DNA/RNA</li>
                      <li>• Introduction into host organisms</li>
                      <li>• Changes phenotype of organism</li>
                      <li>• Also called recombinant DNA technology</li>
                      <li>• Creates genetically modified organisms (GMOs)</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-3">2. Bioprocess Engineering</h4>
                    <ul className="text-sm text-purple-800 space-y-2">
                      <li>• Maintenance of sterile conditions</li>
                      <li>• Growth of desired microbes/cells</li>
                      <li>• Large-scale production in bioreactors</li>
                      <li>• Production of biotechnology products</li>
                      <li>• Downstream processing and purification</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Steps in Recombinant DNA Technology</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-900 mb-2">Step 1: Isolation of Genetic Material</h4>
                      <p className="text-sm text-blue-800">
                        • Pure DNA must be isolated from cells<br/>
                        • Cell lysis with enzymes (lysozyme, cellulase, chitinase)<br/>
                        • RNA removed by RNase, proteins by proteases<br/>
                        • Ethanol precipitation to obtain pure DNA
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-900 mb-2">Step 2: Cutting DNA at Specific Locations</h4>
                      <p className="text-sm text-green-800">
                        • Restriction enzymes cut DNA at palindromic sequences<br/>
                        • Produces sticky or blunt ends<br/>
                        • Same enzyme cuts both vector and foreign DNA<br/>
                        • Creates complementary ends for joining
                      </p>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-yellow-900 mb-2">Step 3: Amplification of Gene of Interest</h4>
                      <p className="text-sm text-yellow-800">
                        • PCR (Polymerase Chain Reaction) used<br/>
                        • Millions of copies made in vitro<br/>
                        • Requires primers, Taq polymerase, dNTPs<br/>
                        • Denaturation → Annealing → Extension cycles
                      </p>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-semibold text-orange-900 mb-2">Step 4: Ligation into Vector</h4>
                      <p className="text-sm text-orange-800">
                        • Cut gene inserted into cut vector<br/>
                        • DNA ligase seals the sugar-phosphate backbone<br/>
                        • Forms recombinant DNA molecule<br/>
                        • Vector carries gene into host cell
                      </p>
                    </div>

                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-semibold text-red-900 mb-2">Step 5: Transfer into Host Cell</h4>
                      <p className="text-sm text-red-800">
                        • Transformation (bacteria), transfection (eukaryotes)<br/>
                        • Methods: heat shock, electroporation, gene gun<br/>
                        • Only a few cells take up DNA<br/>
                        • Selection needed to identify transformants
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-900 mb-2">Step 6: Selection and Screening</h4>
                      <p className="text-sm text-purple-800">
                        • Selectable markers (antibiotic resistance)<br/>
                        • Insertional inactivation technique<br/>
                        • Blue-white screening (using lacZ gene)<br/>
                        • Clone with desired gene isolated
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tools & Enzymes */}
        <TabsContent value="tools" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scissors className="h-6 w-6 text-purple-600" />
                Restriction Endonucleases
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border-2 border-red-200">
                <h3 className="text-xl font-bold text-red-900 mb-4">Molecular Scissors</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-3">Nomenclature</h4>
                    <p className="text-sm text-red-800 mb-2">
                      Example: <strong>EcoRI</strong>
                    </p>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• <strong>E</strong> - Genus (Escherichia)</li>
                      <li>• <strong>co</strong> - Species (coli)</li>
                      <li>• <strong>R</strong> - Strain</li>
                      <li>• <strong>I</strong> - Order of discovery (Roman numeral)</li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-red-900 mb-2">Recognition Sequences</h4>
                      <div className="text-xs font-mono bg-red-50 p-3 rounded">
                        <p className="mb-2">EcoRI: 5'-GAATTC-3'</p>
                        <p className="mb-2">BamHI: 5'-GGATCC-3'</p>
                        <p className="mb-2">PstI: 5'-CTGCAG-3'</p>
                        <p>HindIII: 5'-AAGCTT-3'</p>
                      </div>
                      <p className="text-xs text-red-700 mt-2">
                        All are palindromic sequences (read same on both strands)
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-red-900 mb-2">Types of Cuts</h4>
                      <div className="space-y-2 text-sm text-red-800">
                        <div className="p-2 bg-red-50 rounded">
                          <p className="font-semibold mb-1">Sticky Ends (Staggered)</p>
                          <p className="text-xs">• Overhanging single strands</p>
                          <p className="text-xs">• Easy to ligate with complementary ends</p>
                        </div>
                        <div className="p-2 bg-red-50 rounded">
                          <p className="font-semibold mb-1">Blunt Ends</p>
                          <p className="text-xs">• No overhangs</p>
                          <p className="text-xs">• More difficult to ligate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Other Important Enzymes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-900 mb-2">DNA Ligase</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Joins DNA fragments together</li>
                        <li>• Forms phosphodiester bonds</li>
                        <li>• Seals nicks in sugar-phosphate backbone</li>
                        <li>• Essential for creating recombinant DNA</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-900 mb-2">DNA Polymerase</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Synthesizes new DNA strands</li>
                        <li>• <strong>Taq polymerase:</strong> Heat-stable (from Thermus aquaticus)</li>
                        <li>• Used in PCR reactions</li>
                        <li>• Extends primers during DNA synthesis</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-900 mb-2">Reverse Transcriptase</h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Synthesizes DNA from RNA template</li>
                        <li>• Produces complementary DNA (cDNA)</li>
                        <li>• Isolated from retroviruses</li>
                        <li>• Used to clone genes from mRNA</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-yellow-900 mb-2">Alkaline Phosphatase</h4>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• Removes phosphate groups from 5' ends</li>
                        <li>• Prevents self-ligation of vectors</li>
                        <li>• Ensures insert DNA is ligated</li>
                        <li>• Increases cloning efficiency</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Vectors - The Vehicles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-4">Essential Features of Vectors</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-3">Origin of Replication (ori)</h4>
                    <ul className="text-sm text-green-800 space-y-2">
                      <li>• Sequence where replication starts</li>
                      <li>• Allows autonomous replication</li>
                      <li>• Copy number control</li>
                      <li>• Independent of host chromosome</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-3">Selectable Marker</h4>
                    <ul className="text-sm text-green-800 space-y-2">
                      <li>• Antibiotic resistance genes</li>
                      <li>• Helps identify transformants</li>
                      <li>• Examples: ampR, tetR, kanR</li>
                      <li>• Cells without vector killed by antibiotic</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-3">Cloning Sites</h4>
                    <ul className="text-sm text-green-800 space-y-2">
                      <li>• Recognition sites for restriction enzymes</li>
                      <li>• Preferably unique (single site)</li>
                      <li>• Should be within marker gene</li>
                      <li>• Allows insertional inactivation</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-3">Small Size</h4>
                    <ul className="text-sm text-green-800 space-y-2">
                      <li>• Easy to isolate and manipulate</li>
                      <li>• Higher transformation efficiency</li>
                      <li>• Multiple copies per cell possible</li>
                      <li>• Typical plasmids: 2-10 kb</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Types of Vectors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Plasmids</h4>
                      <p className="text-sm text-blue-800 mb-2">
                        Most commonly used vectors for bacterial transformation
                      </p>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Circular, extrachromosomal DNA</li>
                        <li>• pBR322: First artificial cloning vector</li>
                        <li>• Contains ampR, tetR genes</li>
                        <li>• Multiple cloning sites (MCS)</li>
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">Bacteriophages</h4>
                        <p className="text-sm text-purple-800">
                          • λ phage commonly used<br/>
                          • Can carry larger DNA inserts<br/>
                          • High transformation efficiency<br/>
                          • Natural DNA delivery mechanism
                        </p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-900 mb-2">Cosmids</h4>
                        <p className="text-sm text-orange-800">
                          • Hybrid of plasmid + phage<br/>
                          • Can carry 35-45 kb inserts<br/>
                          • Has cos sites from λ phage<br/>
                          • Useful for genomic libraries
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">BAC/YAC</h4>
                        <p className="text-sm text-green-800">
                          • Bacterial/Yeast Artificial Chromosomes<br/>
                          • Very large DNA inserts ({'>'}100 kb)<br/>
                          • Used in genome projects<br/>
                          • Stable maintenance of large fragments
                        </p>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h4 className="font-semibold text-red-900 mb-2">Ti Plasmid</h4>
                        <p className="text-sm text-red-800">
                          • From Agrobacterium tumefaciens<br/>
                          • Used for plant transformation<br/>
                          • Naturally infects plant cells<br/>
                          • T-DNA region inserted into plant genome
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gene Cloning */}
        <TabsContent value="cloning" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTubes className="h-6 w-6 text-blue-600" />
                Gene Cloning Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border-2 border-cyan-200">
                <h3 className="text-xl font-bold text-cyan-900 mb-4">Transformation Methods</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-cyan-900 mb-3">Heat Shock Method</h4>
                    <ul className="text-sm text-cyan-800 space-y-2">
                      <li>• Cells made competent with CaCl₂</li>
                      <li>• DNA added to competent cells on ice</li>
                      <li>• Heat shock at 42°C for 90 seconds</li>
                      <li>• Rapid cooling on ice</li>
                      <li>• Recovery in growth medium</li>
                      <li>• Low efficiency but simple</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-cyan-900 mb-3">Electroporation</h4>
                    <ul className="text-sm text-cyan-800 space-y-2">
                      <li>• High voltage electric pulse</li>
                      <li>• Creates transient pores in membrane</li>
                      <li>• DNA enters through pores</li>
                      <li>• Higher efficiency than heat shock</li>
                      <li>• Used for bacteria and eukaryotes</li>
                      <li>• Rapid and reproducible</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-cyan-900 mb-3">Gene Gun (Biolistics)</h4>
                    <ul className="text-sm text-cyan-800 space-y-2">
                      <li>• DNA coated on gold/tungsten particles</li>
                      <li>• Particles bombarded at high velocity</li>
                      <li>• Direct delivery into cells</li>
                      <li>• Used for plant cells</li>
                      <li>• Penetrates cell wall</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-cyan-900 mb-3">Microinjection</h4>
                    <ul className="text-sm text-cyan-800 space-y-2">
                      <li>• Direct injection using micropipette</li>
                      <li>• DNA injected into nucleus</li>
                      <li>• Very high efficiency</li>
                      <li>• Used for animal eggs/embryos</li>
                      <li>• Time-consuming but precise</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Selection and Screening</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-900 mb-3">Insertional Inactivation</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 bg-white rounded">
                        <p className="text-sm text-purple-800 mb-2">
                          <strong>Principle:</strong>
                        </p>
                        <ul className="text-xs text-purple-800 space-y-1">
                          <li>• Foreign DNA inserted into marker gene</li>
                          <li>• Inactivates the marker gene</li>
                          <li>• Example: Insert into tetR gene of pBR322</li>
                          <li>• Recombinants lose tetracycline resistance</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="text-sm text-purple-800 mb-2">
                          <strong>Selection Process:</strong>
                        </p>
                        <ul className="text-xs text-purple-800 space-y-1">
                          <li>• Plate on ampicillin (all transformants grow)</li>
                          <li>• Replica plate on tetracycline</li>
                          <li>• Non-recombinants: ampR tetR (grow)</li>
                          <li>• Recombinants: ampR tetS (don't grow)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 mb-3">Blue-White Screening</h4>
                    <div className="p-3 bg-white rounded mb-3">
                      <p className="text-sm text-blue-800 mb-2">
                        <strong>Based on lacZ gene (β-galactosidase):</strong>
                      </p>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Cloning site within lacZ gene</li>
                        <li>• X-gal substrate added to medium</li>
                        <li>• Active β-gal produces blue color</li>
                        <li>• Insert disrupts lacZ → white colonies</li>
                      </ul>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 bg-blue-100 rounded text-center">
                        <p className="font-semibold text-blue-900">Blue Colonies</p>
                        <p className="text-xs text-blue-800">Non-recombinants<br/>(no insert)</p>
                      </div>
                      <div className="p-3 bg-white rounded text-center border-2 border-blue-300">
                        <p className="font-semibold text-blue-900">White Colonies</p>
                        <p className="text-xs text-blue-800">Recombinants<br/>(with insert)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>PCR - Polymerase Chain Reaction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-4">Three Steps (Repeated 25-35 cycles)</h4>
                    <div className="space-y-3">
                      <div className="p-4 bg-white rounded-lg border-l-4 border-orange-500">
                        <h5 className="font-semibold text-orange-900 mb-2">1. Denaturation (94-96°C)</h5>
                        <p className="text-sm text-orange-800">
                          • Double-stranded DNA separates into single strands<br/>
                          • Hydrogen bonds between bases break<br/>
                          • Duration: 30 seconds to 1 minute
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border-l-4 border-green-500">
                        <h5 className="font-semibold text-green-900 mb-2">2. Annealing (50-65°C)</h5>
                        <p className="text-sm text-green-800">
                          • Primers bind to complementary sequences<br/>
                          • Temperature depends on primer sequence<br/>
                          • Duration: 20-40 seconds
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
                        <h5 className="font-semibold text-blue-900 mb-2">3. Extension (72°C)</h5>
                        <p className="text-sm text-blue-800">
                          • Taq polymerase extends primers<br/>
                          • Synthesizes new DNA strand<br/>
                          • Adds nucleotides in 5' to 3' direction<br/>
                          • Duration: 1 minute per kb
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-3">PCR Components</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 bg-white rounded">
                        <ul className="text-sm text-yellow-800 space-y-1">
                          <li>• <strong>Template DNA:</strong> DNA to be amplified</li>
                          <li>• <strong>Primers:</strong> Short oligonucleotides (15-30 bases)</li>
                          <li>• <strong>Taq polymerase:</strong> Heat-stable enzyme</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <ul className="text-sm text-yellow-800 space-y-1">
                          <li>• <strong>dNTPs:</strong> Building blocks (A, T, G, C)</li>
                          <li>• <strong>Buffer:</strong> Maintains pH and conditions</li>
                          <li>• <strong>MgCl₂:</strong> Cofactor for polymerase</li>
                        </ul>
                      </div>
                    </div>
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
