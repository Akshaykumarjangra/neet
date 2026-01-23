import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BiologyDiagramKitProps {
  title?: string;
  description?: string;
  visualizationType?: string;
}

const typeLabels: Record<string, string> = {
  diagram: "Diagram",
  flowchart: "Flowchart",
  graph: "Graph",
  table: "Table",
  comparison: "Comparison",
  animation: "Animation",
};

function DiagramCanvas() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-44" role="img" aria-label="Biology diagram preview">
      <rect x="12" y="12" width="296" height="176" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
      <circle cx="80" cy="100" r="24" fill="#38bdf8" opacity="0.7" />
      <circle cx="160" cy="60" r="22" fill="#34d399" opacity="0.7" />
      <circle cx="240" cy="100" r="24" fill="#f472b6" opacity="0.7" />
      <circle cx="160" cy="140" r="20" fill="#a78bfa" opacity="0.7" />
      <line x1="100" y1="100" x2="140" y2="70" stroke="#94a3b8" strokeWidth="2" />
      <line x1="180" y1="70" x2="220" y2="100" stroke="#94a3b8" strokeWidth="2" />
      <line x1="160" y1="82" x2="160" y2="120" stroke="#94a3b8" strokeWidth="2" />
    </svg>
  );
}

function GraphCanvas() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-44" role="img" aria-label="Biology graph preview">
      <rect x="12" y="12" width="296" height="176" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
      <line x1="40" y1="160" x2="280" y2="160" stroke="#94a3b8" strokeWidth="2" />
      <line x1="40" y1="160" x2="40" y2="40" stroke="#94a3b8" strokeWidth="2" />
      <polyline
        points="40,140 80,120 120,130 160,90 200,110 240,70 280,80"
        fill="none"
        stroke="#16a34a"
        strokeWidth="3"
      />
      <circle cx="80" cy="120" r="4" fill="#16a34a" />
      <circle cx="160" cy="90" r="4" fill="#16a34a" />
      <circle cx="240" cy="70" r="4" fill="#16a34a" />
    </svg>
  );
}

function FlowchartCanvas() {
  return (
    <div className="space-y-3">
      {["Input", "Process", "Output"].map((label, index) => (
        <div key={label} className="flex items-center gap-3">
          <div className="flex-1 rounded-md border bg-muted/40 px-3 py-2 text-sm font-medium">
            {label}
          </div>
          {index < 2 && <div className="h-6 w-6 rounded-full bg-primary/20" />}
        </div>
      ))}
    </div>
  );
}

function TableCanvas() {
  return (
    <div className="grid grid-cols-3 gap-2 text-xs">
      {["Structure", "Role", "Example"].map((header) => (
        <div key={header} className="rounded-md bg-muted/50 p-2 font-semibold">
          {header}
        </div>
      ))}
      {["Xylem", "Transport", "Stem"].map((cell, idx) => (
        <div key={`row1-${idx}`} className="rounded-md border bg-background p-2">
          {cell}
        </div>
      ))}
      {["Phloem", "Support", "Leaf"].map((cell, idx) => (
        <div key={`row2-${idx}`} className="rounded-md border bg-background p-2">
          {cell}
        </div>
      ))}
    </div>
  );
}

function ComparisonCanvas() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {["Option A", "Option B"].map((label) => (
        <div key={label} className="rounded-md border bg-muted/30 p-3">
          <div className="text-sm font-semibold">{label}</div>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            <li>Key feature one</li>
            <li>Key feature two</li>
            <li>Key feature three</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

function AnimationCanvas() {
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      {["one", "two", "three"].map((id) => (
        <div key={id} className="h-4 w-4 rounded-full bg-primary/70 animate-pulse" />
      ))}
    </div>
  );
}

function renderByType(type: string) {
  switch (type) {
    case "flowchart":
      return <FlowchartCanvas />;
    case "graph":
      return <GraphCanvas />;
    case "table":
      return <TableCanvas />;
    case "comparison":
      return <ComparisonCanvas />;
    case "animation":
      return <AnimationCanvas />;
    case "diagram":
    default:
      return <DiagramCanvas />;
  }
}

export default function BiologyDiagramKit({
  title,
  description,
  visualizationType,
}: BiologyDiagramKitProps) {
  const type = visualizationType || "diagram";
  const label = typeLabels[type] || "Diagram";
  const fallbackTitle = title || `${label} Preview`;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{fallbackTitle}</span>
          <Badge variant="outline">Biology - {label}</Badge>
        </CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border bg-background p-4">{renderByType(type)}</div>
      </CardContent>
    </Card>
  );
}
