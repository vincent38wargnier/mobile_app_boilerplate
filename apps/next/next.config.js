/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: "loose"
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es'],
  }
}

module.exports = nextConfig 