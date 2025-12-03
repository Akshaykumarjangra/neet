
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";
import { useState } from "react";

export default function WheatstoneCircuit() {
  const [announcement, setAnnouncement] = useState("");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Wheatstone Bridge Circuit
          </span>
          <Badge variant="outline">Physics - Current Electricity</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Interactive circuit simulation using PhET
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full h-[600px] border rounded-lg bg-background">
          <iframe
            src="https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html"
            width="100%"
            height="100%"
            className="rounded-lg"
            title="Circuit Construction Kit - PhET Simulation"
            allow="fullscreen"
          />
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Wheatstone Bridge:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Balanced condition: R₁/R₂ = R₃/R₄</li>
            <li>• At balance, current through galvanometer = 0</li>
            <li>• Used to measure unknown resistance accurately</li>
            <li>• P/Q = R/S (standard notation)</li>
            <li>• Sensitivity depends on galvanometer</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Important Formulas:</h4>
          <div className="grid gap-2 text-sm font-mono bg-muted p-3 rounded">
            <p>Balance: R₁/R₂ = R₃/R₄</p>
            <p>Unknown R: R = (R₂ × R₃)/R₁</p>
            <p>Meter Bridge: X/Y = l/(100-l)</p>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm font-semibold mb-2">How to Use:</p>
          <p className="text-sm text-muted-foreground">
            Use the PhET simulation to build a Wheatstone bridge circuit. 
            Add four resistors in a diamond configuration with a galvanometer 
            in the center and a battery across the diagonal.
          </p>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
