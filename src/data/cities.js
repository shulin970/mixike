// ============================================================================
// 2026 World Cup — 16 host cities & stadiums (real names / capacities / coords)
// Coords are used by the interactive North-America map. Capacities are WC config
// figures (approximate). Country: US / CA / MX.
// ============================================================================

export const CITIES = [
  { id:'MEX',  city:'Mexico City',     country:'MX', stadium:'Estadio Azteca',         capacity:83000, lat:19.33, lng:-99.15,  matches:'Opening match & Final-stage host' },
  { id:'GDL',  city:'Guadalajara',     country:'MX', stadium:'Estadio Akron',          capacity:48000, lat:20.66, lng:-103.34 },
  { id:'MTY',  city:'Monterrey',       country:'MX', stadium:'Estadio BBVA',           capacity:53500, lat:25.67, lng:-100.32 },
  { id:'MIA',  city:'Miami Gardens',   country:'US', stadium:'Hard Rock Stadium',      capacity:65000, lat:25.96, lng:-80.24 },
  { id:'LAX',  city:'Los Angeles',     country:'US', stadium:'SoFi Stadium',           capacity:70000, lat:33.95, lng:-118.34 },
  { id:'DAL',  city:'Dallas',          country:'US', stadium:'AT&T Stadium',           capacity:80000, lat:32.75, lng:-97.10 },
  { id:'HOU',  city:'Houston',         country:'US', stadium:'NRG Stadium',            capacity:72000, lat:29.68, lng:-95.41 },
  { id:'ATL',  city:'Atlanta',         country:'US', stadium:'Mercedes-Benz Stadium',  capacity:71000, lat:33.76, lng:-84.40 },
  { id:'SEA',  city:'Seattle',         country:'US', stadium:'Lumen Field',            capacity:69000, lat:47.60, lng:-122.33 },
  { id:'SFO',  city:'San Francisco Bay',country:'US',stadium:"Levi's Stadium",         capacity:68500, lat:37.40, lng:-121.97 },
  { id:'PHL',  city:'Philadelphia',    country:'US', stadium:'Lincoln Financial Field',capacity:67600, lat:39.90, lng:-75.17 },
  { id:'BOS',  city:'Boston',          country:'US', stadium:'Gillette Stadium',       capacity:65000, lat:42.07, lng:-71.26 },
  { id:'KC',   city:'Kansas City',     country:'US', stadium:'Arrowhead Stadium',      capacity:76000, lat:39.05, lng:-94.51 },
  { id:'NYC',  city:'New York/New Jersey',country:'US',stadium:'MetLife Stadium',     capacity:82500, lat:40.81, lng:-74.07, matches:'FINAL · 19 July 2026' },
  { id:'TOR',  city:'Toronto',         country:'CA', stadium:'BMO Field',              capacity:45000, lat:43.63, lng:-79.42 },
  { id:'VAN',  city:'Vancouver',       country:'CA', stadium:'BC Place',               capacity:54500, lat:49.28, lng:-123.11 },
]

export const FINAL_CITY_ID = 'NYC' // MetLife Stadium hosts the Final (19 Jul 2026)
