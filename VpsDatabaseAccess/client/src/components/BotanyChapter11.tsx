import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sprout, Sun, Droplet, Leaf, Activity, TestTubes , Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const growthOverview = {
  definition: "Irreversible permanent increase in size, weight, and number of cells accompanied by metabolic processes",
  phases: [
    {
      phase: "Cell Division (Meristematic Phase)",
      description: "Formation of new cells through mitosis",
      location: "Root and shoot apical meristems"
    },
    {
      phase: "Cell Enlargement (Elongation Phase)",
      description: "Increase in cell size through vacuolation and protoplasm synthesis",
      location: "Region behind meristematic zone"
    },
    {
      phase: "Cell Differentiation (Maturation Phase)",
      description: "Cells become structurally and functionally specialized",
      location: "Region behind elongation zone"
    }
  ]
};

const growthCurve = {
  name: "Sigmoid Growth Curve",
  phases: [
    {
      phase: "Lag Phase",
      description: "Initial slow growth phase",
      characteristics: [
        "Cells preparing for division",
        "Metabolic activities begin",
        "Slow rate of growth"
      ]
    },
    {
      phase: "Log/Exponential Phase",
      description: "Rapid growth phase",
      characteristics: [
        "Maximum growth rate",
        "Cell division at peak",
        "Follows logarithmic pattern"
      ]
    },
    {
      phase: "Stationary Phase",
      description: "Growth rate slows down",
      characteristics: [
        "Limited nutrients/space",
        "Growth rate decreases",
        "Approaches maximum size"
      ]
    }
  ]
};

const plantHormones = [
  {
    hormone: "Auxins (IAA - Indole Acetic Acid)",
    functions: [
      "Promote cell elongation in stems and coleoptiles",
      "Apical dominance (suppress lateral bud growth)",
      "Induce root formation on stem cuttings",
      "Prevent leaf and fruit abscission",
      "Induce parthenocarpy (seedless fruits)"
    ],
    synthesis: "Growing apices of stems and roots",
    application: [
      "Rooting hormones in plant propagation",
      "Herbicides (2,4-D)",
      "Prevention of fruit drop"
    ]
  },
  {
    hormone: "Gibberellins (GA₃ - Gibberellic Acid)",
    functions: [
      "Promote stem elongation (especially in dwarf plants)",
      "Break seed and bud dormancy",
      "Promote bolting (rapid stem elongation before flowering)",
      "Induce parthenocarpy",
      "Delay senescence"
    ],
    synthesis: "Young tissues, seeds",
    application: [
      "Increase sugarcane stem length",
      "Speed up malting process in brewing",
      "Produce seedless fruits"
    ]
  },
  {
    hormone: "Cytokinins (Zeatin, Kinetin)",
    functions: [
      "Promote cell division (cytokinesis)",
      "Delay leaf senescence",
      "Promote lateral bud growth",
      "Overcome apical dominance",
      "Promote nutrient mobilization"
    ],
    synthesis: "Root apices, developing seeds",
    application: [
      "Tissue culture (inducing shoot formation)",
      "Keeping flowers and vegetables fresh",
      "Stimulate germination"
    ]
  },
  {
    hormone: "Abscisic Acid (ABA - Stress Hormone)",
    functions: [
      "Promotes stomatal closure (water stress)",
      "Induces seed dormancy",
      "Inhibits growth",
      "Promotes abscission of leaves and fruits",
      "Increases tolerance to stresses"
    ],
    synthesis: "Chloroplasts, roots, mature leaves",
    application: [
      "Drought stress management",
      "Seed storage (prevents germination)",
      "Leaf abscission control"
    ]
  },
  {
    hormone: "Ethylene (C₂H₄ - Gaseous Hormone)",
    functions: [
      "Promotes fruit ripening",
      "Promotes flower and leaf abscission",
      "Breaks seed and bud dormancy",
      "Promotes root growth and root hair formation",
      "Triple response in pea seedlings"
    ],
    synthesis: "Ripening fruits, senescing tissues",
    application: [
      "Artificial fruit ripening (bananas, tomatoes)",
      "Degreening of citrus fruits",
      "Promotes female flowers in cucurbits"
    ]
  }
];

