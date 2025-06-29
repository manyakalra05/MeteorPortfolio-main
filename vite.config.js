import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

<!-- 2025-03-20T06:18:46+05:30 -->
<!-- 2025-05-14T09:53:02+05:30 -->
<!-- 2025-06-29T06:37:11+05:30 -->