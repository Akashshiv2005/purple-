import { Metadata } from 'next';
import SearchModule from '@/modules/search/SearchModule';
import { getSEOMetadata } from '@/shared/lib/seo';
import { API_BASE } from '@/shared/services/config';

export async function generateMetadata(
  { searchParams }: { searchParams: Promise<{ q?: string, city?: string }> }
): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams.q || '';
  const city = resolvedSearchParams.city || '';
  
  let title = "Search Local Businesses | BizDial";
  let description = "Search and find the best local businesses, services, and professionals on BizDial.";
  
  if (q && city) {
    title = `Best ${q} in ${city} | BizDial`;
    description = `Explore the best ${q} in ${city}. Compare business information, reviews, contact details and more on BizDial.`;
  } else if (q) {
    title = `Best ${q} | BizDial`;
    description = `Explore the best ${q}. Compare business information, reviews, contact details and more on BizDial.`;
  } else if (city) {
    title = `Best Businesses in ${city} | BizDial`;
    description = `Explore businesses in ${city}. Find local services, read reviews, and get contact details on BizDial.`;
  }

  return getSEOMetadata({
    title,
    description,
    canonicalUrl: `/search?q=${encodeURIComponent(q)}&city=${encodeURIComponent(city)}`,
  });
}

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string, city?: string, lat?: string, lng?: string, radius?: string }> 
}) {
  const resolvedSearchParams = await searchParams;
  let initialData: any[] = [];
  
  try {
    const params = new URLSearchParams();
    if (resolvedSearchParams.q) params.append('q', resolvedSearchParams.q);
    if (resolvedSearchParams.city) params.append('city', resolvedSearchParams.city);
    if (resolvedSearchParams.lat) params.append('lat', resolvedSearchParams.lat);
    if (resolvedSearchParams.lng) params.append('lng', resolvedSearchParams.lng);
    if (resolvedSearchParams.radius) params.append('radius', resolvedSearchParams.radius);

    const res = await fetch(`${API_BASE}/search?${params.toString()}`, { cache: 'no-store' });
    if (res.ok) {
      initialData = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch search data for SSR", err);
  }

  return <SearchModule initialData={initialData} initialSearchParams={resolvedSearchParams} />;
}
