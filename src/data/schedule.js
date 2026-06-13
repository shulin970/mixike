// ============================================================================
// 2026 World Cup — Schedule  (matches the official group-stage fixture list)
// ----------------------------------------------------------------------------
// All 72 group-stage matches: real matchups, dates and kick-off times.
// Times are in BEIJING TIME (UTC+8) as published in the official schedule.
// Host cities: host nations are pinned to home venues; other matches rotate
// across the 16 real host cities (indicative venue, since the graphic lists
// no per-match stadium).
// Round-of-32 slots + dates come from the official knockout graphic.
// ============================================================================

import { CITIES } from './cities.js'

// [group, MM-DD, HH:MM, home, away]
const RAW = [
  // ---- Group A ----
  ['A', '06-12', '03:00', 'MEX', 'RSA'],
  ['A', '06-12', '10:00', 'KOR', 'CZE'],
  ['A', '06-19', '00:00', 'CZE', 'RSA'],
  ['A', '06-19', '09:00', 'MEX', 'KOR'],
  ['A', '06-25', '09:00', 'CZE', 'MEX'],
  ['A', '06-25', '09:00', 'RSA', 'KOR'],
  // ---- Group B ----
  ['B', '06-13', '03:00', 'CAN', 'BIH'],
  ['B', '06-14', '03:00', 'QAT', 'SUI'],
  ['B', '06-19', '06:00', 'CAN', 'QAT'],
  ['B', '06-19', '06:00', 'BIH', 'SUI'],
  ['B', '06-25', '03:00', 'BIH', 'QAT'],
  ['B', '06-25', '03:00', 'SUI', 'CAN'],
  // ---- Group C ----
  ['C', '06-14', '06:00', 'BRA', 'MAR'],
  ['C', '06-14', '09:00', 'HAI', 'SCO'],
  ['C', '06-20', '09:00', 'SCO', 'MAR'],
  ['C', '06-20', '09:00', 'BRA', 'HAI'],
  ['C', '06-25', '06:00', 'MAR', 'HAI'],
  ['C', '06-25', '06:00', 'SCO', 'BRA'],
  // ---- Group D ----
  ['D', '06-13', '09:00', 'USA', 'PAR'],
  ['D', '06-13', '12:00', 'AUS', 'TUR'],
  ['D', '06-20', '03:00', 'USA', 'AUS'],
  ['D', '06-20', '11:00', 'TUR', 'PAR'],
  ['D', '06-26', '10:00', 'PAR', 'AUS'],
  ['D', '06-26', '10:00', 'TUR', 'USA'],
  // ---- Group E ----
  ['E', '06-15', '01:00', 'GER', 'CUW'],
  ['E', '06-15', '07:00', 'CIV', 'ECU'],
  ['E', '06-21', '04:00', 'GER', 'CIV'],
  ['E', '06-21', '08:00', 'ECU', 'CUW'],
  ['E', '06-26', '04:00', 'CUW', 'CIV'],
  ['E', '06-26', '04:00', 'ECU', 'GER'],
  // ---- Group F ----
  ['F', '06-15', '04:00', 'NED', 'JPN'],
  ['F', '06-15', '10:00', 'TUN', 'SWE'],
  ['F', '06-20', '12:00', 'TUN', 'JPN'],
  ['F', '06-21', '01:00', 'NED', 'SWE'],
  ['F', '06-26', '07:00', 'JPN', 'SWE'],
  ['F', '06-26', '07:00', 'TUN', 'NED'],
  // ---- Group G ----
  ['G', '06-16', '03:00', 'BEL', 'EGY'],
  ['G', '06-16', '09:00', 'IRN', 'NZL'],
  ['G', '06-22', '03:00', 'BEL', 'IRN'],
  ['G', '06-22', '09:00', 'NZL', 'EGY'],
  ['G', '06-27', '11:00', 'EGY', 'IRN'],
  ['G', '06-27', '11:00', 'NZL', 'BEL'],
  // ---- Group H ----
  ['H', '06-16', '00:00', 'ESP', 'CPV'],
  ['H', '06-16', '06:00', 'KSA', 'URU'],
  ['H', '06-22', '00:00', 'KSA', 'CPV'],
  ['H', '06-22', '06:00', 'URU', 'CPV'],
  ['H', '06-27', '08:00', 'CPV', 'KSA'],
  ['H', '06-27', '08:00', 'URU', 'ESP'],
  // ---- Group I ----
  ['I', '06-17', '03:00', 'FRA', 'SEN'],
  ['I', '06-17', '06:00', 'NOR', 'IRQ'],
  ['I', '06-23', '05:00', 'SEN', 'NOR'],
  ['I', '06-23', '08:00', 'IRQ', 'FRA'],
  ['I', '06-27', '03:00', 'NOR', 'FRA'],
  ['I', '06-27', '03:00', 'SEN', 'IRQ'],
  // ---- Group J ----
  ['J', '06-16', '12:00', 'AUT', 'JOR'],
  ['J', '06-17', '09:00', 'ARG', 'ALG'],
  ['J', '06-23', '01:00', 'ARG', 'AUT'],
  ['J', '06-23', '11:00', 'JOR', 'ALG'],
  ['J', '06-28', '10:00', 'ALG', 'AUT'],
  ['J', '06-28', '10:00', 'JOR', 'ARG'],
  // ---- Group K ----
  ['K', '06-18', '01:00', 'POR', 'COD'],
  ['K', '06-18', '10:00', 'UZB', 'COL'],
  ['K', '06-24', '01:00', 'POR', 'UZB'],
  ['K', '06-24', '10:00', 'COL', 'COD'],
  ['K', '06-28', '07:30', 'COD', 'POR'],
  ['K', '06-28', '07:30', 'UZB', 'COL'],
  // ---- Group L ----
  ['L', '06-18', '04:00', 'ENG', 'CRO'],
  ['L', '06-18', '07:00', 'GHA', 'PAN'],
  ['L', '06-24', '04:00', 'ENG', 'GHA'],
  ['L', '06-24', '07:00', 'PAN', 'CRO'],
  ['L', '06-28', '05:00', 'CRO', 'GHA'],
  ['L', '06-28', '05:00', 'PAN', 'ENG'],
]

