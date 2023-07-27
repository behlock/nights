import Header from '@/components/header'
import Layout from '@/components/layout'
import NightsTable from '@/components/nights-table'
import { GRAPHQL_URL } from '@/lib/config'

const Home = () => (
  // @ts-ignore
  <Layout>
    {/* @ts-ignore */}
    <Header />
    <NightsTable
      graphqlUrl={GRAPHQL_URL}
      options={{
        area_ids: [13],
      }}
    />
  </Layout>
)

export default Home
