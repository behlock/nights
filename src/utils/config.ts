export const config: { [key: string]: string } = {
  GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL || '',
  MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '',
}
