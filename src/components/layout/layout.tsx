import dynamic from 'next/dynamic'

import CustomHead from '@/components/custom-head'

const Header = dynamic(() => import('@/components/header'), {
  ssr: false,
})

function Layout({
  seo = {
    title: 'todo',
    description: 'todo',
    keywords: ['Walid Behlock'],
  },
  children = null,
}) {
  return (
    <>
      <CustomHead {...seo} />
      <div className="flex bg-neutral-900 p-5">
        <Header />
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout