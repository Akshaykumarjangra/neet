import { useEffect, useState } from "react";

interface Member { id: number; name: string; minutes: number; attempts: number; }

export default function Squad() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [squadId, setSquadId] = useState<number | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function create() {
    setError(null);
    const r = await fetch("/api/squads", { method: "POST", headers: { "content-type": "application/json" }, credentials: "include", body: JSON.stringify({ name }) });
    const j = await r.json(); if (!r.ok) return setError(j.error);
    setSquadId(j.id); setCode(j.code);
  }
  async function join() {
    setError(null);
    const r = await fetch("/api/squads/join", { method: "POST", headers: { "content-type": "application/json" }, credentials: "include", body: JSON.stringify({ code }) });
    const j = await r.json(); if (!r.ok) return setError(j.error);
    setSquadId(j.id);
  }
  useEffect(() => {
    if (!squadId) return;
    const tick = () => fetch(`/api/squads/${squadId}/leaderboard`, { credentials: "include" }).then(r => r.json()).then(setMembers).catch(() => {});
    tick(); const t = setInterval(tick, 30000); return () => clearInterval(t);
  }, [squadId]);

  if (!squadId) return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Study squads</h1>
      <div className="space-y-2 border rounded p-4">
        <h2 className="font-semibold">Create</h2>
        <input className="border rounded w-full p-2" placeholder="Squad name" value={name} onChange={e => setName(e.target.value)} />
        <button onClick={create} className="px-4 py-2 bg-indigo-600 text-white rounded w-full">Create squad</button>
      </div>
      <div className="space-y-2 border rounded p-4">
        <h2 className="font-semibold">Join</h2>
        <input className="border rounded w-full p-2 uppercase" placeholder="6-char code" value={code} onChange={e => setCode(e.target.value)} />
        <button onClick={join} className="px-4 py-2 bg-indigo-600 text-white rounded w-full">Join</button>
      </div>
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );

  return (
    <div className="p-6 max-w-md mx-auto space-y-3">
      <h1 className="text-2xl font-bold">Squad #{squadId} {code && <span className="text-sm font-mono text-slate-500">· {code}</span>}</h1>
      <table className="w-full text-sm">
        <thead><tr className="text-left text-slate-500"><th>Member</th><th>Min</th><th>Q</th></tr></thead>
        <tbody>{members.map(m => <tr key={m.id} className="border-t"><td className="py-2">{m.name}</td><td>{m.minutes}</td><td>{m.attempts}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
