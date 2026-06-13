import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { liveConfig, normalizeFixtures } from './liveSource.mjs'
import { fetchNews } from './newsSource.mjs'

// Dev proxy: serves /api/fixtures and /api/news from Vite's Node process so the
// secret key stays server-side and news is fetched server-side. In production
// the Cloudflare Functions (functions/api/*) do the same job.
function apiPlugin() {
  return {
    name: 'api-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        if (!url.startsWith('/api/')) return next()

        try {
          let payload
          if (url.startsWith('/api/news')) {
            payload = await fetchNews()
          } else if (url.startsWith('/api/fixtures')) {
            const cfg = liveConfig()
            const hasKey = !!Object.values(cfg.headers)[0]
            if (!hasKey) {
              payload = { response: [], source: cfg.source, hasKey: false }
            } else {
              const r = await fetch(cfg.url, { headers: cfg.headers })
              const json = await r.json()
              payload = { response: normalizeFixtures(json, cfg.source), source: cfg.source, hasKey: true }
            }
          } else {
            return next()
          }
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.end(JSON.stringify(payload))
        } catch (e) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: String(e) }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Expose non-VITE_ env vars (FD_API_TOKEN, LIVE_SOURCE, ...) to process.env.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return {
    plugins: [react(), apiPlugin()],
    server: { open: true, port: 5173 },
  }
})