const photoperiodism = {
  definition: "Response of plants to relative length of day and night (photoperiod)",
  types: [
    {
      type: "Short Day Plants (SDP)",
      requirement: "Require day length shorter than critical day length",
      examples: "Chrysanthemum, rice, soybean, tobacco",
      actualRequirement: "Long uninterrupted dark period"
    },
    {
      type: "Long Day Plants (LDP)",
      requirement: "Require day length longer than critical day length",
      examples: "Wheat, spinach, radish, lettuce",
      actualRequirement: "Short dark period"
    },
    {
      type: "Day Neutral Plants",
      requirement: "Flowering independent of photoperiod",
      examples: "Tomato, cotton, sunflower, maize",
      actualRequirement: "Other factors (temperature, nutrition)"
    }
  ],
  pigment: "Phytochrome (Pr ⇄ Pfr)",
  explanation: [
    "Plants measure dark period, not light period",
    "Critical factor is uninterrupted dark period",
    "Phytochrome is the photoreceptor",
    "Red light (660nm) converts Pr to Pfr",
    "Far-red light (730nm) converts Pfr to Pr"
  ]
};

const vernalization = {
  definition: "Promotion of flowering by cold treatment",
  requirement: "Exposure to low temperature (0-5°C) for certain period",
  examples: [
    "Winter wheat, barley, rye",
    "Biennial plants (cabbage, carrot)",
    "Some perennials"
  ],
  mechanism: [
    "Qualitative requirement: Plant won't flower without cold",
    "Quantitative requirement: Cold accelerates flowering",
    "Prevents precocious flowering",
    "Ensures flowering in favorable season"
  ],
  site: "Shoot apical meristem",
  practical: "Winter wheat can be converted to spring wheat by vernalization"
};

const seedDormancy = {
  definition: "Temporary failure of viable seed to germinate under favorable conditions",
  types: [
    {
      type: "Innate/Endogenous Dormancy",
      cause: "Internal factors within seed",
      examples: [
        "Seed coat impermeability (hard seeds)",
        "Immature embryo",
        "Presence of growth inhibitors (ABA)",
        "Mechanical resistance of seed coat"
      ]
    },
    {
      type: "Induced/Exogenous Dormancy",
      cause: "External environmental factors",
      examples: [
        "Low temperature",
        "Inadequate moisture",
        "Lack of oxygen",
        "Absence of light"
      ]
    }
  ],
  breakingMethods: [
    "Scarification (scratching seed coat)",
    "Stratification (cold treatment)",
    "Soaking in water",
    "Treatment with gibberellins",
    "Exposure to light"
  ],
  significance: [
    "Prevents germination in unfavorable season",
    "Allows seed dispersal",
    "Ensures species survival",
    "Spreads germination over time"
  ]
};

const tropisms = [
  {
    tropism: "Phototropism",
    stimulus: "Light",
    example: "Stem bends towards light (positive), roots away from light (negative)",
    mechanism: "Auxin redistribution - more auxin on shaded side causes more growth"
  },
  {
    tropism: "Geotropism/Gravitropism",
    stimulus: "Gravity",
    example: "Roots grow downward (positive), stems upward (negative)",
    mechanism: "Auxin and starch statoliths in specialized cells"
  },
  {
    tropism: "Hydrotropism",
    stimulus: "Water",
    example: "Roots grow towards moisture",
    mechanism: "Differential growth in response to water gradient"
  },
  {
    tropism: "Thigmotropism",
    stimulus: "Touch/Contact",
    example: "Tendrils of pea coil around support",
    mechanism: "Differential growth rates on contact vs non-contact sides"
  },
  {
    tropism: "Chemotropism",
    stimulus: "Chemical",
    example: "Pollen tube grows towards ovule",
    mechanism: "Growth towards chemical gradient"
  }
];

