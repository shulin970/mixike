import React from 'react'

const TABS = [
  { id: 'home', label: '首页' },
  { id: 'groups', label: '小组' },
  { id: 'schedule', label: '赛程' },
  { id: 'predictions', label: '比分预测' },
  { id: 'simulator', label: '冠军模拟' },
  { id: 'analysis', label: '数据分析' },
  { id: 'stars', label: '球星' },
  { id: 'map', label: '主办城市' },
  { id: 'boot', label: '金靴' },
]

export default function NavBar({ active, onChange }) {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="brand">
          <span className="trophy">🏆</span>
          <span>美加墨世界杯 <span className="grad">2026</span></span>
        </div>
        <div className="tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab ${active === t.id ? 'active' : ''}`}
              onClick={() => onChange(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
