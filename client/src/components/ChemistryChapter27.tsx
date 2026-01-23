
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Lightbulb, Calculator, Leaf, Droplet, Wind , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter27Topics: Topic[] = [
  {
    id: "environmental-pollution",
    title: "Environmental Pollution",
    description: "Types and sources of pollution affecting our environment.",
    keyPoints: [
      "Pollution: Undesirable change in physical, chemical or biological characteristics",
      "Types: Air, water, soil, noise, thermal pollution",
      "Point source: Single identifiable source (factory chimney)",
      "Non-point source: Multiple diffuse sources (agricultural runoff)",
      "Primary pollutants: Directly emitted (SO₂, NO₂, CO)",
      "Secondary pollutants: Formed by reactions (O₃, PAN, acid rain)",
      "Biodegradable: Broken down by microorganisms (food waste)",
      "Non-biodegradable: Not broken down naturally (plastics, DDT)"
    ],
    examples: [
      "CO from incomplete combustion of fuels",
      "SO₂ from burning coal in industries",
      "NO₂ from vehicle exhausts",
      "Plastic waste in oceans (Great Pacific Garbage Patch)",
      "Mercury in water bodies (Minamata disease)",
      "Noise pollution from traffic and industry"
    ]
  },
  {
    id: "air-pollution",
    title: "Air Pollution",
    description: "Pollutants in atmosphere and their effects on health and environment.",
    keyPoints: [
      "Major pollutants: CO, SO₂, NO₂, O₃, SPM, hydrocarbons",
      "CO: Colorless, odorless, binds to hemoglobin (carboxyhemoglobin)",
      "SO₂ & NO₂: Cause acid rain, respiratory problems",
      "Tropospheric O₃: Ground level ozone, harmful to plants & humans",
      "Stratospheric O₃: Protective layer, absorbs UV radiation",
      "SPM: Suspended particulate matter (dust, smoke, aerosols)",
      "Smog: Smoke + fog; Classical (SO₂ + particulates) & Photochemical (O₃ + PAN)",
      "Global warming: Greenhouse effect by CO₂, CH₄, CFCs"
    ],
    examples: [
      "CO poisoning in closed rooms with burning coal",
      "London smog (1952) - classical smog",
      "Los Angeles smog - photochemical smog",
      "Bhopal gas tragedy (1984) - MIC leak",
      "Taj Mahal yellowing due to SO₂ pollution"
    ]
  },
  {
    id: "water-pollution",
    title: "Water Pollution",
    description: "Contamination of water bodies and its consequences.",
    keyPoints: [
      "Sources: Industrial effluents, sewage, agricultural runoff",
      "BOD (Biological Oxygen Demand): Oxygen needed by bacteria to decompose organic matter",
      "High BOD → low dissolved O₂ → fish death",
      "COD (Chemical Oxygen Demand): Total oxygen for chemical oxidation",
      "Eutrophication: Nutrient enrichment → algal bloom → O₂ depletion",
      "Heavy metals: Hg, Pb, Cd, As cause bioaccumulation",
      "Pesticides & fertilizers: Nitrates, phosphates pollute groundwater",
      "Detergents: Non-biodegradable surfactants cause foam"
    ],
    examples: [
      "Mercury in Minamata Bay (Japan) - fish poisoning",
      "Arsenic in groundwater (West Bengal, Bangladesh)",
      "Blue baby syndrome from nitrate pollution",
      "Eutrophication in lakes (algal bloom)",
      "Oil spills in oceans affecting marine life"
    ]
  },
  {
    id: "greenhouse-effect",
    title: "Greenhouse Effect & Global Warming",
    description: "Mechanism of heat trapping and climate change.",
    keyPoints: [
      "Greenhouse gases: CO₂, CH₄, N₂O, CFCs, O₃",
      "Mechanism: Gases trap IR radiation → warm Earth",
      "Natural greenhouse effect: Essential for life (33°C warming)",
      "Enhanced greenhouse effect: Human activities increase GHGs",
      "CO₂: Main contributor (fossil fuel burning, deforestation)",
      "CH₄: From rice paddies, cattle, landfills (20x more potent than CO₂)",
      "Effects: Rising temperature, melting ice, sea level rise",
      "Mitigation: Renewable energy, afforestation, carbon capture"
    ],
    examples: [
      "CO₂ levels increased from 280 ppm (1850) to 420 ppm (2024)",
      "Arctic ice melting accelerating",
      "Coral bleaching due to warming oceans",
      "Extreme weather events increasing"
    ]
  },
  {
    id: "ozone-depletion",
    title: "Ozone Layer Depletion",
    description: "Destruction of stratospheric ozone and its protection.",
    keyPoints: [
      "Ozone layer: 15-30 km altitude, absorbs UV-B radiation",
      "CFCs (Chlorofluorocarbons): Main cause (refrigerants, aerosols)",
      "Mechanism: CFCl₃ + UV → CFCl₂ + Cl•; Cl• + O₃ → ClO• + O₂",
      "One Cl atom destroys 100,000 O₃ molecules (catalytic)",
      "Ozone hole: Severe depletion over Antarctica (spring)",
      "Effects: Skin cancer, cataracts, immune suppression, crop damage",
      "Montreal Protocol (1987): Ban on CFCs",
      "Alternatives: HFCs (less harmful but still greenhouse gases)"
    ],
    examples: [
      "Antarctic ozone hole discovered (1985)",
      "CFCs in old refrigerators and ACs",
      "UV radiation increase in Southern hemisphere",
      "Replacement: HFC-134a instead of CFC-12"
    ],
    formulas: [
      "O₃ formation: O₂ + UV → O + O; O + O₂ → O₃",
      "O₃ absorption: O₃ + UV → O₂ + O",
      "CFC destruction: CFCl₃ + UV → CFCl₂ + Cl•",
      "Catalytic cycle: Cl• + O₃ → ClO• + O₂; ClO• + O → Cl• + O₂"
    ]
  },
  {
    id: "acid-rain",
    title: "Acid Rain",
    description: "Formation and effects of acidic precipitation.",
    keyPoints: [
      "Normal rain pH ≈ 5.6 (due to dissolved CO₂)",
      "Acid rain pH < 5.6 (due to SO₂, NO₂)",
      "Formation: SO₂ + H₂O → H₂SO₃; 2H₂SO₃ + O₂ → 2H₂SO₄",
      "NO₂ + H₂O → HNO₃ + HNO₂",
      "Effects: Damages buildings (marble, limestone), forests, aquatic life",
      "Soil acidification: Leaches nutrients, releases Al³⁺",
      "Control: Scrubbers in industries, catalytic converters in vehicles",
      "Liming: Adding CaCO₃ to neutralize acidic lakes"
    ],
    examples: [
      "Taj Mahal marble erosion: CaCO₃ + H₂SO₄ → CaSO₄ + CO₂ + H₂O",
      "Black Forest damage in Germany",
      "Scandinavian lake acidification",
      "Statue of Liberty corrosion"
    ],
    formulas: [
      "SO₂ + ½O₂ → SO₃; SO₃ + H₂O → H₂SO₄",
      "2NO + O₂ → 2NO₂; 3NO₂ + H₂O → 2HNO₃ + NO",
      "CaCO₃ + H₂SO₄ → CaSO₄ + CO₂ + H₂O"
    ]
  },
  {
    id: "green-chemistry",
    title: "Green Chemistry",
    description: "Sustainable chemical practices to reduce environmental impact.",
    keyPoints: [
      "12 Principles: Waste prevention, atom economy, less hazardous synthesis",
      "Atom economy: (MW of desired product / MW of all reactants) × 100",
      "Renewable feedstocks: Biomass instead of petroleum",
      "Catalysis: Reduces waste, energy consumption",
      "Biodegradable chemicals: Degrade naturally without harm",
      "Safer solvents: Water, supercritical CO₂ instead of organic solvents",
      "Energy efficiency: Reactions at ambient temperature/pressure",
      "Real-time monitoring: Prevent pollution before it occurs"
    ],
    examples: [
      "Biodiesel from vegetable oils",
      "Polylactic acid (PLA) from corn starch",
      "Supercritical CO₂ for dry cleaning",
      "Enzymatic synthesis (biocatalysis)",
      "Microwave-assisted reactions"
    ],
    formulas: [
      "Atom economy = (Mass of desired product / Total mass of reactants) × 100"
    ]
  },
  {
    id: "waste-management",
    title: "Waste Management",
    description: "Strategies for handling and reducing waste.",
    keyPoints: [
      "3R principle: Reduce, Reuse, Recycle",
      "Segregation: Biodegradable (green) and non-biodegradable (blue)",
      "Composting: Organic waste → manure",
      "Incineration: Burning waste at high temperature",
      "Landfills: Controlled disposal sites (risk of leachate)",
      "E-waste: Electronic waste containing toxic heavy metals",
      "Plastic waste: Recycling codes (PET, HDPE, PVC, LDPE, PP, PS)",
      "Bioremediation: Using microbes to clean pollutants"
    ],
    examples: [
      "Vermicomposting using earthworms",
      "Recycling of PET bottles",
      "E-waste recycling to recover metals",
      "Biogas from organic waste",
      "Phytoremediation using plants to absorb heavy metals"
    ]
  }
];



