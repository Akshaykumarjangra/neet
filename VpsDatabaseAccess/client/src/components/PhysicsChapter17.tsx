
import { useState } from "react";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VisualizationTab } from "@/components/VisualizationTab";
import { BookOpen, Lightbulb, Calculator, Magnet, CheckCircle2, XCircle , Loader2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas: string[];
}

const chapter17Topics: Topic[] = [
  {
    id: "biot-savart-law",
    title: "Biot-Savart Law",
    description: "Fundamental law describing magnetic field produced by current-carrying conductors.",
    keyPoints: [
      "Biot-Savart Law: dB = (μ₀/4π) × (I dl × r̂)/r²",
      "μ₀ = 4π × 10⁻⁷ T·m/A (permeability of free space)",
      "Magnetic field at distance r from long straight wire: B = μ₀I/(2πr)",
      "Direction: Right-hand thumb rule (thumb = current, fingers = field)",
      "Magnetic field is perpendicular to both current and position vector",
      "Field decreases as 1/r for infinite wire, 1/r² for current element",
      "Superposition principle applies: total field = vector sum of individual fields"
    ],
    examples: [
      "At 5cm from wire carrying 10A: B = (4π×10⁻⁷ × 10)/(2π × 0.05) = 4×10⁻⁵ T",
      "Magnetic field at center of circular loop: B = μ₀I/(2R)",
      "Direction determined by right-hand rule curling fingers with current",
      "Earth's magnetic field ≈ 10⁻⁵ T for comparison"
    ],
    formulas: [
      "dB = (μ₀/4π) × (I dl × r̂)/r² (Biot-Savart)",
      "B = μ₀I/(2πr) (straight wire)",
      "B = μ₀I/(2R) (center of circular loop)",
      "B = μ₀nI (solenoid center, n = turns/length)",
      "μ₀ = 4π × 10⁻⁷ T·m/A"
    ]
  },
  {
    id: "amperes-law",
    title: "Ampere's Circuital Law",
    description: "Relating magnetic field around closed loop to enclosed current.",
    keyPoints: [
      "Ampere's Law: ∮B·dl = μ₀I(enclosed)",
      "Line integral of B around closed path equals μ₀ times enclosed current",
      "Useful for symmetric current distributions (straight wire, solenoid, toroid)",
      "Choose Amperian loop following field symmetry",
      "For solenoid: B = μ₀nI inside, B ≈ 0 outside",
      "For toroid: B = μ₀NI/(2πr) where N = total turns",
      "Modified by Maxwell: includes displacement current"
    ],
    examples: [
      "Solenoid (500 turns/m, 2A): B = 4π×10⁻⁷ × 500 × 2 = 1.26×10⁻³ T",
      "Toroid (1000 turns, 5A, r=10cm): B = (4π×10⁻⁷ × 1000 × 5)/(2π × 0.1) = 10⁻² T",
      "Verifies B = μ₀I/(2πr) for straight wire using circular Amperian loop",
      "Inside thick wire at radius r: B = μ₀Ir/(2πR²) where R = wire radius"
    ],
    formulas: [
      "∮B·dl = μ₀I(enc) (Ampere's law)",
      "B = μ₀nI (infinite solenoid)",
      "B = μ₀NI/(2πr) (toroid)",
      "B = 0 (outside ideal solenoid)",
      "B·2πr = μ₀I → B = μ₀I/(2πr) (straight wire)"
    ]
  },
  {
    id: "force-on-current",
    title: "Force on Current-Carrying Conductor",
    description: "Magnetic force experienced by current in magnetic field.",
    keyPoints: [
      "Force on conductor: F = BIL sin θ (θ = angle between B and I)",
      "Direction: Fleming's left-hand rule (First finger=Field, seCond=Current, thuMb=Motion)",
      "Maximum force when B ⊥ I (θ = 90°), zero when B ∥ I (θ = 0°)",
      "Force per unit length: F/L = BI (for perpendicular field)",
      "Vector form: F = I(L × B) where L is length vector in current direction",
      "Force on moving charge: F = qvB sin θ",
      "Work done by magnetic force on current loop = 0 (force ⊥ displacement)"
    ],
    examples: [
      "Wire (2m, 5A) in 0.5T field perpendicular: F = 0.5 × 5 × 2 = 5N",
      "Charge (1.6×10⁻¹⁹ C) at 10⁶ m/s in 0.5T: F = 1.6×10⁻¹⁹ × 10⁶ × 0.5 = 8×10⁻¹⁴ N",
      "Current loop experiences torque but net force = 0 in uniform field",
      "Loudspeaker coil: force moves diaphragm proportional to current"
    ],
    formulas: [
      "F = BIL sin θ (force on conductor)",
      "F = I(L × B) (vector form)",
      "F = qvB sin θ (force on charge)",
      "F = q(v × B) (Lorentz force)",
      "τ = NBIA sin θ (torque on coil)"
    ]
  },
  {
    id: "force-between-wires",
    title: "Force Between Parallel Conductors",
    description: "Magnetic interaction between current-carrying parallel wires.",
    keyPoints: [
      "Force per unit length: F/L = μ₀I₁I₂/(2πd)",
      "Parallel currents attract, antiparallel currents repel",
      "Definition of Ampere: Force of 2×10⁻⁷ N/m between 1m apart wires each carrying 1A",
      "Force is attractive for currents in same direction",
      "Each wire creates field that acts on the other",
      "Force is independent of wire thickness (depends on current and separation)",
      "Used in precise measurement of current (current balance)"
    ],
    examples: [
      "Two wires 5cm apart, 10A each: F/L = (4π×10⁻⁷ × 10 × 10)/(2π × 0.05) = 4×10⁻⁴ N/m",
      "Same direction currents: attractive force",
      "Opposite direction: repulsive force of same magnitude",
      "Power lines with high current experience significant forces"
    ],
    formulas: [
      "F/L = μ₀I₁I₂/(2πd) (force per length)",
      "B₁ = μ₀I₁/(2πd) (field from wire 1)",
      "F₂ = B₁I₂L (force on wire 2)",
      "Attractive: same direction currents",
      "Repulsive: opposite direction currents"
    ]
  },
  {
    id: "torque-on-coil",
    title: "Torque on Current Loop and Magnetic Moment",
    description: "Rotational effect of magnetic field on current-carrying loops.",
    keyPoints: [
      "Torque on rectangular coil: τ = NBIA sin θ",
      "N = number of turns, B = field, I = current, A = area",
      "θ = angle between normal to coil and magnetic field",
      "Magnetic moment: m = NIA (vector perpendicular to coil)",
      "Vector form: τ = m × B",
      "Maximum torque when coil plane ∥ B (θ = 90°)",
      "Zero torque when coil plane ⊥ B (θ = 0°, equilibrium)",
      "Principle of moving coil galvanometer, motor, and generator"
    ],
    examples: [
      "Coil (100 turns, 0.01m², 2A) in 0.5T at 30°: τ = 100 × 0.5 × 2 × 0.01 × sin30° = 0.5 N·m",
      "Magnetic moment: m = 100 × 2 × 0.01 = 2 A·m²",
      "Motor principle: coil rotates to align moment with field",
      "Galvanometer: deflection proportional to current through coil"
    ],
    formulas: [
      "τ = NBIA sin θ (torque)",
      "m = NIA (magnetic moment)",
      "τ = m × B (vector form)",
      "U = -m·B = -mB cos θ (potential energy)",
      "τ(max) = NBIA (when θ = 90°)"
    ]
  },
  {
    id: "moving-charges",
    title: "Motion of Charged Particles in Magnetic Field",
    description: "Circular and helical motion of charges in uniform magnetic fields.",
    keyPoints: [
      "Circular motion: qvB = mv²/r → r = mv/(qB)",
      "Radius proportional to momentum, inversely proportional to charge and field",
      "Period: T = 2πm/(qB), independent of velocity!",
      "Frequency: f = qB/(2πm) (cyclotron frequency)",
      "Angular velocity: ω = qB/m",
      "Helical motion: if velocity has component along B",
      "Pitch of helix: p = v∥T = 2πmv∥/(qB)",
      "Used in cyclotron, mass spectrometer, velocity selector"
    ],
    examples: [
      "Electron (v=10⁶ m/s) in 0.01T: r = (9.1×10⁻³¹ × 10⁶)/(1.6×10⁻¹⁹ × 0.01) = 5.7mm",
      "Proton in same field: r = (1.67×10⁻²⁷ × 10⁶)/(1.6×10⁻¹⁹ × 0.01) = 10.4cm",
      "Cyclotron frequency for proton in 1T: f = (1.6×10⁻¹⁹ × 1)/(2π × 1.67×10⁻²⁷) = 15.2 MHz",
      "Aurora: charged particles spiral along Earth's magnetic field lines"
    ],
    formulas: [
      "r = mv/(qB) (radius of circular path)",
      "T = 2πm/(qB) (period)",
      "f = qB/(2πm) (frequency)",
      "ω = qB/m (angular velocity)",
      "p = v∥T (pitch of helix)",
      "KE unchanged (magnetic force ⊥ velocity)"
    ]
  },
  {
    id: "cyclotron",
    title: "Cyclotron",
    description: "Particle accelerator using magnetic field and alternating electric field.",
    keyPoints: [
      "Uses perpendicular B field and alternating E field between 'dees'",
      "Frequency of alternating voltage = cyclotron frequency = qB/(2πm)",
      "Particle gains energy each time it crosses the gap between dees",
      "Radius increases with velocity: r = mv/(qB)",
      "Maximum energy: KE(max) = q²B²R²/(2m) where R = dee radius",
      "Frequency independent of velocity → synchronization maintained",
      "Limitation: relativistic effects at high energies",
      "Used to accelerate protons, deuterons, alpha particles"
    ],
    examples: [
      "Proton cyclotron (B=1T): f = (1.6×10⁻¹⁹ × 1)/(2π × 1.67×10⁻²⁷) = 15.2 MHz",
      "Dee radius 0.5m, B=1T: Max KE = (1.6×10⁻¹⁹)² × 1² × 0.5²/(2 × 1.67×10⁻²⁷) = 3.8 MeV",
      "Number of revolutions to reach max energy ≈ 100-1000",
      "Medical applications: producing radioactive isotopes"
    ],
    formulas: [
      "f = qB/(2πm) (cyclotron frequency)",
      "r = mv/(qB) (orbital radius)",
      "KE(max) = q²B²R²/(2m)",
      "v(max) = qBR/m",
      "T = 2πm/(qB) (time per revolution)"
    ]
  },
  {
    id: "velocity-selector",
    title: "Velocity Selector and Mass Spectrometer",
    description: "Using crossed E and B fields to select particle velocity and measure mass.",
    keyPoints: [
      "Velocity selector: E and B perpendicular, particle moves straight when qE = qvB",
      "Selected velocity: v = E/B (independent of charge and mass)",
      "Mass spectrometer: velocity selector + circular path in B field",
      "Radius of path: r = mv/(qB) → m/q = Br/v = B²r/E",
      "Separates isotopes based on different r for same v",
      "Applications: isotope analysis, determining atomic masses",
      "Combination gives both velocity and mass-to-charge ratio",
      "Ions of different mass-to-charge ratios hit detector at different positions"
    ],
    examples: [
      "E = 1000 V/m, B = 0.01T: v(selected) = 1000/0.01 = 10⁵ m/s",
      "If selected particles then enter B = 0.5T field:",
      "Proton (m/q = 1.67×10⁻²⁷/1.6×10⁻¹⁹): r = (1.67×10⁻²⁷ × 10⁵)/(1.6×10⁻¹⁹ × 0.5) = 2.1mm",
      "C-12 vs C-13 isotopes separated by different radii"
    ],
    formulas: [
      "v = E/B (selected velocity)",
      "qE = qvB (balance condition)",
      "r = mv/(qB) (in magnetic field)",
      "m/q = Br/v = B²r/E",
      "Δr/r = Δm/m (separation of isotopes)"
    ]
  },
  {
    id: "galvanometer",
    title: "Moving Coil Galvanometer",
    description: "Instrument to detect and measure small currents based on magnetic torque.",
    keyPoints: [
      "Coil suspended in radial magnetic field between pole pieces",
      "Restoring torque from spring: τ(spring) = kθ",
      "Deflecting torque: τ(magnetic) = NBIA",
      "At equilibrium: NBIA = kθ → θ = (NBA/k)I",
      "Current sensitivity: θ/I = NBA/k (deflection per unit current)",
      "Voltage sensitivity: θ/V = NBA/(kR) where R = coil resistance",
      "Figure of merit: Current for unit deflection = k/(NBA)",
      "To increase sensitivity: more turns N, larger area A, stronger field B, weaker spring k"
    ],
    examples: [
      "Galvanometer (N=100, B=0.1T, A=10⁻³m², k=10⁻⁶ N·m/rad): Current sensitivity = 10⁴ rad/A",
      "For 1mA: deflection = 10⁴ × 10⁻³ = 10 rad ≈ 573°",
      "More practical: deflection of 100 divisions for full scale",
      "Ammeter conversion: low shunt resistance in parallel",
      "Voltmeter conversion: high series resistance"
    ],
    formulas: [
      "θ = (NBA/k)I (deflection)",
      "Current sensitivity = NBA/k",
      "Voltage sensitivity = NBA/(kR)",
      "Figure of merit = k/(NBA)",
      "τ = NBIA (magnetic torque)",
      "τ = kθ (spring torque)"
    ]
  },
  {
    id: "ammeter-voltmeter",
    title: "Conversion to Ammeter and Voltmeter",
    description: "Converting galvanometer to measure larger currents and voltages.",
    keyPoints: [
      "Ammeter: Shunt resistance S in parallel with galvanometer",
      "S = Ig × G/(I - Ig) where G = galvanometer resistance",
      "Shunt carries most current, galvanometer gets Ig (full scale deflection)",
      "Low resistance ammeter: doesn't affect circuit current",
      "Voltmeter: High resistance R in series with galvanometer",
      "R = (V/Ig) - G",
      "Series resistance limits current through galvanometer",
      "High resistance voltmeter: doesn't draw significant current",
      "Multiplication factor: n = I/Ig (ammeter) or n = V/Vg (voltmeter)"
    ],
    examples: [
      "Galvanometer (G=100Ω, Ig=1mA) to 1A ammeter: S = 0.001×100/(1-0.001) = 0.1Ω",
      "Same to 10V voltmeter: R = (10/0.001) - 100 = 9900Ω",
      "Ammeter in series: measures current through component",
      "Voltmeter in parallel: measures potential difference across component",
      "Ideal ammeter: R = 0, Ideal voltmeter: R = ∞"
    ],
    formulas: [
      "S = Ig × G/(I - Ig) (shunt for ammeter)",
      "R = (V/Ig) - G (series R for voltmeter)",
      "n = I/Ig (ammeter range)",
      "n = V/Vg (voltmeter range)",
      "I(total) = Ig + Is (current division)"
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
    question: "A long straight wire carries current of 10A. What is the magnetic field at a distance of 2cm from the wire?",
    options: ["10⁻⁴ T", "10⁻⁵ T", "2×10⁻⁴ T", "4×10⁻⁵ T"],
    correctAnswer: 0,
    solution: "B = μ₀I/(2πr) = (4π×10⁻⁷ × 10)/(2π × 0.02) = (4×10⁻⁶)/(0.04) = 10⁻⁴ T",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "Two parallel wires 10cm apart carry 5A each in the same direction. What is the force per unit length between them?",
    options: ["5×10⁻⁶ N/m attractive", "5×10⁻⁶ N/m repulsive", "10⁻⁵ N/m attractive", "10⁻⁵ N/m repulsive"],
    correctAnswer: 2,
    solution: "F/L = μ₀I₁I₂/(2πd) = (4π×10⁻⁷ × 5 × 5)/(2π × 0.1) = 10⁻⁵ N/m. Same direction → attractive",
    difficulty: "Medium"
  },
  {
    id: 3,
    question: "A circular coil of 100 turns, radius 10cm carrying 2A is placed in a magnetic field of 0.5T. Maximum torque is:",
    options: ["π N·m", "2π N·m", "0.5π N·m", "0.1π N·m"],
    correctAnswer: 0,
    solution: "τ(max) = NBIA = 100 × 0.5 × 2 × π(0.1)² = 100 × 0.5 × 2 × 0.0314 = π N·m",
    difficulty: "Medium"
  },
  {
    id: 4,
    question: "An electron (mass 9.1×10⁻³¹ kg) moving at 10⁶ m/s enters perpendicular to a magnetic field of 0.01T. The radius of circular path is:",
    options: ["0.57 mm", "5.7 mm", "57 mm", "0.057 mm"],
    correctAnswer: 0,
    solution: "r = mv/(qB) = (9.1×10⁻³¹ × 10⁶)/(1.6×10⁻¹⁹ × 0.01) = 5.7×10⁻⁴ m = 0.57 mm",
    difficulty: "Medium"
  },
  {
    id: 5,
    question: "A solenoid has 500 turns per meter and carries 2A current. The magnetic field inside is:",
    options: ["2π×10⁻⁴ T", "4π×10⁻⁴ T", "10⁻³ T", "2×10⁻³ T"],
    correctAnswer: 1,
    solution: "B = μ₀nI = 4π×10⁻⁷ × 500 × 2 = 4π×10⁻⁴ T",
    difficulty: "Easy"
  },
  {
    id: 6,
    question: "A wire of length 2m carrying 5A is placed perpendicular to a magnetic field of 0.3T. The force on it is:",
    options: ["1.5 N", "3 N", "6 N", "0.75 N"],
    correctAnswer: 1,
    solution: "F = BIL sin θ = 0.3 × 5 × 2 × sin 90° = 3 N",
    difficulty: "Easy"
  },
  {
    id: 7,
    question: "In a cyclotron, if the magnetic field is 1T and the particle is a proton (m=1.67×10⁻²⁷ kg), the frequency is approximately:",
    options: ["15 MHz", "30 MHz", "7.5 MHz", "60 MHz"],
    correctAnswer: 0,
    solution: "f = qB/(2πm) = (1.6×10⁻¹⁹ × 1)/(2π × 1.67×10⁻²⁷) ≈ 15.2 MHz",
    difficulty: "Medium"
  },
  {
    id: 8,
    question: "A velocity selector has E = 10⁴ V/m and B = 0.5T. What velocity of particles will pass undeflected?",
    options: ["5×10³ m/s", "2×10⁴ m/s", "5×10⁴ m/s", "10⁵ m/s"],
    correctAnswer: 1,
    solution: "v = E/B = 10⁴/0.5 = 2×10⁴ m/s",
    difficulty: "Easy"
  },
  {
    id: 9,
    question: "A galvanometer of resistance 100Ω gives full scale deflection at 10mA. To convert it to 1A ammeter, shunt resistance needed is:",
    options: ["0.1Ω", "1Ω", "10Ω", "0.01Ω"],
    correctAnswer: 1,
    solution: "S = Ig×G/(I-Ig) = (0.01 × 100)/(1-0.01) = 1/0.99 ≈ 1Ω",
    difficulty: "Medium"
  },
  {
    id: 10,
    question: "The magnetic field at the center of a circular loop of radius R carrying current I is B. If radius is doubled and current is halved, new field is:",
    options: ["B/4", "B/2", "B", "2B"],
    correctAnswer: 0,
    solution: "B = μ₀I/(2R). New: B' = μ₀(I/2)/(2×2R) = μ₀I/(8R) = B/4",
    difficulty: "Medium"
  },
  {
    id: 11,
    question: "A charged particle moves in a circle in a magnetic field. If the magnetic field is doubled, the radius becomes:",
    options: ["Double", "Half", "Four times", "One-fourth"],
    correctAnswer: 1,
    solution: "r = mv/(qB). If B → 2B, then r → r/2",
    difficulty: "Easy"
  },
  {
    id: 12,
    question: "The force between two parallel conductors is F. If current in both is doubled and distance is halved, the new force is:",
    options: ["2F", "4F", "8F", "16F"],
    correctAnswer: 2,
    solution: "F/L = μ₀I₁I₂/(2πd). New: F' = μ₀(2I₁)(2I₂)/(2π×d/2) = 8 × μ₀I₁I₂/(2πd) = 8F",
    difficulty: "Hard"
  },
  {
    id: 13,
    question: "A galvanometer with resistance 50Ω and full scale deflection current 5mA is to be converted to a voltmeter of range 0-10V. Series resistance required is:",
    options: ["1950Ω", "2000Ω", "1900Ω", "1850Ω"],
    correctAnswer: 0,
    solution: "R = (V/Ig) - G = (10/0.005) - 50 = 2000 - 50 = 1950Ω",
    difficulty: "Medium"
  },
  {
    id: 14,
    question: "The time period of revolution of a charged particle in a magnetic field is independent of:",
    options: ["Velocity", "Magnetic field", "Charge", "Mass"],
    correctAnswer: 0,
    solution: "T = 2πm/(qB). Independent of velocity and radius",
    difficulty: "Medium"
  },
  {
    id: 15,
    question: "A rectangular coil of sides 10cm × 5cm with 50 turns carrying 2A is placed in a field of 0.2T. If angle between normal and field is 30°, torque is:",
    options: ["0.05 N·m", "0.1 N·m", "0.15 N·m", "0.2 N·m"],
    correctAnswer: 1,
    solution: "τ = NBIA sin θ = 50 × 0.2 × 2 × (0.1×0.05) × sin 30° = 50 × 0.2 × 2 × 0.005 × 0.5 = 0.1 N·m",
    difficulty: "Hard"
  }
];

export function PhysicsChapter17() {
  // Fetch questions from database for Current Electricity (topicId: 27)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '27'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=27');
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
        <Magnet className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-4xl font-bold">Chapter 17: Magnetic Effects of Current</h1>
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
                  <li>Biot-Savart law and magnetic field due to current</li>
                  <li>Ampere's circuital law and applications</li>
                  <li>Force on current-carrying conductors in magnetic field</li>
                  <li>Force between parallel current-carrying wires</li>
                  <li>Torque on current loops and magnetic moment</li>
                  <li>Motion of charged particles in magnetic fields</li>
                  <li>Cyclotron and velocity selector</li>
                  <li>Moving coil galvanometer, ammeter, and voltmeter</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-blue-500">NEET Important</Badge>
                    <CardTitle className="text-lg">Key Formulas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm font-mono">
                    <p>• B = μ₀I/(2πr) (straight wire)</p>
                    <p>• ∮B·dl = μ₀I (Ampere's law)</p>
                    <p>• F = BIL sin θ (force on wire)</p>
                    <p>• τ = NBIA sin θ (torque on coil)</p>
                    <p>• r = mv/(qB) (circular motion)</p>
                    <p>• f = qB/(2πm) (cyclotron frequency)</p>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">Practice Tips</Badge>
                    <CardTitle className="text-lg">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Confusing right-hand rules for field and force</p>
                    <p>• Forgetting sin θ in force and torque formulas</p>
                    <p>• Wrong direction in Fleming's left-hand rule</p>
                    <p>• Mixing up ammeter (series) and voltmeter (parallel)</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-4">
            {chapter17Topics.map((topic, index) => (
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
                              <span className="text-blue-500 mt-1">•</span>
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
            chapterId="physics-17"
            visualizations={['magnetic-field-lines', 'helical-motion', 'torque-wrench']}
            layout="grid"
            title="Interactive Magnetic Effects Visualizations"
            description="Explore magnetic fields, forces on current-carrying conductors, and torque through interactive 3D simulations"
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
                  <Card key={q.id} className="border-l-4 border-l-blue-500">
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
