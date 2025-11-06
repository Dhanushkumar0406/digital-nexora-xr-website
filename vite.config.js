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
  ,
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // split common vendor libs into a separate chunk
          vendor: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'react-toastify'],
          // split 3D-related libs into smaller chunks for better caching and smaller downloads
          three_core: ['three'],
          r3f: ['@react-three/fiber'],
          drei: ['@react-three/drei'],
          // heavy utilities grouped separately
          canvas: ['html2canvas', 'jspdf']
        },
        // increase chunk warning limit so only very large chunks warn
        chunkFileNames: undefined
      }
    }
    ,
    // raise warning limit to 1000 KB (1 MB) — still shows warnings for very large chunks
    chunkSizeWarningLimit: 1000
  }
});
