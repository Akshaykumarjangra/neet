
import { Router } from "express";
import { db } from "./db";
import { leadMagnets, userLeads, upgradingPopups, insertUserLeadSchema } from "@shared/schema";
import { eq, and } from "drizzle-orm";

const router = Router();

// Get active lead magnets
router.get("/lead-magnets", async (req, res) => {
    try {
        const activeMagnets = await db
            .select()
            .from(leadMagnets)
            .where(eq(leadMagnets.isActive, true));
        res.json(activeMagnets);
    } catch (error) {
        console.error("Error fetching lead magnets:", error);
        res.status(500).json({ error: "Failed to fetch lead magnets" });
    }
});

// Capture a lead
router.post("/capture-lead", async (req, res) => {
    try {
        const validated = insertUserLeadSchema.parse(req.body);
        const [lead] = await db
            .insert(userLeads)
            .values({
                ...validated,
                userId: (req as any).session?.userId || null,
                createdAt: new Date(),
            })
            .returning();
        res.json(lead);
    } catch (error: any) {
        console.error("Error capturing lead:", error);
        res.status(400).json({ error: error.message || "Failed to capture lead" });
    }
});

// Get upgrading popups for a specific page
router.get("/popups", async (req, res) => {
    try {
        const page = req.query.page as string;
        const allPopups = await db
            .select()
            .from(upgradingPopups)
            .where(eq(upgradingPopups.isActive, true));

        // Filter by page if provided
        const filtered = page
            ? allPopups.filter(p => !p.targetPages || p.targetPages.length === 0 || p.targetPages.includes(page))
            : allPopups;

        res.json(filtered.sort((a, b) => b.displayPriority - a.displayPriority));
    } catch (error) {
        console.error("Error fetching popups:", error);
        res.status(500).json({ error: "Failed to fetch popups" });
    }
});

export default router;
