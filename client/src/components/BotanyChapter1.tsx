import { Leaf, BookOpen, Brain, CheckCircle2, Lightbulb } from "lucide-react";
import { ChapterQuiz } from "./ChapterQuiz";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BotanyChapter1() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 gradient-mesh-bg min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="h-10 w-10" />
            <h1 className="text-4xl font-bold">The Living World</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Explore the diversity of life, classification systems, and the fundamental concepts of taxonomy
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mb-24" />
      </div>

      {/* Learning Objectives */}
      <Card className="glass-panel glow-halo float-gentle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-green-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Understand what defines living organisms</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Learn biodiversity and its importance</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Master taxonomic categories and hierarchy</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p>Understand binomial nomenclature system</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="concepts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
          <TabsTrigger value="classification">Classification</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
        </TabsList>

        {/* Key Concepts */}
        <TabsContent value="concepts" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-green-600" />
                Characteristics of Living Organisms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">1. Growth</h4>
                  <p className="text-sm text-green-800">Increase in mass and number of cells</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">2. Reproduction</h4>
                  <p className="text-sm text-green-800">Producing offspring (sexual or asexual)</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">3. Metabolism</h4>
                  <p className="text-sm text-green-800">Chemical reactions in the body (anabolism + catabolism)</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">4. Cellular Organization</h4>
                  <p className="text-sm text-green-800">Made up of one or more cells</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">5. Consciousness</h4>
                  <p className="text-sm text-green-800">Ability to sense and respond to environment</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">6. Adaptation</h4>
                  <p className="text-sm text-green-800">Evolving features to survive in environment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Biodiversity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose max-w-none">
                <p>Biodiversity refers to the variety of life on Earth at all levels:</p>
                <ul className="space-y-2">
                  <li><strong>Genetic Diversity:</strong> Variation in genes within a species</li>
                  <li><strong>Species Diversity:</strong> Variety of species in an ecosystem</li>
                  <li><strong>Ecosystem Diversity:</strong> Variety of ecosystems in a region</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">📊 Global Biodiversity Stats:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• ~1.7 million species described</li>
                  <li>• ~8.7 million estimated total species</li>
                  <li>• Insects make up ~70% of known species</li>
                  <li>• India: 8% of global biodiversity (megadiverse country)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Nomenclature Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-3">Binomial Nomenclature (Linnaeus)</h4>
                <div className="space-y-2 text-sm text-amber-800">
                  <p>✓ Two-word naming system: <em>Genus species</em></p>
                  <p>✓ Genus name capitalized, species epithet lowercase</p>
                  <p>✓ Both italicized (or underlined when handwritten)</p>
                  <p>✓ Example: <em>Homo sapiens</em>, <em>Mangifera indica</em></p>
                  <p>✓ Author's name can be abbreviated after: <em>Mangifera indica</em> L. (Linnaeus)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Classification */}
        <TabsContent value="classification" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Taxonomic Hierarchy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Kingdom", example: "Plantae", color: "bg-purple-100 text-purple-900" },
                  { name: "Division/Phylum", example: "Angiospermae", color: "bg-blue-100 text-blue-900" },
                  { name: "Class", example: "Dicotyledonae", color: "bg-green-100 text-green-900" },
                  { name: "Order", example: "Sapindales", color: "bg-yellow-100 text-yellow-900" },
                  { name: "Family", example: "Anacardiaceae", color: "bg-orange-100 text-orange-900" },
                  { name: "Genus", example: "Mangifera", color: "bg-red-100 text-red-900" },
                  { name: "Species", example: "indica", color: "bg-pink-100 text-pink-900" },
                ].map((level, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className={`flex-1 p-3 rounded-lg ${level.color} font-semibold`}>
                      {level.name}
                    </div>
                    <div className="flex-1 p-3 bg-gray-100 rounded-lg">
                      <em>{level.example}</em>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>Example:</strong> Mango tree = <em>Mangifera indica</em> L.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle>Five Kingdom Classification (Whittaker, 1969)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Monera</h4>
                  <p className="text-sm text-purple-800">Prokaryotic, unicellular (bacteria, blue-green algae)</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Protista</h4>
                  <p className="text-sm text-green-800">Eukaryotic, unicellular (algae, protozoans)</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">Fungi</h4>
                  <p className="text-sm text-amber-800">Heterotrophic, saprophytic (mushrooms, yeast)</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-2">Plantae</h4>
                  <p className="text-sm text-emerald-800">Autotrophic, multicellular (all plants)</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Animalia</h4>
                  <p className="text-sm text-blue-800">Heterotrophic, multicellular (all animals)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Examples */}
        <TabsContent value="examples" className="space-y-6">
          <Card className="glass-panel glow-halo float-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                Classification Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                <h4 className="font-semibold text-green-900 mb-3">Mango Tree (<em>Mangifera indica</em>)</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><strong>Kingdom:</strong> Plantae</p>
                  <p><strong>Division:</strong> Angiospermae</p>
                  <p><strong>Class:</strong> Dicotyledonae</p>
                  <p><strong>Order:</strong> Sapindales</p>
                  <p><strong>Family:</strong> Anacardiaceae</p>
                  <p><strong>Genus:</strong> Mangifera</p>
                  <p className="col-span-2"><strong>Species:</strong> indica</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <h4 className="font-semibold text-blue-900 mb-3">Human (<em>Homo sapiens</em>)</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><strong>Kingdom:</strong> Animalia</p>
                  <p><strong>Phylum:</strong> Chordata</p>
                  <p><strong>Class:</strong> Mammalia</p>
                  <p><strong>Order:</strong> Primates</p>
                  <p><strong>Family:</strong> Hominidae</p>
                  <p><strong>Genus:</strong> Homo</p>
                  <p className="col-span-2"><strong>Species:</strong> sapiens</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Practice Quiz */}
        <TabsContent value="quiz" className="space-y-6">
          <ChapterQuiz
            topicId={7}
            subject="Botany"
            chapterTitle="The Living World"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
