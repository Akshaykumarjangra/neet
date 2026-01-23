type CheckItem = {
  equation: string;
  leftDim: string;
  rightDim: string;
  result: "Valid" | "Invalid";
  note: string;
};

const checks: CheckItem[] = [
  {
    equation: "v = u + at",
    leftDim: "[L T^-1]",
    rightDim: "[L T^-1]",
    result: "Valid",
    note: "Both u and at have velocity dimension.",
  },
  {
    equation: "s = ut + 1/2 at^2",
    leftDim: "[L]",
    rightDim: "[L]",
    result: "Valid",
    note: "Each term has length dimension.",
  },
  {
    equation: "s = vt + 1/2 at",
    leftDim: "[L]",
    rightDim: "[L] + [L T^-1]",
    result: "Invalid",
    note: "The last term has velocity dimension, so it cannot add to length.",
  },
  {
    equation: "P = F/A",
    leftDim: "[M L^-1 T^-2]",
    rightDim: "[M L^-1 T^-2]",
    result: "Valid",
    note: "Pressure dimensions match force per area.",
  },
];

type DimensionalAnalysisCheckerProps = {
  title?: string;
  description?: string;
};

export default function DimensionalAnalysisChecker({
  title,
  description,
}: DimensionalAnalysisCheckerProps) {
  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h4 className="text-lg font-semibold">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="space-y-3">
        {checks.map((item) => (
          <div key={item.equation} className="rounded-xl border bg-muted/10 p-4 space-y-2">
            <div className="text-sm font-semibold">{item.equation}</div>
            <div className="text-xs text-muted-foreground">
              LHS: {item.leftDim} | RHS: {item.rightDim}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span
                className={
                  item.result === "Valid"
                    ? "rounded-full bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-600"
                    : "rounded-full bg-rose-500/10 px-2 py-0.5 font-semibold text-rose-600"
                }
              >
                {item.result}
              </span>
              <span className="text-muted-foreground">{item.note}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-muted-foreground">
        Use dimensional checks to quickly verify or reject a formula before solving.
      </div>
    </div>
  );
}
