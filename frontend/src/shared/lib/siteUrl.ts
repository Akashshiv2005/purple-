import { headers } from 'next/headers';

/**
 * Universal domain resolver for the entire site:
 * 1. Checks any defined environment variables (NEXT_PUBLIC_SITE_URL, FRONTEND_URL, SITE_URL, NEXT_PUBLIC_FRONTEND_URL)
 * 2. On client-side (browser), dynamically uses window.location.origin
 * 3. On server-side (SSR / API / Sitemap / Robots), dynamically reads incoming request headers (x-forwarded-host / host)
 */

export function getClientSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                 process.env.NEXT_PUBLIC_FRONTEND_URL || 
                 process.env.FRONTEND_URL || 
                 process.env.SITE_URL;
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
}

export async function getServerSiteUrl(): Promise<string> {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                 process.env.NEXT_PUBLIC_FRONTEND_URL || 
                 process.env.FRONTEND_URL || 
                 process.env.SITE_URL;
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }

  try {
    const headersList = await headers();
    const host = headersList.get('x-forwarded-host') || headersList.get('host');
    const proto = headersList.get('x-forwarded-proto') || 'https';
    if (host) {
      return `${proto}://${host}`.replace(/\/+$/, '');
    }
  } catch (e) {
    // headers() might not be available during static generation phases
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return '';
}
