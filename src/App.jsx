import React, { useState, useCallback, useEffect } from 'react'
import NavBar from './components/NavBar.jsx'
import Hero from './components/Hero.jsx'
import GroupStage from './components/GroupStage.jsx'
import Schedule from './components/Schedule.jsx'
import Predictions from './components/Predictions.jsx'
import BracketSimulator from './components/BracketSimulator.jsx'
import Analysis from './components/Analysis.jsx'
import Stars from './components/Stars.jsx'
import HostMap from './components/HostMap.jsx'
import GoldenBoot from './components/GoldenBoot.jsx'
import TeamModal from './components/TeamModal.jsx'
import FootballNews from './components/FootballNews.jsx'
import { TeamCtx } from './teamCtx.jsx'
import { refreshLive } from './services/live.js'

function Home({ onNavigate, liveKey }) {
  return (
    <>
      <Hero onNavigate={onNavigate} liveKey={liveKey} />
      <FootballNews />
      <GroupStage liveKey={liveKey} />
      <Predictions liveKey={liveKey} />
    </>
  )
}

function LiveBar({ status, onRefresh }) {
  const { ok, updated, finished, err } = status
  const msg = ok
    ? `实时同步：已更新 ${updated} 场，其中 ${finished} 场已结束`
    : err === 'no key configured'
      ? '实时未开启：未检测到 API 密钥（见 README），当前为静态数据'
      : err
        ? `实时连接失败：${err}（当前为静态数据）`
        : '正在连接实时数据…'
  return (
    <div className="container" style={{ paddingTop: 14 }}>
      <div className="row between wrap" style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 14px' }}>
        <div className="row" style={{ gap: 10 }}>
          <span className={`badge ${ok ? 'teal' : 'muted'}`}>{ok ? '实时 LIVE' : '静态'}</span>
          <span className="small dim">{msg}</span>
        </div>
        <button className="btn ghost" onClick={onRefresh} style={{ padding: '6px 12px' }}>🔄 刷新比分</button>
      </div>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('home')
  const [team, setTeam] = useState(null)
  const [liveKey, setLiveKey] = useState(0)
  const [status, setStatus] = useState({ ok: false, updated: 0, finished: 0, err: null })

  const navigate = useCallback((t) => {
    setTab(t)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const select = useCallback((id) => setTeam(id), [])
  const close = useCallback(() => setTeam(null), [])

  const refresh = useCallback(async () => {
    const r = await refreshLive()
    setStatus(r)
    setLiveKey((k) => k + 1)
  }, [])

  useEffect(() => { refresh() }, [refresh])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setTeam(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <TeamCtx.Provider value={{ select }}>
      <div className="app">
        <NavBar active={tab} onChange={navigate} />
        <LiveBar status={status} onRefresh={refresh} />

        <main>
          {tab === 'home' && <Home onNavigate={navigate} liveKey={liveKey} />}
          {tab === 'groups' && <GroupStage liveKey={liveKey} />}
          {tab === 'schedule' && <Schedule liveKey={liveKey} />}
          {tab === 'predictions' && <Predictions liveKey={liveKey} />}
          {tab === 'simulator' && <BracketSimulator />}
          {tab === 'analysis' && <Analysis />}
          {tab === 'stars' && <Stars />}
          {tab === 'map' && <HostMap />}
          {tab === 'boot' && <GoldenBoot />}
        </main>

        <footer className="foot">
          <div className="container">
            <div className="row between wrap">
              <div>
                <strong>美加墨世界杯 2026 · 预测与分析</strong>
                <div className="tiny mt">
                  分组、赛程与开球时间（北京时间 UTC+8）来自官方赛程。Elo 积分来自 eloratings.net（前20名已核实，其余为估算）。
                  配置密钥后可经 football-data.org / api-football 拉取实时比分。
                </div>
              </div>
              <div className="tiny">
                数据来源：<a href="https://en.wikipedia.org/wiki/2026_FIFA_World_Cup" target="_blank" rel="noreferrer">维基百科</a> ·{' '}
                <a href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026" target="_blank" rel="noreferrer">FIFA</a> ·{' '}
                <a href="https://www.football-data.org/" target="_blank" rel="noreferrer">football-data.org</a>
              </div>
            </div>
            <div className="tiny mt">
              预测结果基于 Elo + 泊松分布的统计模型，仅供娱乐与分析参考，不构成任何投注建议。
            </div>
          </div>
        </footer>

        {team && <TeamModal id={team} onClose={close} />}
      </div>
    </TeamCtx.Provider>
  )
}
