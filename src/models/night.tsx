import getGeoCoordsFromAddress from '@/utils/geocode'

export interface NightImage {
  nightImageId: number
  url: string
}

export interface Country {
  countryId: number
  raId: number
  name: string
  urlCode: string
}

export interface Area {
  areaId: number
  raId: number
  name: string
  country: Country
}

export interface Venue {
  venueId: number
  raId: number
  name: string
  address?: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  area?: Area
}

export interface Ticket {
  ticketId: number
  title: string
  price: string
  onSaleFrom?: Date
  // TODO: outline possible options
  validType: string
}

export interface Promoter {
  promoterId: number
  raId: number
  name: string
}

export interface Artist {
  artistId: number
  raId: number
  name: string
}

export interface Genre {
  genreId: number
  raId: number
  name: string
}

export interface Night {
  nightId: number
  raId: number
  title: string
  date: Date
  content?: string
  startTime: Date
  endTime: Date
  images: NightImage[]
  venue?: Venue
  tickets: Ticket[]
  promoters: Promoter[]
  artists: Artist[]
  genres: Genre[]
}

export interface NightsResponse {
  nights: Night[]
}

export interface NightsRequestOptions {
  areaIds?: number[]
}

const convertPhysicalAddressToCoords = async (address: string | undefined) => {
  if (!address) return undefined
  try {
    return await getGeoCoordsFromAddress(address)
  } catch (error) {
    console.error('geocode failure:', error)
    return undefined
  }
}

export const formatNight = async (input: unknown): Promise<Night> => {
  const nightJson = input as Record<string, any>
  const coords = await convertPhysicalAddressToCoords(nightJson.venue?.address)

  return {
    ...(nightJson as Night),
    date: new Date(nightJson.date),
    startTime: new Date(nightJson.startTime),
    endTime: new Date(nightJson.endTime),
    venue: {
      ...nightJson.venue,
      coordinates: coords,
      area: {
        ...nightJson.venue?.area,
        country: {
          ...nightJson.venue?.area?.country,
        },
      },
    },
  }
}
