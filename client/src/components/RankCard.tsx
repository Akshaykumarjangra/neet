/**
 * Shareable rank card. Renders to PNG client-side via canvas + offers download/share.
 */
import { useEffect, useRef } from "react";

interface Props { name: string; rank: number; streak: number; accuracy: number; code: string; }

export function RankCard({ name, rank, streak, accuracy, code }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const c = ref.current; c.width = 1080; c.height = 1080;
    const ctx = c.getContext("2d")!;
    const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
    grad.addColorStop(0, "#4338ca"); grad.addColorStop(1, "#06b6d4");
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 1080, 1080);
    ctx.fillStyle = "white"; ctx.font = "bold 48px Inter,system-ui"; ctx.fillText("NEETPrep", 60, 100);
    ctx.font = "bold 96px Inter,system-ui"; ctx.fillText(name, 60, 280);
    ctx.font = "32px Inter,system-ui";
    ctx.fillText(`Rank #${rank > 0 ? rank : "-"}`, 60, 420);
    ctx.fillText(`${streak} day streak · ${accuracy}% accuracy`, 60, 480);
    ctx.font = "24px Inter,system-ui"; ctx.fillText(`Use ${code} for ₹100 off`, 60, 980);
  }, [name, rank, streak, accuracy, code]);

  async function share() {
    const c = ref.current!; const blob = await new Promise<Blob>(r => c.toBlob(b => r(b!)));
    if ((navigator as any).share && (navigator as any).canShare?.({ files: [new File([blob], "rank.png", { type: "image/png" })] })) {
      await (navigator as any).share({ files: [new File([blob], "rank.png", { type: "image/png" })], title: "My NEETPrep stats" });
    } else {
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "rank.png"; a.click();
    }
  }
  return (
    <div className="space-y-3">
      <canvas ref={ref} className="w-full max-w-sm rounded-xl shadow" />
      <button onClick={share} className="px-4 py-2 bg-indigo-600 text-white rounded">Share</button>
    </div>
  );
}
