export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import { DEFAULT_KEYWORDS } from "@/shared/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrlEnv = process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '') : undefined;

export const metadata: Metadata = {
  ...(siteUrlEnv ? { metadataBase: new URL(siteUrlEnv) } : {}),
  title: {
    default: "BizDial - India's Local Search Engine | Find, Connect & Grow",
    template: "%s | BizDial",
  },
  description: "India's most trusted local search engine to discover top-rated doctors, restaurants, salons, emergency services, mechanics, and local businesses near you with verified reviews and contact numbers.",
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: "BizDial Media Pvt Ltd" }],
  creator: "BizDial",
  publisher: "BizDial",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "BizDial - India's Local Search Engine | Find, Connect & Grow",
    description: "Discover top-rated verified local businesses, restaurants, doctors, services and reviews near you on BizDial.",
    siteName: "BizDial",
  },
  twitter: {
    card: "summary_large_image",
    title: "BizDial - India's Local Search Engine",
    description: "Discover top-rated verified local businesses, restaurants, doctors, and services near you.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
