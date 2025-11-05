import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jspdf', '@emailjs/browser', 'react-toastify']
  },
  resolve: {
    alias: {
      'offscreencanvas': 'offscreencanvas-polyfill',
      'pako': 'pako/dist/pako.esm.mjs'
    }
  }
});
