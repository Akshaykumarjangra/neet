/**
 * Exam-day coach (Phase 6/02). Timer, OMR sim, breathing widget, anti-cheat.
 */
import { useEffect, useRef, useState } from "react";
import { AntiCheat } from "@/lib/anti-cheat";

const SECTIONS = [
  { name: "Physics", q: 50, secPerQ: 60 },
  { name: "Chemistry", q: 50, secPerQ: 50 },
  { name: "Biology", q: 100, secPerQ: 45 },
];
const TOTAL_Q = SECTIONS.reduce((n, s) => n + s.q, 0);
const TOTAL_SEC = 200 * 60;

export default function ExamDay() {
  const [secLeft, setSecLeft] = useState(TOTAL_SEC);
  const [answers, setAnswers] = useState<Record<number, "a" | "b" | "c" | "d">>({});
  const [breathing, setBreathing] = useState(false);
  const [flags, setFlags] = useState({ blur: 0, fsExit: false });
  const ac = useRef<AntiCheat | null>(null);

  useEffect(() => {
    ac.current = new AntiCheat({
      onBlur: c => setFlags(f => ({ ...f, blur: c })),
      onFullscreenExit: () => setFlags(f => ({ ...f, fsExit: true })),
    });
    ac.current.start();
    const t = setInterval(() => setSecLeft(s => Math.max(0, s - 1)), 1000);
    return () => { clearInterval(t); ac.current?.stop(); };
  }, []);

  const mm = String(Math.floor(secLeft / 60)).padStart(2, "0");
  const ss = String(secLeft % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 bg-white border-b px-6 py-3 flex justify-between items-center">
        <div className="font-mono text-2xl">{mm}:{ss}</div>
        <div className="text-sm">Answered: {Object.keys(answers).length}/{TOTAL_Q} · Flags: {flags.blur}{flags.fsExit ? " · fs-exit" : ""}</div>
        <button onClick={() => setBreathing(b => !b)} className="text-sm px-3 py-1 border rounded">{breathing ? "Resume" : "Breathe"}</button>
      </div>
      {breathing && <Breathing onDone={() => setBreathing(false)} />}
      {!breathing && (
        <div className="p-6 grid grid-cols-10 gap-2">
          {Array.from({ length: TOTAL_Q }, (_, i) => i + 1).map(n => (
            <Bubble key={n} n={n} val={answers[n]} onPick={(v) => setAnswers(a => ({ ...a, [n]: v }))} />
          ))}
        </div>
      )}
    </div>
  );
}

function Bubble({ n, val, onPick }: { n: number; val?: string; onPick: (v: any) => void }) {
  return (
    <div className="bg-white border rounded p-2 text-xs">
      <div className="font-semibold">{n}</div>
      <div className="flex gap-1">
        {(["a", "b", "c", "d"] as const).map(o => (
          <button key={o} onClick={() => onPick(o)} className={`w-5 h-5 rounded-full border ${val === o ? "bg-slate-900 text-white" : ""}`}>{o}</button>
        ))}
      </div>
    </div>
  );
}

function Breathing({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  useEffect(() => {
    const seq: ("in" | "hold" | "out")[] = ["in", "hold", "out"]; const dur = [4000, 7000, 8000];
    let i = 0;
    const tick = () => { setPhase(seq[i]); i = (i + 1) % 3; };
    tick(); const t = setInterval(tick, dur[0] + dur[1] + dur[2]);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-4">
      <div className={`w-40 h-40 rounded-full bg-indigo-300 transition-transform duration-[4000ms] ${phase === "in" ? "scale-150" : phase === "out" ? "scale-50" : "scale-100"}`} />
      <div className="text-xl">{phase === "in" ? "Breathe in" : phase === "hold" ? "Hold" : "Breathe out"}</div>
      <button onClick={onDone} className="text-sm underline">Back to test</button>
    </div>
  );
}
