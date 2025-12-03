
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VisualizationTab } from "@/components/VisualizationTab";
import { BookOpen, Lightbulb, Calculator, Zap, CheckCircle2, XCircle , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas: string[];
}

const chapter16Topics: Topic[] = [
  {
    id: "electric-current",
    title: "Electric Current and Drift Velocity",
    description: "Understanding the flow of electric charge and motion of charge carriers in conductors.",
    keyPoints: [
      "Electric current: Rate of flow of charge, I = dQ/dt, SI unit: Ampere (A)",
      "Current density: J = I/A, where A is cross-sectional area",
      "Drift velocity: Average velocity of charge carriers in an electric field",
      "Relation: I = nAevd (n = carrier density, e = charge, vd = drift velocity)",
      "Conventional current: Direction of positive charge flow (opposite to electron flow)",
      "Mobility: μ = vd/E (drift velocity per unit electric field)"
    ],
    examples: [
      "1 Ampere = 1 Coulomb/second (6.25 × 10¹⁸ electrons per second)",
      "In a copper wire carrying 1A, drift velocity ≈ 0.1 mm/s (very slow!)",
      "Current density in a wire of 2mm diameter carrying 5A: J = 5/(π×10⁻⁶) A/m²"
    ],
    formulas: [
      "I = Q/t (average current)",
      "I = dQ/dt (instantaneous current)",
      "I = nAevd (microscopic form)",
      "J = nevd = σE (current density)",
      "vd = μE = (eτ/m)E (drift velocity)"
    ]
  },
  {
    id: "ohms-law",
    title: "Ohm's Law and Resistance",
    description: "Fundamental relationship between voltage, current, and resistance in conductors.",
    keyPoints: [
      "Ohm's Law: V = IR (voltage across conductor proportional to current)",
      "Resistance: R = V/I, SI unit: Ohm (Ω)",
      "Resistance depends on: material (ρ), length (L), area (A): R = ρL/A",
      "Resistivity (ρ): Material property, SI unit: Ω·m",
      "Conductivity: σ = 1/ρ, SI unit: S/m or (Ω·m)⁻¹",
      "Temperature coefficient: α = (1/R)(dR/dT), for metals α > 0",
      "Ohmic vs Non-ohmic: Ohmic follows V∝I, non-ohmic doesn't (diodes, transistors)"
    ],
    examples: [
      "A 100Ω resistor with 10V across it carries current: I = V/R = 0.1A",
      "Copper wire 1m long, 1mm² area: R = (1.7×10⁻⁸)(1)/(10⁻⁶) = 0.017Ω",
      "Resistivity of copper: 1.7×10⁻⁸ Ω·m, silver: 1.6×10⁻⁸ Ω·m"
    ],
    formulas: [
      "V = IR (Ohm's Law)",
      "R = ρL/A (resistance formula)",
      "R = R₀(1 + αΔT) (temperature dependence)",
      "σ = 1/ρ = ne²τ/m (conductivity)",
      "G = 1/R (conductance in Siemens)"
    ]
  },
  {
    id: "resistor-combinations",
    title: "Series and Parallel Combinations",
    description: "Analyzing resistor networks and equivalent resistance calculations.",
    keyPoints: [
      "Series: Same current through all, voltages add, Rs = R₁ + R₂ + R₃ + ...",
      "Parallel: Same voltage across all, currents add, 1/Rp = 1/R₁ + 1/R₂ + ...",
      "Series: Equivalent resistance > individual resistances",
      "Parallel: Equivalent resistance < smallest individual resistance",
      "Voltage divider (series): V₁/V₂ = R₁/R₂",
      "Current divider (parallel): I₁/I₂ = R₂/R₁",
      "Two resistors in parallel: Rp = (R₁R₂)/(R₁ + R₂)"
    ],
    examples: [
      "Three 10Ω resistors in series: Rs = 30Ω",
      "Three 10Ω resistors in parallel: Rp = 10/3 = 3.33Ω",
      "12V across series combination (6Ω, 3Ω): Current = 12/9 = 1.33A",
      "Voltage across 6Ω = 1.33×6 = 8V, across 3Ω = 4V"
    ],
    formulas: [
      "Rs = R₁ + R₂ + R₃ + ... (series)",
      "1/Rp = 1/R₁ + 1/R₂ + 1/R₃ + ... (parallel)",
      "Rp = (R₁R₂)/(R₁ + R₂) (two in parallel)",
      "V₁ = V × R₁/(R₁ + R₂) (voltage divider)",
      "I₁ = I × R₂/(R₁ + R₂) (current divider)"
    ]
  },
  {
    id: "kirchhoffs-laws",
    title: "Kirchhoff's Laws",
    description: "Fundamental laws for analyzing complex electrical circuits.",
    keyPoints: [
      "Kirchhoff's Current Law (KCL): Sum of currents entering = sum leaving (ΣI = 0)",
      "Based on conservation of charge - no accumulation at junction",
      "Kirchhoff's Voltage Law (KVL): Sum of voltages in closed loop = 0 (ΣV = 0)",
      "Based on conservation of energy - potential difference independent of path",
      "Sign convention: Current entering junction is positive",
      "EMF positive when traversing from - to +, negative when + to -",
      "Voltage drop across resistor: positive in direction of current"
    ],
    examples: [
      "At junction: 5A + 3A = I₃ + 2A, so I₃ = 6A",
      "Loop with battery (12V) and resistors (4Ω, 6Ω): 12 - 4I - 6I = 0, I = 1.2A",
      "Wheatstone bridge balanced when: R₁/R₂ = R₃/R₄"
    ],
    formulas: [
      "ΣI(in) = ΣI(out) (KCL)",
      "ΣV = ΣE - ΣIR = 0 (KVL)",
      "For n junctions: (n-1) independent KCL equations",
      "For m loops: m independent KVL equations",
      "R₁/R₂ = R₃/R₄ (Wheatstone bridge balance)"
    ]
  },
  {
    id: "emf-internal-resistance",
    title: "EMF and Internal Resistance",
    description: "Understanding real batteries and cells with internal resistance.",
    keyPoints: [
      "EMF (ε): Maximum potential difference when no current flows",
      "Internal resistance (r): Resistance inside the cell/battery",
      "Terminal voltage: V = ε - Ir (when current I flows)",
      "Short circuit current: I(max) = ε/r (when external R = 0)",
      "Power delivered to external circuit: P = I²R = I(ε - Ir)",
      "Maximum power: When R = r, Pmax = ε²/4r",
      "Efficiency: η = V/ε = R/(R + r)"
    ],
    examples: [
      "Battery: ε = 12V, r = 0.5Ω, connected to 5.5Ω: I = 12/6 = 2A, V = 11V",
      "Car battery (12V, r=0.01Ω) starting motor (R=0.05Ω): I = 200A!",
      "For maximum power transfer: External resistance should equal internal resistance"
    ],
    formulas: [
      "V = ε - Ir (terminal voltage)",
      "I = ε/(R + r) (current in circuit)",
      "P(external) = I²R = ε²R/(R + r)² (power)",
      "P(max) = ε²/4r (when R = r)",
      "η = R/(R + r) × 100% (efficiency)"
    ]
  },
  {
    id: "cells-combination",
    title: "Combination of Cells",
    description: "Series and parallel arrangements of cells and their effective EMF.",
    keyPoints: [
      "Series (n cells): ε(eff) = nε, r(eff) = nr",
      "Parallel (n identical cells): ε(eff) = ε, r(eff) = r/n",
      "Mixed grouping (m rows, n cells per row): ε(eff) = nε, r(eff) = nr/m",
      "Maximum current: Series when R >> r, parallel when R << r",
      "For mixed grouping optimal: n = √(mR/r)",
      "Cells of different EMF in series: ε(total) = ε₁ + ε₂ + ε₃ + ...",
      "Cells in parallel must have same EMF for safety"
    ],
    examples: [
      "4 cells (1.5V, 1Ω) in series: ε = 6V, r = 4Ω",
      "4 cells (1.5V, 1Ω) in parallel: ε = 1.5V, r = 0.25Ω",
      "2 rows × 3 cells (2V, 0.5Ω): ε = 6V, r = 0.75Ω"
    ],
    formulas: [
      "ε(series) = nε, r(series) = nr",
      "ε(parallel) = ε, r(parallel) = r/n",
      "ε(mixed) = nε, r(mixed) = nr/m",
      "I(max) = mnε/(nr + mR) (mixed)",
      "n(optimal) = √(mR/r) (for maximum current)"
    ]
  },
  {
    id: "heating-effect",
    title: "Heating Effect of Current (Joule's Law)",
    description: "Heat produced when current flows through a resistor.",
    keyPoints: [
      "Joule's Law: H = I²Rt (heat produced in joules)",
      "Power dissipation: P = I²R = V²/R = VI (in watts)",
      "Heat in time t: H = Pt = VIt = I²Rt = (V²/R)t",
      "For series: Same current, heat ∝ R (more in higher resistance)",
      "For parallel: Same voltage, heat ∝ 1/R (more in lower resistance)",
      "Applications: Electric heaters, bulbs, fuses, electric welding",
      "1 calorie = 4.186 joules (heat unit conversion)"
    ],
    examples: [
      "100W bulb for 10h: Energy = 100×10×3600 = 3.6 MJ",
      "2kW heater, 230V: Current = P/V = 2000/230 = 8.7A",
      "Fuse wire: High resistance, low melting point - melts when I > rated value",
      "Electric kettle (1500W) for 5 min: H = 1500×300 = 450 kJ"
    ],
    formulas: [
      "H = I²Rt (Joule's heating)",
      "P = VI = I²R = V²/R (power)",
      "H = VIt = (V²/R)t (alternative forms)",
      "H(series) = I²R₁t : I²R₂t = R₁ : R₂",
      "H(parallel) = (V²/R₁)t : (V²/R₂)t = R₂ : R₁"
    ]
  },
  {
    id: "electric-power",
    title: "Electric Power and Energy",
    description: "Understanding power consumption and energy calculations.",
    keyPoints: [
      "Power: Rate of energy consumption, P = W/t",
      "Commercial unit: 1 kWh = 1000W × 3600s = 3.6 × 10⁶ J",
      "Power rating: Voltage and wattage specified (e.g., 100W, 230V)",
      "At rated voltage: Actual power = rated power",
      "Below rated voltage: P(actual) = P(rated) × (V(actual)/V(rated))²",
      "Series connection of bulbs: Higher wattage glows dimmer",
      "Parallel connection: Each bulb gets rated voltage"
    ],
    examples: [
      "1 kWh = 1 unit of electricity (board terminology)",
      "100W bulb for 10h = 1 kWh = 1 unit",
      "Monthly consumption: 5 bulbs (60W) × 6h × 30 days = 54 units",
      "Cost at ₹5/unit: 54 × 5 = ₹270"
    ],
    formulas: [
      "P = W/t = VI = I²R = V²/R",
      "W = Pt = VIt = I²Rt (energy/work)",
      "1 kWh = 3.6 × 10⁶ J",
      "P(actual)/P(rated) = (V(actual)/V(rated))²",
      "Cost = Units × Rate per unit"
    ]
  },
  {
    id: "carbon-resistors",
    title: "Carbon Resistors and Color Code",
    description: "Understanding practical resistors and their value identification.",
    keyPoints: [
      "Carbon composition resistors: Common, inexpensive, 4 or 5 color bands",
      "First band: First digit, Second band: Second digit",
      "Third band: Multiplier (power of 10)",
      "Fourth band: Tolerance (Gold ±5%, Silver ±10%, None ±20%)",
      "Fifth band (if present): Temperature coefficient or 3rd digit",
      "Color code: Black=0, Brown=1, Red=2, Orange=3, Yellow=4",
      "Green=5, Blue=6, Violet=7, Gray=8, White=9",
      "Preferred values: E12 series (10% tolerance), E24 series (5% tolerance)"
    ],
    examples: [
      "Brown-Black-Red-Gold: 10 × 10² = 1kΩ ± 5%",
      "Yellow-Violet-Orange-Silver: 47 × 10³ = 47kΩ ± 10%",
      "Red-Red-Brown-Gold: 22 × 10¹ = 220Ω ± 5%",
      "Green-Blue-Yellow-Gold: 56 × 10⁴ = 560kΩ ± 5%"
    ],
    formulas: [
      "R = (D₁D₂) × 10^M ± T%",
      "D₁, D₂: First two digits",
      "M: Multiplier band value",
      "T: Tolerance percentage"
    ]
  },
  {
    id: "meters",
    title: "Electrical Measuring Instruments",
    description: "Ammeter, voltmeter, and their applications in circuits.",
    keyPoints: [
      "Ammeter: Measures current, connected in series, very low resistance",
      "Ideal ammeter: Zero resistance (doesn't affect current)",
      "Voltmeter: Measures voltage, connected in parallel, very high resistance",
      "Ideal voltmeter: Infinite resistance (doesn't draw current)",
      "Galvanometer: Detects small currents, basis for ammeter and voltmeter",
      "Shunt resistance (ammeter): Rs = (Ig × G)/(I - Ig)",
      "Series resistance (voltmeter): R = (V/Ig) - G",
      "Multiplying factor: n = I/Ig (ammeter), n = V/Vg (voltmeter)"
    ],
    examples: [
      "Galvanometer (G=100Ω, Ig=1mA) to 1A ammeter: Shunt = 0.1Ω",
      "Same galvanometer to 10V voltmeter: Series R = 9900Ω",
      "Ammeter reading affected if R(ammeter) is comparable to R(circuit)",
      "Voltmeter reading affected if R(voltmeter) is comparable to R(circuit)"
    ],
    formulas: [
      "Rs = Ig × G/(I - Ig) (shunt resistance)",
      "R = (V/Ig) - G (series resistance for voltmeter)",
      "n = I/Ig (ammeter multiplication)",
      "n = V/Vg (voltmeter multiplication)",
      "I(total) = Ig + Is (current division in shunt)"
    ]
  }
];

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  solution: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const practiceQuestions: Question[] = [
  {
    id: 1,
    question: "A current of 2A flows through a wire of cross-section 0.5 mm². If the free electron density is 8×10²⁸ m⁻³, what is the drift velocity?",
    options: ["1.56 × 10⁻⁴ m/s", "3.12 × 10⁻⁴ m/s", "6.24 × 10⁻⁴ m/s", "1.25 × 10⁻³ m/s"],
    correctAnswer: 0,
    solution: "I = nAevd. vd = I/(nAe) = 2/(8×10²⁸ × 0.5×10⁻⁶ × 1.6×10⁻¹⁹) = 1.56×10⁻⁴ m/s",
    difficulty: "Medium"
  },
  {
    id: 2,
    question: "A wire of resistance 10Ω is stretched to double its length. What is the new resistance?",
    options: ["20Ω", "40Ω", "5Ω", "2.5Ω"],
    correctAnswer: 1,
    solution: "Volume constant: A₁L₁ = A₂L₂. If L₂ = 2L₁, then A₂ = A₁/2. R = ρL/A, so R₂ = ρ(2L₁)/(A₁/2) = 4(ρL₁/A₁) = 4R₁ = 40Ω",
    difficulty: "Medium"
  },
  {
    id: 3,
    question: "Three resistors 2Ω, 3Ω, and 6Ω are connected in parallel. What is the equivalent resistance?",
    options: ["1Ω", "1.5Ω", "2Ω", "11Ω"],
    correctAnswer: 0,
    solution: "1/Rp = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1. So Rp = 1Ω",
    difficulty: "Easy"
  },
  {
    id: 4,
    question: "A battery of EMF 12V and internal resistance 2Ω is connected to a 4Ω resistor. What is the terminal voltage?",
    options: ["8V", "9V", "10V", "11V"],
    correctAnswer: 0,
    solution: "I = ε/(R+r) = 12/(4+2) = 2A. V = ε - Ir = 12 - 2×2 = 8V",
    difficulty: "Easy"
  },
  {
    id: 5,
    question: "Two cells each of EMF 2V and internal resistance 1Ω are connected in series to a 4Ω external resistor. What current flows?",
    options: ["0.5A", "0.67A", "1A", "2A"],
    correctAnswer: 1,
    solution: "Total EMF = 2×2 = 4V, total r = 2×1 = 2Ω. I = 4/(4+2) = 4/6 = 0.67A",
    difficulty: "Easy"
  },
  {
    id: 6,
    question: "A 100W, 220V bulb is connected to 110V supply. What power does it consume?",
    options: ["25W", "50W", "75W", "100W"],
    correctAnswer: 0,
    solution: "P₂/P₁ = (V₂/V₁)². P₂ = 100 × (110/220)² = 100 × (1/2)² = 100/4 = 25W",
    difficulty: "Medium"
  },
  {
    id: 7,
    question: "In a Wheatstone bridge, if R₁ = 2Ω, R₂ = 3Ω, R₃ = 4Ω, what should R₄ be for balance?",
    options: ["5Ω", "6Ω", "8Ω", "12Ω"],
    correctAnswer: 1,
    solution: "For balance: R₁/R₂ = R₃/R₄. 2/3 = 4/R₄. R₄ = 4×3/2 = 6Ω",
    difficulty: "Easy"
  },
  {
    id: 8,
    question: "A wire has resistance 20Ω at 20°C. If temperature coefficient is 0.004/°C, what is resistance at 70°C?",
    options: ["22Ω", "24Ω", "26Ω", "28Ω"],
    correctAnswer: 1,
    solution: "R = R₀(1 + αΔT) = 20(1 + 0.004×50) = 20(1.2) = 24Ω",
    difficulty: "Medium"
  },
  {
    id: 9,
    question: "How much heat is produced in a 5Ω resistor carrying 2A current for 10 seconds?",
    options: ["100J", "200J", "400J", "500J"],
    correctAnswer: 1,
    solution: "H = I²Rt = (2)² × 5 × 10 = 4 × 50 = 200J",
    difficulty: "Easy"
  },
  {
    id: 10,
    question: "A galvanometer of resistance 50Ω gives full scale deflection at 1mA. What shunt is needed to convert it to 1A ammeter?",
    options: ["0.05Ω", "0.1Ω", "0.5Ω", "1Ω"],
    correctAnswer: 0,
    solution: "S = Ig×G/(I-Ig) = 0.001×50/(1-0.001) = 0.05/0.999 ≈ 0.05Ω",
    difficulty: "Hard"
  },
  {
    id: 11,
    question: "Two resistors 40Ω and 60Ω are in series with a battery. If current is 1A, what is the voltage across 40Ω?",
    options: ["20V", "30V", "40V", "60V"],
    correctAnswer: 2,
    solution: "In series, same current flows. V₁ = IR₁ = 1×40 = 40V",
    difficulty: "Easy"
  },
  {
    id: 12,
    question: "A resistor color code is Brown-Black-Red-Gold. What is its value and tolerance?",
    options: ["100Ω ± 5%", "1kΩ ± 5%", "10kΩ ± 5%", "100kΩ ± 5%"],
    correctAnswer: 1,
    solution: "Brown=1, Black=0, Red=10². Value = 10 × 10² = 1000Ω = 1kΩ. Gold = ±5%",
    difficulty: "Easy"
  },
  {
    id: 13,
    question: "When cells of equal EMF are connected in parallel, the equivalent internal resistance is:",
    options: ["Sum of all r", "Product/Sum formula", "r/n where n is number of cells", "Same as individual r"],
    correctAnswer: 2,
    solution: "Parallel combination of equal resistances: r(eq) = r/n",
    difficulty: "Easy"
  },
  {
    id: 14,
    question: "Maximum power is transferred from battery to external resistance when:",
    options: ["R >> r", "R << r", "R = r", "R = 2r"],
    correctAnswer: 2,
    solution: "For maximum power transfer theorem: External resistance should equal internal resistance",
    difficulty: "Medium"
  },
  {
    id: 15,
    question: "A 1500W heater operates for 2 hours daily for 30 days. How many units of electricity consumed?",
    options: ["60 units", "75 units", "90 units", "120 units"],
    correctAnswer: 2,
    solution: "Energy = Power × Time = 1500W × 2h × 30 = 90000 Wh = 90 kWh = 90 units",
    difficulty: "Medium"
  }
];