// City pools for non-host-nation matches (host nations are handled separately).
const POOLS = {
  A:['GDL','MTY'], B:['VAN'],       C:['SEA','SFO'], D:['LAX','HOU','PHL'],
  E:['MIA','ATL'], F:['DAL','BOS'],  G:['ATL','NYC'], H:['LAX','SEA'],
  I:['DAL','KC'],  J:['NYC','MIA'],  K:['SFO','VAN'], L:['PHL','BOS'],
}
const US_HOME = ['LAX', 'HOU', 'PHL']
let _usaIdx = 0, _canIdx = 0
function cityFor(group, home, away, idx) {
  if (home === 'MEX' || away === 'MEX') return 'MEX'
  if (home === 'USA' || away === 'USA') return US_HOME[_usaIdx++ % 3]
  if (home === 'CAN' || away === 'CAN') return ['TOR', 'VAN'][_canIdx++ % 2]
  const pool = POOLS[group]
  return pool[idx % pool.length]
}

// Matchday is per-group positional (RAW lists each group's 6 games in MD order:
// MD1, MD1, MD2, MD2, MD3, MD3). A date-range rule would misclassify K & L,
// whose MD1 is on 6/18.
const _gcount = {}
const GROUP_MATCHES = RAW.map(([group, mmdd, time, home, away], i) => {
  _gcount[group] = (_gcount[group] || 0) + 1
  return {
    no: i + 1,
    phase: 'group',
    group,
    md: Math.ceil(_gcount[group] / 2), // 1,1,2,2,3,3 within each group
    home,
    away,
    date: `2026-${mmdd}`,
    time,
    cityId: cityFor(group, home, away, i),
    played: false,
    score: null,
  }
})

// Real results already in (Group A, MD1 — 12 Jun 2026, Beijing time)
function markPlayed(home, away, hg, ag) {
  const m = GROUP_MATCHES.find((x) => x.home === home && x.away === away)
  if (m) { m.played = true; m.score = [hg, ag] }
}
markPlayed('MEX', 'RSA', 2, 0) // Mexico 2-0 South Africa (Estadio Azteca)
markPlayed('KOR', 'CZE', 2, 1) // South Korea 2-1 Czechia (Estadio Akron, Guadalajara)

// ----------------------------------------------------------------------------
// Round of 32 — official slots & dates (Beijing time). "3rd" = best third-
// placed team; the specific group is decided once the group stage ends.
// ----------------------------------------------------------------------------
const R32_SLOTS = [
  ['A2','B2'], ['C1','F2'], ['E1','3rd'], ['F1','C2'], ['E2','I2'], ['I1','3rd'],
  ['A1','3rd'], ['L1','3rd'], ['G1','3rd'], ['D1','3rd'], ['H1','J2'], ['K2','L2'],
  ['B1','3rd'], ['D2','G2'], ['J1','H2'], ['K1','3rd'],
]
const R32_DATES = [
  ['06-29','03:00'], ['06-30','01:00'], ['06-30','04:30'], ['06-30','09:00'],
  ['07-01','01:00'], ['07-01','05:00'], ['07-01','09:00'], ['07-02','00:00'],
  ['07-02','04:00'], ['07-02','08:00'], ['07-03','03:00'], ['07-03','07:00'],
  ['07-03','11:00'], ['07-04','02:00'], ['07-04','06:00'], ['07-04','09:30'],
]
export const R32_MATCHES = R32_SLOTS.map(([s1, s2], i) => ({
  no: 73 + i,
  phase: 'r32',
  date: `2026-${R32_DATES[i][0]}`,
  time: R32_DATES[i][1],
  slot1: s1,
  slot2: s2,
}))

// Later knockout rounds (real windows / host cities)
export const KNOCKOUT_ROUNDS = [
  { id:'R16', name:'16 强',   window:'7月5日 – 7月8日',  cities:'美国 · 墨西哥' },
  { id:'QF',  name:'1/4 决赛', window:'7月9日 – 7月11日', cities:'美国 · 墨西哥' },
  { id:'SF',  name:'半决赛',   window:'7月14日 – 7月15日',cities:'阿灵顿 · 亚特兰大' },
  { id:'3rd', name:'三四名决赛',window:'7月18日',         cities:'迈阿密' },
  { id:'F',   name:'决赛',     window:'7月19日',         cities:'东卢瑟福（大都会球场）' },
]

export { GROUP_MATCHES }
export const UPCOMING_MATCHES = GROUP_MATCHES.filter((m) => !m.played)
export const PLAYED_MATCHES = GROUP_MATCHES.filter((m) => m.played)
export const cityName = (id) => (CITIES.find((c) => c.id === id) || { city: id }).city
