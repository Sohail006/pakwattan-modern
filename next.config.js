/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // For better deployment compatibility
  images: {
    domains: ['localhost', 'pakwattan.edu.pk', 'www.sharkasp.net'],
    unoptimized: true
  },
  // For production deployment
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? 'https://www.sharkasp.net/api/:path*' 
          : 'http://localhost:5000/api/:path*'
      }
    ]
  },
  // Environment-specific configurations
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Optimize for production
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Static export configuration (if needed)
  trailingSlash: false,
  // Asset prefix for CDN (if using)
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
}

module.exports = nextConfig
