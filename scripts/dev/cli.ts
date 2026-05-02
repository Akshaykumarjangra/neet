/**
 * Dev script runner. Usage: tsx scripts/dev/cli.ts <name>
 * Available scripts are anything in scripts/dev/*.ts (excluding cli.ts itself).
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const here = __dirname;
const cmd = process.argv[2];
const all = fs.readdirSync(here)
  .filter(f => f.endsWith(".ts") && f !== "cli.ts")
  .map(f => f.replace(/\.ts$/, ""));

if (!cmd || cmd === "list" || cmd === "--help") {
  console.log("dev scripts:");
  for (const s of all) console.log("  " + s);
  process.exit(0);
}
if (!all.includes(cmd)) { console.error(`unknown: ${cmd}\nrun: tsx scripts/dev/cli.ts list`); process.exit(1); }
execSync(`tsx ${path.join(here, cmd)}.ts ${process.argv.slice(3).join(" ")}`, { stdio: "inherit" });
