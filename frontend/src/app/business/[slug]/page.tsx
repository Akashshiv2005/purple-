import { Metadata } from 'next';
import BusinessDetailModule from '@/modules/business/BusinessDetailModule';
import { getSEOMetadata, generateLocalBusinessSchema, buildDynamicKeywords } from '@/shared/lib/seo';
import { API_BASE } from '@/shared/services/config';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  let title = "Business Details | BizDial";
  let description = "View business information, contact details, reviews and more on BizDial.";
  let ogImage = undefined;
  let dynamicKeywords: string[] | undefined = undefined;
  
  try {
    const res = await fetch(`${API_BASE}/business/${resolvedParams.slug}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.business) {
        const b = data.business;
        title = b.seo_title || `${b.business_name} - Best ${b.category || 'Service'} in ${b.city} | BizDial`;
        description = b.seo_description || b.description || `Looking for ${b.category} in ${b.city}? Visit ${b.business_name} at ${b.address}. Read reviews and get contact details.`;
        if (b.cover_image_url) {
          ogImage = b.cover_image_url.startsWith('http') ? b.cover_image_url : `${API_BASE.replace('/api/v1', '')}${b.cover_image_url}`;
        }
        dynamicKeywords = buildDynamicKeywords({
          businessName: b.business_name,
          category: b.category,
          city: b.city,
          area: b.area,
          extra: b.seo_keywords ? b.seo_keywords.split(',').map((k: string) => k.trim()) : undefined
        });
      }
    }
  } catch (err) {
    console.error("Failed to fetch business metadata", err);
  }

  return getSEOMetadata({
    title,
    description,
    keywords: dynamicKeywords,
    canonicalUrl: `/business/${resolvedParams.slug}`,
    ogImage
  });
}

export default async function BusinessPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  let initialData = null;
  let structuredData = null;
  
  try {
    const res = await fetch(`${API_BASE}/business/${resolvedParams.slug}`, { cache: 'no-store' });
    if (res.ok) {
      initialData = await res.json();
      if (initialData && initialData.business) {
        structuredData = generateLocalBusinessSchema(initialData.business, resolvedParams.slug);
      }
    }
  } catch (err) {
    console.error("Failed to fetch business data for SSR", err);
  }

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <BusinessDetailModule initialData={initialData} initialSlug={resolvedParams.slug} />
    </>
  );
}
