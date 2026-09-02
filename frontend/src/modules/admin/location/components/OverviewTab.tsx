import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Plus, Edit3, Trash2, Download, RefreshCw, Search,
  ChevronRight, Check, X, Globe, Building2, LayoutGrid, Map, Menu
} from 'lucide-react';
import { authFetch } from '@/shared/services/authFetch';

// Re-declare interfaces used in these components (or import from a types file if it existed)
interface District { id: number; name: string; slug: string; is_active: boolean; state_name: string; }
interface City { id: number; name: string; slug: string; district_id: number; type: string; is_active: boolean; }
interface Area { id: number; name: string; slug: string; city_id: number; is_active: boolean; }
interface Stats { countries: number; states: number; districts: number; cities: number; areas: number; localities: number; seo_pages: number; slugs: number; }

// Dummy Modal for the extracted components
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"><X size={20} /></button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
}


const BASE = '';

export default function OverviewTab({ stats }: { stats: Stats | null }) {
  const cards = [
    { label: 'Countries', value: stats?.countries ?? 'ï¿½', icon: Globe, color: 'bg-blue-100 text-blue-700' },
    { label: 'States', value: stats?.states ?? 'ï¿½', icon: Map, color: 'bg-indigo-100 text-indigo-700' },
    { label: 'Districts', value: stats?.districts ?? 'ï¿½', icon: LayoutGrid, color: 'bg-purple-100 text-purple-700' },
    { label: 'Cities', value: stats?.cities ?? 'ï¿½', icon: Building2, color: 'bg-emerald-100 text-emerald-700' },
    { label: 'Areas', value: stats?.areas ?? 'ï¿½', icon: MapPin, color: 'bg-orange-100 text-orange-700' },
    { label: 'SEO Pages', value: stats?.seo_pages ?? 'ï¿½', icon: Globe, color: 'bg-teal-100 text-teal-700' },
    { label: 'URL Slugs', value: stats?.slugs ?? 'ï¿½', icon: ChevronRight, color: 'bg-pink-100 text-pink-700' },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(c => (
          <div key={c.label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${c.color}`}>
              <c.icon size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{c.value}</p>
              <p className="text-xs text-slate-500 font-medium">{c.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6">
        <h3 className="font-bold text-slate-900 mb-2">Tamil Nadu SEO Coverage</h3>
        <p className="text-sm text-slate-600 mb-4">All 38 districts seeded. Dynamic SEO pages, slugs, and sitemaps are live.</p>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {['state-sitemap.xml', 'district-sitemap.xml', 'city-sitemap.xml', 'area-sitemap.xml', 'category-sitemap.xml', 'business-sitemap.xml'].map(sm => (
            <a key={sm} href={`/${sm}`} target="_blank" rel="noreferrer"
              className="bg-white border border-blue-200 rounded-lg px-3 py-1.5 text-blue-700 hover:bg-blue-50 transition-colors">
              {sm}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
