import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface ThreeDViewerProps {
  modelType?: "atom" | "molecule" | "cell" | "organ";
  title?: string;
  description?: string;
}

export function ThreeDViewer({
  modelType = "atom",
  title = "3D Model Viewer",
  description,
}: ThreeDViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));
  const handleReset = () => setZoom(1);

  const getModelPreview = () => {
    switch (modelType) {
      case "atom":
        return (
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-500" />
            <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-full animate-spin" style={{ animationDuration: "8s" }} />
          </div>
        );
      case "molecule":
        return (
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-red-500" />
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <div className="w-8 h-8 rounded-full bg-blue-500" />
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <div className="w-12 h-12 rounded-full bg-red-500" />
          </div>
        );
      case "cell":
        return (
          <div className="relative w-40 h-32 rounded-[60%] bg-gradient-to-br from-green-200 to-green-400 border-4 border-green-600">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-purple-500" />
            <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-yellow-400" />
            <div className="absolute bottom-4 right-8 w-6 h-3 rounded-full bg-pink-400" />
          </div>
        );
      case "organ":
        return (
          <div className="w-24 h-32 bg-gradient-to-b from-red-400 to-red-600 rounded-t-full relative">
            <div className="absolute -left-4 top-4 w-8 h-8 bg-red-500 rounded-full" />
            <div className="absolute -right-4 top-4 w-8 h-8 bg-red-500 rounded-full" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card data-testid="3d-viewer">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div
          ref={containerRef}
          className="relative h-[300px] bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg overflow-hidden flex items-center justify-center"
        >
          {isLoading ? (
            <div className="animate-pulse text-white">Loading 3D model...</div>
          ) : (
            <div
              style={{ transform: `scale(${zoom})` }}
              className="transition-transform duration-200"
            >
              {getModelPreview()}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          <Button variant="outline" size="icon" onClick={handleZoomOut} data-testid="button-zoom-out">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleReset} data-testid="button-reset-view">
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomIn} data-testid="button-zoom-in">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" data-testid="button-fullscreen">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-2">
          Drag to rotate • Scroll to zoom • Double-click to reset
        </p>
      </CardContent>
    </Card>
  );
}
