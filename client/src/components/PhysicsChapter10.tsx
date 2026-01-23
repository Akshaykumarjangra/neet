import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Question } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VisualizationTab } from "@/components/VisualizationTab";
import { getChapterVisualizations } from "@/visuals/chapterMappings";
import { BookOpen, Brain, Calculator, Lightbulb , Loader2 } from "lucide-react";

export function PhysicsChapter10() {
  // Fetch questions from database for Thermal Properties of Matter (topicId: 20)
  const { data: dbQuestions, isLoading: questionsLoading } = useQuery<Question[]>({
    queryKey: ['/api/questions', 'topicId', '20'],
    queryFn: async () => {
      const response = await fetch('/api/questions?topicId=20');
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const practiceQuestions = dbQuestions || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge className="mb-2" variant="outline">Chapter 10</Badge>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Thermodynamics
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Laws of thermodynamics, heat engines, refrigerators, and entropy
        </p>
      </div>

      <Tabs defaultValue="theory" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="theory">
            <BookOpen className="h-4 w-4 mr-2" />
            Theory
          </TabsTrigger>
          <TabsTrigger value="formulas">
            <Calculator className="h-4 w-4 mr-2" />
            Formulas
          </TabsTrigger>
          <TabsTrigger value="visualization">
            <Brain className="h-4 w-4 mr-2" />
            3D Models
          </TabsTrigger>
          <TabsTrigger value="concepts">
            <Lightbulb className="h-4 w-4 mr-2" />
            Key Concepts
          </TabsTrigger>
        </TabsList>

        {/* Theory Tab */}
        <TabsContent value="theory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thermal Equilibrium and Zeroth Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">Zeroth Law of Thermodynamics:</p>
                <p className="text-sm">
                  If two systems are each in thermal equilibrium with a third system, 
                  then they are in thermal equilibrium with each other.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Thermal Equilibrium:</p>
                <ul className="text-sm space-y-2 ml-4">
                  <li>• No net heat flow between systems</li>
                  <li>• Temperature remains constant</li>
                  <li>• Basis for temperature measurement</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>First Law of Thermodynamics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">Law of Energy Conservation:</p>
                <div className="bg-muted p-3 rounded font-mono text-sm text-center mb-2">
                  ΔQ = ΔU + ΔW
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• ΔQ: Heat supplied to the system</li>
                  <li>• ΔU: Change in internal energy</li>
                  <li>• ΔW: Work done by the system</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Sign Convention:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                    <p className="font-semibold text-sm mb-1">Positive (+)</p>
                    <ul className="text-xs space-y-1">
                      <li>• Heat absorbed by system</li>
                      <li>• Work done by system</li>
                      <li>• Internal energy increases</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
                    <p className="font-semibold text-sm mb-1">Negative (-)</p>
                    <ul className="text-xs space-y-1">
                      <li>• Heat released by system</li>
                      <li>• Work done on system</li>
                      <li>• Internal energy decreases</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thermodynamic Processes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">1. Isothermal Process</p>
                  <p className="text-xs mb-2">Temperature constant (ΔT = 0)</p>
                  <div className="bg-muted p-2 rounded font-mono text-xs text-center mb-2">
                    PV = constant
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• ΔU = 0 (no change in internal energy)</li>
                    <li>• Q = W (all heat converts to work)</li>
                    <li>• Very slow process</li>
                    <li>• Example: Melting ice at 0°C</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">2. Adiabatic Process</p>
                  <p className="text-xs mb-2">No heat exchange (Q = 0)</p>
                  <div className="bg-muted p-2 rounded font-mono text-xs text-center mb-2">
                    PVᵞ = constant
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• ΔU = -W</li>
                    <li>• TVᵞ⁻¹ = constant</li>
                    <li>• Very fast process</li>
                    <li>• Example: Sudden compression</li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">3. Isochoric Process</p>
                  <p className="text-xs mb-2">Volume constant (ΔV = 0)</p>
                  <div className="bg-muted p-2 rounded font-mono text-xs text-center mb-2">
                    P/T = constant
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• W = 0 (no work done)</li>
                    <li>• Q = ΔU = nCᵥΔT</li>
                    <li>• Pressure changes with temperature</li>
                    <li>• Example: Gas in rigid container</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">4. Isobaric Process</p>
                  <p className="text-xs mb-2">Pressure constant (ΔP = 0)</p>
                  <div className="bg-muted p-2 rounded font-mono text-xs text-center mb-2">
                    V/T = constant
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• W = PΔV</li>
                    <li>• Q = nCₚΔT</li>
                    <li>• Volume changes with temperature</li>
                    <li>• Example: Gas in piston</li>
                  </ul>
                </div>
              </div>

              <div className="bg-pink-50 dark:bg-pink-950/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">Cyclic Process:</p>
                <p className="text-sm mb-2">System returns to initial state</p>
                <ul className="text-sm space-y-1">
                  <li>• ΔU = 0 (internal energy unchanged)</li>
                  <li>• Q = W (net heat = net work)</li>
                  <li>• Basis for heat engines</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specific Heat Capacities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Cᵥ (Constant Volume)</p>
                  <div className="bg-muted p-2 rounded font-mono text-sm text-center mb-2">
                    Cᵥ = (∂U/∂T)ᵥ
                  </div>
                  <p className="text-xs">Heat capacity at constant volume</p>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Cₚ (Constant Pressure)</p>
                  <div className="bg-muted p-2 rounded font-mono text-sm text-center mb-2">
                    Cₚ = (∂H/∂T)ₚ
                  </div>
                  <p className="text-xs">Heat capacity at constant pressure</p>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">Mayer's Relation:</p>
                <div className="bg-muted p-2 rounded font-mono text-sm text-center mb-2">
                  Cₚ - Cᵥ = R
                </div>
                <p className="text-xs text-muted-foreground">For ideal gas (per mole)</p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">Heat Capacity Ratio (γ):</p>
                <div className="bg-muted p-2 rounded font-mono text-sm text-center mb-2">
                  γ = Cₚ/Cᵥ
                </div>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Monatomic gas: γ = 5/3 = 1.67</li>
                  <li>• Diatomic gas: γ = 7/5 = 1.4</li>
                  <li>• Polyatomic gas: γ = 4/3 = 1.33</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Second Law of Thermodynamics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">Kelvin-Planck Statement:</p>
                <p className="text-sm">
                  It is impossible to construct a heat engine that, operating in a cycle, 
                  produces no effect other than the absorption of heat from a reservoir 
                  and the performance of an equal amount of work.
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">Clausius Statement:</p>
                <p className="text-sm">
                  It is impossible to construct a device that operates in a cycle and 
                  produces no effect other than the transfer of heat from a cooler to 
                  a hotter body.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">Entropy (S):</p>
                <p className="text-sm mb-2">Measure of disorder or randomness</p>
                <div className="bg-muted p-2 rounded font-mono text-sm text-center mb-2">
                  ΔS = Q/T
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• For reversible process: ΔS = 0</li>
                  <li>• For irreversible process: ΔS {'>'} 0</li>
                  <li>• Entropy of universe always increases</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Heat Engines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">Heat Engine Efficiency (η):</p>
                <div className="bg-muted p-3 rounded font-mono text-sm text-center mb-2">
                  η = W/Q₁ = (Q₁ - Q₂)/Q₁ = 1 - Q₂/Q₁
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Q₁: Heat absorbed from hot reservoir</li>
                  <li>• Q₂: Heat rejected to cold reservoir</li>
                  <li>• W: Net work output</li>
                  <li>• η always &lt; 1 (100%)</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">Carnot Engine:</p>
                <p className="text-sm mb-2">Most efficient heat engine (reversible)</p>
                <div className="bg-muted p-2 rounded font-mono text-sm text-center mb-2">
                  η_Carnot = 1 - T₂/T₁
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• T₁: Temperature of hot reservoir (K)</li>
                  <li>• T₂: Temperature of cold reservoir (K)</li>
                  <li>• No real engine can exceed this efficiency</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">Carnot Cycle (4 Steps):</p>
                <ul className="text-sm space-y-2">
                  <li>1. Isothermal expansion (T₁): Q₁ absorbed</li>
                  <li>2. Adiabatic expansion: Temperature drops to T₂</li>
                  <li>3. Isothermal compression (T₂): Q₂ rejected</li>
                  <li>4. Adiabatic compression: Temperature rises to T₁</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refrigerators and Heat Pumps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">Coefficient of Performance (COP):</p>
                <p className="text-sm mb-2">For Refrigerator:</p>
                <div className="bg-muted p-2 rounded font-mono text-sm text-center mb-2">
                  β = Q₂/W = Q₂/(Q₁ - Q₂)
                </div>
                <p className="text-xs text-muted-foreground">Q₂: Heat removed from cold reservoir</p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">For Heat Pump:</p>
                <div className="bg-muted p-2 rounded font-mono text-sm text-center mb-2">
                  α = Q₁/W = Q₁/(Q₁ - Q₂)
                </div>
                <p className="text-xs text-muted-foreground">Q₁: Heat delivered to hot reservoir</p>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">Relation:</p>
                <div className="bg-muted p-2 rounded font-mono text-sm text-center">
                  α = β + 1
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">Carnot Refrigerator:</p>
                <div className="bg-muted p-2 rounded font-mono text-sm text-center mb-2">
                  β_Carnot = T₂/(T₁ - T₂)
                </div>
                <p className="text-xs text-muted-foreground">Maximum COP for given temperatures</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Formulas Tab */}
        <TabsContent value="formulas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Essential Formulas Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">First Law</p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-muted p-2 rounded font-mono">ΔQ = ΔU + ΔW</div>
                    <div className="bg-muted p-2 rounded font-mono">ΔU = nCᵥΔT</div>
                    <div className="bg-muted p-2 rounded font-mono">ΔW = PΔV</div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Heat Capacities</p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-muted p-2 rounded font-mono">Cₚ - Cᵥ = R</div>
                    <div className="bg-muted p-2 rounded font-mono">γ = Cₚ/Cᵥ</div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Processes</p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-muted p-2 rounded font-mono">Isothermal: PV = const</div>
                    <div className="bg-muted p-2 rounded font-mono">Adiabatic: PVᵞ = const</div>
                    <div className="bg-muted p-2 rounded font-mono">Isochoric: P/T = const</div>
                    <div className="bg-muted p-2 rounded font-mono">Isobaric: V/T = const</div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Efficiency</p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-muted p-2 rounded font-mono">η = W/Q₁ = 1 - Q₂/Q₁</div>
                    <div className="bg-muted p-2 rounded font-mono">η_Carnot = 1 - T₂/T₁</div>
                  </div>
                </div>

                <div className="bg-pink-50 dark:bg-pink-950/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Refrigerator</p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-muted p-2 rounded font-mono">β = Q₂/W</div>
                    <div className="bg-muted p-2 rounded font-mono">β_Carnot = T₂/(T₁-T₂)</div>
                  </div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Entropy</p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-muted p-2 rounded font-mono">ΔS = Q/T</div>
                    <div className="bg-muted p-2 rounded font-mono">ΔS_universe ≥ 0</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Visualization Tab */}
        <TabsContent value="visualization" className="space-y-6">
          <VisualizationTab
            chapterId="physics-10"
            visualizations={getChapterVisualizations('physics-10')?.visualizations || []}
            layout="grid"
            title="Thermodynamic Processes"
            description="Carnot cycle, calorimetry, and heat transfer"
          />
        </TabsContent>

        {/* Key Concepts Tab */}
        <TabsContent value="concepts" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">Laws</Badge>
                <CardTitle className="text-lg">Thermodynamic Laws</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Zeroth Law: Thermal equilibrium is transitive</p>
                <p>• First Law: Energy conservation (ΔQ = ΔU + ΔW)</p>
                <p>• Second Law: Entropy always increases</p>
                <p>• Heat cannot spontaneously flow from cold to hot</p>
                <p>• 100% efficiency is impossible</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">Processes</Badge>
                <CardTitle className="text-lg">Thermodynamic Processes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Isothermal: T constant, PV = const</p>
                <p>• Adiabatic: Q = 0, PVᵞ = const</p>
                <p>• Isochoric: V constant, W = 0</p>
                <p>• Isobaric: P constant, W = PΔV</p>
                <p>• Cyclic: Returns to initial state</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 dark:border-purple-800">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">Engines</Badge>
                <CardTitle className="text-lg">Heat Engines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Convert heat to mechanical work</p>
                <p>• Efficiency: η = W/Q₁ = 1 - Q₂/Q₁</p>
                <p>• Carnot engine: Most efficient (reversible)</p>
                <p>• η_Carnot = 1 - T₂/T₁</p>
                <p>• Real engines: η &lt; η_Carnot</p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">Cooling</Badge>
                <CardTitle className="text-lg">Refrigerators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Transfer heat from cold to hot (requires work)</p>
                <p>• COP: β = Q₂/W</p>
                <p>• Higher COP = better refrigerator</p>
                <p>• Heat pump: α = Q₁/W</p>
                <p>• Relation: α = β + 1</p>
              </CardContent>
            </Card>

            <Card className="border-pink-200 dark:border-pink-800">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">Entropy</Badge>
                <CardTitle className="text-lg">Disorder & Entropy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Measure of randomness/disorder</p>
                <p>• ΔS = Q/T for reversible process</p>
                <p>• Entropy of universe always increases</p>
                <p>• Irreversible processes: ΔS {'>'} 0</p>
                <p>• Arrow of time indicator</p>
              </CardContent>
            </Card>

            <Card className="border-indigo-200 dark:border-indigo-800">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">Capacity</Badge>
                <CardTitle className="text-lg">Heat Capacities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Cᵥ: At constant volume</p>
                <p>• Cₚ: At constant pressure</p>
                <p>• Mayer's relation: Cₚ - Cᵥ = R</p>
                <p>• γ = Cₚ/Cᵥ (1.4 for diatomic)</p>
                <p>• Cₚ always {'>'} Cᵥ</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Common Mistakes to Avoid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
                  <p className="font-semibold text-sm mb-1">❌ Wrong sign convention</p>
                  <p className="text-xs text-muted-foreground">Heat absorbed & work done BY system are positive</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
                  <p className="font-semibold text-sm mb-1">❌ Confusing Cₚ and Cᵥ</p>
                  <p className="text-xs text-muted-foreground">Use Cᵥ for isochoric, Cₚ for isobaric processes</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
                  <p className="font-semibold text-sm mb-1">❌ Using Celsius in Carnot formula</p>
                  <p className="text-xs text-muted-foreground">Always use Kelvin (absolute temperature)</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
                  <p className="font-semibold text-sm mb-1">❌ Assuming 100% efficiency possible</p>
                  <p className="text-xs text-muted-foreground">Second law prohibits perfect heat engines</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
                  <p className="font-semibold text-sm mb-1">❌ Forgetting ΔU = 0 in isothermal process</p>
                  <p className="text-xs text-muted-foreground">For ideal gas, internal energy depends only on temperature</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
