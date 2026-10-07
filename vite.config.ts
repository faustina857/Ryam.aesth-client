import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import prerender from '@prerenderer/rollup-plugin'

// The prerender plugin loses the homepage file on Vite 8. So the homepage is
// saved into _home/ first, then moved to dist/index.html after the build.
function moveHomepage(): Plugin {
  return {
    name: 'move-prerendered-homepage',
    apply: 'build',
    closeBundle: {
      order: 'post',
      handler() {
        const dist = path.resolve(__dirname, 'dist')
        const from = path.join(dist, '_home', 'index.html')
        if (fs.existsSync(from)) {
          fs.copyFileSync(from, path.join(dist, 'index.html'))
          fs.rmSync(path.join(dist, '_home'), { recursive: true, force: true })
        }
      },
    },
  }
}

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
          timeout: 60000,
          ...vercelChrome,
        },
        // Save the homepage under a different name; moveHomepage() puts it back
        postProcess(route: { route: string; outputPath?: string }) {
          if (route.route === '/') route.outputPath = '_home/index.html'
        },
      }),
      moveHomepage(),
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