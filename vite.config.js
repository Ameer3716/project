// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// This is the import from YOUR documentation
import tailwindcss from '@tailwindcss/vite'; 

export default defineConfig({
  // We add the tailwindcss() plugin as instructed
  plugins: [react(), tailwindcss()], 
  // We keep your essential server settings
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      },
      '/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/socket.io': {
        target: 'ws://localhost:3001',
        ws: true
      }
    }
  }
});