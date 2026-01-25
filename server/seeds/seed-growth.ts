
import { db } from "../db";
import { leadMagnets, upgradingPopups } from "@shared/schema";

async function seedGrowth() {
    console.log("Seeding growth features...");

    try {
        // 1. Seed Lead Magnets
        const magnets = [
            {
                title: "NEET 2024 Physics Formula Sheet",
                description: "All critical formulas for NEET Physics in one high-res PDF. Includes tips for fast calculation.",
                type: "cheatsheet",
                contentUrl: "https://example.com/neet-physics-formulas.pdf",
                thumbnailUrl: "https://images.unsplash.com/photo-1636466484565-f42222a932c1?auto=format&fit=crop&q=80&w=400",
                callToAction: "Get Free PDF",
                isActive: true,
                slug: "neet-physics-formulas",
            },
            {
                title: "Ultimate Bio-Digests (NCERT X-Ray)",
                description: "Condensed diagrams and mnemonics for the entire NCERT Biology syllabus.",
                type: "pdf",
                contentUrl: "https://example.com/biology-digest.pdf",
                thumbnailUrl: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=400",
                callToAction: "Download Now",
                isActive: true,
                slug: "biology-ncert-digest",
            }
        ];

        for (const magnet of magnets) {
            await db.insert(leadMagnets).values(magnet as any).onConflictDoUpdate({
                target: leadMagnets.slug,
                set: magnet
            });
            console.log(`Seeded magnet: ${magnet.title}`);
        }

        // 2. Seed Upgrading Popups
        const popups = [
            {
                title: "Limited Time Offer: Get 30% Off!",
                content: "Don't miss out on your chance to crack NEET with the Elite Topper plan. Get 1:1 mentorship and custom roadmaps today.",
                ctaText: "Upgrade Now",
                ctaLink: "/pricing",
                imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600",
                triggerType: "timer",
                triggerValue: { seconds: 30 },
                targetPages: ["/dashboard"],
                isActive: true,
                displayPriority: 10,
            },
            {
                title: "Unlock All 50,000 Questions",
                content: "You've been practicing hard! Upgrade to Pro Mentor to unlock our full question bank and advanced analytics.",
                ctaText: "View Plans",
                ctaLink: "/pricing",
                imageUrl: "https://images.unsplash.com/photo-1576400623238-d7e7c95b77ee?auto=format&fit=crop&q=80&w=600",
                triggerType: "exit-intent",
                triggerValue: {},
                targetPages: ["/practice"],
                isActive: true,
                displayPriority: 5,
            }
        ];

        for (const popup of popups) {
            await db.insert(upgradingPopups).values(popup as any);
            console.log(`Seeded popup: ${popup.title}`);
        }

        console.log("Growth features seeded successfully");
    } catch (error) {
        console.error("Error seeding growth features:", error);
    } finally {
        process.exit(0);
    }
}

seedGrowth();
