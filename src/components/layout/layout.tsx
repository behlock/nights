import CustomHead from '@/components/custom-head'

function Layout({
  seo = {
    title: 'Nights',
    description: 'Nights',
    keywords: ['Walid Behlock'],
  },
  children = null,
}) {
  return (
    <>
      <CustomHead {...seo} />
      <div>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
