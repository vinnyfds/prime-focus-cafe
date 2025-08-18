import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'public/images/*.png', dest: 'images' },
        { src: 'public/images/*.jpg', dest: 'images' },
        { src: 'public/images/*.jpeg', dest: 'images' },
        { src: 'public/images/*.webp', dest: 'images' }
      ]
    })
  ],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 3000,
    open: true
  }
})
