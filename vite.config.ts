import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/")
          ) {
            return "react-vendor";
          }

          if (id.includes("/three/")) {
            return "three-core";
          }

          if (
            id.includes("/@react-three/") ||
            id.includes("/@pmndrs/") ||
            id.includes("/three-stdlib/") ||
            id.includes("/camera-controls/") ||
            id.includes("/maath/") ||
            id.includes("/meshline/") ||
            id.includes("/suspend-react/") ||
            id.includes("/zustand/")
          ) {
            return "r3f-vendor";
          }

          if (id.includes("/framer-motion/")) {
            return "motion-vendor";
          }

          if (id.includes("/lucide-react/")) {
            return "icons-vendor";
          }
        },
      },
    },
  },
});
