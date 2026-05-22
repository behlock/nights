// All values below come from NEXT_PUBLIC_* envs and reach the browser. The Mapbox
// access token here is used only for tile rendering and MUST be domain-restricted in
// the Mapbox dashboard. Geocoding uses a separate, unrestricted server-only token
// read directly from process.env.MAPBOX_ACCESS_TOKEN (see src/pages/api/geocode.ts).
export const config = {
  STATS_TRACKING_URL: process.env.NEXT_PUBLIC_STATS_TRACKING_URL ?? '',
  GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? '',
  MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '',
  MAPBOX_MAP_STYLE_DARK: process.env.NEXT_PUBLIC_MAPBOX_MAP_STYLE_DARK ?? '',
  MAPBOX_MAP_STYLE_LIGHT: process.env.NEXT_PUBLIC_MAPBOX_MAP_STYLE_LIGHT ?? '',
} as const
