// ============================================================================
// Monte-Carlo tournament simulator.
// For each of N runs: play every group match (sample goals from each side's λ),
// build the 12 standings, take the top-2 of each group plus the 8 best third-
// placed teams (32), then run a re-seeded single-elimination bracket (level on
// goals → penalties decided by strength). Aggregate how often each team reaches
// each round and wins it all, plus their average goals scored (for Golden Boot).
// ============================================================================

import { samplePoisson } from './poisson.js'
import { lambdas } from './predict.js'
import { teams, isHost } from '../data/teams.js'
import { GROUPS, GROUP_LETTERS } from '../data/groups.js'

export function sampleScore(homeId, awayId) {
  const { lh, la } = lambdas(homeId, awayId)
  return [samplePoisson(lh), samplePoisson(la)]
}

function strength(id) {
  return teams[id].elo + (isHost(id) ? 100 : 0)
}

function playGroup(g) {
  const ids = GROUPS[g].teams
  const tab = {}
  ids.forEach((id) => (tab[id] = { id, p: 0, gf: 0, ga: 0, gd: 0 }))
  for (let a = 0; a < 4; a++) {
    for (let b = a + 1; b < 4; b++) {
      const H = ids[a]
      const A = ids[b]
      const [hg, ag] = sampleScore(H, A)
      tab[H].gf += hg
      tab[A].gf += ag
      tab[H].ga += ag
      tab[A].ga += hg
      if (hg > ag) tab[H].p += 3
      else if (hg < ag) tab[A].p += 3
      else {
        tab[H].p += 1
        tab[A].p += 1
      }
    }
  }
  const arr = Object.values(tab)
  arr.forEach((t) => (t.gd = t.gf - t.ga))
  arr.sort(
    (x, y) => y.p - x.p || y.gd - x.gd || y.gf - x.gf || strength(y.id) - strength(x.id),
  )
  return arr
}

// Fold-pair a seeded list: 1v32, 2v31, ... (top seeds avoid each other early).
function pairs(arr) {
  const out = []
  for (let i = 0; i < arr.length / 2; i++) out.push([arr[i], arr[arr.length - 1 - i]])
  return out
}

function koMatch(a, b, stats) {
  const [hg, ag] = sampleScore(a, b)
  stats[a].goals += hg
  stats[b].goals += ag
  stats[a].matches++
  stats[b].matches++
  if (hg === ag) return strength(a) >= strength(b) ? a : b // penalties
  return hg > ag ? a : b
}

export function simulateTournament(N = 5000) {
  const stats = {}
  Object.keys(teams).forEach((id) => {
    stats[id] = { R32: 0, R16: 0, QF: 0, SF: 0, F: 0, WIN: 0, matches: 0, goals: 0 }
  })

  for (let it = 0; it < N; it++) {
    const winners = []
    const runners = []
    const thirds = []
    for (const g of GROUP_LETTERS) {
      const t = playGroup(g)
      // accumulate group goals (each side plays 3 group matches)
      t.forEach((row) => {
        stats[row.id].goals += row.gf
        stats[row.id].matches += 3
      })
      winners.push(t[0].id)
      runners.push(t[1].id)
      thirds.push({ id: t[2].id, p: t[2].p, gd: t[2].gd, gf: t[2].gf })
    }
    thirds.sort((a, b) => b.p - a.p || b.gd - a.gd || b.gf - a.gf)
    const bestThird = thirds.slice(0, 8).map((x) => x.id)

    let field = [...winners, ...runners, ...bestThird]
    field.sort((a, b) => strength(b) - strength(a)) // re-seed the 32
    field.forEach((id) => stats[id].R32++)

    for (const label of ['R16', 'QF', 'SF', 'F']) {
      const next = []
      for (const [a, b] of pairs(field)) {
        const w = koMatch(a, b, stats)
        stats[w][label]++
        next.push(w)
      }
      field = next
    }
    // field now holds the two finalists
    const champ = koMatch(field[0], field[1], stats)
    stats[champ].WIN++
  }

  const out = Object.entries(stats).map(([id, s]) => ({
    id,
    R32: (s.R32 / N) * 100,
    R16: (s.R16 / N) * 100,
    QF: (s.QF / N) * 100,
    SF: (s.SF / N) * 100,
    F: (s.F / N) * 100,
    win: (s.WIN / N) * 100,
    expMatches: s.matches / N,
    expGoals: s.goals / N,
  }))
  out.sort((a, b) => b.win - a.win || b.F - a.F)
  return { N, teams: out }
}
