import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: '../docs/*.png', dest: 'images' },
        { src: '../docs/*.jpg', dest: 'images' },
        { src: '../docs/*.jpeg', dest: 'images' }
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
