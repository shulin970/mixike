import React, { useMemo } from 'react'
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from 'recharts'
import { teams, isHost } from '../data/teams.js'
import { GROUPS, teamGroup } from '../data/groups.js'
import { GROUP_MATCHES } from '../data/schedule.js'
import { predictMatch } from '../engine/predict.js'
import { formPct } from '../engine/form.js'
import { SQUADS, POS_ZH } from '../data/squads.js'
import PlayerAvatar from './PlayerAvatar.jsx'

const clamp = (v) => Math.max(0, Math.min(100, v))

const CONFED_ZH = {
  UEFA: '欧洲', CONMEBOL: '南美', CONCACAF: '中北美及加勒比', CAF: '非洲', AFC: '亚洲', OFC: '大洋洲',
}

function radarData(t) {
  const f = t.form
  const played = f ? f.w + f.d + f.l || 6 : 6
  const gfpg = f ? f.gf / played : 1.2
  const gapg = f ? f.ga / played : 1.2
  return [
    { k: '实力', v: clamp(((t.elo - 1480) / (2160 - 1480)) * 100) },
    { k: '攻击', v: clamp(gfpg * 33) },
    { k: '防守', v: clamp(100 - gapg * 33) },
    { k: '状态', v: formPct(t.id) },
    { k: '种子', v: ((5 - t.pot) / 4) * 100 },
  ]
}

export default function TeamModal({ id, onClose }) {
  const t = teams[id]
  const group = teamGroup[id]
  const starZh = (SQUADS[id] || []).find((p) => p.n === t.star)?.zh || t.star
  const data = useMemo(() => radarData(t), [id])

  const projected = useMemo(() => {
    const ids = GROUPS[group].teams
    const ranked = [...ids].sort((a, b) => teams[b].elo + (isHost(b) ? 100 : 0) - (teams[a].elo + (isHost(a) ? 100 : 0)))
    const pos = ranked.indexOf(id) + 1
    return { pos, ranked }
  }, [id, group])

  const fixtures = useMemo(
    () => GROUP_MATCHES.filter((m) => m.group === group && (m.home === id || m.away === id)),
    [id, group],
  )
  const posZh = ['第1名 🥇', '第2名 🥈', '第3名 🥉', '第4名'][projected.pos - 1]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal fade-up" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <span className="flag">{t.flag}</span>
          <div>
            <div className="nm">{t.zh}</div>
            <div className="tiny muted">{CONFED_ZH[t.confed] || t.confed} · 第{t.pot}档 · 第{group}组{isHost(id) ? ' · 东道主' : ''}</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="grid g2" style={{ gap: 24 }}>
            <div>
              <div style={{ width: '100%', height: 240 }}>
                <ResponsiveContainer>
                  <RadarChart data={data} outerRadius="72%">
                    <PolarGrid stroke="rgba(255,255,255,0.12)" />
                    <PolarAngleAxis dataKey="k" tick={{ fill: '#9aa6c4', fontSize: 12 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar dataKey="v" stroke="#2ee6d6" fill="#2ee6d6" fillOpacity={0.35} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <div className="kv"><span className="k">Elo 积分</span><span className="v">{t.elo} {!t.eloVerified && <span className="tiny muted">(估算)</span>}</span></div>
              <div className="kv"><span className="k">Elo 同比</span><span className="v" style={{ color: t.eloYoY > 0 ? 'var(--green)' : t.eloYoY < 0 ? 'var(--red)' : 'var(--text-dim)' }}>{t.eloYoY > 0 ? '+' : ''}{t.eloYoY}</span></div>
              <div className="kv"><span className="k">预计小组排名</span><span className="v">{posZh}</span></div>
              <div className="kv"><span className="k">核心球员</span><span className="v">⭐ {starZh}</span></div>
              <div className="kv"><span className="k">近期状态（6场）</span><span className="v">{t.form.w}胜 {t.form.d}平 {t.form.l}负 · {t.form.gf}-{t.form.ga}</span></div>
              <div className="kv" style={{ borderBottom: 'none' }}><span className="k">关键球员</span><span className="v tiny">{t.players.join('、')}</span></div>
            </div>
          </div>

          <div className="divider" />
          <h3 style={{ fontSize: 16, marginBottom: 10 }}>主力阵容 · {t.zh}</h3>
          <div className="grid g2">
            {(SQUADS[id] || []).map((pl) => (
              <div className="player-row" key={pl.n}>
                <PlayerAvatar name={pl.n} pos={pl.p} star={pl.n === t.star} size={40} />
                <span className="nm">{pl.zh}<span className="tiny muted" style={{ marginLeft: 6 }}>{pl.n}</span>{pl.n === t.star && <span className="star-badge"> ★</span>}</span>
                <span className="pos">{POS_ZH[pl.p] || pl.p}</span>
              </div>
            ))}
          </div>

          <div className="divider" />
          <h3 style={{ fontSize: 16, marginBottom: 10 }}>第 {group} 组赛程与预测</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            {fixtures.map((m) => {
              const home = m.home === id
              const opp = home ? m.away : m.home
              const O = teams[opp]
              const p = predictMatch(m.home, m.away)
              const myWin = home ? p.pWin : p.pLoss
              return (
                <div className="row between" key={m.no} style={{ background: 'var(--glass)', borderRadius: 10, padding: '10px 12px' }}>
                  <span className="small">
                    {home ? '主' : '客'} vs {O.flag} {O.zh}
                    <span className="tiny muted"> · 第{m.md}轮 · {m.date.slice(5).replace('-', '/')} {m.time} 北京时间</span>
                  </span>
                  <span className="small">
                    {m.played ? (
                      <b>{m.home === id ? `${m.score[0]}-${m.score[1]}` : `${m.score[1]}-${m.score[0]}`}</b>
                    ) : (
                      <span className="chip teal">胜 {myWin}% · 预测 {home ? p.predictedScore : p.predictedScore.split('-').reverse().join('-')}</span>
                    )}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
