import React, { useState } from 'react'

// 3-letter team id → flagcdn code (ISO alpha-2; England/Scotland use gb-eng/gb-sct)
const ISO = {
  ESP: 'es', ARG: 'ar', FRA: 'fr', ENG: 'gb-eng', BRA: 'br', POR: 'pt', COL: 'co',
  NED: 'nl', GER: 'de', BEL: 'be', MEX: 'mx', CAN: 'ca', USA: 'us', CRO: 'hr',
  MAR: 'ma', URU: 'uy', SUI: 'ch', JPN: 'jp', SEN: 'sn', IRN: 'ir', KOR: 'kr',
  ECU: 'ec', AUT: 'at', AUS: 'au', NOR: 'no', PAN: 'pa', EGY: 'eg', ALG: 'dz',
  SCO: 'gb-sct', PAR: 'py', TUN: 'tn', CIV: 'ci', UZB: 'uz', QAT: 'qa', KSA: 'sa',
  RSA: 'za', JOR: 'jo', CPV: 'cv', GHA: 'gh', CUW: 'cw', HAI: 'ht', NZL: 'nz',
  CZE: 'cz', BIH: 'ba', TUR: 'tr', SWE: 'se', IRQ: 'iq', COD: 'cd',
}

export function flagUrl(id, w = 160) {
  return `https://flagcdn.com/w${w}/${ISO[id] || 'un'}.png`
}

// Real country flag image via flagcdn; falls back to emoji on any error
// (so it never shows a broken image, even if flagcdn is unreachable).
export default function TeamFlag({ id, emoji, size = 56, className = '', style = {} }) {
  const [err, setErr] = useState(false)
  if (err || !ISO[id]) {
    return <span className={className} style={{ fontSize: size * 0.72, lineHeight: 1, ...style }}>{emoji}</span>
  }
  return (
    <img
      src={flagUrl(id, Math.max(80, size * 2))}
      width={size}
      height={Math.round(size * 0.66)}
      loading="lazy"
      onError={() => setErr(true)}
      alt={id}
      className={className}
      style={{ borderRadius: 8, objectFit: 'cover', boxShadow: '0 0 0 1px rgba(255,255,255,0.1)', ...style }}
    />
  )
}
