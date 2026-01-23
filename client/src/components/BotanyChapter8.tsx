
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Droplet, ArrowUp, ArrowDown, Wind, Activity, TestTubes , Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
const waterAbsorption = {
  mechanism: [
    {
      type: "Active Absorption",
      description: "Water absorption due to root activity",
      characteristics: [
        "Requires metabolic energy (ATP)",
        "Occurs during day when transpiration is high",
        "Root pressure develops",
        "Continues even if shoot is cut"
      ]
    },
    {
      type: "Passive Absorption",
      description: "Water absorption due to transpiration pull",
      characteristics: [
        "No metabolic energy required",
        "Driven by transpiration from leaves",
        "Most common method (98% of absorption)",
        "Follows water potential gradient"
      ]
    }
  ],
  pathways: [
    {
      pathway: "Apoplast Pathway",
      route: "Through cell walls and intercellular spaces",
      features: [
        "Does not cross cell membrane",
        "Faster movement",
        "Bulk flow of water",
        "Blocked by Casparian strip in endodermis"
      ]
    },
    {
      pathway: "Symplast Pathway",
      route: "Through cytoplasm and plasmodesmata",
      features: [
        "Crosses cell membranes",
        "Slower than apoplast",
        "Selective movement",
        "Main pathway after endodermis"
      ]
    },
    {
      pathway: "Transmembrane Pathway",
      route: "Across cell membranes repeatedly",
      features: [
        "Crosses both membrane and cytoplasm",
        "Most controlled pathway",
        "Involves aquaporins",
        "Energy dependent"
      ]
    }
  ]
};

const transpirationTypes = [
  {
    type: "Stomatal Transpiration",
    percentage: "90-95%",
    description: "Loss of water through stomata",
    features: [
      "Most significant type",
      "Occurs mainly in leaves",
      "Regulated by stomatal opening/closing",
      "Affected by environmental factors"
    ]
  },
  {
    type: "Cuticular Transpiration",
    percentage: "3-10%",
    description: "Loss through cuticle layer",
    features: [
      "Occurs through waxy cuticle",
      "Unavoidable water loss",
      "Continuous process",
      "Higher in young leaves"
    ]
  },
  {
    type: "Lenticular Transpiration",
    percentage: "0.1%",
    description: "Loss through lenticels in woody stems",
    features: [
      "Very small amount",
      "Occurs in woody plants",
      "Through lenticels in bark",
      "Insignificant compared to stomatal"
    ]
  }
];

const stomatalMechanism = {
  opening: [
    "Light stimulates K+ uptake by guard cells",
    "K+ enters guard cells → water potential decreases",
    "Water enters guard cells by osmosis",
    "Guard cells become turgid and swell",
    "Thicker inner wall causes bending",
    "Stomatal pore opens"
  ],
  closing: [
    "In darkness, K+ moves out of guard cells",
    "Water potential increases",
    "Water leaves guard cells",
    "Guard cells become flaccid",
    "Stomatal pore closes",
    "Also closes when abscisic acid (ABA) is present"
  ]
};

const transpirationFactors = [
  {
    factor: "Light",
    effect: "Increases transpiration",
    reason: "Stomata open in light for photosynthesis"
  },
  {
    factor: "Temperature",
    effect: "Increases transpiration",
    reason: "Higher temperature increases evaporation rate"
  },
  {
    factor: "Humidity",
    effect: "Decreases transpiration",
    reason: "High humidity reduces water potential gradient"
  },
  {
    factor: "Wind",
    effect: "Increases transpiration",
    reason: "Removes saturated air around leaf surface"
  },
  {
    factor: "Soil Water",
    effect: "More water = more transpiration",
    reason: "Availability of water for absorption"
  },
  {
    factor: "Atmospheric Pressure",
    effect: "Low pressure increases transpiration",
    reason: "Faster evaporation at lower pressure"
  }
];

const xylemTransport = {
  theories: [
    {
      theory: "Root Pressure Theory",
      description: "Positive pressure in roots pushes water upward",
      evidence: [
        "Guttation (water droplets on leaf margins)",
        "Bleeding from cut stems",
        "Measurable as 1-2 atm pressure"
      ],
      limitations: [
        "Cannot account for tall trees (>10m)",
        "Absent during rapid transpiration",
        "Not present in all plants"
      ]
    },
    {
      theory: "Transpiration Pull - Cohesion-Tension Theory",
      description: "Most accepted theory for water ascent",
      mechanism: [
        "1. Water evaporates from leaf mesophyll cells (transpiration)",
        "2. Creates tension (negative pressure) in leaf xylem",
        "3. Tension transmitted down xylem due to cohesion",
        "4. Water molecules stick together (cohesion)",
        "5. Water column pulled up continuously",
        "6. Adhesion helps water stick to xylem walls"
      ],
      requirements: [
        "Continuous water column in xylem",
        "Strong cohesive forces between water molecules",
        "Adhesion to xylem walls",
        "Sufficient transpiration pull"
      ]
    }
  ]
};

