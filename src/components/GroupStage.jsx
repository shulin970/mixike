import React, { useMemo } from 'react'
import { teams } from '../data/teams.js'
import { GROUPS, GROUP_LETTERS } from '../data/groups.js'
import { GROUP_MATCHES } from '../data/schedule.js'
import { useTeam } from '../teamCtx.jsx'

function standingsFor(group) {
  const ids = GROUPS[group].teams
  const tab = {}
  ids.forEach((id) => (tab[id] = { id, p: 0, gf: 0, ga: 0, gd: 0, pl: 0 }))
  for (const m of GROUP_MATCHES) {
    if (m.group !== group || !m.played) continue
    const [hg, ag] = m.score
    tab[m.home].pl++
    tab[m.away].pl++
    tab[m.home].gf += hg
    tab[m.home].ga += ag
    tab[m.away].gf += ag
    tab[m.away].ga += hg
    if (hg > ag) { tab[m.home].p += 3 }
    else if (hg < ag) { tab[m.away].p += 3 }
    else { tab[m.home].p += 1; tab[m.away].p += 1 }
  }
  return Object.values(tab).map((t) => ({ ...t, gd: t.gf - t.ga })).sort(
    (a, b) => b.p - a.p || b.gd - a.gd || b.gf - a.gf || teams[b.id].elo - teams[a.id].elo,
  )
}

function GroupCard({ group, liveKey }) {
  const { select } = useTeam()
  const rows = useMemo(() => standingsFor(group), [group, liveKey])
  const seed = GROUPS[group].seed
  const hasResults = rows.some((r) => r.pl > 0)

  return (
    <div className="card hover fade-up">
      <div className="card-head">
        <span className="group-tag">第 {group} 组</span>
        <span className="chip">种子 {teams[seed].flag} {teams[seed].zh}</span>
      </div>
      <div>
        {rows.map((r, i) => {
          const t = teams[r.id]
          return (
            <div className="team-row" key={r.id} onClick={() => select(r.id)}>
              <span className="muted tiny" style={{ width: 16 }}>{i + 1}</span>
              <span className="flag">{t.flag}</span>
              <span className="nm">{t.zh}{isHost(t.id) && <span className="chip" style={{ marginLeft: 6 }}>东道主</span>}</span>
              <span className="chip elo">{t.elo}</span>
              {hasResults && (
                <span className="meta" style={{ width: 78, textAlign: 'right' }}>
                  {r.pl > 0 ? `${r.p}分 · ${r.gd >= 0 ? '+' : ''}${r.gd}` : '—'}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function isHost(id) {
  return ['USA', 'MEX', 'CAN'].includes(id)
}

export default function GroupStage({ liveKey = 0 }) {
  return (
    <section className="container">
      <div className="section-head">
        <h2>小组赛</h2>
        <span className="sub">12 个小组 · 每组前两名 + 成绩最好的 8 个第三名晋级 32 强</span>
      </div>
      <div className="grid g3">
        {GROUP_LETTERS.map((g) => (
          <GroupCard key={g} group={g} liveKey={liveKey} />
        ))}
      </div>
      <p className="pill-note mt2">
        Elo 数值代表球队实力（eloratings.net 量纲）。「东道主」= 东道主国家 / 小组种子。积分榜随比赛进行实时更新。
      </p>
    </section>
  )
}
