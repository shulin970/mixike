import React, { useState } from 'react'
import { POS_COLOR } from '../data/squads.js'

function initials(name) {
  const parts = (name || '?').split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function slug(name) {
  return (name || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Three-tier avatar, fully automatic — no manual image needed:
//   1) real photo at /players/<slug>.jpg        (if you drop one in)
//   2) auto-generated illustrated face (DiceBear, deterministic per name)
//   3) locally-drawn position-colored initials avatar (never breaks)
export default function PlayerAvatar({ name, pos, size = 44, star = false, style = 'avataaars' }) {
  const [stage, setStage] = useState('photo') // 'photo' -> 'face' -> 'svg'
  const ring = star ? '0 0 0 2px #ffd34e' : '0 0 0 1px rgba(255,255,255,0.12)'
  const common = { borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: ring, background: 'var(--bg-2)', width: size, height: size }

  if (stage === 'photo') {
    return <img src={`/players/${slug(name)}.jpg`} alt={name} loading="lazy" onError={() => setStage('face')} style={common} />
  }
  if (stage === 'face') {
    const bg = (POS_COLOR[pos] || '#2ee6d6').replace('#', '')
    const seed = encodeURIComponent(name)
    return (
      <img
        src={`https://api.dicebear.com/9.x/${style}/svg?seed=${seed}&backgroundColor=${bg}&radius=50`}
        alt={name} loading="lazy" onError={() => setStage('svg')} style={common}
      />
    )
  }

  // final fallback: drawn avatar
  const color = POS_COLOR[pos] || '#2ee6d6'
  const gid = 'pa_' + (pos || 'x')
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ borderRadius: '50%', flexShrink: 0, boxShadow: ring }} role="img" aria-label={name}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.95" />
          <stop offset="1" stopColor={color} stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill={`url(#${gid})`} />
      <text x="20" y="21" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="800" fill="#0a1224">{initials(name)}</text>
    </svg>
  )
}
