import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

type TreeKey = "Source" | "Structure" | "Polymerization";

type TreeNode = {
  id: string;
  label: string;
  x: number;
  y: number;
};

type TreeLayout = {
  nodes: TreeNode[];
  links: Array<{ source: string; target: string }>;
  examples: string[];
};

const layouts: Record<TreeKey, TreeLayout> = {
  Source: {
    nodes: [
      { id: "root", label: "Polymers", x: 120, y: 130 },
      { id: "natural", label: "Natural", x: 360, y: 60 },
      { id: "semi", label: "Semi-synthetic", x: 360, y: 130 },
      { id: "synthetic", label: "Synthetic", x: 360, y: 200 },
    ],
    links: [
      { source: "root", target: "natural" },
      { source: "root", target: "semi" },
      { source: "root", target: "synthetic" },
    ],
    examples: ["Natural: starch, cellulose", "Semi: cellulose acetate", "Synthetic: PVC, nylon"],
  },
  Structure: {
    nodes: [
      { id: "root", label: "Polymers", x: 120, y: 130 },
      { id: "linear", label: "Linear", x: 360, y: 60 },
      { id: "branched", label: "Branched", x: 360, y: 130 },
      { id: "cross", label: "Cross-linked", x: 360, y: 200 },
    ],
    links: [
      { source: "root", target: "linear" },
      { source: "root", target: "branched" },
      { source: "root", target: "cross" },
    ],
    examples: ["Linear: HDPE, nylon", "Branched: LDPE", "Cross-linked: Bakelite"],
  },
  Polymerization: {
    nodes: [
      { id: "root", label: "Polymers", x: 120, y: 130 },
      { id: "addition", label: "Addition", x: 360, y: 90 },
      { id: "condensation", label: "Condensation", x: 360, y: 170 },
    ],
    links: [
      { source: "root", target: "addition" },
      { source: "root", target: "condensation" },
    ],
    examples: ["Addition: polythene, PVC", "Condensation: nylon 6,6, PET"],
  },
};

export default function PolymerClassificationTree() {
  const [treeKey, setTreeKey] = useState<TreeKey>("Source");
  const [announcement, setAnnouncement] = useState("");

  const layout = useMemo(() => layouts[treeKey], [treeKey]);
  const nodeById = useMemo(() => {
    const map = new Map<string, TreeNode>();
    layout.nodes.forEach((node) => map.set(node.id, node));
    return map;
  }, [layout.nodes]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Polymer Classification Tree</span>
          <Badge variant="outline">Chemistry - Polymers</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Switch between classification schemes used in NEET.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Classification</label>
          <Select
            value={treeKey}
            onValueChange={(value) => {
              setTreeKey(value as TreeKey);
              setAnnouncement(`Classification set to ${value}`);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Source">By source</SelectItem>
              <SelectItem value="Structure">By structure</SelectItem>
              <SelectItem value="Polymerization">By polymerization</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full overflow-x-auto">
          <svg
            width={720}
            height={260}
            className="w-full min-w-[720px] rounded-lg border bg-slate-950"
          >
            {layout.links.map((link) => {
              const source = nodeById.get(link.source);
              const target = nodeById.get(link.target);
              if (!source || !target) return null;
              return (
                <line
                  key={`${link.source}-${link.target}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="#64748b"
                  strokeWidth={2}
                />
              );
            })}
            {layout.nodes.map((node) => (
              <g key={node.id}>
                <rect
                  x={node.x - 70}
                  y={node.y - 20}
                  width={140}
                  height={40}
                  rx={8}
                  fill="#0f172a"
                  stroke="#38bdf8"
                  strokeWidth={2}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill="#e2e8f0"
                  fontSize="12"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="rounded-lg border bg-muted/20 p-4 text-sm">
          <p className="font-semibold">Examples</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            {layout.examples.map((example) => (
              <li key={example}>- {example}</li>
            ))}
          </ul>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
