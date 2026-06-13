import React, { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList,
} from 'recharts'
import { teams } from '../data/teams.js'
import { GROUPS } from '../data/groups.js'
import { groupRanking, darkHorses } from '../engine/analysis.js'
import { useTeam } from '../teamCtx.jsx'

export default function Analysis() {
  const { select } = useTeam()
  const ranking = useMemo(() => groupRanking(), [])
  const horses = useMemo(() => darkHorses(10), [])
  const god = ranking[0]

  const chartData = ranking.map((g) => ({
    name: `${g.group}组`,
    avg: g.avg,
    teams: g.ids.map((id) => teams[id].flag).join(' '),
  }))

  return (
    <section className="container">
      <div className="section-head">
        <h2>数据分析</h2>
        <span className="sub">死亡之组 · 黑马雷达</span>
      </div>

      <div className="champion-card fade-up" style={{ background: 'linear-gradient(135deg, rgba(255,107,107,0.12), rgba(255,181,71,0.08))', borderColor: 'rgba(255,107,107,0.3)' }}>
        <span className="crown">💀</span>
        <div style={{ flex: 1 }}>
          <div className="tiny muted">死亡之组</div>
          <div className="nm">第 {god.group} 组 — {god.ids.map((id) => teams[id].flag + ' ' + teams[id].zh).join('、')}</div>
          <div className="small dim">
            平均 Elo <b>{god.avg}</b> · 梯队胶着（底线 {Math.min(...god.ids.map((id) => teams[id].elo))}）· 差距仅 {god.spread}
          </div>
        </div>
      </div>

      <div className="grid g2 mt2">
        <div className="card">
          <h3 style={{ fontSize: 18 }}>各组难度</h3>
          <p className="tiny muted">柱越高 = 平均 Elo 越高 = 小组越难。</p>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ left: 8, right: 16, top: 12 }}>
                <XAxis dataKey="name" tick={{ fill: '#9aa6c4', fontSize: 11 }} />
                <YAxis domain={[1500, 'auto']} tick={{ fill: '#9aa6c4', fontSize: 11 }} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ background: '#0b1120', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 10 }}
                  formatter={(v) => [v, '平均 Elo']}
                  labelFormatter={(l) => chartData.find((d) => d.name === l)?.teams}
                />
                <Bar dataKey="avg" radius={[6, 6, 0, 0]}>
                  {chartData.map((d, i) => (
                    <Cell key={i} fill={i === 0 ? '#ff6b6b' : i === 1 ? '#ffb547' : '#2ee6d6'} />
                  ))}
                  <LabelList dataKey="avg" position="top" fill="#9aa6c4" fontSize={10} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 18 }}>难度排名</h3>
          <div className="odds-head" style={{ gridTemplateColumns: '24px 1fr 70px 60px' }}>
            <span></span><span>小组</span><span>平均 Elo</span><span>差距</span>
          </div>
          {ranking.map((g, i) => (
            <div className="odds-row" key={g.group} style={{ gridTemplateColumns: '24px 1fr 70px 60px' }}>
              <span className="rk">{i + 1}</span>
              <span className="nm" style={{ fontSize: 13 }}>
                {g.ids.map((id) => (
                  <span key={id} style={{ cursor: 'pointer' }} onClick={() => select(id)}>{teams[id].flag} </span>
                ))}
                <span className="tiny muted" style={{ marginLeft: 4 }}>{g.group}组</span>
              </span>
              <span className="pct" style={{ color: 'var(--teal)' }}>{g.avg}</span>
              <span className="pct muted">{g.spread}</span>
            </div>
          ))}
        </div>
      </div>

      <h3 className="mt2">🐎 黑马雷达</h3>
      <p className="small dim">
        实力超出其分档预期的球队——可能搅乱格局的潜在黑马。
      </p>
      <div className="grid g2">
        {horses.map((h, i) => (
          <div className="card hover" key={h.id} onClick={() => select(h.id)}>
            <div className="row between">
              <span className="nm" style={{ fontWeight: 700, fontSize: 16 }}>
                #{i + 1} {h.flag} {teams[h.id].zh}
              </span>
              <span className={`chip ${i < 3 ? 'gold' : 'muted'}`}>第{h.pot}档</span>
            </div>
            <div className="row between mt">
              <span className="small dim">Elo <b style={{ color: 'var(--text)' }}>{h.elo}</b></span>
              <span className="small dim">
                高于档均 {h.deltaVsPot >= 0 ? '+' : ''}{h.deltaVsPot}
              </span>
              <span className="small" style={{ color: h.rising > 0 ? 'var(--green)' : 'var(--text-dim)' }}>
                {h.rising > 0 ? '▲' : h.rising < 0 ? '▼' : '—'} 同比 {h.rising > 0 ? '+' : ''}{h.rising}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
