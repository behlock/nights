/** @type {import('next').NextConfig} */
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
}

module.exports = nextConfig
