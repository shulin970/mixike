import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { liveConfig, normalizeFixtures } from './liveSource.mjs'

// Dev-only proxy: the browser calls /api/fixtures, Vite's Node server forwards
// it to the configured live-data provider WITH the secret key (kept server-side
// in .env, never shipped to the client). The response is normalized to a common
// shape. For production use server.mjs (same job).
function liveApiPlugin() {
  return {
    name: 'live-api-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!(req.url || '').startsWith('/api/fixtures')) return next()
        try {
          const cfg = liveConfig()
          const hasKey = !!Object.values(cfg.headers)[0]
          if (!hasKey) {
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify({ response: [], source: cfg.source, hasKey: false }))
          }
          const r = await fetch(cfg.url, { headers: cfg.headers })
          const json = await r.json()
          const norm = normalizeFixtures(json, cfg.source)
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.end(JSON.stringify({ response: norm, source: cfg.source, hasKey: true }))
        } catch (e) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: String(e), response: [] }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Expose non-VITE_ env vars (FD_API_TOKEN, LIVE_SOURCE, ...) to process.env
  // so liveSource.mjs can read them inside the dev proxy.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return {
    plugins: [react(), liveApiPlugin()],
    server: { open: true, port: 5173 },
  }
})
