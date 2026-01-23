import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

type ElementData = {
  symbol: string;
  name: string;
  states: number[];
  compounds: string[];
};

const elements: ElementData[] = [
  { symbol: "Sc", name: "Scandium", states: [3], compounds: ["Sc2O3"] },
  { symbol: "Ti", name: "Titanium", states: [2, 3, 4], compounds: ["TiO2", "TiCl4"] },
  { symbol: "V", name: "Vanadium", states: [2, 3, 4, 5], compounds: ["V2O5", "VOCl3"] },
  { symbol: "Cr", name: "Chromium", states: [2, 3, 6], compounds: ["Cr2O3", "K2Cr2O7"] },
  { symbol: "Mn", name: "Manganese", states: [2, 4, 7], compounds: ["MnO2", "KMnO4"] },
  { symbol: "Fe", name: "Iron", states: [2, 3], compounds: ["Fe2O3", "FeSO4"] },
  { symbol: "Co", name: "Cobalt", states: [2, 3], compounds: ["CoCl2", "Co2O3"] },
  { symbol: "Ni", name: "Nickel", states: [2], compounds: ["NiCl2", "Ni(CO)4"] },
  { symbol: "Cu", name: "Copper", states: [1, 2], compounds: ["Cu2O", "CuSO4"] },
  { symbol: "Zn", name: "Zinc", states: [2], compounds: ["ZnO", "ZnSO4"] },
];

const oxidationStates = [1, 2, 3, 4, 5, 6, 7];

export default function TransitionOxidationMap() {
  const [selectedSymbol, setSelectedSymbol] = useState("Fe");
  const [announcement, setAnnouncement] = useState("");

  const selectedElement = useMemo(
    () => elements.find((el) => el.symbol === selectedSymbol) ?? elements[0],
    [selectedSymbol]
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Transition Metal Oxidation States</span>
          <Badge variant="outline">Chemistry - d-Block</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Select a 3d element to see its common oxidation states and compounds.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Element</label>
          <Select
            value={selectedSymbol}
            onValueChange={(value) => {
              setSelectedSymbol(value);
              setAnnouncement(`Selected ${value} oxidation states`);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {elements.map((element) => (
                <SelectItem key={element.symbol} value={element.symbol}>
                  {element.symbol} - {element.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border bg-muted/20 p-4">
          <div className="text-lg font-semibold">
            {selectedElement.symbol} ({selectedElement.name})
          </div>
          <div className="text-sm text-muted-foreground">
            Common oxidation states: {selectedElement.states.map((state) => `+${state}`).join(", ")}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {oxidationStates.map((state) => {
            const active = selectedElement.states.includes(state);
            return (
              <div
                key={state}
                className={`rounded-md border p-3 text-center text-sm ${
                  active ? "bg-emerald-500/20 border-emerald-500" : "bg-muted/30"
                }`}
              >
                <div className="font-semibold">+{state}</div>
                <div className={`mt-2 h-2 rounded ${active ? "bg-emerald-500" : "bg-muted"}`} />
              </div>
            );
          })}
        </div>

        <div className="rounded-lg border bg-muted/20 p-4 text-sm">
          <p className="font-semibold mb-2">Common Compounds</p>
          <div className="flex flex-wrap gap-2">
            {selectedElement.compounds.map((compound) => (
              <span key={compound} className="rounded-full border px-3 py-1 text-xs">
                {compound}
              </span>
            ))}
          </div>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
