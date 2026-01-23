import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AnimalAnatomyDiagramProps {
  title?: string;
  description?: string;
}

const organFocus = [
  { label: "Heart", className: "bg-red-500" },
  { label: "Lungs", className: "bg-indigo-500" },
  { label: "Stomach", className: "bg-amber-500" },
  { label: "Intestine", className: "bg-emerald-500" },
];

export default function AnimalAnatomyDiagram({
  title = "Frog Anatomy Overview",
  description = "Schematic view of major organ systems in a frog body plan.",
}: AnimalAnatomyDiagramProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <Badge variant="outline">Biology - Anatomy</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border bg-background p-4">
          <svg viewBox="0 0 320 220" className="w-full h-52" role="img" aria-label="Animal anatomy diagram">
            <ellipse cx="160" cy="120" rx="90" ry="60" fill="#bbf7d0" stroke="#22c55e" strokeWidth="3" />
            <circle cx="90" cy="120" r="22" fill="#bbf7d0" stroke="#22c55e" strokeWidth="3" />
            <circle cx="230" cy="120" r="22" fill="#bbf7d0" stroke="#22c55e" strokeWidth="3" />
            <circle cx="120" cy="110" r="10" fill="#ef4444" />
            <ellipse cx="140" cy="100" rx="16" ry="10" fill="#6366f1" />
            <ellipse cx="180" cy="100" rx="16" ry="10" fill="#6366f1" />
            <ellipse cx="170" cy="140" rx="18" ry="12" fill="#f59e0b" />
            <rect x="150" y="155" width="40" height="20" rx="10" fill="#10b981" />
          </svg>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {organFocus.map((organ) => (
            <div key={organ.label} className="flex items-center gap-2 text-sm">
              <span className={`h-3 w-3 rounded-full ${organ.className}`} />
              <span>{organ.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
