import Header from '@/components/header'
import Layout from '@/components/layout'
import NightsTable from '@/components/nights-table'

const NIGHTS_ENDPOINT = 'http://localhost:8000/graphql'

const Home = () => (
  // @ts-ignore
  <Layout>
    {/* @ts-ignore */}
    <Header />
    <NightsTable
      graphqlUrl={NIGHTS_ENDPOINT}
      options={{
        area_ids: [13],
      }}
    />
  </Layout>
)

export default Home
