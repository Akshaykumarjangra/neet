
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import HindiToggle from '../shared/HindiToggle';

export default function MetreBridge() {
  const [hindi, setHindi] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {hindi ? 'मीटर ब्रिज' : 'Metre Bridge'}
              <Badge variant="secondary">PhET</Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {hindi ? 'व्हीटस्टोन सिद्धांत का उपयोग करके अज्ञात प्रतिरोध' : 'Unknown resistance using Wheatstone principle'}
            </p>
          </div>
          <HindiToggle enabled={hindi} onToggle={setHindi} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <iframe
          src="https://phet.colorado.edu/sims/html/resistance-in-a-wire/latest/resistance-in-a-wire_en.html"
          className="w-full h-96 rounded-lg border"
          title="Metre Bridge Simulation"
          allowFullScreen
        />

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2 text-sm">
          <p className="font-semibold">NEET Key Points - Metre Bridge:</p>
          <ul className="space-y-1 text-muted-foreground font-mono">
            <li>• Balance condition: R/S = l/(100-l)</li>
            <li>• Unknown resistance: R = S × l/(100-l)</li>
            <li>• Null point: no current through galvanometer</li>
            <li>• Based on Wheatstone bridge principle</li>
            <li>• R₁/R₂ = R₃/R₄ at balance</li>
            <li>• Sensitivity max at l = 50 cm</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
