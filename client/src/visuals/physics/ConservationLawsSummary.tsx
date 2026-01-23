type Law = {
  title: string;
  statement: string;
  example: string;
};

const laws: Law[] = [
  {
    title: "Energy",
    statement: "Total energy in an isolated system remains constant.",
    example: "Kinetic energy can convert to potential energy and back.",
  },
  {
    title: "Momentum",
    statement: "Total linear momentum stays constant without external forces.",
    example: "Recoil of a gun and motion of a bullet.",
  },
  {
    title: "Angular Momentum",
    statement: "Total angular momentum is conserved in isolated systems.",
    example: "A skater spins faster when pulling in arms.",
  },
  {
    title: "Charge",
    statement: "Net electric charge remains constant in closed systems.",
    example: "Charge is transferred, not created or destroyed.",
  },
];

type ConservationLawsSummaryProps = {
  title?: string;
  description?: string;
};

export default function ConservationLawsSummary({
  title,
  description,
}: ConservationLawsSummaryProps) {
  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h4 className="text-lg font-semibold">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {laws.map((law) => (
          <div key={law.title} className="rounded-xl border bg-muted/10 p-4 space-y-2">
            <div className="text-sm font-semibold">{law.title}</div>
            <div className="text-xs text-muted-foreground">{law.statement}</div>
            <div className="text-xs text-muted-foreground">Example: {law.example}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
