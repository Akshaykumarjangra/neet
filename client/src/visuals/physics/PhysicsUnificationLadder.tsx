import { Badge } from "@/components/ui/badge";

type Step = {
  id: string;
  title: string;
  detail: string;
  status: "achieved" | "goal";
  year: string;
};

const steps: Step[] = [
  {
    id: "newton",
    title: "Newtonian Gravitation",
    detail: "Unified motion on Earth and in the heavens under one law of gravity.",
    status: "achieved",
    year: "1687",
  },
  {
    id: "maxwell",
    title: "Electromagnetism",
    detail: "Electricity and magnetism combined into a single field theory.",
    status: "achieved",
    year: "1865",
  },
  {
    id: "electroweak",
    title: "Electroweak Theory",
    detail: "Electromagnetic and weak interactions unified at high energy.",
    status: "achieved",
    year: "1967",
  },
  {
    id: "gut",
    title: "Grand Unification",
    detail: "Goal: combine strong force with the electroweak interaction.",
    status: "goal",
    year: "Future",
  },
  {
    id: "quantum-gravity",
    title: "Quantum Gravity",
    detail: "Goal: merge gravity with quantum physics.",
    status: "goal",
    year: "Future",
  },
];

const statusLabel: Record<Step["status"], string> = {
  achieved: "Achieved",
  goal: "Goal",
};

type PhysicsUnificationLadderProps = {
  title?: string;
  description?: string;
};

export default function PhysicsUnificationLadder({
  title,
  description,
}: PhysicsUnificationLadderProps) {
  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h4 className="text-lg font-semibold">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="relative rounded-xl border bg-muted/10 p-4">
        <div className="absolute left-6 top-6 bottom-6 w-px bg-border" aria-hidden />
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.id} className="relative pl-10">
              <div className="absolute left-4 top-2 h-3 w-3 rounded-full bg-primary" aria-hidden />
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {step.year}
                </span>
                <Badge variant={step.status === "achieved" ? "default" : "secondary"} className="text-xs">
                  {statusLabel[step.status]}
                </Badge>
              </div>
              <div className="text-base font-semibold">{step.title}</div>
              <div className="text-sm text-muted-foreground">{step.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Unification connects many physical laws into fewer, deeper principles.
      </div>
    </div>
  );
}
