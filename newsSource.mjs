// ============================================================================
// newsSource.mjs — fetches Chinese World-Cup news and normalizes to JSON.
// Source = Google News RSS (zh-CN, "2026 世界杯"), which aggregates many outlets.
// Runs inside the Cloudflare Function / dev proxy / server.mjs, so the request
// leaves from Cloudflare's edge (reachable) — NOT from the user's China browser.
// ============================================================================

const FEED =
  'https://news.google.com/rss/search?q=2026%20%E4%B8%96%E7%95%8C%E6%9D%AF&hl=zh-CN&gl=CN&ceid=CN:zh-Hans'

function strip(s) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .trim()
}

function field(block, tag) {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'))
  return m ? strip(m[1]) : ''
}

function parseRss(xml) {
  const items = []
  const re = /<item>([\s\S]*?)<\/item>/gi
  let m
  while ((m = re.exec(xml))) {
    const title = field(m[1], 'title')
    if (!title) continue
    items.push({
      title,
      link: field(m[1], 'link'),
      source: field(m[1], 'source'),
      date: field(m[1], 'pubDate'),
    })
  }
  return items
}

export async function fetchNews() {
  const r = await fetch(FEED, { headers: { 'User-Agent': 'Mozilla/5.0 (wc2026-app)' } })
  if (!r.ok) return { items: [], error: `HTTP ${r.status}` }
  const xml = await r.text()
  return { items: parseRss(xml).slice(0, 30) }
}
