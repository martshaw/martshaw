const nextConfig = {
  images: {
    domains: ["martshaw.com", "v0.dev"],
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
