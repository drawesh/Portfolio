import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      // Ensure only one instance of Three.js is used
      'three': path.resolve(__dirname, 'node_modules/three'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      // Ensure Three.js is treated as external dependency
      external: [],
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
  optimizeDeps: {
    // Pre-bundle Three.js dependencies
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
})