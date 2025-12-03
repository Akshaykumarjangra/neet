
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wheat, CheckCircle2, XCircle, Brain, Sprout, Award } from "lucide-react";

export function BotanyChapter33() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Which breeding method involves crossing two genetically different varieties?",
      options: ["Mutation breeding", "Hybridization", "Pure line selection", "Mass selection"],
      correctAnswer: 1,
      explanation: "Hybridization involves crossing two genetically different parent plants to combine desirable traits from both parents in the offspring."
    },
    {
      id: 2,
      question: "Green Revolution in India was primarily associated with:",
      options: [
        "High yielding varieties of wheat and rice",
        "Organic farming",
        "Biofortification",
        "Tissue culture"
      ],
      correctAnswer: 0,
      explanation: "The Green Revolution (1960s-1970s) involved the development and use of high-yielding varieties (HYVs) of wheat and rice, along with modern agricultural practices."
    },
    {
      id: 3,
      question: "Which scientist is known as the 'Father of Green Revolution in India'?",
      options: ["Norman Borlaug", "M.S. Swaminathan", "Verghese Kurien", "B.P. Pal"],
      correctAnswer: 1,
      explanation: "Dr. M.S. Swaminathan is known as the Father of Green Revolution in India for his role in developing high-yielding varieties of wheat and rice."
    },
    {
      id: 4,
      question: "Biofortification aims to improve:",
      options: [
        "Crop yield",
        "Disease resistance",
        "Nutritional quality",
        "Shelf life"
      ],
      correctAnswer: 2,
      explanation: "Biofortification is the process of breeding crops to increase their nutritional value, such as increasing vitamin A in Golden Rice or iron in pearl millet."
    },
    {
      id: 5,
      question: "Which of the following is an example of biofortified crop?",
      options: [
        "Golden Rice (Vitamin A enriched)",
        "Bt Cotton (insect resistant)",
        "Flavr Savr tomato (delayed ripening)",
        "Roundup Ready soybean (herbicide tolerant)"
      ],
      correctAnswer: 0,
      explanation: "Golden Rice is biofortified with β-carotene (provitamin A) to address vitamin A deficiency. Other options are examples of genetic modification for pest/herbicide resistance."
    },
    {
      id: 6,
      question: "Semi-dwarf varieties of wheat were developed using genes from:",
      options: ["Norin 10 (Japanese variety)", "Sonora 64", "Lerma Rojo", "Kalyan Sona"],
      correctAnswer: 0,
      explanation: "Norman Borlaug used dwarfing genes from the Japanese wheat variety Norin 10 to develop semi-dwarf high-yielding wheat varieties."
    },
    {
      id: 7,
      question: "Which of the following is NOT a component of integrated pest management (IPM)?",
      options: [
        "Biological control",
        "Chemical pesticides as first option",
        "Crop rotation",
        "Resistant varieties"
      ],
      correctAnswer: 1,
      explanation: "IPM emphasizes using chemical pesticides only as a last resort. It prioritizes biological control, cultural practices, and resistant varieties first."
    },
    {
      id: 8,
      question: "Micropropagation is used in agriculture for:",
      options: [
        "Rapid multiplication of elite plants",
        "Production of disease-free plants",
        "Conservation of germplasm",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "Micropropagation (tissue culture) allows rapid multiplication of superior plants, production of pathogen-free plants, and conservation of rare/endangered species."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Wheat className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Strategies for Enhancement in Food Production</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Plant breeding, biofortification, and modern agricultural practices
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mb-24" />
      </div>

      {/* Learning Objectives */}
      <Card className="glass-panel glow-halo float-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-amber-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5" />
              <p>Understand plant breeding methods</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5" />
              <p>Learn about Green Revolution</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5" />
              <p>Master biofortification concepts</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5" />
              <p>Explore tissue culture applications</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="breeding" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="breeding">Plant Breeding</TabsTrigger>
          <TabsTrigger value="green">Green Revolution</TabsTrigger>
          <TabsTrigger value="biofortification">Biofortification</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Plant Breeding */}
        <TabsContent value="breeding" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Plant Breeding Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-4">What is Plant Breeding?</h3>
                <p className="text-green-800 mb-4">
                  Plant breeding is the genetic improvement of crop plants to develop varieties with 
                  desirable traits such as higher yield, disease resistance, improved quality, and adaptability.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Objectives</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Increase crop yield</li>
                      <li>• Improve quality (nutrition, taste)</li>
                      <li>• Disease and pest resistance</li>
                      <li>• Abiotic stress tolerance</li>
                      <li>• Shorter maturity duration</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Classical vs Modern</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• <strong>Classical:</strong> Selection, hybridization</li>
                      <li>• <strong>Modern:</strong> Molecular markers, GM crops</li>
                      <li>• <strong>Mutation:</strong> Induced variability</li>
                      <li>• <strong>Tissue culture:</strong> Micropropagation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Classical Breeding Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 mb-2">1. Selection</h4>
                    <p className="text-sm text-blue-800 mb-3">
                      Choosing plants with desirable traits from mixed populations
                    </p>
                    <div className="space-y-2">
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm">Mass Selection</p>
                        <p className="text-xs mt-1">Select superior plants from a population, bulk their seeds</p>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm">Pure Line Selection</p>
                        <p className="text-xs mt-1">Select from self-pollinated crops, develop homozygous lines</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-900 mb-2">2. Hybridization</h4>
                    <p className="text-sm text-purple-800 mb-3">
                      Cross-pollination between genetically different parents
                    </p>
                    <div className="space-y-2">
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm">Steps in Hybridization</p>
                        <ol className="text-xs mt-1 space-y-1">
                          <li>1. Selection of parents with complementary traits</li>
                          <li>2. Cross-pollination (F₁ generation)</li>
                          <li>3. Selection and self-pollination (F₂ onwards)</li>
                          <li>4. Testing and multiplication</li>
                        </ol>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm">Types of Hybrids</p>
                        <ul className="text-xs mt-1 space-y-1">
                          <li>• <strong>Intervarietal:</strong> Between varieties</li>
                          <li>• <strong>Interspecific:</strong> Between species</li>
                          <li>• <strong>Intergeneric:</strong> Between genera</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-900 mb-2">3. Mutation Breeding</h4>
                    <p className="text-sm text-orange-800 mb-3">
                      Inducing genetic variation using mutagens
                    </p>
                    <div className="grid md:grid-cols-2 gap-2">
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm">Physical Mutagens</p>
                        <p className="text-xs mt-1">X-rays, gamma rays, UV radiation</p>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm">Chemical Mutagens</p>
                        <p className="text-xs mt-1">EMS, colchicine, mustard gas</p>
                      </div>
                    </div>
                    <div className="mt-2 p-3 bg-white rounded">
                      <p className="text-xs"><strong>Example:</strong> Atomita 2 (rice variety) developed using mutation breeding</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sprout className="h-6 w-6 text-green-600" />
                    Important Breeding Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-amber-900 mb-3">Wheat Varieties</h4>
                      <ul className="text-sm text-amber-800 space-y-2">
                        <li>• <strong>Sonalika, Kalyan Sona:</strong> High-yielding, semi-dwarf</li>
                        <li>• <strong>Atlas 66:</strong> Rust-resistant</li>
                        <li>• <strong>Himgiri:</strong> Hill areas, disease-resistant</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-3">Rice Varieties</h4>
                      <ul className="text-sm text-green-800 space-y-2">
                        <li>• <strong>IR-8:</strong> First high-yielding variety</li>
                        <li>• <strong>Jaya, Ratna:</strong> Semi-dwarf, high-yielding</li>
                        <li>• <strong>Pusa Basmati 1:</strong> Aromatic, disease-resistant</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-3">Sugarcane</h4>
                      <ul className="text-sm text-blue-800 space-y-2">
                        <li>• <strong>Saccharum barberi:</strong> North Indian variety</li>
                        <li>• <strong>Saccharum officinarum:</strong> High sugar, tropical</li>
                        <li>• Hybrids: Combined high yield + sugar content</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-3">Disease Resistance</h4>
                      <ul className="text-sm text-purple-800 space-y-2">
                        <li>• <strong>Pusa Swarnim (Brassica):</strong> White rust resistant</li>
                        <li>• <strong>Pusa Shubhra (Cauliflower):</strong> Black rot resistant</li>
                        <li>• <strong>Pusa Komal (Cowpea):</strong> Bacterial blight resistant</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Green Revolution */}
        <TabsContent value="green" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-green-600" />
                Green Revolution in India
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-4">Overview</h3>
                <p className="text-green-800 mb-4">
                  The Green Revolution (1960s-1970s) transformed Indian agriculture through the introduction 
                  of high-yielding varieties (HYVs), modern agricultural techniques, and improved infrastructure.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Key Figures</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• <strong>Norman Borlaug:</strong> Father of Green Revolution (Global)</li>
                      <li>• <strong>M.S. Swaminathan:</strong> Father in India</li>
                      <li>• <strong>B.P. Pal:</strong> Pioneer in wheat breeding</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Components</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• High-Yielding Varieties (HYVs)</li>
                      <li>• Chemical fertilizers</li>
                      <li>• Irrigation expansion</li>
                      <li>• Pesticides and herbicides</li>
                      <li>• Mechanization</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Impact</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Food self-sufficiency</li>
                      <li>• Increased production</li>
                      <li>• Reduced imports</li>
                      <li>• Economic growth</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Characteristics of HYVs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-3">Semi-Dwarf Varieties</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-white rounded">
                          <p className="font-semibold text-sm mb-1">Advantages</p>
                          <ul className="text-xs space-y-1">
                            <li>• Less prone to lodging (falling)</li>
                            <li>• More resources to grain production</li>
                            <li>• Better fertilizer response</li>
                            <li>• Higher harvest index</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-white rounded">
                          <p className="font-semibold text-sm mb-1">Genetic Basis</p>
                          <ul className="text-xs space-y-1">
                            <li>• Dwarfing genes from Norin 10</li>
                            <li>• Reduced gibberellin sensitivity</li>
                            <li>• Shorter internodes</li>
                            <li>• Strong stem structure</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-3">Photoperiod Insensitivity</h4>
                      <p className="text-sm text-purple-800 mb-2">
                        HYVs are often photoperiod-insensitive, allowing multiple cropping seasons
                      </p>
                      <div className="p-3 bg-white rounded">
                        <p className="text-xs">
                          <strong>Example:</strong> IR-8 rice can be grown in multiple seasons, 
                          unlike traditional varieties that flower only in specific photoperiods
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-3">High Fertilizer Responsiveness</h4>
                      <p className="text-sm text-green-800">
                        HYVs show dramatic yield increases with proper fertilizer application, 
                        especially nitrogen, phosphorus, and potassium (NPK)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Advantages and Limitations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-900 mb-3">Advantages</h4>
                      <ul className="text-sm text-green-800 space-y-2">
                        <li>✓ Increased food production and self-sufficiency</li>
                        <li>✓ Higher farmer income</li>
                        <li>✓ Employment generation</li>
                        <li>✓ Reduced food prices</li>
                        <li>✓ Economic development</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-semibold text-red-900 mb-3">Limitations</h4>
                      <ul className="text-sm text-red-800 space-y-2">
                        <li>✗ Regional disparities (Punjab, Haryana benefited most)</li>
                        <li>✗ Environmental degradation (soil, water)</li>
                        <li>✗ Loss of genetic diversity</li>
                        <li>✗ High input costs (fertilizers, pesticides)</li>
                        <li>✗ Groundwater depletion</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Biofortification */}
        <TabsContent value="biofortification" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Biofortification and Nutritional Enhancement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border-2 border-orange-200">
                <h3 className="text-xl font-bold text-orange-900 mb-4">What is Biofortification?</h3>
                <p className="text-orange-800 mb-4">
                  Biofortification is the process of breeding crops to increase their nutritional value. 
                  It addresses micronutrient deficiencies (hidden hunger) affecting billions globally.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Target Nutrients</h4>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• Vitamin A (β-carotene)</li>
                      <li>• Iron (Fe)</li>
                      <li>• Zinc (Zn)</li>
                      <li>• Protein quality</li>
                      <li>• Essential amino acids</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Approaches</h4>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• Conventional breeding</li>
                      <li>• Genetic engineering</li>
                      <li>• Marker-assisted selection</li>
                      <li>• Genomics approaches</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Benefits</h4>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• Sustainable solution</li>
                      <li>• Cost-effective</li>
                      <li>• Reaches rural poor</li>
                      <li>• No behavior change needed</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Examples of Biofortified Crops</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-900 mb-2">Golden Rice (Vitamin A)</h4>
                    <p className="text-sm text-yellow-800 mb-3">
                      Genetically modified rice enriched with β-carotene (provitamin A) to combat vitamin A deficiency
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm mb-1">Mechanism</p>
                        <p className="text-xs">Introduces genes for β-carotene biosynthesis pathway into rice endosperm</p>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm mb-1">Impact</p>
                        <p className="text-xs">Addresses VAD causing blindness and immune deficiency in children</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 mb-2">Iron-Rich Crops</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm">Pearl Millet (Dhanshakti)</p>
                        <p className="text-xs mt-1">Biofortified with iron (Fe) - 2-3 times higher than normal varieties</p>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm">Beans (BIO-FORTIFIED)</p>
                        <p className="text-xs mt-1">High iron and zinc content, developed through conventional breeding</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-900 mb-2">Protein Quality Enhancement</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm">Quality Protein Maize (QPM)</p>
                        <p className="text-xs mt-1">Higher lysine and tryptophan content (essential amino acids)</p>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm">Protina (Wheat variety)</p>
                        <p className="text-xs mt-1">High protein content developed through mutation breeding</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900 mb-2">Other Examples</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      <div className="p-3 bg-white rounded">
                        <p className="text-xs"><strong>Orange Sweet Potato:</strong> High β-carotene</p>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="text-xs"><strong>Zinc Rice:</strong> Enhanced Zn bioavailability</p>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="text-xs"><strong>Vitamin A Cassava:</strong> Yellow cassava varieties</p>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="text-xs"><strong>Iron Pearl Millet:</strong> Combats anemia</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Tissue Culture and Micropropagation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-cyan-50 rounded-lg">
                    <h4 className="font-semibold text-cyan-900 mb-3">Applications in Agriculture</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="p-3 bg-white rounded">
                          <p className="font-semibold text-sm">Rapid Multiplication</p>
                          <p className="text-xs mt-1">Thousands of plantlets from single explant (e.g., banana, orchids)</p>
                        </div>
                        <div className="p-3 bg-white rounded">
                          <p className="font-semibold text-sm">Disease-Free Plants</p>
                          <p className="text-xs mt-1">Meristem culture produces virus-free plants (potato, sugarcane)</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="p-3 bg-white rounded">
                          <p className="font-semibold text-sm">Somatic Hybridization</p>
                          <p className="text-xs mt-1">Fusion of protoplasts from different species (Pomato = Potato + Tomato)</p>
                        </div>
                        <div className="p-3 bg-white rounded">
                          <p className="font-semibold text-sm">Germplasm Conservation</p>
                          <p className="text-xs mt-1">Long-term storage of rare/endangered species</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-rose-50 rounded-lg">
                    <h4 className="font-semibold text-rose-900 mb-2">Somaclonal Variation</h4>
                    <p className="text-sm text-rose-800">
                      Genetic variation in plants regenerated from tissue culture, useful for generating new traits
                    </p>
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
