const MAPBOX_API_BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const MAX_ADDRESS_LENGTH = 200
const CACHE_MAX_ENTRIES = 1000

type GeoCoords = { latitude: number; longitude: number }

const cache = new Map<string, GeoCoords | null>()

function cacheSet(key: string, value: GeoCoords | null) {
  if (cache.size >= CACHE_MAX_ENTRIES) {
    const oldest = cache.keys().next().value
    if (oldest !== undefined) cache.delete(oldest)
  }
  cache.set(key, value)
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const raw = url.searchParams.get('address')
  const address = (raw ?? '').trim()
  if (!address || address.length > MAX_ADDRESS_LENGTH) {
    return Response.json({ error: 'Invalid address' }, { status: 400 })
  }

  const token = process.env.MAPBOX_ACCESS_TOKEN
  if (!token) {
    return Response.json({ error: 'Geocoding not configured' }, { status: 500 })
  }

  if (cache.has(address)) {
    const cached = cache.get(address)
    if (!cached) return Response.json({ error: 'Location not found' }, { status: 404 })
    return Response.json(cached, { headers: { 'Cache-Control': 'public, max-age=86400' } })
  }

  try {
    const upstreamUrl = `${MAPBOX_API_BASE_URL}${encodeURIComponent(address)}.json?access_token=${encodeURIComponent(token)}&limit=1`
    const upstream = await fetch(upstreamUrl)
    if (!upstream.ok) {
      return Response.json({ error: 'Upstream geocoding failed' }, { status: 502 })
    }
    const data = await upstream.json()
    const feature = data?.features?.[0]
    if (!feature?.center || feature.center.length < 2) {
      cacheSet(address, null)
      return Response.json({ error: 'Location not found' }, { status: 404 })
    }
    const [longitude, latitude] = feature.center as [number, number]
    const coords: GeoCoords = { latitude, longitude }
    cacheSet(address, coords)
    return Response.json(coords, { headers: { 'Cache-Control': 'public, max-age=86400' } })
  } catch {
    return Response.json({ error: 'Geocoding error' }, { status: 502 })
  }
}
