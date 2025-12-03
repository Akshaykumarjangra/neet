
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sun, Leaf, Droplet, Wind, Zap, TestTubes , Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const photosynthesisOverview = {
  definition: "Process by which green plants synthesize organic compounds (glucose) from inorganic raw materials (CO₂ and H₂O) in the presence of sunlight and chlorophyll",
  equation: "6CO₂ + 12H₂O + Light energy → C₆H₁₂O₆ + 6O₂ + 6H₂O",
  significance: [
    "Primary source of food for all living organisms",
    "Maintains atmospheric oxygen levels",
    "Removes CO₂ from atmosphere (carbon fixation)",
    "Basis of all food chains and food webs",
    "Produces biomass and organic matter"
  ]
};

const chloroplastStructure = [
  {
    component: "Outer Membrane",
    function: "Permeable to small molecules, provides protection",
    features: ["Smooth surface", "Permeable to ions and metabolites"]
  },
  {
    component: "Inner Membrane",
    function: "Selectively permeable, regulates transport",
    features: ["Less permeable", "Contains transport proteins"]
  },
  {
    component: "Stroma",
    function: "Site of dark reaction (Calvin cycle)",
    features: [
      "Contains enzymes for CO₂ fixation",
      "Contains ribosomes and DNA",
      "Site of starch synthesis"
    ]
  },
  {
    component: "Thylakoids",
    function: "Site of light reaction",
    features: [
      "Flattened membranous sacs",
      "Contain chlorophyll and photosystems",
      "Arranged in stacks called grana"
    ]
  },
  {
    component: "Grana",
    function: "Increase surface area for light absorption",
    features: [
      "Stacks of thylakoids",
      "Connected by stroma lamellae",
      "Site of photophosphorylation"
    ]
  }
];

const pigments = [
  {
    type: "Chlorophyll a",
    color: "Blue-green",
    absorbs: "430 nm (blue) and 662 nm (red)",
    function: "Primary photosynthetic pigment, reaction center",
    location: "All photosynthetic organisms"
  },
  {
    type: "Chlorophyll b",
    color: "Yellow-green",
    absorbs: "453 nm (blue) and 642 nm (red)",
    function: "Accessory pigment, transfers energy to chlorophyll a",
    location: "Higher plants and green algae"
  },
  {
    type: "Carotenoids (Carotene)",
    color: "Orange",
    absorbs: "400-500 nm (blue-green)",
    function: "Accessory pigment, photoprotection",
    location: "All photosynthetic organisms"
  },
  {
    type: "Xanthophylls",
    color: "Yellow",
    absorbs: "400-530 nm (blue-green)",
    function: "Accessory pigment, photoprotection",
    location: "Higher plants"
  }
];

const lightReaction = {
  location: "Thylakoid membrane",
  requirements: ["Light", "Chlorophyll", "Water"],
  products: ["ATP", "NADPH", "O₂"],
  steps: [
    {
      process: "Photophosphorylation",
      types: [
        {
          type: "Non-Cyclic Photophosphorylation",
          description: "Involves both PS II and PS I",
          steps: [
            "1. Light absorbed by PS II (P680)",
            "2. Electrons excited and transferred to primary acceptor",
            "3. Water splits (photolysis): 2H₂O → 4H⁺ + 4e⁻ + O₂",
            "4. Electrons pass through electron transport chain (ETC)",
            "5. ATP synthesized via chemiosmosis",
            "6. Electrons reach PS I (P700)",
            "7. PS I absorbs light, excites electrons again",
            "8. Electrons reduce NADP⁺ to NADPH"
          ],
          products: ["ATP", "NADPH", "O₂"]
        },
        {
          type: "Cyclic Photophosphorylation",
          description: "Involves only PS I",
          steps: [
            "1. Light absorbed by PS I (P700)",
            "2. Electrons excited and transferred to primary acceptor",
            "3. Electrons return to PS I via ETC",
            "4. ATP synthesized (no NADPH produced)",
            "5. No water splitting, no O₂ released"
          ],
          products: ["ATP only"]
        }
      ]
    }
  ]
};

