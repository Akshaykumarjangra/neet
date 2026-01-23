
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sprout, CheckCircle2, XCircle, Brain, Heart, Bug } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
export function BotanyChapter29() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Bt cotton is resistant to:",
      options: ["Bacterial diseases", "Fungal diseases", "Insect pests", "Viral diseases"],
      correctAnswer: "C",
      explanation: "Bt cotton contains genes from Bacillus thuringiensis that produce Cry proteins toxic to insect pests, particularly bollworms."
    },
    {
      id: 2,
      question: "The first transgenic plant was:",
      options: ["Tobacco", "Cotton", "Rice", "Wheat"],
      correctAnswer: "A",
      explanation: "Tobacco was the first transgenic plant, developed in 1982 by introducing an antibiotic resistance gene."
    },
    {
      id: 3,
      question: "Golden rice is enriched with:",
      options: ["Vitamin A", "Vitamin C", "Iron", "Calcium"],
      correctAnswer: "A",
      explanation: "Golden rice is genetically modified to produce beta-carotene (provitamin A) in the endosperm, addressing vitamin A deficiency."
    },
    {
      id: 4,
      question: "RNA interference (RNAi) is used to:",
      options: [
        "Enhance gene expression",
        "Silence specific genes",
        "Amplify DNA",
        "Cut DNA"
      ],
      correctAnswer: "B",
      explanation: "RNAi is a biological process where RNA molecules inhibit gene expression by neutralizing targeted mRNA molecules, effectively silencing genes."
    },
    {
      id: 5,
      question: "The bacterium used to produce human insulin is:",
      options: ["Bacillus subtilis", "Agrobacterium", "Escherichia coli", "Pseudomonas"],
      correctAnswer: "C",
      explanation: "E. coli bacteria have been genetically engineered to produce human insulin (Humulin), which is used to treat diabetes."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sprout className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Biotechnology and its Applications</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Exploring applications in agriculture, medicine, and industry
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mb-24" />
      </div>

      {/* Learning Objectives */}
      <Card className="glass-panel glow-halo float-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-green-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Understand agricultural biotechnology applications</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Learn about medical biotechnology advances</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Study transgenic organisms and GMOs</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Explore biosafety and ethical concerns</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="agriculture" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="agriculture">Agriculture</TabsTrigger>
          <TabsTrigger value="medicine">Medicine</TabsTrigger>
          <TabsTrigger value="gmo">GMOs</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Agricultural Applications */}
        <TabsContent value="agriculture" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="h-6 w-6" />
                Biotechnology in Agriculture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-4">Bt Crops (Insect Resistant)</h3>
                <div className="space-y-3 text-sm text-green-800">
                  <p>Crops containing genes from Bacillus thuringiensis producing insecticidal proteins</p>
                  <div className="p-3 bg-white rounded border border-green-200">
                    <p className="font-semibold mb-2">Cry Proteins:</p>
                    <p>• Produced as inactive protoxins</p>
                    <p>• Activated in alkaline gut of insects</p>
                    <p>• Bind to receptors creating pores</p>
                    <p>• Leads to insect death</p>
                  </div>
                  <div>
                    <p className="font-semibold">Examples:</p>
                    <p>• Bt Cotton: Resistant to bollworms</p>
                    <p>• Bt Corn: Resistant to corn borers</p>
                    <p>• Bt Brinjal: Resistant to fruit borers</p>
                  </div>
                  <div>
                    <p className="font-semibold">Benefits:</p>
                    <p>• Reduced pesticide use</p>
                    <p>• Increased crop yield</p>
                    <p>• Lower environmental impact</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-3">Herbicide Resistant Crops</h4>
                  <div className="text-sm text-yellow-800 space-y-2">
                    <p>Crops engineered to survive herbicide treatment</p>
                    <p className="font-semibold mt-2">Examples:</p>
                    <p>• Glyphosate-resistant soybean</p>
                    <p>• Allows selective weed control</p>
                    <p>• Reduces crop damage</p>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-3">Virus Resistant Plants</h4>
                  <div className="text-sm text-orange-800 space-y-2">
                    <p>Using RNAi to silence viral genes</p>
                    <p className="font-semibold mt-2">Examples:</p>
                    <p>• Tobacco mosaic virus resistance</p>
                    <p>• Papaya ringspot virus resistance</p>
                    <p>• Prevents crop losses</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Nutrient Enhancement</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-800">
                  <div>
                    <p className="font-semibold">Golden Rice:</p>
                    <p>• Enhanced with beta-carotene</p>
                    <p>• Prevents vitamin A deficiency</p>
                  </div>
                  <div>
                    <p className="font-semibold">Iron-enriched Rice:</p>
                    <p>• Higher iron content</p>
                    <p>• Addresses anemia</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medical Applications */}
        <TabsContent value="medicine" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6" />
                Medical Biotechnology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-red-50 rounded-lg border-2 border-red-200">
                <h3 className="text-xl font-bold text-red-900 mb-4">Recombinant Therapeutics</h3>
                <div className="space-y-3 text-sm text-red-800">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 bg-white rounded border border-red-200">
                      <p className="font-semibold mb-2">Insulin (Humulin)</p>
                      <p>• First rDNA product (1982)</p>
                      <p>• Produced in E. coli</p>
                      <p>• Treats diabetes mellitus</p>
                      <p>• A and B chains produced separately</p>
                    </div>
                    <div className="p-3 bg-white rounded border border-red-200">
                      <p className="font-semibold mb-2">Human Growth Hormone (hGH)</p>
                      <p>• Treats growth deficiency</p>
                      <p>• Previously from cadaver pituitary</p>
                      <p>• Now safely produced in bacteria</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-3">Gene Therapy</h4>
                  <div className="text-sm text-purple-800 space-y-2">
                    <p>Treatment by inserting functional genes</p>
                    <div className="mt-2">
                      <p className="font-semibold">Example: ADA Deficiency</p>
                      <p>• Severe Combined Immunodeficiency (SCID)</p>
                      <p>• Adenosine deaminase gene inserted</p>
                      <p>• Restores immune function</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-3">Vaccines</h4>
                  <div className="text-sm text-indigo-800 space-y-2">
                    <p>Recombinant vaccines are safer</p>
                    <div className="mt-2">
                      <p className="font-semibold">Examples:</p>
                      <p>• Hepatitis B vaccine</p>
                      <p>• HPV vaccine</p>
                      <p>• No disease-causing organisms used</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <h4 className="font-semibold text-cyan-900 mb-3">Molecular Diagnosis</h4>
                <div className="text-sm text-cyan-800 space-y-2">
                  <p className="font-semibold">PCR-based Detection:</p>
                  <p>• Early disease detection</p>
                  <p>• Genetic disorder screening</p>
                  <p>• Pathogen identification</p>
                  <div className="mt-2">
                    <p className="font-semibold">ELISA (Enzyme-Linked Immunosorbent Assay):</p>
                    <p>• Detects antigens or antibodies</p>
                    <p>• Used for HIV, COVID-19 testing</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GMOs */}
        <TabsContent value="gmo" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-6 w-6" />
                Genetically Modified Organisms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-teal-50 rounded-lg border-2 border-teal-200">
                <h3 className="text-xl font-bold text-teal-900 mb-4">Transgenic Animals</h3>
                <div className="space-y-3 text-sm text-teal-800">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 bg-white rounded border border-teal-200">
                      <p className="font-semibold mb-2">Applications:</p>
                      <p>• Biological product production</p>
                      <p>• Disease models for research</p>
                      <p>• Testing drug safety (toxicity)</p>
                      <p>• Organ transplantation research</p>
                    </div>
                    <div className="p-3 bg-white rounded border border-teal-200">
                      <p className="font-semibold mb-2">Examples:</p>
                      <p>• Rosie (cow): Human protein-enriched milk</p>
                      <p>• Transgenic mice: Cancer research</p>
                      <p>• Transgenic pigs: Organ donors</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-3">Benefits of GMOs</h4>
                  <div className="text-sm text-amber-800 space-y-1">
                    <p>• Increased crop productivity</p>
                    <p>• Reduced pesticide use</p>
                    <p>• Enhanced nutritional value</p>
                    <p>• Disease resistance</p>
                    <p>• Drought/stress tolerance</p>
                    <p>• Production of pharmaceuticals</p>
                  </div>
                </div>

                <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                  <h4 className="font-semibold text-rose-900 mb-3">Concerns & Risks</h4>
                  <div className="text-sm text-rose-800 space-y-1">
                    <p>• Potential allergenicity</p>
                    <p>• Gene transfer to wild species</p>
                    <p>• Development of resistant pests</p>
                    <p>• Loss of biodiversity</p>
                    <p>• Ethical concerns</p>
                    <p>• Unknown long-term effects</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Biosafety and Regulations</h4>
                <div className="text-sm text-blue-800 space-y-2">
                  <p className="font-semibold">Biosafety Guidelines:</p>
                  <p>• Cartagena Protocol on Biosafety</p>
                  <p>• Risk assessment before release</p>
                  <p>• Labeling of GMO products</p>
                  <p>• Monitoring environmental impact</p>
                  <div className="mt-3">
                    <p className="font-semibold">GEAC (Genetic Engineering Approval Committee):</p>
                    <p>• Indian regulatory body</p>
                    <p>• Approves GM research and products</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3">Biopiracy</h4>
                <div className="text-sm text-green-800 space-y-2">
                  <p>Unauthorized use of biological resources and traditional knowledge</p>
                  <div className="mt-2">
                    <p className="font-semibold">Examples:</p>
                    <p>• Basmati rice patent case</p>
                    <p>• Neem patent controversy</p>
                    <p>• Turmeric patent case</p>
                  </div>
                  <p className="mt-2 font-semibold">Protection: Indian Patent Act, Biological Diversity Act</p>
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
