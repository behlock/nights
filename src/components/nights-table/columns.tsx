import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

// export const columns: ColumnDef<Night>[] = [
//   {
//     accessorKey: 'title',
//     header: 'Title',
//   },
//   {
//     accessorKey: 'date',
//     header: 'Date',
//   },
//   {
//     accessorKey: 'content',
//     header: 'Content',
//   },
//   {
//     accessorKey: 'venue',
//     header: 'Venue',
//   },
//   {
//     accessorKey: 'artists',
//     header: 'Artists',
//   },
//   {
//     accessorKey: 'start_time',
//     header: 'Start Time',
//   },
//   {
//     accessorKey: 'end_time',
//     header: 'End Time',
//   },
//   {
//     accessorKey: 'image',
//     header: 'Thumbnail',
//   },
// ]

import { Night } from '@/models/night'
import { Button } from '@/components/ui/button'

const header = (column: any, content: string) => (
  <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
    {content}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
)
const cell = (content: string) => <div className="font-small text-left">{content}</div>

export const columns: ColumnDef<Night>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => header(column, 'Title'),
    cell: ({ row }) => cell(row.getValue('title')),
  },
  {
    accessorKey: 'content',
    header: ({ column }) => header(column, 'Content'),
    cell: ({ row }) => cell(row.getValue('content')),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => header(column, 'Date'),
    // @ts-ignore
    cell: ({ row }) => cell(row.getValue('date').toString()),
  },
  {
    accessorKey: 'venue',
    header: ({ column }) => header(column, 'Venue'),
    // @ts-ignore
    cell: ({ row }) => cell(row.getValue('venue').name),
  },
  {
    accessorKey: 'artists',
    header: ({ column }) => header(column, 'Artists'),
    // @ts-ignore
    cell: ({ row }) => cell(row.getValue('artists').map((artist) => artist.name).join(', ')),
    
  },
  {
    accessorKey: 'start_time',
    header: ({ column }) => header(column, 'Start Time'),
    // @ts-ignore
    cell: ({ row }) => cell(row.getValue('start_time').toString()),
  },
  {
    accessorKey: 'end_time',
    header: ({ column }) => header(column, 'End Time'),
    // @ts-ignore
    cell: ({ row }) => cell(row.getValue('end_time').toString()),
  },
]

export const handleRowClick = (raId: number) => {
  window.open(`https://ra.co/events/${raId}`, '_blank')
}