const nasticMovements = [
  {
    movement: "Photonasty",
    stimulus: "Light intensity (not direction)",
    example: "Opening and closing of flowers (morning glory, moonflower)",
    mechanism: "Changes in turgor pressure in cells"
  },
  {
    movement: "Thermonasty",
    stimulus: "Temperature",
    example: "Tulip flowers open in warmth, close in cold",
    mechanism: "Differential growth rates at different temperatures"
  },
  {
    movement: "Seismonasty/Thigmonasty",
    stimulus: "Touch or shock",
    example: "Mimosa pudica (touch-me-not) leaves fold when touched",
    mechanism: "Rapid loss of turgor pressure in pulvinus cells"
  },
  {
    movement: "Nyctinasty",
    stimulus: "Day/night rhythm",
    example: "Sleep movements in legume leaves",
    mechanism: "Circadian rhythm, turgor changes in pulvinus"
  }
];

const neetQuestions = [
  {
    question: "Which plant hormone is known as 'stress hormone'?",
    options: [
      "A) Auxin",
      "B) Gibberellin",
      "C) Abscisic acid",
      "D) Cytokinin"
    ],
    correct: "C",
    explanation: "Abscisic acid (ABA) is called the stress hormone because it helps plants cope with various stresses like drought, by promoting stomatal closure and inducing dormancy."
  },
  {
    question: "The process of vernalization involves treatment with:",
    options: [
      "A) High temperature",
      "B) Low temperature",
      "C) High light intensity",
      "D) Hormones"
    ],
    correct: "B",
    explanation: "Vernalization is the promotion of flowering by exposure to low temperature (0-5°C). This is required by many winter annuals and biennials to flower."
  },
  {
    question: "Photoperiodism was first observed by:",
    options: [
      "A) Darwin",
      "B) Garner and Allard",
      "C) Went",
      "D) Priestley"
    ],
    correct: "B",
    explanation: "Garner and Allard discovered photoperiodism in 1920 while studying the Maryland Mammoth variety of tobacco. They found that flowering is controlled by day length."
  },
  {
    question: "Apical dominance is caused by:",
    options: [
      "A) Cytokinins",
      "B) Gibberellins",
      "C) Auxins",
      "D) Ethylene"
    ],
    correct: "C",
    explanation: "Apical dominance, where the main shoot suppresses the growth of lateral buds, is caused by auxins produced in the shoot apex."
  }
];

