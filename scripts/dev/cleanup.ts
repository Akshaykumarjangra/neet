/**
 * One-shot cleanup runner. Lists all dev scripts.
 * Usage: tsx scripts/dev/cleanup.ts
 */
console.log("Dev scripts (run via tsx scripts/dev/cli.ts <name>):");
import fs from "node:fs";
const files = fs.readdirSync(__dirname).filter(f => f.endsWith(".ts") && f !== "cli.ts" && f !== "cleanup.ts");
for (const f of files) console.log("  - " + f.replace(/\.ts$/, ""));
