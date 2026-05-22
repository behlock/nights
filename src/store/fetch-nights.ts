import { formatNight } from '@/models/night'
import { fetchGraphQL } from '@/utils/graphql'

import { receiveNights, requestNights } from './nights-slice'
import type { AppDispatch } from './index'

const NIGHTS_QUERY = `
  query {
    nights(input: {}) {
      nights {
        nightId
        raId
        title
        date
        content
        startTime
        endTime
        venue {
          name
          address
          area {
            name
            country {
              name
            }
          }
        }
        artists { name }
        images { url }
        genres { name }
      }
    }
  }
`

export const fetchNights = async (dispatch: AppDispatch, endpoint: string) => {
  dispatch(requestNights())
  try {
    const data = await fetchGraphQL(endpoint, NIGHTS_QUERY)
    const formatted = await Promise.all(data.nights.nights.map((n: unknown) => formatNight(n)))
    dispatch(receiveNights(formatted))
  } catch (err) {
    console.error('fetchNights failed:', err)
    dispatch(receiveNights([]))
  }
}