const phloemTransport = {
  mechanism: "Pressure Flow Hypothesis (Mass Flow Hypothesis)",
  proposedBy: "Ernst Munch (1930)",
  steps: [
    "1. Source: Sucrose loaded into phloem at source (leaves)",
    "2. Water enters by osmosis → high turgor pressure at source",
    "3. Sink: Sucrose unloaded at sink (roots, fruits, growing regions)",
    "4. Water leaves by osmosis → low turgor pressure at sink",
    "5. Pressure gradient from source to sink drives mass flow",
    "6. Sap flows from high to low pressure regions"
  ],
  evidence: [
    "Aphid stylet experiments show high pressure in phloem",
    "Ringing experiments prove phloem transports organic solutes",
    "Bidirectional flow in different phloem tubes",
    "Translocation rate matches pressure flow predictions"
  ]
};

const mineralAbsorption = [
  {
    method: "Passive Absorption",
    description: "No energy required, along concentration gradient",
    mechanisms: [
      "Simple diffusion - movement along gradient",
      "Facilitated diffusion - through carrier proteins",
      "Ion exchange - cations/anions exchange with H+/OH-"
    ]
  },
  {
    method: "Active Absorption",
    description: "Energy required (ATP), against concentration gradient",
    mechanisms: [
      "Active transport through carrier proteins",
      "Proton pump creates electrochemical gradient",
      "Symport - minerals co-transported with H+",
      "Most important for mineral uptake"
    ]
  }
];

const neetQuestions = [
  {
    question: "The most widely accepted theory for ascent of sap in tall trees is:",
    options: [
      "A) Root pressure theory",
      "B) Capillary theory",
      "C) Transpiration pull-cohesion tension theory",
      "D) Pulsation theory"
    ],
    correct: "C",
    explanation: "Transpiration pull-cohesion tension theory is most accepted. It explains water ascent even in tall trees through continuous water column held by cohesion and pulled by transpiration."
  },
  {
    question: "Maximum water absorption occurs through which pathway after reaching endodermis?",
    options: [
      "A) Apoplast pathway",
      "B) Symplast pathway",
      "C) Transmembrane pathway",
      "D) Vacuolar pathway"
    ],
    correct: "B",
    explanation: "After endodermis, water must use symplast pathway because Casparian strip blocks apoplast pathway. Water moves through cytoplasm and plasmodesmata."
  },
  {
    question: "Opening of stomata is due to:",
    options: [
      "A) Decrease in turgor pressure of guard cells",
      "B) Increase in turgor pressure of guard cells",
      "C) Active transport of water",
      "D) Decrease in K+ concentration"
    ],
    correct: "B",
    explanation: "Stomata open when guard cells become turgid due to K+ uptake and water influx. Increased turgor pressure causes guard cells to swell and bend, opening the pore."
  }
];

