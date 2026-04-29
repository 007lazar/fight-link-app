import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow images from external sources (event/gym posters from APIs)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
