import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import 'mapbox-gl/dist/mapbox-gl.css'

import '@/styles/global.scss'
import { config } from '@/utils/config'
import { Providers } from './providers'

const isHttpsUrl = (value: string) => {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

const trackingUrl = isHttpsUrl(config.STATS_TRACKING_URL) ? config.STATS_TRACKING_URL : null

export const metadata: Metadata = {
  title: 'Nights',
  description: 'Sane way to explore music events happening around',
  authors: [{ name: 'Walid Behlock' }],
  referrer: 'no-referrer',
  formatDetection: { telephone: false },
  robots: process.env.NODE_ENV !== 'development' ? 'index,follow' : 'noindex,nofollow',
  openGraph: {
    title: 'Nights',
    description: 'Sane way to explore music events happening around',
    type: 'website',
    locale: 'en_UK',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#FFFFFF' }],
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <main className="p-8">{children}</main>
        </Providers>
        {trackingUrl && <Script src={trackingUrl} strategy="lazyOnload" />}
      </body>
    </html>
  )
}
