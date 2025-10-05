import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward any request that starts with /api to your backend server
      "/api": "http://localhost:5000",
    },
  },
});
