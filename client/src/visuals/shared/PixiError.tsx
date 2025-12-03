import { Info } from 'lucide-react';

interface PixiErrorProps {
  width: number;
  height: number;
  error: string;
}

export default function PixiError({ width, height, error }: PixiErrorProps) {
  return (
    <div 
      className="w-full border rounded-lg p-8 text-center bg-muted" 
      style={{ 
        maxWidth: width, 
        height: height, 
        margin: "0 auto", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}
    >
      <div className="space-y-2">
        <p className="text-sm text-destructive font-semibold">Visualization Unavailable</p>
        <p className="text-xs text-muted-foreground">{error}</p>
        <p className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
          <Info className="h-3 w-3" />
          This visualization works in standard browsers with WebGL support
        </p>
      </div>
    </div>
  );
}
