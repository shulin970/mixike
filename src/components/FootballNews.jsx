import React, { useState, useEffect, useCallback, useRef } from 'react'

// ---------------------------------------------------------------------------
// Static fallback news — always works, replaced by live data when available.
// ---------------------------------------------------------------------------
const STATIC_NEWS = [
  {
    id: 1,
    title: '2026 世界杯揭幕战：墨西哥 vs 南非 即将开战',
    summary: '2026 年美加墨世界杯将于 6 月 11 日在墨西哥城阿兹特克球场打响揭幕战，东道主墨西哥迎战南非。',
    source: 'FIFA 官方',
    time: '2 小时前',
    tag: '赛事预告',
    emoji: '🏟️',
  },
  {
    id: 2,
    title: '48 支球队创历史！2026 世界杯新赛制全解读',
    summary: '本届世界杯首次扩军至 48 支球队、12 个小组，淘汰赛新增 1/16 决赛轮次，赛制全面升级。',
    source: 'ESPN',
    time: '5 小时前',
    tag: '赛制分析',
    emoji: '📊',
  },
  {
    id: 3,
    title: '梅西确认参赛？阿根廷公布初选大名单',
    summary: '阿根廷主帅透露梅西已表态愿意参加 2026 世界杯，初选名单中包含多名年轻新秀。',
    source: 'TyC Sports',
    time: '8 小时前',
    tag: '球星动态',
    emoji: '⚽',
  },
  {
    id: 4,
    title: '美国队公布 26 人名单，普利西奇领衔出征',
    summary: '东道主美国队正式公布世界杯名单，队长普利西奇将领衔出战，多位欧洲联赛球员入选。',
    source: 'FOX Sports',
    time: '12 小时前',
    tag: '球队名单',
    emoji: '🇺🇸',
  },
  {
    id: 5,
    title: '加拿大首次以东道主身份征战世界杯',
    summary: '作为联合东道主之一，加拿大队自动获得参赛资格，将在多伦多和温哥华进行小组赛。',
    source: 'CBC Sports',
    time: '1 天前',
    tag: '东道主',
    emoji: '🇨🇦',
  },
  {
    id: 6,
    title: '16 座主办城市全部就绪，场馆巡礼一览',
    summary: '从墨西哥城到纽约，从达拉斯到温哥华，16 座世界杯主办城市场馆全部完成升级改造。',
    source: 'FIFA 官方',
    time: '1 天前',
    tag: '场馆',
    emoji: '🏗️',
  },
]

// ---------------------------------------------------------------------------
// Try fetching live football news from public RSS→JSON proxies.
// If all fail, fall back to STATIC_NEWS so the section always renders.
// ---------------------------------------------------------------------------
async function fetchLiveNews() {
  // Try multiple free RSS-to-JSON endpoints for football news
  const feeds = [
    {
      url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.fifa.com/rss.xml',
      extract: (data) =>
        (data.items || []).slice(0, 8).map((item, i) => ({
          id: `live-${i}`,
          title: item.title || '',
          summary: (item.description || '').replace(/<[^>]*>/g, '').slice(0, 120),
          source: 'FIFA',
          time: item.pubDate ? formatTime(item.pubDate) : '刚刚',
          tag: 'FIFA',
          emoji: '⚽',
          link: item.link || '#',
        })),
    },
  ]

  for (const feed of feeds) {
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 5000)
      const res = await fetch(feed.url, { signal: controller.signal })
      clearTimeout(timer)
      if (!res.ok) continue
      const data = await res.json()
      if (data.status === 'ok' && data.items?.length) {
        return feed.extract(data)
      }
    } catch {
      // network error or timeout — try next
    }
  }
  return null
}

function formatTime(dateStr) {
  try {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins} 分钟前`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours} 小时前`
    const days = Math.floor(hours / 24)
    return `${days} 天前`
  } catch {
    return '刚刚'
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function FootballNews() {
  const [news, setNews] = useState(STATIC_NEWS)
  const [loading, setLoading] = useState(true)
  const [live, setLive] = useState(false)
  const [visibleCount, setVisibleCount] = useState(4)
  const scrollRef = useRef(null)

  const load = useCallback(async () => {
    setLoading(true)
    const liveNews = await fetchLiveNews()
    if (liveNews && liveNews.length > 0) {
      setNews(liveNews)
      setLive(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  // Auto-scrolling ticker for the top banner
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let frame
    let pos = 0
    const speed = 0.5
    const step = () => {
      pos += speed
      if (pos >= el.scrollWidth / 2) pos = 0
      el.scrollLeft = pos
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [news])

  return (
    <section className="news-section">
      <div className="container">
        <div className="section-head">
          <h2>⚽ 足球新闻</h2>
          <div className="row" style={{ gap: 10 }}>
            <span className={`badge ${live ? 'teal' : 'muted'}`}>
              {live ? '实时 LIVE' : '精选'}
            </span>
            {loading && <span className="spin" />}
          </div>
        </div>

        {/* Scrolling headline ticker */}
        <div className="news-ticker-wrap">
          <div className="news-ticker" ref={scrollRef}>
            {[...news, ...news].map((n, i) => (
              <span className="news-ticker-item" key={`${n.id}-${i}`}>
                {n.emoji} {n.title}
                <span className="ticker-sep">|</span>
              </span>
            ))}
          </div>
        </div>

        {/* News cards grid */}
        <div className="news-grid">
          {news.slice(0, visibleCount).map((n) => (
            <a
              className="news-card card hover"
              key={n.id}
              href={n.link || '#'}
              target={n.link ? '_blank' : undefined}
              rel={n.link ? 'noreferrer' : undefined}
            >
              <div className="news-card-head">
                <span className="news-emoji">{n.emoji}</span>
                <span className="badge muted">{n.tag}</span>
              </div>
              <h3 className="news-title">{n.title}</h3>
              <p className="news-summary">{n.summary}</p>
              <div className="news-meta">
                <span className="news-source">{n.source}</span>
                <span className="news-time">· {n.time}</span>
              </div>
            </a>
          ))}
        </div>

        {visibleCount < news.length && (
          <div className="center mt2">
            <button className="btn ghost" onClick={() => setVisibleCount((c) => Math.min(c + 4, news.length))}>
              加载更多新闻 ↓
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