export function BotanyChapter8() {
  // Fetch questions from database for Transport in Plants (topicId: 72)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '72'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=72');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  return (
    <div className="container mx-auto p-6 space-y-6 gradient-mesh-bg min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <Droplet className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 8: Transport in Plants</h1>
          <p className="text-muted-foreground">Water absorption, transpiration, and translocation mechanisms</p>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20 glass-panel glow-halo float-medium">
        <CardHeader>
          <CardTitle>Chapter Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Plants need to transport water, minerals, and organic nutrients from one part to another.
            This chapter covers water absorption by roots, transpiration from leaves, ascent of sap in xylem,
            and translocation of organic solutes in phloem.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="absorption" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="absorption">
            <ArrowDown className="h-4 w-4 mr-2" />
            Water Absorption
          </TabsTrigger>
          <TabsTrigger value="transpiration">
            <Wind className="h-4 w-4 mr-2" />
            Transpiration
          </TabsTrigger>
          <TabsTrigger value="xylem">
            <ArrowUp className="h-4 w-4 mr-2" />
            Xylem Transport
          </TabsTrigger>
          <TabsTrigger value="phloem">
            <Activity className="h-4 w-4 mr-2" />
            Phloem Transport
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <TestTubes className="h-4 w-4 mr-2" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="absorption" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Mechanisms of Water Absorption</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {waterAbsorption.mechanism.map((mech, idx) => (
                <Card key={idx} className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600 dark:text-blue-400">
                      {mech.type}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{mech.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {mech.characteristics.map((char, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2 text-sm">
                          <span className="text-blue-500">•</span>
                          <span>{char}</span>
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
              <CardTitle>Pathways of Water Movement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {waterAbsorption.pathways.map((path, idx) => (
                <Card key={idx} className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600 dark:text-green-400">
                      {path.pathway}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{path.route}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {path.features.map((feature, fIdx) => (
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

          <Card className="border-purple-500/20 glass-panel glow-halo float-medium">
            <CardHeader>
              <CardTitle>Mineral Absorption</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mineralAbsorption.map((method, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">
                    {method.method}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                  <ul className="space-y-1">
                    {method.mechanisms.map((mech, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2 text-sm">
                        <span className="text-purple-500">•</span>
                        <span>{mech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transpiration" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Types of Transpiration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {transpirationTypes.map((type, idx) => (
                <Card key={idx} className="border-orange-500/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-orange-600 dark:text-orange-400">
                        {type.type}
                      </CardTitle>
                      <Badge variant="secondary">{type.percentage}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {type.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-sm">
                          <span className="text-orange-500">•</span>
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
              <CardTitle>Stomatal Mechanism</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-600 dark:text-green-400">
                  Opening of Stomata (Day)
                </h4>
                <div className="space-y-2">
                  {stomatalMechanism.opening.map((step, idx) => (
                    <Card key={idx} className="bg-green-500/10 border-green-500/20">
                      <CardContent className="pt-4 flex items-start gap-3">
                        <Badge variant="outline">{idx + 1}</Badge>
                        <p className="text-sm">{step}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-red-600 dark:text-red-400">
                  Closing of Stomata (Night)
                </h4>
                <div className="space-y-2">
                  {stomatalMechanism.closing.map((step, idx) => (
                    <Card key={idx} className="bg-red-500/10 border-red-500/20">
                      <CardContent className="pt-4 flex items-start gap-3">
                        <Badge variant="outline">{idx + 1}</Badge>
                        <p className="text-sm">{step}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Factors Affecting Transpiration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3 text-left">Factor</th>
                      <th className="p-3 text-left">Effect</th>
                      <th className="p-3 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transpirationFactors.map((factor, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-3 font-semibold">{factor.factor}</td>
                        <td className="p-3">
                          <Badge variant={factor.effect.includes("Increases") ? "default" : "secondary"}>
                            {factor.effect}
                          </Badge>
                        </td>
                        <td className="p-3 text-muted-foreground">{factor.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="xylem" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Theories of Water Ascent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {xylemTransport.theories.map((theory, idx) => (
                <Card key={idx} className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600 dark:text-blue-400">
                      {theory.theory}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{theory.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {theory.evidence && (
                      <div>
                        <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">
                          Evidence:
                        </h4>
                        <ul className="space-y-1">
                          {theory.evidence.map((ev, eIdx) => (
                            <li key={eIdx} className="flex items-start gap-2 text-sm">
                              <span className="text-green-500">✓</span>
                              <span>{ev}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {theory.limitations && (
                      <div>
                        <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">
                          Limitations:
                        </h4>
                        <ul className="space-y-1">
                          {theory.limitations.map((lim, lIdx) => (
                            <li key={lIdx} className="flex items-start gap-2 text-sm">
                              <span className="text-red-500">✗</span>
                              <span>{lim}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {theory.mechanism && (
                      <div>
                        <h4 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">
                          Mechanism:
                        </h4>
                        <div className="space-y-2">
                          {theory.mechanism.map((step, sIdx) => (
                            <Card key={sIdx} className="bg-purple-500/10 border-purple-500/20">
                              <CardContent className="pt-3">
                                <p className="text-sm">{step}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phloem" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>{phloemTransport.mechanism}</CardTitle>
              <p className="text-sm text-muted-foreground">Proposed by: {phloemTransport.proposedBy}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Mechanism Steps:</h4>
                <div className="space-y-2">
                  {phloemTransport.steps.map((step, idx) => (
                    <Card key={idx} className="border-green-500/20">
                      <CardContent className="pt-4">
                        <p className="text-sm">{step}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-blue-600 dark:text-blue-400">
                  Supporting Evidence:
                </h4>
                <ul className="space-y-2">
                  {phloemTransport.evidence.map((ev, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span className="text-sm">{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-500/20 glass-panel glow-halo float-medium">
            <CardHeader>
              <CardTitle>Key Differences: Xylem vs Phloem Transport</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-blue-500/20 glass-panel glow-halo float-medium">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600 dark:text-blue-400">
                      Xylem Transport
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm">
                    <p>• Transports water and minerals</p>
                    <p>• Unidirectional (upward)</p>
                    <p>• Driven by transpiration pull</p>
                    <p>• Through dead cells</p>
                    <p>• No metabolic energy needed</p>
                  </CardContent>
                </Card>
                <Card className="border-green-500/20 glass-panel glow-halo float-medium">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600 dark:text-green-400">
                      Phloem Transport
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm">
                    <p>• Transports organic nutrients</p>
                    <p>• Bidirectional (up and down)</p>
                    <p>• Driven by pressure gradient</p>
                    <p>• Through living cells</p>
                    <p>• Requires metabolic energy</p>
                  </CardContent>
                </Card>
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
                    <span>{getQuestionLabel(q)}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="space-y-2">
                    {q.options.map((option, oIdx) => (
                      <Card key={oIdx} className={option.startsWith(q.correct) ? "border-green-500/50 bg-green-500/10" : ""}>
                        <CardContent className="pt-4">
                          <p className="text-sm">{getOptionLabel(option)}</p>
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
