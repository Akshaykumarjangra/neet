import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhetSimulation {
   title: string;
   url: string;
   description: string;
}

interface PhetSimulationViewerProps {
   simulations: PhetSimulation[];
}

export function PhetSimulationViewer({ simulations }: PhetSimulationViewerProps) {
   if (!simulations || simulations.length === 0) {
      return null;
   }

   return (
      <Card className="mb-6">
         <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <Play className="h-5 w-5 text-blue-500" />
               PHET Interactive Simulations
            </CardTitle>
            <CardDescription>
               Explore these interactive simulations to visualize and understand concepts better
            </CardDescription>
         </CardHeader>
         <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
               {simulations.map((sim, idx) => (
                  <div
                     key={idx}
                     className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                     <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                           <h4 className="font-semibold text-sm mb-1">{sim.title}</h4>
                           <p className="text-xs text-muted-foreground mb-3">
                              {sim.description}
                           </p>
                        </div>
                     </div>

                     <div className="flex gap-2">
                        <a
                           href={sim.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex-1"
                        >
                           <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              data-testid={`button-phet-${idx}`}
                           >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Open Simulation
                           </Button>
                        </a>
                     </div>

                     <Badge variant="secondary" className="mt-3 text-xs">
                        PHET Simulation
                     </Badge>
                  </div>
               ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm text-muted-foreground">
               <p>
                  💡 <strong>Tip:</strong> PHET simulations open in a new window. Try changing
                  parameters to see how they affect the system!
               </p>
            </div>
         </CardContent>
      </Card>
   );
}
