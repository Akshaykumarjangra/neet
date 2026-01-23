import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

type CompareKey = "Drugs vs Cleaning" | "Soap vs Detergent";

const comparisons: Record<
  CompareKey,
  { left: { title: string; points: string[] }; right: { title: string; points: string[] } }
> = {
  "Drugs vs Cleaning": {
    left: {
      title: "Therapeutic Drugs",
      points: [
        "Analgesics: aspirin, paracetamol",
        "Antibiotics: penicillin, tetracycline",
        "Antacids: Mg(OH)2, Al(OH)3",
        "Act on receptors or enzymes",
      ],
    },
    right: {
      title: "Cleaning Agents",
      points: [
        "Antiseptics: iodine, chloroxylenol",
        "Disinfectants: phenol (surface use)",
        "Detergents: synthetic surfactants",
        "Focus on hygiene and sanitation",
      ],
    },
  },
  "Soap vs Detergent": {
    left: {
      title: "Soap",
      points: [
        "Sodium salts of fatty acids",
        "Forms scum in hard water",
        "Biodegradable",
        "Best in soft water",
      ],
    },
    right: {
      title: "Detergent",
      points: [
        "Sulfonates or sulfates",
        "Works in hard water",
        "Some can be non-biodegradable",
        "Stronger cleaning action",
      ],
    },
  },
};

export default function EverydayChemistryCompare() {
  const [compareKey, setCompareKey] = useState<CompareKey>("Drugs vs Cleaning");
  const [announcement, setAnnouncement] = useState("");
  const selection = useMemo(() => comparisons[compareKey], [compareKey]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Everyday Chemistry Comparisons</span>
          <Badge variant="outline">Chemistry - Everyday Life</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Compare drug categories with cleaning agents and soap vs detergent.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Comparison</label>
          <Select
            value={compareKey}
            onValueChange={(value) => {
              setCompareKey(value as CompareKey);
              setAnnouncement(`Comparison set to ${value}`);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Drugs vs Cleaning">Drugs vs Cleaning</SelectItem>
              <SelectItem value="Soap vs Detergent">Soap vs Detergent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/20 p-4">
            <p className="font-semibold">{selection.left.title}</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {selection.left.points.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border bg-muted/20 p-4">
            <p className="font-semibold">{selection.right.title}</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {selection.right.points.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/20 p-4 text-sm">
          <p className="font-semibold">Quick reminder</p>
          <p className="text-muted-foreground">
            Antiseptics are safe on skin, disinfectants are stronger for surfaces.
          </p>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
