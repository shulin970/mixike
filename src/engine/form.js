// ============================================================================
// Recent-form multiplier.
// Maps a team's last-6 record to a small attack scaling in [0.85, 1.18].
// Positive recent goal-difference per game pushes λ up; negative pulls it down.
// (Elo remains the dominant strength signal — form only adds recent flavour.)
// ============================================================================

import { teams } from '../data/teams.js'

const cache = {}

export function formMultiplier(teamId) {
  if (cache[teamId] !== undefined) return cache[teamId]
  const t = teams[teamId]
  if (!t || !t.form) return 1

  const played = t.form.w + t.form.d + t.form.l || 6
  const gdPerGame = (t.form.gf - t.form.ga) / played // typically -3..+3
  let mult = 1 + gdPerGame * 0.035
  if (mult < 0.85) mult = 0.85
  if (mult > 1.18) mult = 1.18
  cache[teamId] = mult
  return mult
}

/** Simple "form %" for display: 0–100 from the last-6 points haul. */
export function formPct(teamId) {
  const t = teams[teamId]
  if (!t || !t.form) return 50
  const pts = t.form.w * 3 + t.form.d
  const max = 18
  return Math.round((pts / max) * 100)
}
