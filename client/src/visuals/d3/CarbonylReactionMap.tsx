import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

type PathKey = "Nucleophilic addition" | "Oxidation" | "Reduction" | "Condensation";

const pathways: Record<
  PathKey,
  { steps: string[]; example: string }
> = {
  "Nucleophilic addition": {
    steps: [
      "Carbonyl carbon is electrophilic",
      "Nucleophile attacks carbonyl carbon",
      "Tetrahedral alkoxide intermediate forms",
      "Protonation gives alcohol product",
    ],
    example: "RCHO + HCN -> RCH(OH)CN (cyanohydrin)",
  },
  Oxidation: {
    steps: [
      "Aldehydes oxidize to acids easily",
      "Tollens and Fehling tests detect aldehydes",
      "Ketones resist oxidation under mild conditions",
    ],
    example: "RCHO + [O] -> RCOOH",
  },
  Reduction: {
    steps: [
      "LiAlH4 or NaBH4 reduces carbonyl",
      "Aldehydes -> primary alcohols",
      "Ketones -> secondary alcohols",
    ],
    example: "R2CO + [H] -> R2CHOH",
  },
  Condensation: {
    steps: [
      "Alpha hydrogen forms enolate under base",
      "Enolate attacks another carbonyl",
      "Aldol forms, then dehydrates to alkene",
    ],
    example: "2 CH3CHO -> CH3CH=CHCHO (aldol condensation)",
  },
};

export default function CarbonylReactionMap() {
  const [pathKey, setPathKey] = useState<PathKey>("Nucleophilic addition");
  const [announcement, setAnnouncement] = useState("");
  const selection = useMemo(() => pathways[pathKey], [pathKey]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Carbonyl Reaction Map</span>
          <Badge variant="outline">Chemistry - Carbonyls</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Explore the main reaction pathways of aldehydes and ketones.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Pathway</label>
          <Select
            value={pathKey}
            onValueChange={(value) => {
              setPathKey(value as PathKey);
              setAnnouncement(`Pathway set to ${value}`);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(pathways).map((key) => (
                <SelectItem key={key} value={key}>
                  {key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border bg-muted/20 p-4 space-y-2 text-sm">
          <p className="font-semibold">Key Steps</p>
          <ol className="list-decimal ml-4 space-y-1 text-muted-foreground">
            {selection.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="rounded-lg border bg-slate-950 p-4 text-sm text-slate-100">
          Example: {selection.example}
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
