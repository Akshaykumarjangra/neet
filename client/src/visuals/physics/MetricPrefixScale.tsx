type Prefix = {
  label: string;
  power: string;
  example: string;
  tone: "primary" | "secondary";
};

const prefixes: Prefix[] = [
  { label: "pico (p)", power: "10^-12", example: "Atomic scales", tone: "secondary" },
  { label: "nano (n)", power: "10^-9", example: "DNA width", tone: "secondary" },
  { label: "micro (u)", power: "10^-6", example: "Bacteria size", tone: "secondary" },
  { label: "milli (m)", power: "10^-3", example: "Grain of sand", tone: "secondary" },
  { label: "centi (c)", power: "10^-2", example: "Centimeter ruler", tone: "secondary" },
  { label: "base", power: "10^0", example: "Meter, second", tone: "primary" },
  { label: "kilo (k)", power: "10^3", example: "Kilometer", tone: "primary" },
  { label: "mega (M)", power: "10^6", example: "Power plant output", tone: "primary" },
  { label: "giga (G)", power: "10^9", example: "Satellite signals", tone: "primary" },
  { label: "tera (T)", power: "10^12", example: "Astronomy distances", tone: "primary" },
];

type MetricPrefixScaleProps = {
  title?: string;
  description?: string;
};

export default function MetricPrefixScale({ title, description }: MetricPrefixScaleProps) {
  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h4 className="text-lg font-semibold">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {prefixes.map((prefix) => (
          <div
            key={prefix.label}
            className="rounded-xl border bg-muted/10 p-4 flex items-center justify-between"
          >
            <div>
              <div className="text-sm font-semibold">{prefix.label}</div>
              <div className="text-xs text-muted-foreground">{prefix.example}</div>
            </div>
            <span
              className={
                prefix.tone === "primary"
                  ? "rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                  : "rounded-full bg-muted/50 px-3 py-1 text-xs font-semibold text-muted-foreground"
              }
            >
              {prefix.power}
            </span>
          </div>
        ))}
      </div>

      <div className="text-xs text-muted-foreground">
        Prefixes scale base units by powers of ten to keep measurements readable.
      </div>
    </div>
  );
}
