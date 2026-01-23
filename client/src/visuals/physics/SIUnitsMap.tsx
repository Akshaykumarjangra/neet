type UnitRow = {
  quantity: string;
  symbol: string;
  unit: string;
  unitSymbol: string;
  example: string;
};

const baseUnits: UnitRow[] = [
  { quantity: "Length", symbol: "L", unit: "meter", unitSymbol: "m", example: "Distance, size" },
  { quantity: "Mass", symbol: "M", unit: "kilogram", unitSymbol: "kg", example: "Amount of matter" },
  { quantity: "Time", symbol: "T", unit: "second", unitSymbol: "s", example: "Duration" },
  { quantity: "Electric current", symbol: "I", unit: "ampere", unitSymbol: "A", example: "Charge flow" },
  { quantity: "Temperature", symbol: "Theta", unit: "kelvin", unitSymbol: "K", example: "Thermal state" },
  { quantity: "Amount of substance", symbol: "N", unit: "mole", unitSymbol: "mol", example: "Number of particles" },
  { quantity: "Luminous intensity", symbol: "J", unit: "candela", unitSymbol: "cd", example: "Light intensity" },
];

type SIUnitsMapProps = {
  title?: string;
  description?: string;
};

export default function SIUnitsMap({ title, description }: SIUnitsMapProps) {
  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h4 className="text-lg font-semibold">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border bg-muted/10">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Quantity</th>
              <th className="px-4 py-3 text-left">Symbol</th>
              <th className="px-4 py-3 text-left">SI Unit</th>
              <th className="px-4 py-3 text-left">Unit Symbol</th>
              <th className="px-4 py-3 text-left">Use</th>
            </tr>
          </thead>
          <tbody>
            {baseUnits.map((row) => (
              <tr key={row.quantity} className="border-t">
                <td className="px-4 py-3 font-medium">{row.quantity}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.symbol}</td>
                <td className="px-4 py-3">{row.unit}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.unitSymbol}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-muted-foreground">
        Base units form the foundation for all derived quantities in physics.
      </div>
    </div>
  );
}
