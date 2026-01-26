import { Router } from "express";
import { db } from "./db";
import { contentTopics, chapterContent } from "@shared/schema";

const router = Router();

// Generate sitemap.xml
router.get("/sitemap.xml", async (req, res) => {
    try {
        const baseUrl = process.env.BASE_URL || "https://neet.zeropage.in";

        // Static pages with priority and change frequency
        const staticPages = [
            { url: "/", priority: "1.0", changefreq: "daily" },
            { url: "/practice", priority: "0.9", changefreq: "daily" },
            { url: "/mock-tests", priority: "0.9", changefreq: "weekly" },
            { url: "/library", priority: "0.8", changefreq: "weekly" },
            { url: "/flashcards", priority: "0.8", changefreq: "weekly" },
            { url: "/mentors", priority: "0.7", changefreq: "weekly" },
            { url: "/pricing", priority: "0.7", changefreq: "monthly" },
            { url: "/dashboard", priority: "0.6", changefreq: "daily" },
            { url: "/biology", priority: "0.8", changefreq: "weekly" },
            { url: "/physics", priority: "0.8", changefreq: "weekly" },
            { url: "/chemistry", priority: "0.8", changefreq: "weekly" },
        ];

        // Fetch dynamic content - chapters
        const chapters = await db.select().from(chapterContent);
        const chapterUrls = chapters.map((chapter) => ({
            url: `/library/${chapter.subject?.toLowerCase()}/${chapter.classLevel}/${chapter.chapterNumber}`,
            priority: "0.7",
            changefreq: "weekly",
            lastmod: chapter.updatedAt ? new Date(chapter.updatedAt).toISOString().split('T')[0] : undefined
        }));

        // Fetch dynamic content - topics
        const topics = await db.select().from(contentTopics);
        const topicUrls = topics.map((topic) => ({
            url: `/practice?topicId=${topic.id}`,
            priority: "0.6",
            changefreq: "weekly",
        }));

        // Combine all URLs
        const allUrls = [...staticPages, ...chapterUrls, ...topicUrls];

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
