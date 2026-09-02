import { MetadataRoute } from 'next';
import { API_BASE } from '@/shared/services/config';
import { getServerSiteUrl } from '@/shared/lib/siteUrl';

export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = await getServerSiteUrl();
  const defaultAllow = ['/', '/search', '/business/*'];
  const defaultDisallow = [
    '/dashboard/', 
    '/login/', 
    '/register/', 
    '/register-enterprise/',
    '/super-admin/',
    '/api/'
  ];

  const defaultRobots: MetadataRoute.Robots = {
    rules: {
      userAgent: '*',
      allow: defaultAllow,
      disallow: defaultDisallow,
    },
    sitemap: siteUrl ? `${siteUrl}/sitemap.xml` : '/sitemap.xml',
  };

  try {
    // Strip trailing /api or similar to get the backend base root URL
    const backendBase = API_BASE.replace(/\/api\/?$/, '');
    const res = await fetch(`${backendBase}/robots.txt`, { cache: 'no-store' });
    if (res.ok) {
      const text = await res.text();
      const lines = text.split('\n');
      const disallow: string[] = [];
      const allow: string[] = [];
      
      for (const line of lines) {
        if (line.toLowerCase().startsWith('disallow:')) {
          disallow.push(line.split(':')[1].trim());
        }
        if (line.toLowerCase().startsWith('allow:')) {
          allow.push(line.split(':')[1].trim());
        }
      }
      
      return {
        rules: {
          userAgent: '*',
          allow: allow.length > 0 ? allow : defaultAllow,
          disallow: disallow.length > 0 ? disallow : defaultDisallow,
        },
        sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '') : ''}/sitemap.xml`,
      };
    }
  } catch (err) {
    console.error("Failed to fetch dynamic robots.txt", err);
  }

  return defaultRobots;
}
