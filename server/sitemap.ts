import { Router } from "express";
import { db } from "./db";
import { contentTopics, chapterContent } from "@shared/schema";
import { sql, eq } from "drizzle-orm";

type SitemapEntry = { url: string; priority: string; changefreq: string; lastmod?: string };

const router = Router();

// Generate sitemap.xml
router.get("/sitemap.xml", async (req, res) => {
    try {
        const baseUrl = process.env.BASE_URL || "https://neet.zeroai.org.in";

        // Static pages
        const staticPages: SitemapEntry[] = [
            { url: "/", priority: "1.0", changefreq: "daily" },
            { url: "/practice", priority: "0.9", changefreq: "daily" },
            { url: "/mock-tests", priority: "0.9", changefreq: "weekly" },
            { url: "/library", priority: "0.8", changefreq: "weekly" },
            { url: "/flashcards", priority: "0.8", changefreq: "weekly" },
            { url: "/mentors", priority: "0.7", changefreq: "weekly" },
            { url: "/pricing", priority: "0.7", changefreq: "monthly" },
            { url: "/biology", priority: "0.8", changefreq: "weekly" },
            { url: "/physics", priority: "0.8", changefreq: "weekly" },
            { url: "/chemistry", priority: "0.8", changefreq: "weekly" },
            { url: "/simulations", priority: "0.9", changefreq: "weekly" },
            { url: "/videos", priority: "0.9", changefreq: "weekly" },
            { url: "/neet-blast", priority: "0.8", changefreq: "daily" },
            { url: "/guide", priority: "0.8", changefreq: "monthly" },
            { url: "/neet-faq", priority: "0.6", changefreq: "monthly" },
            { url: "/neet-cutoff", priority: "0.8", changefreq: "weekly" },
            { url: "/pyq-analysis", priority: "0.8", changefreq: "weekly" },
            { url: "/syllabus", priority: "0.8", changefreq: "weekly" },
            { url: "/medical-colleges", priority: "0.8", changefreq: "weekly" },
            { url: "/neet-rank-predictor", priority: "0.8", changefreq: "weekly" },
            { url: "/syllabus-weightage", priority: "0.8", changefreq: "weekly" },
            { url: "/best-books-neet", priority: "0.8", changefreq: "monthly" },
            { url: "/neet-eligibility-criteria", priority: "0.8", changefreq: "monthly" },
            { url: "/neet-exam-pattern", priority: "0.8", changefreq: "monthly" },
            { url: "/neet-application-form", priority: "0.8", changefreq: "monthly" },
            { url: "/neet-counselling", priority: "0.8", changefreq: "monthly" },
            { url: "/neet-admit-card", priority: "0.8", changefreq: "monthly" },
            { url: "/terms", priority: "0.4", changefreq: "monthly" },
            { url: "/privacy", priority: "0.4", changefreq: "monthly" },
            { url: "/about", priority: "0.6", changefreq: "monthly" },
            { url: "/contact", priority: "0.6", changefreq: "monthly" },
            { url: "/help", priority: "0.6", changefreq: "monthly" },
        ];

        // 1. Fetch Chapters from DB
        let chapterUrls: SitemapEntry[] = [];
        try {
            const chapters = await db.query.chapterContent.findMany({
                where: eq(chapterContent.status, "published"),
                columns: {
                    subject: true,
                    classLevel: true,
                    chapterNumber: true,
                    updatedAt: true
                }
            });
            chapterUrls = chapters.map((row) => ({
                url: `/chapter/${encodeURIComponent(row.subject.toLowerCase())}/${encodeURIComponent(row.classLevel)}/${row.chapterNumber}`,
                priority: "0.8",
                changefreq: "weekly",
                lastmod: row.updatedAt ? new Date(row.updatedAt).toISOString().split('T')[0] : undefined
            }));
        } catch (e) {
            console.error("Sitemap: Failed to fetch chapters", e);
        }

        // 2. Fetch Topics from DB (as practice landing pages)
        let topicUrls: SitemapEntry[] = [];
        try {
            // Increase limit to cover all topics for better SEO indexability
            const topics = await db.query.contentTopics.findMany({
                limit: 5000,
                columns: {
                    id: true,
                    topicName: true
                }
            });
            topicUrls = topics.map((row) => ({
                url: `/practice?topicId=${row.id}`,
                priority: "0.6",
                changefreq: "monthly"
            }));
        } catch (e) {
            console.error("Sitemap: Failed to fetch topics", e);
        }

        // 3. Add static articles (from client/public/articles)
        const articles = [
            "analyze-mock-tests", "animal-kingdom-tricks", "best-books-neet-biology", 
            "best-books-neet-chemistry", "best-books-neet-physics", "biology-chapter-weightage",
            "chemical-bonding-vsepr", "chemical-equilibrium-shortcuts", "chemistry-chapter-weightage",
            "class-11-neet-strategy", "class-12-neet-strategy", "coordination-compounds-naming",
            "dropper-strategy-neet", "electrostatics-revision", "genetics-simplified",
            "how-to-score-650-plus-neet", "human-physiology-diagrams", "importance-of-mock-tests",
            "last-month-revision-neet", "mistake-notebook-strategy", "morphology-plants-mnemonics",
            "neet-2026-roadmap", "neet-motivation-guide", "neet-vs-jee-physics",
            "organic-chemistry-reactions", "periodic-table-trends", "physics-chapter-weightage",
            "physics-formula-sheet", "ray-optics-formulas", "thermodynamics-concepts"
        ];
        const articleUrls: SitemapEntry[] = articles.map(slug => ({
            url: `/articles/${slug}.html`,
            priority: "0.5",
            changefreq: "monthly"
        }));

        // Combine all URLs
        const allUrls: SitemapEntry[] = [...staticPages, ...chapterUrls, ...topicUrls, ...articleUrls];

        // Generate XML
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        for (const page of allUrls) {
            xml += "  <url>\n";
            xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
            if (page.lastmod) {
                xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
            }
            xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
            xml += `    <priority>${page.priority}</priority>\n`;
            xml += "  </url>\n";
        }

        xml += "</urlset>";

        res.header("Content-Type", "application/xml");
        res.send(xml);
    } catch (error) {
        console.error("Error generating sitemap:", error);
        res.status(500).send("Error generating sitemap");
    }
});

export default router;
