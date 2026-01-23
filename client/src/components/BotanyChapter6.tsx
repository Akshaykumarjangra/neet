
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

const chapter6Topics: Topic[] = [
  {
    id: "tissues",
    title: "Plant Tissues - Meristematic and Permanent",
    description: "Classification of plant tissues based on dividing ability.",
    keyPoints: [
      "Meristematic tissue: Actively dividing cells, thin-walled, dense cytoplasm",
      "Apical meristem: At root and shoot apex (primary growth, length)",
      "Lateral meristem: Vascular cambium, cork cambium (secondary growth, girth)",
      "Intercalary meristem: At base of nodes and leaves (grasses)",
      "Permanent tissue: Lost ability to divide, differentiated",
      "Simple permanent: Parenchyma, collenchyma, sclerenchyma",
      "Complex permanent: Xylem and phloem"
    ],
    examples: [
      "Apical: Root tip, shoot tip (continuous growth in length)",
      "Lateral: Cambium in woody stems (increase in girth)",
      "Intercalary: Base of grass leaves (regrowth after grazing)",
      "Parenchyma: Packing tissue, storage, photosynthesis",
      "Collenchyma: Mechanical support with flexibility",
      "Sclerenchyma: Dead cells providing rigidity"
    ]
  },
  {
    id: "simple-tissues",
    title: "Simple Permanent Tissues",
    description: "Tissues composed of one type of cells.",
    keyPoints: [
      "Parenchyma: Living, thin-walled, isodiametric, large intercellular spaces",
      "Functions: Storage, photosynthesis (chlorenchyma), buoyancy (aerenchyma)",
      "Collenchyma: Living, thickened corners (cellulose), no intercellular spaces",
      "Functions: Mechanical support with flexibility (young stems, petioles)",
      "Sclerenchyma: Dead at maturity, thick lignified walls, no intercellular spaces",
      "Types: Fibers (elongated) and sclereids (stone cells)",
      "Functions: Mechanical strength (fibers in jute, coconut; sclereids in walnut shell)"
    ],
    examples: [
      "Parenchyma: Pith in stems, mesophyll in leaves, cortex in roots",
      "Chlorenchyma: Palisade and spongy mesophyll (photosynthesis)",
      "Aerenchyma: Aquatic plants like lotus (air cavities for buoyancy)",
      "Collenchyma: Below epidermis in herbaceous stems, petioles",
      "Sclerenchyma fibers: Jute, hemp, flax (commercial fibers)",
      "Sclereids: Hard seed coats, nutshells, pear fruit (gritty texture)"
    ]
  },
  {
    id: "complex-tissues",
    title: "Complex Permanent Tissues - Xylem and Phloem",
    description: "Vascular tissues made of multiple cell types.",
    keyPoints: [
      "Xylem: Conducts water and minerals upward (root to leaves)",
      "Components: Tracheids, vessels, xylem parenchyma, xylem fibers",
      "Tracheids: Elongated, dead, lignified, pointed ends (gymnosperms)",
      "Vessels: Wider, dead, lignified, perforated end walls (angiosperms)",
      "Phloem: Transports organic food (bidirectional)",
      "Components: Sieve tubes, companion cells, phloem parenchyma, phloem fibers",
      "Sieve tubes: Living, enucleate, sieve plates at ends",
      "Companion cells: Living, nucleated, connected to sieve tubes by plasmodesmata"
    ],
    examples: [
      "Xylem in angiosperms: Vessels (efficient), tracheids (less efficient)",
      "Xylem in gymnosperms: Only tracheids (no vessels)",
      "Phloem transport: Sucrose from leaves to storage organs/growing parts",
      "Sieve plates: Perforated cross walls in sieve tubes",
      "Companion cells: Metabolic support for sieve tube elements",
      "Phloem fibers: Provide mechanical support (jute, hemp)"
    ]
  },
  {
    id: "epidermis",
    title: "Epidermal Tissue System",
    description: "Protective outermost layer of plant body.",
    keyPoints: [
      "Single layer of compactly arranged cells on outer surface",
      "Cuticle: Waxy layer (cutin) prevents water loss",
      "Stomata: Openings for gas exchange (guard cells regulate opening)",
      "Trichomes: Hair-like structures (reduce water loss, protection)",
      "Root hairs: Unicellular extensions for water absorption",
      "Usually without chloroplasts (except guard cells)",
      "Replaced by cork in older stems/roots (secondary growth)"
    ],
    examples: [
      "Leaf epidermis: Cuticle, stomata for photosynthesis and transpiration",
      "Root epidermis: Root hairs increase surface area for absorption",
      "Trichomes: Cotton fibers, insect-trapping glands in Drosera",
      "Guard cells: Kidney-shaped (dicots), dumbbell-shaped (grasses)",
      "Multiple epidermis: Nerium, Ficus (additional protection)",
      "Bulliform cells: Large cells in grass leaves (leaf rolling during water stress)"
    ]
  },
  {
    id: "ground-tissue",
    title: "Ground Tissue System",
    description: "All tissues except epidermis and vascular bundles.",
    keyPoints: [
      "Cortex: Between epidermis and pericycle (parenchyma, sometimes collenchyma)",
      "Endodermis: Innermost layer of cortex (casparian strips in roots)",
      "Pericycle: Layer outside vascular bundles (gives rise to lateral roots)",
      "Pith (medulla): Central part of stem (storage)",
      "Medullary rays: Radial parenchyma connecting pith to cortex",
      "Functions: Storage, photosynthesis, mechanical support"
    ],
    examples: [
      "Cortex: Photosynthesis in green stems, storage in roots",
      "Endodermis: Controls water/mineral entry to xylem (selective barrier)",
      "Pericycle: Origin of lateral roots, vascular cambium (dicots)",
      "Pith: Storage in sunflower stem, absent in monocot roots",
      "Medullary rays: Transport between vascular bundles radially"
    ]
  },
  {
    id: "anatomy-dicot-stem",
    title: "Anatomy of Dicot Stem",
    description: "Internal structure of dicotyledonous stem.",
    keyPoints: [
      "Epidermis: Single layer with cuticle, multicellular hairs",
      "Cortex: Multilayered, hypodermis (collenchyma), general cortex (parenchyma), endodermis (starch sheath)",
      "Pericycle: Present in patches (parenchyma and sclerenchyma)",
      "Vascular bundles: Conjoint, collateral, open, arranged in ring",
      "'Open' bundles: Cambium present between xylem and phloem (secondary growth possible)",
      "Xylem: Endarch (protoxylem towards center, metaxylem towards periphery)",
      "Pith: Well developed, parenchymatous",
      "Medullary rays: Connect pith to cortex"
    ],
    examples: [
      "Sunflower stem: Typical dicot anatomy with ring of vascular bundles",
      "Hypodermis: Collenchyma provides mechanical support",
      "Endodermis: Starch sheath (starch grains present)",
      "Cambium: Secondary meristem for secondary growth",
      "Endarch xylem: Development centrifugal (outward)"
    ]
  },
  {
    id: "anatomy-monocot-stem",
    title: "Anatomy of Monocot Stem",
    description: "Internal structure of monocotyledonous stem.",
    keyPoints: [
      "Epidermis: Single layer with cuticle",
      "Hypodermis: Sclerenchymatous (mechanical support)",
      "Ground tissue: Undifferentiated (no cortex, endodermis, pericycle, pith)",
      "Vascular bundles: Conjoint, collateral, closed, scattered",
      "'Closed' bundles: No cambium (no secondary growth)",
      "Xylem: Endarch, vessels arranged in 'Y' shape",
      "Phloem: Parenchyma absent",
      "Bundle sheath: Sclerenchymatous sheath around each bundle"
    ],
    examples: [
      "Maize stem: Typical monocot with scattered vascular bundles",
      "No secondary growth: Monocots remain herbaceous (no wood formation)",
      "Sclerenchymatous hypodermis: Stronger mechanical support than dicots",
      "Water cavity: Large lysigenous cavity below each bundle",
      "Y-shaped xylem: Two metaxylem vessels forming arms of Y"
    ]
  },
  {
    id: "anatomy-dicot-root",
    title: "Anatomy of Dicot Root",
    description: "Internal structure of dicotyledonous root.",
    keyPoints: [
      "Epidermis: Single layer, thin-walled, cuticle absent, root hairs present",
      "Cortex: Multilayered parenchyma with intercellular spaces",
      "Endodermis: Single layer with casparian strips (suberin deposition)",
      "Pericycle: Parenchymatous, gives rise to lateral roots",
      "Vascular bundles: Radial (xylem and phloem on different radii)",
      "Xylem: Exarch (protoxylem towards periphery, metaxylem towards center)",
      "Xylem bundles: 2-6 (diarch to hexarch), usually tetrarch",
      "Pith: Small or absent",
      "Conjunctive tissue: Parenchyma between xylem and phloem"
    ],
    examples: [
      "Sunflower root: Tetrarch (4 xylem bundles)",
      "Casparian strips: Waxy barrier in endodermis controls water entry",
      "Passage cells: Thin-walled endodermal cells opposite protoxylem",
      "Lateral roots: Originate from pericycle (endogenous origin)",
      "Exarch xylem: Development centripetal (inward)"
    ]
  },
  {
    id: "anatomy-monocot-root",
    title: "Anatomy of Monocot Root",
    description: "Internal structure of monocotyledonous root.",
    keyPoints: [
      "Epidermis: Single layer with root hairs",
      "Cortex: Multilayered parenchyma",
      "Endodermis: With casparian strips",
      "Pericycle: Parenchymatous, only gives rise to lateral roots (no vascular cambium)",
      "Vascular bundles: Radial, usually polyarch (many xylem bundles >6)",
      "Xylem: Exarch",
      "Pith: Large and well developed (unlike dicot root)",
      "No secondary growth: Pericycle doesn't form cambium"
    ],
    examples: [
      "Maize root: Polyarch (8-10 or more xylem bundles)",
      "Large pith: Characteristic feature of monocot roots",
      "No secondary growth: Remain thin throughout life",
      "Exarch xylem: Similar to dicot root"
    ]
  },
  {
    id: "anatomy-leaf",
    title: "Anatomy of Dicot and Monocot Leaf",
    description: "Internal structure of leaves.",
    keyPoints: [
      "Upper epidermis: Usually without stomata (dicot)",
      "Lower epidermis: With stomata",
      "Mesophyll: Tissue between upper and lower epidermis",
      "Dicot leaf: Mesophyll differentiated into palisade (columnar, upper) and spongy parenchyma (irregular, lower)",
      "Monocot leaf: Mesophyll undifferentiated (isobilateral symmetry)",
      "Vascular bundles: Surrounded by bundle sheath",
      "Dicot: Reticulate venation, vascular bundles of various sizes",
      "Monocot: Parallel venation, bulliform cells (large cells on upper epidermis for leaf rolling)"
    ],
    examples: [
      "Dicot leaf (mango): Dorsiventral, differentiated mesophyll",
      "Monocot leaf (grass): Isobilateral, uniform mesophyll",
      "Palisade: Main site of photosynthesis (more chloroplasts)",
      "Spongy: Gas exchange (large intercellular spaces)",
      "Bulliform cells: Lose water during stress → leaf rolls (reduces transpiration)",
      "Bundle sheath: Parenchymatous (dicot), sclerenchymatous (monocot)"
    ]
  },
  {
    id: "secondary-growth",
    title: "Secondary Growth",
    description: "Increase in girth due to cambial activity in dicots.",
    keyPoints: [
      "Vascular cambium: Lateral meristem between xylem and phloem",
      "Forms continuous ring in dicot stems",
      "Produces secondary xylem (wood) towards inside",
      "Produces secondary phloem towards outside",
      "More xylem than phloem formed (wood accumulates)",
      "Cork cambium (phellogen): Produces cork (phellem) towards outside, secondary cortex (phelloderm) towards inside",
      "Periderm: Cork + cork cambium + secondary cortex (replaces epidermis)",
      "Lenticels: Pores in cork for gas exchange",
      "Annual rings: Growth rings in wood (one ring per year in temperate regions)",
      "Heartwood: Dark, non-functional inner wood (tyloses block vessels)",
      "Sapwood: Light, functional outer wood (conducts water)"
    ],
    examples: [
      "Woody dicot stems: Trees like mango, neem show extensive secondary growth",
      "Annual rings: Age determination, climate study",
      "Wide rings: Favorable growth conditions",
      "Narrow rings: Unfavorable conditions (drought)",
      "Autumn wood: Smaller vessels, more fibers (darker)",
      "Spring wood: Larger vessels, fewer fibers (lighter)",
      "Cork: Commercial cork from Quercus (oak)",
      "Monocots: No secondary growth (no vascular cambium)"
    ]
  }
];



