
import { Loader2 } from "lucide-react";

export default function VisualLoader() {
  return (
    <div className="flex items-center justify-center min-h-[300px] bg-muted/50 rounded-lg">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="text-sm text-muted-foreground">Loading visualization...</p>
      </div>
    </div>
  );
}
