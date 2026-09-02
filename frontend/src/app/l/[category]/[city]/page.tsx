import { Metadata } from 'next';
import { API_BASE } from '@/shared/services/config';
import LandingPageModule from '@/modules/landing/LandingPageModule';

import { getSEOMetadata, buildDynamicKeywords } from '@/shared/lib/seo';

// 1. Fetch data on the server
async function getLandingData(category: string, city: string, area?: string) {
  const params = new URLSearchParams({ category, city });
  if (area) params.append('area', area);
  
  const res = await fetch(`${API_BASE}/seo/landing-page?${params.toString()}`, { 
    next: { revalidate: 60 } // Cache for 60 seconds
  });
  
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export async function generateMetadata({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ category: string, city: string }>, 
  searchParams: Promise<{ area?: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const qCategory = decodeURIComponent(resolvedParams.category || 'Restaurants');
  const qCity = decodeURIComponent(resolvedParams.city || 'Trichy');
  const qArea = resolvedSearchParams.area ? decodeURIComponent(resolvedSearchParams.area) : '';

  const data = await getLandingData(qCategory, qCity, qArea);
  const dynamicKeywords = buildDynamicKeywords({ category: qCategory, city: qCity, area: qArea });
  
  if (!data || !data.meta) {
    return {
      title: `${qCategory} in ${qCity} - BizDial`,
      description: `Find the best ${qCategory} in ${qCity}.`,
      keywords: dynamicKeywords,
    };
  }

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords || dynamicKeywords,
    alternates: {
      canonical: data.meta.canonical || `/l/${encodeURIComponent(qCategory)}/${encodeURIComponent(qCity)}`
    },
    openGraph: {
      title: data.meta.og_title || data.meta.title,
      description: data.meta.og_description || data.meta.description,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

// 3. Render the server component
export default async function LandingPageServer({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ category: string, city: string }>, 
  searchParams: Promise<{ area?: string }> 
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const qCategory = decodeURIComponent(resolvedParams.category || 'Restaurants');
  const qCity = decodeURIComponent(resolvedParams.city || 'Trichy');
  const qArea = resolvedSearchParams.area ? decodeURIComponent(resolvedSearchParams.area) : '';

  const initialData = await getLandingData(qCategory, qCity, qArea);

  if (!initialData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center text-slate-500">Error loading page data.</div>
      </div>
    );
  }

  return <LandingPageModule initialData={initialData} qCategory={qCategory} qCity={qCity} qArea={qArea} />;
}
