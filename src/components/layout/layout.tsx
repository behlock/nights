import CustomHead from '@/components/custom-head'
import ThemeProvider from '@/components/theme-provider'

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
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <main className="p-8">{children}</main>
      </ThemeProvider>
    </>
  )
}

export default Layout
