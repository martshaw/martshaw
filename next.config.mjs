/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placeholder.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true,
  },
  // New stable options in Next.js 15
  bundlePagesRouterDependencies: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
    ppr: 'incremental',
  },
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