export function BotanyChapter11() {
  // Fetch questions from database for Respiration in Plants (topicId: 75)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '75'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=75');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  return (
    <div className="container mx-auto p-6 space-y-6 gradient-mesh-bg min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <Sprout className="h-8 w-8 text-green-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 11: Plant Growth and Development</h1>
          <p className="text-muted-foreground">Growth patterns, plant hormones, and environmental responses</p>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20 glass-panel glow-halo float-medium">
        <CardHeader>
          <CardTitle>Chapter Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{growthOverview.definition}</p>
          <div className="grid md:grid-cols-3 gap-4">
            {growthOverview.phases.map((phase, idx) => (
              <Card key={idx} className="bg-green-500/10 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-base">{phase.phase}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>{phase.description}</p>
                  <p className="text-muted-foreground">📍 {phase.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="hormones" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="hormones">
            <Activity className="h-4 w-4 mr-2" />
            Hormones
          </TabsTrigger>
          <TabsTrigger value="photoperiod">
            <Sun className="h-4 w-4 mr-2" />
            Photoperiod
          </TabsTrigger>
          <TabsTrigger value="vernalization">
            <Droplet className="h-4 w-4 mr-2" />
            Vernalization
          </TabsTrigger>
          <TabsTrigger value="dormancy">
            <Leaf className="h-4 w-4 mr-2" />
            Dormancy
          </TabsTrigger>
          <TabsTrigger value="movements">
            <Sprout className="h-4 w-4 mr-2" />
            Movements
          </TabsTrigger>
          <TabsTrigger value="practice">
            <TestTubes className="h-4 w-4 mr-2" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hormones" className="space-y-6">
          {plantHormones.map((hormone, idx) => (
            <Card key={idx} className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-600 dark:text-green-400">{hormone.hormone}</CardTitle>
                <Badge variant="secondary">Synthesized in: {hormone.synthesis}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Functions:</h4>
                  <ul className="space-y-1">
                    {hormone.functions.map((func, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500">•</span>
                        <span>{func}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Applications:</h4>
                  <ul className="space-y-1">
                    {hormone.application.map((app, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-500">✓</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="photoperiod" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Photoperiodism</CardTitle>
              <p className="text-sm text-muted-foreground">{photoperiodism.definition}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {photoperiodism.types.map((type, idx) => (
                <Card key={idx} className="bg-yellow-500/10 border-yellow-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-yellow-600 dark:text-yellow-400">{type.type}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Requirement:</strong> {type.requirement}</p>
                    <p><strong>Examples:</strong> {type.examples}</p>
                    <Badge className="bg-yellow-500">Actually requires: {type.actualRequirement}</Badge>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-purple-500/10 border-purple-500/20 glass-panel glow-halo float-medium">
                <CardHeader>
                  <CardTitle className="text-lg">Mechanism</CardTitle>
                  <Badge variant="secondary">Photoreceptor: {photoperiodism.pigment}</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {photoperiodism.explanation.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-purple-500">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vernalization" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Vernalization</CardTitle>
              <p className="text-sm text-muted-foreground">{vernalization.definition}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="bg-blue-500/10 border-blue-500/20 glass-panel glow-halo float-medium">
                <CardContent className="pt-4">
                  <p className="text-sm"><strong>Requirement:</strong> {vernalization.requirement}</p>
                  <p className="text-sm mt-2"><strong>Site:</strong> {vernalization.site}</p>
                </CardContent>
              </Card>

              <div>
                <h4 className="font-semibold mb-2">Examples:</h4>
                <ul className="space-y-1">
                  {vernalization.examples.map((ex, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-blue-500">•</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Mechanism:</h4>
                <ul className="space-y-1">
                  {vernalization.mechanism.map((mech, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500">•</span>
                      <span>{mech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="bg-orange-500/10 border-orange-500/20 glass-panel glow-halo float-medium">
                <CardContent className="pt-4">
                  <p className="text-sm font-semibold">💡 {vernalization.practical}</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dormancy" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Seed Dormancy</CardTitle>
              <p className="text-sm text-muted-foreground">{seedDormancy.definition}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {seedDormancy.types.map((type, idx) => (
                <Card key={idx} className="bg-purple-500/10 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-600 dark:text-purple-400">{type.type}</CardTitle>
                    <p className="text-sm text-muted-foreground">{type.cause}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {type.examples.map((ex, eIdx) => (
                        <li key={eIdx} className="flex items-start gap-2 text-sm">
                          <span className="text-purple-500">•</span>
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-green-500/10 border-green-500/20 glass-panel glow-halo float-medium">
                <CardHeader>
                  <CardTitle className="text-lg">Breaking Dormancy</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {seedDormancy.breakingMethods.map((method, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500">✓</span>
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-blue-500/10 border-blue-500/20 glass-panel glow-halo float-medium">
                <CardHeader>
                  <CardTitle className="text-lg">Significance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {seedDormancy.significance.map((sig, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-500">•</span>
                        <span>{sig}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Tropic Movements (Growth-dependent, directional)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tropisms.map((trop, idx) => (
                  <Card key={idx} className="bg-green-500/10 border-green-500/20">
                    <CardContent className="pt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-green-600 dark:text-green-400">{trop.tropism}</h4>
                        <Badge variant="outline">Stimulus: {trop.stimulus}</Badge>
                      </div>
                      <p className="text-sm"><strong>Example:</strong> {trop.example}</p>
                      <p className="text-sm text-muted-foreground"><strong>Mechanism:</strong> {trop.mechanism}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Nastic Movements (Non-directional, independent of stimulus direction)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nasticMovements.map((nastic, idx) => (
                  <Card key={idx} className="bg-blue-500/10 border-blue-500/20">
                    <CardContent className="pt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-blue-600 dark:text-blue-400">{nastic.movement}</h4>
                        <Badge variant="outline">Stimulus: {nastic.stimulus}</Badge>
                      </div>
                      <p className="text-sm"><strong>Example:</strong> {nastic.example}</p>
                      <p className="text-sm text-muted-foreground"><strong>Mechanism:</strong> {nastic.mechanism}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
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