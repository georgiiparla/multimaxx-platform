/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'multimaxx-assets.fra1.cdn.digitaloceanspaces.com',
        // You can specify additional properties like 'port' and 'pathname' if needed
      },
    ],
  },
};

export default nextConfig;
