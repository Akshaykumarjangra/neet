
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, CheckCircle2, XCircle, Brain, Lightbulb, BookOpen, Shield , Loader2 } from "lucide-react";

export function BotanyChapter15() {
  // Fetch questions from database for Principles of Inheritance and Variation (topicId: 79)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '79'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=79');
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
      question: "Which of the following is NOT a common disease caused by bacteria?",
      options: ["Typhoid", "Tuberculosis", "Malaria", "Cholera"],
      correctAnswer: 2,
      explanation: "Malaria is caused by Plasmodium (a protozoan parasite), not bacteria. Typhoid (Salmonella typhi), Tuberculosis (Mycobacterium tuberculosis), and Cholera (Vibrio cholerae) are bacterial diseases."
    },
    {
      id: 2,
      question: "The causative agent of AIDS is:",
      options: ["Bacteria", "Retrovirus (HIV)", "Protozoa", "Fungus"],
      correctAnswer: 1,
      explanation: "AIDS (Acquired Immuno Deficiency Syndrome) is caused by HIV (Human Immunodeficiency Virus), which is a retrovirus that attacks the immune system."
    },
    {
      id: 3,
      question: "Which cells are primarily attacked by HIV?",
      options: ["Red blood cells", "T-helper cells (CD4+ cells)", "Platelets", "B-cells"],
      correctAnswer: 1,
      explanation: "HIV primarily attacks T-helper cells (CD4+ T-lymphocytes), which are crucial for immune response. This gradually weakens the immune system."
    },
    {
      id: 4,
      question: "Interferons are produced in response to:",
      options: ["Bacterial infection", "Viral infection", "Fungal infection", "Protozoan infection"],
      correctAnswer: 1,
      explanation: "Interferons are proteins produced by virus-infected cells that help protect other cells from viral infection by interfering with viral replication."
    },
    {
      id: 5,
      question: "The 'Typhoid Mary' concept refers to:",
      options: [
        "A person with active typhoid",
        "A carrier who spreads disease without showing symptoms",
        "A vaccine for typhoid",
        "A treatment method"
      ],
      correctAnswer: 1,
      explanation: "A carrier is a person who harbors disease-causing organisms without showing symptoms but can transmit the disease to others. 'Typhoid Mary' was a famous asymptomatic carrier."
    },
    {
      id: 6,
      question: "Active immunity is obtained through:",
      options: [
        "Mother's milk to infant",
        "Vaccination",
        "Injection of antibodies",
        "Antibiotics"
      ],
      correctAnswer: 1,
      explanation: "Active immunity develops when the body's own immune system produces antibodies in response to an antigen (vaccine or natural infection). It provides long-lasting immunity."
    },
    {
      id: 7,
      question: "Which of the following is an autoimmune disease?",
      options: ["AIDS", "Rheumatoid arthritis", "Tuberculosis", "Malaria"],
      correctAnswer: 1,
      explanation: "Rheumatoid arthritis is an autoimmune disease where the immune system mistakenly attacks the body's own tissues, particularly joints."
    },
    {
      id: 8,
      question: "The first line of defense in innate immunity is:",
      options: [
        "Antibodies",
        "Physical barriers (skin, mucus)",
        "T-lymphocytes",
        "B-lymphocytes"
      ],
      correctAnswer: 1,
      explanation: "The first line of defense includes physical barriers like skin, mucous membranes, and secretions that prevent pathogen entry into the body."
    },
    {
      id: 9,
      question: "Colostrum provides:",
      options: [
        "Active immunity",
        "Passive immunity through IgA antibodies",
        "No immunity",
        "Antigens for vaccination"
      ],
      correctAnswer: 1,
      explanation: "Colostrum (first milk) contains IgA antibodies that provide passive immunity to the newborn, protecting against infections until the baby's immune system develops."
    },
    {
      id: 10,
      question: "Which drug is obtained from the plant Cannabis sativa?",
      options: ["Cocaine", "Marijuana (cannabinoids)", "Heroin", "LSD"],
      correctAnswer: 1,
      explanation: "Marijuana and hashish are obtained from Cannabis sativa plant. The active principle is tetrahydrocannabinol (THC), which affects cardiovascular and nervous systems."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 via-pink-700 to-rose-800 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Human Health and Disease</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understanding diseases, immunity, and health maintenance
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
              <p>Understand common diseases and their causative agents</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5" />
              <p>Learn about immune system and immunity types</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5" />
              <p>Master concepts of vaccination and immunization</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-red-600 mt-0.5" />
              <p>Understand drugs, alcohol abuse and their effects</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="diseases" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="diseases">Common Diseases</TabsTrigger>
          <TabsTrigger value="immunity">Immunity</TabsTrigger>
          <TabsTrigger value="drugs">Drugs & Abuse</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Common Diseases */}
        <TabsContent value="diseases" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-red-600" />
                Infectious Diseases
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-3">Bacterial Diseases</h4>
                  <div className="space-y-2 text-sm text-red-800">
                    <div>
                      <p className="font-semibold">Typhoid</p>
                      <p className="text-xs">• Causative: Salmonella typhi</p>
                      <p className="text-xs">• Symptoms: High fever, headache, stomach pain</p>
                      <p className="text-xs">• Widal test for diagnosis</p>
                    </div>
                    <div className="mt-3">
                      <p className="font-semibold">Tuberculosis (TB)</p>
                      <p className="text-xs">• Causative: Mycobacterium tuberculosis</p>
                      <p className="text-xs">• Affects lungs primarily</p>
                      <p className="text-xs">• Symptoms: Cough, fever, weight loss</p>
                    </div>
                    <div className="mt-3">
                      <p className="font-semibold">Cholera</p>
                      <p className="text-xs">• Causative: Vibrio cholerae</p>
                      <p className="text-xs">• Water-borne disease</p>
                      <p className="text-xs">• Severe diarrhea and dehydration</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">Viral Diseases</h4>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div>
                      <p className="font-semibold">Common Cold</p>
                      <p className="text-xs">• Causative: Rhinoviruses</p>
                      <p className="text-xs">• Affects nose and respiratory passage</p>
                      <p className="text-xs">• Droplet infection</p>
                    </div>
                    <div className="mt-3">
                      <p className="font-semibold">AIDS</p>
                      <p className="text-xs">• Causative: HIV (Retrovirus)</p>
                      <p className="text-xs">• Attacks T-helper cells</p>
                      <p className="text-xs">• Transmission: Sexual contact, blood, mother to child</p>
                    </div>
                    <div className="mt-3">
                      <p className="font-semibold">Dengue</p>
                      <p className="text-xs">• Causative: Dengue virus</p>
                      <p className="text-xs">• Vector: Aedes mosquito</p>
                      <p className="text-xs">• High fever, severe joint pain</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">Protozoan Diseases</h4>
                  <div className="space-y-2 text-sm text-green-800">
                    <div>
                      <p className="font-semibold">Malaria</p>
                      <p className="text-xs">• Causative: Plasmodium (P. vivax, P. falciparum)</p>
                      <p className="text-xs">• Vector: Female Anopheles mosquito</p>
                      <p className="text-xs">• Symptoms: Recurring fever with chills</p>
                    </div>
                    <div className="mt-3">
                      <p className="font-semibold">Amoebiasis</p>
                      <p className="text-xs">• Causative: Entamoeba histolytica</p>
                      <p className="text-xs">• Affects large intestine</p>
                      <p className="text-xs">• Constipation, abdominal pain</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-3">Fungal Diseases</h4>
                  <div className="space-y-2 text-sm text-purple-800">
                    <div>
                      <p className="font-semibold">Ringworm</p>
                      <p className="text-xs">• Causative: Microsporum, Trichophyton</p>
                      <p className="text-xs">• Affects skin, nails, scalp</p>
                      <p className="text-xs">• Appears as dry, scaly lesions</p>
                    </div>
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
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2">Characteristics</h4>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• Uncontrolled cell division</li>
                  <li>• Loss of contact inhibition</li>
                  <li>• Metastasis: spread to other body parts</li>
                  <li>• Caused by carcinogens (tobacco, UV rays, etc.)</li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Detection</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Biopsy and histopathological studies</li>
                    <li>• Blood and bone marrow tests</li>
                    <li>• Imaging techniques (X-ray, CT scan, MRI)</li>
                    <li>• Antibodies against cancer antigens</li>
                  </ul>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <h4 className="font-semibold text-teal-900 mb-2">Treatment</h4>
                  <ul className="text-sm text-teal-800 space-y-1">
                    <li>• Surgery: removal of tumor</li>
                    <li>• Radiotherapy: radiation to kill cells</li>
                    <li>• Chemotherapy: drugs to kill cancer cells</li>
                    <li>• Immunotherapy: biological response modifiers</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Immunity */}
        <TabsContent value="immunity" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                Immune System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Types of Immunity</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded border border-blue-300">
                    <p className="font-semibold text-blue-900 mb-2">Innate Immunity</p>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Present from birth</li>
                      <li>• Non-specific defense</li>
                      <li>• Barriers: Skin, mucus, stomach acid</li>
                      <li>• Cellular: Phagocytes, NK cells</li>
                      <li>• Inflammatory response</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white rounded border border-blue-300">
                    <p className="font-semibold text-blue-900 mb-2">Acquired Immunity</p>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Develops during lifetime</li>
                      <li>• Pathogen-specific</li>
                      <li>• Has memory (secondary response)</li>
                      <li>• B-cells produce antibodies</li>
                      <li>• T-cells provide cell-mediated immunity</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Active Immunity</h4>
                  <p className="text-sm text-green-800 mb-2">Body produces its own antibodies</p>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• <strong>Natural:</strong> After infection</li>
                    <li>• <strong>Artificial:</strong> Vaccination</li>
                    <li>• Slow onset but long-lasting</li>
                    <li>• Examples: MMR vaccine, polio vaccine</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Passive Immunity</h4>
                  <p className="text-sm text-purple-800 mb-2">Ready-made antibodies are given</p>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• <strong>Natural:</strong> Mother to fetus, colostrum</li>
                    <li>• <strong>Artificial:</strong> Injection of antibodies</li>
                    <li>• Immediate but short-lived</li>
                    <li>• Examples: Anti-venom, tetanus antitoxin</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Antibodies and Antigens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">Antibodies (Immunoglobulins)</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Y-shaped proteins produced by B-cells</li>
                  <li>• Five types: IgG, IgA, IgM, IgE, IgD</li>
                  <li>• Structure: Two heavy chains + Two light chains</li>
                  <li>• Variable region binds to antigen</li>
                  <li>• Constant region determines antibody class</li>
                </ul>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <h4 className="font-semibold text-pink-900 mb-2">Vaccination</h4>
                <p className="text-sm text-pink-800 mb-2">
                  Introduction of weakened/killed pathogens to develop immunity without disease
                </p>
                <div className="grid md:grid-cols-2 gap-2 text-xs text-pink-800">
                  <div>
                    <p className="font-semibold">Types of Vaccines:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Killed/Inactivated</li>
                      <li>• Live attenuated</li>
                      <li>• Toxoid vaccines</li>
                      <li>• Recombinant vaccines</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Examples:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• DPT (Diphtheria, Pertussis, Tetanus)</li>
                      <li>• MMR (Measles, Mumps, Rubella)</li>
                      <li>• Hepatitis B vaccine</li>
                      <li>• COVID-19 vaccines</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Drugs & Abuse */}
        <TabsContent value="drugs" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-orange-600" />
                Drug and Alcohol Abuse
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
                  <h4 className="font-semibold text-red-900 mb-2">Opioids</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Source: Poppy plant (Papaver somniferum)</li>
                    <li>• Examples: Morphine, Heroin, Codeine</li>
                    <li>• Effects: Pain relief, euphoria, sedation</li>
                    <li>• Depressant on nervous system</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-600">
                  <h4 className="font-semibold text-orange-900 mb-2">Cannabinoids</h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• Source: Cannabis sativa (hemp plant)</li>
                    <li>• Forms: Marijuana, Hashish, Ganja</li>
                    <li>• Active: Tetrahydrocannabinol (THC)</li>
                    <li>• Effects: Altered perception, impaired coordination</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-600">
                  <h4 className="font-semibold text-yellow-900 mb-2">Coca Alkaloids</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Source: Coca plant (Erythroxylum coca)</li>
                    <li>• Example: Cocaine (Coke, Crack)</li>
                    <li>• Stimulant - interferes with dopamine transport</li>
                    <li>• Highly addictive</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-semibold text-blue-900 mb-2">Alcohol</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Depressant drug</li>
                    <li>• Affects CNS, liver damage (cirrhosis)</li>
                    <li>• Measured by Blood Alcohol Concentration</li>
                    <li>• Chronic use leads to addiction</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">Effects of Drug Abuse</h4>
                <div className="grid md:grid-cols-3 gap-3 text-sm text-purple-800">
                  <div>
                    <p className="font-semibold mb-1">Physical Effects:</p>
                    <ul className="space-y-1 text-xs ml-4">
                      <li>• Organ damage</li>
                      <li>• Weight loss</li>
                      <li>• Insomnia</li>
                      <li>• Respiratory problems</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Psychological Effects:</p>
                    <ul className="space-y-1 text-xs ml-4">
                      <li>• Depression</li>
                      <li>• Anxiety</li>
                      <li>• Hallucinations</li>
                      <li>• Mood swings</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Social Effects:</p>
                    <ul className="space-y-1 text-xs ml-4">
                      <li>• Family problems</li>
                      <li>• Academic decline</li>
                      <li>• Financial issues</li>
                      <li>• Criminal behavior</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Prevention and Control</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Education and awareness programs</li>
                  <li>• Seeking help and counseling</li>
                  <li>• Avoiding peer pressure</li>
                  <li>• De-addiction and rehabilitation centers</li>
                  <li>• Support from family and friends</li>
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
