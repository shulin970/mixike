import React, { useState } from 'react'
import { CITIES, FINAL_CITY_ID } from '../data/cities.js'

const LNG0 = -130, LNG1 = -64, LAT0 = 60, LAT1 = 14
const W = 1000, H = 620
const project = (lat, lng) => ({
  x: ((lng - LNG0) / (LNG1 - LNG0)) * W,
  y: ((LAT0 - lat) / (LAT0 - LAT1)) * H,
})

const ZH = {
  MEX: { city: '墨西哥城', stadium: '阿兹特克球场' },
  GDL: { city: '瓜达拉哈拉', stadium: '阿克隆球场' },
  MTY: { city: '蒙特雷', stadium: 'BBVA 球场' },
  MIA: { city: '迈阿密', stadium: '硬石球场' },
  LAX: { city: '洛杉矶', stadium: 'SoFi 球场' },
  DAL: { city: '达拉斯', stadium: 'AT&T 球场' },
  HOU: { city: '休斯顿', stadium: 'NRG 球场' },
  ATL: { city: '亚特兰大', stadium: '梅赛德斯奔驰球场' },
  SEA: { city: '西雅图', stadium: '流明球场' },
  SFO: { city: '旧金山湾区', stadium: "李维斯球场" },
  PHL: { city: '费城', stadium: '林肯金融球场' },
  BOS: { city: '波士顿', stadium: '吉列球场' },
  KC: { city: '堪萨斯城', stadium: '箭头球场' },
  NYC: { city: '纽约/新泽西', stadium: '大都会球场' },
  TOR: { city: '多伦多', stadium: 'BMO 球场' },
  VAN: { city: '温哥华', stadium: 'BC Place 球场' },
}
const zh = (id) => ZH[id] || { city: id, stadium: '' }

const LAND =
  'M70,150 C120,90 230,70 330,95 C420,70 540,55 660,80 C760,55 870,80 905,140 ' +
  'C935,200 900,250 870,300 C905,360 880,430 815,460 C760,500 700,520 640,505 ' +
  'C560,540 470,560 390,545 C300,575 200,560 150,510 C95,470 60,400 80,330 ' +
  'C50,270 45,200 70,150 Z'

export default function HostMap() {
  const [sel, setSel] = useState(null)
  const points = CITIES.map((c) => ({ ...c, ...project(c.lat, c.lng) }))
  const selected = sel ? CITIES.find((c) => c.id === sel) : null

  return (
    <section className="container">
      <div className="section-head">
        <h2>主办城市</h2>
        <span className="sub">横跨美国、加拿大、墨西哥的 16 座球场</span>
      </div>

      <div className="map-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="2026 世界杯主办城市地图">
          <defs>
            <radialGradient id="sea" cx="50%" cy="40%" r="75%">
              <stop offset="0%" stopColor="#142036" />
              <stop offset="100%" stopColor="#0a1224" />
            </radialGradient>
            <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1b2c4a" />
              <stop offset="100%" stopColor="#152441" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width={W} height={H} fill="url(#sea)" />
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`v${i}`} x1={(i + 1) * 100} y1="0" x2={(i + 1) * 100} y2={H} stroke="rgba(255,255,255,0.03)" />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={(i + 1) * 100} x2={W} y2={(i + 1) * 100} stroke="rgba(255,255,255,0.03)" />
          ))}
          <path d={LAND} fill="url(#land)" stroke="rgba(78,140,255,0.25)" strokeWidth="1.5" />

          {points.map((p) => {
            const r = 5 + (p.capacity / 83000) * 9
            const isFinal = p.id === FINAL_CITY_ID
            const active = sel === p.id
            return (
              <g key={p.id} className="city-dot" onClick={() => setSel(p.id)}>
                {isFinal && <circle cx={p.x} cy={p.y} r={r + 7} fill="none" stroke="#ffd34e" strokeWidth="2" opacity="0.7" />}
                <circle cx={p.x} cy={p.y} r={r} fill={isFinal ? '#ffd34e' : active ? '#a78bfa' : '#2ee6d6'} />
                <circle cx={p.x} cy={p.y} r={r + 4} fill="transparent" />
                <text x={p.x} y={p.y - r - 6} fill="#eaf0ff" fontSize="13" fontWeight="700" textAnchor="middle">
                  {zh(p.id).city}
                </text>
              </g>
            )
          })}
        </svg>

        {selected && (
          <div className="map-panel fade-up">
            <div className="row between">
              <strong style={{ fontSize: 16 }}>📍 {zh(selected.id).city}</strong>
              <span className="chip muted">{selected.country}</span>
            </div>
            <div className="small dim mt">{zh(selected.id).stadium}</div>
            <div className="small muted">容量约 {selected.capacity.toLocaleString()} 座</div>
            {selected.matches && <div className="small mt" style={{ color: 'var(--gold)' }}>⭐ {selected.matches}</div>}
            <button className="btn ghost tiny mt" style={{ padding: '4px 10px' }} onClick={() => setSel(null)}>关闭</button>
          </div>
        )}
      </div>

      <div className="grid g4 mt2">
        {CITIES.map((c) => (
          <div className="card hover" key={c.id} onClick={() => setSel(c.id)}>
            <div className="row between">
              <strong>{zh(c.id).city}</strong>
              <span className="chip muted">{c.country}</span>
            </div>
            <div className="small dim">{zh(c.id).stadium}</div>
            <div className="tiny muted">约 {c.capacity.toLocaleString()} 座</div>
          </div>
        ))}
      </div>
      <p className="pill-note mt2">圆点大小与球场容量成正比。金色圆环为大都会球场——决赛举办地。</p>
    </section>
  )
}
