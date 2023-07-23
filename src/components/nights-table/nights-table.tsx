import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { ScaleLoader } from 'react-spinners'

import { DataTable } from '@/components/ui/data-table'
import { fetchNights, store } from '@/components/nights-table/store'
import { columns, handleRowClick } from '@/components/nights-table/columns'

const NightsTable: React.FC = (props: any) => {
  // @ts-ignore
  const { nights, isLoading } = useSelector((state) => ({ ...state }))
  const { graphqlUrl, options } = props
  const dispatch = useDispatch()

  useEffect(() => {
    fetchNights(dispatch, options, graphqlUrl)
  }, [])

  return (
    <>
      {isLoading ? (
        <ScaleLoader className="text-center" color="#000000" />
      ) : (
        <DataTable columns={columns} data={nights} handleRowClick={handleRowClick} handleRowClickAccessor="raId" />
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
    {/* @ts-ignore */}
    <NightsTable graphqlUrl={props.graphqlUrl} options={props.options} />
  </Provider>
)

export default NightsTableWithProvider
