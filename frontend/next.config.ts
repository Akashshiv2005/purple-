import type { NextConfig } from "next";

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
const API_URL = rawApiUrl.replace(/\/api\/?$/, '');

const nextConfig: NextConfig = { 
  images: {
    dangerouslyAllowSVG: true,
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '127.0.0.1' },
      { protocol: 'https', hostname: 's3.amazonaws.com' },
      { protocol: 'https', hostname: 'bizdial.s3.ap-south-1.amazonaws.com' }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: `${API_URL}/sitemap.xml`,
      },
      {
        source: '/sitemap-static.xml',
        destination: `${API_URL}/sitemap-static.xml`,
      },
      {
        source: '/sitemap-categories.xml',
        destination: `${API_URL}/sitemap-categories.xml`,
      },
      {
        source: '/sitemap-locations.xml',
        destination: `${API_URL}/sitemap-locations.xml`,
      },
      {
        source: '/sitemap-businesses.xml',
        destination: `${API_URL}/sitemap-businesses.xml`,
      }
    ]
  }
};

export default nextConfig;
