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
<!-- 2025-07-11T04:08:14+05:30 -->
<!-- 2025-07-11T04:39:14+05:30 -->
<!-- 2025-08-13T06:53:19+05:30 -->
<!-- 2025-08-30T23:25:21+05:30 -->
<!-- 2025-10-10T10:25:25+05:30 -->
<!-- Update 2025-01-10T08:27:28+05:30 -->
<!-- Update 2025-01-11T16:00:28+05:30 -->
<!-- Update 2025-01-11T14:12:28+05:30 -->
<!-- Update 2025-02-02T17:52:30+05:30 -->