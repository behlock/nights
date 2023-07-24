import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Night } from '@/models/night'
import { Button } from '@/components/ui/button'
import { dateToDateString, dateToTimeString, relativeDateFromToday } from '@/lib/date'

const headerWithSorting = (column: any, content: string) => (
  <Button className="text-black" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
    {content}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
)

const header = (column: any, content: string) => <div className="font-small text-left text-black">{content}</div>

const cell = (content: string) => <div className="font-small text-left">{content}</div>

const dateCell = (mainDate: Date, start_time: Date, end_time: Date) => (
  <div className="font-small text-left flex flex-col space-y-1 whitespace-nowrap">
    <span>{dateToDateString(mainDate)}</span> <span>({relativeDateFromToday(mainDate)})</span><span> {`${dateToTimeString(start_time)} - ${dateToTimeString(end_time)}`}</span>
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

export const handleRowClick = (raId: number) => {
  window.open(`https://ra.co/events/${raId}`, '_blank')
}
