import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TissueAnatomyDiagramProps {
  title?: string;
  description?: string;
}

const layers = [
  { label: "Epidermis", className: "bg-green-500" },
  { label: "Cortex", className: "bg-lime-500" },
  { label: "Phloem", className: "bg-amber-500" },
  { label: "Xylem", className: "bg-red-500" },
  { label: "Pith", className: "bg-sky-500" },
];

export default function TissueAnatomyDiagram({
  title = "Plant Tissue Cross Section",
  description = "Layered schematic of a stem cross-section with vascular tissues highlighted.",
}: TissueAnatomyDiagramProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <Badge variant="outline">Biology - Tissue</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border bg-background p-4">
          <svg viewBox="0 0 260 220" className="w-full h-52" role="img" aria-label="Tissue anatomy diagram">
            <circle cx="130" cy="110" r="90" fill="#16a34a" opacity="0.25" />
            <circle cx="130" cy="110" r="75" fill="#84cc16" opacity="0.25" />
            <circle cx="130" cy="110" r="60" fill="#facc15" opacity="0.25" />
            <circle cx="130" cy="110" r="45" fill="#ef4444" opacity="0.25" />
            <circle cx="130" cy="110" r="30" fill="#38bdf8" opacity="0.35" />
            <circle cx="130" cy="110" r="90" fill="none" stroke="#15803d" strokeWidth="3" />
            <circle cx="130" cy="110" r="75" fill="none" stroke="#65a30d" strokeWidth="2" />
            <circle cx="130" cy="110" r="60" fill="none" stroke="#eab308" strokeWidth="2" />
            <circle cx="130" cy="110" r="45" fill="none" stroke="#dc2626" strokeWidth="2" />
            <circle cx="130" cy="110" r="30" fill="none" stroke="#0284c7" strokeWidth="2" />
          </svg>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {layers.map((layer) => (
            <div key={layer.label} className="flex items-center gap-2 text-sm">
              <span className={`h-3 w-3 rounded-full ${layer.className}`} />
              <span>{layer.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
