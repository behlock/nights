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
}

export interface NightsResponse {
  nights: Night[]
  totalCount: number
}

export interface NightsRequestOptions {
  areaIds?: number[]
}
