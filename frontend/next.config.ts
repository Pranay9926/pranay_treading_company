
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      { // Add Unsplash domain
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Recommended for Next.js 13+ App Router and fill prop in Image component
  experimental: {
    appDir: true, // Ensure App Router is enabled (should be default)
    // If you encounter issues with 'fill' prop, this might help, but often not needed:
    // images: {
    //   allowFutureImage: true,
    // },
  },
};

export default nextConfig;
