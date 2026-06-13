import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { teams } from '../data/teams.js'
import { simulateTournament } from '../engine/monteCarlo.js'

export default function BracketSimulator() {
  const [N, setN] = useState(5000)
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState(null)

  function run() {
    setRunning(true)
    setTimeout(() => {
      const r = simulateTournament(N)
      setResult(r)
      setRunning(false)
    }, 30)
  }

  const top = result ? result.teams.slice(0, 12) : []
  const champ = result ? result.teams[0] : null
  const chartData = top.map((t) => ({ name: teams[t.id].zh, value: +t.win.toFixed(1), flag: teams[t.id].flag }))

  return (
    <section className="container">
      <div className="section-head">
        <h2>冠军模拟器</h2>
        <span className="sub">{result ? `已完成 ${result.N.toLocaleString()} 次整届赛事模拟` : '蒙特卡洛模拟整届赛事'}</span>
      </div>

      <div className="card mb">
        <p className="small dim" style={{ marginBottom: 12 }}>
          每次模拟会踢完所有小组赛、生成积分榜、取每组前两名 + 成绩最好的 8 个第三名（共 32 强），
          再进行重新排位的淘汰赛——打平则按实力点球决胜。重复成千上万次，得到每支球队的真实夺冠概率。
        </p>
        <div className="row wrap">
          {[1000, 5000, 25000].map((n) => (
            <button key={n} className={`btn ${N === n ? 'primary' : 'ghost'}`} onClick={() => setN(n)}>
              {n.toLocaleString()} 次
            </button>
          ))}
          <button className="btn primary" onClick={run} disabled={running}>
            {running ? <><span className="spin" /> 模拟中…</> : '▶ 开始模拟'}
          </button>
        </div>
      </div>

      {!result && !running && (
        <div className="card center">
          <div style={{ fontSize: 40 }}>🎯</div>
          <p>点击 <b>开始模拟</b> 计算实时夺冠概率。</p>
        </div>
      )}

      {result && champ && (
        <>
          <div className="champion-card fade-up">
            <span className="crown">👑</span>
            <div style={{ flex: 1 }}>
              <div className="tiny muted">最可能冠军</div>
              <div className="nm">{teams[champ.id].flag} {teams[champ.id].zh}</div>
              <div className="small dim">
                场均 {champ.expMatches.toFixed(1)} 场 · 场均进 {champ.expGoals.toFixed(1)} 球
              </div>
            </div>
            <div className="pct">{champ.win.toFixed(1)}%</div>
          </div>

          <div className="grid g2 mt2">
            <div className="card">
              <h3 style={{ fontSize: 18 }}>夺冠概率 · 前 12</h3>
              <div style={{ width: '100%', height: 320 }}>
                <ResponsiveContainer>
                  <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 16 }}>
                    <XAxis type="number" tick={{ fill: '#9aa6c4', fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" width={80} tick={{ fill: '#eaf0ff', fontSize: 12 }} />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ background: '#0b1120', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 10, color: '#eaf0ff' }}
                      formatter={(v) => [`${v}%`, '夺冠概率']}
                    />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? '#ffd34e' : '#2ee6d6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontSize: 18 }}>晋级各轮概率</h3>
              <div className="odds-head">
                <span></span><span>球队</span><span>路线</span><span>夺冠</span>
              </div>
              {top.slice(0, 12).map((t, i) => (
                <div className="odds-row" key={t.id}>
                  <span className="rk">{i + 1}</span>
                  <span className="nm">{teams[t.id].flag} {teams[t.id].zh}</span>
                  <div className="bar-track" title={`半决赛 ${t.SF.toFixed(0)}% · 决赛 ${t.F.toFixed(0)}%`}>
                    <div className="bar-fill" style={{ width: `${Math.min(100, t.F)}%` }} />
                  </div>
                  <span className="pct">{t.win.toFixed(1)}%</span>
                </div>
              ))}
              <p className="tiny muted mt">柱条 = 杀入决赛的概率。</p>
            </div>
          </div>

          <div className="card mt2">
            <h3 style={{ fontSize: 18 }}>完整晋级表</h3>
            <div className="grid g3">
              {result.teams.map((t) => (
                <div className="kv" key={t.id} style={{ borderBottom: 'none' }}>
                  <span className="k">{teams[t.id].flag} {teams[t.id].zh}</span>
                  <span className="v" style={{ fontSize: 12, color: t.win > 0 ? 'var(--gold)' : 'var(--text-dim)' }}>
                    32强 {t.R32.toFixed(0)}·16强 {t.R16.toFixed(0)}·8强 {t.QF.toFixed(0)}·4强 {t.SF.toFixed(0)}·决 {t.F.toFixed(0)}·冠 {t.win.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  )
}
