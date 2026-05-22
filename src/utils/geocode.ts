interface GeoCoords {
  latitude: number
  longitude: number
}

const getGeoCoordsFromAddress = async (address: string): Promise<GeoCoords | undefined> => {
  if (!address || !address.trim()) return undefined

  const base = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000' : ''
  const response = await fetch(`${base}/api/geocode?address=${encodeURIComponent(address)}`)

  if (!response.ok) return undefined

  const data = (await response.json()) as Partial<GeoCoords>
  if (typeof data.latitude !== 'number' || typeof data.longitude !== 'number') return undefined

  return { latitude: data.latitude, longitude: data.longitude }
}

export default getGeoCoordsFromAddress
