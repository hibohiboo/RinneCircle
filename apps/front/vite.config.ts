import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: "./.env.local" });
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${process.env.SUB_DIR_PATH_BUILDER}/`,
  define: {
    VITE_DEFINE_BASE_PATH: JSON.stringify(process.env.SUB_DIR_PATH_BUILDER),
  },
  build: {
    rollupOptions: {},
  },
  resolve: {
    alias: {
      "@rinne-components": path.join(
        __dirname,
        "../../packages/components/src",
      ),
    },
  },
});
