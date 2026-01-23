import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Maximize2, Minimize2, ExternalLink, Loader2, RefreshCw, AlertCircle } from "lucide-react";

interface PhETSimulationProps {
  simulationId: string;
  title: string;
  description?: string;
  subject?: "Physics" | "Chemistry" | "Biology" | "Botany" | "Zoology" | "Math";
  height?: number;
}

const subjectColors: Record<string, string> = {
  Physics: "bg-blue-500",
  Chemistry: "bg-purple-500",
  Biology: "bg-green-500",
  Botany: "bg-emerald-500",
  Zoology: "bg-orange-500",
  Math: "bg-orange-500",
};

export function PhETSimulation({
  simulationId,
  title,
  description,
  subject = "Physics",
  height = 500,
}: PhETSimulationProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const simulationUrl = `https://phet.colorado.edu/sims/html/${simulationId}/latest/${simulationId}_en.html`;

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const handleRetry = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const openInNewTab = useCallback(() => {
    window.open(simulationUrl, "_blank", "noopener,noreferrer");
  }, [simulationUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={isFullscreen ? "fixed inset-0 z-50 bg-background p-4" : ""}
      data-testid={`phet-simulation-${simulationId}`}
    >
      <Card className={`overflow-hidden ${isFullscreen ? "h-full" : ""}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={subjectColors[subject]} data-testid={`badge-subject-${simulationId}`}>
                  {subject}
                </Badge>
                <Badge variant="outline">PhET Interactive</Badge>
              </div>
              <CardTitle className="text-lg" data-testid={`title-${simulationId}`}>
                {title}
              </CardTitle>
              {description && (
                <p className="text-sm text-muted-foreground mt-1" data-testid={`description-${simulationId}`}>
                  {description}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={openInNewTab}
                title="Open in new tab"
                data-testid={`button-new-tab-${simulationId}`}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                data-testid={`button-fullscreen-${simulationId}`}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div
            className="relative bg-muted"
            style={{ height: isFullscreen ? "calc(100vh - 180px)" : height }}
          >
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading simulation...</p>
                <p className="text-xs text-muted-foreground">This may take a few seconds</p>
              </div>
            )}

            {hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted z-10">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <div className="text-center">
                  <p className="font-medium">Failed to load simulation</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    The simulation might be unavailable or blocked
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleRetry} variant="outline" data-testid={`button-retry-${simulationId}`}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Button onClick={openInNewTab} data-testid={`button-open-direct-${simulationId}`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Directly
                  </Button>
                </div>
              </div>
            )}

            <iframe
              key={isLoading ? "loading" : "loaded"}
              src={simulationUrl}
              title={title}
              className="w-full h-full border-0"
              allowFullScreen
              onLoad={handleLoad}
              onError={handleError}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              data-testid={`iframe-${simulationId}`}
            />
          </div>

          <div className="p-3 border-t bg-muted/30">
            <p className="text-xs text-muted-foreground text-center">
              Simulation provided by{" "}
              <a
                href="https://phet.colorado.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                PhET Interactive Simulations
              </a>{" "}
              - University of Colorado Boulder
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default PhETSimulation;
