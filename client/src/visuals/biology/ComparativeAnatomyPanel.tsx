import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ComparativeAnatomyPanelProps {
  title?: string;
  description?: string;
}

const columns = [
  { label: "Porifera", subtitle: "Sponges" },
  { label: "Arthropoda", subtitle: "Insects" },
  { label: "Chordata", subtitle: "Vertebrates" },
];

const rows = [
  { feature: "Symmetry", values: ["Asymmetrical", "Bilateral", "Bilateral"] },
  { feature: "Body cavity", values: ["Absent", "Coelomate", "Coelomate"] },
  { feature: "Segmentation", values: ["Absent", "Present", "Present"] },
  { feature: "Circulation", values: ["No system", "Open", "Closed"] },
  { feature: "Support", values: ["Spicules", "Exoskeleton", "Endoskeleton"] },
];

export default function ComparativeAnatomyPanel({
  title = "Comparative Anatomy Snapshot",
  description = "Quick comparison of major animal phyla across core body features.",
}: ComparativeAnatomyPanelProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <Badge variant="outline">Biology - Comparison</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border bg-background p-4">
          <div className="grid grid-cols-4 gap-3 text-sm">
            <div className="font-semibold text-muted-foreground">Feature</div>
            {columns.map((col) => (
              <div key={col.label} className="font-semibold">
                <div>{col.label}</div>
                <div className="text-xs text-muted-foreground">{col.subtitle}</div>
              </div>
            ))}
            {rows.map((row) => (
              <div key={row.feature} className="contents">
                <div className="text-muted-foreground">{row.feature}</div>
                {row.values.map((value, idx) => (
                  <div key={`${row.feature}-${idx}`} className="rounded-md bg-muted/40 px-2 py-1">
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
