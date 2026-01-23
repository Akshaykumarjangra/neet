type Step = {
  title: string;
  detail: string;
};

const steps: Step[] = [
  {
    title: "Observation",
    detail: "Notice a pattern or phenomenon in nature.",
  },
  {
    title: "Hypothesis",
    detail: "Propose a testable explanation.",
  },
  {
    title: "Prediction",
    detail: "State what should happen if the hypothesis is correct.",
  },
  {
    title: "Experiment",
    detail: "Design measurements to test the prediction.",
  },
  {
    title: "Analysis",
    detail: "Compare data with the prediction and refine.",
  },
  {
    title: "Conclusion",
    detail: "Accept, revise, or reject the hypothesis.",
  },
];

type ScientificMethodFlowProps = {
  title?: string;
  description?: string;
};

export default function ScientificMethodFlow({
  title,
  description,
}: ScientificMethodFlowProps) {
  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h4 className="text-lg font-semibold">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="rounded-xl border bg-muted/10 p-4">
        <div className="grid gap-3">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-start gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {index + 1}
              </div>
              <div>
                <div className="text-sm font-semibold">{step.title}</div>
                <div className="text-xs text-muted-foreground">{step.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Each step feeds back into the next to improve scientific models.
      </div>
    </div>
  );
}
