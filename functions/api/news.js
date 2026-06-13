// Cloudflare Pages Function  →  route: /api/news
// Fetches Chinese World-Cup news from the edge (reachable) and returns JSON.
import { fetchNews } from '../../newsSource.mjs'

export async function onRequestGet() {
  try {
    const data = await fetchNews()
    return Response.json(data, { headers: { 'Cache-Control': 'public, max-age=300' } })
  } catch (e) {
    return Response.json({ items: [], error: String(e) }, { status: 500 })
  }
}
