// ============================================================================
// server.mjs — production / local proxy + static host (no dependencies).
//   1) npm run build
//   2) node --env-file=.env server.mjs      (Node 20.6+; or set env inline)
//      → http://localhost:8787
// Reads LIVE_SOURCE / FD_API_TOKEN / API_SPORTS_KEY from the environment,
// proxies /api/fixtures to the chosen provider (key server-side only), serves
// dist/. Needs Node 18+ (20.6+ for --env-file).
// ============================================================================

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { liveConfig, normalizeFixtures } from './liveSource.mjs'

const PORT = process.env.PORT || 8787
const ROOT = 'dist'
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.map': 'application/json',
}

const server = createServer(async (req, res) => {
  const url = req.url || '/'

  if (url.startsWith('/api/fixtures')) {
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
    return
  }

  // static files + SPA fallback
  let path = normalize(join(ROOT, url === '/' ? 'index.html' : url))
  try {
    const s = await stat(path)
    if (s.isDirectory()) path = join(path, 'index.html')
    const data = await readFile(path)
    res.setHeader('Content-Type', MIME[extname(path)] || 'application/octet-stream')
    res.end(data)
  } catch {
    try {
      res.setHeader('Content-Type', 'text/html')
      res.end(await readFile(join(ROOT, 'index.html')))
    } catch {
      res.statusCode = 404
      res.end('Build the app first: npm run build')
    }
  }
})

server.listen(PORT, () => {
  const cfg = liveConfig()
  const hasKey = !!Object.values(cfg.headers)[0]
  console.log(`\n  ▶  http://localhost:${PORT}\n     source: ${cfg.source} · key ${hasKey ? 'set — LIVE' : 'NOT set — static data'}\n`)
})
