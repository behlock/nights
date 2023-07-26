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
  selectedGenres: [],
  selectedVenues: [],
  searchQuery: '',
  filteredNights: [],
}

const requestNights = () => ({
  type: 'REQUEST_NIGHTS',
})

const receivedNights = (data: NightsResponse) => ({
  type: 'RECEIVE_NIGHTS',
  data,
})

export const setSelectedGenres = (selectedGenres: string[]) => ({
  type: 'SET_SELECTED_GENRES',
  selectedGenres,
})

export const setSelectedVenues = (selectedVenues: string[]) => ({
  type: 'SET_SELECTED_VENUES',
  selectedVenues,
})

export const setSearchQuery = (searchQuery: string) => ({
  type: 'SET_SEARCH_QUERY',
  searchQuery,
})

export const filterNights = (filteredNights: any) => ({
  type: 'FILTER_NIGHTS',
  filteredNights,
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
        filteredNights: action.data.nights,
        isLoading: false,
      }

    case 'SET_SELECTED_GENRES':
      return {
        ...state,
        selectedGenres: action.selectedGenres,
      }

    case 'SET_SELECTED_VENUES':
      return {
        ...state,
        selectedVenues: action.selectedVenues,
      }

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.searchQuery,
      }

    case 'FILTER_NIGHTS':
      return {
        ...state,
        filteredNights: action.filteredNights,
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
          genres {
            name
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
      }
    })
    // @ts-ignore
    .then((data) => dispatch(receivedNights(data, options)))
    .catch((err) => console.log(err))
}
