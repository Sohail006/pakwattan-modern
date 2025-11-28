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
  // Uses NEXT_PUBLIC_BACKEND_BASE_URL environment variable or defaults
  async rewrites() {
    // Get API base URL from environment or use defaults
    const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 
      (process.env.NODE_ENV === 'production' 
        ? 'https://sohailghsno4-001-site8.rtempurl.com' 
        : 'https://localhost:7210');
    
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
