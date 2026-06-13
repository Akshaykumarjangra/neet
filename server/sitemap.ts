import { Router } from "express";
import { db } from "./db";
import { contentTopics, chapterContent } from "@shared/schema";
import { sql, eq } from "drizzle-orm";

type SitemapEntry = { url: string; priority: string; changefreq: string; lastmod?: string };

const router = Router();

let sitemapCache: { xml: string; expiresAt: number } | null = null;
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

// Generate sitemap.xml
router.get("/sitemap.xml", async (req, res) => {
    try {
        const now = Date.now();
        if (sitemapCache && sitemapCache.expiresAt > now) {
            res.header("Content-Type", "application/xml");
            return res.send(sitemapCache.xml);
        }

        const baseUrl = process.env.BASE_URL || "https://neet.zeroai.org.in";

        const today = new Date().toISOString().split('T')[0];

        // Static pages — ONLY pages accessible WITHOUT authentication
        const staticPages: SitemapEntry[] = [
            { url: "/", priority: "1.0", changefreq: "daily", lastmod: today },
            { url: "/pricing", priority: "0.8", changefreq: "monthly", lastmod: today },
            { url: "/mentors", priority: "0.7", changefreq: "weekly", lastmod: today },
            { url: "/explain", priority: "0.8", changefreq: "weekly", lastmod: today },
            { url: "/simulations", priority: "0.8", changefreq: "weekly", lastmod: today },
            { url: "/videos", priority: "0.8", changefreq: "weekly", lastmod: today },
            { url: "/mock-tests", priority: "0.8", changefreq: "weekly", lastmod: today },
            { url: "/community", priority: "0.7", changefreq: "daily", lastmod: today },
            { url: "/question-bank", priority: "0.8", changefreq: "weekly", lastmod: today },
            { url: "/guide", priority: "0.7", changefreq: "monthly", lastmod: today },
            { url: "/guide/doctor-roadmap", priority: "0.6", changefreq: "monthly", lastmod: today },
            { url: "/neet-faq", priority: "0.6", changefreq: "monthly", lastmod: today },
            { url: "/neet-cutoff", priority: "0.8", changefreq: "weekly", lastmod: today },
            { url: "/pyq-analysis", priority: "0.8", changefreq: "weekly", lastmod: today },
            { url: "/syllabus", priority: "0.8", changefreq: "weekly", lastmod: today },
            { url: "/medical-colleges", priority: "0.8", changefreq: "weekly", lastmod: today },
            { url: "/rank-predictor", priority: "0.8", changefreq: "weekly", lastmod: today },
            { url: "/syllabus-weightage", priority: "0.8", changefreq: "weekly", lastmod: today },
            { url: "/best-books-neet", priority: "0.7", changefreq: "monthly", lastmod: today },
            { url: "/neet-eligibility-criteria", priority: "0.7", changefreq: "monthly", lastmod: today },
            { url: "/neet-exam-pattern", priority: "0.7", changefreq: "monthly", lastmod: today },
            { url: "/neet-application-form", priority: "0.7", changefreq: "monthly", lastmod: today },
            { url: "/neet-counselling", priority: "0.7", changefreq: "monthly", lastmod: today },
            { url: "/neet-admit-card", priority: "0.7", changefreq: "monthly", lastmod: today },
            { url: "/mbbs-roadmap", priority: "0.6", changefreq: "monthly", lastmod: today },
            { url: "/preview/chapter", priority: "0.6", changefreq: "weekly", lastmod: today },
            { url: "/preview/mock-test", priority: "0.6", changefreq: "weekly", lastmod: today },
            { url: "/preview/simulations", priority: "0.6", changefreq: "weekly", lastmod: today },
            { url: "/terms", priority: "0.3", changefreq: "monthly", lastmod: today },
            { url: "/privacy", priority: "0.3", changefreq: "monthly", lastmod: today },
            { url: "/about", priority: "0.5", changefreq: "monthly", lastmod: today },
            { url: "/contact", priority: "0.5", changefreq: "monthly", lastmod: today },
            { url: "/help", priority: "0.5", changefreq: "monthly", lastmod: today },
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
            "coordination-compounds-isomerism", "digestion-absorption-flowchart", "electrostatics-revision", "genetics-simplified",
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

        sitemapCache = {
            xml,
            expiresAt: Date.now() + CACHE_DURATION_MS
        };

        res.header("Content-Type", "application/xml");
        res.send(xml);
    } catch (error) {
        console.error("Error generating sitemap:", error);
        res.status(500).send("Error generating sitemap");
    }
});

export default router;
