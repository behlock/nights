export interface NightImage {
  night_image_id: number
  url: string
}

export interface Country {
  country_id: number
  ra_id: number
  name: string
  url_code: string
}

export interface Area {
  area_id: number
  ra_id: number
  name: string
  country: Country
}

export interface Venue {
  venue_id: number
  ra_id: number
  name: string
  address?: string
  area?: Area
}

export interface Ticket {
  ticket_id: number
  title: string
  price: string
  on_sale_from?: Date
  valid_type: string
}

export interface Promoter {
  promoter_id: number
  ra_id: number
  name: string
}

export interface Artist {
  artist_id: number
  ra_id: number
  name: string
}

export interface Night {
  night_id: number
  ra_id: number
  title: string
  date: Date
  content?: string
  start_time: Date
  end_time: Date
  images: NightImage[]
  venue?: Venue
  tickets: Ticket[]
  promoters: Promoter[]
  artists: Artist[]
}

export interface NightsResponse {
  nights: Night[]
  total_count: number
}

export interface NightsRequestOptions {
  area_ids?: number[]
}
