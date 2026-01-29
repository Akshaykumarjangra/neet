
import { db } from "../server/db";
import { leadMagnets, upgradingPopups } from "@shared/schema";

async function main() {
    console.log("Listing ALL LeadMagnets and Popups...");
    try {
        const magnets = await db.select().from(leadMagnets);
        console.log("All LeadMagnets:", JSON.stringify(magnets, null, 2));

        const popups = await db.select().from(upgradingPopups);
        console.log("All Popups:", JSON.stringify(popups, null, 2));
    } catch (e) {
        console.error("Error querying DB:", e);
    }
}

main().then(() => process.exit(0)).catch(e => {
    console.error(e);
    process.exit(1);
});
