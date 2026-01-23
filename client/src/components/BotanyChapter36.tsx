
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Leaf, Wind, Droplets, Thermometer, Factory } from "lucide-react";

import { getOptionLabel, getQuestionLabel } from "@/lib/questionUtils";
const environmentalIssues = [
  {
    issue: "Air Pollution",
    causes: [
      "Vehicular emissions (CO, NOx, SO2, particulates)",
      "Industrial emissions (smoke, chemicals)",
      "Burning of fossil fuels",
      "Agricultural activities (dust, pesticides)",
      "Construction activities"
    ],
    effects: [
      "Respiratory diseases (asthma, bronchitis)",
      "Acid rain formation",
      "Greenhouse effect and global warming",
      "Ozone layer depletion",
      "Reduced visibility (smog)"
    ],
    solutions: [
      "Use of catalytic converters in vehicles",
      "Switching to cleaner fuels (CNG, LPG)",
      "Afforestation and green belts",
      "Industrial emission controls",
      "Public transport and carpooling"
    ],
    icon: Wind
  },
  {
    issue: "Water Pollution",
    causes: [
      "Industrial effluents (heavy metals, chemicals)",
      "Domestic sewage (organic waste, detergents)",
      "Agricultural runoff (fertilizers, pesticides)",
      "Oil spills",
      "Thermal pollution from power plants"
    ],
    effects: [
      "Eutrophication (algal blooms)",
      "Death of aquatic organisms",
      "Biomagnification of toxins",
      "Waterborne diseases (cholera, typhoid)",
      "Groundwater contamination"
    ],
    solutions: [
      "Sewage treatment plants",
      "Effluent treatment in industries",
      "Bioremediation techniques",
      "Integrated waste management",
      "Use of biodegradable materials"
    ],
    icon: Droplets
  },
  {
    issue: "Soil Pollution",
    causes: [
      "Industrial waste dumping",
      "Excessive use of pesticides and fertilizers",
      "Improper disposal of plastics",
      "Acid rain",
      "Mining activities"
    ],
    effects: [
      "Soil degradation and erosion",
      "Loss of soil fertility",
      "Accumulation of toxic substances",
      "Harm to soil microorganisms",
      "Reduced agricultural productivity"
    ],
    solutions: [
      "Organic farming practices",
      "Integrated pest management (IPM)",
      "Proper waste disposal systems",
      "Recycling and composting",
      "Afforestation"
    ],
    icon: Leaf
  }
];

const greenhouseEffect = {
  concept: "Natural process where certain gases trap heat in Earth's atmosphere",
  greenhouseGases: [
    { gas: "Carbon dioxide (CO₂)", source: "Fossil fuel combustion, deforestation", contribution: "60%" },
    { gas: "Methane (CH₄)", source: "Paddy fields, cattle, landfills", contribution: "20%" },
    { gas: "Nitrous oxide (N₂O)", source: "Fertilizers, industrial processes", contribution: "6%" },
    { gas: "CFCs", source: "Refrigerants, aerosols", contribution: "14%" }
  ],
  globalWarming: [
    "Average global temperature increase",
    "Melting of polar ice caps and glaciers",
    "Rising sea levels",
    "Changes in rainfall patterns",
    "Extreme weather events",
    "Ecosystem disruption"
  ],
  mitigation: [
    "Reduce fossil fuel consumption",
    "Increase use of renewable energy",
    "Afforestation and reforestation",
    "Energy efficient technologies",
    "Carbon sequestration methods"
  ]
};

const ozoneDepletion = {
  ozoneLayers: [
    { layer: "Stratospheric ozone (good)", function: "Protects from UV-B radiation", altitude: "15-35 km" },
    { layer: "Tropospheric ozone (bad)", function: "Air pollutant, causes respiratory issues", altitude: "0-15 km" }
  ],
  depletingSubstances: [
    "CFCs (Chlorofluorocarbons) - from refrigerators, ACs",
    "Halons - from fire extinguishers",
    "Carbon tetrachloride - industrial solvent",
    "Methyl bromide - fumigant"
  ],
  effects: [
    "Increased UV-B radiation reaching Earth",
    "Skin cancer and cataracts in humans",
    "Immune system suppression",
    "Damage to phytoplankton (affects food chains)",
    "Crop damage"
  ],
  solutions: [
    "Montreal Protocol (1987) - phase out ODSs",
    "Use of HCFC-22 as temporary alternative",
    "Development of ozone-friendly substitutes",
    "Proper disposal of old equipment"
  ]
};

