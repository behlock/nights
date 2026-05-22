'use client'

import { useEffect, useMemo } from 'react'
import { MapIcon, TableIcon } from 'lucide-react'
import * as JsSearch from 'js-search'

import { Input } from '@/components/ui/input'
import DropdownCheckboxes from '@/components/dropdown-checkboxes'
import Header from '@/components/header'
import NightsTable from '@/components/nights-table'
import { Button } from '@/components/ui/button'
import Map from '@/components/map'

import type { Genre, Night } from '@/models/night'
import type { DropdownCheckboxesItem } from '@/components/dropdown-checkboxes/dropdown-checkboxes'
import { config } from '@/utils/config'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  filterNights,
  setMapView,
  setSearchQuery,
  setSelectedGenres,
  setSelectedVenues,
  setTableView,
} from '@/store/nights-slice'
import { fetchNights } from '@/store/fetch-nights'

const HomeClient = () => {
  const dispatch = useAppDispatch()
  const { nights, isLoading, filteredNights, selectedGenres, selectedVenues, searchQuery, view } = useAppSelector(
    (state) => state
  )

  const search = useMemo(() => {
    const s = new JsSearch.Search('title')
    s.addIndex('title')
    s.addIndex(['genres', 'name'])
    s.addIndex(['artists', 'name'])
    s.addIndex(['venue', 'name'])
    s.addIndex(['venue', 'area', 'name'])
    s.addIndex('date')
    s.addDocuments(nights)
    return s
  }, [nights])

  const genres = useMemo(
    () => new Set(nights.flatMap((night) => night.genres ?? []).map((g: Genre) => g.name)),
    [nights]
  )
  const venues = useMemo(
    () => new Set(nights.map((night) => night.venue?.name).filter((v): v is string => !!v)),
    [nights]
  )

  useEffect(() => {
    fetchNights(dispatch, config.GRAPHQL_URL)
  }, [dispatch])

  useEffect(() => {
    if (searchQuery.length > 0) {
      dispatch(filterNights(search.search(searchQuery) as Night[]))
    } else {
      dispatch(filterNights(nights))
    }
  }, [searchQuery, nights, search, dispatch])

  useEffect(() => {
    if (selectedGenres.length === 0 || selectedGenres.length === genres.size) {
      dispatch(filterNights(nights))
      return
    }
    dispatch(
      filterNights(nights.filter((night) => night.genres.some((genre) => selectedGenres.includes(genre.name))))
    )
  }, [selectedGenres, nights, genres.size, dispatch])

  useEffect(() => {
    if (selectedVenues.length === 0 || selectedVenues.length === venues.size) {
      dispatch(filterNights(nights))
      return
    }
    dispatch(filterNights(nights.filter((night) => night.venue?.name && selectedVenues.includes(night.venue.name))))
  }, [selectedVenues, nights, venues.size, dispatch])

  return (
    <>
      <Header />
      {isLoading ? (
        <div className="mr-8 mt-4 flex justify-center align-middle font-semibold text-primary">[loading...]</div>
      ) : (
        <>
          <div className="flex flex-row items-center py-4 w-full">
            <div className="flex flex-row">
              <DropdownCheckboxes
                triggerLabel="Genres"
                items={[
                  {
                    label: 'None',
                    checked: selectedGenres.length === 0,
                    onCheckedChange: (checked) => {
                      if (checked) dispatch(setSelectedGenres([]))
                    },
                  },
                  {
                    label: 'All',
                    checked: selectedGenres.length === genres.size,
                    onCheckedChange: (checked) => {
                      if (checked) dispatch(setSelectedGenres(Array.from(genres)))
                    },
                  },
                  ...Array.from(genres).map<DropdownCheckboxesItem>((genre) => ({
                    label: genre,
                    checked: selectedGenres.includes(genre),
                    onCheckedChange: (checked) => {
                      if (checked) {
                        dispatch(setSelectedGenres([...selectedGenres, genre]))
                      } else {
                        dispatch(setSelectedGenres(selectedGenres.filter((g) => g !== genre)))
                      }
                    },
                  })),
                ]}
              />
              <DropdownCheckboxes
                triggerLabel="Venues"
                items={[
                  {
                    label: 'None',
                    checked: selectedVenues.length === 0,
                    onCheckedChange: (checked) => {
                      if (checked) dispatch(setSelectedVenues([]))
                    },
                  },
                  {
                    label: 'All',
                    checked: selectedVenues.length === venues.size,
                    onCheckedChange: (checked) => {
                      if (checked) dispatch(setSelectedVenues(Array.from(venues)))
                    },
                  },
                  ...Array.from(venues).map<DropdownCheckboxesItem>((venue) => ({
                    label: venue,
                    checked: selectedVenues.includes(venue),
                    onCheckedChange: (checked) => {
                      if (checked) {
                        dispatch(setSelectedVenues([...selectedVenues, venue]))
                      } else {
                        dispatch(setSelectedVenues(selectedVenues.filter((v) => v !== venue)))
                      }
                    },
                  })),
                ]}
              />
            </div>
            <div className="flex flex-row items-center justify-end ml-auto">
              <Button variant="outline" onClick={() => dispatch(setTableView())}>
                <TableIcon />
              </Button>
              <Button variant="outline" onClick={() => dispatch(setMapView())}>
                <MapIcon />
              </Button>
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value.slice(0, 100)))}
                className="max-w-sm"
              />
            </div>
          </div>
          {view === 'map' ? (
            <Map
              markers={filteredNights
                .map((night) => ({
                  longitude: night.venue?.coordinates?.longitude,
                  latitude: night.venue?.coordinates?.latitude,
                  raId: night.raId,
                }))
                .filter(
                  (m): m is { longitude: number; latitude: number; raId: number } =>
                    typeof m.longitude === 'number' && typeof m.latitude === 'number'
                )}
            />
          ) : (
            <NightsTable filteredNights={filteredNights} />
          )}
        </>
      )}
    </>
  )
}

export default HomeClient
