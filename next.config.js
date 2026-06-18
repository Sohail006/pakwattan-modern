/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // For better deployment compatibility
  
  // Performance optimizations
  experimental: {
    // optimizeCss: true, // Disabled - critters is deprecated, Next.js 14 requires it internally
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Webpack configuration for better chunk handling
  webpack: (config, { isServer, dev }) => {
    // Improve chunk loading reliability in production
    if (!isServer && !dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }
    return config
  },
  
  // Suppress RSC prefetch warnings for non-existent routes
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Enhanced compression and security
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Image optimization - ENABLED for better performance
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pakwattan.edu.pk',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.sharkasp.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sohailghsno4-001-site8.rtempurl.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    unoptimized: false // ENABLED - Images will be optimized
  },
  
  // API rewrites: dev proxies /api to local ASP.NET over HTTP to avoid local
  // self-signed certificate trust issues during development.
  async rewrites() {
    // Get API base URL from environment or use defaults (no trailing slash — avoids //api in destination)
    const raw =
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
      (process.env.NODE_ENV === 'production'
        ? 'https://sohailghsno4-001-site8.rtempurl.com'
        : 'http://localhost:5267')
    const apiBaseUrl = String(raw).replace(/\/+$/, '')

    // Proxies same-origin /api/* to the ASP.NET API. Client code that uses lib/api/client (getApiBaseUrl())
    // talks to the API directly and does not use this rewrite. App Router handlers under app/api/ are not
    // reachable for paths matched here (the rewrite runs first for those requests).
    const rewrites = [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/api/:path*`
      },
      {
        source: '/uploads/:path*',
        destination: `${apiBaseUrl}/uploads/:path*`
      }
    ]
    
    return rewrites
  },
  
  // Environment-specific configurations
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Static export configuration
  trailingSlash: false,
  
  // Asset prefix for CDN (if using)
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
}

module.exports = nextConfig
