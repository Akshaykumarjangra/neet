/**
 * 1v1 MCQ Battle UI (Phase 3/02). Connects to /ws/battle.
 */
import { useEffect, useRef, useState } from "react";

type Msg =
  | { type: "queued" }
  | { type: "start"; matchId: string; total: number }
  | { type: "question"; n: number; stem: string; options: any; deadlineMs: number }
  | { type: "end"; you: number; opp: number; winner: number | null };

export default function Battle({ userId }: { userId: number }) {
  const [state, setState] = useState<Msg | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  function start() {
    const proto = location.protocol === "https:" ? "wss" : "ws";
    const w = new WebSocket(`${proto}://${location.host}/ws/battle?uid=${userId}`);
    ws.current = w;
    w.onmessage = e => { setState(JSON.parse(e.data)); setPicked(null); };
    w.onclose = () => setState(s => s?.type === "end" ? s : null);
  }

  useEffect(() => () => ws.current?.close(), []);

  if (!state) return <div className="p-6"><button onClick={start} className="px-6 py-3 bg-indigo-600 text-white rounded-lg">Find a match</button></div>;
  if (state.type === "queued") return <div className="p-6">Waiting for opponent…</div>;
  if (state.type === "start") return <div className="p-6">Match found! {state.total} questions.</div>;
  if (state.type === "question") return (
    <div className="p-6 space-y-4">
      <div className="text-sm text-slate-500">Question {state.n}</div>
      <div className="text-lg">{state.stem}</div>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(state.options).map(([k, v]) => (
          <button key={k} disabled={!!picked}
            onClick={() => { setPicked(k); ws.current?.send(JSON.stringify({ type: "answer", n: state.n, answer: k })); }}
            className={`p-3 border rounded text-left ${picked === k ? "bg-indigo-100 border-indigo-500" : ""}`}>
            <b>{k}.</b> {String(v)}
          </button>
        ))}
      </div>
    </div>
  );
  return (
    <div className="p-6 text-center space-y-3">
      <div className="text-3xl font-bold">{state.winner === userId ? "You won 🏆" : state.winner === null ? "Draw" : "GG"}</div>
      <div>You: {state.you} · Opponent: {state.opp}</div>
      <button onClick={start} className="px-4 py-2 bg-indigo-600 text-white rounded">Rematch</button>
    </div>
  );
}
