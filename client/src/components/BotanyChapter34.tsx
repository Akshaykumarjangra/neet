import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Microscope, CheckCircle2, XCircle, Brain, Droplets, Factory } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
export function BotanyChapter34() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Which microorganism is used in the production of citric acid?",
      options: ["Aspergillus niger", "Lactobacillus", "Penicillium", "Rhizobium"],
      correctAnswer: "A",
      explanation: "Aspergillus niger is a fungus widely used in industrial production of citric acid through fermentation processes."
    },
    {
      id: 2,
      question: "The 'Ganga Action Plan' uses which bacteria for sewage treatment?",
      options: ["E. coli", "Bacillus subtilis", "Streptococcus", "Anabaena"],
      correctAnswer: "B",
      explanation: "Bacillus subtilis and other heterotrophic bacteria are used in bioremediation and sewage treatment to decompose organic matter."
    },
    {
      id: 3,
      question: "Cyclosporin A, an immunosuppressant drug, is produced by:",
      options: ["Trichoderma polysporum", "Penicillium notatum", "Aspergillus niger", "Monascus purpureus"],
      correctAnswer: "A",
      explanation: "Cyclosporin A is obtained from the fungus Trichoderma polysporum and is used to suppress immune reactions in organ transplant patients."
    },
    {
      id: 4,
      question: "Swiss cheese gets its characteristic large holes due to production of:",
      options: ["Lactic acid", "Carbon dioxide", "Methane", "Ethanol"],
      correctAnswer: "B",
      explanation: "Propionibacterium shermanii produces large amounts of CO₂ during fermentation, creating the characteristic holes in Swiss cheese."
    },
    {
      id: 5,
      question: "Which of the following is a nitrogen-fixing cyanobacterium?",
      options: ["Rhizobium", "Nostoc", "Azotobacter", "Clostridium"],
      correctAnswer: "B",
      explanation: "Nostoc is a cyanobacterium (blue-green alga) capable of fixing atmospheric nitrogen, often found in symbiotic associations."
    },
    {
      id: 6,
      question: "Statins used to lower blood cholesterol are produced by:",
      options: ["Monascus purpureus", "Lactobacillus", "Streptococcus", "Saccharomyces"],
      correctAnswer: "A",
      explanation: "Statins are produced by the yeast Monascus purpureus and act as competitive inhibitors of the enzyme HMG-CoA reductase involved in cholesterol synthesis."
    },
    {
      id: 7,
      question: "The insecticide 'Bt toxin' is produced by:",
      options: ["Bacillus thuringiensis", "Pseudomonas", "Trichoderma", "Agrobacterium"],
      correctAnswer: "A",
      explanation: "Bacillus thuringiensis produces Bt toxin (cry proteins) that are toxic to specific insects, used in biological pest control and GM crops."
    },
    {
      id: 8,
      question: "Methanogens are found in:",
      options: ["Acidic soils", "Rumen of cattle", "Ocean surface", "Desert sand"],
      correctAnswer: "B",
      explanation: "Methanogens are archaebacteria found in anaerobic environments like cattle rumen and biogas plants, where they produce methane from organic matter."
    },
    {
      id: 9,
      question: "Which microbe is used in production of streptokinase (clot buster)?",
      options: ["Streptococcus", "Clostridium", "Lactobacillus", "Azotobacter"],
      correctAnswer: "A",
      explanation: "Streptokinase is produced by Streptococcus and is used as a 'clot buster' to dissolve blood clots in patients with myocardial infarction."
    },
    {
      id: 10,
      question: "BOD (Biological Oxygen Demand) refers to:",
      options: [
        "Amount of oxygen required by aerobic microbes",
        "Amount of oxygen in water",
        "Chemical oxygen demand",
        "Dissolved oxygen"
      ],
      correctAnswer: "A",
      explanation: "BOD is the amount of oxygen required by aerobic microorganisms to decompose organic matter in water. High BOD indicates high pollution levels."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Microscope className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Microbes in Human Welfare</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Industrial applications, food production, and environmental benefits of microorganisms
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
              <p>Understand microbial applications in household products</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p>Learn industrial production of chemicals</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p>Master sewage treatment processes</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p>Explore biocontrol agents and biofertilizers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="household" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="household">Household Use</TabsTrigger>
          <TabsTrigger value="industrial">Industrial</TabsTrigger>
          <TabsTrigger value="sewage">Sewage Treatment</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Household Applications */}
        <TabsContent value="household" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Microbes in Household Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-200">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Dairy Products</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-3">Curd & Yogurt</h4>
                    <ul className="text-sm text-amber-800 space-y-2">
                      <li>• <strong>Microbe:</strong> Lactobacillus acidophilus</li>
                      <li>• <strong>Process:</strong> Lactic acid fermentation</li>
                      <li>• Converts lactose → lactic acid</li>
                      <li>• Coagulates milk proteins (casein)</li>
                      <li>• Improves nutritional quality</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-3">Cheese Production</h4>
                    <ul className="text-sm text-amber-800 space-y-2">
                      <li>• <strong>Swiss Cheese:</strong> Propionibacterium shermanii</li>
                      <li>• <strong>Roquefort:</strong> Penicillium roqueforti</li>
                      <li>• CO₂ production creates holes</li>
                      <li>• Large holes in Swiss cheese</li>
                      <li>• Blue-green color in Roquefort</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-6 w-6 text-purple-600" />
                    Fermented Beverages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-900 mb-3">Alcoholic Beverages</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm mb-2">Wine Production</p>
                        <ul className="text-xs space-y-1">
                          <li>• <strong>Microbe:</strong> Saccharomyces cerevisiae</li>
                          <li>• Ferments grape juice</li>
                          <li>• Glucose → Ethanol + CO₂</li>
                          <li>• Without distillation (8-14% alcohol)</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm mb-2">Beer Production</p>
                        <ul className="text-xs space-y-1">
                          <li>• <strong>Microbe:</strong> Saccharomyces cerevisiae</li>
                          <li>• Malted cereals and hops used</li>
                          <li>• Malting: germination of barley</li>
                          <li>• 3-6% alcohol content</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900 mb-2">Bread Making</h4>
                    <p className="text-sm text-green-800 mb-3">
                      Baker's yeast (Saccharomyces cerevisiae) is used in dough fermentation
                    </p>
                    <div className="p-3 bg-white rounded">
                      <p className="text-xs space-y-1">
                        <strong>Process:</strong><br/>
                        • CO₂ production makes dough rise and porous<br/>
                        • Ethanol evaporates during baking<br/>
                        • Improves texture and flavor
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Other Fermented Foods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                      <h4 className="font-semibold text-orange-900 mb-2">Idli & Dosa</h4>
                      <p className="text-sm text-orange-800">
                        <strong>Microbes:</strong> Leuconostoc, Lactobacillus<br/>
                        Fermentation of rice and dal batter
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Soy Sauce</h4>
                      <p className="text-sm text-blue-800">
                        <strong>Microbe:</strong> Aspergillus oryzae<br/>
                        Fermentation of soybeans
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Toddy</h4>
                      <p className="text-sm text-green-800">
                        <strong>Microbe:</strong> Saccharomyces<br/>
                        Palm sap fermentation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Industrial Applications */}
        <TabsContent value="industrial" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="h-6 w-6 text-blue-600" />
                Industrial Production
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Organic Acids</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Citric Acid</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• <strong>Microbe:</strong> Aspergillus niger</li>
                      <li>• Used in beverages, food preservation</li>
                      <li>• Pharmaceuticals and cosmetics</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Acetic Acid (Vinegar)</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• <strong>Microbe:</strong> Acetobacter aceti</li>
                      <li>• Oxidation of ethanol</li>
                      <li>• Food preservative, condiment</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Antibiotics Production</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900 mb-3">Penicillin</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 bg-white rounded">
                        <p className="text-sm">
                          <strong>Microbe:</strong> Penicillium notatum<br/>
                          <strong>Discovered by:</strong> Alexander Fleming (1928)<br/>
                          First antibiotic discovered
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="text-sm">
                          <strong>Mechanism:</strong> Inhibits cell wall synthesis<br/>
                          Effective against Gram-positive bacteria<br/>
                          β-lactam antibiotic
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Streptomycin</h4>
                      <p className="text-sm text-purple-800">
                        <strong>Source:</strong> Streptomyces griseus<br/>
                        Treats tuberculosis and other bacterial infections
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-900 mb-2">Tetracycline</h4>
                      <p className="text-sm text-orange-800">
                        <strong>Source:</strong> Streptomyces aureofaciens<br/>
                        Broad-spectrum antibiotic
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Enzymes and Bioactive Molecules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-semibold text-red-900 mb-2">Streptokinase</h4>
                      <p className="text-sm text-red-800 mb-2">
                        <strong>Source:</strong> Streptococcus
                      </p>
                      <ul className="text-xs text-red-800 space-y-1">
                        <li>• Clot buster (thrombolytic agent)</li>
                        <li>• Treats myocardial infarction</li>
                        <li>• Dissolves fibrin in blood clots</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-900 mb-2">Cyclosporin A</h4>
                      <p className="text-sm text-blue-800 mb-2">
                        <strong>Source:</strong> Trichoderma polysporum
                      </p>
                      <ul className="text-xs text-blue-800 space-y-1">
                        <li>• Immunosuppressant drug</li>
                        <li>• Used in organ transplantation</li>
                        <li>• Prevents rejection reactions</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-yellow-900 mb-2">Statins</h4>
                      <p className="text-sm text-yellow-800 mb-2">
                        <strong>Source:</strong> Monascus purpureus
                      </p>
                      <ul className="text-xs text-yellow-800 space-y-1">
                        <li>• Lowers blood cholesterol</li>
                        <li>• Inhibits HMG-CoA reductase</li>
                        <li>• Prevents cardiovascular diseases</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-900 mb-2">Lipase</h4>
                      <p className="text-sm text-green-800 mb-2">
                        <strong>Source:</strong> Candida, Geotrichum
                      </p>
                      <ul className="text-xs text-green-800 space-y-1">
                        <li>• Used in detergents</li>
                        <li>• Removes oil stains</li>
                        <li>• Food industry applications</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Biogas Production</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-3">Methanogens in Biogas Plants</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-lg">
                        <h5 className="font-semibold text-sm mb-2">Microorganisms</h5>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Methanobacterium</li>
                          <li>• Methanococcus</li>
                          <li>• Archaebacteria (methanogens)</li>
                          <li>• Anaerobic bacteria</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white rounded-lg">
                        <h5 className="font-semibold text-sm mb-2">Process</h5>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Decomposition of organic waste</li>
                          <li>• Produces methane (CH₄) + CO₂</li>
                          <li>• Biogas composition: 50-70% CH₄</li>
                          <li>• Residual slurry is good manure</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sewage Treatment */}
        <TabsContent value="sewage" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Sewage Treatment and Bioremediation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border-2 border-cyan-200">
                <h3 className="text-xl font-bold text-cyan-900 mb-4">Sewage Treatment Process</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-cyan-900 mb-3">Primary Treatment (Physical)</h4>
                    <ul className="text-sm text-cyan-800 space-y-1">
                      <li>• Removal of large and small particles by filtration</li>
                      <li>• Sedimentation in settling tanks</li>
                      <li>• Primary sludge settles at bottom</li>
                      <li>• Floating debris (scum) removed from top</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 mb-3">Secondary Treatment (Biological)</h4>
                    <p className="text-sm text-blue-800 mb-3">
                      Primary effluent is passed to aeration tanks where aerobic microbes digest organic matter
                    </p>
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <div className="p-3 bg-blue-50 rounded">
                        <p className="font-semibold text-sm mb-1">Activated Sludge</p>
                        <p className="text-xs">
                          • Mixture of aerobic bacteria and fungi<br/>
                          • Flocs form (masses of bacteria)<br/>
                          • BOD significantly reduced
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded">
                        <p className="font-semibold text-sm mb-1">Key Microbes</p>
                        <p className="text-xs">
                          • Bacteria: Pseudomonas, Bacillus<br/>
                          • Fungi: Aspergillus, Penicillium<br/>
                          • Protozoa consume bacteria
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded">
                      <p className="text-xs">
                        <strong>Note:</strong> Some activated sludge is returned to aeration tank to maintain microbial population
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900 mb-3">Anaerobic Sludge Digestion</h4>
                    <p className="text-sm text-green-800 mb-2">
                      Excess sludge is transferred to anaerobic sludge digesters
                    </p>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Anaerobic bacteria digest organic matter</li>
                      <li>• Produces biogas (methane, H₂S, CO₂)</li>
                      <li>• Methanogenic bacteria involved</li>
                      <li>• Biogas can be used as fuel</li>
                      <li>• Remaining sludge used as manure</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>BOD and Water Quality</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Biological Oxygen Demand (BOD)</h4>
                    <p className="text-sm text-orange-800 mb-3">
                      Amount of oxygen required by aerobic microorganisms to decompose organic matter in water
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm mb-1">Clean Water</p>
                        <p className="text-xs">Low BOD (&lt; 5 ppm)<br/>Less organic matter</p>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="font-semibold text-sm mb-1">Polluted Water</p>
                        <p className="text-xs">High BOD ({'>'} 17 ppm)<br/>High organic pollution</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Biocontrol Agents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-900 mb-3">Bacillus thuringiensis (Bt)</h4>
                      <ul className="text-sm text-purple-800 space-y-2">
                        <li>• Produces Bt toxin (cry proteins)</li>
                        <li>• Insecticidal crystal proteins</li>
                        <li>• Toxic to butterfly/moth larvae</li>
                        <li>• Used in organic farming</li>
                        <li>• Gene used in Bt cotton, Bt corn</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-900 mb-3">Trichoderma</h4>
                      <ul className="text-sm text-green-800 space-y-2">
                        <li>• Free-living fungus</li>
                        <li>• Found in soil and root ecosystems</li>
                        <li>• Biocontrol agent for plant pathogens</li>
                        <li>• Enhances plant growth</li>
                        <li>• Improves nutrient uptake</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-900 mb-3">Baculoviruses</h4>
                      <ul className="text-sm text-blue-800 space-y-2">
                        <li>• Nucleopolyhedrovirus (NPV)</li>
                        <li>• Species-specific insect viruses</li>
                        <li>• Narrow spectrum applications</li>
                        <li>• No negative impact on plants</li>
                        <li>• Safe for beneficial insects</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-yellow-900 mb-3">Biofertilizers</h4>
                      <ul className="text-sm text-yellow-800 space-y-2">
                        <li>• <strong>Rhizobium:</strong> N-fixing in legumes</li>
                        <li>• <strong>Azotobacter, Azospirillum:</strong> Free-living N-fixers</li>
                        <li>• <strong>Anabaena:</strong> Cyanobacterium in rice fields</li>
                        <li>• <strong>Mycorrhiza:</strong> Phosphorus absorption</li>
                      </ul>
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