export function PhysicsChapter16() {
  // Fetch questions from database for Electrostatic Potential and Capacitance (topicId: 26)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '26'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=26');
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
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 16: Current Electricity</h1>
          <p className="text-muted-foreground">Class XII Physics - NEET Syllabus</p>
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
            3D Models
          </TabsTrigger>
          <TabsTrigger value="practice">
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
                  <li>Electric current and drift velocity of charge carriers</li>
                  <li>Ohm's Law and electrical resistance</li>
                  <li>Series and parallel combinations of resistors</li>
                  <li>Kirchhoff's laws for circuit analysis</li>
                  <li>EMF, internal resistance, and cell combinations</li>
                  <li>Heating effect of current (Joule's Law)</li>
                  <li>Electrical power and energy consumption</li>
                  <li>Measuring instruments: ammeter and voltmeter</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-yellow-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-yellow-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Formulas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm font-mono">
                    <p>• V = IR (Ohm's Law)</p>
                    <p>• R = ρL/A</p>
                    <p>• Rs = R₁ + R₂ + ... (series)</p>
                    <p>• 1/Rp = 1/R₁ + 1/R₂ + ... (parallel)</p>
                    <p>• V = ε - Ir</p>
                    <p>• H = I²Rt, P = VI = I²R</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">Practice Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Confusing series and parallel formulas</p>
                    <p>• Forgetting internal resistance in EMF problems</p>
                    <p>• Wrong sign conventions in Kirchhoff's laws</p>
                    <p>• Mixing up power formulas P=VI, I²R, V²/R</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter16Topics.map((topic, index) => (
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
                              <span className="text-yellow-500 mt-1">•</span>
                              <span className="text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Calculator className="h-4 w-4" />
                          Important Formulas
                        </h4>
                        <div className="space-y-2">
                          {topic.formulas.map((formula, i) => (
                            <p key={i} className="font-mono text-sm bg-background p-2 rounded">
                              {formula}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Examples</h4>
                        <div className="space-y-2">
                          {topic.examples.map((example, i) => (
                            <div key={i} className="bg-blue-500/10 p-3 rounded-lg">
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
          <VisualizationTab
            chapterId="physics-16"
            visualizations={['wheatstone-circuit', 'metre-bridge']}
            layout="grid"
            title="Interactive Current Electricity Visualizations"
            description="Explore electric circuits, Ohm's law, and resistance through interactive simulations"
          />
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
              <CardTitle>Practice Questions</CardTitle>
              <p className="text-sm text-muted-foreground">
                Test your understanding with {practiceQuestions.length} NEET-level questions
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {showSolutions && (
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-semibold text-lg">
                    Your Score: {score}/{practiceQuestions.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Percentage: {((score / practiceQuestions.length) * 100).toFixed(1)}%
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {practiceQuestions.map((q) => (
                  <Card key={q.id} className="border-l-4 border-l-yellow-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-2">
                            Question {q.id}
                          </Badge>
                          <Badge
                            variant={q.difficulty === "Easy" ? "secondary" : q.difficulty === "Medium" ? "default" : "destructive"}
                            className="ml-2 mb-2"
                          >
                            {q.difficultyLevel === 1 ? 'Easy' : q.difficultyLevel === 2 ? 'Medium' : 'Hard'}
                          </Badge>
                          <p className="text-sm mt-2">{q.questionText}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        {q.options.map((option, index) => {
                          const isSelected = userAnswers[q.id] === index;
                          const isCorrect = index === q.correctAnswer;
                          const showResult = showSolutions && isSelected;

                          return (
                            <button
                              key={index}
                              onClick={() => !showSolutions && handleAnswerSelect(q.id, index)}
                              disabled={showSolutions}
                              className={`w-full text-left p-3 rounded-lg border transition-all ${showResult
                                ? isCorrect
                                  ? "border-green-500 bg-green-500/10"
                                  : "border-red-500 bg-red-500/10"
                                : isSelected
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-primary/50"
                                } ${showSolutions ? "cursor-not-allowed" : "cursor-pointer"}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm">{typeof option === "string" ? option : option.text}</span>
                                {showResult && (
                                  isCorrect ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <XCircle className="h-5 w-5 text-red-500" />
                                  )
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {showSolutions && (
                        <div className="bg-muted p-4 rounded-lg mt-4">
                          <p className="font-semibold text-sm mb-2">Solution:</p>
                          <p className="text-sm text-muted-foreground">{q.solutionDetail}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-4">
                {!showSolutions ? (
                  <Button onClick={checkAnswers} className="flex-1">
                    Check Answers
                  </Button>
                ) : (
                  <Button onClick={resetQuiz} variant="outline" className="flex-1">
                    Reset Quiz
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
