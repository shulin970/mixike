import { createContext, useContext } from 'react'

// Lets any component open a team deep-dive modal without prop-drilling.
export const TeamCtx = createContext({ select: () => {} })
export const useTeam = () => useContext(TeamCtx)
