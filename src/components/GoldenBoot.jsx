import React, { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList,
} from 'recharts'
import { teams } from '../data/teams.js'
import { STRIKERS } from '../data/strikers.js'
import { simulateTournament } from '../engine/monteCarlo.js'
import { useTeam } from '../teamCtx.jsx'

export default function GoldenBoot() {
  const { select } = useTeam()

  const teamExp = useMemo(() => {
    const r = simulateTournament(2500)
    const map = {}
    r.teams.forEach((t) => (map[t.id] = t))
    return map
  }, [])

  const ranking = useMemo(() => {
    const MEDIAN_GPG = 0.4
    return STRIKERS.map((s) => {
      const te = teamExp[s.team]
      const teamGoals = te ? te.expGoals : 4
      const exp = teamGoals * s.share * (0.85 + 0.35 * (s.intlGPG / MEDIAN_GPG))
      return { ...s, teamName: teams[s.team].zh, flag: teams[s.team].flag, exp }
    })
      .filter((s) => s.exp > 0)
      .sort((a, b) => b.exp - a.exp)
      .slice(0, 12)
  }, [teamExp])

  const chartData = ranking.map((s) => ({ name: s.zh, value: +s.exp.toFixed(2), flag: s.flag }))

  return (
    <section className="container">
      <div className="section-head">
        <h2>金靴预测</h2>
        <span className="sub">模拟球队预期进球 × 射手转化率</span>
      </div>

      <div className="card mb">
        <p className="small dim" style={{ marginBottom: 0 }}>
          球员预测 = 其球队 <b>预期进球</b>（数千次模拟的平均值）× 该球员在队内的进球 <b>份额</b> ×
          国际赛场均进球系数。走得远、火力猛的球队和射手会排在前面。
        </p>
      </div>

      <div className="grid g2">
        <div className="card">
          <h3 style={{ fontSize: 18 }}>前 12 预测</h3>
          <div style={{ width: '100%', height: 380 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 24 }}>
                <XAxis type="number" tick={{ fill: '#9aa6c4', fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={128} tick={{ fill: '#eaf0ff', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ background: '#0b1120', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 10 }}
                  formatter={(v) => [`${v} 球`, '预测进球']}
                  labelFormatter={(l) => {
                    const row = ranking.find((s) => s.zh === l)
                    return row ? `${row.flag} ${row.teamName} · ${row.name}` : l
                  }}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? '#ffd34e' : i < 3 ? '#ffb547' : '#2ee6d6'} />
                  ))}
                  <LabelList dataKey="value" position="right" fill="#9aa6c4" fontSize={11} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 18 }}>候选人</h3>
          <div className="odds-head" style={{ gridTemplateColumns: '24px 1fr 70px 70px' }}>
            <span></span><span>射手</span><span>场均国脚进球</span><span>预测</span>
          </div>
          {ranking.map((s, i) => (
            <div className="odds-row" key={s.team + s.name} style={{ gridTemplateColumns: '24px 1fr 90px 60px', cursor: 'pointer' }} onClick={() => select(s.team)}>
              <span className="rk">{i + 1}</span>
              <span className="nm" style={{ fontSize: 14 }}>{s.flag} {s.zh} <span className="tiny muted">· {s.name}</span></span>
              <span className="pct muted" style={{ fontSize: 12 }}>{s.intlGPG.toFixed(2)}</span>
              <span className="pct" style={{ color: i < 3 ? 'var(--gold)' : 'var(--teal)' }}>{s.exp.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="pill-note mt2">
        进球份额与国际赛场均进球为估算值。点击一行可打开该球队详情。
      </p>
    </section>
  )
}
