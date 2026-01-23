import { Badge } from "@/components/ui/badge";

type Force = {
  id: string;
  name: string;
  strengthPower: number;
  rangeLabel: string;
  rangeType: "infinite" | "short";
  carrier: string;
  role: string;
  barClass: string;
  dotClass: string;
};

const forces: Force[] = [
  {
    id: "strong",
    name: "Strong Nuclear",
    strengthPower: 0,
    rangeLabel: "~1e-15 m",
    rangeType: "short",
    carrier: "Gluons",
    role: "Binds protons and neutrons in the nucleus",
    barClass: "bg-gradient-to-r from-rose-500 to-orange-400",
    dotClass: "bg-rose-500",
  },
  {
    id: "electromagnetic",
    name: "Electromagnetic",
    strengthPower: -2,
    rangeLabel: "Infinite",
    rangeType: "infinite",
    carrier: "Photon",
    role: "Controls atoms, chemistry, and electricity",
    barClass: "bg-gradient-to-r from-sky-500 to-blue-500",
    dotClass: "bg-sky-500",
  },
  {
    id: "weak",
    name: "Weak Nuclear",
    strengthPower: -13,
    rangeLabel: "~1e-18 m",
    rangeType: "short",
    carrier: "W/Z bosons",
    role: "Drives beta decay and neutrino interactions",
    barClass: "bg-gradient-to-r from-amber-500 to-yellow-400",
    dotClass: "bg-amber-500",
  },
  {
    id: "gravity",
    name: "Gravitational",
    strengthPower: -38,
    rangeLabel: "Infinite",
    rangeType: "infinite",
    carrier: "Graviton (hypothetical)",
    role: "Shapes orbits, stars, and galaxies",
    barClass: "bg-gradient-to-r from-indigo-500 to-violet-500",
    dotClass: "bg-indigo-500",
  },
];

const MIN_POWER = -40;
const MAX_POWER = 0;

const getStrengthPercent = (strengthPower: number) => {
  const clamped = Math.min(MAX_POWER, Math.max(MIN_POWER, strengthPower));
  const ratio = (clamped - MIN_POWER) / (MAX_POWER - MIN_POWER);
  return Math.max(0.08, ratio);
};

const formatStrength = (strengthPower: number) => {
  if (strengthPower === 0) return "1 (reference)";
  return `1e${strengthPower}`;
};

type FundamentalForcesComparisonProps = {
  title?: string;
  description?: string;
};

export default function FundamentalForcesComparison({
  title,
  description,
}: FundamentalForcesComparisonProps) {
  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h4 className="text-lg font-semibold">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="grid gap-4">
        {forces.map((force) => (
          <div key={force.id} className="rounded-xl border bg-muted/10 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className={`mt-1 h-3 w-3 rounded-full ${force.dotClass}`} />
                <div>
                  <div className="text-base font-semibold">{force.name}</div>
                  <div className="text-xs text-muted-foreground">{force.role}</div>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {force.carrier}
              </Badge>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Relative strength
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full ${force.barClass}`}
                    style={{ width: `${getStrengthPercent(force.strengthPower) * 100}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Approx. {formatStrength(force.strengthPower)} of strong force
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Range</div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant={force.rangeType === "infinite" ? "default" : "secondary"}>
                    {force.rangeLabel}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {force.rangeType === "infinite" ? "Long-range" : "Subatomic scale"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-dashed bg-muted/20 p-3 text-xs text-muted-foreground">
        Relative strengths are approximate (strong = 1). Values are shown on a log scale to highlight large differences.
      </div>
    </div>
  );
}
