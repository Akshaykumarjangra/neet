/**
 * 1-click restore from backup (Phase 7/05).
 * Usage: tsx scripts/ops/restore.ts <backup-file.sql.gz> <target-db-url>
 */
import { execSync } from "node:child_process";
import fs from "node:fs";

async function main() {
  const [, , file, target] = process.argv;
  if (!file || !target) { console.error("usage: restore <file.sql.gz> <postgres://…>"); process.exit(1); }
  if (!fs.existsSync(file)) throw new Error(`missing: ${file}`);
  const dec = file.endsWith(".gz") ? `gunzip -c "${file}"` : `cat "${file}"`;
  console.log(`[restore] applying ${file} → ${target.replace(/:[^:@]+@/, ":***@")}`);
  execSync(`${dec} | psql "${target}"`, { stdio: "inherit" });
  console.log("[restore] done. Verify row counts before pointing app at this DB.");
}
main().catch(e => { console.error(e); process.exit(1); });
