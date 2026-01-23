
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, Leaf, Zap , Loader2 } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter5Topics: Topic[] = [
  {
    id: "root-system",
    title: "Root System",
    description: "Underground part of plant that anchors and absorbs water and minerals.",
    keyPoints: [
      "Tap root system: Primary root persists (dicots) - e.g., mustard, gram",
      "Fibrous root system: Primary root replaced by adventitious roots (monocots) - e.g., wheat, rice",
      "Root modifications: Storage (carrot, radish), support (prop roots in banyan), breathing (pneumatophores in mangroves)",
      "Root cap: Protects root apex during growth",
      "Root hairs: Increase surface area for absorption",
      "Regions: Root cap, meristematic zone, elongation zone, maturation zone"
    ],
    examples: [
      "Tap root: Carrot (storage), Banyan (prop roots for support)",
      "Fibrous: Grass, wheat, rice (extensive network)",
      "Adventitious: Sweet potato (storage), Betel vine (climbing)",
      "Pneumatophores: Mangrove plants (Rhizophora) - aerial breathing roots"
    ]
  },
  {
    id: "stem-modifications",
    title: "Stem System and Modifications",
    description: "Aerial part bearing branches, leaves, flowers and fruits.",
    keyPoints: [
      "Main functions: Support, conduction, storage, photosynthesis",
      "Node: Point of leaf attachment; Internode: Portion between two nodes",
      "Underground stems: Rhizome (ginger), bulb (onion), corm (Colocasia), tuber (potato)",
      "Subaerial stems: Runner (grass), stolon (strawberry), sucker (mint), offset (water hyacinth)",
      "Aerial modifications: Tendril (passion flower), thorn (Bougainvillea), phylloclade (Opuntia)",
      "Nodes have buds (axillary and terminal)"
    ],
    examples: [
      "Rhizome: Ginger (horizontal underground stem with nodes)",
      "Tuber: Potato (swollen tip of underground stem with eyes=buds)",
      "Bulb: Onion (condensed stem with fleshy leaves)",
      "Tendril: Cucumber, passion flower (climbing support)",
      "Phylloclade: Opuntia (flattened green stem for photosynthesis)"
    ]
  },
  {
    id: "leaf-structure",
    title: "Leaf Structure and Venation",
    description: "Lateral appendage of stem specialized for photosynthesis.",
    keyPoints: [
      "Parts: Leaf base, petiole (stalk), lamina (blade)",
      "Venation: Reticulate (dicots - netted), Parallel (monocots)",
      "Simple leaf: Single lamina (mango, guava)",
      "Compound leaf: Lamina divided - pinnate (neem) or palmate (silk cotton)",
      "Phyllotaxy: Leaf arrangement - alternate, opposite, whorled",
      "Leaf modifications: Tendril (pea), spine (cactus), pitcher (Nepenthes)",
      "Stipules: Small leaf-like structures at leaf base"
    ],
    examples: [
      "Reticulate venation: Mango, banyan, peepal (dicots)",
      "Parallel venation: Grass, wheat, banana (monocots)",
      "Pinnately compound: Neem (feather-like arrangement)",
      "Palmately compound: Silk cotton (fingers from single point)",
      "Tendrils: Pea (for climbing support)",
      "Spines: Opuntia (reduce water loss)",
      "Storage: Onion, garlic (fleshy leaf bases)"
    ]
  },
  {
    id: "inflorescence",
    title: "Inflorescence",
    description: "Arrangement of flowers on the floral axis.",
    keyPoints: [
      "Racemose: Main axis continues to grow, flowers in acropetal succession",
      "Cymose: Main axis terminates in flower, flowers in basipetal succession",
      "Raceme: Flowers pedicellate on elongated axis (mustard)",
      "Spike: Flowers sessile on elongated axis (Amaranthus)",
      "Catkin: Spike with unisexual flowers (mulberry)",
      "Spadix: Spike with fleshy axis, often enclosed in spathe (banana)",
      "Umbel: Flowers arise from common point (onion)",
      "Capitulum: Flowers sessile on flattened axis (sunflower)"
    ],
    examples: [
      "Raceme: Mustard, radish (pedicellate flowers on main axis)",
      "Spike: Achyranthes, Amaranthus (sessile flowers)",
      "Umbel: Onion, garlic (umbrella-like)",
      "Capitulum: Sunflower, marigold (disc florets and ray florets)",
      "Cyathium: Euphorbia (cup-like involucre)",
      "Hypanthodium: Fig (fleshy hollow receptacle)"
    ]
  },
  {
    id: "flower-structure",
    title: "Flower Structure",
    description: "Reproductive structure of angiosperms.",
    keyPoints: [
      "Parts: Calyx (sepals), Corolla (petals), Androecium (stamens), Gynoecium (carpels)",
      "Complete flower: Has all four whorls",
      "Incomplete flower: Lacks one or more whorls",
      "Bisexual: Both stamens and carpels (mustard, rose)",
      "Unisexual: Only stamens or carpels (papaya, cucumber)",
      "Actinomorphic: Radial symmetry (mustard, datura)",
      "Zygomorphic: Bilateral symmetry (pea, bean)",
      "Hypogynous: Ovary superior (mustard)",
      "Perigynous: Ovary half inferior (rose)",
      "Epigynous: Ovary inferior (cucumber, sunflower)"
    ],
    examples: [
      "Complete bisexual: Mustard, hibiscus, rose",
      "Incomplete unisexual: Papaya, cucumber, watermelon",
      "Actinomorphic: Datura, mustard (can be divided into equal halves from any plane)",
      "Zygomorphic: Pea, bean, Cassia (bilateral symmetry)",
      "Hypogynous: Mustard, China rose (sepals/petals below ovary)",
      "Epigynous: Sunflower, cucumber (ovary below other floral parts)"
    ]
  },
  {
    id: "fruit-types",
    title: "Fruit and Seed",
    description: "Mature ovary developing into fruit containing seeds.",
    keyPoints: [
      "True fruit: Develops from ovary only (mango, coconut)",
      "False fruit: Develops from other floral parts (apple, strawberry)",
      "Simple fruit: From single ovary (mango, wheat)",
      "Aggregate fruit: From multiple ovaries of single flower (strawberry)",
      "Composite/Multiple fruit: From entire inflorescence (pineapple, jackfruit)",
      "Fleshy fruits: Drupe (mango), berry (tomato), pome (apple)",
      "Dry fruits: Dehiscent (opens - pea pod) or indehiscent (doesn't open - wheat)",
      "Seed: Develops from ovule after fertilization"
    ],
    examples: [
      "Drupe: Mango, coconut (stony endocarp)",
      "Berry: Tomato, grapes, banana (entire pericarp fleshy)",
      "Pome: Apple (thalamus forms edible part)",
      "Legume: Pea, bean (dehiscent fruit from monocarpellary ovary)",
      "Capsule: Cotton, lady's finger (dry dehiscent)",
      "Caryopsis: Wheat, rice (seed coat fused with fruit wall)",
      "Aggregate: Strawberry (from apocarpous gynoecium)",
      "Composite: Jackfruit, pineapple (from complete inflorescence)"
    ]
  },
  {
    id: "floral-formula",
    title: "Floral Formula and Diagram",
    description: "Symbolic representation of flower structure.",
    keyPoints: [
      "Symbols: ⚥ (bisexual), ♂ (male), ♀ (female)",
      "Symmetry: ⊕ (actinomorphic), % (zygomorphic)",
      "K = Calyx, C = Corolla, P = Perianth, A = Androecium, G = Gynoecium",
      "Fusion: () indicates connation (fusion of same whorl)",
      "Position: Line above G = superior ovary, below G = inferior ovary",
      "Number: Subscript shows number of parts; ∞ means many"
    ],
    examples: [
      "Mustard: ⊕ ⚥ K4 C4 A2+4 G(2)",
      "Pea: % ⚥ K(5) C1+2+(2) A(9)+1 G1",
      "Sunflower: ⊕ ⚥ K∞ C(5) A(5) G(2)",
      "Datura: ⊕ ⚥ K(5) C(5) A5 G(2)"
    ],
    formulas: [
      "Brassicaceae (Mustard family): ⊕ ⚥ K4 C4 A2+4 G(2)",
      "Fabaceae (Pea family): % ⚥ K(5) C1+2+(2) A(9)+1 G1",
      "Solanaceae (Potato family): ⊕ ⚥ K(5) C(5) A5 G(2)",
      "Liliaceae (Lily family): ⊕ ⚥ P3+3 A3+3 G(3)"
    ]
  },
  {
    id: "plant-families",
    title: "Important Plant Families",
    description: "Key characteristics of economically important families.",
    keyPoints: [
      "Fabaceae (Leguminosae): Butterfly-shaped corolla, diadelphous stamens, legume fruit",
      "Solanaceae: Actinomorphic, epipetalous stamens, berry or capsule",
      "Liliaceae: Trimerous flowers, superior ovary, bulb/rhizome",
      "Brassicaceae (Cruciferae): Cruciform corolla, tetradynamous stamens, siliqua",
      "Economic importance: Food, medicine, fiber, timber"
    ],
    examples: [
      "Fabaceae: Pea, bean, gram, groundnut (protein-rich seeds)",
      "Solanaceae: Potato, tomato, brinjal, tobacco, belladonna",
      "Liliaceae: Onion, garlic, aloe, asparagus, tulip",
      "Brassicaceae: Mustard, cabbage, cauliflower, radish"
    ]
  }
];



