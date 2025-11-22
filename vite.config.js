import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 1. Minify JavaScript using Terser (faster and smaller than ESbuild minification)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log statements from production code
      },
    },
    // 2. Control the size of chunks to potentially improve HTTP/2 performance
    chunkSizeWarningLimit: 1000, 
    // 3. Ensure assets are inlined only if they are very small
    assetsInlineLimit: 4096, // 4kb (default, good practice)
  },
})