import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";


export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt"],
      manifest: {
        name: "NEETPrep",
        short_name: "NEETPrep",
        description: "Most advanced NEET preparation app",
        theme_color: "#6366f1",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/favicon.png", sizes: "192x192", type: "image/png" },
          { src: "/favicon.png", sizes: "512x512", type: "image/png" },
          { src: "/favicon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        runtimeCaching: [
          { urlPattern: ({ url }) => url.pathname.startsWith("/api/chapters"), handler: "StaleWhileRevalidate", options: { cacheName: "chapters" } },
          { urlPattern: ({ url }) => url.pathname.startsWith("/api/practice"), handler: "NetworkFirst", options: { cacheName: "practice", networkTimeoutSeconds: 5 } },
          { urlPattern: /\.(png|jpg|jpeg|webp|svg)$/, handler: "CacheFirst", options: { cacheName: "img", expiration: { maxEntries: 200 } } },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Production optimizations
    minify: 'esbuild',
    // Code splitting optimization
    rollupOptions: {
      output: {
        manualChunks: function(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-hook-form')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/@radix-ui')) {
            return 'ui-vendor';
          }
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/gsap') || id.includes('node_modules/animejs')) {
            return 'animation-vendor';
          }
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3')) {
            return 'chart-vendor';
          }
          if (id.includes('node_modules/three') || id.includes('node_modules/matter-js')) {
            return 'three-vendor';
          }
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Source maps for production debugging (optional)
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'wouter',
      '@tanstack/react-query',
      'zod',
    ],
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    host: "0.0.0.0",
    port: 5002,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      '/ws': {
        target: 'ws://localhost:5001',
        ws: true,
      }
    }
  },
});
