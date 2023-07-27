import Header from '@/components/header'
import Layout from '@/components/layout'
import NightsTable from '@/components/nights-table'
import { config } from '@/lib/config'

import { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { RefreshCw } from 'lucide-react'
import * as React from 'react'
import * as JsSearch from 'js-search'

import {
  fetchNights,
  filterNights,
  persistor,
  setSearchQuery,
  setSelectedGenres,
  setSelectedVenues,
  store,
} from '@/components/nights-table/store'
import { Input } from '@/components/ui/input'
import DropdownCheckboxes from '@/components/dropdown-checkboxes'
import { Genre, Night, Venue } from '@/models/night'
import { PersistGate } from 'redux-persist/integration/react'

const Home = () => {
  const graphqlUrl = config.GRAPHQL_URL
  const options = { area_ids: [13] }

  // @ts-ignore
  let { nights, isLoading, filteredNights, selectedGenres, selectedVenues, searchQuery } = useSelector((state) => ({
    ...state,
  }))

  const dispatch = useDispatch()

  // SMART SEARCH
  let search = new JsSearch.Search('title')
  search.addIndex('title')
  search.addIndex(['genres', 'name'])
  search.addIndex(['artists', 'name'])
  search.addIndex(['venue', 'name'])
  search.addIndex(['venue', 'area', 'name'])
  search.addIndex('date')
  search.addDocuments(nights)

  useEffect(() => {
    if (nights.length === 0) {
      // @ts-ignore
      fetchNights(dispatch, options, graphqlUrl)
    }
  }, [])

  useEffect(() => {
    if (searchQuery.length > 0) {
      dispatch(filterNights(search.search(searchQuery)))
    } else {
      dispatch(filterNights(nights))
    }
  }, [searchQuery])

  useEffect(() => {
    if (selectedGenres.length == genres.size) {
      dispatch(filterNights(nights))
    } else {
      dispatch(
        filterNights(nights.filter((night: Night) => night.genres.some((genre) => selectedGenres.includes(genre.name))))
      )
    }
  }, [selectedGenres])

  useEffect(() => {
    if (selectedVenues.length == genres.size) {
      dispatch(filterNights(nights))
    } else {
      dispatch(filterNights(nights.filter((night: Night) => selectedVenues.includes(night.venue?.name))))
    }
  }, [selectedVenues])

  let genres = new Set((nights.map((night: Night) => night.genres).flat() as any).map((genre: Genre) => genre.name))
  let venues = new Set(nights.map((night: Night) => night.venue?.name))

  return (
    // @ts-ignore
    <Layout>
      {/* @ts-ignore */}
      <Header />
      {isLoading ? (
        <div className="mr-8 mt-4 flex justify-center align-middle font-semibold text-primary">[loading...]</div>
      ) : (
        <>
          <div className="flex flex-row items-center justify-end py-4">
            <DropdownCheckboxes
              // @ts-ignore
              triggerLabel={'Genres'}
              items={(
                [
                  {
                    label: 'None',
                    checked: selectedGenres.length === 0,
                    onCheckedChange: (checked: any) => {
                      if (checked) {
                        dispatch(setSelectedGenres([]))
                      }
                    },
                  },
                  {
                    label: 'All',
                    checked: selectedGenres.length === genres.size,
                    onCheckedChange: (checked: any) => {
                      if (checked) {
                        // @ts-ignore
                        dispatch(setSelectedGenres(Array.from(genres.values())))
                      }
                    },
                  },
                ] as any
              ).concat(
                Array.from(genres.values()).map((genre) => ({
                  label: genre,
                  checked: selectedGenres.includes(genre),
                  onCheckedChange: (checked: any) => {
                    if (checked) {
                      dispatch(setSelectedGenres([...selectedGenres, genre]))
                    } else {
                      dispatch(
                        setSelectedGenres(selectedGenres.filter((selectedGenre: Genre) => selectedGenre !== genre))
                      )
                    }
                  },
                }))
              )}
            />
            <DropdownCheckboxes
              // @ts-ignore
              triggerLabel="Venues"
              items={(
                [
                  {
                    label: 'None',
                    checked: selectedVenues.length === 0,
                    onCheckedChange: (checked: any) => {
                      if (checked) {
                        dispatch(setSelectedVenues([]))
                      }
                    },
                  },
                  {
                    label: 'All',
                    checked: selectedVenues.length === venues.size,
                    onCheckedChange: (checked: any) => {
                      if (checked) {
                        // @ts-ignore
                        dispatch(setSelectedVenues(Array.from(venues.values())))
                      }
                    },
                  },
                ] as any
              ).concat(
                Array.from(venues.values()).map((venue) => ({
                  label: venue,
                  checked: selectedVenues.includes(venue),
                  onCheckedChange: (checked: any) => {
                    if (checked) {
                      dispatch(setSelectedVenues([...selectedVenues, venue]))
                    } else {
                      dispatch(
                        setSelectedVenues(selectedVenues.filter((selectedVenue: Venue) => selectedVenue !== venue))
                      )
                    }
                  },
                }))
              )}
            />
            <RefreshCw
              className="mr-4 h-4 w-4 cursor-pointer text-muted-foreground"
              // @ts-ignore
              onClick={() => fetchNights(dispatch, options, graphqlUrl)}
            />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="max-w-sm"
            />
          </div>

          <NightsTable filteredNights={filteredNights} />
        </>
      )}
    </Layout>
  )
}

const HomeWithProvider = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      {/* @ts-ignore */}
      <Home />
    </PersistGate>
  </Provider>
)

export default HomeWithProvider
