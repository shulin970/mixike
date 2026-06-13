import React, { useMemo } from 'react'
import { teams } from '../data/teams.js'
import { GROUP_MATCHES } from '../data/schedule.js'

function useCountdown(target) {
  return useMemo(() => {
    const diff = Math.max(0, target - Date.now())
    const d = Math.floor(diff / 86400000)
    const h = Math.floor((diff % 86400000) / 3600000)
    return { d, h }
  }, [target])
}

export default function Hero({ onNavigate, liveKey = 0 }) {
  const { d, h } = useCountdown(new Date('2026-07-19T20:00:00-04:00').getTime())

  const ticker = useMemo(() => {
    const played = GROUP_MATCHES.filter((m) => m.played).map((m) => ({ ...m, kind: 'played' }))
    const upcoming = GROUP_MATCHES.filter((m) => !m.played)
      .filter((m) => m.md === 1)
      .slice(0, 8)
      .map((m) => ({ ...m, kind: 'upcoming' }))
    return [...played, ...upcoming]
  }, [liveKey])

  return (
    <header className="hero">
      <div className="container">
        <span className="eyebrow">🇺🇸 🇨🇦 🇲🇽 · 美国 / 加拿大 / 墨西哥 · 2026年6月11日 – 7月19日</span>
        <h1>
          用数据，<br />
          预测 <span className="grad">2026 世界杯</span>。
        </h1>
        <p className="lead">
          真实分组与赛程、基于 Elo + 泊松分布的比分引擎、一万次模拟的冠军预测、死亡之组与黑马雷达、
          16 座主办城市地图、金靴预测——一站式世界杯数据分析。
        </p>

        <div className="hero-stats">
          <div className="stat">
            <div className="n grad">{d}</div>
            <div className="l">距决赛（天）</div>
          </div>
          <div className="stat">
            <div className="n">{h} 时</div>
            <div className="l">决赛 7/19 大都会球场</div>
          </div>
          <div className="stat">
            <div className="n">48</div>
            <div className="l">支球队 · 12 个小组</div>
          </div>
          <div className="stat">
            <div className="n">104</div>
            <div className="l">场比赛</div>
          </div>
        </div>

        <div className="ticker">
          {ticker.map((m, i) => {
            const H = teams[m.home], A = teams[m.away]
            return (
              <div className="ticker-item" key={i}>
                {m.kind === 'played' && <span className="live" />}
                <span>{H.flag}</span>
                {m.played ? (
                  <b>{m.score[0]}–{m.score[1]}</b>
                ) : (
                  <span className="muted tiny">vs</span>
                )}
                <span>{A.flag}</span>
                <span className="muted tiny">{H.zh}–{A.zh}</span>
              </div>
            )
          })}
        </div>

        <div className="row mt2">
          <button className="btn primary" onClick={() => onNavigate('predictions')}>查看比分预测 →</button>
          <button className="btn ghost" onClick={() => onNavigate('simulator')}>模拟冠军归属</button>
        </div>
      </div>
    </header>
  )
}