const solidWasteManagement = [
  {
    type: "Municipal Solid Waste",
    components: "Paper, plastic, glass, metal, food waste, e-waste",
    methods: [
      "Sanitary landfills - controlled waste disposal",
      "Incineration - burning at high temperature",
      "Composting - biological decomposition",
      "Recycling - reprocessing materials"
    ]
  },
  {
    type: "E-waste",
    components: "Electronic devices, batteries, circuit boards",
    hazards: "Heavy metals (lead, mercury, cadmium), toxic chemicals",
    management: [
      "Proper collection centers",
      "Recycling facilities",
      "Safe disposal of hazardous components",
      "Extended producer responsibility (EPR)"
    ]
  }
];

const radioactiveWaste = {
  sources: [
    "Nuclear power plants",
    "Medical applications (radiotherapy)",
    "Research laboratories",
    "Nuclear weapons production"
  ],
  types: [
    { type: "Low-level waste", examples: "Contaminated clothing, tools", halfLife: "Short" },
    { type: "Intermediate-level waste", examples: "Reactor components, resins", halfLife: "Moderate" },
    { type: "High-level waste", examples: "Spent nuclear fuel", halfLife: "Very long (thousands of years)" }
  ],
  disposal: [
    "Vitrification - converting to stable glass form",
    "Deep geological repositories",
    "Interim storage facilities",
    "Transmutation (converting to less harmful isotopes)"
  ]
};

const caseStudies = [
  {
    name: "Taj Mahal - Acid Rain Damage",
    problem: "Yellowing of marble due to SO₂ and NO₂ from Mathura refinery",
    action: "Relocation of industries, use of CNG, Taj Trapezium Zone (TTZ) protection"
  },
  {
    name: "Delhi Air Pollution",
    problem: "High PM2.5 and PM10 levels, vehicular pollution, stubble burning",
    action: "Odd-even vehicle scheme, BS-VI norms, ban on stubble burning"
  },
  {
    name: "Ganga Action Plan",
    problem: "Sewage pollution, industrial effluents, religious activities",
    action: "STPs installation, Namami Gange project, public awareness"
  }
];

