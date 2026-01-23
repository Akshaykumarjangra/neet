type ScaleItem = {
  label: string;
  scale: string;
  example: string;
};

const scaleItems: ScaleItem[] = [
  {
    label: "Subatomic",
    scale: "~1e-15 m",
    example: "Quarks, nuclei",
  },
  {
    label: "Microscopic",
    scale: "~1e-6 m",
    example: "Dust particles, microstructures",
  },
  {
    label: "Human",
    scale: "~1 m",
    example: "Everyday mechanics",
  },
  {
    label: "Planetary",
    scale: "~1e7 m",
    example: "Earth scale",
  },
  {
    label: "Solar System",
    scale: "~1e13 m",
    example: "Planetary orbits",
  },
  {
    label: "Galaxy",
    scale: "~1e21 m",
    example: "Milky Way",
  },
];

type PhysicsScaleOverviewProps = {
  title?: string;
  description?: string;
};

export default function PhysicsScaleOverview({
  title,
  description,
}: PhysicsScaleOverviewProps) {
  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h4 className="text-lg font-semibold">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="rounded-xl border bg-muted/10 p-4">
        <div className="relative pl-6">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-border" aria-hidden />
          <div className="space-y-4">
            {scaleItems.map((item) => (
              <div key={item.label} className="relative">
                <div className="absolute left-[-2px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.scale}</span>
                  <span className="text-xs text-muted-foreground">• {item.example}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Physics connects all scales, from the nucleus to the cosmos.
      </div>
    </div>
  );
}