const darkReaction = {
  location: "Stroma of chloroplast",
  alsoKnownAs: "Calvin Cycle, C3 Cycle, Blackman's reaction",
  requirements: ["CO₂", "ATP", "NADPH", "RuBisCO enzyme"],
  products: ["Glucose", "ADP", "NADP⁺"],
  phases: [
    {
      phase: "1. Carboxylation (CO₂ Fixation)",
      description: "CO₂ combines with RuBP to form 3-PGA",
      steps: [
        "CO₂ + RuBP (5C) → 2 molecules of 3-PGA (3C)",
        "Enzyme: RuBisCO (most abundant enzyme on Earth)",
        "First stable product: 3-phosphoglyceric acid (3-PGA)"
      ]
    },
    {
      phase: "2. Reduction",
      description: "3-PGA reduced to form glyceraldehyde-3-phosphate",
      steps: [
        "3-PGA + ATP → 1,3-bisphosphoglycerate",
        "1,3-bisphosphoglycerate + NADPH → G3P (Glyceraldehyde-3-phosphate)",
        "Some G3P used to form glucose",
        "Rest used to regenerate RuBP"
      ]
    },
    {
      phase: "3. Regeneration",
      description: "RuBP is regenerated for cycle continuation",
      steps: [
        "5 molecules of G3P (3C) → 3 molecules of RuBP (5C)",
        "Requires ATP",
        "Allows cycle to continue"
      ]
    }
  ],
  summary: "6 CO₂ + 18 ATP + 12 NADPH → 1 Glucose + 18 ADP + 12 NADP⁺"
};

const c4Pathway = {
  plants: "Maize, sugarcane, sorghum (tropical plants)",
  leafAnatomy: "Kranz anatomy - bundle sheath cells surrounding vascular bundles",
  mechanism: [
    "CO₂ fixed in mesophyll cells by PEP carboxylase",
    "Forms 4-carbon compound (oxaloacetic acid - OAA)",
    "OAA converted to malic acid or aspartic acid",
    "Transported to bundle sheath cells",
    "CO₂ released and enters Calvin cycle",
    "Pyruvate returns to mesophyll cells"
  ],
  advantages: [
    "Higher CO₂ concentration at RuBisCO",
    "No photorespiration",
    "Better efficiency in hot, dry conditions",
    "Better water use efficiency"
  ]
};

const camPathway = {
  plants: "Cacti, pineapple, Agave (succulents)",
  fullForm: "Crassulacean Acid Metabolism",
  mechanism: [
    "Stomata open at night (prevents water loss)",
    "CO₂ fixed as malic acid (stored in vacuoles)",
    "During day, stomata close",
    "Malic acid releases CO₂",
    "CO₂ enters Calvin cycle"
  ],
  advantages: [
    "Minimal water loss",
    "Adaptation to arid conditions",
    "Temporal separation of CO₂ fixation and Calvin cycle"
  ]
};

const limitingFactors = [
  {
    factor: "Light Intensity",
    effect: "Rate increases with intensity up to saturation point",
    details: [
      "Low light - rate increases linearly with light",
      "High light - rate plateaus (light saturation)",
      "Very high light - photoinhibition may occur"
    ]
  },
  {
    factor: "CO₂ Concentration",
    effect: "Rate increases with CO₂ concentration",
    details: [
      "Normal atmospheric CO₂: 0.03-0.04%",
      "Optimal for C3 plants: 0.05%",
      "Beyond saturation point, no further increase"
    ]
  },
  {
    factor: "Temperature",
    effect: "Optimal range 25-35°C for C3 plants",
    details: [
      "Low temperature - enzyme activity reduced",
      "High temperature - enzyme denaturation",
      "C4 plants tolerate higher temperatures better"
    ]
  },
  {
    factor: "Water",
    effect: "Essential as raw material and for maintaining turgidity",
    details: [
      "Water stress closes stomata",
      "Reduced CO₂ uptake",
      "Wilting affects photosynthesis"
    ]
  }
];

