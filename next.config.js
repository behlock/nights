/** @type {import('next').NextConfig} */

function originOf(url) {
  if (!url) return ''
  try {
    return new URL(url).origin
  } catch {
    return ''
  }
}

const STATS_ORIGIN = originOf(process.env.NEXT_PUBLIC_STATS_TRACKING_URL)
const GRAPHQL_ORIGIN = originOf(process.env.NEXT_PUBLIC_GRAPHQL_URL)

const CSP_DIRECTIVES = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${STATS_ORIGIN}`.trim(),
  `connect-src 'self' https://api.mapbox.com https://*.tiles.mapbox.com https://events.mapbox.com ${GRAPHQL_ORIGIN}`.trim(),
  "img-src 'self' https: data: blob:",
  "style-src 'self' 'unsafe-inline'",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "font-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
]

const securityHeaders = [
  { key: 'Content-Security-Policy', value: CSP_DIRECTIVES.join('; ') },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
]

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ra.co',
        port: '',
        pathname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
