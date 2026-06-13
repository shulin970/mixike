// ============================================================================
// liveSource.mjs — shared live-data source config (used by the Vite dev proxy
// AND server.mjs). Picks a provider from env LIVE_SOURCE and normalizes its
// response into one common shape so the browser client stays source-agnostic.
//
//   LIVE_SOURCE=footballdata  (DEFAULT — free, China-accessible, documented)
//        key env: FD_API_TOKEN   (get one at https://www.football-data.org/)
//   LIVE_SOURCE=apifootball     (api-sports.io / RapidAPI mirror)
//        key env: API_SPORTS_KEY (https://www.api-football.com/)
// ============================================================================

// Read env LAZILY (at request time) so Vite's loadEnv / --env-file populate it.
export function liveConfig() {
  const SOURCE = (process.env.LIVE_SOURCE || 'footballdata').toLowerCase()
  if (SOURCE === 'apifootball') {
    return {
      source: 'apifootball',
      url: 'https://v3.football.api-sports.io/fixtures?league=1&season=2026&from=2026-06-11&to=2026-07-19',
      headers: { 'x-apisports-key': process.env.API_SPORTS_KEY || '' },
    }
  }
  // football-data.org — World Cup competition code "WC"
  return {
    source: 'footballdata',
    url: 'https://api.football-data.org/v4/competitions/WC/matches?season=2026&status=IN_PLAY,PAUSED,FINISHED,SCHEDULED',
    headers: { 'X-Auth-Token': process.env.FD_API_TOKEN || process.env.API_SPORTS_KEY || '' },
  }
}

// Map any provider's status → 'FT' | 'LIVE' | 'NS'
function mapStatus(s) {
  const up = String(s || '').toUpperCase()
  if (['FT', 'AET', 'PEN', 'FINISHED', 'AWARDED'].includes(up)) return 'FT'
  if (['1H', '2H', 'HT', 'ET', 'BT', 'P', 'LIVE', 'IN_PLAY', 'PAUSED', 'SUSPENDED'].includes(up)) return 'LIVE'
  return 'NS'
}

// Normalize a raw provider payload into [{ home, away, hg, ag, status }]
export function normalizeFixtures(json, source) {
  const out = []
  try {
    if (source === 'apifootball') {
      const arr = Array.isArray(json?.response) ? json.response : []
      for (const f of arr) {
        const hg = f?.goals?.home, ag = f?.goals?.away
        if (hg == null || ag == null) continue
        out.push({
          home: f?.teams?.home?.name,
          away: f?.teams?.away?.name,
          hg, ag,
          status: mapStatus(f?.fixture?.status?.short),
        })
      }
    } else {
      // football-data.org v4
      const arr = Array.isArray(json?.matches) ? json.matches : []
      for (const m of arr) {
        if (!m?.homeTeam?.name || !m?.awayTeam?.name) continue // KO TBD slots
        const ft = m?.score?.fullTime || {}
        const ht = m?.score?.halfTime || {}
        const hg = ft.home ?? ht.home
        const ag = ft.away ?? ht.away
        if (hg == null || ag == null) continue
        out.push({ home: m.homeTeam.name, away: m.awayTeam.name, hg, ag, status: mapStatus(m.status) })
      }
    }
  } catch (_) { /* keep partial */ }
  return out
}
