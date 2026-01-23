import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Lightbulb,
  Calculator,
  Layers,
  Droplets,
  Loader2,
} from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas?: string[];
}

const chapter12Topics: Topic[] = [
  {
    id: "adsorption-basics",
    title: "Adsorption Basics",
    description:
      "Difference between adsorption and absorption plus factors that control surface activity.",
    keyPoints: [
      "Adsorption = accumulation of molecules at a surface, absorption = penetration throughout the bulk.",
      "Adsorbent (surface) examples: charcoal, silica gel, alumina; adsorbate: species being adsorbed.",
      "Physisorption: weak van der Waals forces, multilayer, reversible, low enthalpy change (20-40 kJ mol^-1).",
      "Chemisorption: formation of chemical bonds, monolayer, often irreversible, high enthalpy change (80-240 kJ mol^-1).",
      "Extent of adsorption increases with surface area and pressure but generally decreases with temperature.",
    ],
    examples: [
      "Gas masks rely on charcoal to adsorb toxic gases.",
      "Hydrogenation of oils begins with H2 chemisorbing on Ni or Pt surfaces.",
      "Silica gel sachets prevent moisture damage inside packages.",
    ],
    formulas: [
      "Extent of adsorption = x/m (mass adsorbate per gram adsorbent).",
      "Delta H for physisorption < Delta H for chemisorption.",
    ],
  },
  {
    id: "adsorption-isotherms",
    title: "Freundlich and Langmuir Isotherms",
    description:
      "Mathematical relationships that describe how much gas or solute is adsorbed at a given pressure or concentration.",
    keyPoints: [
      "Freundlich isotherm (empirical): x/m = k P^(1/n) where n > 1.",
      "Log form: log(x/m) = log k + (1/n) log P gives a straight line with slope 1/n.",
      "Langmuir isotherm assumes monolayer adsorption on identical sites: theta = (bP)/(1 + bP).",
      "At low pressure theta is proportional to P, at high pressure theta approaches 1 (surface saturation).",
      "Isotherms help compare adsorption capacity of different solids.",
    ],
    examples: [
      "Dyes on charcoal obey the linear Freundlich plot log(x/m) vs log P.",
      "Ammonia on tungsten follows Langmuir behaviour characteristic of chemisorption.",
    ],
    formulas: [
      "Freundlich: log(x/m) = log k + (1/n) log P.",
      "Langmuir: theta = (bP)/(1 + bP) and 1/(x/m) = (1/k) + (1/kb)(1/P).",
    ],
  },
  {
    id: "catalysis",
    title: "Heterogeneous and Enzyme Catalysis",
    description:
      "Surface catalysts provide an alternate pathway with lower activation energy and are critical in industry and biology.",
    keyPoints: [
      "Heterogeneous catalyst mechanism: adsorption -> activation -> surface reaction -> desorption.",
      "Haber process uses iron with K2O and Al2O3 promoters at roughly 450 deg C and 200 atm.",
      "Contact process uses V2O5 to oxidise SO2 into SO3; catalytic converters rely on Pt/Rh coatings.",
      "Promoters increase activity whereas poisons such as CO on Pt lower activity.",
      "Enzymes obey Michaelis-Menten kinetics and show high specificity.",
    ],
    examples: [
      "Hydrogenation of vegetable oils on finely divided nickel.",
      "Ziegler-Natta catalysts (TiCl4 + Al(C2H5)3) polymerise alkenes with controlled stereochemistry.",
      "Urease enzyme catalyses hydrolysis of urea in the liver.",
    ],
    formulas: [
      "Rate for enzymes: v = (Vmax [S])/(Km + [S]).",
      "Haber optimum: roughly 450 deg C, 200 atm and promoted Fe catalyst.",
    ],
  },
  {
    id: "colloids",
    title: "Colloids and Interfacial Properties",
    description:
      "Colloidal systems have particle size between true solution and suspensions giving unique optical and electrical behaviour.",
    keyPoints: [
      "Classification by physical state: sols, gels, aerosols, foams, emulsions.",
      "Preparation: dispersion (Bredig arc, ultrasonic) or condensation (double decomposition, solvent change).",
      "Tyndall effect and Brownian motion keep particles dispersed and prove kinetic nature.",
      "Colloids carry charge and develop an electric double layer; zeta potential governs stability.",
      "Protective colloids (gelatin) safeguard lyophobic sols; gold number compares efficiency.",
    ],
    examples: [
      "Gold sols exhibit bright colours due to surface plasmon resonance.",
      "Hydrophilic sols such as starch are more stable than hydrophobic metal sols.",
      "Dialysis removes electrolytes from colloidal solutions and is used in haemodialysis.",
    ],
  },
  {
    id: "emulsions",
    title: "Emulsions, Coagulation and Uses",
    description:
      "Liquid-in-liquid colloids and real-life technology based on surface chemistry.",
    keyPoints: [
      "Emulsion types: oil-in-water (milk, latex) and water-in-oil (butter, cold cream).",
      "Emulsifying agents such as soaps, detergents and proteins reduce interfacial tension and stabilise droplets.",
      "Hardy-Schulze rule: higher valence counter-ions coagulate lyophobic sols more effectively.",
      "Micelle formation above the critical micelle concentration explains detergency.",
      "Applications include detergents, froth flotation, photographic plates, drug delivery and lung surfactants.",
    ],
    examples: [
      "Fe(OH)3 sol is best coagulated by Na3PO4 because PO4^3- has higher charge.",
      "Pine oil assists froth flotation by making sulphide particles attach to air bubbles.",
      "Sodium stearate micelles trap grease and allow washing with water.",
    ],
  },
];

