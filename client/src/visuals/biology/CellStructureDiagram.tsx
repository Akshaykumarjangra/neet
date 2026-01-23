import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CellStructureDiagramProps {
  title?: string;
  description?: string;
}

const organelles = [
  { label: "Nucleus", className: "bg-purple-500" },
  { label: "Mitochondrion", className: "bg-orange-500" },
  { label: "Golgi body", className: "bg-pink-500" },
  { label: "Rough ER", className: "bg-blue-500" },
  { label: "Vacuole", className: "bg-teal-500" },
];

export default function CellStructureDiagram({
  title = "Cell Structure Overview",
  description = "Schematic view of a eukaryotic cell with key organelles highlighted.",
}: CellStructureDiagramProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <Badge variant="outline">Biology - Cell</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border bg-background p-4">
          <svg viewBox="0 0 360 220" className="w-full h-52" role="img" aria-label="Cell structure diagram">
            <ellipse cx="180" cy="110" rx="150" ry="80" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
            <ellipse cx="180" cy="110" rx="130" ry="65" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
            <ellipse cx="150" cy="110" rx="36" ry="28" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
            <circle cx="150" cy="110" r="10" fill="#7c3aed" />
            <ellipse cx="240" cy="90" rx="20" ry="12" fill="#fdba74" stroke="#ea580c" strokeWidth="2" />
            <ellipse cx="110" cy="145" rx="18" ry="10" fill="#fdba74" stroke="#ea580c" strokeWidth="2" />
            <rect x="210" y="135" width="44" height="18" rx="8" fill="#fda4af" stroke="#be123c" strokeWidth="2" />
            <rect x="90" y="70" width="60" height="16" rx="8" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
            <rect x="95" y="88" width="52" height="12" rx="6" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
            <ellipse cx="230" cy="150" rx="20" ry="14" fill="#5eead4" stroke="#0f766e" strokeWidth="2" />
          </svg>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {organelles.map((organelle) => (
            <div key={organelle.label} className="flex items-center gap-2 text-sm">
              <span className={`h-3 w-3 rounded-full ${organelle.className}`} />
              <span>{organelle.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
