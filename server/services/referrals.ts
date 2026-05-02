/**
 * Referrals — varchar user IDs.
 */
import { db } from "../db";
import { sql } from "drizzle-orm";
import { customAlphabet } from "nanoid";

const code = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 6);

export async function ensureCode(userId: string): Promise<string> {
  const r = await db.execute(sql`SELECT referral_code FROM users WHERE id = ${userId}`);
  const existing = (r as any).rows?.[0]?.referral_code;
  if (existing) return existing;
  let attempts = 0;
  while (attempts++ < 5) {
    const c = code();
    try {
      await db.execute(sql`UPDATE users SET referral_code = ${c} WHERE id = ${userId}`);
      return c;
    } catch { /* unique violation, retry */ }
  }
  throw new Error("could not generate code");
}

export async function applyCode(refereeId: string, codeStr: string) {
  const r = await db.execute(sql`SELECT id FROM users WHERE referral_code = ${codeStr.toUpperCase()}`);
  const refId = (r as any).rows?.[0]?.id as string | undefined;
  if (!refId || refId === refereeId) return false;
  await db.execute(sql`
    INSERT INTO referrals (referrer_id, referee_id, status) VALUES (${refId}, ${refereeId}, 'pending')
    ON CONFLICT (referee_id) DO NOTHING
  `);
  return true;
}

export async function onSubscribed(refereeId: string) {
  const r = await db.execute(sql`
    SELECT referrer_id FROM referrals WHERE referee_id = ${refereeId} AND status = 'pending'
  `);
  const refId = (r as any).rows?.[0]?.referrer_id as string | undefined;
  if (!refId) return;
  await db.execute(sql`UPDATE referrals SET status = 'credited', credited_at = now() WHERE referee_id = ${refereeId}`);
  for (const uid of [refId, refereeId]) {
    await db.execute(sql`
      INSERT INTO wallets (user_id, balance) VALUES (${uid}, 100)
      ON CONFLICT (user_id) DO UPDATE SET balance = wallets.balance + 100
    `);
  }
}
