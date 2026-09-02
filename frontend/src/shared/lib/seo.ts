import { Metadata } from 'next';

export function generateTitle(title?: string): string {
  if (title) {
    return title.replace(/\s*\|\s*BizDial/gi, '').trim();
  }
  return "Find. Connect. Grow.";
}

export function generateDescription(description?: string): string {
  const baseDescription = "Find businesses, services and useful information in one place with BizDial.";
  return description || baseDescription;
}

export const DEFAULT_KEYWORDS = [
  "BizDial",
  "Local Search Engine India",
  "Business Directory India",
  "Find Local Businesses Near Me",
  "Verified Business Listings",
  "Customer Reviews & Ratings",
  "Local Services Search",
  "Near Me Local Search",
  "Best Doctors & Clinics Near Me",
  "Top Restaurants & Cafes",
  "Home Services Plumbers Electricians",
  "Best Salons & Spas",
  "Emergency Services 24/7",
  "Trichy Business Directory",
  "Chennai Local Search",
  "Coimbatore Business Directory",
  "Madurai Local Search",
  "Tamil Nadu Business Directory",
  "India B2B & B2C Local Search"
];

export function buildDynamicKeywords(params: {
  category?: string;
  subcategory?: string;
  city?: string;
  area?: string;
  businessName?: string;
  extra?: string[];
}): string[] {
  const { category, subcategory, city, area, businessName, extra } = params;
  const keywordsSet = new Set<string>();

  // Always include brand tag
  keywordsSet.add("BizDial");

  if (businessName) {
    keywordsSet.add(businessName);
    if (city) {
      keywordsSet.add(`${businessName} ${city}`);
      keywordsSet.add(`${businessName} in ${city}`);
      if (area) {
        keywordsSet.add(`${businessName} ${area}`);
        keywordsSet.add(`${businessName} ${area} ${city}`);
      }
    }
    if (category) {
      keywordsSet.add(`${category} in ${city || 'India'}`);
      keywordsSet.add(`Best ${category} in ${city || 'India'}`);
      keywordsSet.add(`Top rated ${category} near me`);
    }
    keywordsSet.add(`${businessName} contact number`);
    keywordsSet.add(`${businessName} phone number`);
    keywordsSet.add(`${businessName} address & location`);
    keywordsSet.add(`${businessName} reviews & ratings`);
    keywordsSet.add(`${businessName} opening hours`);
    keywordsSet.add(`${businessName} price list & quotes`);
  } else if (category && city) {
    const loc = area ? `${area}, ${city}` : city;
    keywordsSet.add(`Best ${category} in ${loc}`);
    keywordsSet.add(`${category} near me`);
    keywordsSet.add(`${category} in ${loc}`);
    keywordsSet.add(`Top 10 ${category} in ${city}`);
    keywordsSet.add(`Top rated ${category} in ${city}`);
    keywordsSet.add(`${category} phone numbers ${city}`);
    keywordsSet.add(`Verified ${category} in ${city}`);
    keywordsSet.add(`${category} reviews & ratings ${city}`);
    keywordsSet.add(`Affordable ${category} in ${city}`);
    keywordsSet.add(`24 hour ${category} in ${city}`);
    if (subcategory) {
      keywordsSet.add(`${subcategory} in ${city}`);
      keywordsSet.add(`Best ${subcategory} in ${loc}`);
      keywordsSet.add(`${subcategory} near me`);
    }
  } else if (category) {
    keywordsSet.add(`${category} near me`);
    keywordsSet.add(`Best ${category} in India`);
    keywordsSet.add(`Verified ${category} Directory`);
    keywordsSet.add(`Top rated ${category} online`);
    keywordsSet.add(`${category} contact numbers & addresses`);
    if (subcategory) {
      keywordsSet.add(`${subcategory} near me`);
      keywordsSet.add(`Best ${subcategory}`);
      keywordsSet.add(`${category} ${subcategory}`);
    }
  }

  if (extra && Array.isArray(extra)) {
    extra.forEach((k) => {
      if (k && typeof k === 'string') keywordsSet.add(k.trim());
    });
  }

  // Cap at 15 focused high-intent keywords to avoid HTML bloating
  return Array.from(keywordsSet).filter(Boolean).slice(0, 15);
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[] | string;
  canonicalUrl?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function getSEOMetadata({ title, description, keywords, canonicalUrl, ogImage, noindex }: SEOProps = {}): Metadata {
  const finalTitle = generateTitle(title);
  const finalDescription = generateDescription(description);
  const finalKeywords = keywords || DEFAULT_KEYWORDS;
  const path = canonicalUrl ? (canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`) : '/';

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    ...(canonicalUrl ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: path,
      siteName: 'BizDial',
      images: [
        {
          url: ogImage || '/default-og.jpg',
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [ogImage || '/default-og.jpg'],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function generateLocalBusinessSchema(business: any, slug: string) {
  if (!business) return null;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.business_name,
    "image": business.logo_url || "/default-logo.png",
    "url": `/business/${slug}`,
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
  };
}
