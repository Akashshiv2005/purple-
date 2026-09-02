import React from 'react';
import { getMediaUrl } from '@/shared/services/api';

export default function BusinessSchema({ business, slug }: { business: any, slug: string }) {
  if (typeof window === 'undefined') return null;
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": business.business_name,
        "image": getMediaUrl(business.logo_url) || `${window.location.origin}/default-logo.png`,
        "url": `${window.location.origin}/business/${slug}`,
        "telephone": business.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": business.address,
          "addressLocality": business.area,
          "addressRegion": business.city,
          "postalCode": business.pincode,
          "addressCountry": "IN"
        },
        "aggregateRating": business.total_reviews > 0 ? {
          "@type": "AggregateRating",
          "ratingValue": business.average_rating || "4.5",
          "reviewCount": business.total_reviews
        } : undefined
      })
    }} />
  );
}