const neetQuestions = [
  {
    question: "In C4 plants, the primary CO₂ acceptor is:",
    options: [
      "A) RuBP (5-carbon)",
      "B) PEP (3-carbon)",
      "C) OAA (4-carbon)",
      "D) PGA (3-carbon)"
    ],
    correct: "B",
    explanation: "In C4 plants, CO₂ is first fixed by PEP (phosphoenolpyruvate - 3-carbon) using PEP carboxylase enzyme in mesophyll cells. This forms OAA (4-carbon compound)."
  },
  {
    question: "Photolysis of water occurs in:",
    options: [
      "A) Stroma",
      "B) Inner membrane of chloroplast",
      "C) Thylakoid lumen",
      "D) Cytoplasm"
    ],
    correct: "C",
    explanation: "Photolysis (splitting) of water occurs in the thylakoid lumen during light reaction. Water splits to release electrons, protons, and oxygen: 2H₂O → 4H⁺ + 4e⁻ + O₂."
  },
  {
    question: "Which is the first stable product of Calvin cycle?",
    options: [
      "A) Glucose",
      "B) 3-phosphoglyceric acid (3-PGA)",
      "C) RuBP",
      "D) Glyceraldehyde-3-phosphate"
    ],
    correct: "B",
    explanation: "3-PGA (3-phosphoglyceric acid) is the first stable product of Calvin cycle, formed when CO₂ combines with RuBP in the carboxylation step catalyzed by RuBisCO."
  },
  {
    question: "The oxygen evolved during photosynthesis comes from:",
    options: [
      "A) CO₂",
      "B) Water",
      "C) Glucose",
      "D) Chlorophyll"
    ],
    correct: "B",
    explanation: "Oxygen released during photosynthesis comes from photolysis of water (H₂O), not from CO₂. This was proven by experiments using isotope O¹⁸."
  }
];

