import React, { useMemo, useState } from 'react'
import { teams } from '../data/teams.js'
import { GROUP_LETTERS } from '../data/groups.js'
import { GROUP_MATCHES } from '../data/schedule.js'
import { explainMatch } from '../engine/explain.js'
import { SQUADS, POS_ZH } from '../data/squads.js'
import PlayerAvatar from './PlayerAvatar.jsx'
import TeamFlag from './TeamFlag.jsx'

const CITY_ZH = {
  MEX: '墨西哥城', GDL: '瓜达拉哈拉', MTY: '蒙特雷', MIA: '迈阿密', LAX: '洛杉矶',
  DAL: '达拉斯', HOU: '休斯顿', ATL: '亚特兰大', SEA: '西雅图', SFO: '旧金山', PHL: '费城',
  BOS: '波士顿', KC: '堪萨斯城', NYC: '纽约/新泽西', TOR: '多伦多', VAN: '温哥华',
}

function FormChips({ t }) {
  const f = t.form
  const dots = []
  for (let i = 0; i < f.w; i++) dots.push('w')
  for (let i = 0; i < f.d; i++) dots.push('d')
  for (let i = 0; i < f.l; i++) dots.push('l')
  return (
    <div className="form-chips">
      {dots.map((d, i) => <span key={i} className={`fc fc-${d}`}>{d === 'w' ? '胜' : d === 'd' ? '平' : '负'}</span>)}
    </div>
  )
}

function starOf(t) {
  const sq = SQUADS[t.id] || []
  return sq.find((p) => p.n === t.star) || { n: t.star, zh: t.star, p: 'ST' }
}

function PredictionCard({ m }) {
  const e = explainMatch(m.home, m.away)
  const { p, factors, narrative, H, A } = e
  const Hp = starOf(H), Ap = starOf(A)
  const topScores = p.topScores.slice(0, 3).map((s) => s.score).join(' / ')
  return (
    <div className="card hover fade-up match-preview">
      <div className="row between tiny muted">
        <span className="chip muted">第 {m.group} 组 · 第{m.md}轮</span>
        <span>🕐 {m.date.slice(5).replace('-', '/')} {m.time} · {CITY_ZH[m.cityId] || m.cityId}</span>
      </div>

      <div className="mp-teams">
        <div className="mp-team">
          <TeamFlag id={m.home} emoji={H.flag} size={64} />
          <div className="mp-name">{H.zh}</div>
          <div className="mp-elo">Elo {H.elo}</div>
          <FormChips t={H} />
        </div>
        <div className="mp-center">
          <div className="mp-score">{p.predictedScore}</div>
          <div className="tiny muted">预测 · {p.predictedScoreP}%</div>
          <div className="mp-vs">VS</div>
        </div>
        <div className="mp-team">
          <TeamFlag id={m.away} emoji={A.flag} size={64} />
          <div className="mp-name">{A.zh}</div>
          <div className="mp-elo">Elo {A.elo}</div>
          <FormChips t={A} />
        </div>
      </div>

      <div className="mp-prob">
        <span style={{ width: `${p.pWin}%`, background: 'var(--green)' }} />
        <span style={{ width: `${p.pDraw}%`, background: 'var(--amber)' }} />
        <span style={{ width: `${p.pLoss}%`, background: 'var(--red)' }} />
      </div>
      <div className="wdl-labels">
        <span style={{ color: 'var(--green)' }}>{H.zh}胜 {p.pWin}%</span>
        <span style={{ color: 'var(--amber)' }}>平 {p.pDraw}%</span>
        <span style={{ color: 'var(--red)' }}>{A.zh}胜 {p.pLoss}%</span>
      </div>

      <div className="mp-players">
        <div className="mp-player">
          <PlayerAvatar name={Hp.n} pos={Hp.p} size={38} star />
          <div>
            <div className="pn">{Hp.zh}</div>
            <div className="pp">{H.zh} · {POS_ZH[Hp.p] || Hp.p}</div>
          </div>
        </div>
        <div className="mp-player" style={{ justifyContent: 'flex-end', textAlign: 'right' }}>
          <div>
            <div className="pn">{Ap.zh}</div>
            <div className="pp">{A.zh} · {POS_ZH[Ap.p] || Ap.p}</div>
          </div>
          <PlayerAvatar name={Ap.n} pos={Ap.p} size={38} star />
        </div>
      </div>

      <details className="details-why why-box">
        <summary>
          为什么这样预测 · 常见比分 {topScores}{p.upsetPct >= 30 ? ` · ⚡爆冷 ${p.upsetPct}%` : ''}
        </summary>
        <p>{narrative}</p>
        {factors.map((f, i) => (
          <div className="factor" key={i}><span className="k">{f.label}</span><span className="v">{f.text}</span></div>
        ))}
      </details>
    </div>
  )
}

function Backtest() {
  const rows = GROUP_MATCHES.filter((m) => m.played).map((m) => {
    const p = explainMatch(m.home, m.away).p
    const [hg, ag] = m.score
    const actual = hg > ag ? m.home : ag > hg ? m.away : 'draw'
    const correct = actual !== 'draw' && p.favorite === actual
    return { m, p, correct }
  })
  const correct = rows.filter((r) => r.correct).length
  const total = rows.length

  return (
    <div className="card mt2">
      <div className="card-head">
        <span className="group-tag">模型回测</span>
        <span className="chip teal">命中 {correct}/{total} 场胜方</span>
      </div>
      <p className="small dim">已开赛比赛中，模型赛前看好的球队与实际赛果的对比。</p>
      {rows.map(({ m, p, correct }) => {
        const H = teams[m.home], A = teams[m.away]
        return (
          <div className="kv" key={m.no}>
            <span className="k">{H.flag} {H.zh} {m.score[0]}–{m.score[1]} {A.zh} {A.flag}</span>
            <span className="v">
              模型：{teams[p.favorite].zh} ·{' '}
              <span style={{ color: correct ? 'var(--green)' : 'var(--amber)' }}>{correct ? '✓ 命中' : '✗ 爆冷'}</span>
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function Predictions({ liveKey = 0 }) {
  const [group, setGroup] = useState('ALL')
  const matches = useMemo(
    () => GROUP_MATCHES.filter((m) => !m.played && (group === 'ALL' || m.group === group))
      .slice().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)),
    [group, liveKey],
  )

  return (
    <section className="container">
      <div className="section-head">
        <h2>比分预测 · 对阵预告</h2>
        <span className="sub">每场：双方实力 · 近期战绩 · 关键球员 · 预测比分与胜率</span>
      </div>

      <div className="card mb">
        <h3 style={{ marginBottom: 8 }}>分析依据</h3>
        <p className="small dim" style={{ marginBottom: 0 }}>
          实力用 <b>Elo 积分</b>（东道主 +100），由近几年每场正式比赛累加而成；<b>Elo 同比</b>反映本赛季走势；
          近期战绩为最近 6 场（含热身赛）。模型据此算出预期进球（泊松分布）→ 比分与胜率。
        </p>
      </div>

      <div className="filters">
        <select className="select" value={group} onChange={(e) => setGroup(e.target.value)}>
          <option value="ALL">全部小组</option>
          {GROUP_LETTERS.map((g) => <option key={g} value={g}>第 {g} 组</option>)}
        </select>
        <span className="chip muted">{matches.length} 场未开赛 · 按时间排序</span>
      </div>

      <div className="grid g2">
        {matches.map((m) => <PredictionCard key={m.no} m={m} />)}
      </div>

      <Backtest />
    </section>
  )
}
