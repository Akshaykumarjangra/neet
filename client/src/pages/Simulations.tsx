import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Atom,
  FlaskConical,
  Leaf,
  Play,
  ExternalLink,
  Zap,
  Lightbulb,
  TestTubes,
  Orbit,
  Waves,
  ArrowLeft,
} from "lucide-react";
import { PhETSimulation } from "@/components/PhETSimulation";
import ProjectileMotion from "@/components/simulations/ProjectileMotion";
import CircuitBuilder from "@/components/simulations/CircuitBuilder";
import MoleculeViewer from "@/components/simulations/MoleculeViewer";

interface SimulationItem {
  id: string;
  title: string;
  description: string;
  subject: "Physics" | "Chemistry" | "Biology";
  type: "phet" | "custom";
  phetId?: string;
  component?: string;
  topics: string[];
  chapter?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  icon: React.ReactNode;
}

const simulations: SimulationItem[] = [
  {
    id: "projectile-motion",
    title: "Projectile Motion",
    description: "Simulate projectile motion with adjustable velocity, angle, and gravity. Visualize trajectory, max height, and range in real-time.",
    subject: "Physics",
    type: "custom",
    component: "ProjectileMotion",
    topics: ["Kinematics", "Motion in 2D", "Vectors"],
    chapter: "Motion in a Plane",
    difficulty: "Beginner",
    icon: <Orbit className="h-6 w-6" />,
  },
  {
    id: "circuit-builder",
    title: "Simple Circuit Simulator",
    description: "Build and analyze simple circuits with battery, resistor, and bulb. Observe current flow and verify Ohm's Law.",
    subject: "Physics",
    type: "custom",
    component: "CircuitBuilder",
    topics: ["Current Electricity", "Ohm's Law", "Circuits"],
    chapter: "Current Electricity",
    difficulty: "Beginner",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    id: "molecule-viewer",
    title: "3D Molecule Viewer",
    description: "Explore molecular structures in 3D. View H₂O, CO₂, CH₄, NH₃, and glucose with bond angles and lengths.",
    subject: "Chemistry",
    type: "custom",
    component: "MoleculeViewer",
    topics: ["Molecular Structure", "Chemical Bonding", "VSEPR Theory"],
    chapter: "Chemical Bonding",
    difficulty: "Intermediate",
    icon: <Atom className="h-6 w-6" />,
  },
  {
    id: "build-a-molecule",
    title: "Build a Molecule",
    description: "Construct molecules from atoms. Learn about chemical formulas and molecular structure by building real molecules.",
    subject: "Chemistry",
    type: "phet",
    phetId: "build-a-molecule",
    topics: ["Stoichiometry", "Molecular Formula", "Chemical Bonds"],
    chapter: "Some Basic Concepts of Chemistry",
    difficulty: "Beginner",
    icon: <TestTubes className="h-6 w-6" />,
  },
  {
    id: "balancing-chemical-equations",
    title: "Balancing Chemical Equations",
    description: "Practice balancing chemical equations interactively. Understand the law of conservation of mass.",
    subject: "Chemistry",
    type: "phet",
    phetId: "balancing-chemical-equations",
    topics: ["Stoichiometry", "Chemical Reactions", "Conservation of Mass"],
    chapter: "Some Basic Concepts of Chemistry",
    difficulty: "Beginner",
    icon: <FlaskConical className="h-6 w-6" />,
  },
  {
    id: "states-of-matter",
    title: "States of Matter",
    description: "Explore how heating and cooling affects molecular motion. Observe phase changes between solid, liquid, and gas.",
    subject: "Chemistry",
    type: "phet",
    phetId: "states-of-matter-basics",
    topics: ["States of Matter", "Kinetic Theory", "Phase Transitions"],
    chapter: "States of Matter",
    difficulty: "Beginner",
    icon: <Waves className="h-6 w-6" />,
  },
  {
    id: "ph-scale",
    title: "pH Scale",
    description: "Measure the pH of common substances and understand acids, bases, and neutral solutions.",
    subject: "Chemistry",
    type: "phet",
    phetId: "ph-scale",
    topics: ["Acids & Bases", "pH", "Ionic Equilibrium"],
    chapter: "Ionic Equilibrium",
    difficulty: "Intermediate",
    icon: <TestTubes className="h-6 w-6" />,
  },
  {
    id: "energy-skate-park",
    title: "Energy Skate Park",
    description: "Learn about conservation of energy with a skater on a track. Observe kinetic, potential, and thermal energy.",
    subject: "Physics",
    type: "phet",
    phetId: "energy-skate-park-basics",
    topics: ["Energy Conservation", "Kinetic Energy", "Potential Energy"],
    chapter: "Work, Energy and Power",
    difficulty: "Beginner",
    icon: <Lightbulb className="h-6 w-6" />,
  },
  {
    id: "wave-on-string",
    title: "Wave on a String",
    description: "Explore wave properties like amplitude, frequency, and wavelength. See how waves reflect at boundaries.",
    subject: "Physics",
    type: "phet",
    phetId: "wave-on-a-string",
    topics: ["Waves", "Oscillations", "Wave Properties"],
    chapter: "Waves",
    difficulty: "Intermediate",
    icon: <Waves className="h-6 w-6" />,
  },
  {
    id: "pendulum-lab",
    title: "Pendulum Lab",
    description: "Experiment with pendulum length, mass, and gravity. Discover what affects the period of oscillation.",
    subject: "Physics",
    type: "phet",
    phetId: "pendulum-lab",
    topics: ["Simple Harmonic Motion", "Oscillations", "Period"],
    chapter: "Oscillations",
    difficulty: "Intermediate",
    icon: <Orbit className="h-6 w-6" />,
  },
  {
    id: "coulombs-law",
    title: "Coulomb's Law",
    description: "Explore electrostatic force between charges. See how distance and charge magnitude affect the force.",
    subject: "Physics",
    type: "phet",
    phetId: "coulombs-law",
    topics: ["Electrostatics", "Electric Force", "Coulomb's Law"],
    chapter: "Electric Charges and Fields",
    difficulty: "Intermediate",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    id: "natural-selection",
    title: "Natural Selection",
    description: "Observe how natural selection changes bunny populations over time based on environmental factors.",
    subject: "Biology",
    type: "phet",
    phetId: "natural-selection",
    topics: ["Evolution", "Natural Selection", "Genetics"],
    chapter: "Evolution",
    difficulty: "Intermediate",
    icon: <Leaf className="h-6 w-6" />,
  },
];

