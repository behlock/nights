import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { DataTable } from '@/components/ui/data-table'
import { fetchNights, persistor, store } from '@/components/nights-table/store'
import { columns, handleRowClick } from '@/components/nights-table/columns'

const NightsTable: React.FC = (props: any) => {
  const { graphqlUrl, options } = props

  // @ts-ignore
  const { nights, isLoading } = useSelector((state) => ({ ...state }))

  const dispatch = useDispatch()

  useEffect(() => {
    if (nights.length === 0) {
      fetchNights(dispatch, options, graphqlUrl)
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <div className="mr-8 mt-4 flex justify-center align-middle font-semibold text-primary">[loading...]</div>
      ) : (
        <DataTable
          columns={columns}
          data={nights}
          handleRowClick={handleRowClick}
          handleRowClickAccessor="raId"
          onRefreshClick={() => fetchNights(dispatch, options, graphqlUrl)}
        />
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
