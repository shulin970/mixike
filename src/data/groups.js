// ============================================================================
// 2026 FIFA World Cup — Groups (verified from the Final Draw, 5 Dec 2025)
// Team order matches the official schedule graphic. The first team in each
// group is the Pot-1 seed; (H) marks a host nation.
// ============================================================================

export const GROUP_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L']

export const GROUPS = {
  A: { seed:'MEX', teams:['MEX','RSA','KOR','CZE'] }, // Mexico (H)
  B: { seed:'CAN', teams:['CAN','SUI','QAT','BIH'] }, // Canada (H)
  C: { seed:'BRA', teams:['BRA','MAR','HAI','SCO'] },
  D: { seed:'USA', teams:['USA','PAR','AUS','TUR'] }, // USA (H)
  E: { seed:'GER', teams:['GER','CUW','CIV','ECU'] },
  F: { seed:'NED', teams:['NED','JPN','TUN','SWE'] },
  G: { seed:'BEL', teams:['BEL','EGY','IRN','NZL'] },
  H: { seed:'ESP', teams:['ESP','CPV','KSA','URU'] },
  I: { seed:'FRA', teams:['FRA','SEN','NOR','IRQ'] },
  J: { seed:'ARG', teams:['ARG','ALG','AUT','JOR'] },
  K: { seed:'POR', teams:['POR','UZB','COL','COD'] },
  L: { seed:'ENG', teams:['ENG','CRO','GHA','PAN'] },
}

// Quick lookup: group letter for a team id
export const teamGroup = {}
for (const g of GROUP_LETTERS)
  for (const id of GROUPS[g].teams) teamGroup[id] = g
