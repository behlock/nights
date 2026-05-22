import * as React from 'react'

import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/components/nights-table/columns'
import { handleNightClick } from '@/utils/ra'
import type { Night } from '@/models/night'

interface NightsTableProps {
  filteredNights: Night[]
}

const NightsTable: React.FC<NightsTableProps> = ({ filteredNights }) => (
  <DataTable
    columns={columns}
    data={filteredNights}
    handleRowClick={handleNightClick}
    handleRowClickAccessor="raId"
  />
)

export default NightsTable
