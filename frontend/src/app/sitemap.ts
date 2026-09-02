import { MetadataRoute } from 'next';
import { API_BASE } from '@/shared/services/config';
import { getServerSiteUrl } from '@/shared/lib/siteUrl';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = await getServerSiteUrl();
  const now = new Date();

  // 1. Core High-Priority Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/search`,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/register`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // 2. Fetch Dynamic URLs from Backend API
  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    // Fetch categories
    const categoriesRes = await fetch(`${API_BASE}/categories`, { next: { revalidate: 3600 } });
    if (categoriesRes.ok) {
      const categories = await categoriesRes.json();
      for (const cat of categories) {
        if (cat.slug) {
          dynamicRoutes.push({
            url: `${siteUrl}/c/${cat.slug}`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      }
    }

    // Fetch verified businesses
    const businessesRes = await fetch(`${API_BASE}/search?limit=500`, { next: { revalidate: 1800 } });
    if (businessesRes.ok) {
      const searchData = await businessesRes.json();
      const businesses = Array.isArray(searchData) ? searchData : (searchData.results || []);
      for (const b of businesses) {
        const identifier = b.slug || b.id;
        if (identifier) {
          dynamicRoutes.push({
            url: `${siteUrl}/business/${identifier}`,
            lastModified: b.updated_at ? new Date(b.updated_at) : now,
            changeFrequency: 'weekly',
            priority: 0.9,
          });
        }
      }
    }
  } catch (err) {
    console.error('Error generating dynamic sitemap:', err);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
