import type { ColumnDef, Column } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import type { Artist, Genre, Night } from '@/models/night'
import { Button } from '@/components/ui/button'
import { dateToDateString, dateToTimeString, relativeDateFromToday } from '@/utils/date'

const headerWithSorting = (column: Column<Night, unknown>, content: string) => (
  <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
    {content}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
)

const header = (content: string) => <div className="font-small text-left">{content}</div>

const cell = (content: string | undefined) => <div className="font-small text-left">{content ?? ''}</div>

const dateCell = (mainDate: Date, startTime: Date, endTime: Date) => (
  <div className="font-small flex flex-col space-y-1 whitespace-nowrap text-left">
    <span>{dateToDateString(mainDate)}</span> <span>({relativeDateFromToday(mainDate)})</span>
    <span> {`${dateToTimeString(startTime)} - ${dateToTimeString(endTime)}`}</span>
  </div>
)

export const columns: ColumnDef<Night>[] = [
  {
    accessorKey: 'title',
    header: () => header('Title'),
    cell: ({ row }) => cell(row.getValue<string>('title')),
  },
  {
    accessorKey: 'artists',
    header: () => header('Artists'),
    cell: ({ row }) => cell((row.getValue<Artist[]>('artists') ?? []).map((a) => a.name).join(', ')),
  },
  {
    accessorKey: 'genres',
    header: () => header('Genres'),
    cell: ({ row }) => cell((row.getValue<Genre[]>('genres') ?? []).map((g) => g.name).join(', ')),
  },
  {
    accessorKey: 'venue',
    header: () => header('Venue'),
    cell: ({ row }) => cell(row.getValue<Night['venue']>('venue')?.name),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => headerWithSorting(column, 'Date'),
    cell: ({ row }) =>
      dateCell(new Date(row.getValue<string>('date')), new Date(row.original.startTime), new Date(row.original.endTime)),
  },
  {
    accessorKey: 'content',
    header: () => header('Content'),
    cell: ({ row }) => cell(row.getValue<string | undefined>('content')),
  },
]