const subjectColors: Record<string, { bg: string; text: string; border: string }> = {
  Physics: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/30" },
  Chemistry: { bg: "bg-purple-500/10", text: "text-purple-600", border: "border-purple-500/30" },
  Biology: { bg: "bg-green-500/10", text: "text-green-600", border: "border-green-500/30" },
};

const subjectIcons: Record<string, React.ReactNode> = {
  Physics: <Atom className="h-4 w-4" />,
  Chemistry: <FlaskConical className="h-4 w-4" />,
  Biology: <Leaf className="h-4 w-4" />,
};

export default function Simulations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState("all");
  const [selectedSimulation, setSelectedSimulation] = useState<SimulationItem | null>(null);

  const filteredSimulations = useMemo(() => {
    return simulations.filter((sim) => {
      const matchesSearch =
        searchQuery === "" ||
        sim.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sim.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sim.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSubject = activeSubject === "all" || sim.subject === activeSubject;
      return matchesSearch && matchesSubject;
    });
  }, [searchQuery, activeSubject]);

  const groupedSimulations = useMemo(() => {
    const custom = filteredSimulations.filter((s) => s.type === "custom");
    const phet = filteredSimulations.filter((s) => s.type === "phet");
    return { custom, phet };
  }, [filteredSimulations]);

  const renderSimulationComponent = () => {
    if (!selectedSimulation) return null;

    if (selectedSimulation.type === "custom") {
      switch (selectedSimulation.component) {
        case "ProjectileMotion":
          return <ProjectileMotion />;
        case "CircuitBuilder":
          return <CircuitBuilder />;
        case "MoleculeViewer":
          return <MoleculeViewer />;
        default:
          return null;
      }
    } else if (selectedSimulation.type === "phet" && selectedSimulation.phetId) {
      return (
        <PhETSimulation
          simulationId={selectedSimulation.phetId}
          title={selectedSimulation.title}
          description={selectedSimulation.description}
          subject={selectedSimulation.subject}
          height={550}
        />
      );
    }

    return null;
  };

  if (selectedSimulation) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-3 flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedSimulation(null)}
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Library
            </Button>
            <div className="flex-1">
              <h1 className="font-semibold">{selectedSimulation.title}</h1>
              <p className="text-sm text-muted-foreground">{selectedSimulation.subject}</p>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">
          {renderSimulationComponent()}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid="page-simulations">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" data-testid="button-back-dashboard">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Play className="h-6 w-6 text-primary" />
                  Interactive Simulations
                </h1>
                <p className="text-muted-foreground text-sm">
                  Explore physics, chemistry, and biology concepts through interactive simulations
                </p>
              </div>
            </div>
            <div className="flex-1 max-w-md ml-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search simulations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <Tabs value={activeSubject} onValueChange={setActiveSubject}>
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all" data-testid="tab-all">
              All
            </TabsTrigger>
            <TabsTrigger value="Physics" data-testid="tab-physics">
              <Atom className="h-4 w-4 mr-1" />
              Physics
            </TabsTrigger>
            <TabsTrigger value="Chemistry" data-testid="tab-chemistry">
              <FlaskConical className="h-4 w-4 mr-1" />
              Chemistry
            </TabsTrigger>
            <TabsTrigger value="Biology" data-testid="tab-biology">
              <Leaf className="h-4 w-4 mr-1" />
              Biology
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeSubject} className="mt-6 space-y-8">
            {groupedSimulations.custom.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Badge variant="secondary">Custom</Badge>
                  Interactive Simulations
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedSimulations.custom.map((sim) => (
                    <SimulationCard
                      key={sim.id}
                      simulation={sim}
                      onSelect={() => setSelectedSimulation(sim)}
                    />
                  ))}
                </div>
              </div>
            )}

            {groupedSimulations.phet.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Badge variant="outline">PhET</Badge>
                  University of Colorado Simulations
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedSimulations.phet.map((sim) => (
                    <SimulationCard
                      key={sim.id}
                      simulation={sim}
                      onSelect={() => setSelectedSimulation(sim)}
                    />
                  ))}
                </div>
              </div>
            )}

            {filteredSimulations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No simulations found matching your criteria.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveSubject("all");
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function SimulationCard({
  simulation,
  onSelect,
}: {
  simulation: SimulationItem;
  onSelect: () => void;
}) {
  const colors = subjectColors[simulation.subject];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`cursor-pointer transition-all hover:shadow-lg ${colors.border} border-2`}
        onClick={onSelect}
        data-testid={`card-simulation-${simulation.id}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className={`p-2 rounded-lg ${colors.bg}`}>
              <span className={colors.text}>{simulation.icon}</span>
            </div>
            <div className="flex gap-1">
              <Badge
                variant="outline"
                className={`${colors.text} ${colors.border}`}
              >
                {simulation.subject}
              </Badge>
              {simulation.type === "phet" && (
                <Badge variant="secondary" className="text-xs">
                  PhET
                </Badge>
              )}
            </div>
          </div>
          <CardTitle className="text-lg mt-2">{simulation.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {simulation.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {simulation.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="secondary" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <Badge
              variant="outline"
              className={
                simulation.difficulty === "Beginner"
                  ? "text-green-600 border-green-300"
                  : simulation.difficulty === "Intermediate"
                  ? "text-yellow-600 border-yellow-300"
                  : "text-red-600 border-red-300"
              }
            >
              {simulation.difficulty}
            </Badge>
            <Button size="sm" className="gap-1">
              <Play className="h-3 w-3" />
              Launch
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
