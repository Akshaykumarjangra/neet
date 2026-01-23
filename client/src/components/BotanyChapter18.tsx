
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { HeartPulse, CheckCircle2, XCircle, Brain, Lightbulb, BookOpen, Bug , Loader2 } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
export function BotanyChapter18() {
  // Fetch questions from database for Human Health and Disease (topicId: 82)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '82'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=82');
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
      question: "Which pathogen causes malaria?",
      options: ["Bacteria", "Virus", "Protozoan", "Fungus"],
      correctAnswer: "C",
      explanation: "Malaria is caused by Plasmodium (a protozoan parasite), transmitted by female Anopheles mosquitoes. There are several species: P. vivax, P. falciparum, P. malariae, and P. ovale."
    },
    {
      id: 2,
      question: "AIDS is caused by:",
      options: ["Bacteria", "HIV (Human Immunodeficiency Virus)", "Protozoan", "Fungus"],
      correctAnswer: "B",
      explanation: "AIDS (Acquired Immunodeficiency Syndrome) is caused by HIV, which attacks CD4+ T lymphocytes, weakening the immune system."
    },
    {
      id: 3,
      question: "Typhoid is caused by:",
      options: ["Salmonella typhi", "Vibrio cholerae", "E. coli", "Shigella"],
      correctAnswer: "A",
      explanation: "Typhoid fever is caused by the bacterium Salmonella typhi, transmitted through contaminated food and water."
    },
    {
      id: 4,
      question: "Which type of immunity is provided by vaccination?",
      options: ["Natural active", "Natural passive", "Artificial active", "Artificial passive"],
      correctAnswer: "C",
      explanation: "Vaccination provides artificial active immunity by introducing weakened or killed pathogens/antigens, stimulating the body to produce its own antibodies."
    },
    {
      id: 5,
      question: "Antibodies are produced by:",
      options: ["RBCs", "Platelets", "B-lymphocytes", "T-lymphocytes"],
      correctAnswer: "C",
      explanation: "B-lymphocytes (B cells) produce antibodies (immunoglobulins) in response to antigens. They are part of the humoral immune response."
    },
    {
      id: 6,
      question: "The causative organism of tuberculosis is:",
      options: [
        "Mycobacterium tuberculosis",
        "Streptococcus pneumoniae",
        "Haemophilus influenzae",
        "Vibrio cholerae"
      ],
      correctAnswer: "A",
      explanation: "Tuberculosis (TB) is caused by Mycobacterium tuberculosis, primarily affecting the lungs but can affect other organs."
    },
    {
      id: 7,
      question: "Allergic reactions are mediated by:",
      options: ["IgG", "IgA", "IgE", "IgM"],
      correctAnswer: "C",
      explanation: "IgE (Immunoglobulin E) antibodies are responsible for allergic reactions. They bind to mast cells and basophils, triggering histamine release."
    },
    {
      id: 8,
      question: "Which disease is NOT caused by a virus?",
      options: ["Dengue", "Typhoid", "Common cold", "Influenza"],
      correctAnswer: "B",
      explanation: "Typhoid is caused by bacteria (Salmonella typhi). Dengue, common cold, and influenza are all viral diseases."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 via-pink-600 to-rose-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <HeartPulse className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Human Health and Disease</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understand human diseases, pathogens, immunity, and preventive measures for common ailments
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mb-24" />
      </div>

      {/* Learning Objectives */}
      <Card className="glass-panel glow-halo float-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-red-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5" />
              <p>Identify common human diseases and pathogens</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5" />
              <p>Understand immune system components</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5" />
              <p>Learn types of immunity</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5" />
              <p>Master disease prevention strategies</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="concepts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
          <TabsTrigger value="diseases">Common Diseases</TabsTrigger>
          <TabsTrigger value="immunity">Immunity</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Key Concepts */}
        <TabsContent value="concepts" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-red-600" />
                Types of Pathogens
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-2">1. Viruses</h4>
                  <p className="text-sm text-red-800 mb-2">Obligate intracellular parasites</p>
                  <p className="text-xs text-red-700">Examples: HIV, Influenza, Dengue, Common cold</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">2. Bacteria</h4>
                  <p className="text-sm text-blue-800 mb-2">Prokaryotic microorganisms</p>
                  <p className="text-xs text-blue-700">Examples: Typhoid, Cholera, TB, Pneumonia</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">3. Protozoans</h4>
                  <p className="text-sm text-green-800 mb-2">Single-celled eukaryotes</p>
                  <p className="text-xs text-green-700">Examples: Malaria, Amoebiasis, Sleeping sickness</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">4. Fungi</h4>
                  <p className="text-sm text-amber-800 mb-2">Eukaryotic organisms</p>
                  <p className="text-xs text-amber-700">Examples: Ringworm, Athlete's foot, Candidiasis</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Health vs Disease</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-semibold text-green-900 mb-2">Health</h4>
                  <p className="text-sm text-green-800">State of complete physical, mental, and social well-being (WHO definition)</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
                  <h4 className="font-semibold text-red-900 mb-2">Disease</h4>
                  <p className="text-sm text-red-800">Any deviation from normal functioning that impairs health</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Modes of Disease Transmission:</h4>
                <div className="grid md:grid-cols-2 gap-2 text-sm text-blue-800">
                  <p>• <strong>Airborne:</strong> Influenza, TB, Common cold</p>
                  <p>• <strong>Waterborne:</strong> Cholera, Typhoid, Hepatitis A</p>
                  <p>• <strong>Vector-borne:</strong> Malaria, Dengue, Plague</p>
                  <p>• <strong>Contact:</strong> Ringworm, AIDS (sexual contact)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Common Diseases */}
        <TabsContent value="diseases" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-6 w-6 text-red-600" />
                Common Human Diseases
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
                  <h4 className="font-semibold text-red-900 mb-2">Malaria</h4>
                  <div className="text-sm text-red-800 space-y-1">
                    <p><strong>Pathogen:</strong> <em>Plasmodium</em> (P. vivax, P. falciparum)</p>
                    <p><strong>Vector:</strong> Female Anopheles mosquito</p>
                    <p><strong>Symptoms:</strong> Recurring fever with chills, headache, sweating</p>
                    <p><strong>Prevention:</strong> Mosquito control, use of nets, quinine drugs</p>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                  <h4 className="font-semibold text-purple-900 mb-2">Typhoid</h4>
                  <div className="text-sm text-purple-800 space-y-1">
                    <p><strong>Pathogen:</strong> <em>Salmonella typhi</em> (bacterium)</p>
                    <p><strong>Transmission:</strong> Contaminated food and water</p>
                    <p><strong>Symptoms:</strong> Sustained high fever, headache, stomach pain</p>
                    <p><strong>Test:</strong> Widal test</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-semibold text-blue-900 mb-2">Tuberculosis (TB)</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><strong>Pathogen:</strong> <em>Mycobacterium tuberculosis</em></p>
                    <p><strong>Transmission:</strong> Airborne (droplet infection)</p>
                    <p><strong>Symptoms:</strong> Persistent cough, blood in sputum, weight loss</p>
                    <p><strong>Prevention:</strong> BCG vaccine, DOTS therapy</p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-semibold text-green-900 mb-2">AIDS</h4>
                  <div className="text-sm text-green-800 space-y-1">
                    <p><strong>Pathogen:</strong> HIV (Human Immunodeficiency Virus)</p>
                    <p><strong>Transmission:</strong> Sexual contact, blood transfusion, infected needles</p>
                    <p><strong>Symptoms:</strong> Weakened immunity, opportunistic infections</p>
                    <p><strong>Target:</strong> CD4+ T lymphocytes (Helper T cells)</p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-600">
                  <h4 className="font-semibold text-amber-900 mb-2">Common Cold</h4>
                  <div className="text-sm text-amber-800 space-y-1">
                    <p><strong>Pathogen:</strong> Rhinovirus (virus)</p>
                    <p><strong>Transmission:</strong> Airborne droplets</p>
                    <p><strong>Symptoms:</strong> Runny nose, sneezing, sore throat, cough</p>
                    <p><strong>Note:</strong> Usually self-limiting</p>
                  </div>
                </div>

                <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-600">
                  <h4 className="font-semibold text-pink-900 mb-2">Ringworm</h4>
                  <div className="text-sm text-pink-800 space-y-1">
                    <p><strong>Pathogen:</strong> Fungi (Microsporum, Trichophyton, Epidermophyton)</p>
                    <p><strong>Symptoms:</strong> Dry, scaly skin lesions with itching</p>
                    <p><strong>Common sites:</strong> Scalp, nails, groin (jock itch)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Cancer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-3">Key Concepts:</h4>
                <ul className="text-sm text-red-800 space-y-2">
                  <li>• Uncontrolled cell division due to damaged genes</li>
                  <li>• <strong>Oncogenes:</strong> Cancer-causing genes</li>
                  <li>• <strong>Tumor suppressor genes:</strong> Normally prevent cancer (e.g., p53)</li>
                  <li>• <strong>Benign tumors:</strong> Non-invasive, localized</li>
                  <li>• <strong>Malignant tumors:</strong> Invasive, metastasize (spread)</li>
                  <li>• <strong>Carcinogens:</strong> Cancer-causing agents (tobacco, UV, X-rays)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Immunity */}
        <TabsContent value="immunity" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                Immune System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Types of Immunity:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="font-semibold text-blue-800">Innate (Non-specific)</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Present from birth</li>
                      <li>• Physical barriers (skin, mucus)</li>
                      <li>• Phagocytes, NK cells</li>
                      <li>• Inflammation</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-semibold text-blue-800">Acquired (Specific)</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Develops after exposure</li>
                      <li>• B and T lymphocytes</li>
                      <li>• Antibody production</li>
                      <li>• Memory cells</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <h4 className="font-semibold text-green-900 mb-3">Active Immunity</h4>
                  <div className="space-y-2 text-sm text-green-800">
                    <p><strong>Natural Active:</strong> After infection (long-lasting)</p>
                    <p><strong>Artificial Active:</strong> Vaccination (long-lasting)</p>
                  </div>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-600">
                  <h4 className="font-semibold text-amber-900 mb-3">Passive Immunity</h4>
                  <div className="space-y-2 text-sm text-amber-800">
                    <p><strong>Natural Passive:</strong> Mother to baby (antibodies via placenta/milk)</p>
                    <p><strong>Artificial Passive:</strong> Antibody injection (short-lived)</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-3">Lymphocytes:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-800">
                  <div>
                    <h5 className="font-semibold mb-2">B Lymphocytes (B cells)</h5>
                    <ul className="space-y-1">
                      <li>• Produce antibodies</li>
                      <li>• Humoral immunity</li>
                      <li>• Memory B cells</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">T Lymphocytes (T cells)</h5>
                    <ul className="space-y-1">
                      <li>• Cell-mediated immunity</li>
                      <li>• Helper T cells (CD4+)</li>
                      <li>• Cytotoxic T cells (CD8+)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-3">Antibodies (Immunoglobulins):</h4>
                <div className="grid md:grid-cols-3 gap-3 text-sm text-red-800">
                  <div>
                    <strong>IgG:</strong> Most abundant, crosses placenta
                  </div>
                  <div>
                    <strong>IgA:</strong> In secretions (saliva, tears)
                  </div>
                  <div>
                    <strong>IgM:</strong> First antibody produced
                  </div>
                  <div>
                    <strong>IgE:</strong> Allergic reactions
                  </div>
                  <div>
                    <strong>IgD:</strong> B cell receptors
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Vaccines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-3">Common Vaccines:</h4>
                <div className="grid md:grid-cols-2 gap-2 text-sm text-green-800">
                  <p>• <strong>BCG:</strong> Tuberculosis</p>
                  <p>• <strong>DPT:</strong> Diphtheria, Pertussis, Tetanus</p>
                  <p>• <strong>MMR:</strong> Measles, Mumps, Rubella</p>
                  <p>• <strong>Polio:</strong> OPV (oral) or IPV (injection)</p>
                  <p>• <strong>Hepatitis B:</strong> HBV vaccine</p>
                  <p>• <strong>Typhoid:</strong> TAB vaccine</p>
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
