import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pt-BR/auth/signin',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.grupomadretereza.com.br',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.myloview.com.br',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3333',
      },
      {
        protocol: 'https',
        hostname: 'sistema-madre-sim-back-madre.mvgvsw.easypanel.host',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'api.grupomadretereza.com.br',
        port: '',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
