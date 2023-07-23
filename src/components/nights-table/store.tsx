import { configureStore } from '@reduxjs/toolkit'
import { Night, NightsRequestOptions, NightsResponse } from '@/models/night'
import { fetchGraphQL } from '@/lib/graphql'

export const initialState = {
  nights: [],
  totalCount: 0,
  isLoading: false,
}

const nightsReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'REQUEST_NIGHTS':
      return {
        ...state,
        isLoading: true,
      }

    case 'RECEIVE_NIGHTS':
      return {
        ...state,
        nights: action.data.nights,
        totalCount: action.data.total_count,
        isLoading: false,
      }

    default:
      return state
  }
}

export const store = configureStore({
  reducer: nightsReducer,
  preloadedState: initialState,
})

const requestNights = () => ({
  type: 'REQUEST_NIGHTS',
})

const receivedNights = (data: NightsResponse, options: NightsRequestOptions) => ({
  type: 'RECEIVE_NIGHTS',
  data,
  options,
})

const formatNight = (nightJson: any): Night => {
  return {
    ...nightJson,
    date: new Date(nightJson.date),
    start_time: new Date(nightJson.startTime),
    end_time: new Date(nightJson.endTime),
  }
}

export const fetchNights = (dispatch: any, options: NightsRequestOptions, endpoint: string) => {
  dispatch(requestNights())

  fetchGraphQL(
    endpoint,
    `
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
          artists {
            name
          }
          images {
            url
          }
        }
      }
  }
    `
  )
    .then((data) => {
      const formattedNights = data.nights.nights.map((nightJson: any) => formatNight(nightJson))
      return {
        nights: formattedNights,
        total_count: data.nights.totalCount,
      }
    })
    // @ts-ignore
    .then((data) => dispatch(receivedNights(data, options)))
    .catch((err) => console.log(err))
}
