import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

declare const __dirname: string;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@icons": path.resolve(__dirname, "./src/icons"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