export function BotanyChapter5() {
  // Fetch questions from database for Anatomy of Flowering Plants (topicId: 69)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '69'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=69');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  const [activeTab, setActiveTab] = useState("overview");
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showSolutions, setShowSolutions] = useState(false);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const checkAnswers = () => {
    setShowSolutions(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowSolutions(false);
  };

  const score = Object.entries(userAnswers).filter(
    ([qId, answer]) => {
      const question = practiceQuestions.find(q => q.id === parseInt(qId));
      return question && answer === question.correctAnswer;
    }
  ).length;

  return (
    <div className="container mx-auto p-6 space-y-6 gradient-mesh-bg min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <Leaf className="h-8 w-8 text-green-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 5: Morphology of Flowering Plants</h1>
          <p className="text-muted-foreground">Class XI Botany - NEET Syllabus</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="topics">
            <Lightbulb className="h-4 w-4 mr-2" />
            Topics
          </TabsTrigger>
          <TabsTrigger value="visualization">
            <Calculator className="h-4 w-4 mr-2" />
            Key Concepts
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <Zap className="h-4 w-4 mr-2" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Chapter Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Root system - tap root vs fibrous root, modifications</li>
                  <li>Stem - structure, types, and modifications</li>
                  <li>Leaf - venation, types, phyllotaxy, modifications</li>
                  <li>Inflorescence - racemose and cymose types</li>
                  <li>Flower - structure, symmetry, position of ovary</li>
                  <li>Fruit and seed - types and classification</li>
                  <li>Floral formula and diagram</li>
                  <li>Important plant families</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card className="border-green-500/20 glass-panel glow-halo float-medium">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-green-500">Vegetative Organs</Badge>
                    <CardTitle className="text-lg">Root, Stem, Leaf</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Tap root (dicots) vs Fibrous (monocots)</p>
                    <p>• Underground stem modifications</p>
                    <p>• Leaf venation patterns</p>
                    <p>• Adaptations for functions</p>
                  </CardContent>
                </Card>

                <Card className="border-pink-500/20 glass-panel glow-halo float-medium">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-pink-500">Reproductive Organs</Badge>
                    <CardTitle className="text-lg">Flower & Fruit</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Floral parts and symmetry</p>
                    <p>• Inflorescence types</p>
                    <p>• True vs false fruits</p>
                    <p>• Fruit classification</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20 glass-panel glow-halo float-medium">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-blue-500">Plant Families</Badge>
                    <CardTitle className="text-lg">Economic Importance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Fabaceae (legumes)</p>
                    <p>• Solanaceae (potato family)</p>
                    <p>• Brassicaceae (mustard)</p>
                    <p>• Liliaceae (lily family)</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter5Topics.map((topic, index) => (
              <AccordionItem key={topic.id} value={topic.id}>
                <Card className="glass-panel glow-halo float-gentle">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-start gap-3 text-left">
                      <Badge variant="outline" className="mt-1">
                        {index + 1}
                      </Badge>
                      <div>
                        <h3 className="text-lg font-semibold">{topic.title}</h3>
                        <p className="text-sm text-muted-foreground">{topic.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <CardContent className="space-y-6 pt-4">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          Key Concepts
                        </h4>
                        <ul className="space-y-2">
                          {topic.keyPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {topic.formulas && topic.formulas.length > 0 && (
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-3">Floral Formulas</h4>
                          <div className="space-y-2">
                            {topic.formulas.map((formula, i) => (
                              <p key={i} className="font-mono text-sm bg-background p-2 rounded">
                                {formula}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-3">Examples</h4>
                        <div className="space-y-2">
                          {topic.examples.map((example, i) => (
                            <div key={i} className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                              <p className="text-sm">{example}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Quick Reference Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-green-500/20 glass-panel glow-halo float-medium">
                  <CardHeader>
                    <CardTitle className="text-lg">Root System Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <Badge className="mb-2">Tap Root (Dicots)</Badge>
                        <p className="text-sm">• Primary root persists</p>
                        <p className="text-sm">• Deep penetration</p>
                        <p className="text-sm">• Examples: Mustard, gram, pea</p>
                      </div>
                      <div>
                        <Badge className="mb-2 bg-blue-500">Fibrous Root (Monocots)</Badge>
                        <p className="text-sm">• Primary root replaced</p>
                        <p className="text-sm">• Shallow, spread out</p>
                        <p className="text-sm">• Examples: Wheat, rice, grass</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-pink-500/20 glass-panel glow-halo float-medium">
                  <CardHeader>
                    <CardTitle className="text-lg">Leaf Venation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <Badge className="mb-2">Reticulate (Dicots)</Badge>
                        <p className="text-sm">• Net-like pattern</p>
                        <p className="text-sm">• Veins branch and rejoin</p>
                        <p className="text-sm">• Examples: Mango, peepal, banyan</p>
                      </div>
                      <div>
                        <Badge className="mb-2 bg-purple-500">Parallel (Monocots)</Badge>
                        <p className="text-sm">• Veins run parallel</p>
                        <p className="text-sm">• Don't form network</p>
                        <p className="text-sm">• Examples: Wheat, banana, grass</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 glass-panel glow-halo float-medium">
                <CardHeader>
                  <CardTitle>Ovary Position Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <Badge className="mb-2">Hypogynous</Badge>
                      <p className="text-sm mt-2">Ovary Superior</p>
                      <p className="text-xs text-muted-foreground mt-1">Above other parts</p>
                      <p className="text-xs font-semibold mt-2">Example: Mustard, China rose</p>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <Badge className="mb-2 bg-yellow-500">Perigynous</Badge>
                      <p className="text-sm mt-2">Ovary Half Inferior</p>
                      <p className="text-xs text-muted-foreground mt-1">At same level</p>
                      <p className="text-xs font-semibold mt-2">Example: Rose, peach</p>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <Badge className="mb-2 bg-orange-500">Epigynous</Badge>
                      <p className="text-sm mt-2">Ovary Inferior</p>
                      <p className="text-xs text-muted-foreground mt-1">Below other parts</p>
                      <p className="text-xs font-semibold mt-2">Example: Sunflower, cucumber</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Fruit Classification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Simple Fruits</h4>
                        <p className="text-sm">From single ovary</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          • Drupe: Mango (stony endocarp)<br/>
                          • Berry: Tomato (all pericarp fleshy)<br/>
                          • Legume: Pea pod (dehiscent)
                        </p>
                      </div>
                      <div className="bg-pink-50 dark:bg-pink-950/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Aggregate Fruits</h4>
                        <p className="text-sm">From multiple ovaries, one flower</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          • Strawberry (from apocarpous gynoecium)
                        </p>
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Composite/Multiple Fruits</h4>
                      <p className="text-sm">From entire inflorescence</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        • Pineapple, Jackfruit (multiple flowers fuse)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          {questionsLoading ? (
            <Card>
              <CardContent className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
                <span>Loading questions from database...</span>
              </CardContent>
            </Card>
          ) : practiceQuestions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                <p>No questions available for this chapter yet.</p>
              </CardContent>
            </Card>
          ) : (
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Practice Questions</CardTitle>
                {showSolutions && (
                  <Badge variant={score >= 12 ? "default" : score >= 8 ? "secondary" : "destructive"}>
                    Score: {score}/{practiceQuestions.length}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {practiceQuestions.map((q, index) => (
                <Card key={q.id} className="border-green-500/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">{q.difficultyLevel === 1 ? 'Easy' : q.difficultyLevel === 2 ? 'Medium' : 'Hard'}</Badge>
                        <p className="font-medium">Q{index + 1}. {getQuestionLabel(q)}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {q.options.map((option, index) => {
                        const optionKey =
                          typeof option === "string"
                            ? String.fromCharCode(65 + index)
                            : option.id ?? String.fromCharCode(65 + index);
                        const isSelected = userAnswers[q.id] === optionKey;
                        const isCorrectOption = optionKey === q.correctAnswer;
                        return (
                          <Button
                            key={optionKey}
                            variant={
                              showSolutions
                                ? isCorrectOption
                                  ? "default"
                                  : isSelected
                                  ? "destructive"
                                  : "outline"
                                : isSelected
                                ? "secondary"
                                : "outline"
                            }
                            className="w-full justify-start text-left h-auto py-3"
                            onClick={() => !showSolutions && handleAnswerSelect(q.id, optionKey)}
                            disabled={showSolutions}
                          >
                            <span className="mr-3">{optionKey}.</span>
                            {getOptionLabel(option)}
                          </Button>
                        );
                      })}
                    </div>
                    {showSolutions && (
                      <div className="bg-muted p-4 rounded-lg mt-4">
                        <p className="font-semibold mb-2 text-green-600 dark:text-green-400">Solution:</p>
                        <p className="text-sm">{q.solutionDetail}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              <div className="flex gap-3">
                {!showSolutions ? (
                  <Button 
                    onClick={checkAnswers} 
                    className="flex-1"
                    disabled={Object.keys(userAnswers).length === 0}
                  >
                    Check Answers
                  </Button>
                ) : (
                  <Button onClick={resetQuiz} variant="outline" className="flex-1">
                    Try Again
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        
          )}</TabsContent>
      </Tabs>
    </div>
  );
}