export function BotanyChapter6() {
  // Fetch questions from database for Cell - The Unit of Life (topicId: 70)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '70'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=70');
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
          <h1 className="text-4xl font-bold">Chapter 6: Anatomy of Flowering Plants</h1>
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
            Comparisons
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
                  <li>Plant tissues - meristematic and permanent</li>
                  <li>Simple tissues - parenchyma, collenchyma, sclerenchyma</li>
                  <li>Complex tissues - xylem and phloem structure</li>
                  <li>Tissue systems - epidermal, ground, vascular</li>
                  <li>Anatomy of dicot and monocot stem</li>
                  <li>Anatomy of dicot and monocot root</li>
                  <li>Leaf anatomy - dorsiventral and isobilateral</li>
                  <li>Secondary growth in dicots</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card className="border-green-500/20 glass-panel glow-halo float-medium">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-green-500">Tissues</Badge>
                    <CardTitle className="text-lg">Classification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Meristematic (dividing)</p>
                    <p>• Permanent (differentiated)</p>
                    <p>• Simple vs Complex</p>
                    <p>• Functions and locations</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20 glass-panel glow-halo float-medium">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-blue-500">Internal Structure</Badge>
                    <CardTitle className="text-lg">Stem, Root, Leaf</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Dicot vs Monocot differences</p>
                    <p>• Vascular bundle arrangement</p>
                    <p>• Tissue distribution patterns</p>
                    <p>• Adaptations</p>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 glass-panel glow-halo float-medium">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-purple-500">Secondary Growth</Badge>
                    <CardTitle className="text-lg">Dicots Only</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Vascular cambium activity</p>
                    <p>• Wood formation</p>
                    <p>• Cork cambium and bark</p>
                    <p>• Annual rings</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter6Topics.map((topic, index) => (
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
              <CardTitle>Comparative Anatomy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-green-500/20 glass-panel glow-halo float-medium">
                  <CardHeader>
                    <CardTitle className="text-lg">Dicot Stem vs Monocot Stem</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Badge className="mb-2">Dicot Stem</Badge>
                        <p className="text-sm">• Vascular bundles in a ring</p>
                        <p className="text-sm">• Open bundles (cambium present)</p>
                        <p className="text-sm">• Hypodermis: collenchyma</p>
                        <p className="text-sm">• Well-defined cortex and pith</p>
                        <p className="text-sm">• Secondary growth possible</p>
                      </div>
                      <div>
                        <Badge className="mb-2 bg-blue-500">Monocot Stem</Badge>
                        <p className="text-sm">• Vascular bundles scattered</p>
                        <p className="text-sm">• Closed bundles (no cambium)</p>
                        <p className="text-sm">• Hypodermis: sclerenchyma</p>
                        <p className="text-sm">• No differentiation of tissues</p>
                        <p className="text-sm">• No secondary growth</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 glass-panel glow-halo float-medium">
                  <CardHeader>
                    <CardTitle className="text-lg">Dicot Root vs Monocot Root</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Badge className="mb-2">Dicot Root</Badge>
                        <p className="text-sm">• 2-6 xylem bundles (tetrarch)</p>
                        <p className="text-sm">• Pith absent or small</p>
                        <p className="text-sm">• Secondary growth occurs</p>
                        <p className="text-sm">• Pericycle forms cambium</p>
                      </div>
                      <div>
                        <Badge className="mb-2 bg-orange-500">Monocot Root</Badge>
                        <p className="text-sm">• Many xylem bundles (polyarch)</p>
                        <p className="text-sm">• Large well-developed pith</p>
                        <p className="text-sm">• No secondary growth</p>
                        <p className="text-sm">• Pericycle only forms lateral roots</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 glass-panel glow-halo float-medium">
                <CardHeader>
                  <CardTitle>Xylem vs Phloem Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Xylem (Water Transport)</h4>
                      <p className="text-sm mb-2"><strong>Components:</strong></p>
                      <p className="text-xs">• Tracheids (elongated, pointed)</p>
                      <p className="text-xs">• Vessels (wider, perforated)</p>
                      <p className="text-xs">• Xylem parenchyma (storage)</p>
                      <p className="text-xs">• Xylem fibers (support)</p>
                      <p className="text-sm mt-2"><strong>Function:</strong> Upward conduction</p>
                      <p className="text-sm"><strong>Cells:</strong> Dead (except parenchyma)</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Phloem (Food Transport)</h4>
                      <p className="text-sm mb-2"><strong>Components:</strong></p>
                      <p className="text-xs">• Sieve tubes (enucleate, living)</p>
                      <p className="text-xs">• Companion cells (nucleated)</p>
                      <p className="text-xs">• Phloem parenchyma (storage)</p>
                      <p className="text-xs">• Phloem fibers (support)</p>
                      <p className="text-sm mt-2"><strong>Function:</strong> Bidirectional transport</p>
                      <p className="text-sm"><strong>Cells:</strong> Living (except fibers)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel glow-halo float-gentle">
                <CardHeader>
                  <CardTitle>Simple Tissues Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Parenchyma</h4>
                      <p className="text-xs">• Living, thin-walled</p>
                      <p className="text-xs">• Isodiametric cells</p>
                      <p className="text-xs">• Large intercellular spaces</p>
                      <p className="text-xs">• Storage, photosynthesis</p>
                      <p className="text-xs font-semibold mt-2">Location: Pith, cortex</p>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Collenchyma</h4>
                      <p className="text-xs">• Living, thickened corners</p>
                      <p className="text-xs">• Elongated cells</p>
                      <p className="text-xs">• No intercellular spaces</p>
                      <p className="text-xs">• Support with flexibility</p>
                      <p className="text-xs font-semibold mt-2">Location: Hypodermis, petioles</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Sclerenchyma</h4>
                      <p className="text-xs">• Dead, lignified walls</p>
                      <p className="text-xs">• Fibers or sclereids</p>
                      <p className="text-xs">• No intercellular spaces</p>
                      <p className="text-xs">• Mechanical strength</p>
                      <p className="text-xs font-semibold mt-2">Location: Vascular bundles</p>
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
