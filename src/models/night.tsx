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

export const formatNight = (nightJson: any): Night => {
  return {
    ...nightJson,
    date: new Date(nightJson.date),
    start_time: new Date(nightJson.startTime),
    end_time: new Date(nightJson.endTime),
  }
}
