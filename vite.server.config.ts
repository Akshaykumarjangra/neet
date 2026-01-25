import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "client", "src"),
            "@shared": path.resolve(__dirname, "shared"),
            "@assets": path.resolve(__dirname, "attached_assets"),
        },
    },
    build: {
        ssr: "server/index.ts",
        outDir: "dist",
        emptyOutDir: false, // Don't wipe dist/public from client build
        target: "node18",
        sourcemap: true,
        minify: false, // Check if minification causes issues, usually fine to disable for server
        rollupOptions: {
            output: {
                format: "esm",
                entryFileNames: "index.js",
            },
        },
    },
});
