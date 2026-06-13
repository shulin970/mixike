// ============================================================================
// Cloudflare Pages Function  →  route: /api/fixtures
// Proxies live World Cup scores with the secret token stored in Pages
// environment variables (never exposed to the browser). The response is
// normalized to the same shape the app expects: { response:[{home,away,hg,ag,status}], hasKey }
//
// Set in Cloudflare Pages → Settings → Environment variables:
//   LIVE_SOURCE = footballdata   (or apifootball)
//   FD_API_TOKEN = <football-data.org token>     (default provider)
//   API_SPORTS_KEY = <api-football key>          (only if LIVE_SOURCE=apifootball)
// ============================================================================

const UPSTREAM_FD =
  'https://api.football-data.org/v4/competitions/WC/matches?season=2026&status=IN_PLAY,PAUSED,FINISHED,SCHEDULED'
const UPSTREAM_AF =
  'https://v3.football.api-sports.io/fixtures?league=1&season=2026&from=2026-06-11&to=2026-07-19'

function mapStatus(s) {
  const up = String(s || '').toUpperCase()
  if (['FT', 'AET', 'PEN', 'FINISHED', 'AWARDED'].includes(up)) return 'FT'
  if (['1H', '2H', 'HT', 'ET', 'BT', 'P', 'LIVE', 'IN_PLAY', 'PAUSED', 'SUSPENDED'].includes(up)) return 'LIVE'
  return 'NS'
}

function normalize(json, source) {
  const out = []
  try {
    if (source === 'apifootball') {
      for (const f of json?.response || []) {
        const hg = f?.goals?.home, ag = f?.goals?.away
        if (hg == null || ag == null) continue
        out.push({ home: f?.teams?.home?.name, away: f?.teams?.away?.name, hg, ag, status: mapStatus(f?.fixture?.status?.short) })
      }
    } else {
      for (const m of json?.matches || []) {
        if (!m?.homeTeam?.name || !m?.awayTeam?.name) continue
        const ft = m?.score?.fullTime || {}, ht = m?.score?.halfTime || {}
        const hg = ft.home ?? ht.home, ag = ft.away ?? ht.away
        if (hg == null || ag == null) continue
        out.push({ home: m.homeTeam.name, away: m.awayTeam.name, hg, ag, status: mapStatus(m.status) })
      }
    }
  } catch (_) { /* partial */ }
  return out
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

export async function onRequestGet(context) {
  const { env } = context
  const source = (env.LIVE_SOURCE || 'footballdata').toLowerCase()
  let url, headers
  if (source === 'apifootball') {
    url = UPSTREAM_AF
    headers = { 'x-apisports-key': env.API_SPORTS_KEY || '' }
  } else {
    url = UPSTREAM_FD
    headers = { 'X-Auth-Token': env.FD_API_TOKEN || env.API_SPORTS_KEY || '' }
  }
  if (!Object.values(headers)[0]) return json({ response: [], source, hasKey: false })

  try {
    const r = await fetch(url, { headers })
    const data = await r.json()
    return json({ response: normalize(data, source), source, hasKey: true })
  } catch (e) {
    return json({ response: [], source, hasKey: true, error: String(e) }, 500)
  }
}
