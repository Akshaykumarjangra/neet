import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

type PhaseState = "solid" | "liquid" | "gas";

type ColloidEntry = {
  dispersed: PhaseState;
  medium: PhaseState;
  type: string;
  examples: string[];
};

const states: Array<{ value: PhaseState; label: string }> = [
  { value: "solid", label: "Solid" },
  { value: "liquid", label: "Liquid" },
  { value: "gas", label: "Gas" },
];

const colloids: ColloidEntry[] = [
  { dispersed: "solid", medium: "solid", type: "Solid sol", examples: ["colored glass", "ruby"] },
  { dispersed: "solid", medium: "liquid", type: "Sol", examples: ["paint", "ink"] },
  { dispersed: "solid", medium: "gas", type: "Aerosol", examples: ["smoke", "dust"] },
  { dispersed: "liquid", medium: "solid", type: "Gel", examples: ["jelly", "cheese"] },
  { dispersed: "liquid", medium: "liquid", type: "Emulsion", examples: ["milk", "cream"] },
  { dispersed: "liquid", medium: "gas", type: "Aerosol", examples: ["fog", "mist"] },
  { dispersed: "gas", medium: "solid", type: "Solid foam", examples: ["pumice", "foam rubber"] },
  { dispersed: "gas", medium: "liquid", type: "Foam", examples: ["soap foam", "whipped cream"] },
];

export default function ColloidClassifier() {
  const [dispersed, setDispersed] = useState<PhaseState>("solid");
  const [medium, setMedium] = useState<PhaseState>("liquid");
  const [announcement, setAnnouncement] = useState("");

  const selection = useMemo(
    () => colloids.find((entry) => entry.dispersed === dispersed && entry.medium === medium),
    [dispersed, medium]
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Colloid Type Explorer</span>
          <Badge variant="outline">Chemistry - Surface Chemistry</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose dispersed phase and medium to classify the colloid.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Dispersed Phase</label>
            <Select
              value={dispersed}
              onValueChange={(value) => {
                setDispersed(value as PhaseState);
                setAnnouncement(`Dispersed phase set to ${value}`);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Dispersion Medium</label>
            <Select
              value={medium}
              onValueChange={(value) => {
                setMedium(value as PhaseState);
                setAnnouncement(`Dispersion medium set to ${value}`);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-[120px_repeat(3,minmax(0,1fr))] gap-2 text-xs">
          <div />
          {states.map((state) => (
            <div key={state.value} className="rounded border bg-muted/40 p-2 text-center font-semibold">
              {state.label} medium
            </div>
          ))}
          {states.map((row) => (
            <div key={row.value} className="contents">
              <div className="rounded border bg-muted/40 p-2 font-semibold">
                {row.label} dispersed
              </div>
              {states.map((col) => {
                const entry = colloids.find(
                  (item) => item.dispersed === row.value && item.medium === col.value
                );
                const isActive = row.value === dispersed && col.value === medium;
                return (
                  <div
                    key={`${row.value}-${col.value}`}
                    className={`rounded border p-2 ${
                      isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-muted bg-background"
                    }`}
                  >
                    {entry ? entry.type : "Not a colloid"}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="rounded-lg border bg-muted/20 p-4 text-sm">
          {selection ? (
            <>
              <p className="font-semibold">{selection.type}</p>
              <p className="text-muted-foreground">
                Examples: {selection.examples.join(", ")}
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold">Not a colloid</p>
              <p className="text-muted-foreground">
                Gas dispersed in gas forms a true solution, not a colloid.
              </p>
            </>
          )}
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
