/**
 * Daily ad performance optimizer (Phase 5/08).
 * Pulls 24h spend/ROAS, pauses losers, scales winners.
 * TODO: provide META_ACCESS_TOKEN, GOOGLE_ADS credentials.
 */
const META = process.env.META_ACCESS_TOKEN;
const ACCT = process.env.META_AD_ACCOUNT_ID;

async function main() {
  if (!META || !ACCT) { console.warn("[ads-opt] missing META_ACCESS_TOKEN/META_AD_ACCOUNT_ID; skipping"); return; }
  const r = await fetch(`https://graph.facebook.com/v19.0/act_${ACCT}/insights?fields=ad_id,spend,ctr,cpm,actions&date_preset=yesterday&access_token=${META}`);
  const j = await r.json() as any;
  for (const row of j?.data ?? []) {
    const ctr = Number(row.ctr ?? 0); const cpm = Number(row.cpm ?? 0);
    if (ctr < 0.8 || cpm > 400) await setStatus(row.ad_id, "PAUSED");
    else if (ctr > 2.5) await scaleBudget(row.ad_id, 1.2);
  }
}

async function setStatus(adId: string, status: string) {
  await fetch(`https://graph.facebook.com/v19.0/${adId}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status, access_token: META }),
  });
  console.log(`  ${adId}: ${status}`);
}

async function scaleBudget(adId: string, mult: number) {
  const r = await fetch(`https://graph.facebook.com/v19.0/${adId}?fields=adset{id,daily_budget}&access_token=${META}`);
  const j = await r.json() as any;

  if (!j?.adset?.id || !j?.adset?.daily_budget) {
    console.warn(`  ${adId}: could not read adset or daily_budget`, j);
    return;
  }

  const adsetId = j.adset.id;
  const currentBudget = Number(j.adset.daily_budget);
  const newBudget = Math.round(currentBudget * mult);

  await fetch(`https://graph.facebook.com/v19.0/${adsetId}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ daily_budget: newBudget, access_token: META }),
  });

  console.log(`  ${adId}: scaled budget from ${currentBudget} to ${newBudget} (adset: ${adsetId})`);
}

main().catch(e => { console.error(e); process.exit(1); });
