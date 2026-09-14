import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { generateOgPages } from "./scripts/generate-og-pages";

export default defineConfig({
  plugins: [react(), generateOgPages()],
  server: { host: true, port: 5173 },
});
