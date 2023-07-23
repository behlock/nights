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
        <main className="p-8">{children}</main>
      </div>
    </>
  )
}

export default Layout
