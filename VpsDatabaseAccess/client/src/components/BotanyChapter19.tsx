import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dna, CheckCircle2, XCircle, Brain, Lightbulb, Microscope , Loader2 } from "lucide-react";

export function BotanyChapter19() {
  // Fetch questions from database for Strategies for Enhancement in Food Production (topicId: 83)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '83'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=83');
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
      question: "Bt cotton is resistant to:",
      options: ["Bacterial diseases", "Insect pests", "Fungal diseases", "Viral diseases"],
      correctAnswer: 1,
      explanation: "Bt cotton contains the Bt toxin gene from Bacillus thuringiensis, which makes it resistant to bollworm and other insect pests."
    },
    {
      id: 2,
      question: "The first transgenic plant produced was:",
      options: ["Tobacco", "Cotton", "Rice", "Wheat"],
      correctAnswer: 0,
      explanation: "Tobacco was the first transgenic plant created in 1983, using Agrobacterium-mediated gene transfer."
    },
    {
      id: 3,
      question: "Insulin was originally extracted from:",
      options: ["Human pancreas", "Pig and cattle pancreas", "Bacterial culture", "Yeast culture"],
      correctAnswer: 1,
      explanation: "Before genetic engineering, insulin was extracted from the pancreas of slaughtered pigs and cattle, which sometimes caused allergic reactions."
    },
    {
      id: 4,
      question: "Golden Rice is enriched with:",
      options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Iron"],
      correctAnswer: 0,
      explanation: "Golden Rice is genetically modified to produce beta-carotene (provitamin A) in the edible parts, helping prevent vitamin A deficiency."
    },
    {
      id: 5,
      question: "Gene therapy involves:",
      options: [
        "Replacing defective genes with healthy ones",
        "Removing all genes",
        "Creating new genes",
        "Destroying mutant genes"
      ],
      correctAnswer: 0,
      explanation: "Gene therapy is the technique to correct a genetic defect by inserting a functional gene into the genome to replace the defective one."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-pink-600 to-red-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Microscope className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Biotechnology and its Applications</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Exploring genetic engineering, transgenic organisms, and biotechnology in medicine and agriculture
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
              <p>Learn about transgenic plants and animals</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Master biotechnology in medicine</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
              <p>Explore applications in agriculture</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="principles" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="principles">Principles</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Principles */}
        <TabsContent value="principles" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Genetic Engineering Principles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Tools of Genetic Engineering</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold mb-2">1. Restriction Enzymes (Molecular Scissors)</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Cut DNA at specific recognition sequences</li>
                      <li>• Examples: EcoRI, BamHI, HindIII</li>
                      <li>• Create sticky or blunt ends</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold mb-2">2. Vectors (DNA Carriers)</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Plasmids (circular DNA from bacteria)</li>
                      <li>• Bacteriophages (viruses)</li>
                      <li>• Ti plasmid from <em>Agrobacterium</em></li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold mb-2">3. DNA Ligase (Molecular Glue)</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Joins DNA fragments together</li>
                      <li>• Seals nicks in DNA backbone</li>
                      <li>• Creates recombinant DNA</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Steps of rDNA Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { step: 1, title: "Isolation of DNA", desc: "Extract DNA from donor organism" },
                      { step: 2, title: "Cutting DNA", desc: "Use restriction enzymes to cut desired gene" },
                      { step: 3, title: "Amplification", desc: "PCR to make multiple copies" },
                      { step: 4, title: "Ligation", desc: "Insert gene into vector using DNA ligase" },
                      { step: 5, title: "Transformation", desc: "Introduce recombinant DNA into host" },
                      { step: 6, title: "Selection", desc: "Identify and select transformed cells" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4 p-3 bg-muted rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>PCR - Polymerase Chain Reaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Process Steps:</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <p><strong>1. Denaturation (94°C):</strong> DNA strands separate</p>
                  <p><strong>2. Annealing (55-65°C):</strong> Primers bind to DNA</p>
                  <p><strong>3. Extension (72°C):</strong> Taq polymerase synthesizes new strand</p>
                  <p className="mt-3 font-semibold">Each cycle doubles the DNA amount!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applications */}
        <TabsContent value="applications" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Biotechnology in Medicine</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Recombinant Insulin</h4>
                  <p className="text-sm text-green-800">Produced in <em>E. coli</em> using human insulin gene</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Gene Therapy</h4>
                  <p className="text-sm text-blue-800">Treating genetic disorders by gene replacement</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Vaccines</h4>
                  <p className="text-sm text-purple-800">Hepatitis B vaccine from yeast cells</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">Monoclonal Antibodies</h4>
                  <p className="text-sm text-amber-800">For diagnosis and treatment of diseases</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Biotechnology in Agriculture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 bg-emerald-50 rounded-lg border-2 border-emerald-200">
                <h3 className="text-xl font-bold text-emerald-900 mb-4">Transgenic Crops</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded">
                    <h4 className="font-semibold mb-1">Bt Cotton/Corn</h4>
                    <p className="text-sm">Contains <em>Bacillus thuringiensis</em> toxin gene for insect resistance</p>
                  </div>
                  <div className="p-3 bg-white rounded">
                    <h4 className="font-semibold mb-1">Golden Rice</h4>
                    <p className="text-sm">Enriched with beta-carotene (Vitamin A precursor)</p>
                  </div>
                  <div className="p-3 bg-white rounded">
                    <h4 className="font-semibold mb-1">Flavr Savr Tomato</h4>
                    <p className="text-sm">Delayed ripening through antisense RNA technology</p>
                  </div>
                  <div className="p-3 bg-white rounded">
                    <h4 className="font-semibold mb-1">Herbicide Resistant Crops</h4>
                    <p className="text-sm">Resistant to specific herbicides (e.g., Roundup Ready)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Animal Biotechnology</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <h4 className="font-semibold text-pink-900 mb-2">Rosie - First Transgenic Cow</h4>
                  <p className="text-sm text-pink-800">
                    Produced human protein-enriched milk containing alpha-lactalbumin
                  </p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-2">Gene Pharming</h4>
                  <p className="text-sm text-indigo-800">
                    Using transgenic animals to produce pharmaceutical proteins
                  </p>
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
                Real-World Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Case Study 1: Insulin Production</h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <p><strong>Problem:</strong> Diabetes patients need regular insulin</p>
                  <p><strong>Old Method:</strong> Extract from pig/cattle pancreas (limited, expensive, allergies)</p>
                  <p><strong>Biotechnology Solution:</strong></p>
                  <ul className="ml-6 space-y-1">
                    <li>• Human insulin gene inserted into <em>E. coli</em></li>
                    <li>• Bacteria produce human insulin (Humulin)</li>
                    <li>• Unlimited supply, pure, no allergic reactions</li>
                    <li>• First approved in 1982 by FDA</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-green-900 mb-4">Case Study 2: Bt Cotton</h3>
                <div className="space-y-2 text-sm text-green-800">
                  <p><strong>Problem:</strong> Cotton bollworm destroys crops, heavy pesticide use</p>
                  <p><strong>Solution:</strong></p>
                  <ul className="ml-6 space-y-1">
                    <li>• Cry gene from <em>Bacillus thuringiensis</em> inserted into cotton</li>
                    <li>• Cotton produces Bt toxin protein</li>
                    <li>• Toxin kills bollworm larvae</li>
                    <li>• Reduces pesticide use by 70%</li>
                    <li>• Harmless to humans and beneficial insects</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Case Study 3: Gene Therapy for ADA Deficiency</h3>
                <div className="space-y-2 text-sm text-purple-800">
                  <p><strong>Disease:</strong> Severe Combined Immunodeficiency (SCID)</p>
                  <p><strong>Cause:</strong> Deficiency of enzyme Adenosine Deaminase (ADA)</p>
                  <p><strong>Treatment:</strong></p>
                  <ul className="ml-6 space-y-1">
                    <li>• Extract lymphocytes from patient</li>
                    <li>• Insert functional ADA gene using retroviral vector</li>
                    <li>• Return modified cells to patient</li>
                    <li>• Periodic infusions needed</li>
                    <li>• First gene therapy in 1990</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Ethical and Social Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">⚠️ Concerns</h4>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• Environmental impact of GMOs</li>
                    <li>• Gene flow to wild relatives</li>
                    <li>• Safety of GM foods</li>
                    <li>• Biopiracy and patent issues</li>
                    <li>• Ethical concerns in gene therapy</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">✓ Benefits</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Increased crop yield and nutrition</li>
                    <li>• Reduced pesticide use</li>
                    <li>• Treatment of genetic diseases</li>
                    <li>• Production of medicines</li>
                    <li>• Food security</li>
                  </ul>
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