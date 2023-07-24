import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { RefreshCw } from 'lucide-react'
import * as React from 'react'
import * as JsSearch from 'js-search'

import { DataTable } from '@/components/ui/data-table'
import {
  fetchNights,
  filterNights,
  persistor,
  setSearchQuery,
  setSelectedGenres,
  store,
} from '@/components/nights-table/store'
import { columns, handleRowClick } from '@/components/nights-table/columns'
import { Input } from '@/components/ui/input'
import DropdownCheckboxes from '@/components/dropdown-checkboxes'
import { Genre, Night } from '@/models/night'

const NightsTable: React.FC = (props: any) => {
  const { graphqlUrl, options } = props

  // @ts-ignore
  let { nights, filteredNights, isLoading, selectedGenres, searchQuery } = useSelector((state) => ({ ...state }))

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

  let genres = new Set((nights.map((night: Night) => night.genres).flat() as any).map((genre: Genre) => genre.name))

  return (
    <>
      {isLoading ? (
        <div className="mr-8 mt-4 flex justify-center align-middle font-semibold text-primary">[loading...]</div>
      ) : (
        <>
          <div className="flex flex-row items-center justify-end py-4">
            <DropdownCheckboxes
              // @ts-ignore
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

            <RefreshCw
              className="mr-4 h-4 w-4 cursor-pointer text-muted-foreground"
              onClick={() => fetchNights(dispatch, options, graphqlUrl)}
            />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="max-w-sm"
            />
          </div>
          <DataTable
            columns={columns}
            data={filteredNights}
            handleRowClick={handleRowClick}
            handleRowClickAccessor="raId"
          />
        </>
      )}
    </>
  )
}

NightsTable.propTypes = {
  graphqlUrl: PropTypes.string.isRequired,
  options: PropTypes.object,
}

const NightsTableWithProvider = (props: any) => (
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      {/* @ts-ignore */}
      <NightsTable graphqlUrl={props.graphqlUrl} options={props.options} />
    </PersistGate>
  </Provider>
)

export default NightsTableWithProvider
