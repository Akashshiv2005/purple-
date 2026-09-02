import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, MapPin, Tag, FileCode2, Code, ShieldCheck, 
  RefreshCw, CheckCircle2, Sliders, Globe, Layers, ArrowRight,
  Plus, Edit3, Trash2, Search, Activity, BarChart3, FileText, Check, User, Rocket,
  Copy, RotateCcw, ExternalLink, Menu
} from 'lucide-react';
import { authFetch } from '@/shared/services/authFetch';
import { getBackendBaseUrl } from '@/shared/services/api';

export default function SitemapView() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    authFetch('/api/admin/seo/dashboard')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900">XML Sitemap Status</h3>
          <p className="text-xs text-slate-500">Auto-generated instantly by the backend engine</p>
        </div>
        <a 
          href={`${getBackendBaseUrl()}/sitemap.xml`} 
          target="_blank" 
          rel="noreferrer"
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition"
        >
          View Live sitemap.xml
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
        <div className="p-4 bg-slate-50 rounded-xl">
          <div className="text-xs text-slate-500 font-semibold">Total Generated URLs</div>
          <div className="text-xl font-black text-slate-900">{stats ? stats.generated_pages : '...'}</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl">
          <div className="text-xs text-slate-500 font-semibold">Total Indexed Pages</div>
          <div className="text-xl font-black text-slate-900">{stats ? stats.google_indexed : '...'}</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl">
          <div className="text-xs text-slate-500 font-semibold">Total Businesses</div>
          <div className="text-xl font-black text-slate-900">{stats && stats.total_indexed_pages ? Number(stats.total_indexed_pages) - 25 : '0'}</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl">
          <div className="text-xs text-slate-500 font-semibold">Last Ping Google</div>
          <div className="text-xl font-black text-green-600">Dynamic (Live)</div>
        </div>
      </div>
    </div>
  );
}
