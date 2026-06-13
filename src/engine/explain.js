// ============================================================================
// 预测解读 — 把 Elo/预期进球/主场/近况/近年走势 汇总成可读的分析理由。
// Elo 本身就是由近几年的每一场正式比赛（含预选赛、杯赛）逐场累加得到，
// 因此 Elo 值 + 同比变化 = 对"近几年比赛成绩"的浓缩量化；form = 近6场状态。
// ============================================================================

import { lambdas, predictMatch } from './predict.js'
import { teams, isHost } from '../data/teams.js'
import { formPct } from './form.js'

const formLine = (t) => `${t.form.w}胜${t.form.d}平${t.form.l}负 进${t.form.gf}失${t.form.ga}`
const trendWord = (yo) => (yo > 0 ? `上升 ${yo}` : yo < 0 ? `下滑 ${-yo}` : '基本持平')
const formWord = (t) => {
  const p = formPct(t.id)
  if (p >= 70) return '状态火热'
  if (p >= 50) return '状态平稳'
  if (p >= 35) return '状态一般'
  return '状态低迷'
}
const strengthWord = (dr) => {
  const a = Math.abs(dr)
  if (a >= 250) return '实力悬殊'
  if (a >= 130) return '明显占优'
  if (a >= 60) return '略占上风'
  if (a >= 25) return '势均力敌，稍占优'
  return '势均力敌'
}

export function explainMatch(homeId, awayId) {
  const H = teams[homeId]
  const A = teams[awayId]
  const { lh, la, dr } = lambdas(homeId, awayId)
  const p = predictMatch(homeId, awayId)

  const favId = p.favorite
  const fav = teams[favId]
  const weaker = favId === homeId ? A : H
  const homeHost = isHost(homeId)
  const awayHost = isHost(awayId)
  const hostTeam = homeHost ? H : awayHost ? A : null

  const factors = [
    { label: '实力差距 (Elo)', text: `${H.zh} ${H.elo} − ${A.zh} ${A.elo} = ${dr > 0 ? '+' : ''}${dr}（${strengthWord(dr)}）` },
    { label: '预期进球 (λ)', text: `${H.zh} ${lh.toFixed(2)} 球 · ${A.zh} ${la.toFixed(2)} 球 / 场` },
  ]
  if (hostTeam) factors.push({ label: '主场加成', text: `东道主 ${hostTeam.zh} 在本国作战，+100 Elo` })
  factors.push({ label: '近6场状态', text: `${H.zh} ${formLine(H)}（${formWord(H)}）· ${A.zh} ${formLine(A)}（${formWord(A)}）` })
  factors.push({ label: '近年走势', text: `${H.zh} ${trendWord(H.eloYoY)} · ${A.zh} ${trendWord(A.eloYoY)}` })

  const winPct = favId === homeId ? p.pWin : p.pLoss
  const upsetClause =
    p.upsetPct >= 30
      ? `${weaker.zh}有 ${p.upsetPct}% 的爆冷可能，需警惕。`
      : p.upsetPct >= 15
        ? `${weaker.zh}爆冷概率约 ${p.upsetPct}%，可能性不大。`
        : `几乎不会爆冷（${weaker.zh}胜率仅 ${p.upsetPct}%）。`

  const narrative =
    `${fav.zh} ${strengthWord(dr)}（Elo ${fav.elo} vs ${weaker.elo}），模型预计本场场均进球 ` +
    `${favId === homeId ? lh.toFixed(2) : la.toFixed(2)} − ${favId === homeId ? la.toFixed(2) : lh.toFixed(2)}。` +
    `${fav.zh}近6场${formLine(fav)}，${formWord(fav)}；${weaker.zh}近6场${formLine(weaker)}，${formWord(weaker)}。` +
    (hostTeam ? `${hostTeam.zh}作为东道主坐拥主场之利。` : '') +
    `综合以上，最可能比分 ${p.predictedScore}（${p.predictedScoreP}%），${fav.zh}胜率约 ${winPct}%。${upsetClause}`

  return { p, factors, narrative, H, A, fav, weaker, winPct }
}
