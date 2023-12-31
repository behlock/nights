import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import * as React from 'react'

import { DataTable } from '@/components/ui/data-table'
import { persistor, store } from '@/components/nights-table/store'
import { columns } from '@/components/nights-table/columns'
import { handleNightClick } from '@/utils/ra'

const NightsTable: React.FC = (props: any) => (
  <DataTable
    columns={columns}
    data={props.filteredNights}
    handleRowClick={handleNightClick}
    handleRowClickAccessor="raId"
  />
)

NightsTable.propTypes = {
  filteredNights: PropTypes.array.isRequired,
}

const NightsTableWithProvider = (props: any) => (
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      {/* @ts-ignore */}
      <NightsTable filteredNights={props.filteredNights} />
    </PersistGate>
  </Provider>
)

export default NightsTableWithProvider
