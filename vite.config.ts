import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import prerender from '@prerenderer/rollup-plugin'

export default defineConfig(async () => {
  const onVercel = Boolean(process.env.VERCEL)

  // On Vercel only: use a Chrome that can run on their build machine
  let vercelChrome = {}
  if (onVercel) {
    const { default: chromium } = await import('@sparticuz/chromium')
    vercelChrome = {
      args: chromium.args,
      launchOptions: {
        executablePath: await chromium.executablePath(),
        headless: 'shell',
      },
    }
  }

  return {
    plugins: [
      react(),
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
          timeout: 60000, // wait up to 60s per page (your backend may be slow to wake)
          ...vercelChrome,
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
  }
})