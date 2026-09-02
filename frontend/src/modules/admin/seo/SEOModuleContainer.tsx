"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { 
  Building2, MapPin, Tag, FileCode2, Code, ShieldCheck, 
  RefreshCw, CheckCircle2, Sliders, Globe, Layers, ArrowRight,
  Plus, Edit3, Trash2, Search, Activity, BarChart3, FileText, Check, User, Rocket,
  Copy, RotateCcw, ExternalLink, Menu
} from 'lucide-react';
import { authFetch } from '@/shared/services/authFetch';
import { getBackendBaseUrl } from '@/shared/services/api';
import CitySEOView from './components/CitySEOView';
import CategorySEOView from './components/CategorySEOView';
import MetaTemplatesView from './components/MetaTemplatesView';
import SchemaGeneratorView from './components/SchemaGeneratorView';
import RobotsView from './components/RobotsView';
import SitemapView from './components/SitemapView';
import RedirectsView from './components/RedirectsView';
import AnalyticsView from './components/AnalyticsView';
import GenericSEOView from './components/GenericSEOView';
import BusinessSEOView from './components/BusinessSEOView';

interface SEOModuleContainerProps {
  moduleName: string;
  onOpenSidebar?: () => void;
}

export default function SEOModuleContainer({ moduleName, onOpenSidebar }: SEOModuleContainerProps) {
  const [saveSuccess, setSaveSuccess] = useState(false);

  const titleMap: Record<string, { title: string; desc: string }> = {
    'city-seo': { title: 'City SEO Engine & Dynamic Landing Pages', desc: 'Configure city-specific targeted SEO patterns, canonical tags, and city landing metadata.' },
    'category-seo': { title: 'Category SEO Rules Manager', desc: 'Define primary keywords, meta templates, and FAQ schemas across all main categories.' },
    'business-seo': { title: 'Business SEO & Metadata Auto-Generator', desc: 'Automate title tags, OpenGraph metadata, and structured data for business profiles.' },
    'meta-templates': { title: 'Dynamic Meta Templates Engine', desc: 'Manage automated variable templates for title tags, meta descriptions, and headers.' },
    'url-generator': 'Clean URL & Canonical Manager',
    'schema-generator': { title: 'JSON-LD Schema Generator & Builder', desc: 'Build and inject LocalBusiness, BreadcrumbList, and FAQPage schemas dynamically.' },
    'robots': { title: 'Robots.Txt & Crawl Rate Control', desc: 'Configure search engine crawler rules, disallow patterns, and sitemap references.' },
    'sitemap': { title: 'XML Sitemap Auto-Generator & Indexing', desc: 'Manage XML sitemap frequency, priority, and manual submit to Google Search Console.' },
    'canonical-urls': { title: 'Canonical URLs & Duplicate Prevention', desc: 'Enforce self-referential canonical tags to prevent duplicate content penalties.' },
    'redirects': { title: '301 / 302 Redirect Rules Manager', desc: 'Manage URL migration rules, legacy page redirects, and broken link handling.' },
    'search-analytics': { title: 'Search Traffic & Organic Keyword Analytics', desc: 'Track search queries, CTR, impressions, and ranking positions across cities.' },
  } as any;

  const currentInfo = titleMap[moduleName] || { 
    title: moduleName.replace('-', ' ').toUpperCase(), 
    desc: 'Automated enterprise SEO rule management and configuration.' 
  };

  return (
    <div className="p-4 sm:p-6 bg-slate-50 min-h-screen space-y-6">
      {/* Header with Mobile Drawer Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          {onOpenSidebar && (
            <button 
              onClick={onOpenSidebar}
              className="md:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition shrink-0"
              aria-label="Open Sidebar Menu"
            >
              <Menu size={20} />
            </button>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 capitalize">
              {typeof currentInfo === 'string' ? currentInfo : currentInfo.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {typeof currentInfo === 'object' ? currentInfo.desc : 'Automated enterprise SEO rule management and configuration.'}
            </p>
          </div>
        </div>
      </div>

      {/* Render custom tab content according to moduleName */}
      {moduleName === 'city-seo' && <CitySEOView />}
      {moduleName === 'category-seo' && <CategorySEOView />}
      {moduleName === 'business-seo' && <BusinessSEOView />}
      {moduleName === 'meta-templates' && <MetaTemplatesView />}
      {moduleName === 'schema-generator' && <SchemaGeneratorView />}
      {moduleName === 'robots' && <RobotsView />}
      {moduleName === 'sitemap' && <SitemapView />}
      {moduleName === 'redirects' && <RedirectsView />}
      {moduleName === 'search-analytics' && <AnalyticsView />}

      {/* Fallback for generic/other modules */}
      {!['city-seo', 'category-seo', 'business-seo', 'meta-templates', 'schema-generator', 'robots', 'sitemap', 'redirects', 'search-analytics'].includes(moduleName) && (
        <GenericSEOView moduleName={moduleName} />
      )}
    </div>
  );
}
