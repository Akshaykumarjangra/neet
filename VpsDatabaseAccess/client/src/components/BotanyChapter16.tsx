
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sprout, CheckCircle2, XCircle, Brain, Lightbulb, BookOpen , Loader2 } from "lucide-react";

export function BotanyChapter16() {
  // Fetch questions from database for Molecular Basis of Inheritance (topicId: 80)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '80'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=80');
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
      question: "The process of improving crop varieties for better yield is called:",
      options: ["Mutation", "Plant breeding", "Genetic engineering", "Tissue culture"],
      correctAnswer: 1,
      explanation: "Plant breeding is the purposeful manipulation of plant species to create desired genotypes and phenotypes for specific purposes, especially for improving yield and quality."
    },
    {
      id: 2,
      question: "Green Revolution in India was primarily associated with:",
      options: ["Cotton production", "Wheat and rice production", "Sugarcane production", "Pulses production"],
      correctAnswer: 1,
      explanation: "The Green Revolution (1960s-1970s) in India primarily involved development of high-yielding varieties of wheat and rice, leading to significant increase in food grain production."
    },
    {
      id: 3,
      question: "Semi-dwarf varieties of wheat developed during Green Revolution were resistant to:",
      options: ["Drought", "Lodging (falling over)", "Pests", "Diseases"],
      correctAnswer: 1,
      explanation: "Semi-dwarf varieties had shorter, stronger stems that were resistant to lodging (falling over), which was a major problem with tall varieties during heavy rain or wind."
    },
    {
      id: 4,
      question: "Which technique is used for large-scale production of plants with desirable traits?",
      options: ["Cross-breeding", "Tissue culture", "Hybridization", "Selection"],
      correctAnswer: 1,
      explanation: "Tissue culture (micropropagation) allows rapid, large-scale production of genetically identical plants (clones) from a small tissue sample under sterile conditions."
    },
    {
      id: 5,
      question: "Somatic hybridization involves fusion of:",
      options: ["Gametes", "Protoplasts", "Seeds", "Pollen grains"],
      correctAnswer: 1,
      explanation: "Somatic hybridization involves fusion of protoplasts (cells without cell walls) from two different plant species to create a hybrid. This technique can overcome sexual incompatibility barriers."
    },
    {
      id: 6,
      question: "Inbreeding depression in animals refers to:",
      options: [
        "Increased productivity",
        "Reduced fertility and productivity",
        "Improved disease resistance",
        "Enhanced growth rate"
      ],
      correctAnswer: 1,
      explanation: "Inbreeding depression is the reduced biological fitness in a population due to continuous inbreeding, resulting in accumulation of harmful recessive genes, leading to reduced fertility and productivity."
    },
    {
      id: 7,
      question: "Out-breeding devices in plants include all EXCEPT:",
      options: ["Dioecy", "Self-incompatibility", "Dichogamy", "Self-pollination"],
      correctAnswer: 3,
      explanation: "Out-breeding devices promote cross-pollination. Dioecy (separate sexes), self-incompatibility, and dichogamy (different maturation times) prevent self-pollination. Self-pollination is inbreeding, not out-breeding."
    },
    {
      id: 8,
      question: "Single Cell Protein (SCP) refers to protein obtained from:",
      options: ["Single muscle cell", "Microorganisms", "Single plant cell", "Tissue culture"],
      correctAnswer: 1,
      explanation: "Single Cell Protein is protein derived from microorganisms (bacteria, yeast, algae, fungi) grown on various substrates. Example: Spirulina (blue-green algae)."
    },
    {
      id: 9,
      question: "Bt cotton is resistant to:",
      options: ["Viral diseases", "Bacterial diseases", "Insect pests", "Fungal diseases"],
      correctAnswer: 2,
      explanation: "Bt cotton contains genes from Bacillus thuringiensis that produce Bt toxin, which is toxic to lepidopteran insects (bollworms), making the plant resistant to insect pests."
    },
    {
      id: 10,
      question: "Artificial insemination in animal husbandry helps in:",
      options: [
        "Reducing diseases",
        "Using superior males for breeding many females",
        "Improving nutrition",
        "Faster growth"
      ],
      correctAnswer: 1,
      explanation: "Artificial insemination allows semen from a superior male to be used to inseminate many females across different locations, improving the genetic quality of the herd."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sprout className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Strategies for Enhancement in Food Production</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Plant and animal breeding for improved food production
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
              <p>Understand plant breeding techniques and strategies</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Learn about animal husbandry and breeding methods</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Master tissue culture and biotechnology applications</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Understand single cell protein and biofortification</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="plant" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="plant">Plant Breeding</TabsTrigger>
          <TabsTrigger value="animal">Animal Husbandry</TabsTrigger>
          <TabsTrigger value="biotech">Biotechnology</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Plant Breeding */}
        <TabsContent value="plant" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-green-600" />
                Plant Breeding Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3">Classical Plant Breeding Steps</h4>
                <div className="space-y-2">
                  {[
                    { step: 1, title: "Collection of Variability", desc: "Germplasm collection from different geographical regions" },
                    { step: 2, title: "Evaluation and Selection", desc: "Select parents with desirable traits" },
                    { step: 3, title: "Cross-Hybridization", desc: "Crosses between selected parents" },
                    { step: 4, title: "Selection and Testing", desc: "Select superior hybrids and test for performance" },
                    { step: 5, title: "Release of Variety", desc: "Multiplication and distribution of seeds" }
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3 p-3 bg-white rounded border border-green-300">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900 text-sm">{item.title}</h4>
                        <p className="text-xs text-green-800">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Hybridization</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <strong>Intervarietal:</strong> Between different varieties</li>
                    <li>• <strong>Interspecific:</strong> Between different species</li>
                    <li>• <strong>Intergeneric:</strong> Between different genera</li>
                    <li>• Used to combine desirable traits from different sources</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Mutation Breeding</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Induced mutations using chemicals/radiation</li>
                    <li>• Creates new genetic variations</li>
                    <li>• Example: High-yielding mung bean varieties</li>
                    <li>• Gamma rays, X-rays, UV rays, chemicals (EMS)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Green Revolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-3">Key Features</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-800">
                  <div>
                    <p className="font-semibold mb-2">High-Yielding Varieties (HYV)</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Wheat: Sonalika, Kalyan Sona</li>
                      <li>• Rice: IR-8, Jaya, Ratna</li>
                      <li>• Semi-dwarf varieties</li>
                      <li>• Responsive to fertilizers</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Achievements</p>
                    <ul className="space-y-1 ml-4">
                      <li>• India became self-sufficient in food grains</li>
                      <li>• Increased from 51 million tons (1960) to over 300 million tons</li>
                      <li>• Norman Borlaug - Father of Green Revolution</li>
                      <li>• M.S. Swaminathan - Indian Green Revolution</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2">Biofortification</h4>
                <p className="text-sm text-orange-800 mb-2">
                  Breeding crops with higher levels of vitamins, minerals, proteins, or healthier fats
                </p>
                <div className="grid md:grid-cols-3 gap-2 text-xs text-orange-800">
                  <div className="p-2 bg-white rounded">
                    <p className="font-semibold">Vitamin A</p>
                    <p>Golden Rice, Carrots</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <p className="font-semibold">Iron</p>
                    <p>Fortified wheat, spinach</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <p className="font-semibold">Protein</p>
                    <p>High-protein maize, wheat</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Animal Husbandry */}
        <TabsContent value="animal" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-orange-600" />
                Animal Breeding
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-600">
                  <h4 className="font-semibold text-pink-900 mb-2">Inbreeding</h4>
                  <p className="text-sm text-pink-800 mb-2">Mating of closely related individuals (4-6 generations)</p>
                  <div className="space-y-1 text-sm text-pink-800">
                    <p><strong>Advantages:</strong></p>
                    <ul className="space-y-1 ml-4 text-xs">
                      <li>• Increases homozygosity</li>
                      <li>• Purifies breed lines</li>
                      <li>• Identifies superior individuals</li>
                    </ul>
                    <p className="mt-2"><strong>Disadvantages:</strong></p>
                    <ul className="space-y-1 ml-4 text-xs">
                      <li>• Inbreeding depression</li>
                      <li>• Reduced fertility and productivity</li>
                      <li>• Accumulation of harmful genes</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h4 className="font-semibold text-blue-900 mb-2">Out-breeding</h4>
                  <p className="text-sm text-blue-800 mb-2">Mating of unrelated animals</p>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div>
                      <p className="font-semibold text-xs">Out-crossing</p>
                      <p className="text-xs">Same breed, no common ancestors for 4-6 generations</p>
                    </div>
                    <div>
                      <p className="font-semibold text-xs">Cross-breeding</p>
                      <p className="text-xs">Between different breeds (e.g., Hisardale sheep)</p>
                    </div>
                    <div>
                      <p className="font-semibold text-xs">Interspecific Hybridization</p>
                      <p className="text-xs">Between different species (e.g., Mule = Horse × Donkey)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3">Controlled Breeding Methods</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded border border-green-300">
                    <p className="font-semibold text-green-900 mb-1">Artificial Insemination (AI)</p>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Semen from superior male used for many females</li>
                      <li>• Overcomes geographical barriers</li>
                      <li>• Improves herd quality</li>
                      <li>• Cost-effective</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white rounded border border-green-300">
                    <p className="font-semibold text-green-900 mb-1">Multiple Ovulation Embryo Transfer (MOET)</p>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Hormones induce multiple ovulation</li>
                      <li>• Embryos collected and transferred to surrogate mothers</li>
                      <li>• Increases number of offspring from superior females</li>
                      <li>• 6-8 calves per year instead of one</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Animal Husbandry Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Dairy Farming</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Management of dairy animals for milk</li>
                    <li>• Breeds: Jersey, Brown Swiss (foreign)</li>
                    <li>• Sahiwal, Red Sindhi (Indian)</li>
                    <li>• Proper nutrition and hygiene</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Poultry Farming</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Rearing chickens for eggs/meat</li>
                    <li>• Layers: Egg production (Leghorn)</li>
                    <li>• Broilers: Meat production (Plymouth Rock)</li>
                    <li>• Controlled environment</li>
                  </ul>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <h4 className="font-semibold text-teal-900 mb-2">Aquaculture</h4>
                  <ul className="text-sm text-teal-800 space-y-1">
                    <li>• Culture of aquatic organisms</li>
                    <li>• Fish farming: Catla, Rohu, Mrigal</li>
                    <li>• Composite fish culture system</li>
                    <li>• Prawns, shellfish culture</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2">Bee Keeping (Apiculture)</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-orange-800">
                  <div>
                    <p className="font-semibold mb-1">Products:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Honey (food, medicine)</li>
                      <li>• Beeswax (cosmetics, polishes)</li>
                      <li>• Royal jelly, propolis</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Indian Bee Species:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Apis indica (Indian bee)</li>
                      <li>• Apis dorsata (Rock bee)</li>
                      <li>• Apis florea (Little bee)</li>
                      <li>• Apis mellifera (Italian bee)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Biotechnology */}
        <TabsContent value="biotech" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Tissue Culture & Micropropagation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-3">Plant Tissue Culture</h4>
                <p className="text-sm text-indigo-800 mb-3">
                  Growing plant cells, tissues, or organs in sterile, controlled conditions on nutrient medium
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded border border-indigo-300">
                    <p className="font-semibold text-indigo-900 mb-2">Advantages</p>
                    <ul className="text-sm text-indigo-800 space-y-1">
                      <li>• Rapid multiplication</li>
                      <li>• Disease-free plants</li>
                      <li>• Genetic uniformity (clones)</li>
                      <li>• Year-round production</li>
                      <li>• Conservation of rare species</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white rounded border border-indigo-300">
                    <p className="font-semibold text-indigo-900 mb-2">Applications</p>
                    <ul className="text-sm text-indigo-800 space-y-1">
                      <li>• Micropropagation</li>
                      <li>• Somatic embryogenesis</li>
                      <li>• Production of virus-free plants</li>
                      <li>• Secondary metabolite production</li>
                      <li>• Somatic hybridization</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <h4 className="font-semibold text-pink-900 mb-2">Somatic Hybridization</h4>
                <p className="text-sm text-pink-800 mb-2">
                  Fusion of protoplasts from two different varieties/species to form hybrid
                </p>
                <ul className="text-sm text-pink-800 space-y-1">
                  <li>• Cell walls removed enzymatically to get protoplasts</li>
                  <li>• Fusion induced by PEG or electrofusion</li>
                  <li>• Example: Pomato (Potato + Tomato)</li>
                  <li>• Overcomes sexual incompatibility</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Single Cell Protein (SCP)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Concept & Sources</h4>
                <p className="text-sm text-blue-800 mb-3">
                  Protein obtained from microorganisms grown on various substrates as alternative protein source
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-800">
                  <div>
                    <p className="font-semibold mb-1">Microorganisms Used:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Spirulina (blue-green algae)</li>
                      <li>• Chlorella (green algae)</li>
                      <li>• Methylophilus (bacteria)</li>
                      <li>• Saccharomyces (yeast)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Advantages:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• High protein content (50-80%)</li>
                      <li>• Fast growth rate</li>
                      <li>• Can use waste materials as substrate</li>
                      <li>• Rich in vitamins and minerals</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Transgenic Plants</h4>
                <p className="text-sm text-green-800 mb-2">
                  Plants with foreign gene(s) introduced for desired traits
                </p>
                <div className="grid md:grid-cols-2 gap-2 text-xs text-green-800">
                  <div className="p-2 bg-white rounded">
                    <p className="font-semibold">Bt Cotton</p>
                    <p>Bacillus thuringiensis gene for insect resistance</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <p className="font-semibold">Golden Rice</p>
                    <p>Vitamin A enriched rice</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <p className="font-semibold">Flavr Savr Tomato</p>
                    <p>Delayed ripening, longer shelf life</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <p className="font-semibold">Herbicide Resistant</p>
                    <p>Resistance to glyphosate (Roundup)</p>
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
