import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath, {
    maxAge: "7d",
    setHeaders: (res, filePath) => {
      // Ensure correct MIME types for assets
      if (filePath.endsWith('.css')) {
        res.setHeader("Content-Type", "text/css; charset=utf-8");
      } else if (filePath.endsWith('.js')) {
        res.setHeader("Content-Type", "application/javascript; charset=utf-8");
      } else if (filePath.endsWith('.json')) {
        res.setHeader("Content-Type", "application/json");
      } else if (filePath.endsWith('.svg')) {
        res.setHeader("Content-Type", "image/svg+xml");
      } else if (filePath.endsWith('.woff2')) {
        res.setHeader("Content-Type", "font/woff2");
      } else if (filePath.endsWith('.woff')) {
        res.setHeader("Content-Type", "font/woff");
      }
      // Cache control
      if (filePath.includes('/assets/')) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (filePath.endsWith("index.html")) {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      } else {
        res.setHeader("Cache-Control", "public, max-age=604800, immutable");
      }
    },
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
