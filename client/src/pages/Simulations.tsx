import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Search,
  Atom,
  FlaskConical,
  Leaf,
  Bug,
  Play,
  ExternalLink,
  Zap,
  Lightbulb,
  TestTubes,
  Orbit,
  Waves,
  ArrowLeft,
  Calculator,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { PhETSimulation } from "@/components/PhETSimulation";
import ProjectileMotion from "@/components/simulations/ProjectileMotion";
import CircuitBuilder from "@/components/simulations/CircuitBuilder";
import MoleculeViewer from "@/components/simulations/MoleculeViewer";
import SolarSystemViewer from "@/components/simulations/SolarSystemViewer";
import DnaHelixViewer from "@/components/simulations/DnaHelixViewer";
import { Paywall } from "@/components/Paywall";
import { useAuth } from "@/hooks/useAuth";

import { simulations, SimulationItem } from "@/data/simulations";

const subjectColors: Record<string, { bg: string; text: string; border: string }> = {
  Physics: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/30" },
  Chemistry: { bg: "bg-purple-500/10", text: "text-purple-600", border: "border-purple-500/30" },
  Botany: { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/30" },
  Zoology: { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/30" },
  Math: { bg: "bg-orange-500/10", text: "text-orange-600", border: "border-orange-500/30" },
};

const subjectIcons: Record<string, React.ReactNode> = {
  Physics: <Atom className="h-4 w-4" />,
  Chemistry: <FlaskConical className="h-4 w-4" />,
  Botany: <Leaf className="h-4 w-4" />,
  Zoology: <Bug className="h-4 w-4" />,
  Math: <Calculator className="h-4 w-4" />,
};

export default function Simulations() {
  const { user } = useAuth();
  const isPaidUser = user?.isPaidUser ?? false;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState("all");
  const [selectedSimulation, setSelectedSimulation] = useState<SimulationItem | null>(null);

  const filteredSimulations = useMemo(() => {
    return simulations.filter((sim) => {
      // Safety check: ensure topics array exists
      const topics = sim.topics || [];
      const matchesSearch =
        searchQuery === "" ||
        sim.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sim.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()));
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
        case "SolarSystemViewer":
          return <SolarSystemViewer />;
        case "DnaHelixViewer":
          return <DnaHelixViewer />;
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
      <Seo 
        title="NEET Interactive 3D Simulations | Physics, Chemistry, Biology"
        description="Experience 50+ interactive simulations for NEET Physics, Chemistry, and Biology. Visualize complex concepts like projectile motion, molecular structures, and DNA helices in 3D."
        keywords={["NEET simulations", "interactive physics NEET", "3D molecular viewer", "biology simulations NEET", "PhET simulations NEET"]}
        url="https://neet.zeroai.org.in/simulations"
      />
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
                  Explore physics, chemistry, botany, and zoology concepts through interactive simulations
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
          <TabsList className="grid w-full max-w-md grid-cols-5">
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
            <TabsTrigger value="Botany" data-testid="tab-botany">
              <Leaf className="h-4 w-4 mr-1" />
              Botany
            </TabsTrigger>
            <TabsTrigger value="Zoology" data-testid="tab-zoology">
              <Bug className="h-4 w-4 mr-1" />
              Zoology
            </TabsTrigger>
            <TabsTrigger value="Math" data-testid="tab-math">
              <Calculator className="h-4 w-4 mr-1" />
              Math
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeSubject} className="mt-6 space-y-8">
            {groupedSimulations.custom.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Badge variant="secondary">Custom</Badge>
                  Interactive Simulations
                </h2>
                <Paywall
                  feature="3D Interactive Simulations"
                  description="Unlock the full catalog of 50+ interactive physics and chemistry simulations to visualize complex NEET concepts."
                  freeLimit="2 Simulations"
                >
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedSimulations.custom.map((sim, index) => (
                      <SimulationCard
                        key={sim.id}
                        simulation={sim}
                        onSelect={() => setSelectedSimulation(sim)}
                        isLocked={!isPaidUser && index >= 2}
                      />
                    ))}
                  </div>
                </Paywall>
              </div>
            )}

            {groupedSimulations.phet.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Badge variant="outline">PhET</Badge>
                  University of Colorado Simulations
                </h2>
                <Paywall
                  feature="University PhET Simulations"
                  description="Access premium University-grade simulations for deep conceptual understanding of NEET Biology and Physics."
                  freeLimit="Unlimited for Premium"
                  variant="inline"
                >
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedSimulations.phet.map((sim) => (
                      <SimulationCard
                        key={sim.id}
                        simulation={sim}
                        onSelect={() => setSelectedSimulation(sim)}
                        isLocked={!isPaidUser}
                      />
                    ))}
                  </div>
                </Paywall>
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
  isLocked = false,
}: {
  simulation: SimulationItem;
  onSelect: () => void;
  isLocked?: boolean;
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
        className={`cursor-pointer transition-all hover:shadow-lg ${colors.border} border-2 ${isLocked ? "opacity-75 grayscale-[0.5]" : ""}`}
        onClick={() => !isLocked && onSelect()}
        data-testid={`card-simulation-${simulation.id}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className={`p-2 rounded-lg ${colors.bg}`}>
              <span className={colors.text}>
                {simulation.icon || subjectIcons[simulation.subject]}
              </span>
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
            <Button size="sm" className="gap-1" disabled={isLocked}>
              {isLocked ? (
                <>
                  <Sparkles className="h-3 w-3" />
                  Premium
                </>
              ) : (
                <>
                  <Play className="h-3 w-3" />
                  Launch
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
