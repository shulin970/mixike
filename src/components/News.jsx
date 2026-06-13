import React, { useEffect, useState } from 'react'

function fmtDate(d) {
  if (!d) return ''
  const t = new Date(d)
  if (isNaN(t)) return d
  return `${t.getMonth() + 1}月${t.getDate()}日 ${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}`
}

export default function News() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  async function load() {
    setLoading(true); setErr(null)
    try {
      const r = await fetch('/api/news')
      const d = await r.json()
      setItems(d.items || [])
      if (d.error && !(d.items || []).length) setErr(d.error)
    } catch (e) {
      setErr(String(e))
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])

  return (
    <section className="container">
      <div className="section-head">
        <h2>世界杯新闻</h2>
        <span className="sub">聚合多家中外媒体 · 由 Cloudflare 边缘抓取（国内稳定访问）</span>
        <button className="btn ghost" onClick={load} style={{ marginLeft: 'auto', padding: '6px 12px' }}>🔄 刷新</button>
      </div>

      {loading && (
        <div className="card center"><span className="spin" /> &nbsp;加载中…</div>
      )}
      {!loading && err && (
        <div className="card center">
          暂时拉不到新闻（{err}）。<button className="btn ghost" onClick={load} style={{ marginLeft: 8 }}>重试</button>
        </div>
      )}
      {!loading && !err && items.length === 0 && (
        <div className="card center">暂无新闻。</div>
      )}

      <div className="news-list">
        {items.map((it, i) => (
          <a className="news-item card hover" key={i} href={it.link} target="_blank" rel="noreferrer">
            <div className="news-title">{it.title}</div>
            <div className="news-meta">
              {it.source && <span className="chip muted">{it.source}</span>}
              <span className="tiny muted">{fmtDate(it.date)}</span>
            </div>
          </a>
        ))}
      </div>
      <p className="pill-note mt2">
        新闻由 Google News 中文版聚合（百家媒体），经 Cloudflare 边缘节点抓取后返回。点击标题跳转原文。
      </p>
    </section>
  )
}
