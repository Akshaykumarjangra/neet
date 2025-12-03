
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Waves } from "lucide-react";

export default function StandingWave() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Waves className="h-5 w-5" />
            Standing Wave Formation
          </span>
          <Badge variant="outline">Physics - Waves</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Interactive wave on a string simulation from PhET
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video w-full border rounded-lg overflow-hidden bg-background">
          <iframe
            src="https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html"
            width="100%"
            height="100%"
            allowFullScreen
            title="Wave on a String - PhET Interactive Simulation"
            className="w-full h-full"
          />
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Standing wave: Superposition of two waves traveling in opposite directions</li>
            <li>• Nodes: Points of zero amplitude (destructive interference)</li>
            <li>• Antinodes: Points of maximum amplitude (constructive interference)</li>
            <li>• Distance between consecutive nodes = λ/2</li>
            <li>• Distance between consecutive antinodes = λ/2</li>
            <li>• For fixed ends: L = nλ/2 where n = 1, 2, 3...</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Important Formulas:</h4>
          <div className="grid gap-2 text-sm font-mono bg-muted p-3 rounded">
            <p>y₁ = A sin(kx - ωt) (incident wave)</p>
            <p>y₂ = A sin(kx + ωt) (reflected wave)</p>
            <p>y = y₁ + y₂ = 2A sin(kx) cos(ωt)</p>
            <p>For nth harmonic: L = nλ/2</p>
            <p>fₙ = nv/(2L) where v = √(T/μ)</p>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold mb-2">How to Use:</h4>
          <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
            <li>Use the wrench to adjust tension</li>
            <li>Change amplitude and frequency with sliders</li>
            <li>Select "Oscillate" mode to create continuous waves</li>
            <li>Try "No End" vs "Fixed End" to see reflection</li>
            <li>Observe standing wave patterns at resonant frequencies</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
