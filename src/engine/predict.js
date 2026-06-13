// ============================================================================
// Match prediction — Elo → expected goals (λ) → full scoreline distribution.
//
// 1. Strength = Elo; host nations (USA/MEX/CAN) get a +100 home bonus.
// 2. Win expectancy from the rating gap:  We = 1 / (1 + 10^(-dr/400)).
// 3. Expected goals: split a base total (~2.62) by that expectancy, then nudge
//    each side by its recent-form multiplier.
// 4. Scorelines: independent Poisson over 0–8 goals, mild draw boost, then we
//    read off P(win/draw/loss), the most likely score, top scorelines, an
//    "upset" probability and a confidence figure.
// ============================================================================

import { scoreMatrix } from './poisson.js'
import { formMultiplier } from './form.js'
import { teams, isHost } from '../data/teams.js'

const HOST_BONUS = 100
const BASE_TOTAL = 2.62

export function lambdas(homeId, awayId) {
  const H = teams[homeId]
  const A = teams[awayId]
  const eH = H.elo + (isHost(homeId) ? HOST_BONUS : 0)
  const eA = A.elo + (isHost(awayId) ? HOST_BONUS : 0)
  const dr = eH - eA
  const share = 1 / (1 + Math.pow(10, -dr / 400))
  const lh = BASE_TOTAL * share * formMultiplier(homeId)
  const la = BASE_TOTAL * (1 - share) * formMultiplier(awayId)
  return { lh, la, dr, eH, eA }
}

const round1 = (x) => Math.round(x * 1000) / 10 // → percent with 1 decimal

export function predictMatch(homeId, awayId, opts = {}) {
  const { lh, la, dr, eH, eA } = lambdas(homeId, awayId)
  const m = scoreMatrix(lh, la, opts)
  const max = m.length - 1

  let pWin = 0, pDraw = 0, pLoss = 0
  const all = []
  let best = { score: '0-0', p: -1 }

  for (let i = 0; i <= max; i++) {
    for (let j = 0; j <= max; j++) {
      const p = m[i][j]
      if (i > j) pWin += p
      else if (i === j) pDraw += p
      else pLoss += p
      const score = `${i}-${j}`
      all.push({ score, p })
      if (p > best.p) best = { score, p }
    }
  }
  all.sort((a, b) => b.p - a.p)

  const H = teams[homeId]
  const A = teams[awayId]
  const homeStronger = H.elo >= A.elo
  const upsetProb = homeStronger ? pLoss : pWin
  const confidence = Math.max(pWin, pDraw, pLoss)
  const favorite = pWin >= pLoss ? homeId : awayId

  return {
    home: homeId,
    away: awayId,
    lh,
    la,
    dr,
    pWin: round1(pWin),
    pDraw: round1(pDraw),
    pLoss: round1(pLoss),
    predictedScore: best.score,
    predictedScoreP: round1(best.p),
    topScores: all.slice(0, 5).map((s) => ({ score: s.score, p: round1(s.p) })),
    confidencePct: round1(confidence),
    upsetPct: round1(upsetProb),
    favorite,
  }
}
