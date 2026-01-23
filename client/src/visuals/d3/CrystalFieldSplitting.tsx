import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import A11yAnnouncer from "@/visuals/shared/A11yAnnouncer";

type Geometry = "Octahedral" | "Tetrahedral" | "Square planar";

type Level = {
  label: string;
  energy: number;
  orbitals: number;
};

const levelMap: Record<Geometry, Level[]> = {
  Octahedral: [
    { label: "t2g", energy: 1, orbitals: 3 },
    { label: "eg", energy: 3, orbitals: 2 },
  ],
  Tetrahedral: [
    { label: "e", energy: 1, orbitals: 2 },
    { label: "t2", energy: 2.5, orbitals: 3 },
  ],
  "Square planar": [
    { label: "dx2-y2", energy: 4, orbitals: 1 },
    { label: "dxy", energy: 3, orbitals: 1 },
    { label: "dz2", energy: 2, orbitals: 1 },
    { label: "dxz/dyz", energy: 1, orbitals: 2 },
  ],
};

export default function CrystalFieldSplitting() {
  const [geometry, setGeometry] = useState<Geometry>("Octahedral");
  const [announcement, setAnnouncement] = useState("");
  const levels = useMemo(() => levelMap[geometry], [geometry]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Crystal Field Splitting</span>
          <Badge variant="outline">Chemistry - Coordination</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Compare d orbital splitting in different ligand geometries.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Geometry</label>
          <Select
            value={geometry}
            onValueChange={(value) => {
              setGeometry(value as Geometry);
              setAnnouncement(`Geometry set to ${value}`);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Octahedral">Octahedral</SelectItem>
              <SelectItem value="Tetrahedral">Tetrahedral</SelectItem>
              <SelectItem value="Square planar">Square planar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative h-64 rounded-lg border bg-slate-950 p-6">
          <div className="absolute left-6 top-6 bottom-6 w-px bg-slate-700" />
          <div className="absolute left-2 top-6 text-xs text-slate-400">High</div>
          <div className="absolute left-2 bottom-6 text-xs text-slate-400">Low</div>

          {levels.map((level) => (
            <div
              key={level.label}
              className="absolute left-10 right-6 flex items-center gap-4"
              style={{ top: `${(1 - level.energy / 4.5) * 80 + 10}%` }}
            >
              <div className="h-0.5 flex-1 bg-cyan-400" />
              <div className="text-xs text-slate-200 w-24">
                {level.label}
              </div>
              <div className="text-xs text-slate-400">
                {level.orbitals} orbitals
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border bg-muted/20 p-4 text-sm space-y-1">
          <p className="font-semibold">Quick Notes</p>
          <p className="text-muted-foreground">
            Octahedral splitting (delta o) is larger than tetrahedral splitting.
          </p>
          <p className="text-muted-foreground">
            Strong field ligands increase splitting and favor low spin complexes.
          </p>
        </div>

        <A11yAnnouncer message={announcement} />
      </CardContent>
    </Card>
  );
}
