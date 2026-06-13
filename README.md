# 🏆 World Cup 2026 — Predictor & Analytics

A data-rich single-page app for the **2026 FIFA World Cup (USA / Canada / Mexico)**: real
groups & schedule, an **Elo + Poisson score-prediction engine**, a **10,000-run champion
simulator**, a **group-of-death & dark-horse radar**, an **interactive host-city map**, and a
**Golden Boot forecast**.

## Run it

```bash
npm install
npm run dev
```

Then open the printed URL (usually http://localhost:5173).

### Enable real-time scores (optional)

The app ships with the full schedule + a prediction engine and works with **no key**.
To pull **live scores**, pick a provider (the proxy normalizes either one):

- **football-data.org** *(recommended — free, China-accessible)* — free token at
  [football-data.org](https://www.football-data.org/) (sign up → “Get your API key”).
- **api-football** — if you can reach [api-football.com](https://www.api-football.com/).

```bash
copy .env.example .env        # macOS/Linux: cp .env.example .env
# edit .env: set LIVE_SOURCE=footballdata  and  FD_API_TOKEN=your_token
npm run dev                   # the Vite dev proxy injects the key server-side
```

A status bar at the top shows `LIVE · synced N matches` once it connects.
For a production / always-on build (same proxy, no Vite):

```bash
npm run build
node --env-file=.env server.mjs     # Node 20.6+  → http://localhost:8787
```

> The key stays on the server side (Vite dev proxy / `server.mjs`) and is **never**
> shipped to the browser. Requires Node.js 18+ (20.6+ for `--env-file`). The only
> npm runtime dependency beyond React is `recharts`; the map, bracket and animations
> are hand-built.

## What's inside

| Section | What it does |
|---|---|
| **Home** | Hero with Final countdown, live/result ticker, groups + predictions |
| **Groups** | 12 real groups with live standings & Elo chips; click a team for a deep dive |
| **Schedule** | 72 real group fixtures (matchups + host cities), filterable; knockout calendar |
| **Predictions** | Every upcoming match: predicted score, W/D/L bar, top scorelines, upset %, **backtest** |
| **Champion Sim** | Monte-Carlo (1k–25k runs) → title odds, most-likely champion, round-by-round probs |
| **Analysis** | Group-of-death ranking + dark-horse radar |
| **Host Map** | SVG map of the 16 host cities; click for stadium/capacity |
| **Golden Boot** | Forecast top scorers from simulation × finishing quality |

## The model (`src/engine/`)

1. **Strength = Elo** (host nations get a +100 home bonus).
2. Win expectancy `We = 1 / (1 + 10^(−Δr/400))`.
3. Expected goals split a ~2.62 base total by `We`, nudged by recent form.
4. Independent **Poisson** over 0–8 goals + a mild draw correction → every scoreline's probability.
5. Knockouts: level on goals → penalties (decided by strength).

Top-20 Elo values are verified from eloratings.net (10 Jun 2026); the rest are estimates on the
same scale. Groups & pots are verified from the Final Draw (5 Dec 2025). Host cities/stadiums are real.

## Data sources
- [Wikipedia – 2026 FIFA World Cup](https://en.wikipedia.org/wiki/2026_FIFA_World_Cup)
- [FIFA – Final Draw results](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/final-draw-results)
- [World Football Elo Ratings](https://en.wikipedia.org/wiki/World_Football_Elo_Ratings)

*Predictions are a statistical model for entertainment & analysis — not betting advice.*
