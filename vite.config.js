import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** GitHub Actions sets `CI=true`. Firebase compresses at the edge — skip Vite’s `.br`/`.gz` in CI for faster uploads. */
const enablePrecompress = process.env.CI !== "true";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === "production" &&
      enablePrecompress &&
      viteCompression({
        algorithm: "brotliCompress",
        ext: ".br",
        threshold: 1024,
        deleteOriginFile: false,
      }),
    mode === "production" &&
      enablePrecompress &&
      viteCompression({
        algorithm: "gzip",
        ext: ".gz",
        threshold: 1024,
        deleteOriginFile: false,
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  publicDir: "public",
  esbuild:
    mode === "production"
      ? {
          drop: ["console", "debugger"],
          legalComments: "none",
        }
      : undefined,
  build: {
    outDir: "dist",
    // Smaller deploys; set SOURCEMAP=true for debugging prod builds
    sourcemap: process.env.SOURCEMAP === "true",
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-dom")) return "react-dom";
          if (id.includes("react-router")) return "react-router";
          if (id.includes("/react-helmet")) return "react-helmet";
          if (id.includes("styled-components")) return "styled";
          if (id.includes("styled-system")) return "styled-system";
          if (id.includes("mobx")) return "mobx";
          if (id.includes("@reach")) return "reach";
          if (id.includes("qrcode.react")) return "qrcode";
          if (id.includes("ethereum-blockies")) return "blockies";
          if (id.includes("@fontsource")) return "fonts";
          return "vendor";
        },
      },
    },
  },
}));
