/**
 * 1v1 MCQ Battle WebSocket handler (Phase 3/02). Glicko-2 simplified.
 */
import { WebSocketServer, WebSocket } from "ws";
import { db } from "../db";
import { sql, eq } from "drizzle-orm";
import { userRatings, questions } from "@shared/schema";

interface Player { ws: WebSocket; userId: string; rating: number; rd: number; score: number; }
interface Match { id: string; a: Player; b: Player; questions: any[]; idx: number; startedAt: number; }

const queue: Player[] = [];
const matches = new Map<string, Match>();

export function attachBattleWS(server: any, sessionMiddleware: any) {
  const wss = new WebSocketServer({ server, path: "/ws/battle" });
  wss.on("connection", async (ws, req) => {
    // Authenticate via session instead of query param
    const userId = await new Promise<string | null>((resolve) => {
      const res = { getHeader: () => {}, setHeader: () => {}, writeHead: () => {}, end: () => {} } as any;
      sessionMiddleware(req as any, res, () => resolve((req as any).session?.userId || null));
    });

    if (!userId) {
      ws.close(1008, "Authentication required");
      return;
    }
    
    const [rt] = await db
      .select({ rating: userRatings.rating, rd: userRatings.rd })
      .from(userRatings)
      .where(eq(userRatings.userId, userId))
      .limit(1);

    const playerRating = rt ?? { rating: 1500, rd: 350 };
    const p: Player = { ws, userId, rating: playerRating.rating, rd: playerRating.rd, score: 0 };
    enqueue(p);
    ws.on("close", () => { const i = queue.indexOf(p); if (i >= 0) queue.splice(i, 1); });
    ws.on("message", buf => onMsg(p, JSON.parse(buf.toString())));
  });
}

function enqueue(p: Player) {
  const opp = queue.find(q => Math.abs(q.rating - p.rating) <= 100);
  if (opp) { queue.splice(queue.indexOf(opp), 1); start(opp, p); }
  else { queue.push(p); p.ws.send(JSON.stringify({ type: "queued" })); }
}

async function start(a: Player, b: Player) {
  const qs = await db
    .select()
    .from(questions)
    .orderBy(sql`RANDOM()`)
    .limit(10);

  const mappedQuestions = qs.map(q => ({
    stem: q.questionText,
    options: { a: q.optionA, b: q.optionB, c: q.optionC, d: q.optionD },
    answer: q.correctAnswer
  }));

  const id = `${a.userId}-${b.userId}-${Date.now()}`;
  const m: Match = { id, a, b, questions: mappedQuestions, idx: 0, startedAt: Date.now() };
  matches.set(id, m);
  for (const p of [a, b]) p.ws.send(JSON.stringify({ type: "start", matchId: id, total: 10 }));
  next(m);
}

function next(m: Match) {
  if (m.idx >= m.questions.length) return finish(m);
  const q = m.questions[m.idx];
  const payload = { type: "question", n: m.idx + 1, stem: q.stem, options: q.options, deadlineMs: 30000 };
  m.a.ws.send(JSON.stringify(payload)); m.b.ws.send(JSON.stringify(payload));
  setTimeout(() => { if (matches.has(m.id) && m.idx === payload.n - 1) { m.idx++; next(m); } }, 30100);
}

function onMsg(p: Player, msg: any) {
  if (msg.type !== "answer") return;
  const m = Array.from(matches.values()).find(x => x.a === p || x.b === p);
  if (!m) return;
  const q = m.questions[m.idx]; if (!q || msg.n !== m.idx + 1) return;
  if (msg.answer === q.answer) {
    const speedBonus = Math.max(0, 5 - Math.floor((Date.now() - m.startedAt - m.idx * 30000) / 6000));
    p.score += 10 + speedBonus;
  }
  // both answered → advance
  const oth = p === m.a ? m.b : m.a;
  if ((m as any)._answered?.[m.idx] || msg.n === m.idx + 1) {
    (m as any)._answered = { ...(m as any)._answered, [m.idx]: ((m as any)._answered?.[m.idx] ?? 0) + 1 };
    if ((m as any)._answered[m.idx] >= 2) { m.idx++; next(m); }
  }
}

async function finish(m: Match) {
  matches.delete(m.id);
  const winner = m.a.score === m.b.score ? null : (m.a.score > m.b.score ? m.a : m.b);
  for (const p of [m.a, m.b]) {
    p.ws.send(JSON.stringify({ type: "end", you: p.score, opp: (p === m.a ? m.b : m.a).score, winner: winner?.userId ?? null }));
    p.ws.close();
  }
  const sa = winner === null ? 0.5 : (winner === m.a ? 1 : 0);
  await applyGlicko(m.a, m.b, sa);
  await applyGlicko(m.b, m.a, 1 - sa);
}

async function applyGlicko(p: Player, opp: Player, s: number) {
  const q = Math.log(10) / 400;
  const g = 1 / Math.sqrt(1 + (3 * q * q * opp.rd * opp.rd) / (Math.PI * Math.PI));
  const e = 1 / (1 + Math.pow(10, -g * (p.rating - opp.rating) / 400));
  const d2 = 1 / (q * q * g * g * e * (1 - e));
  const newRating = p.rating + (q / (1 / (p.rd * p.rd) + 1 / d2)) * g * (s - e);
  const newRd = Math.sqrt(1 / (1 / (p.rd * p.rd) + 1 / d2));
  
  await db
    .insert(userRatings)
    .values({
      userId: p.userId,
      rating: newRating,
      rd: newRd,
      lastUpdated: new Date(),
    })
    .onConflictDoUpdate({
      target: [userRatings.userId],
      set: {
        rating: newRating,
        rd: newRd,
        lastUpdated: new Date(),
      },
    });
}
