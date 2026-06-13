import React from 'react'
import { teams } from '../data/teams.js'
import { SQUADS, POS_ZH, POS_COLOR } from '../data/squads.js'
import PlayerAvatar from './PlayerAvatar.jsx'
import TeamFlag from './TeamFlag.jsx'
import { useTeam } from '../teamCtx.jsx'

export default function Stars() {
  const { select } = useTeam()

  const stars = Object.values(teams)
    .map((t) => {
      const squad = SQUADS[t.id] || []
      const pl = squad.find((p) => p.n === t.star) || { n: t.star, p: 'ST' }
      return { t, pl }
    })
    .sort((a, b) => b.t.elo - a.t.elo)

  return (
    <section className="container">
      <div className="section-head">
        <h2>球星</h2>
        <span className="sub">48 队核心球员 · 头像按场上位置上色</span>
      </div>

      <div className="pos-legend">
        {Object.entries(POS_COLOR).map(([k, c]) => (
          <span key={k}><i style={{ background: c }} /> {POS_ZH[k] || k}</span>
        ))}
      </div>

      <div className="stars-grid mt2">
        {stars.map(({ t, pl }) => (
          <div className="card hover star-card fade-up" key={t.id} onClick={() => select(t.id)}>
            <PlayerAvatar name={pl.n} pos={pl.p} size={64} star />
            <div className="nm">{pl.zh}</div>
            <div className="pos">{POS_ZH[pl.p] || pl.p} · <span className="muted">{pl.n}</span></div>
            <div className="team"><TeamFlag id={t.id} emoji={t.flag} size={22} /> {t.zh}</div>
          </div>
        ))}
      </div>
      <p className="pill-note mt2">
        头像为按位置生成的示意头像（永不裂图）。点击卡片可查看该队完整大名单、位置与赛程预测。
        如需真实照片，需接入一个你网络可达的图片源（见 README），我可再接。
      </p>
    </section>
  )
}
