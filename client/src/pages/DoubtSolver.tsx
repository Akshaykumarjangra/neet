import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function DoubtSolver() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  function pickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => setImage(r.result as string);
    r.readAsDataURL(f);
  }

  async function submit() {
    setBusy(true); setError(null); setResult(null);
    try {
      const r = await fetch("/api/ai/doubt", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text, imageBase64: image }),
      });
      if (!r.ok) throw new Error((await r.json()).error ?? r.statusText);
      setResult(await r.json());
    } catch (e: any) { setError(e.message); }
    finally { setBusy(false); }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">AI Doubt Solver</h1>
      <textarea className="w-full border rounded p-3 min-h-32" placeholder="Type your doubt or paste a question…"
                value={text} onChange={e => setText(e.target.value)} />
      <input type="file" accept="image/*" onChange={pickImage} />
      {image && <img src={image} alt="" className="max-h-64 rounded border" />}
      <button onClick={submit} disabled={busy || (!text && !image)}
              className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50">
        {busy ? "Thinking…" : "Solve"}
      </button>
      {error && <div className="text-red-600">{error}</div>}
      {result && (
        <div className="prose mt-4 border-t pt-4">
          <h2>Answer</h2>
          <ReactMarkdown>{result.explanation ?? ""}</ReactMarkdown>
          {result.steps?.length > 0 && (<><h3>Steps</h3><ol>{result.steps.map((s: string, i: number) => <li key={i}>{s}</li>)}</ol></>)}
          {result.chapters?.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-4">
              {result.chapters.map((c: any) => (
                <a key={c.id} href={`/${c.subject}/${c.chapter_number}`} className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm">{c.title}</a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
