import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // viteのホットリロードのために、/で始める必要がある。
    alias: [{ find: "@rinne-components", replacement: "/src" }],
  },
});
