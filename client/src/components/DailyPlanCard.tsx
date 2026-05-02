import { useEffect, useState } from "react";

interface Plan {
  date: string;
  motivation: string;
  questions: { subject: string; ids: number[] }[];
  flashcardsDue: number[];
  weakConcepts: { id: number; name: string; pKnown: number }[];
}

export function DailyPlanCard() {
  const [plan, setPlan] = useState<Plan | null>(null);
  useEffect(() => { fetch("/api/plan/today", { credentials: "include" }).then(r => r.json()).then(setPlan).catch(() => {}); }, []);
  if (!plan) return <div className="rounded-xl border p-4 animate-pulse h-40" />;
  const totalQ = plan.questions.reduce((n, s) => n + s.ids.length, 0);
  return (
    <div className="rounded-xl border p-5 bg-gradient-to-br from-indigo-50 to-white space-y-3">
      <div className="text-xs text-indigo-600 font-semibold">TODAY · {plan.date}</div>
      <div className="text-lg font-medium">{plan.motivation}</div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <Stat label="Questions" value={totalQ} href="/practice" />
        <Stat label="Flashcards" value={plan.flashcardsDue.length} href="/flashcards" />
        <Stat label="Weak topics" value={plan.weakConcepts.length} href="/concepts" />
      </div>
      {plan.weakConcepts[0] && (
        <div className="text-xs text-slate-600">Focus: <b>{plan.weakConcepts[0].name}</b> ({Math.round(plan.weakConcepts[0].pKnown * 100)}%)</div>
      )}
    </div>
  );
}

function Stat({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <a href={href} className="rounded-lg bg-white border p-3 hover:border-indigo-400 transition">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-slate-500">{label}</div>
    </a>
  );
}