export function BotanyChapter9() {
  // Fetch questions from database for Mineral Nutrition (topicId: 73)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '73'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=73');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  return (
    <div className="container mx-auto p-6 space-y-6 gradient-mesh-bg min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <Sun className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 9: Photosynthesis</h1>
          <p className="text-muted-foreground">Understanding the process of energy conversion in plants</p>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-green-500/10 to-yellow-500/10 border-green-500/20 glass-panel glow-halo float-medium">
        <CardHeader>
          <CardTitle>Chapter Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>{photosynthesisOverview.definition}</p>
          <Card className="bg-blue-500/10 border-blue-500/20 glass-panel glow-halo float-medium">
            <CardContent className="pt-4">
              <p className="font-mono text-center text-lg">
                {photosynthesisOverview.equation}
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Tabs defaultValue="structure" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="structure">
            <Leaf className="h-4 w-4 mr-2" />
            Structure
          </TabsTrigger>
          <TabsTrigger value="light">
            <Sun className="h-4 w-4 mr-2" />
            Light Reaction
          </TabsTrigger>
          <TabsTrigger value="dark">
            <Droplet className="h-4 w-4 mr-2" />
            Dark Reaction
          </TabsTrigger>
          <TabsTrigger value="c4cam">
            <Wind className="h-4 w-4 mr-2" />
            C4 & CAM
          </TabsTrigger>
          <TabsTrigger value="factors">
            <Zap className="h-4 w-4 mr-2" />
            Factors
          </TabsTrigger>
          <TabsTrigger value="practice">
            <TestTubes className="h-4 w-4 mr-2" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Chloroplast Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {chloroplastStructure.map((comp, idx) => (
                <Card key={idx} className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600 dark:text-green-400">
                      {comp.component}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{comp.function}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {comp.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-sm">
                          <span className="text-green-500">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Photosynthetic Pigments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3 text-left">Pigment</th>
                      <th className="p-3 text-left">Color</th>
                      <th className="p-3 text-left">Absorption Peak</th>
                      <th className="p-3 text-left">Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pigments.map((pigment, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-3 font-semibold">{pigment.type}</td>
                        <td className="p-3">
                          <Badge variant="secondary">{pigment.color}</Badge>
                        </td>
                        <td className="p-3 text-muted-foreground">{pigment.absorbs}</td>
                        <td className="p-3">{pigment.function}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="light" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Light Reaction (Hill's Reaction)</CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Badge>Location: {lightReaction.location}</Badge>
                <Badge variant="secondary">Products: {lightReaction.products.join(", ")}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {lightReaction.steps[0].types.map((type, idx) => (
                <Card key={idx} className={idx === 0 ? "border-blue-500/20" : "border-purple-500/20"}>
                  <CardHeader>
                    <CardTitle className={`text-xl ${idx === 0 ? "text-blue-600 dark:text-blue-400" : "text-purple-600 dark:text-purple-400"}`}>
                      {type.type}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Steps:</h4>
                      <div className="space-y-2">
                        {type.steps.map((step, sIdx) => (
                          <Card key={sIdx} className={`${idx === 0 ? "bg-blue-500/10 border-blue-500/20" : "bg-purple-500/10 border-purple-500/20"}`}>
                            <CardContent className="pt-3">
                              <p className="text-sm">{step}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    <Card className="bg-orange-500/10 border-orange-500/20 glass-panel glow-halo float-medium">
                      <CardContent className="pt-4">
                        <p className="font-semibold text-orange-600 dark:text-orange-400">
                          Products: {type.products.join(", ")}
                        </p>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20 glass-panel glow-halo float-medium">
            <CardHeader>
              <CardTitle>Photosystems</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Photosystem II (PS II)</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>Reaction center: P680 (absorbs 680 nm wavelength)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>First to receive light energy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>Involved in photolysis of water</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Photosystem I (PS I)</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>Reaction center: P700 (absorbs 700 nm wavelength)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>Receives electrons from PS II</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>Involved in NADPH formation</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dark" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Calvin Cycle (Dark Reaction)</CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Badge>Location: {darkReaction.location}</Badge>
                <Badge variant="secondary">Also called: {darkReaction.alsoKnownAs}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {darkReaction.phases.map((phase, idx) => (
                <Card key={idx} className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600 dark:text-green-400">
                      {phase.phase}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.steps.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-sm">
                          <span className="text-green-500 font-bold">→</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-blue-500/10 border-blue-500/20 glass-panel glow-halo float-medium">
                <CardHeader>
                  <CardTitle>Overall Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-center">{darkReaction.summary}</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20 glass-panel glow-halo float-medium">
            <CardHeader>
              <CardTitle>Key Points</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Does not require direct light but needs ATP and NADPH from light reaction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>RuBisCO is the most abundant enzyme on Earth</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>For 1 glucose molecule: 6 CO₂, 18 ATP, and 12 NADPH are required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Called C3 cycle because first stable product is 3-carbon compound (3-PGA)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="c4cam" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>C4 Pathway (Hatch-Slack Pathway)</CardTitle>
              <Badge variant="secondary">Plants: {c4Pathway.plants}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Mechanism:</h4>
                <div className="space-y-2">
                  {c4Pathway.mechanism.map((step, idx) => (
                    <Card key={idx} className="bg-blue-500/10 border-blue-500/20">
                      <CardContent className="pt-3 flex items-start gap-3">
                        <Badge variant="outline">{idx + 1}</Badge>
                        <p className="text-sm">{step}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Advantages:</h4>
                <ul className="space-y-1">
                  {c4Pathway.advantages.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500">✓</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="bg-orange-500/10 border-orange-500/20 glass-panel glow-halo float-medium">
                <CardContent className="pt-4">
                  <p className="text-sm font-semibold">
                    🌱 Kranz Anatomy: Bundle sheath cells form a wreath-like structure around vascular bundles
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>CAM Pathway</CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">{camPathway.fullForm}</Badge>
                <Badge>Plants: {camPathway.plants}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Mechanism:</h4>
                <div className="space-y-2">
                  {camPathway.mechanism.map((step, idx) => (
                    <Card key={idx} className="bg-purple-500/10 border-purple-500/20">
                      <CardContent className="pt-3 flex items-start gap-3">
                        <Badge variant="outline">{idx + 1}</Badge>
                        <p className="text-sm">{step}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Advantages:</h4>
                <ul className="space-y-1">
                  {camPathway.advantages.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500">✓</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="factors" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Limiting Factors of Photosynthesis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {limitingFactors.map((factor, idx) => (
                <Card key={idx} className="border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-600 dark:text-orange-400">
                      {factor.factor}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{factor.effect}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {factor.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-sm">
                          <span className="text-orange-500">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 glass-panel glow-halo float-medium">
            <CardHeader>
              <CardTitle>Significance of Photosynthesis</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {photosynthesisOverview.significance.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
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
          <Accordion type="single" collapsible className="w-full">
            {neetQuestions.map((q, idx) => (
              <AccordionItem key={idx} value={`question-${idx}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-start gap-3">
                    <Badge>{idx + 1}</Badge>
                    <span>{q.questionText}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="space-y-2">
                    {q.options.map((option, oIdx) => (
                      <Card key={oIdx} className={option.startsWith(q.correct) ? "border-green-500/50 bg-green-500/10" : ""}>
                        <CardContent className="pt-4">
                          <p className="text-sm">{typeof option === "string" ? option : option.text}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Card className="bg-blue-500/10 border-blue-500/20 glass-panel glow-halo float-medium">
                    <CardContent className="pt-4">
                      <p className="text-sm"><strong>Explanation:</strong> {q.explanation}</p>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        
          )}</TabsContent>
      </Tabs>
    </div>
  );
}