export function ChemistryChapter27() {
  // Fetch questions from database for Amines (topicId: 61)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '61'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=61');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  const [activeTab, setActiveTab] = useState("overview");
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showSolutions, setShowSolutions] = useState(false);

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const checkAnswers = () => {
    setShowSolutions(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowSolutions(false);
  };

  const score = Object.entries(userAnswers).filter(([qId, answerId]) => {
    const question = practiceQuestions.find(q => q.id === Number(qId));
    return question && answerId === question.correctAnswer;
  }).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Leaf className="h-8 w-8 text-green-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 27: Environmental Chemistry</h1>
          <p className="text-muted-foreground">Class XI & XII Chemistry - NEET Syllabus</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="topics">
            <Lightbulb className="h-4 w-4 mr-2" />
            Topics
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <Calculator className="h-4 w-4 mr-2" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chapter Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Types and sources of environmental pollution</li>
                  <li>Air pollutants and their effects (smog, greenhouse effect)</li>
                  <li>Water pollution and quality parameters (BOD, COD)</li>
                  <li>Greenhouse effect and global warming</li>
                  <li>Ozone layer depletion and protection</li>
                  <li>Acid rain formation and effects</li>
                  <li>Green chemistry principles</li>
                  <li>Waste management strategies</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card className="border-green-500/20">
                  <CardHeader>
                    <Wind className="h-6 w-6 text-green-500 mb-2" />
                    <CardTitle className="text-lg">Air Pollution</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>CO, SO₂, NO₂, O₃, SPM</p>
                    <p className="text-muted-foreground mt-2">Classical & photochemical smog</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20">
                  <CardHeader>
                    <Droplet className="h-6 w-6 text-blue-500 mb-2" />
                    <CardTitle className="text-lg">Water Pollution</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>BOD, COD, Eutrophication</p>
                    <p className="text-muted-foreground mt-2">Heavy metals, pesticides</p>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Leaf className="h-6 w-6 text-purple-500 mb-2" />
                    <CardTitle className="text-lg">Green Chemistry</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>Sustainable practices</p>
                    <p className="text-muted-foreground mt-2">Atom economy, biodegradable</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
                <CardHeader>
                  <CardTitle>Important Environmental Issues</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Global Warming:</strong> CO₂, CH₄ trap IR radiation</p>
                  <p><strong>Ozone Depletion:</strong> CFCs destroy O₃ layer</p>
                  <p><strong>Acid Rain:</strong> SO₂, NO₂ form acids (pH &lt; 5.6)</p>
                  <p><strong>Eutrophication:</strong> Excess nutrients → algal bloom</p>
                  <p><strong>Bioaccumulation:</strong> DDT, Hg concentrate in food chain</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter27Topics.map((topic, index) => (
              <AccordionItem key={topic.id} value={topic.id}>
                <Card>
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
                          <h4 className="font-semibold mb-3">Important Reactions</h4>
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
          <Card>
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
                        <p className="font-medium">Q{index + 1}. {q.questionText}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {q.options.map((option, index) => {
                        const optionId = typeof option === "string" ? String(index) : option.id;
                        const optionText = typeof option === "string" ? option : option.text;

                        return (
                        <Button
                          key={index}
                          variant={
                            showSolutions
                              ? optionId === q.correctAnswer
                                ? "default"
                                : userAnswers[q.id] === optionId
                                ? "destructive"
                                : "outline"
                              : userAnswers[q.id] === optionId
                              ? "secondary"
                              : "outline"
                          }
                          className="w-full justify-start text-left h-auto py-3"
                          onClick={() => !showSolutions && handleAnswerSelect(q.id, optionId)}
                          disabled={showSolutions}
                        >
                          <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                          {optionText}
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
