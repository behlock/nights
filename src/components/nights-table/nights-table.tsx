import { useEffect } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from 'react-redux'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Night, NightsRequestOptions, NightsResponse } from "@/models/night"
import { fetchGraphQL } from '@/lib/graphql'


const NIGHTS_ENDPOINT = "http://localhost:8000/graphql"

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
        nights: action.data.nights.nights,
        totalCount: action.data.total_count,
        isLoading: false,
      }

    default:
      return state
  }
}

const store = configureStore({
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


interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right'
}

const columns: Column[] = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'content', label: 'Content', minWidth: 170 },
  { id: 'venue', label: 'Venue', minWidth: 170 },
  { id: 'artists', label: 'Artists', minWidth: 170 },
  { id: 'start_time', label: 'Start Time', minWidth: 170 },
  { id: 'end_time', label: 'End Time', minWidth: 170 },
]

const formatNight = (data: any) => {
  const nights = data.nights.nights.map((night: any) => {
    return {
      ...night,
      date: new Date(night.date),
      start_time: new Date(night.startTime),
      end_time: new Date(night.endTime),
    }
  })

  return {
    "nights": { 
      "nights": nights,
    },
    "total_count": data.nights.total_count
  }

}


const NightsTable: React.FC = () => {
  const dispatch = useDispatch()

  // @ts-ignore
  const { nights, filters, totalCount, isLoading } = useSelector((state) => ({ ...state }))

  const handleRowClick = (raId: number) => {
    window.open(`https://ra.co/events/${raId}`, "_blank")
  }

  const fetchNights = (options: NightsRequestOptions) => {
    dispatch(requestNights())
    const postOptions = { filters, ...options }

    fetchGraphQL(NIGHTS_ENDPOINT, 
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
          }
        }
    }
      `,

    )
    .then((data) => formatNight(data))
      // @ts-ignore
      .then((data) => dispatch(receivedNights( data, postOptions)))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    dispatch(requestNights())

    const options = {
      area_ids: [13],
    }

    const postOptions = { filters, ...options }

    fetchNights(postOptions)
  }, [])

  const Header = () => {
    return (
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.id} className="w-[100px]">
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
    )
  }

  return (
    <>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="my-3 flex-col items-center">
          <Table>
            <Header />
            <TableBody>
              {nights.map((night: Night, index: number) => {
                return (
                  <TableRow key={night.night_id} data-testid={index} onClick={() => handleRowClick(night.raId)}>
                    <TableCell>{night.title}</TableCell>
                    <TableCell>{night.date.toString()}</TableCell>
                    <TableCell>{night.content}</TableCell>
                    <TableCell>{night.venue.name}</TableCell>
                    <TableCell>{night.artists.map((artist) => artist.name).join(", ")}</TableCell>
                    <TableCell>{night.start_time.toString()}</TableCell>
                    <TableCell>{night.end_time.toString()}</TableCell>

                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}

const NightsTableWithProvider = () => (
  <Provider store={store}>
    <NightsTable />
  </Provider>
)

export default NightsTableWithProvider
