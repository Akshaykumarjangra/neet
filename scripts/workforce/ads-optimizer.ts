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
  const r1 = await fetch(`https://graph.facebook.com/v19.0/${adId}?fields=adset_id&access_token=${META}`);
  const j1 = await r1.json() as any;
  const adsetId = j1?.adset_id;
  if (!adsetId) {
    console.warn(`  ${adId}: failed to fetch adset_id`);
    return;
  }

  const r2 = await fetch(`https://graph.facebook.com/v19.0/${adsetId}?fields=daily_budget&access_token=${META}`);
  const j2 = await r2.json() as any;
  const currentBudget = Number(j2?.daily_budget);
  if (!currentBudget || isNaN(currentBudget)) {
    console.warn(`  ${adId} (adset ${adsetId}): failed to fetch daily_budget`);
    return;
  }

  const newBudget = Math.round(currentBudget * mult);

  const r3 = await fetch(`https://graph.facebook.com/v19.0/${adsetId}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ daily_budget: newBudget, access_token: META }),
  });

  if (r3.ok) {
    console.log(`  ${adId} (adset ${adsetId}): scaled budget ${mult}x (${currentBudget} -> ${newBudget})`);
  } else {
    const error = await r3.text();
    console.error(`  ${adId} (adset ${adsetId}): failed to scale budget`, error);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
