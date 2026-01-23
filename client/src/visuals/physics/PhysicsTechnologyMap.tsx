import { Badge } from "@/components/ui/badge";

type Area = {
  id: string;
  title: string;
  summary: string;
  examples: string[];
};

const areas: Area[] = [
  {
    id: "health",
    title: "Health and Medicine",
    summary: "Imaging, diagnostics, and therapy tools",
    examples: ["X-ray", "MRI", "Ultrasound", "Radiotherapy"],
  },
  {
    id: "communication",
    title: "Communication",
    summary: "Signals, networks, and data transfer",
    examples: ["Radio", "Fiber optics", "Satellites", "Mobile networks"],
  },
  {
    id: "energy",
    title: "Energy",
    summary: "Generation, storage, and efficiency",
    examples: ["Solar cells", "Nuclear power", "Batteries", "Turbines"],
  },
  {
    id: "transport",
    title: "Transportation",
    summary: "Motion, safety, and navigation",
    examples: ["Aerodynamics", "GPS", "Electric motors", "Braking"],
  },
  {
    id: "materials",
    title: "Materials",
    summary: "Structure, properties, and new materials",
    examples: ["Semiconductors", "Composites", "Nanomaterials", "Superconductors"],
  },
  {
    id: "sensing",
    title: "Measurement and Control",
    summary: "Precision sensing and automation",
    examples: ["Lasers", "Sensors", "Robotics", "Control systems"],
  },
];

type PhysicsTechnologyMapProps = {
  title?: string;
  description?: string;
};

export default function PhysicsTechnologyMap({
  title,
  description,
}: PhysicsTechnologyMapProps) {
  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h4 className="text-lg font-semibold">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {areas.map((area) => (
          <div key={area.id} className="rounded-xl border bg-muted/10 p-4 space-y-3">
            <div>
              <div className="text-base font-semibold">{area.title}</div>
              <div className="text-sm text-muted-foreground">{area.summary}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {area.examples.map((example) => (
                <Badge key={example} variant="secondary" className="text-xs">
                  {example}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-muted-foreground">
        Physics provides the principles that power modern technology.
      </div>
    </div>
  );
}