export function BotanyChapter36() {
  return (
    <div className="container mx-auto p-6 space-y-6 gradient-mesh-bg min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="h-8 w-8 text-red-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 36: Environmental Issues</h1>
          <p className="text-muted-foreground">Air, Water & Soil Pollution, Greenhouse Effect, Ozone Depletion, Waste Management</p>
        </div>
      </div>

      <Tabs defaultValue="pollution" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pollution">Pollution Types</TabsTrigger>
          <TabsTrigger value="greenhouse">Greenhouse Effect</TabsTrigger>
          <TabsTrigger value="ozone">Ozone Depletion</TabsTrigger>
          <TabsTrigger value="waste">Waste Management</TabsTrigger>
          <TabsTrigger value="cases">Case Studies</TabsTrigger>
        </TabsList>

        <TabsContent value="pollution" className="space-y-6">
          {environmentalIssues.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <Card key={idx} className="border-red-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconComponent className="h-6 w-6 text-red-500" />
                    {item.issue}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Causes:</h3>
                    <div className="grid gap-2">
                      {item.causes.map((cause, cIdx) => (
                        <Badge key={cIdx} variant="outline" className="justify-start">
                          • {cause}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">Effects:</h3>
                    <div className="grid gap-2">
                      {item.effects.map((effect, eIdx) => (
                        <Badge key={eIdx} variant="destructive" className="justify-start">
                          ⚠ {effect}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Solutions:</h3>
                    <div className="grid gap-2">
                      {item.solutions.map((solution, sIdx) => (
                        <Badge key={sIdx} variant="secondary" className="justify-start bg-green-500/10">
                          ✓ {solution}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="greenhouse" className="space-y-6">
          <Card className="border-orange-500/20 glass-panel glow-halo float-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-6 w-6 text-orange-500" />
                Greenhouse Effect & Global Warming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm bg-orange-500/10 p-3 rounded">{greenhouseEffect.concept}</p>

              <div>
                <h3 className="font-semibold mb-3">Major Greenhouse Gases:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {greenhouseEffect.greenhouseGases.map((item, idx) => (
                    <Card key={idx} className="bg-gradient-to-r from-orange-500/5 to-red-500/5">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold text-orange-600 dark:text-orange-400">{item.gas}</h4>
                        <p className="text-sm mt-1">Source: {item.source}</p>
                        <Badge className="mt-2">{item.contribution} contribution</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">Effects of Global Warming:</h3>
                <div className="grid gap-2">
                  {greenhouseEffect.globalWarming.map((effect, idx) => (
                    <Badge key={idx} variant="destructive" className="justify-start">
                      {effect}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Mitigation Strategies:</h3>
                <div className="grid gap-2">
                  {greenhouseEffect.mitigation.map((strategy, idx) => (
                    <Badge key={idx} variant="secondary" className="justify-start bg-green-500/10">
                      ✓ {strategy}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ozone" className="space-y-6">
          <Card className="border-blue-500/20 glass-panel glow-halo float-medium">
            <CardHeader>
              <CardTitle>Ozone Layer & Its Depletion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Types of Ozone:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {ozoneDepletion.ozoneLayers.map((layer, idx) => (
                    <Card key={idx} className={idx === 0 ? "bg-green-500/5" : "bg-red-500/5"}>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold">{layer.layer}</h4>
                        <p className="text-sm mt-1">{layer.function}</p>
                        <Badge className="mt-2" variant={idx === 0 ? "default" : "destructive"}>
                          {layer.altitude}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">Ozone Depleting Substances (ODS):</h3>
                <div className="grid gap-2">
                  {ozoneDepletion.depletingSubstances.map((substance, idx) => (
                    <Badge key={idx} variant="outline" className="justify-start">
                      • {substance}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Effects of Ozone Depletion:</h3>
                <div className="grid gap-2">
                  {ozoneDepletion.effects.map((effect, idx) => (
                    <Badge key={idx} variant="destructive" className="justify-start">
                      ⚠ {effect}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Control Measures:</h3>
                <div className="grid gap-2">
                  {ozoneDepletion.solutions.map((solution, idx) => (
                    <Badge key={idx} variant="secondary" className="justify-start bg-green-500/10">
                      ✓ {solution}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waste" className="space-y-6">
          <Card className="border-purple-500/20 glass-panel glow-halo float-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="h-6 w-6 text-purple-500" />
                Solid Waste Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {solidWasteManagement.map((waste, idx) => (
                <Card key={idx} className="bg-purple-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{waste.type}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm"><strong>Components:</strong> {waste.components}</p>
                    {waste.hazards && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        <strong>Hazards:</strong> {waste.hazards}
                      </p>
                    )}
                    <div>
                      <h4 className="font-semibold mb-2">Management Methods:</h4>
                      <div className="grid gap-2">
                        {waste.methods ? waste.methods.map((method, mIdx) => (
                          <Badge key={mIdx} variant="outline" className="justify-start">
                            • {method}
                          </Badge>
                        )) : waste.management.map((method, mIdx) => (
                          <Badge key={mIdx} variant="outline" className="justify-start">
                            • {method}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20 glass-panel glow-halo float-medium">
            <CardHeader>
              <CardTitle>Radioactive Waste Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Sources:</h3>
                <div className="grid gap-2">
                  {radioactiveWaste.sources.map((source, idx) => (
                    <Badge key={idx} variant="outline" className="justify-start">
                      • {source}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Types of Radioactive Waste:</h3>
                <div className="grid gap-3">
                  {radioactiveWaste.types.map((type, idx) => (
                    <Card key={idx} className="bg-yellow-500/5">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold text-yellow-600 dark:text-yellow-400">{type.type}</h4>
                        <p className="text-sm mt-1">Examples: {type.examples}</p>
                        <Badge className="mt-2">{type.halfLife} half-life</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Disposal Methods:</h3>
                <div className="grid gap-2">
                  {radioactiveWaste.disposal.map((method, idx) => (
                    <Badge key={idx} variant="secondary" className="justify-start bg-green-500/10">
                      ✓ {method}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cases" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Indian Case Studies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {caseStudies.map((study, idx) => (
                <Card key={idx} className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600 dark:text-blue-400">
                      {study.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-1">Problem:</h4>
                      <p className="text-sm">{study.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-600 dark:text-green-400 mb-1">Action Taken:</h4>
                      <p className="text-sm">{study.action}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20 glass-panel glow-halo float-medium">
        <CardHeader>
          <CardTitle>NEET Focus Points</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Types of pollution and their effects - frequently asked</p>
          <p>✓ Greenhouse gases with % contribution</p>
          <p>✓ Montreal Protocol (1987) - ozone layer protection</p>
          <p>✓ Difference between stratospheric and tropospheric ozone</p>
          <p>✓ Methods of solid waste management</p>
          <p>✓ Case studies from India (Taj Mahal, Delhi, Ganga)</p>
          <p>✓ Biomagnification vs Bioaccumulation concepts</p>
        </CardContent>
      </Card>
    </div>
  );
}
