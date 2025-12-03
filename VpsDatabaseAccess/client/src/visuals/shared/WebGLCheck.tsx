import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!(gl && gl instanceof WebGLRenderingContext);
  } catch (e) {
    return false;
  }
}

export function WebGLUnavailable({ title }: { title?: string }) {
  return (
    <Card data-testid="webgl-unavailable">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-muted-foreground" />
          {title || "3D Visualization"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-6 text-center space-y-3">
          <p className="text-muted-foreground">
            This 3D visualization requires WebGL support, which is not available in your browser or test environment.
          </p>
          <p className="text-sm text-muted-foreground">
            To view this visualization, please use a modern browser with WebGL enabled.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
