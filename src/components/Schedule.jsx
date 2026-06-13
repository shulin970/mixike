import React, { useMemo, useState } from 'react'
import { teams } from '../data/teams.js'
import { GROUP_LETTERS } from '../data/groups.js'
import { GROUP_MATCHES, R32_MATCHES, KNOCKOUT_ROUNDS } from '../data/schedule.js'
import { predictMatch } from '../engine/predict.js'

const CITY_ZH = {
  MEX: '墨西哥城', GDL: '瓜达拉哈拉', MTY: '蒙特雷', MIA: '迈阿密', LAX: '洛杉矶',
  DAL: '达拉斯', HOU: '休斯顿', ATL: '亚特兰大', SEA: '西雅图', SFO: '旧金山', PHL: '费城',
  BOS: '波士顿', KC: '堪萨斯城', NYC: '纽约/新泽西', TOR: '多伦多', VAN: '温哥华',
}
const WD = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
function dateHead(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${dateStr.slice(5, 7)}月${dateStr.slice(8)}日 · ${WD[d.getDay()]}`
}

function SchedRow({ m }) {
  const H = teams[m.home], A = teams[m.away]
  const pred = m.played ? null : predictMatch(m.home, m.away)
  const rowCls = `sched-row${m.played && !m.live ? ' done' : ''}${m.live ? ' live' : ''}`
  return (
    <div className={rowCls}>
      <span className="t">{m.time}</span>
      <div className="side">
        <span className="flag">{H.flag}</span>
        <span className="nm">{H.zh}</span>
      </div>
      <div className="mid">
        {m.played ? (
          <>
            <div className="sc">{m.score[0]}-{m.score[1]}</div>
            {m.live
              ? <span className="badge teal"><span className="live" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} />进行中</span>
              : <span className="badge gold">完赛</span>}
          </>
        ) : (
          <>
            <div className="pred" title="模型预测比分">{pred.predictedScore}</div>
            <div className="tiny muted">未开赛·预测</div>
          </>
        )}
      </div>
      <div className="side r">
        <span className="nm">{A.zh}</span>
        <span className="flag">{A.flag}</span>
      </div>
      <div className="meta">第{m.group}组 · {CITY_ZH[m.cityId] || m.cityId}</div>
    </div>
  )
}

export default function Schedule({ liveKey = 0 }) {
  const [group, setGroup] = useState('ALL')

  // sort chronologically (Beijing time = date+time), then group by date
  const grouped = useMemo(() => {
    const list = GROUP_MATCHES
      .filter((m) => group === 'ALL' || m.group === group)
      .slice()
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    const map = new Map()
    for (const m of list) {
      if (!map.has(m.date)) map.set(m.date, [])
      map.get(m.date).push(m)
    }
    return [...map.entries()] // [[date, [matches]], ...] already date-sorted
  }, [group, liveKey])

  return (
    <section className="container">
      <div className="section-head">
        <h2>赛程</h2>
        <span className="sub">72 场小组赛 · 按北京时间排序</span>
      </div>

      <div className="filters">
        <select className="select" value={group} onChange={(e) => setGroup(e.target.value)}>
          <option value="ALL">全部小组</option>
          {GROUP_LETTERS.map((g) => <option key={g} value={g}>第 {g} 组</option>)}
        </select>
        <span className="chip muted">🕐 北京时间 UTC+8 · 按开球时间排序</span>
      </div>

      {grouped.map(([date, matches]) => (
        <div key={date}>
          <div className="date-head">
            <span className="d">{dateHead(date)}</span>
            <span className="n">{matches.length} 场 · 观赛时间 {matches[0].time}–{matches[matches.length - 1].time}（北京时间）</span>
          </div>
          <div className="sched-list">
            {matches.map((m) => <SchedRow key={m.no} m={m} />)}
          </div>
        </div>
      ))}

      <h3 className="mt2">32 强淘汰赛</h3>
      <p className="small dim">
        官方对阵签位。「第三」= 成绩最好的 8 个小组第三之一（具体归属待小组赛结束后确定）。
      </p>
      <div className="grid g3">
        {R32_MATCHES.map((r) => (
          <div className="card" key={r.no}>
            <div className="row between">
              <strong>{r.slot1} <span className="muted">vs</span> {r.slot2}</strong>
              <span className="chip muted">#{r.no - 72}</span>
            </div>
            <div className="tiny muted mt">{r.date.slice(5).replace('-', '/')} · {r.time} 北京时间</div>
          </div>
        ))}
      </div>

      <h3 className="mt2">后续淘汰赛轮次</h3>
      <div className="grid g3">
        {KNOCKOUT_ROUNDS.map((r) => (
          <div className="card" key={r.id}>
            <div className="card-head"><span className="group-tag">{r.name}</span></div>
            <div className="small dim">📅 {r.window}</div>
            <div className="small muted mt">📍 {r.cities}</div>
          </div>
        ))}
      </div>
      <p className="pill-note mt2">
        已开赛显示真实比分（绿点=进行中）；未开赛显示模型预测比分。开球时间为北京时间（UTC+8），主办城市为示意。
      </p>
    </section>
  )
}
