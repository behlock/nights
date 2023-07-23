import Header from '@/components/header'
import Layout from '@/components/layout'
import NightsTable from '@/components/nights-table'

const Home = () => (
  // @ts-ignore
  <Layout>
    {/* @ts-ignore */}
    <Header />
    <NightsTable />
  </Layout>
)

export default Home
