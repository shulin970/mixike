// ============================================================================
// Live results — fetches real World Cup scores via the /api/fixtures proxy and
// overlays them onto the static schedule. The proxy normalizes any provider
// (football-data.org / api-football) to [{ home, away, hg, ag, status }], so
// this client stays source-agnostic. If anything fails (no key, offline, name
// mismatch) it silently keeps the static data, so the app always works.
// ============================================================================

import { teams } from '../data/teams.js'
import { GROUP_MATCHES } from '../data/schedule.js'

// provider team-name variants → our team id
const ALIASES = {
  'south korea': 'KOR', 'korea republic': 'KOR', 'korea': 'KOR',
  'united states': 'USA', 'usa': 'USA',
  'czech republic': 'CZE', 'czechia': 'CZE',
  'ir iran': 'IRN', 'iran': 'IRN',
  'turkey': 'TUR', 'turkiye': 'TUR',
  'bosnia and herzegovina': 'BIH', 'bosnia herzegovina': 'BIH', 'bosnia herz': 'BIH',
  'ivory coast': 'CIV', 'cote divoire': 'CIV',
  'curacao': 'CUW', 'curaao': 'CUW',
  'dr congo': 'COD', 'congo dr': 'COD', 'democratic republic congo': 'COD',
  'cape verde': 'CPV',
  'new zealand': 'NZL', 'saudi arabia': 'KSA',
}

const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip combining accents
    .replace(/[^a-z ]/g, ' ')
    .replace(/\b(republic|and|the|of|dr)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim()

// Build name→id lookup from our teams + aliases
const NAME2ID = {}
for (const t of Object.values(teams)) NAME2ID[norm(t.name)] = t.id
for (const [k, v] of Object.entries(ALIASES)) NAME2ID[norm(k)] = v

export function nameToId(name) {
  return NAME2ID[norm(name)]
}

/**
 * Fetch normalized fixtures and write real scores into GROUP_MATCHES in place.
 * Returns { ok, updated, finished, ts, err, hasKey }.
 */
export async function refreshLive() {
  const result = { ok: false, updated: 0, finished: 0, ts: null, err: null, hasKey: false }
  try {
    const r = await fetch('/api/fixtures', { cache: 'no-store' })
    if (!r.ok) { result.err = `HTTP ${r.status}`; return result }
    const data = await r.json()
    result.hasKey = data?.hasKey !== false
    if (!result.hasKey) { result.err = 'no key configured'; return result }

    const arr = Array.isArray(data?.response) ? data.response : []
    for (const f of arr) {
      const hid = nameToId(f.home)
      const aid = nameToId(f.away)
      if (!hid || !aid || f.hg == null || f.ag == null) continue
      const finished = f.status === 'FT'
      const live = f.status === 'LIVE'
      if (!finished && !live) continue

      const m = GROUP_MATCHES.find(
        (x) => (x.home === hid && x.away === aid) || (x.home === aid && x.away === hid),
      )
      if (!m) continue
      m.played = true
      m.score = m.home === hid ? [f.hg, f.ag] : [f.ag, f.hg]
      m.live = live
      result.updated++
      if (finished) result.finished++
    }
    result.ok = true
    result.ts = new Date().toISOString()
  } catch (e) {
    result.err = String(e)
  }
  return result
}
