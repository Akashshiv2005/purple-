import { Metadata } from 'next';
import HomeModule from '@/modules/home/HomeModule';
import { getSEOMetadata } from '@/shared/lib/seo';
import { API_BASE } from '@/shared/services/config';

export const metadata: Metadata = getSEOMetadata({
  title: "BizDial - Find. Connect. Grow.",
  description: "Everything you need, all in one place — with BizDial. Find local businesses, read verified reviews, and connect instantly.",
  canonicalUrl: "/",
});

export default async function Page() {
  let initialData = null;
  try {
    const res = await fetch(`${API_BASE}/homepage`, { 
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      initialData = await res.json();
    }
  } catch (err) {
    console.error('Failed to fetch home data for SSR', err);
  }

  return <HomeModule initialData={initialData} />;
}
