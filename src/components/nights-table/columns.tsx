import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Night } from '@/models/night'
import { Button } from '@/components/ui/button'
import { dateToDateString, dateToTimeString, relativeDateFromToday } from '@/utils/date'

const headerWithSorting = (column: any, content: string) => (
  <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
    {content}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
)

const header = (column: any, content: string) => <div className="font-small text-left">{content}</div>

const cell = (content: string) => <div className="font-small text-left">{content}</div>

const dateCell = (mainDate: Date, startTime: Date, endTime: Date) => (
  <div className="font-small flex flex-col space-y-1 whitespace-nowrap text-left">
    <span>{dateToDateString(mainDate)}</span> <span>({relativeDateFromToday(mainDate)})</span>
    <span> {`${dateToTimeString(startTime)} - ${dateToTimeString(endTime)}`}</span>
  </div>
)

export const columns: ColumnDef<Night>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => header(column, 'Title'),
    cell: ({ row }) => cell(row.getValue('title')),
  },
  {
    accessorKey: 'artists',
    header: ({ column }) => header(column, 'Artists'),
    // @ts-ignore
    cell: ({ row }) =>
      cell(
        // @ts-ignore
        row
          .getValue('artists')
          .map((artist: any) => artist.name)
          .join(', ')
      ),
  },
  {
    accessorKey: 'genres',
    header: ({ column }) => header(column, 'Genres'),
    // @ts-ignore
    cell: ({ row }) =>
      cell(
        // @ts-ignore
        row
          .getValue('genres')
          .map((genre: any) => genre.name)
          .join(', ')
      ),
  },
  {
    accessorKey: 'venue',
    header: ({ column }) => header(column, 'Venue'),
    // @ts-ignore
    cell: ({ row }) => cell(row.getValue('venue')?.name),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => headerWithSorting(column, 'Date'),
    // @ts-ignore
    cell: ({ row }) =>
      dateCell(new Date(row.getValue('date')), new Date(row.original.startTime), new Date(row.original.endTime)),
  },
  {
    accessorKey: 'content',
    header: ({ column }) => header(column, 'Content'),
    cell: ({ row }) => cell(row.getValue('content')),
  },
]
