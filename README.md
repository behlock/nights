![Home](/assets/home.png?raw=true "Home")
![Map](/assets/map.png?raw=true "Map")

### [nights]

Sane way to explore music events happening around.

## Stack

- Next.js 16 (App Router) + React 19
- Redux Toolkit 2 + redux-persist (only `view` is persisted)
- Mapbox GL 3 / react-map-gl 8
- Tailwind CSS 3 + shadcn-style components on Radix UI
- TypeScript 6 (strict, `noUncheckedIndexedAccess`)

## Setup

```bash
cp .env.example .env.local
# fill in tokens — see notes below
npm install
npm run dev
```

Then open http://localhost:3000.

### Mapbox tokens — important

Two Mapbox tokens are required:

| Env var | Where it's used | Restriction |
|---|---|---|
| `MAPBOX_ACCESS_TOKEN` | server-only, `/api/geocode` | unrestricted (used from your server) |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | client-only, map tile rendering | **MUST be URL-restricted in the Mapbox dashboard** to your production origin(s). Browsers expose this token in network requests — without URL restriction, anyone can scrape it and bill your account. |

Geocoding never hits Mapbox directly from the browser — it goes through `/api/geocode`, which holds the server token and caches results in memory.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Next dev server |
| `npm run build` | Production build (Turbopack) |
| `npm run start` | Run production build |
| `npm run lint` | ESLint (flat config) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run clear-cache` | Nuke `node_modules`, `package-lock.json`, `.next` |

## Security notes

- Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) are set in `next.config.js`. Adjust the CSP `connect-src` if you change `NEXT_PUBLIC_GRAPHQL_URL` to a domain that doesn't match.
- `NEXT_PUBLIC_GRAPHQL_ALLOWED_HOSTS` is a defense-in-depth allowlist enforced inside `src/utils/graphql.ts`. Always set it in production.
- Re-run `npm audit` periodically. The two remaining moderate warnings (transitive `postcss` in Next's bundle) only affect build-time CSS stringification.
