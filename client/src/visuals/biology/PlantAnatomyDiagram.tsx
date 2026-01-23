import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PlantAnatomyDiagramProps {
  title?: string;
  description?: string;
}

const parts = [
  { label: "Petal", className: "bg-rose-400" },
  { label: "Sepal", className: "bg-emerald-400" },
  { label: "Stamen", className: "bg-amber-400" },
  { label: "Pistil", className: "bg-purple-400" },
];

export default function PlantAnatomyDiagram({
  title = "Flower Anatomy",
  description = "Simplified flower diagram with core reproductive structures labeled.",
}: PlantAnatomyDiagramProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <Badge variant="outline">Biology - Plant</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border bg-background p-4">
          <svg viewBox="0 0 300 240" className="w-full h-56" role="img" aria-label="Flower anatomy diagram">
            <circle cx="150" cy="120" r="18" fill="#c084fc" />
            <rect x="145" y="60" width="10" height="70" fill="#c084fc" />
            <ellipse cx="150" cy="140" rx="60" ry="40" fill="#fb7185" opacity="0.9" />
            <ellipse cx="90" cy="110" rx="45" ry="28" fill="#fb7185" opacity="0.9" />
            <ellipse cx="210" cy="110" rx="45" ry="28" fill="#fb7185" opacity="0.9" />
            <ellipse cx="150" cy="70" rx="40" ry="25" fill="#fb7185" opacity="0.9" />
            <ellipse cx="150" cy="170" rx="50" ry="28" fill="#34d399" opacity="0.9" />
            <rect x="120" y="120" width="6" height="40" fill="#fbbf24" />
            <rect x="174" y="120" width="6" height="40" fill="#fbbf24" />
            <circle cx="123" cy="118" r="6" fill="#fbbf24" />
            <circle cx="177" cy="118" r="6" fill="#fbbf24" />
          </svg>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {parts.map((part) => (
            <div key={part.label} className="flex items-center gap-2 text-sm">
              <span className={`h-3 w-3 rounded-full ${part.className}`} />
              <span>{part.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
