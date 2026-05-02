import { useEffect, useRef, useState } from "react";

interface Node { id: string; name: string; chapter: string; pKnown?: number; }
interface Edge { from: string; to: string; }

export default function ConceptMap() {
  const [data, setData] = useState<{ concepts: Node[]; edges: Edge[] } | null>(null);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    fetch("/api/concepts/graph", { credentials: "include" }).then(r => r.json()).then(setData).catch(() => {});
  }, []);

  useEffect(() => {
    if (!data || !ref.current) return;
    const c = ref.current; const ctx = c.getContext("2d")!;
    const W = c.width = c.clientWidth; const H = c.height = c.clientHeight;
    const nodes = data.concepts.map((n, i) => ({ ...n, x: (W / 2) + Math.cos(i * 0.4) * (50 + i * 4), y: (H / 2) + Math.sin(i * 0.4) * (50 + i * 4) }));
    const idMap = new Map(nodes.map(n => [n.id, n]));
    function color(p?: number) { if (p === undefined) return "#94a3b8"; const r = Math.round(255 * (1 - p)), g = Math.round(180 * p); return `rgb(${r},${g},80)`; }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "#cbd5e1"; for (const e of data!.edges) {
        const a = idMap.get(e.from), b = idMap.get(e.to); if (!a || !b) continue;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      for (const n of nodes) {
        ctx.fillStyle = color(n.pKnown);
        ctx.beginPath(); ctx.arc(n.x, n.y, 6, 0, Math.PI * 2); ctx.fill();
      }
    }
    draw();
  }, [data]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Your concept map</h1>
      <p className="text-sm text-slate-600 mb-4">Red = weak · Yellow = medium · Green = mastered</p>
      <canvas ref={ref} className="w-full h-[600px] rounded-xl border bg-white" />
    </div>
  );
}
