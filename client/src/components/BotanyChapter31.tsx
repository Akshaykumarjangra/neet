
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sun, CheckCircle2, XCircle, Brain, Lightbulb, Move } from "lucide-react";

export function BotanyChapter31() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Nyctinastic movements in plants are controlled by:",
      options: ["Light intensity", "Temperature", "Biological clock", "Gravity"],
      correctAnswer: 2,
      explanation: "Nyctinastic (sleep) movements like closing of leaflets at night are controlled by the biological clock (circadian rhythm), independent of external stimuli."
    },
    {
      id: 2,
      question: "Short-day plants flower when:",
      options: [
        "Day length is longer than critical photoperiod",
        "Night length is shorter than critical dark period",
        "Night length is longer than critical dark period",
        "Day and night are equal"
      ],
      correctAnswer: 2,
      explanation: "Short-day plants (actually long-night plants) flower when the continuous dark period is longer than a critical duration. It's the night length that matters."
    },
    {
      id: 3,
      question: "The hypothetical flowering hormone is called:",
      options: ["Florigen", "Vernalin", "Gibberellin", "Auxin"],
      correctAnswer: 0,
      explanation: "Florigen is the hypothetical flowering hormone proposed by Chailakhyan. Though not yet isolated, recent research suggests it may be a protein (FT protein)."
    },
    {
      id: 4,
      question: "Vernalization is the promotion of flowering by:",
      options: ["Light treatment", "Cold treatment", "Hormone application", "Water stress"],
      correctAnswer: 1,
      explanation: "Vernalization is the process where cold treatment (typically 0-5°C) accelerates flowering in plants like winter wheat and biennial plants."
    },
    {
      id: 5,
      question: "Which pigment is responsible for photoperiodism?",
      options: ["Chlorophyll", "Carotenoid", "Phytochrome", "Anthocyanin"],
      correctAnswer: 2,
      explanation: "Phytochrome is the photoreceptor pigment that exists in two interconvertible forms (Pr and Pfr) and controls photoperiodic responses including flowering."
    },
    {
      id: 6,
      question: "Thigmotropism is exhibited by:",
      options: ["Roots growing downward", "Stems bending toward light", "Tendrils coiling around support", "Leaves closing at night"],
      correctAnswer: 2,
      explanation: "Thigmotropism is growth movement in response to touch/contact. Tendrils of climbing plants show positive thigmotropism by coiling around support."
    },
    {
      id: 7,
      question: "Day-neutral plants flower:",
      options: [
        "Only in long days",
        "Only in short days",
        "Regardless of photoperiod",
        "Only when day equals night"
      ],
      correctAnswer: 2,
      explanation: "Day-neutral plants like tomato, cucumber, and maize flower regardless of the photoperiod. They are not sensitive to day length."
    },
    {
      id: 8,
      question: "The site of perception of photoperiodic stimulus is:",
      options: ["Root", "Shoot apex", "Mature leaf", "Young leaf"],
      correctAnswer: 2,
      explanation: "Mature leaves are the site of photoperiodic perception. The signal (florigen) is then translocated from leaves to the shoot apex to induce flowering."
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-yellow-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sun className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Plant Responses - Movements and Photoperiodism</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Understanding how plants respond to environmental stimuli
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mb-24" />
      </div>

      {/* Learning Objectives */}
      <Card className="glass-panel glow-halo float-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-orange-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5" />
              <p>Understand different types of plant movements</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5" />
              <p>Learn about photoperiodism and flowering</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5" />
              <p>Master role of phytochrome</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5" />
              <p>Explore vernalization process</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="movements" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="movements">Plant Movements</TabsTrigger>
          <TabsTrigger value="photoperiodism">Photoperiodism</TabsTrigger>
          <TabsTrigger value="vernalization">Vernalization</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Plant Movements */}
        <TabsContent value="movements" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Classification of Plant Movements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Tropic Movements (Growth Movements)</h3>
                  <p className="text-sm text-green-800 mb-3">Directional growth responses to external stimuli</p>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold text-sm">Phototropism</h4>
                      <p className="text-xs mt-1">Growth response to light (stems: positive, roots: negative)</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold text-sm">Geotropism/Gravitropism</h4>
                      <p className="text-xs mt-1">Response to gravity (roots: positive, stems: negative)</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold text-sm">Hydrotropism</h4>
                      <p className="text-xs mt-1">Growth response toward water</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold text-sm">Thigmotropism</h4>
                      <p className="text-xs mt-1">Response to touch (tendrils coiling)</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold text-sm">Chemotropism</h4>
                      <p className="text-xs mt-1">Growth toward chemicals (pollen tube toward ovule)</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Nastic Movements (Non-directional)</h3>
                  <p className="text-sm text-blue-800 mb-3">Independent of stimulus direction</p>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold text-sm">Photonasty</h4>
                      <p className="text-xs mt-1">Response to light intensity (flowers opening/closing)</p>
                      <p className="text-xs mt-1 text-blue-600">Example: Oxalis, tulip flowers</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold text-sm">Thermonasty</h4>
                      <p className="text-xs mt-1">Response to temperature (tulip, crocus)</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold text-sm">Nyctinasty</h4>
                      <p className="text-xs mt-1">Sleep movements (day/night rhythm)</p>
                      <p className="text-xs mt-1 text-blue-600">Example: Mimosa, Oxalis leaflets</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold text-sm">Seismonasty/Thigmonasty</h4>
                      <p className="text-xs mt-1">Response to touch/shock</p>
                      <p className="text-xs mt-1 text-blue-600">Example: Mimosa pudica (touch-me-not)</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Move className="h-6 w-6 text-purple-600" />
                    Mechanism of Movement in Mimosa pudica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <ol className="text-sm space-y-2">
                      <li><strong>1.</strong> Touch stimulus triggers action potential</li>
                      <li><strong>2.</strong> Electrical signal travels to pulvinus (swollen base of petiole)</li>
                      <li><strong>3.</strong> K⁺ and Cl⁻ ions move out of cells in lower half of pulvinus</li>
                      <li><strong>4.</strong> Water follows by osmosis, cells become flaccid</li>
                      <li><strong>5.</strong> Turgor pressure decreases, leaflets fold and droop</li>
                      <li><strong>6.</strong> Gradual restoration occurs as ions move back in</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Photoperiodism */}
        <TabsContent value="photoperiodism" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Photoperiodism - Effect of Day Length on Flowering</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <p className="text-sm text-amber-900">
                  <strong>Definition:</strong> Photoperiodism is the physiological response of organisms to the length 
                  of day or night. Discovered by Garner and Allard (1920) in tobacco.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-6 bg-red-50 rounded-lg border-2 border-red-200">
                  <h3 className="text-xl font-bold text-red-900 mb-4">Short-Day Plants (SDP)</h3>
                  <p className="text-sm text-red-800 mb-3">Require long dark period ({'>'} critical night length)</p>
                  
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded">
                      <p className="text-xs font-semibold">Examples:</p>
                      <p className="text-xs">Rice, Soybean, Tobacco, Chrysanthemum, Strawberry</p>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <p className="text-xs font-semibold">Critical Factor:</p>
                      <p className="text-xs">Continuous dark period must exceed critical duration</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Long-Day Plants (LDP)</h3>
                  <p className="text-sm text-blue-800 mb-3">Require short dark period (&lt; critical night length)</p>
                  
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded">
                      <p className="text-xs font-semibold">Examples:</p>
                      <p className="text-xs">Wheat, Oat, Spinach, Radish, Lettuce, Henbane</p>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <p className="text-xs font-semibold">Critical Factor:</p>
                      <p className="text-xs">Continuous dark period must be less than critical duration</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Day-Neutral Plants</h3>
                  <p className="text-sm text-green-800 mb-3">Flowering independent of photoperiod</p>
                  
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded">
                      <p className="text-xs font-semibold">Examples:</p>
                      <p className="text-xs">Tomato, Cucumber, Maize, Cotton, Sunflower</p>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <p className="text-xs font-semibold">Critical Factor:</p>
                      <p className="text-xs">Temperature, nutrition, age determine flowering</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Phytochrome - The Photoreceptor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                    <h4 className="font-semibold mb-3">Two Interconvertible Forms:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-white rounded">
                        <h5 className="font-semibold text-sm text-indigo-900">Pr (Red-absorbing)</h5>
                        <ul className="text-xs mt-2 space-y-1">
                          <li>• Absorbs red light (660 nm)</li>
                          <li>• Inactive form</li>
                          <li>• Accumulates in darkness</li>
                          <li>• Synthesized in this form</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <h5 className="font-semibold text-sm text-purple-900">Pfr (Far-red absorbing)</h5>
                        <ul className="text-xs mt-2 space-y-1">
                          <li>• Absorbs far-red light (730 nm)</li>
                          <li>• Active form (physiologically active)</li>
                          <li>• Promotes flowering in LDP</li>
                          <li>• Inhibits flowering in SDP</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-white rounded text-center">
                      <p className="text-sm font-mono">
                        Pr <span className="text-red-600">⇄</span> Pfr
                      </p>
                      <p className="text-xs mt-1">Red light (660nm) converts Pr → Pfr</p>
                      <p className="text-xs">Far-red light (730nm) converts Pfr → Pr</p>
                      <p className="text-xs">Dark: Pfr slowly converts to Pr</p>
                    </div>
                  </div>

                  <div className="p-4 bg-cyan-50 rounded-lg">
                    <h4 className="font-semibold text-cyan-900 mb-2">Role in Flowering:</h4>
                    <ul className="text-sm text-cyan-800 space-y-1">
                      <li>• <strong>LDP:</strong> High Pfr/Pr ratio (short nights) promotes flowering</li>
                      <li>• <strong>SDP:</strong> Low Pfr/Pr ratio (long nights) promotes flowering</li>
                      <li>• Night break with red light prevents SDP flowering</li>
                      <li>• Far-red light after night break reverses the effect</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Florigen - The Flowering Hormone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm">
                      <strong>Concept:</strong> Proposed by Chailakhyan (1936) as a hypothetical hormone that induces flowering
                    </p>
                    <div className="p-3 bg-blue-50 rounded">
                      <p className="text-sm font-semibold mb-2">Evidence for Florigen:</p>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>• Grafting experiments show transmissible signal</li>
                        <li>• Signal moves from induced leaves to shoot apex</li>
                        <li>• Recent research: FT protein (Flowering locus T) may be florigen</li>
                        <li>• Travels through phloem from leaves to meristem</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vernalization */}
        <TabsContent value="vernalization" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Vernalization - Cold Treatment for Flowering</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-blue-900">
                  <strong>Definition:</strong> Vernalization is the acquisition or acceleration of flowering ability by 
                  chilling treatment (0-5°C) to plants or seeds.
                </p>
                <p className="text-xs text-blue-800 mt-2">Term coined by T.D. Lysenko (1928)</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Plants Requiring Vernalization</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold text-sm">Winter Cereals</h4>
                      <p className="text-xs mt-1">Winter wheat, winter rye, barley</p>
                      <p className="text-xs text-green-700 mt-1">Sown in autumn, overwinter, flower in spring</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <h4 className="font-semibold text-sm">Biennial Plants</h4>
                      <p className="text-xs mt-1">Carrot, cabbage, beet, henbane</p>
                      <p className="text-xs text-green-700 mt-1">Vegetative in year 1, flower in year 2 after cold</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-purple-900 mb-4">Site of Perception</h3>
                  <div className="space-y-2 text-sm text-purple-800">
                    <p>• <strong>Embryo/meristem</strong> perceives cold signal</p>
                    <p>• In biennial plants: shoot apex</p>
                    <p>• In winter cereals: embryo in seed</p>
                    <p className="mt-3 p-2 bg-white rounded text-xs">
                      <strong>Note:</strong> Unlike photoperiodism (perceived by leaves), 
                      vernalization is perceived by growing points
                    </p>
                  </div>
                </div>
              </div>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Applications of Vernalization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold text-amber-900 mb-2">1. Winter Wheat to Spring Wheat</h4>
                      <p className="text-sm text-amber-800">
                        Cold treatment of seeds allows winter varieties to be sown in spring, avoiding harsh winters
                      </p>
                    </div>
                    <div className="p-4 bg-cyan-50 rounded-lg">
                      <h4 className="font-semibold text-cyan-900 mb-2">2. Two Crops per Year</h4>
                      <p className="text-sm text-cyan-800">
                        Enables growing both winter and spring varieties in same year
                      </p>
                    </div>
                    <div className="p-4 bg-rose-50 rounded-lg">
                      <h4 className="font-semibold text-rose-900 mb-2">3. Early Flowering</h4>
                      <p className="text-sm text-rose-800">
                        Shortens life cycle of biennial plants, allowing seed production in one season
                      </p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <h4 className="font-semibold text-emerald-900 mb-2">4. Breeding Programs</h4>
                      <p className="text-sm text-emerald-800">
                        Accelerates breeding by reducing generation time
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Hypothetical Vernalization Substance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-semibold text-indigo-900 mb-3">Vernalin Theory:</h4>
                    <ul className="text-sm text-indigo-800 space-y-2">
                      <li>• Hypothetical hormone proposed to explain vernalization</li>
                      <li>• Suggested to be formed during cold treatment</li>
                      <li>• Would be transported to shoot apex to induce flowering</li>
                      <li>• Not yet isolated or chemically identified</li>
                      <li>• Modern research: Epigenetic changes in FLC gene regulation</li>
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
