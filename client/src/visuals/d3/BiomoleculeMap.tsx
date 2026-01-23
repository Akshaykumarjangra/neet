import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

type CategoryKey = "Carbohydrates" | "Proteins" | "Nucleic Acids" | "Vitamins";

const categories: Array<{
  key: CategoryKey;
  short: string;
  detail: string[];
  examples: string[];
  position: { x: number; y: number };
}> = [
  {
    key: "Carbohydrates",
    short: "Energy and storage",
    detail: ["Mono, di, polysaccharides", "Reducing vs non-reducing sugars"],
    examples: ["Glucose", "Sucrose", "Starch"],
    position: { x: 150, y: 120 },
  },
  {
    key: "Proteins",
    short: "Structure and enzymes",
    detail: ["Peptide bond", "Primary to quaternary structure"],
    examples: ["Hemoglobin", "Amylase", "Keratin"],
    position: { x: 570, y: 80 },
  },
  {
    key: "Nucleic Acids",
    short: "Genetic information",
    detail: ["DNA base pairing", "RNA types"],
    examples: ["DNA", "mRNA", "tRNA"],
    position: { x: 570, y: 200 },
  },
  {
    key: "Vitamins",
    short: "Micronutrient roles",
    detail: ["Fat vs water soluble", "Deficiency diseases"],
    examples: ["Vitamin A", "Vitamin C", "Vitamin D"],
    position: { x: 150, y: 200 },
  },
];

export default function BiomoleculeMap() {
  const [activeKey, setActiveKey] = useState<CategoryKey>("Carbohydrates");
  const [announcement, setAnnouncement] = useState("");

  const activeCategory = useMemo(
    () => categories.find((item) => item.key === activeKey) ?? categories[0],
    [activeKey]
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Biomolecule Map</span>
          <Badge variant="outline">Chemistry - Biomolecules</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Explore the four major biomolecule groups and their roles.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select
            value={activeKey}
            onValueChange={(value) => {
              setActiveKey(value as CategoryKey);
              setAnnouncement(`Selected ${value}`);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full overflow-x-auto">
          <svg
            width={720}
            height={260}
            className="w-full min-w-[720px] rounded-lg border bg-slate-950"
          >
            <circle cx={360} cy={130} r={45} fill="#1e293b" stroke="#38bdf8" strokeWidth={2} />
            <text x={360} y={128} textAnchor="middle" fill="#e2e8f0" fontSize="12">
              Biomolecules
            </text>
            <text x={360} y={144} textAnchor="middle" fill="#94a3b8" fontSize="10">
              Core groups
            </text>

            {categories.map((item) => {
              const isActive = item.key === activeKey;
              return (
                <g key={item.key}>
                  <line
                    x1={360}
                    y1={130}
                    x2={item.position.x}
                    y2={item.position.y}
                    stroke={isActive ? "#38bdf8" : "#475569"}
                    strokeWidth={2}
                  />
                  <circle
                    cx={item.position.x}
                    cy={item.position.y}
                    r={36}
                    fill={isActive ? "#0f172a" : "#1e293b"}
                    stroke={isActive ? "#22c55e" : "#64748b"}
                    strokeWidth={2}
                  />
                  <text
                    x={item.position.x}
                    y={item.position.y - 4}
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="11"
                  >
                    {item.key}
                  </text>
                  <text
                    x={item.position.x}
                    y={item.position.y + 10}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="9"
                  >
                    {item.short}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="rounded-lg border bg-muted/20 p-4 space-y-2 text-sm">
          <p className="font-semibold">{activeCategory.key}</p>
          <ul className="space-y-1 text-muted-foreground">
            {activeCategory.detail.map((line) => (
              <li key={line}>- {line}</li>
            ))}
          </ul>
          <div className="text-muted-foreground">
            Examples: {activeCategory.examples.join(", ")}
          </div>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
