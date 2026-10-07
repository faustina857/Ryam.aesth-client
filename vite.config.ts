import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import prerender from '@prerenderer/rollup-plugin' 

export default defineConfig({
  plugins: [
    react(),
    //the robot that visits pages and saves them
    prerender({
      routes: [
        '/',
        '/services',
        '/about',
        '/book',
        '/contact',
        '/privacy-policy',
      ],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterDocumentEvent: 'app-rendered',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})