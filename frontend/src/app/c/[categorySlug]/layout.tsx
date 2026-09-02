import { Metadata } from 'next';
import { getSEOMetadata } from '@/shared/lib/seo';

export async function generateMetadata(
  { params }: { params: Promise<{ categorySlug: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.categorySlug || '';
  const formattedCategory = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return getSEOMetadata({
    title: `Best ${formattedCategory} Near You - Top Rated Services & Businesses`,
    description: `Discover verified, top-rated ${formattedCategory} in your city. Read customer reviews, view working hours, get contact numbers and find exact locations on BizDial.`,
    canonicalUrl: `/c/${slug}`,
    keywords: [
      `${formattedCategory} near me`,
      `Best ${formattedCategory}`,
      `Top 10 ${formattedCategory}`,
      `Verified ${formattedCategory} listings`,
      `${formattedCategory} contact numbers & addresses`,
      `${formattedCategory} customer reviews`,
      `Affordable ${formattedCategory}`,
      `Emergency ${formattedCategory} 24/7`
    ]
  });
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