export function ChemistryChapter12() {
  // Fetch questions from database for Surface Chemistry (topicId placeholder)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions", "topicId", "2102"],
    queryFn: async () => {
      const response = await fetch("/api/questions?topicId=2102");
      if (!response.ok) throw new Error("Failed to fetch questions");
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  const [activeTab, setActiveTab] = useState("overview");
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showSolutions, setShowSolutions] = useState(false);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const checkAnswers = () => {
    setShowSolutions(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowSolutions(false);
  };

  const score = Object.entries(userAnswers).filter(([qId, answer]) => {
    const question = practiceQuestions.find((q) => q.id === parseInt(qId));
    return question && answer === question.correctAnswer;
  }).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Layers className="h-8 w-8 text-cyan-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 12: Surface Chemistry</h1>
          <p className="text-muted-foreground">
            Adsorption, catalysis, colloids and emulsions for NEET Chemistry
          </p>
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
            <Droplets className="h-4 w-4 mr-2" />
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
                <h3 className="text-lg font-semibold mb-2">What You Will Learn</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Mechanism and energetics of physisorption versus chemisorption.</li>
                  <li>Freundlich and Langmuir isotherms plus their assumptions.</li>
                  <li>Heterogeneous and enzyme catalysis, promoters and poisons.</li>
                  <li>Preparation and properties of colloidal sols, gels and aerosols.</li>
                  <li>Tyndall effect, Brownian motion and zeta potential.</li>
                  <li>Emulsions, micelles, detergency and coagulation rules.</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-cyan-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-cyan-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Concepts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>
                      <strong>Adsorption:</strong> Always exothermic and favoured by large surface area.
                    </p>
                    <p>
                      <strong>Isotherms:</strong> Freundlich is empirical, Langmuir assumes a monolayer.
                    </p>
                    <p>
                      <strong>Catalysis:</strong> Active sites lower activation energy; promoters and poisons modify them.
                    </p>
                    <p>
                      <strong>Colloids:</strong> Stability depends on charge and presence of protective colloids.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-secondary/20">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">
                      Quick Tips
                    </Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>(!) Writing absorption when the process is adsorption.</p>
                    <p>(!) Using the Freundlich equation at very high pressure ranges.</p>
                    <p>(!) Forgetting that initial chemisorption often increases with temperature.</p>
                    <p>(!) Ignoring ionic charge when applying the Hardy-Schulze rule for coagulation.</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Important Relationships
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm font-mono">
                  <p>log(x/m) = log k + (1/n) log P (Freundlich).</p>
                  <p>theta = (bP)/(1 + bP) (Langmuir).</p>
                  <p>v = (Vmax [S])/(Km + [S]) (Michaelis-Menten).</p>
                  <p>Coagulating power proportional to valence^3 (Hardy-Schulze).</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
                <CardHeader>
                  <CardTitle>Real-World Interfaces</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>Lung surfactants lower surface tension to prevent alveolar collapse.</p>
                  <p>Micelles in soaps and detergents emulsify oil and grease for washing.</p>
                  <p>Froth flotation upgrades sulphide ores through selective adsorption.</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter12Topics.map((topic, index) => (
              <AccordionItem key={topic.id} value={topic.id}>
                <Card>
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-start gap-3 text-left">
                      <Badge variant="outline" className="mt-1">
                        {index + 1}
                      </Badge>
                      <div>
                        <h3 className="text-lg font-semibold">{topic.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {topic.description}
                        </p>
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
                              <span className="text-cyan-500 mt-1">*</span>
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {topic.formulas && topic.formulas.length > 0 && (
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Calculator className="h-4 w-4" />
                            Equations
                          </h4>
                          <div className="space-y-2">
                            {topic.formulas.map((formula, i) => (
                              <p
                                key={i}
                                className="font-mono text-sm bg-background p-2 rounded"
                              >
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
                            <div
                              key={i}
                              className="bg-cyan-50 dark:bg-cyan-950/20 p-3 rounded-lg border border-cyan-200 dark:border-cyan-800"
                            >
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
          <Card>
            <CardHeader>
              <CardTitle>Surface Chemistry Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Test your understanding of adsorption isotherms, catalysis and colloids.
                  </p>
                  <div className="mt-2">
                    <p className="text-2xl font-bold text-primary">
                      {score}/{practiceQuestions.length || 5}
                    </p>
                    <p className="text-xs text-muted-foreground">Current Score</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={checkAnswers} disabled={practiceQuestions.length === 0}>
                    Check Answers
                  </Button>
                  <Button variant="outline" onClick={resetQuiz}>
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {questionsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : practiceQuestions.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Practice questions will appear here once they are added to the database.
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Attempt the Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {practiceQuestions.map((q, index) => (
                  <div key={q.id} className="space-y-3 border-b pb-4 last:border-none">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary">{index + 1}</Badge>
                      <div>
                        <p className="font-medium">{q.questionText}</p>
                        <div className="grid gap-2 mt-3">
                          {q.options.map((option) => (
                            <Button
                              key={option.id}
                              variant={
                                showSolutions
                                  ? option.id === q.correctAnswer
                                    ? "default"
                                    : userAnswers[q.id] === option.id
                                    ? "destructive"
                                    : "outline"
                                  : userAnswers[q.id] === option.id
                                  ? "default"
                                  : "outline"
                              }
                              className="justify-start text-left"
                              onClick={() => handleAnswerSelect(q.id, option.id)}
                              disabled={showSolutions}
                            >
                              {option.text}
                            </Button>
                          ))}
                        </div>
                        {showSolutions && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Correct: {q.correctAnswer} - {q.solutionDetail}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
