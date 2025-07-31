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
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'newssourcegy.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'guyanatimesgy.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kaieteurnewsonline.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.stabroeknews.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'newsroom.gy',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'guyanachronicle.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'demerarawaves.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'oilnow.gy',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nycaribnews.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'constitutionnet.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'caribbeannationalweekly.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
