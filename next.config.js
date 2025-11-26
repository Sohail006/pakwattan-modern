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
  
  // Suppress RSC prefetch warnings for non-existent routes
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Enhanced compression and security
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Image optimization
  images: {
    domains: ['localhost', 'pakwattan.edu.pk', 'www.sharkasp.net', 'sohailghsno4-001-site8.rtempurl.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'sohailghsno4-001-site8.rtempurl.com',
      },
    ],
    unoptimized: true
  },
  
  // API rewrites for production deployment
  async rewrites() {
    const rewrites = [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? 'https://sohailghsno4-001-site8.rtempurl.com/api/:path*' 
          : 'https://localhost:7210/api/:path*'
      }
    ]
    
    // In development, also rewrite /uploads to the backend API
    if (process.env.NODE_ENV !== 'production') {
      rewrites.push({
        source: '/uploads/:path*',
        destination: 'https://localhost:7210/uploads/:path*'
      })
    } else {
      // In production, rewrite /uploads to the deployed API
      rewrites.push({
        source: '/uploads/:path*',
        destination: 'https://sohailghsno4-001-site8.rtempurl.com/uploads/:path*'
      })
    }
    
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
