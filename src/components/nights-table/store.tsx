import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { NightsRequestOptions, NightsResponse, formatNight } from '@/models/night'
import { fetchGraphQL } from '@/lib/graphql'

// REDUX STORE SETUP
export const initialState = {
  nights: [],
  totalCount: 0,
  isLoading: false,
}

const requestNights = () => ({
  type: 'REQUEST_NIGHTS',
})

const receivedNights = (data: NightsResponse, options: NightsRequestOptions) => ({
  type: 'RECEIVE_NIGHTS',
  data,
  options,
})

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

const persistConfig = {
  key: 'root',
  storage: storage,
}

const persistedReducer = persistReducer(persistConfig, nightsReducer)

export let store = configureStore({
  reducer: persistedReducer,
  preloadedState: initialState,
})

export let persistor = persistStore(store)

// REDUX ACTIONS
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
