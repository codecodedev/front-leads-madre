import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.grupomadretereza.com.br',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.pngall.com',
        port: '',
      },
    ],
  },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/auth/signin',
          permanent: true,
        },
      ]
    },};
 
export default withNextIntl(nextConfig);