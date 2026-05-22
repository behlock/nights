import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { Night } from '@/models/night'

export type View = 'table' | 'map'

export interface NightsState {
  nights: Night[]
  filteredNights: Night[]
  isLoading: boolean
  selectedGenres: string[]
  selectedVenues: string[]
  searchQuery: string
  view: View
}

const initialState: NightsState = {
  nights: [],
  filteredNights: [],
  isLoading: false,
  selectedGenres: [],
  selectedVenues: [],
  searchQuery: '',
  view: 'table',
}

const nightsSlice = createSlice({
  name: 'nights',
  initialState,
  reducers: {
    requestNights(state) {
      state.isLoading = true
    },
    receiveNights(state, action: PayloadAction<Night[]>) {
      state.nights = action.payload
      state.filteredNights = action.payload
      state.isLoading = false
    },
    filterNights(state, action: PayloadAction<Night[]>) {
      state.filteredNights = action.payload
    },
    setMapView(state) {
      state.view = 'map'
    },
    setTableView(state) {
      state.view = 'table'
    },
    setSelectedGenres(state, action: PayloadAction<string[]>) {
      state.selectedGenres = action.payload
    },
    setSelectedVenues(state, action: PayloadAction<string[]>) {
      state.selectedVenues = action.payload
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
  },
})

export const {
  requestNights,
  receiveNights,
  filterNights,
  setMapView,
  setTableView,
  setSelectedGenres,
  setSelectedVenues,
  setSearchQuery,
} = nightsSlice.actions

export default nightsSlice.reducer
