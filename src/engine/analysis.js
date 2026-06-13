// ============================================================================
// Analytics helpers — "Group of Death" detection & dark-horse radar.
// ============================================================================

import { teams } from '../data/teams.js'
import { GROUPS, GROUP_LETTERS } from '../data/groups.js'

// Approximate strength of each pot (used to spot teams out-performing their seed)
const POT_BASELINE = { 1: 2000, 2: 1880, 3: 1700, 4: 1600 }

export function groupMetrics(g) {
  const ids = GROUPS[g].teams
  const elos = ids.map((id) => teams[id].elo)
  const sorted = [...elos].sort((a, b) => a - b)
  const avg = elos.reduce((a, b) => a + b, 0) / 4
  const thirdPlaceElo = sorted[1] // the weaker of the top two... floor of contention
  const spread = Math.max(...elos) - Math.min(...elos)
  // Reward a high average AND a high floor; penalise a wide spread (a true
  // "group of death" is tight at the top, not just top-heavy with one minnow).
  const competitiveness = avg * 0.55 + thirdPlaceElo * 0.45 - spread * 0.35
  return {
    group: g,
    ids,
    avg: Math.round(avg),
    min: Math.min(...elos),
    max: Math.max(...elos),
    thirdPlaceElo,
    spread: Math.round(spread),
    competitiveness: Math.round(competitiveness),
  }
}

export function groupRanking() {
  return GROUP_LETTERS.map(groupMetrics).sort(
    (a, b) => b.competitiveness - a.competitiveness,
  )
}

export function darkHorses(limit = 12) {
  return Object.values(teams)
    .map((t) => ({
      id: t.id,
      name: t.name,
      flag: t.flag,
      elo: t.elo,
      pot: t.pot,
      confed: t.confed,
      rising: t.eloYoY,
      deltaVsPot: t.elo - POT_BASELINE[t.pot], // +ve = stronger than a typical team in that pot
      score: t.elo - POT_BASELINE[t.pot] + t.eloYoY * 8,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}
