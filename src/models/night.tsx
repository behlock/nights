import getGeoCoordsFromAddress from '@/utils/geocode'
import { config } from '@/utils/config'

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

const convertPhysicalAddressToCoords = async (address: string) => {
  try {
    const geoCoords = await getGeoCoordsFromAddress(address, config.MAPBOX_ACCESS_TOKEN)
    return geoCoords
  } catch (error: any) {
    console.error(error.message)
  }
}

export const formatNight = async (nightJson: any): Promise<Night> => {
  const coords = await convertPhysicalAddressToCoords(nightJson.venue?.address)

  return {
    ...nightJson,
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
