type TimelineEvent = {
  year: string;
  title: string;
  detail: string;
};

const events: TimelineEvent[] = [
  {
    year: "1600",
    title: "Galileo and experimental physics",
    detail: "Careful measurements of motion challenged Aristotelian ideas.",
  },
  {
    year: "1687",
    title: "Newton's laws and gravitation",
    detail: "Unified terrestrial and celestial mechanics in one framework.",
  },
  {
    year: "1865",
    title: "Maxwell unifies electricity and magnetism",
    detail: "Electromagnetism emerges as a single force with waves.",
  },
  {
    year: "1900",
    title: "Planck and quantum theory",
    detail: "Energy is quantized to explain blackbody radiation.",
  },
  {
    year: "1905-1916",
    title: "Einstein's relativity",
    detail: "Reframed space, time, and gravity as geometry.",
  },
  {
    year: "1926",
    title: "Quantum mechanics matures",
    detail: "Wave mechanics and matrix theory explain atomic behavior.",
  },
  {
    year: "1967",
    title: "Electroweak unification",
    detail: "Weak and electromagnetic forces combine in one theory.",
  },
  {
    year: "2012",
    title: "Higgs boson discovery",
    detail: "Confirmed the mechanism giving particles mass.",
  },
];

type PhysicsDiscoveriesTimelineProps = {
  title?: string;
  description?: string;
};

export default function PhysicsDiscoveriesTimeline({
  title,
  description,
}: PhysicsDiscoveriesTimelineProps) {
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
          {events.map((event) => (
            <div key={event.year} className="relative pl-10">
              <div className="absolute left-4 top-1.5 h-3 w-3 rounded-full bg-primary" aria-hidden />
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {event.year}
              </div>
              <div className="text-base font-semibold">{event.title}</div>
              <div className="text-sm text-muted-foreground">{event.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Timeline highlights milestone ideas that shaped modern physics. Dates are approximate.
      </div>
    </div>
  );
}
