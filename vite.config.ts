import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cpSync, copyFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

function copySiteAssets() {
  return {
    name: "copy-site-assets",
    apply: "build" as const,
    closeBundle() {
      const output = resolve(root, "dist");
      cpSync(resolve(root, "assets"), resolve(output, "assets"), { recursive: true });
      for (const file of ["robots.txt", "sitemap.xml"]) {
        copyFileSync(resolve(root, file), resolve(output, file));
      }
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [react(), copySiteAssets()],
});
