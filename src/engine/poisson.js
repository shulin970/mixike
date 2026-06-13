// ============================================================================
// Poisson helpers — the statistical core of the score model.
// Goals in football are well-modelled as a Poisson process; we use it to turn
// each side's expected goals (λ) into a full grid of scoreline probabilities.
// ============================================================================

const FACT = [1, 1]
function factorial(n) {
  while (FACT.length <= n) FACT.push(FACT[FACT.length - 1] * FACT.length)
  return FACT[n]
}

/** P(X = k) for X ~ Poisson(lambda). */
export function poissonPmf(k, lambda) {
  if (lambda <= 0) return k === 0 ? 1 : 0
  return Math.exp(-lambda) * Math.pow(lambda, k) / factorial(k)
}

/** Knuth's algorithm — draw an integer goal count from Poisson(lambda). */
export function samplePoisson(lambda) {
  if (lambda <= 0) return 0
  const L = Math.exp(-lambda)
  let k = 0, p = 1
  do { k++; p *= Math.random() } while (p > L)
  return k - 1
}

/**
 * Joint scoreline matrix [i][j] = P(home scores i AND away scores j),
 * for i,j in 0..maxGoals, using independent Poissons with a mild draw boost.
 * Pure independent Poisson slightly under-predicts draws, so diagonal cells
 * (i===j) are nudged up by `drawBoost` and the whole grid is renormalised.
 */
export function scoreMatrix(lh, la, { maxGoals = 8, drawBoost = 1.06 } = {}) {
  const m = []
  let total = 0
  for (let i = 0; i <= maxGoals; i++) {
    m[i] = []
    for (let j = 0; j <= maxGoals; j++) {
      let p = poissonPmf(i, lh) * poissonPmf(j, la)
      if (i === j) p *= drawBoost
      m[i][j] = p
      total += p
    }
  }
  for (let i = 0; i <= maxGoals; i++)
    for (let j = 0; j <= maxGoals; j++) m[i][j] /= total
  return m
}
